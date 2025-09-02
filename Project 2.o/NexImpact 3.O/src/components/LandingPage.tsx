import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TypewriterText } from './TypewriterText';
import { CounterAnimation } from './CounterAnimation';
import { ArrowRight, Zap, Users, Target, Globe, Brain, Sparkles, Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export function LandingPage({ onPageChange }: LandingPageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const steps = [
    {
      icon: Target,
      title: "Problem Posted",
      description: "NGOs & Governments post real-world challenges",
      color: "from-primary to-blue-400"
    },
    {
      icon: Brain,
      title: "AI Breakdown",
      description: "Our AI analyzes and creates actionable microtasks",
      color: "from-secondary to-purple-400"
    },
    {
      icon: Users,
      title: "Skilled Solver",
      description: "Global talent pool tackles each microtask",
      color: "from-accent to-green-400"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Director, Global Health NGO",
      content: "NexImpact transformed how we approach complex health challenges. The AI breakdown made our massive project manageable.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      content: "I've earned $12,000 solving climate tech problems while building my portfolio. The gamification keeps me motivated!",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Aisha Patel",
      role: "Government Innovation Lead",
      content: "We solved our smart city infrastructure challenge 3x faster than traditional consulting. Amazing platform!",
      avatar: "AP",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 neural-network opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" style={{animationDelay: '3s'}} />
        </div>

        {/* Floating Earth Animation */}
        <div className="absolute right-10 top-1/4 opacity-20 floating">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1657344956545-8f49e1b1f661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZWFydGglMjBzcGFjZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NzkzMDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Futuristic Earth"
            className="w-64 h-64 rounded-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm">
              🚀 World's First AI-Powered Impact Marketplace
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Solve Global Problems</span>
              <br />
              <TypewriterText 
                text="Start Making Impact Today"
                delay={1000}
                speed={80}
                className="text-foreground"
              />
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with <span className="text-primary">NGOs</span>, <span className="text-secondary">Governments</span>, and <span className="text-accent">Communities</span> to solve real-world challenges using AI-driven workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => onPageChange('explore')}
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 neon-glow-blue text-lg px-8 py-4"
              >
                Join as Solver <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onPageChange('ngo')}
                className="border-accent text-accent hover:bg-accent/10 hover:neon-glow-green transition-all duration-300 text-lg px-8 py-4"
              >
                Post a Problem
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              How NexImpact Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform global challenges into manageable solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 neon-glow-blue`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Metrics Dashboard */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 relative">
        <div className="absolute inset-0 neural-network opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              Global Impact in Real-Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch as our community creates measurable change across the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <CounterAnimation
                end={2847}
                label="Problems Solved"
                className="glass-morphism p-6 rounded-xl hover:neon-glow-blue transition-all duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CounterAnimation
                end={156}
                label="NGOs Onboarded"
                className="glass-morphism p-6 rounded-xl hover:neon-glow-purple transition-all duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CounterAnimation
                end={45789}
                label="Solvers Worldwide"
                className="glass-morphism p-6 rounded-xl hover:neon-glow-green transition-all duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CounterAnimation
                end={2400000}
                label="Earnings Generated"
                prefix="$"
                className="glass-morphism p-6 rounded-xl hover:neon-glow-blue transition-all duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              Stories of Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real experiences from our global community of changemakers
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-morphism p-8 hover-tilt transition-all duration-500 hover:neon-glow-blue">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-xl font-bold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 neural-network opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Change the World?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of innovators, organizations, and changemakers building a better future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onPageChange('explore')}
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 neon-glow-blue text-lg px-8 py-4"
              >
                Start Solving Now <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onPageChange('about')}
                className="border-accent text-accent hover:bg-accent/10 hover:neon-glow-green transition-all duration-300 text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}