import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { hoverScale } from "@/utils/animations";

const Footer = () => {
  return (
    <footer className="bg-[#0B1354] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className={`flex items-center space-x-2 ${hoverScale}`}>
              <img 
                src="/washing-machine-white.png" 
                alt="LA Laundry Logo" 
                className="h-8 w-8"
                loading="lazy"
              />
              <span className="font-display text-xl font-semibold text-white">LA LAUNDRY</span>
            </Link>
            <p className="text-gray-300">
              Experience premium laundry services across Los Angeles
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/locations">Locations</FooterLink></li>
              <li><FooterLink to="/services">Services</FooterLink></li>
              <li><FooterLink to="/about">About</FooterLink></li>
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 group">
                <Phone className="w-5 h-5 group-hover:text-brand-pink transition-colors duration-300" />
                <a href="tel:+12135550123" className="group-hover:text-brand-pink transition-colors duration-300">
                  (213) 555-0123
                </a>
              </li>
              <li className="flex items-center space-x-2 group">
                <Mail className="w-5 h-5 group-hover:text-brand-pink transition-colors duration-300" />
                <a href="mailto:info@lalaundry.com" className="group-hover:text-brand-pink transition-colors duration-300">
                  info@lalaundry.com
                </a>
              </li>
              <li className="flex items-center space-x-2 group">
                <MapPin className="w-5 h-5 group-hover:text-brand-pink transition-colors duration-300" />
                <span className="group-hover:text-brand-pink transition-colors duration-300">Los Angeles, CA</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white transition-colors duration-300">
                Monday - Friday: 6:00 AM - 10:00 PM
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300">
                Saturday: 7:00 AM - 9:00 PM
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300">
                Sunday: 8:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p> 2024 LA Laundry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-gray-300 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-pink after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {children}
  </Link>
);

export default Footer;