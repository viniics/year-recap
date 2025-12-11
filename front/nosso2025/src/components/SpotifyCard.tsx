import React, { useRef, useState, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import './SpotifyCard.css';

interface SpotifyCardProps {
    imageSrc: string;
    nome1: string;
    nome2: string;
    songUrl: string;
}

const SpotifyCard: React.FC<SpotifyCardProps> = ({ imageSrc, nome1, songUrl }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false)); // Se bloquear, fica em pause
            }
        }
    }, [songUrl]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="spotify-card">
            {/* Elemento de áudio invisível */}
            <audio ref={audioRef} src={songUrl} loop />

            <img src={imageSrc} alt="Album Art" className="spotify-album-art" />

            <div className="spotify-track-info">
                <h3 className="spotify-title">Todas as melodias mais lindas me lembram você</h3>
                <p className="spotify-artist">{nome1}</p>
            </div>

            <div className="spotify-controls">
                <button className="play-btn" onClick={togglePlay}>
                    {isPlaying ? (
                        <PauseCircleIcon sx={{ fontSize: '4.5rem' }} />
                    ) : (
                        <PlayCircleIcon sx={{ fontSize: '4.5rem' }} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default SpotifyCard;