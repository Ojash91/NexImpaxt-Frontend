import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Zap, Users, Target, Wallet, MessageSquare, Info } from 'lucide-react';
import nexImpactLogo from 'figma:asset/c2025a76a692f47bfef5584c40feabef2e71686f.png';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', key: 'home', icon: Zap },
    { name: 'Explore', key: 'explore', icon: Target },
    { name: 'Solver Hub', key: 'solver', icon: Users },
    { name: 'NGO Portal', key: 'ngo', icon: Users },
    { name: 'Earnings', key: 'earnings', icon: Wallet },
    { name: 'Community', key: 'community', icon: MessageSquare },
    { name: 'About', key: 'about', icon: Info },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onPageChange('home')}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src={nexImpactLogo} alt="NexImpact" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                NexImpact
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => onPageChange(item.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 group ${
                      currentPage === item.key
                        ? 'bg-primary/20 text-primary neon-glow-blue'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => onPageChange('auth')}
                className="border-primary/30 hover:border-primary hover:neon-glow-blue transition-all duration-300"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => onPageChange('auth')}
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 neon-glow-blue"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-morphism border-t border-white/10">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      onPageChange(item.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 ${
                      currentPage === item.key
                        ? 'bg-primary/20 text-primary neon-glow-blue'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <div className="pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onPageChange('auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border-primary/30"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    onPageChange('auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}