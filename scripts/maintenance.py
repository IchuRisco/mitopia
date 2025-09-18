#!/usr/bin/env python3
"""
TalkFlow Maintenance and Automation Scripts
Handles daily cleanup, monitoring, and housekeeping tasks
"""

import os
import sys
import asyncio
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any
import json
import subprocess

import asyncpg
import redis.asyncio as redis
from github import Github
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/var/log/talkflow-maintenance.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./talkflow.db")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = os.getenv("GITHUB_REPO", "talkflow/talkflow")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

class MaintenanceManager:
    def __init__(self):
        self.redis_client = None
        self.db_pool = None
        self.github_client = None
        
    async def initialize(self):
        """Initialize connections"""
        try:
            # Initialize Redis
            self.redis_client = redis.from_url(REDIS_URL)
            await self.redis_client.ping()
            logger.info("✅ Connected to Redis")
            
            # Initialize database
            if DATABASE_URL.startswith("postgresql://"):
                self.db_pool = await asyncpg.create_pool(DATABASE_URL)
                logger.info("✅ Connected to PostgreSQL")
            
            # Initialize GitHub client
            if GITHUB_TOKEN:
                self.github_client = Github(GITHUB_TOKEN)
                logger.info("✅ Connected to GitHub")
                
        except Exception as e:
            logger.error(f"❌ Failed to initialize connections: {e}")
            raise
    
    async def cleanup_old_transcripts(self, days_old: int = 30) -> Dict[str, int]:
        """Clean up old transcript data from Redis"""
        try:
            logger.info(f"Starting cleanup of transcripts older than {days_old} days")
            
            cutoff_timestamp = datetime.utcnow() - timedelta(days=days_old)
            
            # Get all transcript keys
            transcript_keys = await self.redis_client.keys("transcript:*")
            deleted_count = 0
            total_count = len(transcript_keys)
            
            for key in transcript_keys:
                try:
                    transcript_data = await self.redis_client.get(key)
                    if transcript_data:
                        data = json.loads(transcript_data)
                        created_at = datetime.fromisoformat(data.get('created_at', ''))
                        
                        if created_at < cutoff_timestamp:
                            await self.redis_client.delete(key)
                            deleted_count += 1
                            
                except Exception as e:
                    logger.warning(f"Error processing transcript key {key}: {e}")
                    continue
            
            # Clean up transcript lists
            transcript_lists = await self.redis_client.keys("transcripts:*")
            for list_key in transcript_lists:
                # Remove expired keys from lists
                await self.redis_client.expire(list_key, 86400)  # 24 hours
            
            logger.info(f"Cleaned up {deleted_count} out of {total_count} transcript records")
            
            return {
                'total_transcripts': total_count,
                'deleted_transcripts': deleted_count,
                'remaining_transcripts': total_count - deleted_count
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up transcripts: {e}")
            return {'error': str(e)}
    
    async def cleanup_old_notes(self, days_old: int = 90) -> Dict[str, int]:
        """Clean up old processed notes from Redis"""
        try:
            logger.info(f"Starting cleanup of processed notes older than {days_old} days")
            
            cutoff_timestamp = datetime.utcnow() - timedelta(days=days_old)
            
            # Get all processed notes keys
            notes_keys = await self.redis_client.keys("processed_notes:*")
            deleted_count = 0
            total_count = len(notes_keys)
            
            for key in notes_keys:
                try:
                    notes_data = await self.redis_client.get(key)
                    if notes_data:
                        data = json.loads(notes_data)
                        processed_at = datetime.fromisoformat(data.get('processed_at', ''))
                        
                        if processed_at < cutoff_timestamp:
                            await self.redis_client.delete(key)
                            deleted_count += 1
                            
                except Exception as e:
                    logger.warning(f"Error processing notes key {key}: {e}")
                    continue
            
            logger.info(f"Cleaned up {deleted_count} out of {total_count} processed notes")
            
            return {
                'total_notes': total_count,
                'deleted_notes': deleted_count,
                'remaining_notes': total_count - deleted_count
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up notes: {e}")
            return {'error': str(e)}
    
    async def cleanup_old_sessions(self, hours_old: int = 24) -> Dict[str, int]:
        """Clean up old session data from Redis"""
        try:
            logger.info(f"Starting cleanup of sessions older than {hours_old} hours")
            
            # Clean up room data
            room_keys = await self.redis_client.keys("room:*")
            deleted_rooms = 0
            
            for key in room_keys:
                ttl = await self.redis_client.ttl(key)
                if ttl == -1:  # No expiration set
                    await self.redis_client.expire(key, 3600)  # Set 1 hour expiration
                elif ttl == -2:  # Key doesn't exist
                    deleted_rooms += 1
            
            # Clean up user room mappings
            user_room_keys = await self.redis_client.keys("user_rooms:*")
            for key in user_room_keys:
                await self.redis_client.expire(key, 3600)  # 1 hour expiration
            
            # Clean up audio chunks
            chunk_keys = await self.redis_client.keys("audio_chunk:*")
            deleted_chunks = 0
            
            for key in chunk_keys:
                ttl = await self.redis_client.ttl(key)
                if ttl <= 0:
                    await self.redis_client.delete(key)
                    deleted_chunks += 1
            
            logger.info(f"Cleaned up {deleted_rooms} rooms and {deleted_chunks} audio chunks")
            
            return {
                'deleted_rooms': deleted_rooms,
                'deleted_chunks': deleted_chunks,
                'total_room_keys': len(room_keys),
                'total_chunk_keys': len(chunk_keys)
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up sessions: {e}")
            return {'error': str(e)}
    
    async def rotate_api_keys(self) -> Dict[str, Any]:
        """Rotate API keys and update environment variables"""
        try:
            logger.info("Starting API key rotation")
            
            # This is a placeholder for key rotation logic
            # In production, you would:
            # 1. Generate new API keys
            # 2. Update them in your secrets management system
            # 3. Restart services with new keys
            # 4. Invalidate old keys
            
            rotated_keys = []
            
            # Example: Rotate JWT secret (in production, use proper key management)
            if os.getenv("JWT_SECRET"):
                # Generate new JWT secret
                import secrets
                new_jwt_secret = secrets.token_urlsafe(32)
                logger.info("Generated new JWT secret (would update in production)")
                rotated_keys.append("JWT_SECRET")
            
            # Example: Check OpenAI API key usage and rotate if needed
            if os.getenv("OPENAI_API_KEY"):
                logger.info("OpenAI API key rotation would be handled here")
                rotated_keys.append("OPENAI_API_KEY")
            
            return {
                'rotated_keys': rotated_keys,
                'rotation_time': datetime.utcnow().isoformat(),
                'status': 'simulated'  # In production, this would be 'completed'
            }
            
        except Exception as e:
            logger.error(f"Error rotating API keys: {e}")
            return {'error': str(e)}
    
    async def generate_health_report(self) -> Dict[str, Any]:
        """Generate system health report"""
        try:
            logger.info("Generating system health report")
            
            # Redis health
            redis_info = await self.redis_client.info()
            redis_health = {
                'connected_clients': redis_info.get('connected_clients', 0),
                'used_memory_human': redis_info.get('used_memory_human', '0B'),
                'keyspace_hits': redis_info.get('keyspace_hits', 0),
                'keyspace_misses': redis_info.get('keyspace_misses', 0)
            }
            
            # Database health (if PostgreSQL)
            db_health = {}
            if self.db_pool:
                try:
                    async with self.db_pool.acquire() as conn:
                        # Get database size
                        result = await conn.fetchrow("SELECT pg_database_size(current_database()) as size")
                        db_health['database_size_bytes'] = result['size'] if result else 0
                        
                        # Get connection count
                        result = await conn.fetchrow("SELECT count(*) as connections FROM pg_stat_activity")
                        db_health['active_connections'] = result['connections'] if result else 0
                        
                except Exception as e:
                    db_health['error'] = str(e)
            
            # System metrics
            import psutil
            system_health = {
                'cpu_percent': psutil.cpu_percent(interval=1),
                'memory_percent': psutil.virtual_memory().percent,
                'disk_percent': psutil.disk_usage('/').percent,
                'load_average': os.getloadavg() if hasattr(os, 'getloadavg') else None
            }
            
            # Service status
            services_health = {}
            services = ['api', 'signaling', 'stt', 'notes']
            
            for service in services:
                try:
                    # Check if service is running (simplified check)
                    result = subprocess.run(['pgrep', '-f', service], capture_output=True)
                    services_health[service] = 'running' if result.returncode == 0 else 'stopped'
                except Exception:
                    services_health[service] = 'unknown'
            
            report = {
                'timestamp': datetime.utcnow().isoformat(),
                'redis': redis_health,
                'database': db_health,
                'system': system_health,
                'services': services_health
            }
            
            return report
            
        except Exception as e:
            logger.error(f"Error generating health report: {e}")
            return {'error': str(e)}
    
    async def create_github_issue(self, title: str, body: str, labels: List[str] = None) -> Dict[str, Any]:
        """Create a GitHub issue for maintenance logs"""
        try:
            if not self.github_client:
                return {'error': 'GitHub client not initialized'}
            
            repo = self.github_client.get_repo(GITHUB_REPO)
            
            issue = repo.create_issue(
                title=title,
                body=body,
                labels=labels or ['maintenance', 'automated']
            )
            
            logger.info(f"Created GitHub issue #{issue.number}: {title}")
            
            return {
                'issue_number': issue.number,
                'issue_url': issue.html_url,
                'title': title
            }
            
        except Exception as e:
            logger.error(f"Error creating GitHub issue: {e}")
            return {'error': str(e)}
    
    def send_email_report(self, subject: str, body: str) -> Dict[str, Any]:
        """Send email report to admin"""
        try:
            if not all([SMTP_USERNAME, SMTP_PASSWORD, ADMIN_EMAIL]):
                return {'error': 'Email configuration incomplete'}
            
            msg = MimeMultipart()
            msg['From'] = SMTP_USERNAME
            msg['To'] = ADMIN_EMAIL
            msg['Subject'] = subject
            
            msg.attach(MimeText(body, 'plain'))
            
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            
            text = msg.as_string()
            server.sendmail(SMTP_USERNAME, ADMIN_EMAIL, text)
            server.quit()
            
            logger.info(f"Sent email report: {subject}")
            
            return {'status': 'sent', 'recipient': ADMIN_EMAIL}
            
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return {'error': str(e)}
    
    async def run_daily_maintenance(self):
        """Run daily maintenance tasks"""
        logger.info("🔄 Starting daily maintenance tasks")
        
        maintenance_log = {
            'date': datetime.utcnow().isoformat(),
            'tasks': {}
        }
        
        try:
            # Clean up old data
            maintenance_log['tasks']['transcript_cleanup'] = await self.cleanup_old_transcripts()
            maintenance_log['tasks']['notes_cleanup'] = await self.cleanup_old_notes()
            maintenance_log['tasks']['session_cleanup'] = await self.cleanup_old_sessions()
            
            # Generate health report
            maintenance_log['tasks']['health_report'] = await self.generate_health_report()
            
            # Rotate API keys (weekly)
            if datetime.utcnow().weekday() == 0:  # Monday
                maintenance_log['tasks']['key_rotation'] = await self.rotate_api_keys()
            
            # Create GitHub issue with maintenance log
            issue_body = f"""
# Daily Maintenance Report - {datetime.utcnow().strftime('%Y-%m-%d')}

## Cleanup Results
- **Transcripts**: {maintenance_log['tasks']['transcript_cleanup'].get('deleted_transcripts', 0)} deleted
- **Notes**: {maintenance_log['tasks']['notes_cleanup'].get('deleted_notes', 0)} deleted  
- **Sessions**: {maintenance_log['tasks']['session_cleanup'].get('deleted_rooms', 0)} rooms cleaned

## System Health
- **CPU**: {maintenance_log['tasks']['health_report'].get('system', {}).get('cpu_percent', 'N/A')}%
- **Memory**: {maintenance_log['tasks']['health_report'].get('system', {}).get('memory_percent', 'N/A')}%
- **Disk**: {maintenance_log['tasks']['health_report'].get('system', {}).get('disk_percent', 'N/A')}%

## Service Status
{json.dumps(maintenance_log['tasks']['health_report'].get('services', {}), indent=2)}

---
*This is an automated maintenance report generated by TalkFlow*
            """
            
            github_result = await self.create_github_issue(
                f"Daily Maintenance Report - {datetime.utcnow().strftime('%Y-%m-%d')}",
                issue_body,
                ['maintenance', 'daily-report']
            )
            
            maintenance_log['tasks']['github_issue'] = github_result
            
            # Send email report
            email_result = self.send_email_report(
                f"TalkFlow Daily Maintenance - {datetime.utcnow().strftime('%Y-%m-%d')}",
                issue_body
            )
            
            maintenance_log['tasks']['email_report'] = email_result
            
            logger.info("✅ Daily maintenance completed successfully")
            
        except Exception as e:
            logger.error(f"❌ Daily maintenance failed: {e}")
            maintenance_log['error'] = str(e)
        
        return maintenance_log
    
    async def close(self):
        """Close connections"""
        if self.redis_client:
            await self.redis_client.close()
        if self.db_pool:
            await self.db_pool.close()

async def main():
    """Main maintenance function"""
    maintenance = MaintenanceManager()
    
    try:
        await maintenance.initialize()
        result = await maintenance.run_daily_maintenance()
        
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        logger.error(f"Maintenance script failed: {e}")
        sys.exit(1)
    
    finally:
        await maintenance.close()

if __name__ == "__main__":
    asyncio.run(main())
