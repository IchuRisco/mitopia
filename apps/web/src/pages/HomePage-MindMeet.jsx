import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Video, 
  MessageSquare, 
  Globe, 
  Brain, 
  Zap, 
  Shield,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  CreditCard,
  Gift
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import InteractiveCard from '../components/InteractiveCard';
import TypingAnimation from '../components/TypingAnimation';

const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({
    users: 0,
    meetings: 0,
    countries: 0,
    translations: 0
  });

  const controls = useAnimation();
  const [ref, inView] = useInView();

  // Animated statistics
  useEffect(() => {
    const targetStats = {
      users: 25000,
      meetings: 150000,
      countries: 180,
      translations: 2500000
    };

    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setStats({
          users: Math.floor(targetStats.users * easeOut),
          meetings: Math.floor(targetStats.meetings * easeOut),
          countries: Math.floor(targetStats.countries * easeOut),
          translations: Math.floor(targetStats.translations * easeOut)
        });

        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Feature rotation
  useEffect(() => {
    const features = [
      'AI-Powered Transcription',
      'Real-time Translation',
      'Smart Meeting Notes',
      'Global Collaboration',
      'Enterprise Security'
    ];

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: 'HD Video Calls',
      description: 'Crystal clear video calls with up to 100 participants. Screen sharing, recording, and premium quality.',
      gradient: 'from-blue-500 to-purple-600',
      delay: 0.1
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Real-time Translation',
      description: 'Break language barriers with AI-powered translation for 50+ languages. Speak naturally, understand globally.',
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.2
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Meeting Intelligence',
      description: 'Automatic transcription, smart summaries, action items, and decision tracking powered by GPT-4.',
      gradient: 'from-orange-500 to-red-600',
      delay: 0.3
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Smart Export',
      description: 'Export to Google Docs, Notion, Slack, Teams, or PDF. Seamless integration with your workflow.',
      gradient: 'from-pink-500 to-rose-600',
      delay: 0.4
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption, SOC 2 compliance, GDPR & HIPAA ready. Your conversations stay private.',
      gradient: 'from-indigo-500 to-blue-600',
      delay: 0.5
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Setup',
      description: 'Join meetings in seconds with room codes. No downloads, no hassle. Works on any device.',
      gradient: 'from-yellow-500 to-orange-600',
      delay: 0.6
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 9.99,
      period: 'month',
      description: 'Perfect for small teams',
      features: [
        'Up to 10 participants',
        '500 minutes/month',
        'AI transcription',
        '100 translations/month',
        'Basic export options',
        'Email support'
      ],
      gradient: 'from-blue-500 to-purple-600',
      popular: false
    },
    {
      name: 'Professional',
      price: 29.99,
      period: 'month',
      description: 'Most popular for growing teams',
      features: [
        'Up to 50 participants',
        '2000 minutes/month',
        'AI transcription & translation',
        '1000 translations/month',
        'Advanced analytics',
        'All export options',
        'Priority support'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99.99,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Up to 100 participants',
        '10000 minutes/month',
        'Unlimited translations',
        'Custom branding',
        'Advanced security',
        'Dedicated support',
        'Custom integrations'
      ],
      gradient: 'from-purple-500 to-pink-600',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Global Team Lead',
      company: 'TechCorp',
      avatar: '👩‍💼',
      rating: 5,
      text: 'MindMeet transformed our international meetings. The real-time translation is incredible - our team in Tokyo can finally participate fully in discussions with our US office.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Manager',
      company: 'StartupXYZ',
      avatar: '👨‍💻',
      rating: 5,
      text: 'The AI meeting notes are a game-changer. I spend 80% less time writing up meeting summaries, and the action items are automatically tracked. Worth every penny.'
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Research Director',
      company: 'MedTech Solutions',
      avatar: '👩‍⚕️',
      rating: 5,
      text: 'Security and compliance were our biggest concerns. MindMeet exceeded our expectations with HIPAA compliance and enterprise-grade encryption.'
    }
  ];

  const rotatingFeatures = [
    { text: 'AI-Powered Transcription', color: 'from-emerald-400 to-teal-500' },
    { text: 'Real-time Translation', color: 'from-orange-400 to-red-500' },
    { text: 'Smart Meeting Notes', color: 'from-pink-400 to-rose-500' },
    { text: 'Global Collaboration', color: 'from-indigo-400 to-blue-500' },
    { text: 'Enterprise Security', color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center z-10">
          {/* Floating emojis */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 text-4xl"
              animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🧠
            </motion.div>
            <motion.div
              className="absolute top-32 right-20 text-3xl"
              animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🌍
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-20 text-3xl"
              animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              ⚡
            </motion.div>
            <motion.div
              className="absolute bottom-32 right-10 text-4xl"
              animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
            >
              🚀
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                MindMeet
              </span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-semibold mb-4">
              Where Minds Meet with{' '}
              <span className={`bg-gradient-to-r ${rotatingFeatures[currentFeature].color} bg-clip-text text-transparent`}>
                {rotatingFeatures[currentFeature].text}
              </span>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Transform your meetings with HD video calls, real-time language interpretation, 
              and AI-powered insights. Premium subscription with 30-day free trial.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <Gift className="w-5 h-5" />
              Start 30-Day Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold flex items-center gap-3 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                {stats.meetings.toLocaleString()}+
              </div>
              <div className="text-slate-400">Meetings Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                {stats.countries}+
              </div>
              <div className="text-slate-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                {(stats.translations / 1000000).toFixed(1)}M+
              </div>
              <div className="text-slate-400">Translations</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Premium Features
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need for intelligent, global collaboration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InteractiveCard
                key={index}
                className={`p-8 bg-gradient-to-br ${feature.gradient} bg-opacity-10 border border-slate-700 rounded-2xl hover:border-slate-600 transition-all duration-300`}
                delay={feature.delay}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Start with a 30-day free trial. No credit card required.
            </p>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-6 py-3">
              <Gift className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">30 Days Free Trial</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border-2 ${
                  plan.popular 
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-500/10 to-teal-500/10' 
                    : 'border-slate-700 bg-slate-800/50'
                } hover:border-slate-600 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-slate-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                      : 'border-2 border-slate-600 text-slate-300 hover:border-blue-400 hover:text-white'
                  }`}
                >
                  Start Free Trial
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Loved by Teams Worldwide
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Meetings?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using MindMeet to break language barriers 
              and capture every important moment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full text-lg font-semibold flex items-center gap-3 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
              >
                <Gift className="w-5 h-5" />
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <div className="text-slate-400 text-sm">
                No credit card required • Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
