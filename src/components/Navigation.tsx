import { Link } from "react-router-dom";
import { hoverScale } from "@/utils/animations";
import MobileMenu from "./MobileMenu";

const Navigation = () => {
  return (
    <nav className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className={`flex items-center space-x-2 ${hoverScale}`}>
            <img 
              src="/washing-machine.png" 
              alt="LA Laundry Logo" 
              className="h-8 w-8"
              loading="eager"
              fetchPriority="high"
            />
            <span className="text-primary font-display text-xl font-semibold">LA LAUNDRY</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/locations">Locations</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-gray-600 hover:text-brand-pink transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-pink after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {children}
  </Link>
);

export default Navigation;