import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGameStore, GameMode } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Users, Crosshair, Cpu, Trophy, Shield, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Lobby = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { startGame } = useGameStore();
  const [selectedMode, setSelectedMode] = useState<GameMode>('TDM');

  const handleStartGame = () => {
    startGame(selectedMode, 'Arena Block Alpha');
    navigate('/play');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">
      {/* Sidebar - Player Profile */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-900/50 flex items-center justify-center text-2xl font-bold">
            {user?.username.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.username}</h2>
            <div className="text-xs text-cyan-400 font-mono">Lvl {user?.level} • {user?.xp} XP</div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <h3 className="text-xs uppercase text-slate-500 font-bold mb-3">Estatísticas</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>K/D Ratio</span><span className="text-white font-mono">2.4</span></div>
              <div className="flex justify-between"><span>Vitórias</span><span className="text-white font-mono">142</span></div>
              <div className="flex justify-between"><span>Headshots</span><span className="text-white font-mono">89%</span></div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <h3 className="text-xs uppercase text-slate-500 font-bold mb-3">Loadout Atual</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center"><Crosshair size={16}/></div>
              <div><div className="text-sm font-bold">AK-47 Voxel</div><div className="text-xs text-slate-400">Rifle de Assalto</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center"><Shield size={16}/></div>
              <div><div className="text-sm font-bold">Desert Eagle</div><div className="text-xs text-slate-400">Pistola Pesada</div></div>
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs py-2">Editar Loadout</Button>
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-800">
             <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                <Settings size={16} /> Configurações
             </Button>
        </div>
      </aside>

      {/* Main Content - Mode Selection */}
      <main className="flex-1 p-12 relative flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        
        <header className="mb-12 relative z-10">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Seleção de Batalha</h1>
          <p className="text-slate-400 text-lg">Escolha seu modo de jogo e entre na fila.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
          <ModeCard 
            title="Team Deathmatch" 
            icon={<Users className="w-8 h-8" />}
            desc="5v5. A primeira equipe a atingir 100 eliminações vence."
            active={selectedMode === 'TDM'}
            onClick={() => setSelectedMode('TDM')}
          />
          <ModeCard 
            title="Free For All" 
            icon={<Trophy className="w-8 h-8" />}
            desc="Cada um por si. Elimine tudo que se move. Sobreviva."
            active={selectedMode === 'FFA'}
            onClick={() => setSelectedMode('FFA')}
          />
          <ModeCard 
            title="Treino vs Bots" 
            icon={<Cpu className="w-8 h-8" />}
            desc="Pratique sua mira contra IA em mapas aleatórios."
            active={selectedMode === 'ZOMBIE'} // Using zombie as placeholder for bot mode
            onClick={() => setSelectedMode('ZOMBIE')}
          />
        </div>

        <div className="mt-auto flex justify-end items-center gap-8 relative z-10">
            <div className="text-right">
                <div className="text-sm text-slate-400 uppercase tracking-widest">Mapa Selecionado</div>
                <div className="text-2xl font-bold text-white">Arena Block Alpha</div>
            </div>
            <Button 
                onClick={handleStartGame}
                variant="primary" 
                glow 
                className="px-16 py-6 text-2xl skew-x-[-10deg]"
            >
                <span className="skew-x-[10deg] block">INICIAR PARTIDA</span>
            </Button>
        </div>
      </main>
    </div>
  );
};

const ModeCard = ({ title, desc, icon, active, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${active ? 'bg-cyan-900/20 border-cyan-500 shadow-lg shadow-cyan-900/30' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
  >
    <div className={`mb-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`}>{icon}</div>
    <h3 className={`text-xl font-bold uppercase mb-2 ${active ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);
