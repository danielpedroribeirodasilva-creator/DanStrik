import { useGameStore } from '../store/gameStore';
import { Shield, Heart, Zap, Crosshair } from 'lucide-react';

export const GameHUD = () => {
  const { health, armor, ammo, weapon, score } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Crosshair */}
      <div className="crosshair flex items-center justify-center">
         <Crosshair className="text-cyan-400 w-8 h-8 opacity-80" />
      </div>

      {/* Top Bar - Score & Timer */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-8">
        <div className="hud-panel px-6 py-2 rounded-b-lg border-t-0">
          <span className="text-xs text-cyan-400 uppercase tracking-widest">Pontuação</span>
          <div className="text-2xl font-bold font-mono">{score.toString().padStart(6, '0')}</div>
        </div>
      </div>

      {/* Bottom Left - Status */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2 w-64">
        {/* Health */}
        <div className="hud-panel p-3 rounded-r-lg skew-x-[-10deg] origin-bottom-left">
          <div className="flex items-center gap-2 skew-x-[10deg]">
            <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-red-500 h-full transition-all duration-300" 
                style={{ width: `${health}%` }}
              />
            </div>
            <span className="font-mono font-bold text-lg w-10 text-right">{health}</span>
          </div>
        </div>
        
        {/* Armor */}
        <div className="hud-panel p-3 rounded-r-lg skew-x-[-10deg] origin-bottom-left">
          <div className="flex items-center gap-2 skew-x-[10deg]">
            <Shield className="text-cyan-400 w-5 h-5" fill="currentColor" />
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-400 h-full transition-all duration-300" 
                style={{ width: `${armor}%` }}
              />
            </div>
            <span className="font-mono font-bold text-lg w-10 text-right">{armor}</span>
          </div>
        </div>
      </div>

      {/* Bottom Right - Weapon */}
      <div className="absolute bottom-8 right-8 text-right">
        <div className="hud-panel p-4 rounded-l-lg skew-x-[10deg] origin-bottom-right">
          <div className="skew-x-[-10deg]">
            <h3 className="text-cyan-400 text-sm uppercase tracking-widest mb-1">{weapon}</h3>
            <div className="flex items-end justify-end gap-2">
              <span className="text-5xl font-mono font-bold text-white">{ammo}</span>
              <span className="text-xl font-mono text-slate-400 mb-2">/ ∞</span>
            </div>
            <div className="flex justify-end gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-2 h-4 rounded-sm ${i < Math.ceil(ammo / 6) ? 'bg-cyan-400 box-glow' : 'bg-slate-700'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Abilities / Center Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="hud-panel w-12 h-12 rounded-full flex items-center justify-center border-2 border-slate-700">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};
