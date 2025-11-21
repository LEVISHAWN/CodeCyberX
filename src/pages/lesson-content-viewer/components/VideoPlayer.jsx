import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  title = "Introduction to SQL Injection Prevention",
  duration = "12:45",
  currentTime = 0,
  onTimeUpdate,
  onProgress,
  subtitles = [],
  transcript = "",
  className = ""
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video?.currentTime / video?.duration) * 100;
      setProgress(currentProgress);
      onTimeUpdate?.(video?.currentTime);
    };

    const handleProgress = () => {
      if (video?.buffered?.length > 0) {
        const bufferedProgress = (video?.buffered?.end(0) / video?.duration) * 100;
        setBuffered(bufferedProgress);
      }
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('progress', handleProgress);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('progress', handleProgress);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
      setIsPlaying(true);
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * video?.duration;
    video.currentTime = newTime;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-subtle ${className}`}>
      {/* Video Container */}
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={togglePlay}
        />

        {/* Video Controls Overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-white/50 rounded-full"
                  style={{ width: `${buffered}%` }}
                ></div>
                <div 
                  className="h-full bg-primary rounded-full -mt-1"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/30 rounded-full appearance-none slider"
                  />
                </div>

                <span className="text-white text-sm">
                  {formatTime(videoRef?.current?.currentTime || 0)} / {duration}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    {playbackRate}x
                  </Button>
                  <div className="absolute bottom-full right-0 mb-2 bg-black/80 rounded-md p-2 space-y-1">
                    {speedOptions?.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`block w-full text-left px-2 py-1 text-sm text-white hover:bg-white/20 rounded ${
                          playbackRate === speed ? 'bg-primary' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`text-white hover:bg-white/20 ${showSubtitles ? 'bg-primary' : ''}`}
                >
                  <Icon name="Subtitles" size={16} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Maximize" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Subtitles */}
        {showSubtitles && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-md text-center max-w-md">
            <p className="text-sm">
              Understanding SQL injection vulnerabilities and prevention techniques.
            </p>
          </div>
        )}
      </div>
      {/* Video Info */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>1,234 views</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
            iconName="FileText"
            iconPosition="left"
          >
            Transcript
          </Button>
        </div>
      </div>
      {/* Transcript */}
      {showTranscript && (
        <div className="p-4 bg-muted/50 max-h-48 overflow-y-auto">
          <h4 className="text-sm font-medium text-foreground mb-2">Video Transcript</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Welcome to this lesson on SQL injection prevention. In this video, we'll explore how SQL injection attacks work and learn practical techniques to protect your applications.
            </p>
            <p>
              SQL injection occurs when user input is directly concatenated into SQL queries without proper sanitization. This allows attackers to manipulate the query structure and potentially access or modify sensitive data.
            </p>
            <p>
              The most effective defense against SQL injection is using parameterized queries or prepared statements. These techniques separate the SQL code from the data, preventing malicious input from altering the query structure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;