import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Wifi, CreditCard, Leaf, Shield, Star, Timer } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9D1D1] via-[#FFA4B6] via-[#F765A3] via-[#A155B9] via-[#165BAA] to-[#0B1354] animate-gradient bg-[length:200%_100%]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-3xl mx-auto text-white">
          <h1 className="text-5xl font-display font-bold mb-4">LA's Premium Laundromat Chain</h1>
          <p className="text-xl mb-8 text-white/90">Experience the future of laundry across Los Angeles</p>
          <Link to="/locations">
            <Button size="lg" className="bg-white text-primary hover:bg-primary-light hover:text-primary font-semibold">
              Find your location
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-primary mb-2">Why Choose LA Laundry</h2>
          <p className="text-center text-gray-600 mb-12">Experience the difference in our premium services and facilities</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="w-8 h-8" />} 
              title="24/7 Service"
              description="Round-the-clock service availability"
            />
            <FeatureCard 
              icon={<Wifi className="w-8 h-8" />} 
              title="Free WiFi"
              description="Stay connected while you wait"
            />
            <FeatureCard 
              icon={<CreditCard className="w-8 h-8" />} 
              title="Easy Payment"
              description="Multiple payment options available"
            />
            <FeatureCard 
              icon={<Leaf className="w-8 h-8" />} 
              title="Eco-Friendly"
              description="Sustainable cleaning solutions"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />} 
              title="Secured"
              description="Safe and secure environment"
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8" />} 
              title="Premium Service"
              description="Quality guaranteed service"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-primary-light/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-primary mb-2">Our Services</h2>
          <p className="text-center text-gray-600 mb-12">Professional laundry services tailored to your needs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<img src="/lovable-uploads/wash-fold-pink.svg" alt="Wash & Fold" className="w-12 h-12" />}
              title="Wash & Fold"
              description="Professional washing, drying, and folding service"
              price="From $2.50/lb"
            />
            <ServiceCard
              icon={<Timer className="w-12 h-12 text-brand-pink" />}
              title="Wash & Iron"
              description="Complete laundry service with professional pressing"
              price="From $3.50/lb"
            />
            <ServiceCard
              icon={<Star className="w-12 h-12 text-brand-pink" />}
              title="Dry Cleaning"
              description="Expert dry cleaning for delicate garments"
              price="From $6.00/item"
            />
            <ServiceCard
              icon={<Clock className="w-12 h-12 text-brand-pink" />}
              title="Express Service"
              description="Same-day service for urgent laundry needs"
              price="50% surcharge"
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="bg-brand-pink text-white hover:bg-brand-pink/90 border-none">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-primary mb-2">Find your Location</h2>
          <p className="text-gray-600 mb-12">Search through our premium laundry locations across Los Angeles</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {locations.map((location) => (
              <Link
                key={location}
                to={`/locations?city=${location}`}
                className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm text-primary font-medium"
              >
                {location}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white rounded-lg p-6 text-center shadow-lg card-hover border border-gray-100">
    <div className="w-16 h-16 mx-auto mb-4 bg-brand-pink/10 rounded-lg flex items-center justify-center text-brand-pink">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary font-display">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ServiceCard = ({ icon, title, description, price }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  price: string;
}) => (
  <div className="bg-white rounded-lg p-6 text-center shadow-lg card-hover border border-gray-100">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary font-display">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="inline-block bg-brand-pink/10 text-brand-pink px-4 py-1 rounded-full text-sm font-medium">
      {price}
    </span>
  </div>
);

// Location data
const locations = [
  "Beverly Hills",
  "Brentwood",
  "Calabasas",
  "Century City",
  "Culver City",
  "El Segundo",
  "Encino",
  "Glendale",
  "Granada Hills",
  "Hawthorne",
  "Hermosa Beach",
  "Inglewood",
  "Los Angeles",
  "Larchmont",
  "Manhattan Beach",
  "North Hollywood",
  "Northridge",
  "Pacific Palisades",
  "Palms",
  "Playa Del Rey",
  "Porter Ranch",
  "Rancho Park",
  "Redondo Beach",
  "Santa Monica",
  "Sherman Oaks",
  "Studio City",
  "Sunland",
  "Sylmar",
  "Tarzana",
  "Toluca Lake",
  "Torrance",
  "Van Nuys",
  "Venice",
  "West Hollywood",
  "West Los Angeles",
  "Westchester",
  "Westwood",
  "Woodland Hills"
];

export default Index;