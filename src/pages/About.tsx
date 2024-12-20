import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Users, Leaf, Timer } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-primary-light">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              About LA Laundry
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Since 2015, LA Laundry has been the trusted name in premium laundry services across Los
              Angeles, delivering quality, convenience, and reliability to our valued customers.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-primary mb-4">Our Story</h2>
                <p className="text-gray-700">
                  Founded with a mission to revolutionize the laundry experience in Los Angeles, 
                  we've grown from a single location to multiple facilities across the city and 
                  continue to serve thousands of satisfied customers.
                </p>
                <p className="text-gray-700 mt-4">
                  We're committed to excellence in quality service while maintaining 
                  eco-friendly practices and providing the best possible service to our community.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/dac8a9b8-5670-4a10-802d-7146f31ebb36.png" 
                  alt="LA Laundry Machines" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Users className="w-8 h-8 text-brand-pink" />}
                title="Customer First"
                description="We pride in exceptional service and complete customer satisfaction"
              />
              <FeatureCard
                icon={<Timer className="w-8 h-8 text-brand-pink" />}
                title="Quality Service"
                description="Premium equipment and efficient service for your garments"
              />
              <FeatureCard
                icon={<Leaf className="w-8 h-8 text-brand-pink" />}
                title="Eco-Friendly"
                description="Committed to sustainable and eco-conscious practices"
              />
              <FeatureCard
                icon={<Building2 className="w-8 h-8 text-brand-pink" />}
                title="50+ Years"
                description="Serving the Los Angeles community with pride"
              />
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="rounded-xl gradient-bg p-12 text-center text-white">
              <h2 className="text-3xl font-display font-bold mb-4">Join Our Family</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                Experience the LA Laundry difference today. Visit one of our locations and discover why
                we're Los Angeles' most trusted laundry service.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Find a Location
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default About;