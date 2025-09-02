import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause, 
  Volume2, 
  Languages,
  Waveform,
  Sparkles
} from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, transcript?: string) => void;
  placeholder?: string;
  supportedLanguages?: string[];
  autoDetectLanguage?: boolean;
  className?: string;
}

export function VoiceRecorder({
  onRecordingComplete,
  placeholder = "Click to record or speak in any language",
  supportedLanguages = ['English', 'हिंदी', 'বাংলা', 'தமிழ்', 'ગુજરાતી', 'ಕನ್ನಡ', 'తెలుగు', 'اردو', 'മലയാളം', 'ଓଡ଼ିଆ'],
  autoDetectLanguage = true,
  className = ""
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const startRecording = async () => {
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
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Mock AI language detection and transcription
        setTimeout(() => {
          const mockLanguages = ['English', 'हिंदी', 'বাংলা', 'தமிழ்', 'اردو'];
          const detectedLang = mockLanguages[Math.floor(Math.random() * mockLanguages.length)];
          const mockTranscripts = {
            'English': 'Clean water shortage in rural areas needs immediate attention.',
            'हिंदी': 'ग्रामीण क्षेत्रों में स्वच्छ पानी की समस्या का तुरंत समाधान चाहिए।',
            'বাংলা': 'গ্রামীণ এলাকায় বিশুদ্ধ পানির সমস্যার জরুরি সমাধান প্রয়োজন।',
            'தமிழ்': 'கிராமப்புறங்களில் தூய நீர் பற்றாக்குறைக்கு உடனடி கவனம் தேவை।',
            'اردو': 'دیہی علاقوں میں صاف پانی کی کمی پر فوری توجہ کی ضرورت ہے۔'
          };
          
          setDetectedLanguage(detectedLang);
          setTranscript(mockTranscripts[detectedLang as keyof typeof mockTranscripts] || mockTranscripts['English']);
          
          if (onRecordingComplete) {
            onRecordingComplete(audioBlob, mockTranscripts[detectedLang as keyof typeof mockTranscripts]);
          }
        }, 1000);

        setHasRecording(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioLevel(0);
    }
  };

  const playRecording = () => {
    if (hasRecording && audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onended = () => setIsPlaying(false);
      
      audioRef.current.play();
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`voice-recorder ${className}`}>
      <div className="glass-morphism rounded-xl p-6 space-y-4">
        {/* Header with Language Support Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-accent" />
            <span className="font-medium">Voice Input</span>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              Global AI
            </Badge>
          </div>
          
          {autoDetectLanguage && (
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Auto-detect</span>
            </div>
          )}
        </div>

        {/* Recording Interface */}
        <div className="flex flex-col items-center space-y-4">
          {/* Main Recording Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isRecording 
                  ? 'bg-destructive hover:bg-destructive/90 neon-glow-purple' 
                  : 'bg-primary hover:bg-primary/90 neon-glow-blue'
              } transition-all duration-300`}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            
            {/* Audio Level Indicator */}
            {isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{
                  scale: 1 + (audioLevel / 100) * 0.3,
                  opacity: 0.3 + (audioLevel / 100) * 0.7
                }}
                transition={{ duration: 0.1 }}
              />
            )}
          </motion.div>

          {/* Status Text */}
          <div className="text-center">
            {isRecording ? (
              <div>
                <p className="text-primary font-medium">Recording...</p>
                <p className="text-sm text-muted-foreground">{formatTime(recordingTime)}</p>
              </div>
            ) : hasRecording ? (
              <div>
                <p className="text-accent font-medium">Recording Complete</p>
                {detectedLanguage && (
                  <p className="text-sm text-muted-foreground">
                    Detected: {detectedLanguage}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{placeholder}</p>
            )}
          </div>

          {/* Recording Controls */}
          {hasRecording && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={isPlaying ? pauseRecording : playRecording}
                className="glass-morphism"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHasRecording(false);
                  setTranscript('');
                  setDetectedLanguage('');
                  audioChunksRef.current = [];
                }}
                className="glass-morphism"
              >
                <MicOff className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Audio Visualization */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{
                    height: [4, 8 + (audioLevel / 10), 4],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Transcript Display */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20"
          >
            <div className="flex items-start gap-2 mb-2">
              <Volume2 className="h-4 w-4 text-accent mt-1" />
              <span className="text-sm font-medium text-accent">Transcript</span>
              {detectedLanguage && (
                <Badge variant="outline" className="text-xs">
                  {detectedLanguage}
                </Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed">{transcript}</p>
          </motion.div>
        )}

        {/* Supported Languages */}
        <div className="border-t border-border/50 pt-4">
          <p className="text-xs text-muted-foreground mb-2">Supported Languages:</p>
          <div className="flex flex-wrap gap-1">
            {supportedLanguages.slice(0, 6).map((lang) => (
              <Badge 
                key={lang} 
                variant="outline" 
                className="text-xs opacity-60"
              >
                {lang}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs opacity-60">
              +{supportedLanguages.length - 6} more
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}