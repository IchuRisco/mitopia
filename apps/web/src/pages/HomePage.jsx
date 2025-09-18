import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Mic, 
  Brain, 
  FileText, 
  Share2, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Globe,
  Rocket
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedBackground, FloatingElements } from '../components/AnimatedBackground';
import { InteractiveCard, MagneticButton, GlowingOrb } from '../components/InteractiveCard';
import { TypingAnimation, WordRotator, CountUpAnimation } from '../components/TypingAnimation';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  const features = [
    {
      icon: Video,
      title: 'HD Video Calls',
      description: 'Crystal clear video calls with up to 50 participants using WebRTC technology.',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20'
    },
    {
      icon: Brain,
      title: 'AI-Powered Notes',
      description: 'Automatically organize conversations into themes, decisions, and action items.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20'
    },
    {
      icon: FileText,
      title: 'Smart Transcription',
      description: 'Real-time speech-to-text with speaker identification and high accuracy.',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
    },
    {
      icon: Share2,
      title: 'Multi-Platform Export',
      description: 'Export to Google Docs, Notion, Slack, Email, or download as PDF.',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No audio/video storage by default. Your data stays secure and private.',
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Join meetings with just a room code. No downloads or complex setup required.',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'TalkFlow has revolutionized our team meetings. The AI notes save us hours every week.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Startup Founder',
      company: 'InnovateLab',
      content: 'Perfect for investor meetings. The automatic summaries help us stay focused on what matters.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Remote Team Lead',
      company: 'GlobalTech',
      content: 'Finally, a video call solution that actually helps us be more productive.',
      rating: 5
    }
  ];

  return (
    <AnimatedBackground variant="particles">
      <div className="min-h-screen relative">
        <FloatingElements />
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Dynamic background orbs */}
          <GlowingOrb size={300} color="#3b82f6" className="top-10 left-10 opacity-20" />
          <GlowingOrb size={200} color="#8b5cf6" className="top-32 right-20 opacity-30" />
          <GlowingOrb size={150} color="#06b6d4" className="bottom-20 left-1/4 opacity-25" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Now with AI-powered notes
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Smart Video Calls with{' '}
                </span>
                <br />
                <WordRotator 
                  words={['AI Notes', 'Real-time Insights', 'Smart Summaries', 'Action Items']}
                  colorClasses={[
                    'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent',
                    'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent',
                    'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent',
                    'bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent'
                  ]}
                />
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Transform your meetings with TalkFlow. Get HD video calls, real-time transcription, 
                and AI-organized summaries that turn conversations into actionable insights.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <MagneticButton>
                  <Button size="lg" asChild className="text-lg px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link to="/register">
                      <Rocket className="mr-2 h-5 w-5" />
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
                
                <MagneticButton>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all duration-300">
                    <Link to="/join/demo">
                      <Video className="mr-2 h-5 w-5" />
                      Try Demo Meeting
                    </Link>
                  </Button>
                </MagneticButton>
              </motion.div>
              
              {/* Live stats */}
              <motion.div 
                className="flex justify-center items-center space-x-8 mt-12 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <CountUpAnimation end={10000} suffix="+" duration={2000} />
                  <span>Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-green-500" />
                  <CountUpAnimation end={50000} suffix="+" duration={2500} />
                  <span>Meetings Hosted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-purple-500" />
                  <CountUpAnimation end={150} suffix="+" duration={1500} />
                  <span>Countries</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Everything you need for{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                productive meetings
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From crystal-clear calls to AI-powered insights, TalkFlow has all the tools 
              to make your meetings more effective.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <InteractiveCard 
                  className="h-full group"
                  glowColor={`hsl(${200 + index * 30}, 70%, 60%)`}
                >
                  <CardHeader className={`${feature.bgColor} transition-all duration-300`}>
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 relative">
        {/* Animated connecting lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-cyan-500/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                How{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                TalkFlow Works
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Three simple steps to transform your meetings
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Start or Join a Meeting',
                description: 'Create a meeting or join with a room code. Invite participants via email or phone.',
                icon: Users,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Enable AI Notes (Optional)',
                description: 'Press "Organize Notes" to activate real-time transcription and AI analysis.',
                icon: Brain,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Get Instant Summaries',
                description: 'Receive organized notes with themes, decisions, and action items after the meeting.',
                icon: FileText,
                color: 'from-emerald-500 to-teal-500'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center relative group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                {/* Glowing background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, hsl(${200 + index * 60}, 70%, 60%), hsl(${260 + index * 60}, 70%, 60%))`
                  }}
                />
                
                {/* Step number with animation */}
                <motion.div 
                  className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {step.step}
                  </motion.span>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>
                
                {/* Icon with hover effect */}
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className={`h-8 w-8 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our users are saying about TalkFlow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to transform your meetings?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already using TalkFlow to make their meetings more productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </AnimatedBackground>
  );
};

export default HomePage;
