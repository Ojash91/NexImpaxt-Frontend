import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Input } from './ui/input';
import { 
  Languages, 
  Search, 
  Globe, 
  Sparkles,
  Check,
  Volume2,
  Mic
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  isPopular?: boolean;
  voiceSupported?: boolean;
}

interface LanguageSelectorProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: Language) => void;
  showVoiceSupport?: boolean;
  className?: string;
}

export function LanguageSelector({ 
  selectedLanguage = 'en',
  onLanguageChange,
  showVoiceSupport = true,
  className = ""
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  const languages: Language[] = [
    // Popular Languages
    { code: 'en', name: 'English', nativeName: 'English', region: 'Global', flag: '🇺🇸', isPopular: true, voiceSupported: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', region: 'India', flag: '🇮🇳', isPopular: true, voiceSupported: true },
    { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'Global', flag: '🇪🇸', isPopular: true, voiceSupported: true },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'MENA', flag: '🇸🇦', isPopular: true, voiceSupported: true },
    { code: 'zh', name: 'Chinese', nativeName: '中文', region: 'China', flag: '🇨🇳', isPopular: true, voiceSupported: true },
    { code: 'fr', name: 'French', nativeName: 'Français', region: 'Global', flag: '🇫🇷', isPopular: true, voiceSupported: true },
    
    // Indian Languages
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'India/Bangladesh', flag: '🇮🇳', voiceSupported: true },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'India', flag: '🇮🇳', voiceSupported: true },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'India', flag: '🇮🇳', voiceSupported: true },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'India/Sri Lanka', flag: '🇮🇳', voiceSupported: true },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'India/Pakistan', flag: '🇵🇰', voiceSupported: true },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'India', flag: '🇮🇳', voiceSupported: true },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'India', flag: '🇮🇳', voiceSupported: true },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'India', flag: '🇮🇳', voiceSupported: true },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'India/Pakistan', flag: '🇮🇳', voiceSupported: true },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'India', flag: '🇮🇳', voiceSupported: true },
    
    // African Languages
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'East Africa', flag: '🇰🇪', voiceSupported: true },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', region: 'West Africa', flag: '🇳🇬', voiceSupported: true },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', region: 'West Africa', flag: '🇳🇬', voiceSupported: true },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', region: 'Nigeria', flag: '🇳🇬', voiceSupported: false },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', region: 'Ethiopia', flag: '🇪🇹', voiceSupported: false },
    
    // European Languages
    { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Europe', flag: '🇩🇪', voiceSupported: true },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'Europe', flag: '🇮🇹', voiceSupported: true },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'Brazil/Portugal', flag: '🇧🇷', voiceSupported: true },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Russia/CIS', flag: '🇷🇺', voiceSupported: true },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: 'Netherlands', flag: '🇳🇱', voiceSupported: true },
    
    // Southeast Asian Languages
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Indonesia', flag: '🇮🇩', voiceSupported: true },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Malaysia', flag: '🇲🇾', voiceSupported: true },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'Thailand', flag: '🇹🇭', voiceSupported: true },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'Vietnam', flag: '🇻🇳', voiceSupported: true },
    { code: 'tl', name: 'Filipino', nativeName: 'Filipino', region: 'Philippines', flag: '🇵🇭', voiceSupported: true },
    
    // Middle Eastern Languages
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', region: 'Iran', flag: '🇮🇷', voiceSupported: true },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Turkey', flag: '🇹🇷', voiceSupported: true },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', region: 'Israel', flag: '🇮🇱', voiceSupported: true },
    
    // East Asian Languages
    { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Japan', flag: '🇯🇵', voiceSupported: true },
    { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'South Korea', flag: '🇰🇷', voiceSupported: true },
    
    // Latin American Languages
    { code: 'qu', name: 'Quechua', nativeName: 'Runasimi', region: 'Andes', flag: '🇵🇪', voiceSupported: false },
    { code: 'ay', name: 'Aymara', nativeName: 'Aymar aru', region: 'Bolivia', flag: '🇧🇴', voiceSupported: false }
  ];

  useEffect(() => {
    const lang = languages.find(l => l.code === selectedLanguage);
    setCurrentLanguage(lang || languages[0]);
  }, [selectedLanguage]);

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularLanguages = filteredLanguages.filter(lang => lang.isPopular);
  const otherLanguages = filteredLanguages.filter(lang => !lang.isPopular);

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    onLanguageChange?.(language);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`language-selector ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="glass-morphism flex items-center gap-2 min-w-[160px] justify-start"
          >
            {currentLanguage ? (
              <>
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="flex-1 text-left">
                  {currentLanguage.nativeName}
                </span>
                {showVoiceSupport && currentLanguage.voiceSupported && (
                  <Mic className="h-3 w-3 text-accent" />
                )}
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span>Select Language</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 glass-morphism p-0" align="start">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="h-5 w-5 text-primary" />
              <span className="font-medium">Select Language</span>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                AI Powered
              </Badge>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-border/50"
              />
            </div>
            
            {showVoiceSupport && (
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Sparkles className="h-3 w-3 text-secondary" />
                <span>AI-powered voice recognition available</span>
              </div>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {/* Popular Languages */}
            {popularLanguages.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  Popular Languages
                </div>
                {popularLanguages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-muted-foreground">
                        {language.name} • {language.region}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {language.voiceSupported && (
                        <Volume2 className="h-3 w-3 text-accent" />
                      )}
                      {currentLanguage?.code === language.code && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Other Languages */}
            {otherLanguages.length > 0 && (
              <div className="p-2 border-t border-border/50">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  All Languages ({otherLanguages.length})
                </div>
                {otherLanguages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-muted-foreground">
                        {language.name} • {language.region}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {language.voiceSupported && (
                        <Volume2 className="h-3 w-3 text-accent" />
                      )}
                      {currentLanguage?.code === language.code && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border/50 bg-muted/5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-secondary" />
              <span>AI Translation available for all languages</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}