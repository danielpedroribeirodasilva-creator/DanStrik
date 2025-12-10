import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { useState } from 'react';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isGame = location.pathname === '/play';

  // If we are in game, don't show the standard layout
  if (isGame) return <Outlet />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <Gamepad2 className="w-8 h-8 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
              <span className="font-bold text-xl tracking-wider uppercase font-['Orbitron']">
                Lunar <span className="text-cyan-500">Strike</span>
              </span>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink to="/modes">Modos</NavLink>
                <NavLink to="/weapons">Arsenal</NavLink>
                <NavLink to="/store">Loja</NavLink>
                <NavLink to="/profile">Perfil</NavLink>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" className="py-2 px-4 text-sm">Login</Button>
              <Link to="/play">
                <Button variant="primary" glow className="py-2 px-6 text-sm">JOGAR</Button>
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/modes">Modos</MobileNavLink>
              <MobileNavLink to="/weapons">Arsenal</MobileNavLink>
              <MobileNavLink to="/store">Loja</MobileNavLink>
              <MobileNavLink to="/profile">Perfil</MobileNavLink>
              <div className="pt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-center">Login</Button>
                <Link to="/play">
                  <Button variant="primary" className="w-full justify-center">JOGAR AGORA</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4">Lunar Strike</h3>
            <p className="text-slate-400 text-sm">
              O FPS de combate espacial definitivo. Junte-se à batalha pela supremacia lunar hoje mesmo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Jogo</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/modes" className="hover:text-cyan-400">Modos de Jogo</Link></li>
              <li><Link to="/weapons" className="hover:text-cyan-400">Armas</Link></li>
              <li><Link to="/play" className="hover:text-cyan-400">Jogar Agora</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400">Status do Servidor</a></li>
              <li><a href="#" className="hover:text-cyan-400">FAQ</a></li>
              <li><a href="#" className="hover:text-cyan-400">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400">Privacidade</a></li>
              <li><a href="#" className="hover:text-cyan-400">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2025 Lunar Strike Studios. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wide">
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
    {children}
  </Link>
);
