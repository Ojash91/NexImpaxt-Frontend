import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Globe, 
  Users, 
  Target, 
  Award, 
  Heart, 
  Lightbulb, 
  Zap, 
  Shield, 
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  MessageSquare,
  Star,
  Rocket,
  Brain,
  Handshake
} from 'lucide-react';
import { CounterAnimation } from './CounterAnimation';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const impactStats = {
    problemsSolved: 15634,
    livesImpacted: 2456789,
    countriesReached: 127,
    fundsDeployed: 45600000,
    solversActive: 67890,
    ngoPartners: 2341
  };

  const teamMembers = [
    {
      name: 'Ojash Mishra',
      role: 'Founder, CEO & CTO',
      avatar: '👨‍💼',
      bio: 'Visionary leader combining business strategy with cutting-edge technology. Expert in AI-powered social impact solutions.',
      focus: 'Strategic Vision & Technology',
      linkedIn: '#'
    },
    {
      name: 'Sneha Singh Baghel',
      role: 'Co-Founder & COO',
      avatar: '👩‍💼',
      bio: 'Operations excellence leader ensuring seamless platform delivery and global expansion strategies.',
      focus: 'Operations & Growth',
      linkedIn: '#'
    },
    {
      name: 'Pratibha Singh',
      role: 'Chief Product Officer',
      avatar: '🚀',
      bio: 'Product innovation expert crafting user-centric solutions for global impact marketplace.',
      focus: 'Product Strategy',
      linkedIn: '#'
    },
    {
      name: 'Sonal Chaurasiya',
      role: 'Chief Human Resources Officer',
      avatar: '👥',
      bio: 'People & culture champion building diverse, inclusive teams for worldwide social change.',
      focus: 'Talent & Culture',
      linkedIn: '#'
    },
    {
      name: 'Kaushik Sharma',
      role: 'Chief Financial Officer',
      avatar: '📊',
      bio: 'Financial strategy expert ensuring sustainable growth and impact-driven investments.',
      focus: 'Financial Strategy',
      linkedIn: '#'
    },
    {
      name: 'Manu Singh',
      role: 'Chief Marketing Officer',
      avatar: '📢',
      bio: 'Marketing visionary amplifying global impact stories and building community engagement.',
      focus: 'Brand & Community',
      linkedIn: '#'
    },
    {
      name: 'Prakriti Gautam',
      role: 'Head of Sales & Business Development',
      avatar: '🤝',
      bio: 'Partnership architect connecting organizations worldwide to scale social impact solutions.',
      focus: 'Strategic Partnerships',
      linkedIn: '#'
    }
  ];

  const partners = [
    {
      name: 'United Nations',
      logo: '🇺🇳',
      type: 'Strategic Partner',
      description: 'Implementing SDG-aligned solutions globally'
    },
    {
      name: 'World Bank',
      logo: '🏦',
      type: 'Financial Partner',
      description: 'Funding infrastructure and development projects'
    },
    {
      name: 'Microsoft AI for Good',
      logo: '💻',
      type: 'Technology Partner',
      description: 'AI tools and cloud infrastructure support'
    },
    {
      name: 'Gates Foundation',
      logo: '💚',
      type: 'Funding Partner',
      description: 'Supporting health and education initiatives'
    },
    {
      name: 'Acumen Academy',
      logo: '🎓',
      type: 'Learning Partner',
      description: 'Training and capacity building programs'
    },
    {
      name: 'Ashoka',
      logo: '🌟',
      type: 'Network Partner',
      description: 'Connecting social entrepreneurs worldwide'
    }
  ];

  const milestones = [
    {
      year: '2021',
      title: 'Foundation',
      description: 'NexImpact founded with vision to democratize global problem-solving',
      icon: '🚀'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Launched AI-powered problem decomposition and solver matching',
      icon: '🧠'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Reached 50 countries with 10,000+ active solvers',
      icon: '🌍'
    },
    {
      year: '2024',
      title: 'Impact Scaling',
      description: 'Facilitated $45M+ in impact funding, 2M+ lives touched',
      icon: '📈'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Targeting 1B+ people impacted through collaborative solutions',
      icon: '✨'
    }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We believe in solutions that transcend borders and create worldwide positive change.'
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'Complex problems require diverse minds working together with shared purpose.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Innovation',
      description: 'Leveraging cutting-edge technology to amplify human potential for good.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Building solutions with integrity, accountability, and open communication.'
    },
    {
      icon: Heart,
      title: 'Human-Centered Design',
      description: 'Every solution starts with understanding real human needs and experiences.'
    },
    {
      icon: Rocket,
      title: 'Exponential Thinking',
      description: 'Scaling solutions to create 10x impact rather than 10% improvements.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold gradient-text mb-6">
            About NexImpact
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're building the world's largest AI-powered marketplace for global impact, 
            connecting brilliant minds to solve humanity's most pressing challenges.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="glass-morphism p-8 hover-tilt">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/20 neon-glow-blue">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To democratize global problem-solving by creating an AI-powered ecosystem where anyone, 
              anywhere can contribute their skills to address real-world challenges and create measurable impact.
            </p>
          </Card>

          <Card className="glass-morphism p-8 hover-tilt">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/20 neon-glow-green">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A world where every global challenge is met with the collective intelligence of humanity, 
              amplified by AI, creating a future where 1 billion+ lives are positively transformed through collaborative innovation.
            </p>
          </Card>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Global Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.problemsSolved} />
              <div className="text-sm text-muted-foreground mt-2">Problems Solved</div>
            </Card>
            
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.livesImpacted} suffix="M" />
              <div className="text-sm text-muted-foreground mt-2">Lives Impacted</div>
            </Card>
            
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.countriesReached} />
              <div className="text-sm text-muted-foreground mt-2">Countries Reached</div>
            </Card>
            
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.fundsDeployed} prefix="$" suffix="M" />
              <div className="text-sm text-muted-foreground mt-2">Funds Deployed</div>
            </Card>
            
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.solversActive} suffix="K" />
              <div className="text-sm text-muted-foreground mt-2">Active Solvers</div>
            </Card>
            
            <Card className="glass-morphism p-6 text-center hover-tilt">
              <CounterAnimation end={impactStats.ngoPartners} />
              <div className="text-sm text-muted-foreground mt-2">NGO Partners</div>
            </Card>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass-morphism p-6 hover-tilt">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-secondary/20 neon-glow-purple">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-bold">{value.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${
                  index % 2 === 0 ? '' : 'flex-row-reverse'
                }`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="glass-morphism p-6 hover-tilt">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{milestone.icon}</span>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {milestone.year}
                        </Badge>
                      </div>
                      <h3 className="font-bold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-morphism p-6 text-center hover-tilt">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.bio}</p>
                <Badge variant="outline" className="text-xs mb-4">
                  {member.focus}
                </Badge>
                <Button variant="outline" size="sm" className="w-full glass-morphism">
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Strategic Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="glass-morphism p-6 hover-tilt">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-3xl">{partner.logo}</div>
                  <div>
                    <h3 className="font-bold">{partner.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {partner.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <Card className="glass-morphism p-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@neximpact.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>San Francisco, CA • Remote Global Team</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" size="sm" className="glass-morphism">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass-morphism">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass-morphism">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="glass-morphism p-8">
            <h2 className="text-2xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              Ready to be part of the solution? Whether you're a solver, NGO, government, or investor, 
              there's a place for you in the NexImpact ecosystem.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => onPageChange('auth')}
                className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
              >
                <Users className="h-4 w-4 mr-2" />
                Join as Solver
              </Button>
              <Button 
                onClick={() => onPageChange('auth')}
                variant="outline" 
                className="w-full glass-morphism"
              >
                <Handshake className="h-4 w-4 mr-2" />
                Partner with Us
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}