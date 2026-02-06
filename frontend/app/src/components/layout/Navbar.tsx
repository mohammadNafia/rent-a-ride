import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Vehicles', href: '/vehicles' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>TEL: 1-800-123-4567</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">EMAIL: INFO@RENTARIDE.COM</span>
          </div>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/login" className="hover:text-[#f15e2b] transition-colors">
                  LOGIN
                </Link>
                <Link to="/auth/register" className="hover:text-[#f15e2b] transition-colors">
                  REGISTER
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">{user?.firstName} {user?.lastName}</span>
                <button
                  onClick={handleLogout}
                  className="hover:text-[#f15e2b] transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Car className="w-8 h-8 text-[#f15e2b]" />
              <span className="text-2xl font-bold tracking-tight">
                RENT<span className="text-[#f15e2b]">-A-</span>RIDE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors relative group',
                    location.pathname === link.href
                      ? 'text-[#f15e2b]'
                      : 'text-gray-700 hover:text-[#f15e2b]'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f15e2b] transition-all duration-300 group-hover:w-full',
                      location.pathname === link.href && 'w-full'
                    )}
                  />
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin/vehicles"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#f15e2b] transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  ADMIN
                </Link>
              )}
              
              {isAuthenticated && !isAdmin && (
                <Link
                  to="/rentals/history"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#f15e2b] transition-colors"
                >
                  <User className="w-4 h-4" />
                  MY RENTALS
                </Link>
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => navigate('/vehicles')}
                className="bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold px-6"
              >
                RENT A CAR
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'block py-2 text-sm font-medium',
                    location.pathname === link.href
                      ? 'text-[#f15e2b]'
                      : 'text-gray-700'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin/vehicles"
                  className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  ADMIN PANEL
                </Link>
              )}
              
              {isAuthenticated && !isAdmin && (
                <Link
                  to="/rentals/history"
                  className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  MY RENTALS
                </Link>
              )}
              
              <Button
                onClick={() => {
                  navigate('/vehicles');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold mt-4"
              >
                RENT A CAR
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
