import React, { useState, useEffect } from 'react'; // Removi useRef daqui pois foi pro card
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TiltedCard from './components/TiltedCard';
import Stack from './components/Stack';
import GradientText from './components/GradientText';
import SpotifyCard from './components/SpotifyCard'; // <--- Importe aqui
import './WrappedPage.css';

interface WrappedData {
    id?: number;
    slug?: string;
    nome1: string;
    nome2: string;
    mainPhoto: string;
    spotifyImage: string;
    songUrl: string;
    carrousel: string[];
    passwordToOpen: string;
    
}

const WrappedPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<WrappedData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
    const [inputPassword, setInputPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    // O useEffect do AudioRef antigo foi removido pois o card cuida disso agora

    useEffect(() => {
        if (slug) {
            axios.get(`http://localhost:8080/pagina/${slug}`)
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [slug]);

    const handleUnlock = () => {
        if (data && inputPassword.toLowerCase().trim() === data.passwordToOpen.toLowerCase()) {
            setIsUnlocked(true);
        } else {
            setErrorMsg("Senha incorreta");
        }
    };

    if (loading) return <div className="loading-screen">Carregando amor...</div>;
    if (!data) return <div className="error-screen">Página não encontrada</div>;

    if (!isUnlocked) {
        return (
            <div className="container-lock">
                <div className="lock-box">
                    <h2>🔒 {data.nome1} & {data.nome2}</h2>
                    <p>Qual a frase secreta?</p>
                    <input
                        type="text"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    />
                    <button onClick={handleUnlock}>Entrar</button>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className="content-container fade-in">
                <header className="header-names">
                    <GradientText
                        colors={["#db2777", "#ffffffff", "#db2777", "#ffffffff", "#db2777"]}
                        animationSpeed={6}
                        showBorder={false}
                        className="gradient-title"
                    >
                        {data.nome1} 💞 {data.nome2}
                    </GradientText>
                </header>

                <div className="hero-section">
                    <TiltedCard
                        imageSrc={data.mainPhoto}
                        altText="Foto do casal"
                        captionText={`${data.nome1} & ${data.nome2}`}
                        containerHeight="400px"
                        containerWidth="100%"
                        imageHeight="350px"
                        imageWidth="350px"
                        rotateAmplitude={12}
                        scaleOnHover={1.15}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                    />
                    
                    <p className="hero-caption">
                        Sem você, esse ano não teria o mesmo significado.
                    </p>
                </div>
                <SpotifyCard 
                    imageSrc={data.spotifyImage} 
                    nome1={data.nome1} 
                    nome2={data.nome2} 
                    songUrl={data.songUrl}
                />

                {data.carrousel.length > 0 && (
                    <div className="stack-section">
                        <h3>Nossos Momentos</h3>
                        <p className="stack-hint">(Clique nas fotos para passar)</p>

                        <div className="stack-wrapper">
                            <Stack
                                randomRotation={true}
                                sensitivity={180}
                                sendToBackOnClick={true}
                                cards={data.carrousel.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Momento ${i + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                            border: '4px solid white',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                ))}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WrappedPage;