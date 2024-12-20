import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Timer, Shirt, Sparkles, Clock, Box, Droplet } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />
      
      <main>
        {/* Services Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional laundry and dry cleaning services tailored to your needs. Quality care for all your garments.
          </p>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Shirt className="w-8 h-8" />}
              title="Wash & Fold"
              description="Professional washing, drying, and folding service for your everyday laundry needs"
              price="From $2.50/lb"
            />
            <ServiceCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Wash & Iron"
              description="Complete laundry service including professional pressing and ironing"
              price="From $3.50/lb"
            />
            <ServiceCard
              icon={<Droplet className="w-8 h-8" />}
              title="Dry Cleaning"
              description="Expert dry cleaning for your delicate and special garments"
              price="From $6.00/item"
            />
            <ServiceCard
              icon={<Timer className="w-8 h-8" />}
              title="Express Service"
              description="Same-day service for urgent laundry needs"
              price="50% surcharge"
            />
            <ServiceCard
              icon={<Box className="w-8 h-8" />}
              title="Storage"
              description="Seasonal clothing storage in climate-controlled facilities"
              price="From $30/month"
            />
            <ServiceCard
              icon={<Clock className="w-8 h-8" />}
              title="Stain Removal"
              description="Specialized stain removal service for tough spots and marks"
              price="From $5.00/stain"
            />
          </div>
        </section>

        {/* Special Care Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue text-white p-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">Need Special Care?</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                We offer customized solutions for special garments and unique requirements. Contact us to discuss your specific needs.
              </p>
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-primary-light"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ServiceCard = ({ icon, title, description, price }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-lg card-hover">
    <div className="w-16 h-16 bg-brand-pink/10 rounded-lg flex items-center justify-center text-brand-pink mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-display font-semibold mb-2 text-primary">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="inline-block bg-brand-pink/10 text-brand-pink px-4 py-1 rounded-full text-sm font-medium">
      {price}
    </span>
  </div>
);

export default Services;