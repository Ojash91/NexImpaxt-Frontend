import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Mic, 
  MicOff, 
  Type, 
  Volume2,
  Sparkles,
  Languages,
  Copy,
  Check
} from 'lucide-react';

interface VoiceTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  label?: string;
  className?: string;
  showLanguageHint?: boolean;
  autoTranslate?: boolean;
  required?: boolean;
}

export function VoiceTextInput({
  value,
  onChange,
  placeholder = "Type or click mic to speak...",
  multiline = false,
  rows = 3,
  label,
  className = "",
  showLanguageHint = true,
  autoTranslate = true,
  required = false
}: VoiceTextInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [hasTranslation, setHasTranslation] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationRef = useRef<number | null>(null);

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      // Audio level monitoring
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255 * 100);
        if (isRecording) {
          animationRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();

      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        // Mock AI transcription
        setTimeout(() => {
          const mockTranscriptions = [
            "We need to build a water filtration system for our village of 500 families.",
            "हमारे गांव के 500 परिवारों के लिए पानी फिल्ट्रेशन सिस्टम बनाना जरूरी है।",
            "আমাদের ৫০০ পরিবারের গ্রামের জন্য পানি পরিশোধন ব্যবস্থা গড়তে হবে।",
            "Nous devons construire un système de filtration d'eau pour notre village de 500 familles.",
            "نحن بحاجة إلى بناء نظام تنقية المياه لقريتنا التي تضم 500 عائلة."
          ];
          
          const mockLanguages = ['English', 'हिंदी', 'বাংলা', 'Français', 'العربية'];
          const randomIndex = Math.floor(Math.random() * mockTranscriptions.length);
          
          const transcribedText = mockTranscriptions[randomIndex];
          const detectedLang = mockLanguages[randomIndex];
          
          setDetectedLanguage(detectedLang);
          onChange(value + (value ? '\n\n' : '') + transcribedText);
          
          if (detectedLang !== 'English' && autoTranslate) {
            setHasTranslation(true);
          }
          
        }, 1500);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const InputComponent = multiline ? Textarea : Input;
  const inputProps = multiline ? { rows } : {};

  return (
    <div className={`voice-text-input ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label className="font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {showLanguageHint && (
            <Badge variant="outline" className="text-xs">
              <Languages className="h-3 w-3 mr-1" />
              Multi-language
            </Badge>
          )}
        </div>
      )}
      
      <div className="relative">
        <InputComponent
          {...inputProps}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`pr-24 bg-input-background border-border/50 focus:border-primary ${
            isRecording ? 'border-primary neon-glow-blue' : ''
          } ${multiline ? 'min-h-[120px]' : ''}`}
        />
        
        {/* Voice/Text Mode Toggle */}
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`h-8 w-8 p-0 ${isVoiceMode ? 'bg-primary/20 text-primary' : ''}`}
          >
            {isVoiceMode ? (
              <Mic className="h-4 w-4" />
            ) : (
              <Type className="h-4 w-4" />
            )}
          </Button>
          
          {/* Voice Recording Button */}
          {isVoiceMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <Button
                type="button"
                size="sm"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`h-8 w-8 p-0 ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                    : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                }`}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              
              {/* Audio Level Indicator */}
              {isRecording && (
                <motion.div
                  className="absolute inset-0 rounded border-2 border-primary/50"
                  animate={{
                    scale: 1 + (audioLevel / 100) * 0.2,
                    opacity: 0.3 + (audioLevel / 100) * 0.7
                  }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </motion.div>
          )}
          
          {/* Copy Button */}
          {value && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Recording Status */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 text-sm text-primary"
        >
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span>Recording... Speak clearly</span>
        </motion.div>
      )}
      
      {/* Language Detection & Translation */}
      {detectedLanguage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2"
        >
          <div className="flex items-center gap-2 text-sm">
            <Badge className="bg-accent/20 text-accent border-accent/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Detected: {detectedLanguage}
            </Badge>
            
            {hasTranslation && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                <Volume2 className="h-3 w-3 mr-1" />
                Auto-translated
              </Badge>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Voice Mode Instructions */}
      {isVoiceMode && !isRecording && showLanguageHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 p-3 rounded-lg bg-accent/10 border border-accent/20"
        >
          <div className="flex items-start gap-2">
            <Languages className="h-4 w-4 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="text-accent font-medium">Voice Mode Active</p>
              <p className="text-muted-foreground text-xs">
                Speak in any language. AI will detect and transcribe automatically.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}