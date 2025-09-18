import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Video, 
  Calendar, 
  Users, 
  Clock, 
  MoreVertical, 
  Copy, 
  Edit, 
  Trash2, 
  Play, 
  FileText,
  Brain,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const DashboardPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    notesEnabled: true
  });

  const { user, api } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await api.get('/meetings');
      setMeetings(response.data.data);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      toast.error('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const response = await api.post('/meetings', newMeeting);
      const meeting = response.data.data;
      
      setMeetings(prev => [meeting, ...prev]);
      setCreateDialogOpen(false);
      setNewMeeting({ title: '', description: '', notesEnabled: true });
      
      toast.success('Meeting created successfully!');
      
      // Navigate to the meeting
      navigate(`/meeting/${meeting.id}`);
    } catch (error) {
      console.error('Failed to create meeting:', error);
      toast.error('Failed to create meeting');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await api.delete(`/meetings/${meetingId}`);
      setMeetings(prev => prev.filter(m => m.id !== meetingId));
      toast.success('Meeting deleted successfully');
    } catch (error) {
      console.error('Failed to delete meeting:', error);
      toast.error('Failed to delete meeting');
    }
  };

  const copyRoomCode = (roomCode) => {
    navigator.clipboard.writeText(roomCode);
    toast.success('Room code copied to clipboard!');
  };

  const copyJoinLink = (roomCode) => {
    const joinLink = `${window.location.origin}/join/${roomCode}`;
    navigator.clipboard.writeText(joinLink);
    toast.success('Join link copied to clipboard!');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      SCHEDULED: { variant: 'secondary', label: 'Scheduled' },
      ACTIVE: { variant: 'default', label: 'Active' },
      ENDED: { variant: 'outline', label: 'Ended' },
      CANCELLED: { variant: 'destructive', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.SCHEDULED;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your meetings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your meetings and view your recent activity
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-4 sm:mt-0">
              <Plus className="mr-2 h-5 w-5" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleCreateMeeting}>
              <DialogHeader>
                <DialogTitle>Create New Meeting</DialogTitle>
                <DialogDescription>
                  Set up a new meeting room for your team
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting title</Label>
                  <Input
                    id="title"
                    placeholder="Enter meeting title"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this meeting about?"
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notes"
                    checked={newMeeting.notesEnabled}
                    onCheckedChange={(checked) => setNewMeeting(prev => ({ ...prev, notesEnabled: checked }))}
                  />
                  <Label htmlFor="notes" className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Enable AI notes</span>
                  </Label>
                </div>
                
                {newMeeting.notesEnabled && (
                  <Alert>
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      AI notes will automatically transcribe and organize your meeting content.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createLoading || !newMeeting.title}>
                  {createLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Meeting'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{meetings.length}</p>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {meetings.filter(m => m.status === 'ENDED').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {meetings.filter(m => m.notesEnabled).length}
                </p>
                <p className="text-sm text-muted-foreground">With AI Notes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {meetings.reduce((sum, m) => sum + (m.participants?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Meetings</h2>
        
        {meetings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings yet</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Create your first meeting to start having smarter conversations with AI-powered notes.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Meeting
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {meetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{meeting.title}</h3>
                          {getStatusBadge(meeting.status)}
                          {meeting.notesEnabled && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              <Brain className="h-3 w-3" />
                              <span>AI Notes</span>
                            </Badge>
                          )}
                        </div>
                        
                        {meeting.description && (
                          <p className="text-muted-foreground mb-3">{meeting.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(meeting.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{meeting.participants?.length || 0} participants</span>
                          </div>
                          {meeting.startedAt && meeting.endedAt && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {Math.round((new Date(meeting.endedAt) - new Date(meeting.startedAt)) / 60000)} min
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-4">
                          <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                            {meeting.roomCode}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyRoomCode(meeting.roomCode)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {meeting.status === 'SCHEDULED' && (
                          <Button asChild>
                            <Link to={`/meeting/${meeting.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              Start
                            </Link>
                          </Button>
                        )}
                        
                        {meeting.status === 'ACTIVE' && (
                          <Button asChild>
                            <Link to={`/meeting/${meeting.id}`}>
                              <Video className="mr-2 h-4 w-4" />
                              Join
                            </Link>
                          </Button>
                        )}
                        
                        {meeting.status === 'ENDED' && meeting.notesEnabled && (
                          <Button variant="outline" asChild>
                            <Link to={`/notes/${meeting.id}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </Link>
                          </Button>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => copyJoinLink(meeting.roomCode)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy join link
                            </DropdownMenuItem>
                            {meeting.hostId === user?.id && meeting.status !== 'ACTIVE' && (
                              <>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit meeting
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteMeeting(meeting.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete meeting
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
