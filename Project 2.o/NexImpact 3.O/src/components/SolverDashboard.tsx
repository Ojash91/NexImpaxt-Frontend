import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import { 
  Zap, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp, 
  Wallet, 
  Clock, 
  CheckCircle,
  Award,
  Users,
  Globe,
  Brain
} from 'lucide-react';
import { motion } from 'motion/react';
import { CounterAnimation } from './CounterAnimation';

interface SolverDashboardProps {
  onPageChange: (page: string) => void;
}

export function SolverDashboard({ onPageChange }: SolverDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    level: 15,
    xp: 2847,
    nextLevelXP: 3000,
    impactPoints: 12560,
    problemsSolved: 23,
    earnings: 8450,
    rank: 42,
    streak: 7
  };

  const achievements = [
    { id: 1, name: 'First Solution', description: 'Complete your first problem', earned: true, icon: Star },
    { id: 2, name: 'Speed Demon', description: 'Complete 5 problems in a week', earned: true, icon: Zap },
    { id: 3, name: 'Team Player', description: 'Collaborate on 10 problems', earned: true, icon: Users },
    { id: 4, name: 'Global Impact', description: 'Help solve problems on 3 continents', earned: false, icon: Globe },
    { id: 5, name: 'AI Whisperer', description: 'Complete 50 AI-enhanced problems', earned: false, icon: Brain },
    { id: 6, name: 'Top Performer', description: 'Reach top 10 leaderboard', earned: false, icon: Trophy }
  ];

  const recentProblems = [
    {
      id: 1,
      title: 'Climate Data Analysis',
      status: 'Completed',
      reward: 450,
      date: '2 days ago',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Educational App UI',
      status: 'In Progress',
      reward: 320,
      date: 'Started today',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Water Quality Sensors',
      status: 'Under Review',
      reward: 680,
      date: '1 week ago',
      difficulty: 'Advanced'
    }
  ];

  const skillProgress = [
    { skill: 'Machine Learning', level: 85, color: 'from-primary to-blue-400' },
    { skill: 'React Development', level: 92, color: 'from-secondary to-purple-400' },
    { skill: 'Data Science', level: 78, color: 'from-accent to-green-400' },
    { skill: 'UI/UX Design', level: 65, color: 'from-yellow-400 to-orange-400' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                Ready to change the world today? You're on a {userStats.streak}-day streak!
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Global Rank #{userStats.rank}
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2">
                Level {userStats.level}
              </Badge>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="glass-morphism p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {userStats.level}
                </div>
                <div>
                  <h3 className="font-semibold">Level {userStats.level} Innovator</h3>
                  <p className="text-sm text-muted-foreground">
                    {userStats.nextLevelXP - userStats.xp} XP to next level
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{userStats.xp} XP</div>
                <div className="text-sm text-muted-foreground">/ {userStats.nextLevelXP} XP</div>
              </div>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXP) * 100} 
              className="h-3 neon-glow-blue"
            />
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-morphism p-6 hover:neon-glow-blue transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <CounterAnimation end={userStats.problemsSolved} label="Problems Solved" />
          </Card>

          <Card className="glass-morphism p-6 hover:neon-glow-purple transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Wallet className="w-6 h-6 text-secondary" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <CounterAnimation end={userStats.earnings} label="Total Earnings" prefix="$" />
          </Card>

          <Card className="glass-morphism p-6 hover:neon-glow-green transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <CounterAnimation end={userStats.impactPoints} label="Impact Points" />
          </Card>

          <Card className="glass-morphism p-6 hover:neon-glow-blue transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-orange-400 text-sm font-medium">🔥 {userStats.streak} days</div>
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">Active</div>
            <div className="text-sm text-muted-foreground">Streak</div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-morphism p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Problems
                </h3>
                
                <div className="space-y-4">
                  {recentProblems.map((problem) => (
                    <div key={problem.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          problem.status === 'Completed' ? 'bg-green-500/20' :
                          problem.status === 'In Progress' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                        }`}>
                          {problem.status === 'Completed' ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> :
                            problem.status === 'In Progress' ?
                            <Clock className="w-5 h-5 text-yellow-400" /> :
                            <Target className="w-5 h-5 text-blue-400" />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium">{problem.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{problem.date}</span>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              {problem.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-accent">${problem.reward}</div>
                        <div className="text-xs text-muted-foreground">{problem.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => onPageChange('explore')}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300"
                >
                  Explore More Problems
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Achievements & Skills */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-morphism p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Achievements
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={achievement.id}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          achievement.earned 
                            ? 'bg-accent/10 border-accent/30 hover:neon-glow-green' 
                            : 'bg-white/5 border-white/10 opacity-50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${
                          achievement.earned ? 'text-accent' : 'text-muted-foreground'
                        }`} />
                        <h4 className="text-sm font-medium mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Skill Progress */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-morphism p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Skill Progress
                </h3>
                
                <div className="space-y-4">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}