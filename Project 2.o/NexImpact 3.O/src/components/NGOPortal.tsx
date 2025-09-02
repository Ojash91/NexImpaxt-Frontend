import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, BarChart3, Plus, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { ProblemUploadForm } from './ProblemUploadForm';
import { ImpactDashboard } from './ImpactDashboard';

interface NGOPortalProps {
  onPageChange: (page: string) => void;
}

export function NGOPortal({ onPageChange }: NGOPortalProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Clean Water Access in Rural Maharashtra",
      category: "Infrastructure",
      location: "Maharashtra, India",
      priority: "High",
      status: "Active",
      progress: 65,
      tasksCompleted: 8,
      totalTasks: 12,
      assignedSolvers: 15,
      beneficiaries: 500,
      fundingGoal: 150000,
      fundingRaised: 95000,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Digital Literacy Program for Women",
      category: "Education",
      location: "Kerala, India",
      priority: "Medium",
      status: "Planning",
      progress: 25,
      tasksCompleted: 3,
      totalTasks: 10,
      assignedSolvers: 8,
      beneficiaries: 200,
      fundingGoal: 75000,
      fundingRaised: 25000,
      createdAt: "2024-01-20"
    }
  ]);

  const stats = {
    totalProblems: problems.length,
    activeProblems: problems.filter(p => p.status === 'Active').length,
    totalBeneficiaries: problems.reduce((sum, p) => sum + p.beneficiaries, 0),
    totalFunding: problems.reduce((sum, p) => sum + p.fundingRaised, 0)
  };

  const handleProblemSubmit = (newProblem: any) => {
    const problem = {
      id: problems.length + 1,
      ...newProblem,
      status: 'Planning',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: Math.floor(Math.random() * 8) + 5,
      assignedSolvers: 0,
      beneficiaries: newProblem.expectedBeneficiaries || 0,
      fundingGoal: newProblem.fundingNeeded || 0,
      fundingRaised: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProblems([...problems, problem]);
    setActiveTab('dashboard');
  };

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
            NGO/Government Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload problems, track AI-powered solutions, and measure real-world impact
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-morphism p-6 hover-tilt">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20 neon-glow-blue">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalProblems}</p>
                <p className="text-sm text-muted-foreground">Total Problems</p>
              </div>
            </div>
          </Card>

          <Card className="glass-morphism p-6 hover-tilt">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/20 neon-glow-green">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeProblems}</p>
                <p className="text-sm text-muted-foreground">Active Problems</p>
              </div>
            </div>
          </Card>

          <Card className="glass-morphism p-6 hover-tilt">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary/20 neon-glow-purple">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalBeneficiaries.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Beneficiaries</p>
              </div>
            </div>
          </Card>

          <Card className="glass-morphism p-6 hover-tilt">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20 neon-glow-blue">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(stats.totalFunding / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Funds Raised</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <Button
            onClick={() => setActiveTab('upload')}
            variant={activeTab === 'upload' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeTab === 'upload' 
                ? 'bg-primary text-primary-foreground neon-glow-blue' 
                : 'glass-morphism hover:bg-primary/10'
            }`}
          >
            <Plus className="h-4 w-4" />
            Upload Problem
          </Button>
          
          <Button
            onClick={() => setActiveTab('dashboard')}
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeTab === 'dashboard' 
                ? 'bg-primary text-primary-foreground neon-glow-blue' 
                : 'glass-morphism hover:bg-primary/10'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Impact Dashboard
          </Button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'upload' && (
            <ProblemUploadForm onSubmit={handleProblemSubmit} />
          )}
          
          {activeTab === 'dashboard' && (
            <ImpactDashboard problems={problems} />
          )}
        </motion.div>
      </div>
    </div>
  );
}