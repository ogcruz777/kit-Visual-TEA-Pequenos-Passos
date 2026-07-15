/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck, 
  Gift, 
  BookOpen, 
  MessageCircle,
  Users,
  ShoppingBag,
  Info,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
  Phone,
  Mic,
  MoreVertical,
  Settings,
  Tv,
  Sun,
  Calendar,
  Pencil,
  Droplet,
  Utensils,
  Bath,
  ThumbsUp,
  ThumbsDown,
  HeartHandshake,
  Smile,
  Shirt,
  Sparkles,
  Bookmark,
  Loader2,
  RotateCcw,
  Mail,
  Paperclip,
  Download,
  Printer,
  Lock,
  ArrowRight,
  FileText,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Subcomponents ---

const UrgencyBar = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('urgency_timer');
        if (saved) {
          const num = parseInt(saved, 10);
          if (num > 0 && num <= 900) return num;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return 900; // 15 minutes default
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 900 : prev - 1;
        try {
          localStorage.setItem('urgency_timer', String(next));
        } catch (e) {
          console.error(e);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="urgency-bar" className="fixed top-0 left-0 w-full bg-[#e74c3c] text-white py-2.5 px-4 z-50 shadow-md border-b border-[#c0392b] flex justify-center items-center gap-2.5 sm:gap-3 font-sans select-none">
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-wider uppercase font-extrabold text-white">
        <span className="inline-flex h-2 w-2 rounded-full bg-white animate-ping" />
        <span className="text-white">Oferta Especial</span>
        <span className="text-white/65 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-white/90">Desconto Exclusivo Ativo</span>
      </div>
      
      <div className="h-4 w-px bg-white/20 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-white animate-pulse shrink-0" />
        <span className="text-[10px] sm:text-xs font-bold text-white">
          <span className="sm:hidden">Expira em:</span>
          <span className="hidden sm:inline">O preço promocional expira em:</span>
        </span>
        <span className="bg-white/20 text-white font-mono text-xs sm:text-sm font-black px-2 py-0.5 rounded-md border border-white/30 tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const SalesNotification = () => {
  const [visible, setVisible] = useState(false);
  const [purchase, setPurchase] = useState({ name: '', location: '', item: '', time: '' });
  
  const purchases = [
    { name: "Ana Júlia S.", location: "Campinas - SP", item: "Kit Completo Premium" },
    { name: "Carlos Henrique F.", location: "Belo Horizonte - MG", item: "Kit Completo Premium" },
    { name: "Patrícia Souza M.", location: "Rio de Janeiro - RJ", item: "Kit Visual TEA" },
    { name: "Roberta Lima B.", location: "São Paulo - SP", item: "Kit Completo Premium" },
    { name: "Juliana Fernandes D.", location: "Curitiba - PR", item: "Acesso Vitalício + Bônus" },
    { name: "Mariana Costa V.", location: "Porto Alegre - RS", item: "Kit Visual TEA" },
    { name: "Luciana Ramos P.", location: "Salvador - BA", item: "Kit Completo Premium" },
    { name: "Renata Alves G.", location: "Fortaleza - CE", item: "Kit Completo Premium" },
    { name: "Amanda Melo K.", location: "Goiânia - GO", item: "Kit Visual TEA" },
    { name: "Marcos Paulo R.", location: "Brasília - DF", item: "Kit Completo Premium" },
    { name: "Fernanda Gomes T.", location: "Florianópolis - SC", item: "Acesso Vitalício + Bônus" },
    { name: "Camila Barbosa L.", location: "Recife - PE", item: "Kit Completo Premium" },
    { name: "Beatriz Santos F.", location: "Vitória - ES", item: "Kit Completo Premium" },
    { name: "Dr. Roberto M. (Clínica)", location: "Ribeirão Preto - SP", item: "Kit Completo Premium" },
    { name: "Profª Sandra R.", location: "Niterói - RJ", item: "Kit Completo Premium" }
  ];

  const times = ["há 2 segundos", "há 5 segundos", "há 12 segundos", "há 22 segundos", "agora mesmo"];

  useEffect(() => {
    const showNotification = () => {
      const randPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      const randTime = times[Math.floor(Math.random() * times.length)];
      setPurchase({ ...randPurchase, time: randTime });
      setVisible(true);
      
      // Hide after 6 seconds
      setTimeout(() => setVisible(false), 6000);
    };

    // Show first popup after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Repeated interval (every 16 seconds)
    const interval = setInterval(showNotification, 16000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 120, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-[70px] sm:top-[85px] right-4 z-[99] bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-4 border border-gray-150 flex items-center gap-3.5 w-[310px] sm:w-[340px] select-none"
        >
          {/* Green Purchase Pulse Icon */}
          <div className="relative shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#f3fdf6] border border-[#2ecc71]/20">
            <ShoppingBag className="w-5 h-5 text-[#2ecc71]" />
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ecc71] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2ecc71]"></span>
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-gray-900 leading-snug truncate">
              {purchase.name} <span className="text-gray-400 font-normal text-[10px]">({purchase.location})</span>
            </p>
            <p className="text-[11px] text-gray-600 font-bold mt-0.5 truncate">
              Adquiriu: <span className="text-[#1db863]">{purchase.item}</span>
            </p>
            <p className="text-[9px] text-gray-400 font-medium mt-1 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full animate-pulse" />
              {purchase.time} • Compra Aprovada
            </p>
          </div>

          {/* Close button */}
          <button 
            onClick={() => setVisible(false)} 
            className="text-gray-300 hover:text-gray-500 p-1 transition-colors cursor-pointer"
          >
            <span className="text-xs font-extrabold font-sans">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`mb-3 rounded-xl border transition-all duration-300 ${isOpen ? 'border-[#2ecc71]/30 bg-[#f3fdf6]/40 shadow-xs' : 'border-gray-150 bg-white hover:border-gray-300'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-black text-gray-900 px-4 py-3.5 sm:px-6 sm:py-5 cursor-pointer transition-colors"
      >
        <span className="pr-4 text-xs sm:text-base">{question}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 sm:w-5 h-5 text-[#2ecc71] shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 sm:px-6 sm:pb-5 text-gray-650 text-xs sm:text-sm leading-relaxed font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Video Player Subcomponent ---
const HeroVideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(() => {
    const defaultUrl = 'https://vimeo.com/1205612287?share=copy&fl=sv&fe=ci';
    const saved = localStorage.getItem('kit_visual_tea_video_url');
    if (saved && saved.includes('vimeo.com') && !saved.includes('1205612287')) {
      localStorage.setItem('kit_visual_tea_video_url', defaultUrl);
      return defaultUrl;
    }
    return saved || defaultUrl;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [tempUrl, setTempUrl] = useState(videoUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Garante que a tela de carregamento some em no máximo 2s para o usuário assistir imediatamente
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleWatchAgain = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsEnded(false);
    setReloadKey(prev => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data) {
          // YouTube ended detection (state 0 is ended)
          if (data.event === 'onStateChange' && data.info === 0) {
            setIsEnded(true);
          }
          if (data.event === 'infoDelivery' && data.info && data.info.playerState === 0) {
            setIsEnded(true);
          }
          // Vimeo ended detection
          if (data.event === 'finish' || data.event === 'ended') {
            setIsEnded(true);
          }
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Auto-unmute on first user interaction to bypass browser autoplay restrictions
  useEffect(() => {
    if (!isPlaying) return;
    let interacted = false;

    const unmuteOnInteraction = () => {
      if (interacted) return;
      interacted = true;
      setIsMuted(false);

      // Send postMessage to active iframe
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        try {
          // Unmute YouTube
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'unMute'
          }), '*');
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'setVolume',
            value: 100
          }), '*');
          
          // Unmute Vimeo
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'setMuted',
            value: false
          }), '*');
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'setVolume',
            value: 1
          }), '*');
        } catch (e) {
          console.error('Error sending unmute postMessage to iframe', e);
        }
      }

      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }

      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
      document.removeEventListener('mousedown', unmuteOnInteraction);
      document.removeEventListener('keydown', unmuteOnInteraction);
    };

    document.addEventListener('click', unmuteOnInteraction, { passive: true });
    document.addEventListener('touchstart', unmuteOnInteraction, { passive: true });
    document.addEventListener('mousedown', unmuteOnInteraction, { passive: true });
    document.addEventListener('keydown', unmuteOnInteraction, { passive: true });

    return cleanup;
  }, [isPlaying]);

  const maxTimeRef = useRef(0);
  const lastTimeRef = useRef(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime > maxTimeRef.current + 1.5) {
      video.currentTime = maxTimeRef.current;
    } else {
      maxTimeRef.current = Math.max(maxTimeRef.current, video.currentTime);
    }
    lastTimeRef.current = video.currentTime;
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleSeeking = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime > maxTimeRef.current) {
      video.currentTime = maxTimeRef.current;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleUnmute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(false);

    // Send postMessage to active iframe
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'unMute'
        }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'setVolume',
          value: 100
        }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({
          method: 'setMuted',
          value: false
        }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({
          method: 'setVolume',
          value: 1
        }), '*');
      } catch (err) {
        console.error('Error sending unmute postMessage', err);
      }
    }

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Send postMessage to active iframe
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      try {
        if (newMuted) {
          // Mute YouTube
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'mute'
          }), '*');
          // Mute Vimeo
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'setMuted',
            value: true
          }), '*');
        } else {
          // Unmute YouTube
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'unMute'
          }), '*');
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'setVolume',
            value: 100
          }), '*');
          // Unmute Vimeo
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'setMuted',
            value: false
          }), '*');
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'setVolume',
            value: 1
          }), '*');
        }
      } catch (err) {
        console.error('Error sending postMessage', err);
      }
    }

    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const defaults = {
    drivePlaceholder: 'https://vimeo.com/1205612287?share=copy&fl=sv&fe=ci',
    previewTitle: 'Apresentação do Kit Visual TEA'
  };

  const getEmbedInfo = (url: string, muted: boolean) => {
    const targetUrl = url || defaults.drivePlaceholder;

    // Dropbox detection and conversion
    if (targetUrl.includes('dropbox.com')) {
      let directUrl = targetUrl;
      if (directUrl.includes('dl=0')) {
        directUrl = directUrl.replace('dl=0', 'raw=1');
      } else if (!directUrl.includes('raw=1')) {
        directUrl = directUrl + (directUrl.includes('?') ? '&' : '?') + 'raw=1';
      }
      return {
        type: 'direct',
        embedUrl: directUrl
      };
    }

    // Google Drive regex
    const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i;
    const driveMatch = targetUrl.match(driveRegex);
    if (driveMatch && driveMatch[1]) {
      return {
        type: 'drive',
        embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview?autoplay=0`
      };
    }

    // YouTube regex
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const ytMatch = targetUrl.match(ytRegex);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&mute=${muted ? 1 : 0}&controls=1&enablejsapi=1`
      };
    }

    // Vimeo regex
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;
    const vimeoMatch = targetUrl.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        type: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0&muted=${muted ? 1 : 0}&loop=0&autopause=0&controls=1&title=0&byline=0&portrait=0&playsinline=1&dnt=1&api=1`
      };
    }

    // Direct mp4 file
    if (targetUrl.match(/\.(mp4|webm|ogg)$/i) || targetUrl.includes('.mp4') || targetUrl.includes('.webm')) {
      return {
        type: 'direct',
        embedUrl: targetUrl
      };
    }

    if (targetUrl.includes('youtube.com/embed/') || targetUrl.includes('player.vimeo.com/video/')) {
      const isYt = targetUrl.includes('youtube');
      let finalUrl = targetUrl;
      
      // Remove any autoplay, loop/playlist configurations to prevent autoplaying and looping
      finalUrl = finalUrl.replace(/[?&]autoplay=[01]/g, '').replace(/[?&]loop=[01]/g, '').replace(/[?&]playlist=[a-zA-Z0-9_-]+/g, '');
      
      if (isYt) {
        if (finalUrl.includes('mute=')) {
          finalUrl = finalUrl.replace(/mute=[01]/, `mute=${muted ? 1 : 0}`);
        } else {
          finalUrl = finalUrl + (finalUrl.includes('?') ? '&' : '?') + `mute=${muted ? 1 : 0}`;
        }
        if (!finalUrl.includes('enablejsapi=1')) {
          finalUrl = finalUrl + '&enablejsapi=1';
        }
        finalUrl = finalUrl + '&autoplay=0';
      } else {
        if (finalUrl.includes('muted=')) {
          finalUrl = finalUrl.replace(/muted=[01]/, `muted=${muted ? 1 : 0}`);
        } else {
          finalUrl = finalUrl + (finalUrl.includes('?') ? '&' : '?') + `muted=${muted ? 1 : 0}`;
        }
        if (!finalUrl.includes('api=1')) {
          finalUrl = finalUrl + '&api=1';
        }
        finalUrl = finalUrl + '&loop=0&autoplay=0';
      }
      return {
        type: isYt ? 'youtube' : 'vimeo',
        embedUrl: finalUrl
      };
    }

    return { type: 'direct', embedUrl: targetUrl };
  };

  const currentVideo = getEmbedInfo(videoUrl, isMuted);

  const handleSave = () => {
    setVideoUrl(tempUrl);
    localStorage.setItem('kit_visual_tea_video_url', tempUrl);
    setShowConfig(false);
    setIsPlaying(true);
    setLoading(true);
  };

  const handleReset = () => {
    setTempUrl('');
    setVideoUrl('');
    localStorage.removeItem('kit_visual_tea_video_url');
    setShowConfig(false);
    setIsPlaying(false);
    setLoading(false);
  };

  return (
    <div className="max-w-[420px] mx-auto my-8 px-2 sm:px-4">
      <div className="relative group rounded-3xl overflow-hidden bg-slate-950 p-1 sm:p-2 shadow-2xl shadow-brand-dark/20 border border-slate-200/50">
        
        {/* superior badge and settings gear */}
        <div className="absolute top-4 inset-x-4 z-20 flex justify-between items-center pointer-events-none">
          <span className="bg-brand-medium/90 backdrop-blur text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 select-none">
            <Tv className="w-3.5 h-3.5" /> VÍDEO EXPOSITIVO
          </span>
          <div className="flex gap-1.5 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-full shadow-md border border-white/10 transition-all hover:scale-105"
              title={isMuted ? "Ligar Som" : "Mudo"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
            <button
              onClick={() => {
                setTempUrl(videoUrl);
                setShowConfig(true);
              }}
              className="bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-full shadow-md border border-white/10 transition-all hover:scale-105"
              title="Configurar Vídeo"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Frame */}
        <div className="aspect-[9/16] w-full relative rounded-2xl overflow-hidden bg-slate-900" style={{ aspectRatio: '9/16' }}>
          {!isPlaying ? (
            <div 
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => {
                setIsPlaying(true);
                setIsMuted(false);
                setLoading(true);
              }}
            >
              <div className="absolute inset-0 bg-slate-950/60 z-10 transition-colors hover:bg-slate-950/50" />
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000&auto=format&fit=crop" 
                alt="Rotina para autistas" 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              
              <div className="relative z-20 flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-medium hover:bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all border-4 border-white/40 animate-pulse">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
                </div>
                <div className="text-center px-4">
                  <h3 className="text-white text-base sm:text-lg font-black tracking-tight drop-shadow-md">
                    Descubra Como Funciona o Kit Por Dentro
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-xs">
                    Clique para assistir à apresentação em vídeo
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {currentVideo.type === 'youtube' || currentVideo.type === 'vimeo' || currentVideo.type === 'drive' ? (
                <div className="w-full h-full relative overflow-hidden bg-slate-900 object-cover" style={{ objectFit: 'cover' }}>
                  <iframe
                    key={reloadKey}
                    src={currentVideo.embedUrl}
                    title={defaults.previewTitle}
                    className="w-full h-full border-0 absolute inset-0 pointer-events-auto object-cover"
                    style={{ objectFit: 'cover' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => {
                      setLoading(false);
                      if (!isMuted) {
                        setTimeout(() => {
                          const iframe = document.querySelector('iframe');
                          if (iframe && iframe.contentWindow) {
                            try {
                              iframe.contentWindow.postMessage(JSON.stringify({
                                event: 'command',
                                func: 'unMute'
                              }), '*');
                              iframe.contentWindow.postMessage(JSON.stringify({
                                event: 'command',
                                func: 'setVolume',
                                value: 100
                              }), '*');
                              iframe.contentWindow.postMessage(JSON.stringify({
                                method: 'setMuted',
                                value: false
                              }), '*');
                              iframe.contentWindow.postMessage(JSON.stringify({
                                method: 'setVolume',
                                value: 1
                              }), '*');
                            } catch (e) {
                              console.error(e);
                            }
                          }
                        }, 500);
                      }
                    }}
                  ></iframe>
                  {/* Subtle visual overlay that is completely non-blocking to pointers and page scrolling */}
                  <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none select-none" />
                  
                  {/* Centered Loading Overlay */}
                  {loading && (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs select-none pointer-events-auto">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-brand-medium animate-spin" />
                        <span className="text-white/90 text-xs font-bold tracking-wider uppercase">Carregando apresentação...</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : currentVideo.type === 'direct' ? (
                <div className="w-full h-full relative overflow-hidden bg-slate-900 object-cover" style={{ objectFit: 'cover' }}>
                  <video
                    key={reloadKey}
                    ref={videoRef}
                    src={currentVideo.embedUrl}
                    loop={false}
                    muted={isMuted}
                    controls
                    playsInline
                    className="w-full h-full object-cover absolute inset-0 pointer-events-auto"
                    style={{ objectFit: 'cover' }}
                    onLoadStart={() => setLoading(true)}
                    onWaiting={() => setLoading(true)}
                    onCanPlay={() => setLoading(false)}
                    onPlaying={() => setLoading(false)}
                    onEnded={() => setIsEnded(true)}
                  ></video>
                  {/* Subtle visual overlay that is completely non-blocking to pointers and page scrolling */}
                  <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none select-none" />
                  
                  {/* Centered Loading Overlay */}
                  {loading && (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs select-none pointer-events-auto">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-brand-medium animate-spin" />
                        <span className="text-white/90 text-xs font-bold tracking-wider uppercase">Carregando apresentação...</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-950 p-6 text-center text-white">
                  <div>
                    <Video className="w-12 h-12 mx-auto text-brand-medium mb-3" />
                    <p className="font-bold text-sm">Nenhum vídeo configurado</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm">
                      Clique no botão de configurações no canto superior direito para colar seu link.
                    </p>
                  </div>
                </div>
              )}

              {/* Floating "Ligar Som" overlay button when muted */}
              {isMuted && !loading && !isEnded && (
                <button
                  onClick={(e) => handleUnmute(e)}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-brand-medium hover:bg-brand-dark hover:scale-105 active:scale-95 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white pointer-events-auto transition-all animate-bounce"
                >
                  <Volume2 className="w-4.5 h-4.5 animate-pulse text-white" />
                  <span>🔊 LIGAR O SOM</span>
                </button>
              )}

              {/* Floating "Assistir de novo" overlay button when video has ended */}
              {isEnded && !loading && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-xs transition-all pointer-events-auto">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 text-center px-6"
                  >
                    <button 
                      onClick={handleWatchAgain}
                      className="w-16 h-16 bg-brand-medium hover:bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all border-4 border-white cursor-pointer hover:scale-110 active:scale-95"
                    >
                      <RotateCcw className="w-7 h-7 text-white" />
                    </button>
                    <span className="text-white text-sm sm:text-base font-black tracking-wide uppercase drop-shadow">Fim da apresentação</span>
                    <button
                      onClick={handleWatchAgain}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full border border-white/20 transition-all active:scale-95 cursor-pointer uppercase"
                    >
                      Assistir de novo
                    </button>
                  </motion.div>
                </div>
              )}

            </>
          )}

          {/* Configuration Overlay */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-center items-center text-white"
              >
                <div className="max-w-md w-full text-center space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-brand-light flex items-center justify-center gap-2">
                      <Settings className="w-5 h-5 animate-spin-slow text-brand-medium" /> Como Adicionar Vídeos
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-2 leading-relaxed">
                      Cole abaixo o link do seu vídeo do <strong>YouTube</strong>, <strong>Vimeo</strong>, <strong>Google Drive</strong> ou um arquivo direto <strong>.mp4</strong>. Nós tratamos e formatamos o link automaticamente!
                    </p>
                  </div>

                  <div className="space-y-2 text-left bg-slate-900 p-4 rounded-xl border border-white/5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-light block">
                      Endereço (URL) do Vídeo:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-brand-medium focus:outline-none text-white font-medium shadow-inner"
                      placeholder="Ex: https://www.youtube.com/watch?v=g2f04Uu8Gis"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowConfig(false)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-2.5 text-xs font-bold transition-all"
                    >
                      Cancelar
                    </button>
                    {videoUrl && (
                      <button
                        onClick={handleReset}
                        className="bg-red-950 hover:bg-red-900 text-red-200 rounded-lg px-3 py-2.5 text-xs font-bold transition-all border border-red-900/40"
                      >
                        Remover
                      </button>
                    )}
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-brand-medium hover:bg-brand-dark text-white rounded-lg py-2.5 text-xs font-black transition-all shadow-md shadow-brand-medium/10"
                    >
                      Salvar Vídeo
                    </button>
                  </div>

                  <div className="text-[10px] text-gray-400/85 pt-3 border-t border-white/5 leading-normal text-left">
                    <p className="font-semibold text-brand-light">💡 Instruções úteis:</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1 text-gray-400">
                      <li>Use o link superior do seu navegador ao assistir ao seu vídeo.</li>
                      <li>O vídeo ficará salvo permanentemente no seu navegador.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Materials Preview Interactive Section ---

interface CardData {
  id: string;
  label: string;
  borderColor: string;
  emoji: string;
  subtitle?: string;
  timeBadge?: string;
}

const tab1Cards: CardData[] = [
  { id: "tab1-card1", label: "ACORDAR", borderColor: "#f5c518", emoji: "🌅" },
  { id: "tab1-card2", label: "ESCOVAR OS DENTES", borderColor: "#87ceeb", emoji: "🦷" },
  { id: "tab1-card3", label: "TOMAR BANHO", borderColor: "#4fc3f7", emoji: "🚿" },
  { id: "tab1-card4", label: "SE VESTIR", borderColor: "#25a862", emoji: "👕" },
  { id: "tab1-card5", label: "CAFÉ DA MANHÃ", borderColor: "#f97316", emoji: "🍳" }
];

const tab2Cards: CardData[] = [
  { id: "tab2-card1", label: "ÁGUA", borderColor: "#87ceeb", emoji: "💧" },
  { id: "tab2-card2", label: "QUERO COMER", borderColor: "#f97316", emoji: "🍽️" },
  { id: "tab2-card3", label: "BANHEIRO", borderColor: "#f5c518", emoji: "🚽" },
  { id: "tab2-card4", label: "PRECISO DE AJUDA", borderColor: "#25a862", emoji: "🙋" },
  { id: "tab2-card5", label: "NÃO QUERO", borderColor: "#e03030", emoji: "🚫" }
];

const tab3Cards: CardData[] = [
  { id: "tab3-card1", label: "FAZENDO AMIGOS", subtitle: "Como me apresentar", borderColor: "#f5c518", emoji: "🤝" },
  { id: "tab3-card2", label: "NA ESCOLA", subtitle: "Como me comportar", borderColor: "#87ceeb", emoji: "🎒" },
  { id: "tab3-card3", label: "NO MÉDICO", subtitle: "O que vai acontecer", borderColor: "#25a862", emoji: "🩺" },
  { id: "tab3-card4", label: "NO MERCADO", subtitle: "Como me comportar", borderColor: "#f97316", emoji: "🛒" },
  { id: "tab3-card5", label: "ESPERAR A VEZ", subtitle: "Paciência e respeito", borderColor: "#9c27b0", emoji: "⏳" }
];

const tab4Cards: CardData[] = [
  { id: "tab4-card1", label: "LAVAR AS MÃOS", timeBadge: "2 min", borderColor: "#87ceeb", emoji: "🧼" },
  { id: "tab4-card2", label: "ARRUMAR A CAMA", timeBadge: "5 min", borderColor: "#9c27b0", emoji: "🛏️" },
  { id: "tab4-card3", label: "GUARDAR BRINQUEDOS", timeBadge: "5 min", borderColor: "#f5c518", emoji: "🧸" },
  { id: "tab4-card4", label: "POR A MESA", timeBadge: "3 min", borderColor: "#f97316", emoji: "🍽️" },
  { id: "tab4-card5", label: "COLOCAR SAPATO", timeBadge: "2 min", borderColor: "#25a862", emoji: "👟" }
];

const resizeAndCompressImage = (
  base64Str: string,
  maxWidth: number,
  maxHeight: number,
  callback: (resized: string) => void
) => {
  const img = new Image();
  img.src = base64Str;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressed);
    } else {
      callback(base64Str);
    }
  };
  img.onerror = () => {
    callback(base64Str);
  };
};

// --- INDEXED DB ROBUST STORAGE FOR CUSTOM IMAGES ---
const DB_NAME = "KitVisualTEADB";
const STORE_NAME = "custom_images_store";
const DB_VERSION = 1;

const initIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB não suportado por este navegador"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      resolve((e.target as IDBOpenDBRequest).result);
    };
    request.onerror = (e) => {
      reject((e.target as IDBOpenDBRequest).error);
    };
  });
};

const saveToIndexedDB = (key: string, value: string): Promise<void> => {
  return initIndexedDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
};

const getAllFromIndexedDB = (): Promise<Record<string, string>> => {
  return initIndexedDB().then((db) => {
    return new Promise<Record<string, string>>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const results: Record<string, string> = {};
      request.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
        if (cursor) {
          results[cursor.key as string] = cursor.value as string;
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  });
};

const clearAllIndexedDB = (): Promise<void> => {
  return initIndexedDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
};

const defaultKitImages: Record<string, string> = {
  "tab1-card1": "https://i.imgur.com/JAoEHAd.jpeg", // ACORDAR
  "tab1-card2": "https://i.imgur.com/sr2Slzb.jpeg", // ESCOVAR OS DENTES
  "tab1-card3": "https://i.imgur.com/Q17OBEe.jpeg", // TOMAR BANHO
  "tab1-card4": "https://i.imgur.com/mw9NSzm.jpeg", // SE VESTIR
  "tab1-card5": "https://i.imgur.com/GNSBc0P.jpeg", // CAFÉ DA MANHÃ

  "tab2-card1": "https://i.imgur.com/H6f0fQE.jpeg", // ÁGUA
  "tab2-card2": "https://i.imgur.com/DYPE60k.jpeg", // QUERO COMER
  "tab2-card3": "https://i.imgur.com/C9ynggW.jpeg", // BANHEIRO
  "tab2-card4": "https://i.imgur.com/gfMTkYF.jpeg", // PRECISO DE AJUDA
  "tab2-card5": "https://i.imgur.com/z69Gwcm.jpeg", // NÃO QUERO

  "tab3-card1": "https://i.imgur.com/inHv4OM.jpeg", // FAZENDO AMIGOS
  "tab3-card2": "https://i.imgur.com/9BzoaAr.jpeg", // NA ESCOLA
  "tab3-card3": "https://i.imgur.com/EvbKtFQ.jpeg", // NO MÉDICO
  "tab3-card4": "https://i.imgur.com/W4L56Ij.jpeg", // NO MERCADO
  "tab3-card5": "https://i.imgur.com/KjId1TC.jpeg", // ESPERAR A VEZ

  "tab4-card1": "https://i.imgur.com/l3vz3li.jpeg", // LAVAR AS MÃOS
  "tab4-card2": "https://i.imgur.com/FDGOzHZ.jpeg", // ARRUMAR A CAMA
  "tab4-card3": "https://i.imgur.com/0GvOPDb.jpeg", // GUARDAR BRINQUEDOS
  "tab4-card4": "https://i.imgur.com/KZ62BMB.jpeg", // POR A MESA
  "tab4-card5": "https://i.imgur.com/x2OKlAJ.jpeg"  // COLOCAR SAPATO
};

const getDirectImageUrl = (url: string): string => {
  if (!url) return "";
  
  const knownMap: Record<string, string> = {
    "uVO80ef": "ZVi4Uub",
    "o2z7GJk": "FXDI38K",
    "CGPvIgc": "Kgx6lNf",
    "iwu7tYK": "4fKsljH",
    "64HncyK": "nX09iTx"
  };

  if (url.includes("imgur.com")) {
    if (url.match(/\.(jpeg|jpg|gif|png|webp)/i) && url.includes("i.imgur.com")) {
      return url;
    }

    const cleanedUrl = url.split("?")[0].split("#")[0];
    const parts = cleanedUrl.split("/");
    let lastPart = parts.pop() || parts.pop() || "";
    
    if ((lastPart === "a" || lastPart === "gallery") && parts.length > 0) {
      lastPart = parts.pop() || "";
    }
    
    if (lastPart) {
      if (knownMap[lastPart]) {
        return `https://i.imgur.com/${knownMap[lastPart]}.png`;
      }
      return `https://i.imgur.com/${lastPart}.png`;
    }
  }
  return url;
};

const MaterialsPreview = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('kit_visual_tea_custom_images');
      const parsed = saved ? JSON.parse(saved) : {};
      return { ...defaultKitImages, ...parsed };
    } catch (e) {
      return { ...defaultKitImages };
    }
  });

  // Load custom images from IndexedDB on mount to prevent data loss from volatile iframe localStorage
  useEffect(() => {
    getAllFromIndexedDB()
      .then((dbData) => {
        if (dbData && Object.keys(dbData).length > 0) {
          setUploadedImages((prev) => {
            const merged: Record<string, string> = { ...defaultKitImages, ...dbData, ...prev };
            // Auto back up any new local items to IndexedDB
            Object.entries(merged).forEach(([key, val]) => {
              if (val) {
                saveToIndexedDB(key, val as string).catch(() => {});
              }
            });
            // Keep localStorage updated too
            try {
              localStorage.setItem('kit_visual_tea_custom_images', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        } else {
          // Fallback: If IndexedDB is empty, migrate files from localStorage to IndexedDB
          const keys = Object.keys(uploadedImages);
          if (keys.length > 0) {
            keys.forEach((key) => {
              const base64 = uploadedImages[key];
              if (base64) {
                saveToIndexedDB(key, base64).catch(() => {});
              }
            });
          }
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar do IndexedDB:", err);
      });
  }, []);

  // Migrate existing custom images from old prefixes (secX-) to new (tabX-) and compress oversized ones
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kit_visual_tea_custom_images');
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, string>;
        const keys = Object.keys(parsed);
        let updatedMap: Record<string, string> = { ...parsed };
        let stateChanged = false;

        // 1. Convert old prefix keys to new ones so existing uploaded images are preserved
        for (const key of keys) {
          if (key.startsWith('sec')) {
            const newKey = key.replace(/^sec/, 'tab');
            if (!updatedMap[newKey] && parsed[key]) {
              updatedMap[newKey] = parsed[key];
              stateChanged = true;
            }
          }
        }

        // Apply prefix migration synchronously details to allow fast rendering
        if (stateChanged) {
          localStorage.setItem('kit_visual_tea_custom_images', JSON.stringify(updatedMap));
          setUploadedImages(updatedMap);
        }

        // 2. Compress large raw files to prevent LocalStorage QuotaExceededError
        const keysToCompress = Object.keys(updatedMap).filter(
          k => updatedMap[k] && updatedMap[k].length > 100000
        );

        if (keysToCompress.length > 0) {
          console.log("Optimizing and compressing custom image assets in storage...");
          const compressPromises = keysToCompress.map(key => {
            return new Promise<{ key: string, val: string }>((resolve) => {
              const base64Str = updatedMap[key];
              resizeAndCompressImage(base64Str, 320, 260, (compressed) => {
                resolve({ key, val: compressed });
              });
            });
          });

          Promise.all(compressPromises).then((results) => {
            setUploadedImages((currentUploads) => {
              const finalMap = { ...currentUploads };
              results.forEach(r => {
                finalMap[r.key] = r.val;
                // Also write optimized to IndexedDB
                saveToIndexedDB(r.key, r.val).catch(() => {});
              });
              localStorage.setItem('kit_visual_tea_custom_images', JSON.stringify(finalMap));
              return finalMap;
            });
            console.log("Compression and optimization complete!");
          }).catch(err => {
            console.error("Image compression error:", err);
          });
        }
      }
    } catch (e) {
      console.error("Error migrating localStorage custom images:", e);
    }
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftValue = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftValue.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftValue.current - walk;
  };

  const handleScrollStep = (direction: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardStep = 180 + 16; // width + gap
    container.scrollBy({ left: direction * cardStep, behavior: 'smooth' });
  };

  const handleImageUpload = (cardId: string, base64: string) => {
    setUploadedImages(prev => {
      const updated = { ...prev, [cardId]: base64 };
      try {
        localStorage.setItem('kit_visual_tea_custom_images', JSON.stringify(updated));
      } catch (e: any) {
        console.warn("Local storage sync bypassed (IndexedDB is handling it):", e);
      }
      return updated;
    });

    saveToIndexedDB(cardId, base64).catch(err => {
      console.error("IndexedDB write error:", err);
    });
  };

  const handleSaveBackup = () => {
    try {
      const jsonString = JSON.stringify(uploadedImages, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      downloadAnchor.download = "kit-visual-tea-backup.json";
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erro ao gerar backup de imagens:", e);
    }
  };

  const handleLoadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === 'object') {
            const keys = Object.keys(parsed);
            const newState = { ...uploadedImages };

            for (const key of keys) {
              const base64 = parsed[key];
              if (typeof base64 === 'string') {
                newState[key] = base64;
                await saveToIndexedDB(key, base64).catch(err => console.error("DB error:", err));
              }
            }

            setUploadedImages(newState);
            try {
              localStorage.setItem('kit_visual_tea_custom_images', JSON.stringify(newState));
            } catch (err) {
              console.error("LocalStorage sync warning:", err);
            }

            alert("Progresso importado com sucesso! Todas as suas imagens customizadas foram restauradas.");
          } else {
            alert("O arquivo selecionado não contém um backup de imagens válido.");
          }
        }
      } catch (err) {
        console.error("Erro ao ler backup:", err);
        alert("Erro ao importar backup. Certifique-se de que selecionou o arquivo .json correto.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAllCustoms = () => {
    if (window.confirm("Deseja realmente remover TODAS as imagens anexadas e restaurar o Kit original com emojis?")) {
      setUploadedImages({});
      localStorage.removeItem('kit_visual_tea_custom_images');
      clearAllIndexedDB()
        .then(() => {
          alert("Todas as personalizações foram restauradas para o padrão.");
        })
        .catch((err) => {
          console.error("Erro ao limpar banco de dados:", err);
        });
    }
  };

  const scrollToPricing = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: 1, title: "ROTINAS VISUAIS", icon: "🌅", cards: tab1Cards },
    { id: 2, title: "COMUNICAÇÃO", icon: "💬", cards: tab2Cards },
    { id: 3, title: "HISTÓRIAS SOCIAIS", icon: "📖", cards: tab3Cards },
    { id: 4, title: "ATIVIDADES", icon: "⭐", cards: tab4Cards }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];
  const activeCards = currentTabObj.cards;

  return (
    <section id="materiais-por-dentro" className="py-12 px-4 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a7a4a] mb-2 tracking-tight">
            Explore o Kit por Dentro
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto font-bold leading-relaxed px-4">
            Desenvolvemos cada material pensando no bem estar da sua criança. Escolha uma aba para visualizar:
          </p>
          <div className="w-20 h-1 bg-[#1a7a4a] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Tab Buttons Row inside light green rounded container */}
        <div className="bg-[#e8fbf0] p-1.5 sm:p-2.5 rounded-[20px] sm:rounded-[24px] max-w-3xl mx-auto border border-green-150/60 shadow-sm mb-4 sm:mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 sm:py-3 px-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs md:text-sm font-black tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-[#1a7a4a] text-white shadow-md shadow-[#1a7a4a]/10"
                      : "bg-[#d4f5e3] text-[#1a7a4a] hover:bg-[#c3edd4]"
                  }`}
                >
                  <span className="text-sm sm:text-base select-none leading-none">{tab.icon}</span>
                  <span className="truncate">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Below Tabs - Horizontal Scroll Area with fade transition */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left & Right navigation buttons for desktop click */}
          <button 
            onClick={() => handleScrollStep(-1)}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-25 bg-[#1db863] text-white hover:bg-[#1a7a4a] rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg transition-all border-2 border-white select-none cursor-pointer hover:scale-105 active:scale-95"
            title="Anterior"
          >
            <span className="text-lg leading-none font-black font-mono">←</span>
          </button>
          
          <button 
            onClick={() => handleScrollStep(1)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-25 bg-[#1db863] text-white hover:bg-[#1a7a4a] rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg transition-all border-2 border-white select-none cursor-pointer hover:scale-105 active:scale-95"
            title="Próximo"
          >
            <span className="text-lg leading-none font-black font-mono">→</span>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-2xl bg-white/45 border border-slate-200/50 p-4 sm:p-6 shadow-sm overflow-hidden"
            >
              {/* Fade Gradient on right edge */}
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />

              {/* Progress Indicator hint and category tag */}
              <div className="flex justify-between items-center mb-4 px-1 text-[11px] font-extrabold text-[#1a7a4a]/85 uppercase tracking-widest select-none">
                <span className="bg-[#e8fbf0] py-1 px-3 rounded-full flex items-center gap-1.5">
                  Visualizando: <strong className="font-black text-[#1a7a4a]">{currentTabObj.title}</strong>
                </span>
                <span className="flex items-center gap-1 animate-pulse font-bold text-gray-400">
                  arraste para ver mais →
                </span>
              </div>

              {/* Active list container */}
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing pb-4"
              >
                {activeCards.map((card) => {
                  const customImage = uploadedImages[card.id] || uploadedImages[card.id.replace(/^tab/, 'sec')];

                  const handleCardClick = () => {
                    const inputElement = document.getElementById(`file-input-${card.id}`) as HTMLInputElement | null;
                    inputElement?.click();
                  };

                  const handleFileIn = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          resizeAndCompressImage(reader.result, 320, 260, (compressedBase64) => {
                            handleImageUpload(card.id, compressedBase64);
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  };

                  return (
                    <div
                      key={card.id}
                      onClick={handleCardClick}
                      className="w-[180px] h-[220px] flex-shrink-0 bg-white border-[3px] rounded-[16px] flex flex-col justify-between items-center text-center relative snap-start shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-[1.03] hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border-solid"
                      style={{ borderColor: card.borderColor }}
                    >
                      <input
                        type="file"
                        id={`file-input-${card.id}`}
                        onChange={handleFileIn}
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                      />

                      {/* Image Upload Area (150px height as requested) */}
                      <div className="h-[150px] w-full relative overflow-hidden flex flex-col justify-center items-center bg-gray-50 flex-shrink-0">
                        {customImage ? (
                          <>
                            <img
                              src={getDirectImageUrl(customImage)}
                              alt={card.label}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Hover Edit Action */}
                            <div className="absolute top-2 right-2 bg-slate-900/80 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none z-20">
                              <Pencil className="w-3.5 h-3.5 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="w-[158px] h-[128px] border-2 border-dashed border-[#25a862] rounded-xl flex flex-col items-center justify-center p-1.5 bg-green-50/10 hover:bg-green-50/20 transition-colors m-auto">
                            {/* Big card emoji representative */}
                            <span className="text-[50px] leading-none mb-1.5 select-none filter drop-shadow-sm flex items-center justify-center">
                              {card.emoji}
                            </span>
                            
                            {/* Small camera overlay indicator */}
                            <div className="flex items-center justify-center gap-1 leading-none text-[#1a7a4a] bg-white/90 border border-emerald-150 py-1.5 px-2.5 rounded-full shadow-xs">
                              <span className="text-xs select-none">📷</span>
                              <span className="text-[9px] font-black uppercase tracking-wider select-none leading-none">
                                Personalizar
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Hover Pencil in Top Corner (always show pencil outline if hover regardless image uploaded) */}
                        <div className="absolute top-2.5 right-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-30 pointer-events-none">
                          <Pencil className="w-3 h-3 text-white" />
                        </div>

                        {/* Floating Time Badge or Emoji Indicator */}
                        {card.timeBadge ? (
                          <span className="absolute top-2 left-2 bg-[#1db863] text-white text-[9px] font-black px-2 py-0.5 rounded-full select-none shadow-sm uppercase tracking-wider z-20">
                            ⏰ {card.timeBadge}
                          </span>
                        ) : (
                          <span className="absolute top-2 left-2 bg-slate-100 border border-slate-200/50 text-base p-1 rounded-lg select-none shadow-sm z-20">
                            {card.emoji}
                          </span>
                        )}
                      </div>

                      {/* Card Bottom Label */}
                      <div className="h-[64px] w-full flex flex-col justify-center items-center px-2 py-1 bg-white flex-shrink-0 border-t border-slate-50 relative z-20">
                        <span className="text-[13px] font-black tracking-tight uppercase leading-tight text-center text-[#1a7a4a]">
                          {card.label}
                        </span>
                        {card.subtitle && (
                          <span className="text-[10px] text-gray-400 font-extrabold leading-none uppercase mt-1 text-center truncate w-full px-1">
                            {card.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* 20px peek empty spacer as requested */}
                <div className="w-[20px] flex-shrink-0" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Below Scroll CTA elements */}
        <div className="flex flex-col items-center justify-center gap-3 pt-8 mt-4 max-w-md mx-auto px-4">
          <span className="text-gray-400 font-black text-xs sm:text-sm uppercase tracking-widest select-none text-center">
            e muito mais no kit completo...
          </span>
          <button
            onClick={scrollToPricing}
            className="w-full bg-[#1db863] hover:bg-[#1a7a4a] text-white py-4 px-8 rounded-full font-black text-center text-sm uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>QUERO VER TUDO</span>
            <span className="font-sans leading-none text-base font-black">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const WhatsAppAudio = ({ duration }: { duration: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-2 bg-[#f0f2f5] border border-gray-200/50 p-2 rounded-xl w-full mt-2">
      <button 
        type="button"
        onClick={handlePlayToggle}
        className="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
      </button>
      
      <div className="flex-1 min-w-0">
        {/* Waveform Visualization mockup */}
        <div className="flex items-end gap-0.5 h-5 mb-1 justify-between">
          {[10, 14, 8, 16, 12, 20, 14, 10, 13, 18, 11, 15, 9, 20, 12, 16, 8, 14, 11, 16, 12, 18, 9, 13, 8].map((h, i) => {
            const indexPercent = (i / 25) * 100;
            const isPlayed = indexPercent <= progress;
            return (
              <div 
                key={i} 
                style={{ height: `${h}px` }} 
                className={`w-[2px] rounded-full transition-colors duration-150 ${isPlayed ? 'bg-[#00a884]' : 'bg-gray-300'}`}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between items-center text-[9px] text-gray-500 font-sans">
          <span>{isPlaying ? `0:${Math.floor((progress/100) * parseInt(duration.split(':')[1] || "42")).toString().padStart(2, '0')}` : duration}</span>
          <div className="flex items-center gap-0.5">
             <Mic className="w-2.5 h-2.5 text-[#00a884]" />
             <span className="text-[8px] font-bold text-[#00a884] uppercase tracking-wider">ÁUDIO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedDepoType, setSelectedDepoType] = useState<'todos' | 'pais' | 'profissionais'>('todos');

  const [showStickyCTA] = useState(true);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBasicClick = () => {
    setShowUpsell(true);
  };

  const kitMaterials = [
    {
      id: "rotina-manha",
      title: "1. Rotina da Manhã",
      desc: "Cartões passo a passo para acordar bem, arrumar a mochila, vestir a farda e iniciar o dia de forma pacífica.",
      items: ["Acordar tranquilo", "Fazer a cama", "Vestir a roupa", "Tomar café da manhã"],
      badge: "Essencial",
      color: "bg-amber-500",
      emoji: "🌅",
      image: "https://i.imgur.com/FUU0W6l.png"
    },
    {
      id: "higiene",
      title: "2. Higiene Completa",
      desc: "Passo a passo visual detalhado para escovar os dentes, tomar banho, usar o banheiro e lavar as mãos de forma independente.",
      items: ["Escovação perfeita", "Passo a passo do banho", "Uso do vaso sanitário", "Lavar as mãos"],
      badge: "Autonomia",
      color: "bg-blue-500",
      emoji: "🚿",
      image: "https://i.imgur.com/IMJgT7r.png"
    },
    {
      id: "alimentacao",
      title: "3. Alimentação Saudável",
      desc: "Suporte para diminuir a seletividade alimentar, regras de comportamento à mesa e pedidos visuais de alimentos.",
      items: ["Sentar para comer", "Provar novos alimentos", "Usar os talheres", "Pedir água/comida"],
      badge: "Comportamento",
      color: "bg-emerald-500",
      emoji: "🍽️",
      image: "https://i.imgur.com/LbAWuW2.png"
    },
    {
      id: "escola",
      title: "4. Rotina Escolar",
      desc: "Pictogramas criados para organizar o material, prestar atenção na professora, fazer as tarefas e interagir com colegas.",
      items: ["Organizar mochila", "Prestar atenção", "Hora do recreio", "Fazer dever de casa"],
      badge: "Inclusão",
      color: "bg-indigo-500",
      emoji: "🎒",
      image: "https://i.imgur.com/9tpq1fN.png"
    },
    {
      id: "comunicacao",
      title: "5. Comunicação Alternativa",
      desc: "Pranchas de comunicação rápida para crianças não verbais ou em fase de aquisição de fala expressarem desejos e dores.",
      items: ["Pranchas rápidas", "Expressar dor", "Pedir ajuda", "Dizer Sim/Não"],
      badge: "Padrão Ouro",
      color: "bg-rose-500",
      emoji: "💬",
      image: "https://i.imgur.com/GOctx7p.png"
    },
    {
      id: "emocoes",
      title: "6. Expressão das Emoções",
      desc: "Identificação e validação de sentimentos como raiva, medo, alegria, cansaço ou sobrecarga sensorial para evitar desregulações.",
      items: ["Quadro de sentimentos", "Termômetro da raiva", "Apoio para frustração", "Expressar cansaço"],
      badge: "Regulação",
      color: "bg-purple-500",
      emoji: "🧠",
      image: "https://i.imgur.com/8FTej6x.png"
    },
    {
      id: "combinados",
      title: "7. Combinados e Regras",
      desc: "Suporte visual para estabelecer combinados claros e limites firmes de forma leve, lúdica e extremely didática.",
      items: ["Guardar brinquedos", "Falar em tom adequado", "Esperar a minha vez", "Respeitar limites"],
      badge: "Convivência",
      color: "bg-yellow-500",
      emoji: "🤝",
      image: "https://i.imgur.com/4BszRqb.png"
    },
    {
      id: "recompensas",
      title: "8. Quadro de Recompensas",
      desc: "Quadro de incentivos e tokens para gamificar pequenas tarefas diárias e celebrar cada pequena vitória conquistada.",
      items: ["Quadro de estrelas", "Meta semanal", "Comemoração lúdica", "Foco no progresso"],
      badge: "Motivação",
      color: "bg-[#2ecc71]",
      emoji: "🏆",
      image: "https://i.imgur.com/RJPHWbo.png"
    },
    {
      id: "sono",
      title: "9. Higiene do Sono",
      desc: "Rituais visuais noturnos para acalmar a mente, se preparar para deitar e dormir no horário correto sem choro.",
      items: ["Desconectar telas", "Colocar o pijama", "Ler história curta", "Dormir sozinho"],
      badge: "Bem Estar",
      color: "bg-slate-700",
      emoji: "🌙",
      image: "https://i.imgur.com/lkaUlVI.png"
    },
    {
      id: "calendario",
      title: "10. Calendário Interativo",
      desc: "Painel completo para trabalhar a noção de tempo, clima, dias da semana, meses, datas festivas e aniversários.",
      items: ["Dias da semana", "Tempo e clima", "Meses do ano", "Marcação de eventos"],
      badge: "Cognitivo",
      color: "bg-cyan-500",
      emoji: "📅",
      image: "https://i.imgur.com/jfCQtdx.png"
    },
    {
      id: "quadros-rotina",
      title: "11. Quadros de Rotina Prontos",
      desc: "Modelos prontos de painéis horizontais e verticais: 'Primeiro/Depois', 'Manhã/Tarde/Noite' em formato profissional.",
      items: ["Quadro Primeiro/Depois", "Rotina de 3 turnos", "Painel semanal", "Apoio de bolso"],
      badge: "Prático",
      color: "bg-lime-600",
      emoji: "📋",
      image: "https://i.imgur.com/CR6PENG.png"
    },
    {
      id: "cartoes",
      title: "12. Cartões de Transição",
      desc: "Evite crises avisando visualmente a criança antes de mudar de ambiente (ir embora do parque, sair da terapia, etc).",
      items: ["Aviso de 5 minutos", "Sair de casa", "Mudar de atividade", "Esperar no carro"],
      badge: "Anti-crise",
      color: "bg-pink-500",
      emoji: "🔄",
      image: "https://i.imgur.com/jQI7lUS.png"
    },
    {
      id: "materiais-extras",
      title: "13. Materiais Extras e Atividades",
      desc: "Atividades lúdicas complementares de recortar, colar, ligar pontos e colorir para focar em coordenação motora fina.",
      items: ["Coordenação fina", "Desenho guiado", "Ligar pontos", "Recortar e colar"],
      badge: "Lúdico",
      color: "bg-violet-600",
      emoji: "🎨",
      image: "https://i.imgur.com/VqDFZjk.png"
    }
  ];

  // Controle de auto-rotação do carrossel
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || userInteracted) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const maxIndex = kitMaterials.length - visibleCards;
        if (prev >= maxIndex) {
          return 0; // Volta para o primeiro se chegar ao fim
        }
        return prev + 1;
      });
    }, 4000); // Gira a cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, userInteracted, visibleCards, kitMaterials.length]);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <UrgencyBar />
      <SalesNotification />
      {/* Floating Bouncing CTA (Fica Pulando na Tela e Acompanha o Scroll) */}
      <AnimatePresence>
        {showStickyCTA && (
          <>
            {/* Mobile Floating Bouncing CTA */}
            <div className="fixed bottom-6 left-4 right-4 z-[99999] sm:hidden">
              <motion.button 
                onClick={scrollToPricing}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-black py-4 rounded-2xl shadow-[0_12px_45px_rgba(46,204,113,0.6)] flex items-center justify-center gap-3 uppercase tracking-wider text-sm cursor-pointer border border-white/25"
              >
                <ShoppingBag className="w-5 h-5 shrink-0" />
                Quero o Kit com Desconto
              </motion.button>
            </div>

            {/* Desktop Floating Bouncing CTA */}
            <div className="fixed bottom-8 right-8 z-[99999] hidden sm:block">
              <motion.button 
                onClick={scrollToPricing}
                animate={{ 
                  y: [0, -14, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-black px-8 py-4.5 rounded-full shadow-[0_15px_45px_rgba(46,204,113,0.6)] flex items-center justify-center gap-3 uppercase tracking-wider text-sm cursor-pointer border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 text-white animate-pulse shrink-0" />
                <span>Quero o Kit com Desconto</span>
                <span className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
              </motion.button>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="bg-white px-4 pt-6 pb-10 sm:pt-10 sm:pb-14 overflow-hidden relative border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Top category pill */}
          <span className="inline-flex items-center gap-2 bg-[#f3fdf6] text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold tracking-wider mb-2.5 sm:mb-3.5 border border-[#2ecc71]/20 shadow-xs uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#2ecc71]" />
            Para Famílias, Professores e Clínicas
          </span>

          {/* Headline - extremely strong */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-2.5 sm:mb-3.5 tracking-tight max-w-4xl mx-auto">
            Tudo o que você precisa para <br />
            <span className="bg-gradient-to-r from-[#1a5c3a] via-[#2ecc71] to-[#1a5c3a] bg-clip-text text-transparent">
              organizar a rotina de crianças com TEA
            </span> <br className="hidden md:inline" /> em um único kit.
          </h1>

          {/* Subheadline - explaining exactly who and what */}
          <p className="text-xs sm:text-base text-gray-650 mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
            Mais de 200 cartões visuais prontos para imprimir, organizados por categorias e desenvolvidos para apoiar famílias, professores e profissionais no dia a dia.
          </p>

          {/* Benefits in bullet points (Hero section bullets for fast scanning) */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-left">
            {[
              "Materiais 100% prontos para imprimir",
              "Redução imediata da ansiedade e crises",
              "Mais independência na rotina diária",
              "Acesso vitalício no seu e-mail"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 bg-[#f3fdf6]/50 border border-[#2ecc71]/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                <CheckCircle2 className="w-4 h-4 sm:w-5 h-5 text-[#2ecc71] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Mockup premium occupying a lot of space, made larger (max-w-3xl) and closer (my-4) */}
          <div className="relative my-2 sm:my-4 max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(26,92,58,0.1)] border-2 sm:border-4 border-white bg-white group hover:scale-[1.01] transition-all duration-500">
            <img 
              src="https://i.imgur.com/nCpW8NS.png" 
              alt="Kit Visual TEA - Pequenos Passos Mockup Completo" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />

          </div>

          {/* CTA Button bien destacado */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <button 
              id="cta-hero"
              onClick={scrollToPricing}
              className="w-full sm:w-auto bg-[#1db863] hover:bg-[#1a7a4a] text-white text-base sm:text-xl font-black px-6 py-3.5 sm:px-12 sm:py-5 rounded-xl sm:rounded-2xl shadow-[0_12px_30px_rgba(46,204,113,0.3)] hover:shadow-[0_20px_50px_rgba(46,204,113,0.5)] transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer uppercase tracking-wider"
            >
              Quero Meu Acesso Imediato
            </button>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5 sm:mt-1">
              <Lock className="w-3.5 h-3.5 text-[#1db863]" />
              Pagamento 100% Seguro • Liberação Imediata
            </span>
          </div>

          {/* Selos em Destaque */}
          <div className="mt-6 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto border-t border-gray-100 pt-5 sm:pt-8">
            {[
              { icon: <Clock className="w-4 h-4 sm:w-6 h-6 text-[#2ecc71]" />, title: "Acesso Imediato", desc: "No seu e-mail após a compra" },
              { icon: <FileText className="w-4 h-4 sm:w-6 h-6 text-[#2ecc71]" />, title: "Arquivo Digital (PDF)", desc: "Baixe e salve para sempre" },
              { icon: <Printer className="w-4 h-4 sm:w-6 h-6 text-[#2ecc71]" />, title: "Pronto para Imprimir", desc: "Em casa ou na gráfica" },
              { icon: <Award className="w-4 h-4 sm:w-6 h-6 text-[#2ecc71]" />, title: "Casa, Escola e Clínica", desc: "Para todas as ocasiões" }
            ].map((selo, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#f3fdf6] flex items-center justify-center mb-1.5 sm:mb-3">
                  {selo.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-0.5 sm:mb-1">{selo.title}</h4>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight">{selo.desc}</p>
              </div>
            ))}
          </div>

          {/* Social Proof Stats Quick Block */}
          <div className="mt-10 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-4 bg-[#f8fdfa] px-6 py-4 rounded-2xl border border-[#2ecc71]/20 shadow-xs">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                ].map((url, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-150 overflow-hidden shadow-xs shrink-0">
                    <img src={url} alt="User feedback face" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                </div>
                <span className="text-[11px] font-extrabold text-[#1a5c3a] uppercase tracking-wide">
                  +3.000 Famílias e Profissionais Transformados
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Ambient shapes */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#f3fdf6]/80 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </section>

      {/* Dores (Problem) Section - PAS Copywriting Model */}
      <section id="problema" className="bg-gray-50 py-12 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3 border border-red-100">
              O Desafio Diário
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">O Dia a Dia com TEA Não Precisa Ser Exaustivo</h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Se você enfrenta dificuldades para realizar tarefas simples com sua criança, entenda que a culpa não é sua. Sem o suporte adequado, a sobrecarga de informações gera insecurity e crises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {[
              {
                title: "Crises Diárias por Imprevisibilidade",
                desc: "A criança atípica precisa saber o que vai acontecer. Mudanças bruscas de rotina sem aviso visual geram crises de ansiedade severas."
              },
              {
                title: "Exaustão Física e Mental",
                desc: "Repetir os mesmos comandos dezenas de vezes (como escovar os dentes ou comer) desgasta a relação familiar e gera frustração."
              },
              {
                title: "Falta de Tempo para Criar Materiais",
                desc: "Procurar figuras na internet, redimensionar, formatar e criar quadros do zero exige horas de trabalho que você simplesmente não tem."
              },
              {
                title: "Dificuldade de Comunicação Escolar",
                desc: "A falta de alinhamento visual entre o que é feito em casa e o que é feito na escola atrasa o desenvolvimento de autonomia da criança."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex items-start gap-3 sm:gap-4 transition-transform hover:scale-[1.01]">
                <XCircle className="w-5 h-5 sm:w-6 h-6 text-red-500 shrink-0 mt-0.5 sm:mt-1" />
                <div>
                  <h3 className="font-black text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution (Respira) Section */}
      <section id="solucao" className="bg-[#1a5c3a] py-10 sm:py-14 px-4 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4 italic tracking-tight text-[#2ecc71]">Imagine um Dia a Dia Mais Leve...</h2>
          <p className="text-xs sm:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            “Com o <span className="font-bold text-[#2ecc71] underline underline-offset-4">Kit Visual TEA — Pequenos Passos</span>, você entrega previsibilidade, segurança emocional e clareza para seu filho. Ele passa a compreender o mundo ao seu redor através de imagens, reduzindo crises e conquistando autonomia real.”
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
            {[
              "100% Digital em PDF",
              "Acesso Vitalício",
              "Impressão Ilimitada",
              "Uso Imediato"
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-2 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 sm:w-5 h-5 text-[#2ecc71]" />
                <span className="text-[10px] sm:text-sm font-extrabold tracking-wide uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background graphics */}
        <div className="absolute top-0 right-0 opacity-5">
           <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
             <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="20" strokeDasharray="40 20" />
           </svg>
        </div>
      </section>

      {/* TUDO O QUE VOCÊ RECEBE - Seção de Abundância Extrema */}
      <section id="tudo-o-que-recebe" className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[#2ecc71]/20 shadow-2xs">
              A Maior Biblioteca de Apoio Visual do Brasil
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">
              Tudo o que Você Recebe no Seu Kit
            </h2>
            <p className="text-sm sm:text-base text-gray-650 max-w-2xl mx-auto font-medium">
              Uma biblioteca gigantesca de materiais desenvolvidos por especialistas para cobrir cada detalhe do desenvolvimento e comportamento da sua criança.
            </p>
          </div>

          {/* Carousel Section Container */}
          <div 
            className="relative group/carousel px-4"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel track container with overflow hidden */}
            <div className="overflow-hidden mx-auto max-w-6xl py-4">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`,
                }}
              >
                {kitMaterials.map((cat, i) => (
                  <div 
                    key={i} 
                    className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3 flex"
                  >
                    <div className="bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group w-full">
                      <div>
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-gray-100 select-none group-hover:scale-110 transition-transform">
                            {cat.emoji}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-gray-100 text-gray-500">
                            {cat.badge}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1.5 sm:mb-2">{cat.title}</h3>
                        <p className="text-xs text-gray-505 font-medium leading-relaxed mb-3 sm:mb-4">{cat.desc}</p>
                        
                        {/* Imagem Real do Material */}
                        {cat.image && (
                          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-white mb-4 shadow-2xs relative flex items-center justify-center group-hover:border-gray-200 transition-all duration-300">
                            <img 
                              src={cat.image} 
                              alt={cat.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                      <div className="border-t border-gray-100/80 pt-3 sm:pt-4 mt-1.5 sm:mt-2">
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#1a5c3a] tracking-widest block mb-1.5 sm:mb-2">Materiais Inclusos:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {cat.items.map((item, idx) => (
                            <span key={idx} className="bg-[#f3fdf6] text-[#1a5c3a] border border-[#2ecc71]/10 text-[9px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={() => {
                setCarouselIndex((prev) => Math.max(0, prev - 1));
                setUserInteracted(true);
              }}
              disabled={carouselIndex === 0}
              className={`absolute -left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all z-10 hover:scale-105 active:scale-95 cursor-pointer ${
                carouselIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={() => {
                setCarouselIndex((prev) => Math.min(kitMaterials.length - visibleCards, prev + 1));
                setUserInteracted(true);
              }}
              disabled={carouselIndex >= kitMaterials.length - visibleCards}
              className={`absolute -right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all z-10 hover:scale-105 active:scale-95 cursor-pointer ${
                carouselIndex >= kitMaterials.length - visibleCards ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Carousel Pagination dots & status */}
          <div className="flex flex-col items-center justify-center gap-3 mt-6">
            <span className="text-[10px] sm:text-xs font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Material {carouselIndex + 1} a {Math.min(kitMaterials.length, carouselIndex + visibleCards)} de {kitMaterials.length}
            </span>
            
            <div className="flex justify-center gap-1.5 flex-wrap max-w-xs sm:max-w-md">
              {Array.from({ length: kitMaterials.length - visibleCards + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCarouselIndex(idx);
                    setUserInteracted(true);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    carouselIndex === idx 
                      ? 'w-6 sm:w-8 bg-[#2ecc71]' 
                      : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Explore Tool Banner inside Abundance Section */}
          <div className="mt-10 sm:mt-20 bg-[#f3fdf6] border-2 border-[#2ecc71]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center max-w-4xl mx-auto animate-pulse">
            <span className="inline-block bg-[#2ecc71] text-white text-[9px] sm:text-[10px] font-black px-3 py-0.5 sm:px-4 sm:py-1 rounded-full uppercase tracking-widest mb-2.5 sm:mb-3">
              Experimente Grátis
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-[#1a5c3a] mb-1.5 sm:mb-2">Quer Interagir com o Kit Agora Mesmo?</h3>
            <p className="text-xs sm:text-sm text-gray-650 max-w-2xl mx-auto font-medium mb-4 sm:mb-6">
              Abaixo criamos uma ferramenta interativa exclusiva. Você pode testar como os cartões funcionam e até mesmo anexar imagens reais da sua criança para personalizar a rotina!
            </p>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71] mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Render the original interactive materials preview component so users maintain interactive upload feature! */}
      <MaterialsPreview />

      {/* Demonstração - Modern Passo a Passo */}
      <section id="demonstracao" className="py-10 sm:py-14 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#2ecc71]/20">
              Passo a Passo
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">
              Como Funciona na Prática?
            </h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Apenas 6 passos simples separam você de uma rotina muito mais tranquila e organizada para seu filho.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { step: "1", title: "Comprar com Segurança", desc: "Clique nos botões e faça o pagamento 100% seguro por PIX ou Cartão de Crédito.", icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { step: "2", title: "Receber o Acesso", desc: "No mesmo minuto, enviamos em seu e-mail o link para a plataforma exclusiva de download.", icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { step: "3", title: "Baixar os Arquivos", desc: "Baixe a biblioteca completa em formato PDF de alta resolução no seu celular ou PC.", icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { step: "4", title: "Imprimir Conforme Necessidade", desc: "Imprima em casa ou em qualquer gráfica do seu bairro as páginas que vai usar primeiro.", icon: <Printer className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { step: "5", title: "Plastificar (Opcional)", desc: "Se preferir maior durabilidade para o uso com velcro ou giz, recomendamos plastificar.", icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { step: "6", title: "Organizar e Utilizar", desc: "Fixe os painéis na altura da criança e comece a viver dias mais previsíveis e sem crises!", icon: <Smile className="w-5 h-5 sm:w-6 sm:h-6" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 relative transition-transform hover:translate-y-[-4px]">
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-100 font-black text-4xl sm:text-5xl leading-none select-none">
                  0{item.step}
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f3fdf6] text-[#1a5c3a] flex items-center justify-center mb-4 sm:mb-6 border border-[#2ecc71]/10">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Reais (Focado em Dores e Soluções) */}
      <section id="beneficios" className="py-10 sm:py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#2ecc71]/20">
              Vantagens Exclusivas
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">
              Por que escolher o nosso Kit?
            </h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Entregamos exatamente o que você precisa para obter resultados rápidos e duradouros na rotina atípica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-8">
            {[
              { title: "Material Pronto", desc: "Chega de passar madrugadas em claro pesquisando figuras confusas e tentando organizar tudo. Nosso material está diagramado por pedagogos e pronto para imprimir.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> },
              { title: "Economia de Tempo", desc: "Organize rotinas completas para sua criança em menos de 10 minutos. O kit possui sumários claros para você encontrar as atividades em segundos.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> },
              { title: "Fácil Organização", desc: "Dividido por áreas de desenvolvimento bem demarcadas para que você saiba exatamente o que usar para cada dificuldade comportamental.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> },
              { title: "Uso em Diferentes Ambientes", desc: "Mesmo padrão visual para ser utilizado em casa, levado na bolsa para as terapias clínicas ou compartilhado com educadores na escola.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> },
              { title: "Arquivos Digitais PDF", desc: "Os arquivos não estragam ou perdem a qualidade. Guarde no seu e-mail, celular ou nuvem para acessar quando e onde precisar.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> },
              { title: "Impressão Ilimitada", desc: "Sua criança rasgou ou rabiscou o cartão? Sem problemas! Basta abrir o arquivo e imprimir novamente quantas vezes for necessário, sem nenhum custo extra.", icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71]" /> }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="shrink-0 mt-0.5 sm:mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-gray-900 mb-0.5 sm:mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-655 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bônus Section */}
      <section id="bonus" className="py-10 sm:py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#2ecc71]/20">
              Presentes Exclusivos
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">
              Bônus Especiais Inclusos
            </h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Fazendo sua inscrição hoje, você leva gratuitamente estes materiais complementares de alto valor pedagógico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { 
                title: "Guia da Rotina Matinal Perfeita", 
                icon: <Clock className="w-4 h-4 sm:w-5 h-5 text-[#1a5c3a] group-hover:text-white transition-colors" />, 
                desc: "Torne o acordar da sua criança um momento tranquilo, previsível e sem estresse.",
                image: "https://imgur.com/a/o2z7GJk",
                value: "R$ 37,00"
              },
              { 
                title: "Cartões de Comunicação por Sinais", 
                icon: <MessageCircle className="w-4 h-4 sm:w-5 h-5 text-[#1a5c3a] group-hover:text-white transition-colors" />, 
                desc: "Ajude seu filho a expressar necessidades básicas e dores físicas sem chorar.",
                image: "https://imgur.com/a/CGPvIgc",
                value: "R$ 47,00"
              },
              { 
                title: "Guia Completo de Inclusão Escolar", 
                icon: <BookOpen className="w-4 h-4 sm:w-5 h-5 text-[#1a5c3a] group-hover:text-white transition-colors" />, 
                desc: "Saiba exatamente como levar as rotinas e pictogramas para dentro da sala de aula.",
                image: "https://imgur.com/a/iwu7tYK",
                value: "R$ 39,00"
              },
              { 
                title: "Painel Anti-Crise de Resposta Rápida", 
                icon: <ShieldCheck className="w-4 h-4 sm:w-5 h-5 text-[#1a5c3a] group-hover:text-white transition-colors" />, 
                desc: "Plaquinhas de 'Espera', 'Pausa' e 'Minha vez' para regulação em momentos difíceis.",
                image: "https://imgur.com/a/64HncyK",
                value: "R$ 29,00"
              }
            ].map((bonus, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-[#2ecc71]/30 hover:shadow-xl transition-all group overflow-hidden flex flex-col justify-between">
                <div>
                  {bonus.image && (
                    <div className="h-36 sm:h-44 w-full overflow-hidden relative bg-gray-150 flex-shrink-0">
                      <img 
                        src={getDirectImageUrl(bonus.image)} 
                        alt={bonus.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs text-[#1a5c3a] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-sm group-hover:bg-[#2ecc71] group-hover:text-white transition-all">
                        {bonus.icon}
                      </div>
                      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-[#e03030] text-white text-[8px] sm:text-[9px] font-black uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                        GRÁTIS HOJE
                      </span>
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-black text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2 leading-tight">{bonus.title}</h3>
                    <p className="text-xs text-gray-555 leading-relaxed font-medium mb-3 sm:mb-4">{bonus.desc}</p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-1.5 sm:px-6 sm:pb-6 sm:pt-2 border-t border-gray-100/60 flex justify-between items-center bg-gray-100/30">
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] text-gray-450 font-bold uppercase line-through">{bonus.value}</span>
                    <span className="text-xs font-black text-[#2ecc71] uppercase">R$ 0,00</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black text-[#1a5c3a] bg-[#f3fdf6] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-[#2ecc71]/10">
                    ADICIONADO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social Section */}
      <section id="depoimentos" className="bg-[#f3fdf6]/30 py-10 sm:py-14 px-4 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#2ecc71]/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-[#2ecc71]/10 text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#2ecc71]/20">
              Relatos de Quem Usa
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-1.5 sm:mb-2 tracking-tight">
              O que dizem as famílias e profissionais...
            </h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              E-mails reais enviados diretamente para nossa caixa de entrada por mães, pais e terapeutas de todo o Brasil.
            </p>
          </div>

          {/* Trust Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 mb-6 sm:mb-10 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-100 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="flex gap-0.5 mb-1.5 sm:mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 sm:w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-1">4.9 / 5 Estrelas</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-relaxed">Média de aprovação técnica e pedagógica com base em mais de 3.500 avaliações de usuários.</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f3fdf6] text-[#2ecc71] rounded-full flex items-center justify-center mb-1.5 sm:mb-2 font-bold text-base sm:text-lg">
                ❤️
              </div>
              <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-1">+3.500 Famílias</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-relaxed">Crianças com TEA e TDAH que conquistaram rotinas mais leves, seguras e felizes.</p>
            </div>

            <div className="bg-white border border-gray-100 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 font-bold text-base sm:text-lg">
                🛡️
              </div>
              <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-1">Satisfação Total</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-relaxed">Garantia total de 14 dias para você testar sem qualquer compromisso.</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
            {[
              { id: 'todos', label: 'Todos os E-mails' },
              { id: 'pais', label: 'Mães e Pais' },
              { id: 'profissionais', label: 'Profissionais & Escolas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDepoType(tab.id as any)}
                className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-all uppercase cursor-pointer border ${
                  selectedDepoType === tab.id
                    ? 'bg-[#2ecc71] text-white shadow-md shadow-[#2ecc71]/20 border-[#2ecc71]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-950 border-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Testimonials Grid in Email format */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {(() => {
              const testimonialsData = [
                {
                  name: "Mariana de Souza",
                  email: "mariana.souza@gmail.com",
                  role: "Mãe do Léo (4 anos - Autista)",
                  category: "pais",
                  avatar: "MS",
                  avatarColor: "bg-rose-500",
                  time: "Hoje, 10:14",
                  subject: "Re: Léo escovou os dentes sozinho! (Kit de Rotina Matinal)",
                  text: "Ana, você não imagina a nossa alegria! O Léo acordou hoje bem disposto e já foi direto olhar a rotina matinal no painel. Ele escovou os dentes sozinho sem eu precisar brigar ou repetir 10 vezes. Estou muito feliz! Obrigado por esse material maravilhoso.",
                  reaction: "❤️",
                  isAudio: false,
                  attachment: "kit_rotina_diaria_impresso.pdf (3.4 MB)",
                  replySubject: "RES: Léo escovou os dentes sozinho! (Kit de Rotina Matinal)",
                  reply: "Que notícia maravilhosa, Mariana! O Léo é super inteligente e capaz. Fico imensamente feliz que o painel de rotina tenha gerado essa autonomia imediata e trazido mais paz para a manhã de vocês! Um abraço forte nele! ❤️"
                },
                {
                  name: "Juliana Costa",
                  email: "juliana.costa.neuro@gmail.com",
                  role: "Psicopedagoga Clínica",
                  category: "profissionais",
                  avatar: "JC",
                  avatarColor: "bg-indigo-600",
                  time: "Ontem, 14:23",
                  subject: "Re: Excelente Resolução e Sem Sobrecarga Sensorial",
                  text: "Como profissional de neurodesenvolvimento infantil, indico de olhos fechados. Os pictogramas têm excelente resolução e a escolha de cores evita a sobrecarga sensorial. Meus pequenos na clínica adoram e se engajam imediatamente nas atividades propostas!",
                  reaction: "✨",
                  isAudio: false,
                  attachment: "prancha_comunicacao_clinica.pdf (4.1 MB)",
                  replySubject: "RES: Excelente Resolução e Sem Sobrecarga Sensorial",
                  reply: "Muito obrigada pelo retorno técnico tão precioso, Juliana! Ficamos honrados em saber que nossos materiais estão auxiliando nos seus atendimentos clínicos e promovendo o desenvolvimento seguro desses pequenos. 🙏"
                },
                {
                  name: "Roberta Dias",
                  email: "roberta.dias@outlook.com",
                  role: "Mãe do Thiago (6 anos - TDAH)",
                  category: "pais",
                  avatar: "RD",
                  avatarColor: "bg-amber-500",
                  time: "Ontem, 08:45",
                  subject: "Re: Cartões de Transição - Sem crises de ansiedade na escola!",
                  text: "Passando pra te agradecer de coração! O kit de cartões de transição salvou as nossas saídas para a escola. Ele costumava ter crises de choro e ansiedade com a mudança de ambiente. Agora, ele mesmo confere os cartões e vai super tranquilo.",
                  reaction: "🙏",
                  isAudio: false,
                  attachment: "cartoes_transicao_escola.pdf (1.8 MB)",
                  replySubject: "RES: Cartões de Transição - Sem crises de ansiedade na escola!",
                  reply: "Isso é o poder da previsibilidade visual, Roberta! Reduzir a ansiedade de transição muda completamente o dia das crianças neurodivergentes. Parabéns pela paciência e dedicação!"
                },
                {
                  name: "Dra. Amanda Medeiros",
                  email: "amanda.terapeuta@outlook.com",
                  role: "Terapeuta Ocupacional",
                  category: "profissionais",
                  avatar: "AM",
                  avatarColor: "bg-teal-600",
                  time: "Há 2 dias, 17:02",
                  subject: "Re: Recomendação padrão ouro para autonomia infantil",
                  text: "Excelente qualidade pedagógica e visual! Uso nos meus atendimentos de integração sensorial e oriento os pais a usarem em casa para dar continuidade. A estruturação visual é padrão ouro para autonomia e regulação de comportamento.",
                  reaction: "⭐",
                  isAudio: false,
                  attachment: "guia_autonomia_infantil.pdf (2.8 MB)",
                  replySubject: "RES: Recomendação padrão ouro para autonomia infantil",
                  reply: "Obrigada, Dra. Amanda! A parceria com terapeutas ocupacionais é fundamental para validar a abordagem do Kit Visual. Seu feedback nos enche de orgulho! 🌟"
                },
                {
                  name: "Felipe Ramos",
                  email: "felipe.ramos.pai@gmail.com",
                  role: "Pai do Arthur (5 anos)",
                  category: "pais",
                  avatar: "FR",
                  avatarColor: "bg-blue-600",
                  time: "Há 3 dias, 19:15",
                  subject: "Re: Menos choro e mais sono! Nosso Arthur se acostumou rápido",
                  text: "Minha esposa e eu estávamos exaustos com as noites difíceis na hora do jantar e sono. Criamos a sequência com o kit de vocês e foi tiro e queda. O Arthur já se acostumou e segue os passos com orgulho e sem chorar. Muito obrigado!",
                  reaction: "👍",
                  isAudio: false,
                  attachment: "rotina_noite_arthur.pdf (1.9 MB)",
                  replySubject: "RES: Menos choro e mais sono! Nosso Arthur se acostumou rápido",
                  reply: "Felipe, que relato maravilhoso! Estabelecer uma rotina do sono previsível traz qualidade de vida e paz para a família inteira. Parabéns para vocês e para o Arthur! Grande abraço!"
                },
                {
                  name: "Profa. Cláudia Lima",
                  email: "claudia.lima.educacao@ig.com.br",
                  role: "Educadora Especial",
                  category: "profissionais",
                  avatar: "CL",
                  avatarColor: "bg-emerald-600",
                  time: "Há 4 dias, 11:32",
                  subject: "Re: Uso em sala de aula de inclusão escolar - Fantástico!",
                  text: "Estou usando os cartões com meus alunos de inclusão na escola municipal e a mudança na sala foi imediata. Eles ficam muito mais calmos e focados sabendo o que vem a seguir. Recomendo de coração para todas as professoras.",
                  reaction: "❤️",
                  isAudio: false,
                  attachment: "painel_inclusao_sala_de_aula.pdf (3.5 MB)",
                  replySubject: "RES: Uso em sala de aula de inclusão escolar - Fantástico!",
                  reply: "Professora Cláudia, seu trabalho é absolutamente admirável! Facilitar a inclusão escolar e dar voz às crianças é o nosso maior propósito com este kit. Desejamos muito sucesso! 🍎"
                }
              ];

              const filtered = selectedDepoType === 'todos' 
                ? testimonialsData 
                : testimonialsData.filter(d => d.category === selectedDepoType);

              return filtered.map((dep, idx) => (
                <div 
                  key={dep.name} 
                  className="bg-white border border-gray-150 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between max-w-sm mx-auto w-full overflow-hidden"
                >
                  <div>
                    {/* Mock Email Client Window Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      </div>
                      <div className="bg-gray-100/80 text-gray-500 text-[9px] font-mono px-3 py-0.5 rounded-md max-w-[170px] truncate select-none">
                        inbox/depoimento_{idx + 1}@teapequenospassos.com
                      </div>
                      <div className="w-10"></div>
                    </div>

                    {/* Email Details Area */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/40 text-xs text-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${dep.avatarColor} flex items-center justify-center text-white text-xs font-black shadow-inner shrink-0`}>
                            {dep.avatar}
                          </div>
                          <div className="min-w-0">
                            <span className="block font-bold text-gray-900 truncate">{dep.name}</span>
                            <span className="block text-[10px] text-gray-400 font-mono truncate">&lt;{dep.email}&gt;</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 font-medium">{dep.time}</span>
                      </div>

                      <div className="space-y-1 font-sans mt-3">
                        <div>
                          <span className="text-gray-400 font-medium">Assunto: </span>
                          <span className="font-bold text-gray-900">{dep.subject}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium">Para: </span>
                          <span className="text-gray-700 font-medium">teapequenospassos@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    {/* Email Message Body */}
                    <div className="p-4 font-sans text-xs sm:text-sm text-gray-800 leading-relaxed bg-white">
                      <p className="whitespace-pre-line text-gray-750 font-normal leading-relaxed">{dep.text}</p>
                      
                      {/* Attachment */}
                      {dep.attachment && (
                        <div className="mt-4 p-2.5 bg-gray-50 rounded-xl border border-gray-150 flex items-center justify-between text-xs text-gray-700">
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate font-medium text-[11px] text-gray-600">{dep.attachment}</span>
                          </div>
                          <span className="text-[#2ecc71] font-bold text-[9px] uppercase tracking-wider bg-[#2ecc71]/10 px-2 py-0.5 rounded-sm shrink-0 select-none">
                            Impresso
                          </span>
                        </div>
                      )}

                      {/* Reply Thread Divider */}
                      <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-dashed border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Resposta Enviada</span>
                        <div className="flex-grow border-t border-dashed border-gray-200"></div>
                      </div>

                      {/* Reply Block from Ana */}
                      {dep.reply && (
                        <div className="bg-[#f2faf7] border-l-4 border-[#00a884]/60 p-3 rounded-r-xl text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[#006e56] uppercase tracking-wide text-[10px]">Suporte • Ana do TEA Pequenos Passos</span>
                            <span className="text-[9px] text-gray-400">Resposta</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mt-1 font-normal italic">"{dep.reply}"</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Verified Footer */}
                  <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between text-[10px] font-bold text-brand-medium uppercase tracking-wider shrink-0 mt-auto">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-medium" />
                      <span>Compra Verificada</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Planos (Pricing) Section */}
      <section id="planos" className="py-10 sm:py-14 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-10 px-4">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#2ecc71]/20">
              Acesso Imediato
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-gray-900 mb-1.5 sm:mb-2 tracking-tight">Escolha seu Acesso ao Kit</h2>
            <p className="text-xs sm:text-base text-gray-650 max-w-xl mx-auto font-medium mb-3 sm:mb-4">Invista no desenvolvimento, organização e tranquilidade da sua criança.</p>
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-red-150 shadow-2xs">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
              <span>Oferta especial válida apenas para hoje</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto items-stretch">
             {/* Plano Básico */}
             <div className="bg-white border-2 border-gray-200 rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 flex flex-col justify-between items-center text-center relative hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
               <div className="w-full">
                 <span className="text-[9px] sm:text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full uppercase tracking-wider mb-2.5 sm:mb-3 inline-block">
                   O Essencial
                 </span>
                 <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-0.5 sm:mb-1 uppercase tracking-wide">Plano Básico</h3>
                 <p className="text-xs text-gray-500 mb-4 sm:mb-6 font-medium">Ideais iniciais de organização de rotina</p>
                 
                 <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-8 border border-gray-100">
                   <span className="text-gray-400 line-through text-[10px] sm:text-xs font-bold block mb-0.5 sm:mb-1">De R$ 47,00 por apenas</span>
                   <div className="flex items-center justify-center gap-1">
                     <span className="text-gray-950 font-extrabold text-xl sm:text-2xl">R$</span>
                     <span className="text-gray-950 font-black text-4xl sm:text-6xl tracking-tight">10,00</span>
                   </div>
                   <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold block mt-0.5 sm:mt-1">Taxa única • Sem mensalidade</span>
                 </div>

                 <ul className="text-left space-y-2 sm:space-y-3.5 mb-5 sm:mb-8 w-full border-t border-gray-100 pt-4 sm:pt-6">
                   {[
                     "Rotina Diária e Semanal",
                     "Pictogramas Escolares Básicos",
                     "Atividades de Vida Diária (AVDs)",
                     "Painel Primeiro/Depois",
                     "Recorte, Cole e Atividades",
                     "Alfabetização Inicial",
                     "Uso Imediato em PDF"
                   ].map((item, idx) => (
                     <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-655 font-medium">
                       <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2ecc71] shrink-0 mt-0.5" />
                       <span>{item}</span>
                     </li>
                   ))}
                   {[
                     "Pranchas de Comunicação",
                     "Histórias Sociais de Regulação",
                     "Materiais para Adolescentes",
                     "Atualizações Vitalícias"
                   ].map((item, idx) => (
                     <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-medium line-through decoration-gray-300">
                       <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 shrink-0 mt-0.5" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <button 
                 onClick={handleBasicClick}
                 className="w-full bg-gray-900 text-white font-black py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-black hover:scale-[1.01] transition-all duration-300 cursor-pointer shadow-sm text-xs sm:text-sm uppercase tracking-wider"
               >
                 Adquirir Plano Básico
                </button>
             </div>
             
             {/* Plano Premium */}
             <div className="bg-[#f3fdf6] border-4 border-[#2ecc71] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between items-center text-center relative shadow-xl shadow-emerald-950/5 scale-100 md:scale-[1.03] transition-all duration-300 hover:shadow-2xl">
               <div className="absolute -top-5 bg-[#2ecc71] text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-md">
                  RECOMENDADO • COMPLETO
               </div>
               <div className="w-full">
                 <span className="text-[10px] font-black bg-[#2ecc71]/10 text-[#1a5c3a] px-4 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                   Melhor Custo-Benefício
                 </span>
                 <h3 className="text-2xl font-black text-[#1a5c3a] mb-1 uppercase tracking-wide">Plano Premium</h3>
                 <p className="text-xs text-[#1a5c3a]/70 mb-6 font-bold">Acesso vitalício a todas as 13 categorias de materiais</p>
                 
                 <div className="bg-[#1a5c3a] rounded-2xl p-5 mb-8 border border-[#2ecc71]/20 shadow-inner">
                   <span className="text-white/60 line-through text-xs font-bold block mb-1">De R$ 97,00 por apenas</span>
                   <div className="flex items-center justify-center gap-1 text-white">
                     <span className="font-extrabold text-2xl text-[#2ecc71]">R$</span>
                     <span className="font-black text-5xl sm:text-6xl tracking-tight text-white">27,90</span>
                   </div>
                   <span className="text-[10px] text-[#2ecc71] font-bold block mt-1">Taxa única • Acesso e Atualizações Vitalícias</span>
                 </div>

                 <ul className="text-left space-y-3 mb-8 w-full border-t border-[#2ecc71]/10 pt-6">
                   {[
                     "Tudo do Plano Básico",
                     "Pranchas de Comunicação Rápida",
                     "Histórias Sociais de Comportamento",
                     "Painel Anti-Crise Completo",
                     "Rotinas de Higiene Passo a Passo",
                     "Quadro de Recompensas e Incentivos",
                     "Calendário Interativo de Parede",
                     "Manual de Adaptação Escolar",
                     "Apoio para Pré-Adolescentes",
                     "Atualizações Vitalícias Gratuitas"
                   ].map((item, idx) => (
                     <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1a5c3a] font-bold">
                       <CheckCircle2 className="w-4.5 h-4.5 text-[#2ecc71] shrink-0 mt-0.5" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <button 
                 onClick={() => window.location.href = 'https://pay.cakto.com.br/p2i9bv8_888747'}
                 className="w-full bg-[#2ecc71] text-white font-black py-4.5 rounded-2xl hover:bg-[#27b966] hover:scale-[1.01] transition-all duration-300 cursor-pointer shadow-md shadow-[#2ecc71]/20 text-sm uppercase tracking-wider"
               >
                 Quero o Kit Completo
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Sobre a Criadora Section */}
      <section id="sobre" className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-[36px] p-6 sm:p-10 border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 rotate-2 border-4 border-white">
              <img src="https://i.imgur.com/G4DaqP5.png" alt="Ana Paula Souza" className="w-full h-full object-cover object-[center_20%]" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-[#2ecc71] font-black text-xs uppercase tracking-widest mb-1.5 block">Idealizadora do Projeto</span>
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Dra. Ana Paula Souza</h2>
              <p className="text-sm sm:text-base text-gray-650 leading-relaxed font-medium mb-4">
                Psicopedagoga, especialista em Neurodesenvolvimento e TEA, com mais de 10 anos de prática clínica e escolar auxiliando famílias atípicas.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium mb-4">
                “Minha missão é trazer leveza para o lar de famílias que convivem com o autismo. Criei estes materiais visuais para dar independência às crianças e segurança emocional aos pais.”
              </p>
              <div className="flex gap-6 border-t border-gray-250/40 pt-6">
                 <div className="flex flex-col">
                   <span className="text-3xl font-black text-[#1a5c3a] leading-none">10+</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400 mt-1">Anos de Atuação</span>
                 </div>
                 <div className="w-px h-10 bg-gray-200"></div>
                 <div className="flex flex-col">
                   <span className="text-3xl font-black text-[#1a5c3a] leading-none">+3.500</span>
                   <span className="text-[9px] uppercase font-bold text-gray-400 mt-1">Alunos e Famílias</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia Section */}
      <section id="garantia" className="py-14 px-4 bg-white border-b border-gray-100 text-center">
        <div className="max-w-3xl mx-auto bg-[#f3fdf6] p-6 sm:p-10 rounded-[32px] border-2 border-dashed border-[#2ecc71]/40 shadow-xs">
          <ShieldCheck className="w-16 h-16 text-[#2ecc71] mx-auto mb-4" />
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Garantia Blindada de Satisfação</h2>
          <p className="text-sm sm:text-base text-gray-650 leading-relaxed max-w-2xl mx-auto font-medium">
            Seu risco é zero. Use todo o material com a sua criança por até 14 dias inteiros. Se você sentir que os cartões e quadros não ajudaram a dar mais previsibilidade e diminuir as crises no dia a dia, basta enviar um único e-mail e devolvemos 100% do seu dinheiro, sem perguntas e sem complicação.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#f3fdf6] text-[#1a5c3a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[#2ecc71]/20">
              Dúvidas Respondidas
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">Perguntas Frequentes</h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">Ficou com alguma dúvida? Encontre a resposta rápida para as suas principais perguntas abaixo.</p>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Como recebo o acesso ao material?" 
              answer="O acesso é totalmente imediato! Assim que o seu pagamento por PIX ou Cartão de Crédito for processado, nosso sistema envia automaticamente em seu e-mail cadastrado as instruções e o link para acessar a área de membros exclusiva e fazer o download de todos os PDFs do Kit." 
            />
            <FAQItem 
              question="Para qual faixa etária o material é recomendado?" 
              answer="O material é recomendado para crianças atípicas (TEA, TDAH, atrasos no desenvolvimento) a partir dos 2 anos até a pré-adolescência, pois a comunicação alternativa e as rotinas visuais se adaptam facilmente aos diferentes níveis de suporte." 
            />
            <FAQItem 
              question="O material é enviado impresso pelo Correio?" 
              answer="Não. O material é 100% digital e entregue em formato PDF de altíssima resolução. Isso garante que você pague um preço extremamente acessível (sem frete) e possa imprimir os cartões quantas vezes quiser, imediatamente, sem precisar esperar semanas pela entrega física." 
            />
            <FAQItem 
              question="Como devo fazer a impressão dos cartões?" 
              answer="Você pode imprimir em casa em qualquer impressora convencional ou em uma gráfica de sua preferência. Recomendamos imprimir em papel de gramatura ligeiramente superior (como 120g ou 180g) e plastificar para que as peças fiquem rígidas, seguras e extremamente duráveis para o manuseio diário." 
            />
            <FAQItem 
              question="O pagamento é mensal ou taxa única?" 
              answer="Taxa única! Não há mensalidades, cobranças recorrentes ou taxas escondidas. Você faz a inscrição apenas uma vez e garante o acesso permanente e vitalício ao kit e a todas as futuras atualizações que fizermos." 
            />
            <FAQItem 
              question="Se eu tiver dúvidas ou precisar de ajuda?" 
              answer="Damos suporte total! Se você tiver qualquer dúvida técnica para baixar os arquivos ou dificuldades de aplicação prática com sua criança, basta falar com a nossa equipe especializada diretamente no WhatsApp de suporte que fica disponível dentro da plataforma de alunos." 
            />
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section id="aviso-legal" className="bg-gray-50 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-5 sm:p-6 flex gap-4 items-start shadow-sm">
            <div className="bg-amber-100 flex-shrink-0 p-2 rounded-lg text-amber-800">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
                  ⚠️ Aviso Importante
                </h3>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600 leading-relaxed space-y-2 font-medium">
                <p>
                  O <strong>Kit Visual TEA — Pequenos Passos</strong> é um material de apoio educacional desenvolvido para auxiliar famílias e educadores de crianças com TEA.
                </p>
                <p>
                  Este material não substitui consultas médicas, terapias ou acompanhamento especializado.
                </p>
                <p>
                  Os resultados podem variar de criança para criança. Recomendamos sempre o uso em conjunto com os profissionais que acompanham sua criança.
                </p>
                <p className="pt-1 text-[10px] text-gray-500 font-bold">
                  Em caso de dúvidas entre em contato pelo: <a href="mailto:teapequenospassos@gmail.com" className="text-brand-dark hover:underline underline-offset-2">teapequenospassos@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-brand-dark text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black mb-2">Kit Rotina Visual TEA</h4>
              <p className="text-gray-400 text-sm max-w-xs">Ajudando famílias a conquistarem autonomia e paz no dia a dia com autismo.</p>
            </div>
            <div className="flex gap-6 text-sm font-bold">
               <a href="#" className="hover:text-brand-medium underline underline-offset-4">Termos</a>
               <a href="#" className="hover:text-brand-medium underline underline-offset-4">Privacidade</a>
               <a href="#" className="hover:text-brand-medium underline underline-offset-4">Contato</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500 font-medium">
             <p>© 2026 Kit Rotina Visual para Autismo. Todos os direitos reservados.</p>
             <p className="mt-2 text-[10px]">Este produto não substitui o acompanhamento profissional especializado (médico, psicólogo ou terapeuta).</p>
          </div>
        </div>
      </footer>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpsell(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="bg-brand-medium p-6 text-center text-white">
                <Star className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">OFERTA ESPECIAL!</h3>
                <p className="text-white/90 font-bold">Por que levar apenas metade da solução?</p>
              </div>

              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div className="bg-red-500 text-white rounded-full p-1">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Com o Básico você deixa de levar as Histórias Sociais e Pranchas Prontas.</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-brand-light rounded-2xl border border-brand-medium/20">
                    <div className="bg-brand-medium text-white rounded-full p-1">
                      <Star className="w-4 h-4 fill-white" />
                    </div>
                    <p className="text-sm font-bold text-brand-dark">No Premium, você garante o apoio completo para Adolescentes e Atualizações para Sempre.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setShowUpsell(false);
                      window.location.href = 'https://pay.cakto.com.br/p2i9bv8_888747';
                    }}
                    className="w-full bg-brand-medium text-white font-black py-5 rounded-2xl shadow-lg shadow-brand-medium/30 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-tight"
                  >
                    SIM! QUERO A SOLUÇÃO COMPLETA
                  </button>
                  <button 
                    onClick={() => {
                      setShowUpsell(false);
                      window.location.href = 'https://pay.cakto.com.br/y3g3fhw_888684';
                    }}
                    className="w-full text-gray-400 font-bold py-3 rounded-2xl hover:text-gray-600 transition-all text-xs uppercase"
                  >
                    Não, prefiro economizar e ficar sem os materiais extras
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
