import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  MessageSquare,
  Target
} from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  category: string;
  location: string;
  priority: string;
  status: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  assignedSolvers: number;
  beneficiaries: number;
  fundingGoal: number;
  fundingRaised: number;
  createdAt: string;
}

interface ImpactDashboardProps {
  problems: Problem[];
}

export function ImpactDashboard({ problems }: ImpactDashboardProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProblems = problems.filter(problem => 
    filterStatus === 'all' || problem.status.toLowerCase() === filterStatus
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-destructive/20 text-destructive';
      case 'Medium': return 'bg-secondary/20 text-secondary';
      case 'Low': return 'bg-accent/20 text-accent';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-accent/20 text-accent';
      case 'Planning': return 'bg-secondary/20 text-secondary';
      case 'Completed': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const mockRecentActivities = [
    {
      id: 1,
      type: 'task_completed',
      message: 'Research & Data Collection task completed by Priya Sharma',
      time: '2 hours ago',
      problemId: 1
    },
    {
      id: 2,
      type: 'volunteer_joined',
      message: '3 new volunteers joined Digital Literacy Program',
      time: '5 hours ago',
      problemId: 2
    },
    {
      id: 3,
      type: 'funding_received',
      message: '₹25,000 funding received from Tech Foundation',
      time: '1 day ago',
      problemId: 1
    },
    {
      id: 4,
      type: 'milestone_reached',
      message: 'Clean Water project reached 50% completion',
      time: '2 days ago',
      problemId: 1
    }
  ];

  const generateReport = (problem: Problem) => {
    // Mock report generation
    console.log(`Generating impact report for: ${problem.title}`);
  };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="glass-morphism p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{problems.length}</p>
              <p className="text-sm text-muted-foreground">Total Problems</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-morphism p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {problems.reduce((sum, p) => sum + p.tasksCompleted, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-morphism p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {problems.reduce((sum, p) => sum + p.assignedSolvers, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Active Solvers</p>
            </div>
            <Users className="h-8 w-8 text-secondary" />
          </div>
        </Card>

        <Card className="glass-morphism p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                ₹{(problems.reduce((sum, p) => sum + p.fundingRaised, 0) / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-muted-foreground">Total Funds</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </motion.div>

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="glass-morphism">
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-6">
            {/* Filter Bar */}
            <div className="flex gap-4">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className="glass-morphism"
              >
                All Problems
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                className="glass-morphism"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'planning' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('planning')}
                className="glass-morphism"
              >
                Planning
              </Button>
            </div>

            {/* Problems Grid */}
            <div className="grid gap-6">
              {filteredProblems.map((problem) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="glass-morphism p-6 hover-tilt cursor-pointer"
                        onClick={() => setSelectedProblem(problem)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{problem.title}</h3>
                          <Badge className={getPriorityColor(problem.priority)}>
                            {problem.priority}
                          </Badge>
                          <Badge className={getStatusColor(problem.status)}>
                            {problem.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {problem.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(problem.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {problem.category}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Progress</span>
                              <span className="text-sm font-medium">{problem.progress}%</span>
                            </div>
                            <Progress value={problem.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 rounded-lg bg-primary/10">
                              <CheckCircle className="h-5 w-5 text-primary mx-auto mb-1" />
                              <p className="font-medium">{problem.tasksCompleted}</p>
                              <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-secondary/10">
                              <Clock className="h-5 w-5 text-secondary mx-auto mb-1" />
                              <p className="font-medium">{problem.totalTasks - problem.tasksCompleted}</p>
                              <p className="text-xs text-muted-foreground">Pending</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-accent/10">
                              <Users className="h-5 w-5 text-accent mx-auto mb-1" />
                              <p className="font-medium">{problem.assignedSolvers}</p>
                              <p className="text-xs text-muted-foreground">Solvers</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-primary/10">
                              <TrendingUp className="h-5 w-5 text-primary mx-auto mb-1" />
                              <p className="font-medium">{problem.beneficiaries}</p>
                              <p className="text-xs text-muted-foreground">Beneficiaries</p>
                            </div>
                          </div>

                          {problem.fundingGoal > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Funding</span>
                                <span className="text-sm font-medium">
                                  ₹{problem.fundingRaised.toLocaleString()} / ₹{problem.fundingGoal.toLocaleString()}
                                </span>
                              </div>
                              <Progress 
                                value={(problem.fundingRaised / problem.fundingGoal) * 100} 
                                className="h-2" 
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateReport(problem);
                          }}
                          className="glass-morphism"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-morphism"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-morphism"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-morphism p-6">
                <h3 className="font-bold mb-4">Problems by Category</h3>
                <div className="space-y-3">
                  {['Education', 'Infrastructure', 'Healthcare', 'Environment'].map((category) => {
                    const count = problems.filter(p => p.category === category).length;
                    const percentage = problems.length > 0 ? (count / problems.length) * 100 : 0;
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{category}</span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="glass-morphism p-6">
                <h3 className="font-bold mb-4">Priority Distribution</h3>
                <div className="space-y-3">
                  {['High', 'Medium', 'Low'].map((priority) => {
                    const count = problems.filter(p => p.priority === priority).length;
                    const percentage = problems.length > 0 ? (count / problems.length) * 100 : 0;
                    return (
                      <div key={priority}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{priority} Priority</span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="glass-morphism p-6 md:col-span-2">
                <h3 className="font-bold mb-4">Impact Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <p className="text-2xl font-bold text-primary">
                      {problems.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/10">
                    <p className="text-2xl font-bold text-accent">
                      {Math.round(problems.reduce((sum, p) => sum + p.progress, 0) / problems.length || 0)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/10">
                    <p className="text-2xl font-bold text-secondary">
                      {problems.reduce((sum, p) => sum + p.totalTasks, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <p className="text-2xl font-bold text-primary">
                      ₹{(problems.reduce((sum, p) => sum + p.fundingRaised, 0) / 100000).toFixed(1)}L
                    </p>
                    <p className="text-sm text-muted-foreground">Funds Raised</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="glass-morphism p-6">
              <h3 className="font-bold mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {mockRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/5">
                    <div className="p-2 rounded-full bg-primary/20">
                      {activity.type === 'task_completed' && <CheckCircle className="h-4 w-4 text-primary" />}
                      {activity.type === 'volunteer_joined' && <Users className="h-4 w-4 text-accent" />}
                      {activity.type === 'funding_received' && <DollarSign className="h-4 w-4 text-secondary" />}
                      {activity.type === 'milestone_reached' && <TrendingUp className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}