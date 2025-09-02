import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Star, 
  Heart, 
  Share2, 
  Search,
  Plus,
  TrendingUp,
  BookOpen,
  Award,
  Globe,
  Handshake,
  Lightbulb,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  UserPlus,
  Zap,
  Crown,
  Target
} from 'lucide-react';

interface CommunityHubProps {
  onPageChange: (page: string) => void;
}

export function CommunityHub({ onPageChange }: CommunityHubProps) {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  const communityStats = {
    totalMembers: 45789,
    activeSolvers: 12456,
    mentors: 2341,
    discussions: 8923,
    problemsSolved: 15634
  };

  const trendingTopics = [
    { id: 1, title: 'AI for Climate Change', posts: 234, trend: '+15%' },
    { id: 2, title: 'Blockchain for Social Good', posts: 189, trend: '+28%' },
    { id: 3, title: 'Mental Health Apps', posts: 156, trend: '+12%' },
    { id: 4, title: 'Rural Education Tech', posts: 143, trend: '+22%' },
    { id: 5, title: 'Water Crisis Solutions', posts: 132, trend: '+18%' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'How to scale AI solutions for smallholder farmers?',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: '👩‍🔬',
        level: 'AI Expert',
        verified: true
      },
      category: 'AI/Agriculture',
      replies: 47,
      likes: 156,
      views: 2340,
      timeAgo: '2 hours ago',
      trending: true,
      excerpt: 'Looking for insights on deploying machine learning models in low-resource environments...'
    },
    {
      id: 2,
      title: 'Building resilient healthcare systems in remote areas',
      author: {
        name: 'Mark Rodriguez',
        avatar: '👨‍⚕️',
        level: 'Healthcare Pioneer',
        verified: true
      },
      category: 'Healthcare',
      replies: 32,
      likes: 89,
      views: 1890,
      timeAgo: '4 hours ago',
      trending: false,
      excerpt: 'Discussing sustainable healthcare delivery models that work in challenging environments...'
    },
    {
      id: 3,
      title: 'Youth engagement strategies for climate action',
      author: {
        name: 'Priya Patel',
        avatar: '🌱',
        level: 'Climate Activist',
        verified: false
      },
      category: 'Environment',
      replies: 28,
      likes: 67,
      views: 1456,
      timeAgo: '6 hours ago',
      trending: true,
      excerpt: 'How can we better involve young people in environmental solutions?'
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Elena Vasquez',
      avatar: '👩‍💼',
      expertise: ['AI/ML', 'Healthcare Tech', 'Social Impact'],
      rating: 4.9,
      reviews: 187,
      mentees: 45,
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: 'Available',
      hourlyRate: 'Free for impact projects',
      bio: 'Former WHO consultant, specialized in AI-powered health solutions for underserved communities.'
    },
    {
      id: 2,
      name: 'Prof. James Okafor',
      avatar: '👨‍🎓',
      expertise: ['Blockchain', 'Financial Inclusion', 'African Tech'],
      rating: 4.8,
      reviews: 203,
      mentees: 62,
      languages: ['English', 'French', 'Swahili'],
      availability: 'Busy - Next slot in 3 days',
      hourlyRate: '$50/hour',
      bio: 'Blockchain researcher focused on financial inclusion across Sub-Saharan Africa.'
    },
    {
      id: 3,
      name: 'Maria Santos',
      avatar: '🌍',
      expertise: ['Climate Tech', 'Renewable Energy', 'Policy'],
      rating: 4.9,
      reviews: 156,
      mentees: 38,
      languages: ['English', 'Spanish', 'Italian'],
      availability: 'Available',
      hourlyRate: 'Free for climate projects',
      bio: 'Climate policy advisor and renewable energy engineer with 15+ years experience.'
    }
  ];

  const skillExchanges = [
    {
      id: 1,
      offerer: {
        name: 'Alex Chen',
        avatar: '💻',
        skill: 'React Development'
      },
      seeking: 'UI/UX Design',
      description: 'Can teach React/Next.js, looking to improve design skills',
      matches: 12,
      timeAgo: '1 day ago'
    },
    {
      id: 2,
      offerer: {
        name: 'Fatima Al-Rashid',
        avatar: '🎨',
        skill: 'Design Thinking'
      },
      seeking: 'Arabic Translation',
      description: 'Design expertise for social impact projects, need Arabic language support',
      matches: 8,
      timeAgo: '2 days ago'
    },
    {
      id: 3,
      offerer: {
        name: 'Carlos Mendoza',
        avatar: '🔬',
        skill: 'Data Science'
      },
      seeking: 'Community Outreach',
      description: 'Python/ML skills available, want to learn community engagement',
      matches: 15,
      timeAgo: '3 days ago'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Global Impact Hackathon',
      date: 'Dec 15-17, 2024',
      type: 'Virtual Event',
      participants: 2500,
      topics: ['AI for Good', 'Climate Tech', 'Healthcare'],
      featured: true
    },
    {
      id: 2,
      title: 'Mentorship Speed Networking',
      date: 'Dec 10, 2024',
      type: 'Virtual',
      participants: 150,
      topics: ['Career Guidance', 'Skill Building'],
      featured: false
    },
    {
      id: 3,
      title: 'Climate Solutions Workshop',
      date: 'Dec 12, 2024',
      type: 'Hybrid',
      participants: 300,
      topics: ['Renewable Energy', 'Carbon Capture'],
      featured: true
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Community Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect, collaborate, and learn with changemakers worldwide. Share knowledge, find mentors, and build solutions together.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <Card className="glass-morphism p-4 text-center hover-tilt">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </Card>
          
          <Card className="glass-morphism p-4 text-center hover-tilt">
            <Target className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.activeSolvers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Solvers</div>
          </Card>
          
          <Card className="glass-morphism p-4 text-center hover-tilt">
            <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.mentors.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Mentors</div>
          </Card>
          
          <Card className="glass-morphism p-4 text-center hover-tilt">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.discussions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Discussions</div>
          </Card>
          
          <Card className="glass-morphism p-4 text-center hover-tilt">
            <Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.problemsSolved.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </Card>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions, people, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-border/50"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 neon-glow-blue">
            <Plus className="h-4 w-4 mr-2" />
            Start Discussion
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="glass-morphism grid grid-cols-4">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="mentors">Mentors</TabsTrigger>
                  <TabsTrigger value="exchange">Skill Exchange</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="discussions" className="space-y-6">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="glass-morphism p-6 hover-tilt">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">{discussion.author.avatar}</div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold hover:text-primary cursor-pointer">
                              {discussion.title}
                            </h3>
                            {discussion.trending && (
                              <Badge className="bg-accent/20 text-accent border-accent/30">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-medium">{discussion.author.name}</span>
                            {discussion.author.verified && (
                              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                ✓ {discussion.author.level}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{discussion.timeAgo}</span>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{discussion.excerpt}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {discussion.likes} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {discussion.views} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="mentors" className="space-y-6">
                  <div className="grid gap-6">
                    {mentors.map((mentor) => (
                      <Card key={mentor.id} className="glass-morphism p-6 hover-tilt">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{mentor.avatar}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold">{mentor.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm">{mentor.rating}</span>
                                <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {mentor.expertise.map((skill) => (
                                <Badge key={skill} className="bg-secondary/20 text-secondary border-secondary/30">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{mentor.bio}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <span className="text-muted-foreground">Mentees:</span> {mentor.mentees}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Rate:</span> {mentor.hourlyRate}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Languages:</span> {mentor.languages.join(', ')}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status:</span> 
                                <span className={mentor.availability === 'Available' ? 'text-accent ml-1' : 'text-secondary ml-1'}>
                                  {mentor.availability}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Request Mentorship
                              </Button>
                              <Button size="sm" variant="outline" className="glass-morphism">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exchange" className="space-y-6">
                  <div className="grid gap-6">
                    {skillExchanges.map((exchange) => (
                      <Card key={exchange.id} className="glass-morphism p-6 hover-tilt">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-2xl">{exchange.offerer.avatar}</div>
                          <div className="flex-1">
                            <h3 className="font-bold mb-1">{exchange.offerer.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge className="bg-accent/20 text-accent border-accent/30">
                                Offers: {exchange.offerer.skill}
                              </Badge>
                              <Handshake className="h-4 w-4 text-muted-foreground" />
                              <Badge className="bg-primary/20 text-primary border-primary/30">
                                Seeks: {exchange.seeking}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-accent font-medium">{exchange.matches} matches</div>
                            <div className="text-xs text-muted-foreground">{exchange.timeAgo}</div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{exchange.description}</p>
                        
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                          <Handshake className="h-4 w-4 mr-2" />
                          Propose Exchange
                        </Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="space-y-6">
                  <div className="grid gap-6">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className={`glass-morphism p-6 hover-tilt ${
                        event.featured ? 'border-primary/50 neon-glow-blue' : ''
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold">{event.title}</h3>
                              {event.featured && (
                                <Badge className="bg-primary/20 text-primary border-primary/30">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                {event.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.participants} participants
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {event.topics.map((topic) => (
                                <Badge key={topic} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            Join Event
                          </Button>
                          <Button size="sm" variant="outline" className="glass-morphism">
                            Learn More
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-morphism p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium text-sm">{topic.title}</div>
                        <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
                      </div>
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                        {topic.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-morphism p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start glass-morphism">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-morphism">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Find Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-morphism">
                    <Handshake className="h-4 w-4 mr-2" />
                    Skill Exchange
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-morphism">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Join Event
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}