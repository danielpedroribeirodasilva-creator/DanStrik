import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Gamepad2, User, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    navigate('/lobby');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Voxel Art Placeholder */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-slate-900/90 p-8 rounded-xl border-2 border-cyan-500/30 shadow-2xl max-w-md w-full backdrop-blur-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-900/30 rounded-full mb-4 border border-cyan-500/50 box-glow">
            <Gamepad2 className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter font-['Orbitron']">
            Block <span className="text-cyan-500">Strike</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">FPS Voxel Competitivo</p>
        </div>

        {!isSupabaseConfigured() && (
          <div className="mb-6 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded flex items-start gap-3 text-xs text-yellow-200">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Modo Demo Offline:</strong> Supabase não detectado. O login será simulado e o progresso não será salvo na nuvem.
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Nome de Jogador</label>
            <div className="relative group">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu Nick..."
                className="w-full bg-slate-800 border border-slate-700 rounded p-3 pl-10 text-white focus:border-cyan-500 outline-none transition-all font-mono"
                required
              />
            </div>
          </div>
          <Button type="submit" variant="primary" glow className="w-full py-4 text-lg shadow-lg shadow-cyan-900/20">
            ENTRAR NA ARENA
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-900 text-slate-500 font-bold">SOCIAL</span></div>
          </div>
          <button 
            onClick={() => loginWithGoogle()}
            className="mt-4 w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 rounded flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"/></svg>
            Entrar com Google
          </button>
        </div>
      </motion.div>
    </div>
  );
};
