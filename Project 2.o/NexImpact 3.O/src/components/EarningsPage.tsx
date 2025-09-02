import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Download, 
  ArrowUpRight, 
  Star, 
  Check, 
  Zap,
  Crown,
  Users,
  Globe,
  Infinity
} from 'lucide-react';
import { motion } from 'motion/react';
import { CounterAnimation } from './CounterAnimation';

interface EarningsPageProps {
  onPageChange: (page: string) => void;
}

export function EarningsPage({ onPageChange }: EarningsPageProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState('');

  const walletData = {
    totalBalance: 8450.75,
    pendingBalance: 1200.50,
    thisMonth: 2340.25,
    impactTokens: 156
  };

  const transactionHistory = [
    {
      id: 1,
      type: 'earned',
      description: 'Climate Data Analysis - Completed',
      amount: 450,
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdrawn',
      description: 'Withdrawal to Bank Account',
      amount: -1500,
      date: '1 week ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earned',
      description: 'Water Quality Sensors - Milestone 2',
      amount: 340,
      date: '1 week ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'bonus',
      description: 'Weekly Streak Bonus',
      amount: 100,
      date: '2 weeks ago',
      status: 'completed'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free Tier',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '3 problem applications per month',
        'Basic skill matching',
        'Community access',
        'Standard support'
      ],
      limitations: [
        'Limited to beginner problems',
        'No priority matching',
        'Basic analytics'
      ],
      buttonText: 'Current Plan',
      popular: false,
      color: 'border-white/20'
    },
    {
      name: 'Pro Subscription',
      price: { monthly: 499, yearly: 4990 },
      description: 'For serious problem solvers',
      features: [
        'Unlimited problem applications',
        'AI-powered skill matching',
        'Priority project access',
        'Advanced analytics dashboard',
        'Mentorship program access',
        'Early access to new features',
        'Premium support'
      ],
      limitations: [],
      buttonText: 'Upgrade Now',
      popular: true,
      color: 'border-primary/50 neon-glow-blue'
    },
    {
      name: 'Enterprise Tier',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'For organizations and teams',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'Custom skill assessments',
        'Dedicated account manager',
        'White-label solutions',
        'API access',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'border-accent/50'
    }
  ];

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
            Earnings & Subscriptions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your impact earnings, manage your wallet, and unlock premium features to maximize your potential.
          </p>
        </motion.div>

        {/* Wallet Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass-morphism p-8 hover:neon-glow-blue transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Digital Wallet</h2>
                  <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  {walletData.impactTokens} Impact Tokens
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <CounterAnimation
                  end={walletData.totalBalance}
                  label="Total Balance"
                  prefix="$"
                  className="glass-morphism p-4 rounded-lg hover:neon-glow-green transition-all duration-300"
                />
              </div>
              <div className="text-center">
                <CounterAnimation
                  end={walletData.pendingBalance}
                  label="Pending Balance"
                  prefix="$"
                  className="glass-morphism p-4 rounded-lg hover:neon-glow-purple transition-all duration-300"
                />
              </div>
              <div className="text-center">
                <CounterAnimation
                  end={walletData.thisMonth}
                  label="This Month"
                  prefix="$"
                  className="glass-morphism p-4 rounded-lg hover:neon-glow-blue transition-all duration-300"
                />
              </div>
              <div className="text-center">
                <CounterAnimation
                  end={walletData.impactTokens}
                  label="Impact Tokens"
                  className="glass-morphism p-4 rounded-lg hover:neon-glow-green transition-all duration-300"
                />
              </div>
            </div>

            {/* Withdrawal Section */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Withdrawal</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger className="flex-1 bg-input-background border-white/10">
                    <SelectValue placeholder="Select withdrawal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upi">UPI (Instant)</SelectItem>
                    <SelectItem value="bank">Bank Transfer (1-2 days)</SelectItem>
                    <SelectItem value="paypal">PayPal (1-2 hours)</SelectItem>
                    <SelectItem value="crypto">Crypto Wallet (Instant)</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  disabled={!withdrawMethod}
                  className="bg-gradient-to-r from-accent to-green-400 hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground mb-6">
              Unlock premium features and maximize your earning potential
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`${!isYearly ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-300`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`${isYearly ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-300`}>
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-accent/20 text-accent border-accent/30 ml-2">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`glass-morphism p-8 h-full relative transition-all duration-500 hover:scale-105 ${plan.color} ${
                  plan.popular ? 'scale-105' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1 neon-glow-blue">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  {plan.name === 'Enterprise Tier' && (
                    <div className="absolute top-4 right-4">
                      <Crown className="w-6 h-6 text-accent" />
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      {typeof plan.price.monthly === 'number' ? (
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold gradient-text">
                            ₹{isYearly ? plan.price.yearly.toLocaleString() : plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        </div>
                      ) : (
                        <div className="text-4xl font-bold gradient-text">
                          {plan.price.monthly}
                        </div>
                      )}
                      
                      {isYearly && typeof plan.price.monthly === 'number' && plan.price.monthly > 0 && (
                        <div className="text-sm text-muted-foreground mt-2">
                          <span className="line-through">₹{(plan.price.monthly * 12).toLocaleString()}</span>
                          <span className="text-accent ml-2">Save ₹{(plan.price.monthly * 12 - plan.price.yearly).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-center gap-3 opacity-60">
                            <div className="w-5 h-5 rounded-full border border-muted-foreground flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-0.5 bg-muted-foreground" />
                            </div>
                            <span className="text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:scale-105 neon-glow-blue' 
                        : plan.name === 'Free Tier'
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-gradient-to-r from-accent to-green-400 hover:scale-105'
                    } transition-all duration-300`}
                    disabled={plan.name === 'Free Tier'}
                  >
                    {plan.buttonText}
                    {plan.name !== 'Free Tier' && <ArrowUpRight className="w-4 h-4 ml-2" />}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="glass-morphism p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Transaction History
              </h3>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {transactionHistory.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'earned' ? 'bg-green-500/20' :
                      transaction.type === 'withdrawn' ? 'bg-red-500/20' : 'bg-blue-500/20'
                    }`}>
                      {transaction.type === 'earned' ? 
                        <TrendingUp className="w-5 h-5 text-green-400" /> :
                        transaction.type === 'withdrawn' ?
                        <Download className="w-5 h-5 text-red-400" /> :
                        <Star className="w-5 h-5 text-blue-400" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.description}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}