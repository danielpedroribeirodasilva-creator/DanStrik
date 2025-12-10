import { Button } from '../components/ui/Button';

const weapons = [
  {
    id: 1,
    name: "Rifle Laser MK-IV",
    type: "Assalto",
    desc: "Arma padrão da infantaria lunar. Dispara feixes de alta energia com precisão cirúrgica no vácuo.",
    stats: { damage: 70, range: 90, fireRate: 80 },
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop" // Placeholder abstract tech
  },
  {
    id: 2,
    name: "Pistola de Plasma",
    type: "Secundária",
    desc: "Compacta e letal. Gera bolhas de plasma superaquecido capazes de derreter armaduras leves.",
    stats: { damage: 50, range: 40, fireRate: 60 },
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sniper Orbital",
    type: "Longo Alcance",
    desc: "Projetada para engajamentos entre crateras. Compensação automática de gravidade e mira térmica.",
    stats: { damage: 95, range: 100, fireRate: 20 },
    image: "https://images.unsplash.com/photo-1615840287214-7ff58ee0489b?q=80&w=2000&auto=format&fit=crop"
  }
];

export const Weapons = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4 text-white">Arsenal Lunar</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Escolha suas ferramentas de destruição. Cada arma é calibrada para funcionar perfeitamente em ambientes de baixa gravidade e vácuo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weapons.map((weapon) => (
          <div key={weapon.id} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
              <img src={weapon.image} alt={weapon.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 relative z-20">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{weapon.name}</h3>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-slate-700">{weapon.type}</span>
              </div>
              <p className="text-slate-400 text-sm mb-6 h-12">{weapon.desc}</p>
              
              <div className="space-y-3 mb-6">
                <StatBar label="Dano" value={weapon.stats.damage} />
                <StatBar label="Alcance" value={weapon.stats.range} />
                <StatBar label="Cadência" value={weapon.stats.fireRate} />
              </div>
              
              <Button variant="secondary" className="w-full text-sm py-2">Equipar no Loadout</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatBar = ({ label, value }: { label: string, value: number }) => (
  <div className="flex items-center gap-4 text-xs">
    <span className="w-16 text-slate-500 uppercase font-bold">{label}</span>
    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${value}%` }} />
    </div>
  </div>
);
