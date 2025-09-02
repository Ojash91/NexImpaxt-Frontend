import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Globe, Users, Clock, DollarSign, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Problem {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  skills: string[];
  budget: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  applicants: number;
  image: string;
  urgent: boolean;
  aiGenerated?: boolean;
}

interface ExploreProblemsProps {
  onPageChange: (page: string) => void;
}

export function ExploreProblems({ onPageChange }: ExploreProblemsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const problems: Problem[] = [
    {
      id: '1',
      title: 'AI-Powered Climate Monitoring System',
      organization: 'Green Earth Foundation',
      category: 'Environment',
      description: 'Develop an AI system to monitor deforestation patterns in the Amazon rainforest using satellite imagery and machine learning algorithms.',
      skills: ['Python', 'Machine Learning', 'Computer Vision', 'TensorFlow'],
      budget: '$5,000 - $8,000',
      duration: '3-4 months',
      difficulty: 'Advanced',
      applicants: 23,
      image: 'https://images.unsplash.com/photo-1565011471985-8a450248b005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzU2NzM3NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: true,
      aiGenerated: true
    },
    {
      id: '2',
      title: 'Telemedicine Platform for Rural Communities',
      organization: 'Global Health Initiative',
      category: 'Healthcare',
      description: 'Build a comprehensive telemedicine platform to connect rural patients with healthcare professionals through video consultations and AI-assisted diagnosis.',
      skills: ['React', 'Node.js', 'WebRTC', 'Database Design'],
      budget: '$3,000 - $5,000',
      duration: '2-3 months',
      difficulty: 'Intermediate',
      applicants: 45,
      image: 'https://images.unsplash.com/photo-1743767587687-9ebaac2b55e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMG1lZGljYWx8ZW58MXx8fHwxNzU2NzkzMDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: false,
      aiGenerated: true
    },
    {
      id: '3',
      title: 'Digital Literacy Program App',
      organization: 'Education for All',
      category: 'Education',
      description: 'Create an interactive mobile application to teach digital literacy skills to underserved communities with gamified learning modules.',
      skills: ['React Native', 'UI/UX Design', 'Gamification', 'Content Creation'],
      budget: '$2,000 - $4,000',
      duration: '1-2 months',
      difficulty: 'Beginner',
      applicants: 67,
      image: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5JTIwZGlnaXRhbCUyMGxlYXJuaW5nfGVufDF8fHx8MTc1Njc5MzA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: false,
      aiGenerated: true
    },
    {
      id: '4',
      title: 'Blockchain Voting System',
      organization: 'Democratic Future',
      category: 'Governance',
      description: 'Develop a secure, transparent blockchain-based voting system for local government elections with voter verification and audit trails.',
      skills: ['Solidity', 'Blockchain', 'Cryptography', 'Security'],
      budget: '$8,000 - $12,000',
      duration: '4-6 months',
      difficulty: 'Advanced',
      applicants: 12,
      image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NTY3MDM4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: true,
      aiGenerated: false
    },
    {
      id: '5',
      title: 'Water Quality Monitoring IoT Network',
      organization: 'Clean Water Project',
      category: 'Environment',
      description: 'Build an IoT sensor network to monitor water quality in remote villages and send real-time alerts about contamination.',
      skills: ['IoT', 'Arduino', 'Python', 'Data Analytics'],
      budget: '$4,000 - $6,000',
      duration: '2-3 months',
      difficulty: 'Intermediate',
      applicants: 34,
      image: 'https://images.unsplash.com/photo-1565011471985-8a450248b005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzU2NzM3NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: false,
      aiGenerated: true
    },
    {
      id: '6',
      title: 'Mental Health Chatbot',
      organization: 'Wellness Foundation',
      category: 'Healthcare',
      description: 'Create an AI-powered chatbot to provide mental health support and crisis intervention for young adults.',
      skills: ['Natural Language Processing', 'Psychology', 'AI', 'Ethics'],
      budget: '$3,500 - $5,500',
      duration: '3-4 months',
      difficulty: 'Advanced',
      applicants: 28,
      image: 'https://images.unsplash.com/photo-1743767587687-9ebaac2b55e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMG1lZGljYWx8ZW58MXx8fHwxNzU2NzkzMDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      urgent: true,
      aiGenerated: true
    }
  ];

  const categories = ['all', 'Environment', 'Healthcare', 'Education', 'Governance', 'Technology'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Explore Global Problems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful challenges posted by NGOs, governments, and communities worldwide. 
            Use your skills to create real impact while earning rewards.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass-morphism p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search problems, skills, or organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input-background border-white/10 focus:border-primary transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-input-background border-white/10">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-48 bg-input-background border-white/10">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty === 'all' ? 'All Levels' : difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <p className="text-muted-foreground">
                <span className="text-primary font-semibold">{filteredProblems.length}</span> problems found
              </p>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Filter className="w-3 h-3 mr-1" />
                AI-Powered Matching
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-morphism hover-tilt group cursor-pointer transition-all duration-500 hover:neon-glow-blue overflow-hidden h-full">
                <div className="relative">
                  <ImageWithFallback
                    src={problem.image}
                    alt={problem.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {problem.urgent && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Urgent
                      </Badge>
                    )}
                    {problem.aiGenerated && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{problem.organization}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {problem.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {problem.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {problem.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {problem.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{problem.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{problem.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{problem.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Applicants:</span>
                      <span className="font-medium">{problem.applicants}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      // In a real app, this would navigate to the problem detail page
                      console.log('View problem:', problem.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredProblems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No problems found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:neon-glow-blue transition-all duration-300"
            >
              Load More Problems
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}