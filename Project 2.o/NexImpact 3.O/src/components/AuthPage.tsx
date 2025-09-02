import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VoiceTextInput } from './VoiceTextInput';
import { 
  User, 
  Building, 
  Globe, 
  Users, 
  DollarSign, 
  Mail, 
  Lock, 
  Upload, 
  Mic, 
  Video,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Shield,
  Heart
} from 'lucide-react';

interface AuthPageProps {
  onPageChange: (page: string) => void;
}

export function AuthPage({ onPageChange }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [userRole, setUserRole] = useState('solver');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    skills: [] as string[],
    bio: '',
    location: '',
    phone: '',
    experience: '',
    languages: [] as string[],
    availability: '',
    motivation: ''
  });

  const skillOptions = [
    'Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'Design',
    'Marketing', 'Content Writing', 'Project Management', 'Research', 'Healthcare',
    'Education', 'Environment', 'Agriculture', 'Social Work', 'Finance',
    'Legal', 'Engineering', 'Architecture', 'Photography', 'Video Editing'
  ];

  const languageOptions = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Arabic', 'Portuguese', 'Russian', 'Italian', 'Dutch', 'Korean'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    const skills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    handleInputChange('skills', skills);
  };

  const toggleLanguage = (language: string) => {
    const languages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    handleInputChange('languages', languages);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign-in success - default to solver dashboard
    onPageChange('solver');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration success - navigate to appropriate dashboard based on role
    switch (userRole) {
      case 'solver':
        onPageChange('solver');
        break;
      case 'ngo':
        onPageChange('ngo');
        break;
      case 'government':
        onPageChange('ngo'); // Use NGO portal for government for now
        break;
      case 'company':
        onPageChange('ngo'); // Use NGO portal for companies for now
        break;
      case 'donor':
        onPageChange('explore'); // Take donors to explore page
        break;
      default:
        onPageChange('solver');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'solver': return <User className="h-5 w-5" />;
      case 'ngo': return <Heart className="h-5 w-5" />;
      case 'government': return <Building className="h-5 w-5" />;
      case 'company': return <Globe className="h-5 w-5" />;
      case 'donor': return <DollarSign className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'solver': return 'bg-primary/20 text-primary border-primary/30';
      case 'ngo': return 'bg-accent/20 text-accent border-accent/30';
      case 'government': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'company': return 'bg-primary/20 text-primary border-primary/30';
      case 'donor': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            {isSignUp ? 'Join NexImpact' : 'Welcome Back'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isSignUp 
              ? 'Create your account and start making real-world impact today'
              : 'Sign in to continue your impact journey'
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-morphism p-8">
              <Tabs value={isSignUp ? 'signup' : 'signin'} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 glass-morphism">
                  <TabsTrigger 
                    value="signin" 
                    onClick={() => setIsSignUp(false)}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    onClick={() => setIsSignUp(true)}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 bg-input-background border-border/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-input-background border-border/50"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
                    >
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold mb-4">Choose Your Role</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'solver', label: 'Individual Solver', desc: 'Solve problems and earn impact points' },
                            { id: 'ngo', label: 'NGO/Non-Profit', desc: 'Post problems and find solutions' },
                            { id: 'government', label: 'Government', desc: 'Address public challenges' },
                            { id: 'company', label: 'Company/Enterprise', desc: 'Corporate social responsibility' },
                            { id: 'donor', label: 'Investor/Donor', desc: 'Fund impactful solutions' }
                          ].map((role) => (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => setUserRole(role.id)}
                              className={`p-4 rounded-lg border-2 text-left transition-all hover-tilt ${
                                userRole === role.id 
                                  ? getRoleColor(role.id) + ' neon-glow-blue'
                                  : 'bg-muted/5 border-border/50 hover:border-primary/30'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {getRoleIcon(role.id)}
                                <div>
                                  <p className="font-medium">{role.label}</p>
                                  <p className="text-sm text-muted-foreground">{role.desc}</p>
                                </div>
                                {userRole === role.id && (
                                  <Check className="h-5 w-5 ml-auto text-primary" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => setCurrentStep(2)}
                        className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
                      >
                        Continue <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                          className="p-2"
                        >
                          ←
                        </Button>
                        <h3 className="text-lg font-bold">Basic Information</h3>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Your full name"
                            className="bg-input-background border-border/50"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="your@email.com"
                              className="pl-10 bg-input-background border-border/50"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              placeholder="••••••••"
                              className="pl-10 bg-input-background border-border/50"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="City, Country"
                            className="bg-input-background border-border/50"
                          />
                        </div>

                        {userRole === 'solver' && (
                          <div>
                            <Label>Your Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {skillOptions.slice(0, 10).map((skill) => (
                                <button
                                  key={skill}
                                  type="button"
                                  onClick={() => toggleSkill(skill)}
                                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                                    formData.skills.includes(skill)
                                      ? 'bg-primary/20 text-primary border-primary/50'
                                      : 'bg-muted/10 border-border/50 hover:border-primary/30'
                                  }`}
                                >
                                  {skill}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {userRole !== 'solver' && (
                          <div>
                            <Label htmlFor="organization">Organization Name</Label>
                            <Input
                              id="organization"
                              value={formData.organization}
                              onChange={(e) => handleInputChange('organization', e.target.value)}
                              placeholder="Your organization"
                              className="bg-input-background border-border/50"
                              required
                            />
                          </div>
                        )}

                        <Button 
                          onClick={() => setCurrentStep(3)}
                          type="button"
                          className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
                        >
                          Continue <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {currentStep === 3 && userRole === 'solver' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(2)}
                          className="p-2"
                        >
                          ←
                        </Button>
                        <h3 className="text-lg font-bold">Profile Details</h3>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="bio">Bio & Introduction</Label>
                          <VoiceTextInput
                            value={formData.bio}
                            onChange={(value) => handleInputChange('bio', value)}
                            placeholder="Tell us about yourself, your passion for social impact..."
                            className="bg-input-background border-border/50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="experience">Experience Level</Label>
                          <Select onValueChange={(value) => handleInputChange('experience', value)}>
                            <SelectTrigger className="bg-input-background border-border/50">
                              <SelectValue placeholder="Select your experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                              <SelectItem value="expert">Expert (10+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Languages You Speak</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {languageOptions.slice(0, 8).map((language) => (
                              <button
                                key={language}
                                type="button"
                                onClick={() => toggleLanguage(language)}
                                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                                  formData.languages.includes(language)
                                    ? 'bg-accent/20 text-accent border-accent/50'
                                    : 'bg-muted/10 border-border/50 hover:border-accent/30'
                                }`}
                              >
                                {language}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="availability">Availability</Label>
                          <Select onValueChange={(value) => handleInputChange('availability', value)}>
                            <SelectTrigger className="bg-input-background border-border/50">
                              <SelectValue placeholder="How much time can you dedicate?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="few-hours">Few hours per week</SelectItem>
                              <SelectItem value="part-time">Part-time (10-20 hours/week)</SelectItem>
                              <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                              <SelectItem value="flexible">Flexible schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="motivation">What motivates you?</Label>
                          <VoiceTextInput
                            value={formData.motivation}
                            onChange={(value) => handleInputChange('motivation', value)}
                            placeholder="Share what drives your passion for making an impact..."
                            className="bg-input-background border-border/50"
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Create My Impact Profile
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {currentStep === 3 && userRole !== 'solver' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(2)}
                          className="p-2"
                        >
                          ←
                        </Button>
                        <h3 className="text-lg font-bold">Organization Details</h3>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="org-bio">Organization Description</Label>
                          <Textarea
                            id="org-bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="Describe your organization's mission and focus areas..."
                            className="bg-input-background border-border/50"
                            rows={4}
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 neon-glow-blue"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Create Organization Profile
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Right Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="glass-morphism p-6">
              <h3 className="text-xl font-bold mb-4">Why Join NexImpact?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20 neon-glow-blue">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Global Community</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with like-minded changemakers worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/20 neon-glow-green">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">AI-Powered Matching</h4>
                    <p className="text-sm text-muted-foreground">
                      Get matched with problems that fit your skills
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20 neon-glow-purple">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Verified Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Track and verify your real-world contributions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20 neon-glow-blue">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Earn While Helping</h4>
                    <p className="text-sm text-muted-foreground">
                      Get rewarded for your contributions
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-morphism p-6">
              <h3 className="text-xl font-bold mb-4">Success Stories</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/10">
                  <p className="text-sm italic">
                    "Through NexImpact, I helped design a water filtration system that now serves 500+ families in rural India."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Priya S., Engineer</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-sm italic">
                    "Our NGO found amazing developers who built a mobile app for our literacy program. Impact: 10,000+ students!"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Education For All NGO</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}