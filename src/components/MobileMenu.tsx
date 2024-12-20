import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80vw] sm:w-[350px] pt-12">
        <nav className="flex flex-col space-y-4">
          <MobileLink to="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
          <MobileLink to="/locations" onClick={() => setIsOpen(false)}>Locations</MobileLink>
          <MobileLink to="/services" onClick={() => setIsOpen(false)}>Services</MobileLink>
          <MobileLink to="/blog" onClick={() => setIsOpen(false)}>Blog</MobileLink>
          <MobileLink to="/about" onClick={() => setIsOpen(false)}>About</MobileLink>
          <MobileLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MobileLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-lg font-medium text-gray-600 hover:text-brand-pink transition-colors duration-300"
  >
    {children}
  </Link>
);

export default MobileMenu;