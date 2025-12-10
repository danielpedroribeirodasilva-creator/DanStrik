import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, Users, Globe, Cpu } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-400 tracking-[0.5em] text-sm uppercase mb-4 font-bold">A Fronteira Final do Combate</h2>
            <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 text-white text-glow font-['Orbitron']">
              Lunar <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Strike</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Domine a baixa gravidade. Combata em crateras lunares. Sobreviva ao vácuo. 
              O FPS tático definitivo ambientado na colonização lunar de 2085.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/play">
                <Button variant="primary" glow className="w-full md:w-auto text-lg px-12 py-4">
                  Jogar Agora (Online)
                </Button>
              </Link>
              <Link to="/modes">
                <Button variant="outline" className="w-full md:w-auto text-lg px-12 py-4">
                  Ver Modos de Jogo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-wider mb-4">Recursos do Jogo</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-8 h-8" />}
              title="Física Lunar Realista"
              desc="Experimente a gravidade 1/6 da Terra. Pulos gigantes, quedas lentas e combate vertical intenso."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Multiplayer Competitivo"
              desc="Modos 1v1, 2v2 e 4v4 em arenas orbitais. Suba no ranking global e conquiste a Lua."
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8" />}
              title="Bots Inteligentes"
              desc="Treine offline contra IA avançada que aprende suas táticas e utiliza o ambiente a seu favor."
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8" />}
              title="Arsenal Futurista"
              desc="De rifles laser a canhões de plasma. Personalize seu loadout para cada missão."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Sistemas de Defesa"
              desc="Gerencie seus escudos de energia e armadura pressurizada. O vácuo é tão letal quanto os inimigos."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Parkour Espacial"
              desc="Use jetpacks e botas magnéticas para navegar por crateras e estruturas orbitais com fluidez."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-slate-900/50 p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-2">
    <div className="text-cyan-500 mb-6 group-hover:text-cyan-300 group-hover:scale-110 transition-transform duration-300 inline-block">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);
