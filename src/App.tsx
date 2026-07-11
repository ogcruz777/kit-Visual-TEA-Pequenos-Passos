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
  Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Subcomponents ---

const UrgencyBar = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="urgency-bar" className="fixed top-0 left-0 w-full bg-red-600 text-white py-2 px-4 z-50 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm">
      <Clock className="w-4 h-4 animate-pulse" />
      <span>A OFERTA ESPECIAL EXPIRA EM:</span>
      <span className="font-mono text-lg ml-1">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

const SalesNotification = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  
  const names = ['Maria S.', 'Ana Paula', 'Roberta G.', 'Juliana F.', 'Carla M.', 'Luciana P.', 'Renata B.', 'Patrícia O.'];

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setName(randomName);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showNotification, 30000); // Every 30s
    // Initial delay
    const timeout = setTimeout(showNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: -20 }}
          animate={{ opacity: 1, x: 20, y: 15 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed top-10 sm:top-12 left-0 z-50 bg-white shadow-xl rounded-lg p-3 border-l-4 border-brand-medium flex items-center gap-3 w-64"
        >
          <div className="bg-brand-light p-2 rounded-full">
            <ShoppingBag className="w-5 h-5 text-brand-medium" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">{name} acabou de comprar!</p>
            <p className="text-[10px] text-gray-500">há poucos segundos</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-gray-800 hover:text-brand-dark transition-colors"
      >
        <span className="pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-brand-medium" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="py-3 text-gray-600 text-sm leading-relaxed">{answer}</p>
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
    <section id="materiais-por-dentro" className="py-20 px-4 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a7a4a] mb-4 tracking-tight">
            Explore o Kit por Dentro
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-bold leading-relaxed px-4">
            Desenvolvemos cada material pensando no bem estar da sua criança. Escolha uma aba para visualizar:
          </p>
          <div className="w-20 h-1 bg-[#1a7a4a] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tab Buttons Row inside light green rounded container */}
        <div className="bg-[#e8fbf0] p-2.5 rounded-[24px] max-w-3xl mx-auto border border-green-150/60 shadow-sm mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-full text-xs sm:text-sm font-black tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-[#1a7a4a] text-white shadow-md shadow-[#1a7a4a]/10"
                      : "bg-[#d4f5e3] text-[#1a7a4a] hover:bg-[#c3edd4]"
                  }`}
                >
                  <span className="text-base select-none leading-none">{tab.icon}</span>
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

  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBasicClick = () => {
    setShowUpsell(true);
  };

  return (
    <div className="min-h-screen pt-10 sm:pt-12">
      {/* Floating Mobile CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-4 right-4 z-40 sm:hidden"
          >
            <button 
              onClick={scrollToPricing}
              className="w-full bg-brand-medium text-white font-black py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 animate-pulse"
            >
              <ShoppingBag className="w-5 h-5" />
              QUERO MEU ACESSO AGORA
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <UrgencyBar />
      <SalesNotification />

      {/* Hero Section */}
      <section id="hero" className="bg-white px-4 py-16 sm:py-24 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-brand-light text-brand-dark px-4 py-1 rounded-full text-xs font-bold tracking-wider mb-6 border border-brand-medium/20">
            PARA FAMÍLIAS E PROFESSORES DE CRIANÇAS COM AUTISMO
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
            <span className="text-brand-dark">+50 Rotinas Visuais</span> para Crianças com TEA
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Reduza crises, aumente a independência e torne o dia a dia mais previsível — sem precisar criar do zero.
          </p>

          {/* Hero Video Player (VSL) Section */}
          <HeroVideoPlayer />

          <button 
            id="cta-hero"
            onClick={scrollToPricing}
            className="bg-brand-medium hover:bg-brand-medium/90 text-white text-lg sm:text-xl font-black px-8 py-4 rounded-full shadow-lg shadow-brand-medium/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wide mt-2"
          >
            Quero Meu Acesso Imediato
          </button>

          {/* New Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-medium" />
              <span>Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-medium" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-brand-medium fill-brand-medium" />
              <span>Satisfação Garantida</span>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl shadow-brand-dark/5 border border-brand-light">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                ].map((url, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={url} alt="User Feedback" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                </div>
                <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">+3.000 famílias impactadas</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* Dores (Problem) Section */}
      <section id="problema" className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">O Problema NÃO é Você</h2>
            <div className="w-20 h-1 bg-brand-medium mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            {[
              "Seu filho tem uma crise toda vez que a rotina muda inesperadamente",
              "Você já tentou explicar com palavras e percebe que simplesmente não funciona",
              "Não tem tempo de pesquisar e criar materiais visuais personalizados",
              "A escola pede apoio mas não oferece os recursos visuais necessários",
              "Termina o dia esgotada sem saber o que pode melhorar no dia seguinte"
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:translate-x-2">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution (Respira) Section */}
      <section id="solucao" className="bg-brand-dark py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-8 italic">Respira...</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            “Com as <span className="font-bold text-brand-medium underline underline-offset-4">Rotinas Prontas</span> você vai dar previsibilidade e segurança para sua criança, reduzir crises e ganhar autonomia no dia a dia — <span className="italic">sem gastar horas criando do zero.”</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-medium" />
              <span className="text-sm font-bold">100% Digital (PDF)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-medium" />
              <span className="text-sm font-bold">Acesso Vitalício</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-medium" />
              <span className="text-sm font-bold">Imprima em Casa</span>
            </div>
          </div>
        </div>
        
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 opacity-10">
           <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
             <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="20" strokeDasharray="40 20" />
           </svg>
        </div>
      </section>

      {/* Bônus Section */}
      <section id="bonus" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Bônus Exclusivos</h2>
            <p className="text-brand-medium font-bold uppercase tracking-widest text-sm">Somente para compras realizadas hoje</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Rotina matinal passo a passo", 
                icon: <Clock className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors" />, 
                desc: "Torne o acordar um momento tranquilo e previsível.",
                image: "https://imgur.com/a/o2z7GJk"
              },
              { 
                title: "Cartões de comunicação por figuras", 
                icon: <MessageCircle className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors" />, 
                desc: "Ajude seu filho a expressar necessidades básicas sem choro.",
                image: "https://imgur.com/a/CGPvIgc"
              },
              { 
                title: "Guia de adaptação escolar", 
                icon: <BookOpen className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors" />, 
                desc: "Como levar a rotina visual para dentro da sala de aula.",
                image: "https://imgur.com/a/iwu7tYK"
              },
              { 
                title: "Kit anti-crise visual", 
                icon: <ShieldCheck className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors" />, 
                desc: "Plaquinhas de 'espera', 'ajuda' e 'pausa' para momentos difíceis.",
                image: "https://imgur.com/a/64HncyK"
              }
            ].map((bonus, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl border border-gray-100 hover:border-brand-medium/30 hover:shadow-xl transition-all group overflow-hidden flex flex-col justify-between">
                <div>
                  {bonus.image && (
                    <div className="h-40 w-full overflow-hidden relative bg-gray-100 flex-shrink-0">
                      <img 
                        src={getDirectImageUrl(bonus.image)} 
                        alt={bonus.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-brand-dark p-2.5 rounded-2xl shadow-sm group-hover:bg-brand-medium group-hover:text-white transition-all">
                        {bonus.icon}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    {!bonus.image && (
                      <div className="w-12 h-12 bg-brand-light text-brand-dark rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-medium group-hover:text-white transition-colors">
                        {bonus.icon}
                      </div>
                    )}
                    <h3 className="font-black text-lg text-gray-900 mb-2 leading-tight">{bonus.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{bonus.desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-brand-medium uppercase">
                    <Gift className="w-3.5 h-3.5" />
                    <span>GRÁTIS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="bg-brand-light/20 py-24 px-4 relative overflow-hidden">
        {/* Decorative ambient blur elements */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-brand-medium/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand-medium/10 text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Feedback por E-mail
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              O que as famílias estão dizendo...
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Relatos reais enviados diretamente para a nossa caixa de entrada por mães, pais e profissionais de todo o Brasil.
            </p>
          </div>

          {/* Trust Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-1">4.9 / 5 Estrelas</h4>
              <p className="text-xs text-gray-500 font-medium">Média de satisfação com base em mais de 3.500 avaliações de pais e profissionais.</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-brand-light text-brand-medium rounded-full flex items-center justify-center mb-2 font-bold text-lg">
                ❤️
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-1">+3.500 Famílias</h4>
              <p className="text-xs text-gray-500 font-medium">Crianças que conquistaram rotinas mais previsíveis, leves e com menos crises de ansiedade.</p>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2 font-bold text-lg">
                🛡️
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-1">Garantia Incondicional</h4>
              <p className="text-xs text-gray-500 font-medium">Experimente por até 7 dias sem compromisso. Se não gostar, devolvemos 100% do seu dinheiro.</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {[
              { id: 'todos', label: 'Todos os E-mails' },
              { id: 'pais', label: 'Mães e Pais' },
              { id: 'profissionais', label: 'Profissionais & Escolas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDepoType(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all uppercase cursor-pointer border ${
                  selectedDepoType === tab.id
                    ? 'bg-brand-medium text-white shadow-md shadow-brand-medium/20 border-brand-medium'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-950 border-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Testimonials Grid in Email format */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        inbox/depoimento_{idx + 1}@kitvisual.com.br
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
                          <span className="text-gray-700 font-medium">suporte@kitvisual.com.br</span>
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
                          <span className="text-brand-medium font-bold text-[9px] uppercase tracking-wider bg-brand-medium/10 px-2 py-0.5 rounded-sm shrink-0 select-none">
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
                            <span className="font-bold text-[#006e56] uppercase tracking-wide text-[10px]">Suporte • Ana do Kit Visual</span>
                            <span className="text-[9px] text-gray-400">Resposta Automática</span>
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
      <section id="planos" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Escolha seu Acesso</h2>
            <p className="text-gray-500 font-medium mb-4">Invista no bem-estar e autonomia da sua criança</p>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
              <Clock className="w-3 h-3" />
              <span>O PREÇO IRÁ SUBIR EM BREVE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Plano Básico */}
             <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 flex flex-col items-center text-center relative hover:border-gray-300 transition-colors">
               <h3 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-wide">Plano Básico</h3>
               <p className="text-sm text-gray-500 mb-6 italic">“O essencial para começar”</p>
               <div className="mb-6">
                 <span className="text-gray-400 line-through text-sm">R$47</span>
                 <div className="flex items-center justify-center gap-1">
                   <span className="text-gray-900 font-bold text-2xl">R$</span>
                   <span className="text-gray-900 font-black text-6xl">10</span>
                 </div>
               </div>
               <ul className="text-left space-y-3 mb-10 w-full">
                 {[
                   "Apoio Visual / Rotina",
                   "Pictogramas Escolares",
                   "AVDS (Atividades de Vida Diária)",
                   "Core / Palavras Essenciais",
                   "Recorte / Cole / Ligar / Pintar",
                   "Alfabetização",
                   "Festividades"
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                     <Check className="w-4 h-4 text-brand-medium flex-shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>
               <button 
                 onClick={handleBasicClick}
                 className="mt-auto w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all"
               >
                 COMPRAR AGORA
               </button>
             </div>

             {/* Plano Premium */}
             <div className="bg-brand-light border-4 border-brand-medium rounded-3xl p-8 flex flex-col items-center text-center relative shadow-2xl shadow-brand-medium/20 scale-105">
               <div className="absolute -top-5 bg-brand-medium text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest animate-bounce">
                  Mais Vendido
               </div>
               <h3 className="text-xl font-black text-brand-dark mb-2 uppercase tracking-wide">Plano Premium</h3>
               <p className="text-sm text-brand-dark/60 mb-6 font-bold italic">“Tudo do Básico +”</p>
               <div className="mb-6">
                 <span className="text-brand-dark/40 line-through text-sm">R$97</span>
                 <div className="flex items-center justify-center gap-1">
                   <span className="text-brand-dark font-bold text-2xl">R$</span>
                   <span className="text-brand-dark font-black text-6xl">27,90</span>
                 </div>
               </div>
               <ul className="text-left space-y-2 mb-10 w-full overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                 {[
                   "Pranchas Prontas",
                   "Histórias Sociais",
                   "Livros e Histórias",
                   "Conceitos Matemáticos",
                   "Vamos Falar?",
                   "Canto e Voz",
                   "Ciência / Biologia",
                   "Músicas",
                   "Receitas",
                   "Atividades Diversas",
                   "The AAC Coach",
                   "Brinquedos e Brincadeiras",
                   "Adolescentes",
                   "Posts Técnicos",
                   "Atualizações vitalícias"
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-brand-dark font-bold">
                     <CheckCircle2 className="w-4 h-4 text-brand-medium flex-shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>
               <button 
                 onClick={() => window.location.href = 'https://pay.cakto.com.br/p2i9bv8_888747'}
                 className="mt-auto w-full bg-brand-medium text-white font-black py-4 rounded-2xl hover:bg-brand-medium/90 transition-all shadow-lg shadow-brand-medium/30 uppercase tracking-widest transform hover:scale-105 active:scale-95"
               >
                 QUERO ACESSO PREMIUM
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Sobre a Criadora Section */}
      <section id="sobre" className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 rotate-3">
              <img src="https://i.imgur.com/G4DaqP5.png" alt="Ana Paula Souza" className="w-full h-full object-cover object-[center_20%]" />
            </div>
            <div>
              <span className="text-brand-medium font-bold text-sm uppercase mb-2 block">Idealizadora do Projeto</span>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Ana Paula Souza</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Psicopedagoga & Especialista em TEA com mais de 10 anos de experiência clínica e educacional. 
                Minha missão é simplificar o dia a dia de famílias atípicas através de ferramentas visuais práticas e comprovadas.
              </p>
              <div className="flex gap-4">
                 <div className="flex flex-col">
                   <span className="text-2xl font-black text-brand-dark leading-none">10+</span>
                   <span className="text-[10px] uppercase font-bold text-gray-400">Anos Exp</span>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="flex flex-col">
                   <span className="text-2xl font-black text-brand-dark leading-none">3k+</span>
                   <span className="text-[10px] uppercase font-bold text-gray-400">Famílias</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia Section */}
       <section id="garantia" className="py-20 px-4 bg-white text-center">
         <div className="max-w-3xl mx-auto bg-brand-light p-8 sm:p-12 rounded-[50px] border-4 border-dashed border-brand-medium/30">
            <ShieldCheck className="w-20 h-20 text-brand-medium mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Garantia Total de 14 Dias</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Não tem risco. Se você testar o material e sentir que não ajudou a reduzir as crises ou organizar a rotina do seu filho, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
         </div>
       </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">Dúvidas Frequentes</h2>
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
            <FAQItem 
              question="Como recebo o acesso ao material?" 
              answer="O acesso é imediato! Assim que seu pagamento for confirmado (no cartão ou PIX), você receberá um e-mail com o link para baixar todos os arquivos em PDF diretamente para o seu computador ou celular." 
            />
            <FAQItem 
              question="Para qual idade o kit é indicado?" 
              answer="As rotinas visuais são indicadas para crianças a partir dos 2 anos de idade até a pré-adolescência, dependendo do nível de suporte e compreensão visual da criança." 
            />
            <FAQItem 
              question="Preciso de internet constante para usar?" 
              answer="Não. Uma vez baixado o material, você pode acessá-lo offline. A internet é necessária apenas para baixar os arquivos inicialmente." 
            />
            <FAQItem 
              question="O material serve para ser usado na escola?" 
              answer="Com certeza! Muitos professores utilizam nossos cartões em salas de recursos e salas regulares para auxiliar na inclusão e previsibilidade dos alunos atípicos." 
            />
            <FAQItem 
              question="Terei suporte se tiver alguma dúvida?" 
              answer="Sim! Temos um canal de suporte via e-mail e WhatsApp para ajudar você com qualquer problema técnico ou dúvida sobre como utilizar os materiais da melhor forma." 
            />
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section id="aviso-legal" className="bg-gray-50 pb-12 px-4">
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
