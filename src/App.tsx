import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Lobby } from './pages/Lobby';
import { Weapons } from './pages/Weapons';
import { GameScene } from './game/GameScene';
import { useAuthStore } from './store/authStore';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const Modes = () => <div className="pt-32 text-center text-2xl">Modos de Jogo (Em Breve)</div>;
const Store = () => <div className="pt-32 text-center text-2xl">Loja Cosmética (Em Breve)</div>;
const Profile = () => <div className="pt-32 text-center text-2xl">Perfil do Jogador</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="weapons" element={<Weapons />} />
          <Route path="modes" element={<Modes />} />
          <Route path="store" element={<Store />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Game Routes */}
        <Route path="/lobby" element={
          <ProtectedRoute>
            <Lobby />
          </ProtectedRoute>
        } />
        <Route path="/play" element={
          <ProtectedRoute>
            <GameScene />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
