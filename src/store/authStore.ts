import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface UserProfile {
  id: string;
  username: string;
  xp: number;
  level: number;
  coins: number;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>; // Simulado para demo se sem supabase
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkSession: async () => {
    if (!isSupabaseConfigured()) {
      // Modo Demo Offline
      set({ isLoading: false });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Buscar perfil
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      if (data) {
        set({ user: data, isAuthenticated: true, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email) => {
    // Simulação para modo offline/demo se não configurado
    if (!isSupabaseConfigured()) {
      set({
        isAuthenticated: true,
        user: {
          id: 'demo-user',
          username: email.split('@')[0],
          xp: 1500,
          level: 5,
          coins: 2500
        }
      });
      return;
    }
    // Lógica real iria aqui
  },

  loginWithGoogle: async () => {
    if (!isSupabaseConfigured()) {
      alert("Configure o Supabase no .env para usar Login Social real.");
      return;
    }
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  },

  logout: async () => {
    if (isSupabaseConfigured()) await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  }
}));
