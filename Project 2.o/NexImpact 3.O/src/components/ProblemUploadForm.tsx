import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  MapPin, 
  AlertTriangle, 
  Target, 
  Zap, 
  Brain, 
  CheckCircle, 
  Clock,
  Users,
  DollarSign,
  Lightbulb
} from 'lucide-react';

interface ProblemUploadFormProps {
  onSubmit: (problem: any) => void;
}

export function ProblemUploadForm({ onSubmit }: ProblemUploadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    priority: '',
    description: '',
    resources: '',
    expectedOutcome: '',
    expectedBeneficiaries: '',
    fundingNeeded: '',
    timeline: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDecomposition, setAiDecomposition] = useState<any>(null);

  const categories = [
    'Education',
    'Healthcare',
    'Infrastructure',
    'Environment',
    'Technology',
    'Women Empowerment',
    'Rural Development',
    'Water & Sanitation',
    'Food Security',
    'Digital Literacy'
  ];

  const priorities = ['High', 'Medium', 'Low'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAIDecomposition = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockDecomposition = {
        overview: `AI Analysis: This ${formData.category.toLowerCase()} problem can be broken down into ${Math.floor(Math.random() * 5) + 5} key tasks requiring diverse skills.`,
        tasks: [
          {
            id: 1,
            title: 'Research & Data Collection',
            description: 'Conduct field surveys and gather baseline data',
            skills: ['Research', 'Data Collection', 'Survey Design'],
            estimatedHours: '20-30 hours',
            difficulty: 'Medium',
            volunteers: 3
          },
          {
            id: 2,
            title: 'Community Outreach Planning',
            description: 'Develop community engagement and awareness strategy',
            skills: ['Marketing', 'Community Engagement', 'Social Media'],
            estimatedHours: '15-20 hours',
            difficulty: 'Easy',
            volunteers: 2
          },
          {
            id: 3,
            title: 'Technical Solution Design',
            description: 'Design technical implementation or system architecture',
            skills: ['Engineering', 'System Design', 'Technical Writing'],
            estimatedHours: '40-60 hours',
            difficulty: 'Hard',
            volunteers: 4
          },
          {
            id: 4,
            title: 'Resource Mobilization',
            description: 'Identify and secure necessary resources and partnerships',
            skills: ['Business Development', 'Fundraising', 'Partnership Management'],
            estimatedHours: '25-35 hours',
            difficulty: 'Medium',
            volunteers: 2
          },
          {
            id: 5,
            title: 'Implementation Support',
            description: 'Provide on-ground implementation guidance and monitoring',
            skills: ['Project Management', 'Field Operations', 'Monitoring & Evaluation'],
            estimatedHours: '50-80 hours',
            difficulty: 'Hard',
            volunteers: 5
          }
        ],
        totalEstimatedHours: '150-225 hours',
        recommendedVolunteers: 16,
        estimatedTimeline: '3-6 months',
        successMetrics: [
          'Baseline data collected and analyzed',
          'Community awareness increased by 60%',
          'Technical solution implemented and tested',
          'Sustainable resource partnerships established',
          `${formData.expectedBeneficiaries || '100+'} beneficiaries directly impacted`
        ]
      };
      
      setAiDecomposition(mockDecomposition);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const problemData = {
      ...formData,
      aiDecomposition,
      expectedBeneficiaries: parseInt(formData.expectedBeneficiaries) || 0,
      fundingNeeded: parseInt(formData.fundingNeeded) || 0
    };
    onSubmit(problemData);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-accent/20 text-accent';
      case 'Medium': return 'bg-secondary/20 text-secondary';
      case 'Hard': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Problem Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-morphism p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20 neon-glow-blue">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Problem Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Problem Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Lack of Clean Water in XYZ Village"
                  required
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)} required>
                  <SelectTrigger className="bg-input-background border-border/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority Level *</Label>
                <Select onValueChange={(value) => handleInputChange('priority', value)} required>
                  <SelectTrigger className="bg-input-background border-border/50">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State, Country"
                    className="pl-10 bg-input-background border-border/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  placeholder="e.g., 6 months"
                  className="bg-input-background border-border/50"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Problem Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the problem, current situation, and challenges faced..."
                  rows={4}
                  required
                  className="bg-input-background border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="expectedBeneficiaries">Expected Beneficiaries</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="expectedBeneficiaries"
                    type="number"
                    value={formData.expectedBeneficiaries}
                    onChange={(e) => handleInputChange('expectedBeneficiaries', e.target.value)}
                    placeholder="Number of people impacted"
                    className="pl-10 bg-input-background border-border/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fundingNeeded">Funding Needed (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fundingNeeded"
                    type="number"
                    value={formData.fundingNeeded}
                    onChange={(e) => handleInputChange('fundingNeeded', e.target.value)}
                    placeholder="Total budget required"
                    className="pl-10 bg-input-background border-border/50"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="resources">Available Resources</Label>
                <Textarea
                  id="resources"
                  value={formData.resources}
                  onChange={(e) => handleInputChange('resources', e.target.value)}
                  placeholder="List any resources, equipment, partnerships, or assets already available..."
                  rows={3}
                  className="bg-input-background border-border/50"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="expectedOutcome">Expected Outcome *</Label>
                <Textarea
                  id="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
                  placeholder="Describe the desired outcome and success metrics..."
                  rows={3}
                  required
                  className="bg-input-background border-border/50"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Decomposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-morphism p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/20 neon-glow-purple">
                  <Brain className="h-5 w-5 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold">AI Problem Decomposition</h2>
              </div>
              
              <Button
                type="button"
                onClick={generateAIDecomposition}
                disabled={!formData.title || !formData.category || !formData.description || isAnalyzing}
                className={`flex items-center gap-2 ${
                  isAnalyzing ? 'animate-pulse' : ''
                }`}
              >
                <Zap className="h-4 w-4" />
                {isAnalyzing ? 'Analyzing...' : 'Generate AI Analysis'}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
                />
                <p className="text-muted-foreground">AI is analyzing your problem and generating micro-tasks...</p>
              </div>
            )}

            {aiDecomposition && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="font-medium text-accent">AI Analysis</span>
                  </div>
                  <p className="text-sm">{aiDecomposition.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-medium">{aiDecomposition.totalEstimatedHours}</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/10">
                    <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <p className="font-medium">{aiDecomposition.recommendedVolunteers}</p>
                    <p className="text-sm text-muted-foreground">Volunteers Needed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="font-medium">{aiDecomposition.estimatedTimeline}</p>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-4">Generated Micro-Tasks</h3>
                  <div className="space-y-4">
                    {aiDecomposition.tasks.map((task: any) => (
                      <Card key={task.id} className="p-4 hover-tilt">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {task.skills.map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.estimatedHours}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {task.volunteers} volunteers
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Success Metrics</h3>
                  <div className="space-y-2">
                    {aiDecomposition.successMetrics.map((metric: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Button
            type="submit"
            size="lg"
            disabled={!formData.title || !formData.category || !formData.description}
            className="bg-primary hover:bg-primary/90 neon-glow-blue px-8 py-3"
          >
            Upload Problem & Publish Tasks
          </Button>
        </motion.div>
      </form>
    </div>
  );
}