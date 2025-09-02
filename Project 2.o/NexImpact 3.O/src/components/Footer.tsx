import { Github, Twitter, Linkedin, Mail, Globe, Heart } from 'lucide-react';
import nexImpactLogo from 'figma:asset/c2025a76a692f47bfef5584c40feabef2e71686f.png';

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Explore Problems', href: '#' },
        { name: 'Solver Hub', href: '#' },
        { name: 'NGO Portal', href: '#' },
        { name: 'Community', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'Help Center', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' }
      ]
    }
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-0 neural-network opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src={nexImpactLogo} alt="NexImpact" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                NexImpact
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              The world's first AI-powered global impact marketplace. 
              Connect, solve, and create meaningful change together.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:neon-glow-blue transition-all duration-300"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Globe className="w-4 h-4" />
            <span>© 2025 NexImpact. Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for global impact.</span>
          </div>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm text-muted-foreground">
            <span>Status: All systems operational</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}