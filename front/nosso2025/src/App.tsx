import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WrappedPage from './WrappedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para criar (futuramente você fará a Home aqui) */}
        <Route path="/" element={<h1>Página Inicial (Criar Site)</h1>} />
        
        {/* Rota dinâmica: O :slug vai pegar "joao-maria", "joao-maria-2", etc */}
        <Route path="/pagina/:slug" element={<WrappedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;