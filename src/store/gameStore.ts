import { create } from 'zustand';

export type GameMode = 'TDM' | 'FFA' | 'ZOMBIE';

interface GameState {
  // Estado da Partida
  isPlaying: boolean;
  gameMode: GameMode;
  mapName: string;
  
  // Jogador
  health: number;
  armor: number;
  ammo: number;
  maxAmmo: number;
  kills: number;
  deaths: number;
  score: number;
  
  // Loadout Atual
  primaryWeapon: string;
  secondaryWeapon: string;
  
  // Metas
  targetKills: number;
  teamScore: { red: number, blue: number };
  
  // Ações
  startGame: (mode: GameMode, map: string) => void;
  stopGame: () => void;
  shoot: () => void;
  reload: () => void;
  takeDamage: (amount: number) => void;
  registerKill: (team: 'red' | 'blue') => void;
  setLoadout: (primary: string, secondary: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  gameMode: 'TDM',
  mapName: 'Arena Block',
  
  health: 100,
  armor: 100,
  ammo: 30,
  maxAmmo: 30,
  kills: 0,
  deaths: 0,
  score: 0,
  
  primaryWeapon: 'AK-47 Voxel',
  secondaryWeapon: 'Desert Eagle',
  
  targetKills: 50,
  teamScore: { red: 0, blue: 0 },

  startGame: (mode, map) => set({ 
    isPlaying: true, 
    gameMode: mode, 
    mapName: map,
    health: 100, 
    ammo: 30, 
    kills: 0, 
    deaths: 0,
    score: 0,
    teamScore: { red: 0, blue: 0 }
  }),

  stopGame: () => set({ isPlaying: false }),

  shoot: () => set((state) => {
    if (state.ammo > 0) return { ammo: state.ammo - 1 };
    return {};
  }),

  reload: () => set((state) => ({ ammo: state.maxAmmo })),

  takeDamage: (amount) => set((state) => {
    const newHealth = Math.max(0, state.health - amount);
    if (newHealth === 0) {
        // Respawn logic simulation
        setTimeout(() => set({ health: 100, ammo: 30 }), 3000);
        return { health: 0, deaths: state.deaths + 1 };
    }
    return { health: newHealth };
  }),

  registerKill: (team) => set((state) => ({
    kills: state.kills + 1,
    score: state.score + 100,
    teamScore: {
      ...state.teamScore,
      [team]: state.teamScore[team] + 1
    }
  })),

  setLoadout: (primary, secondary) => set({ primaryWeapon: primary, secondaryWeapon: secondary })
}));
