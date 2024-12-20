import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-primary-light">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have a question? We're here to help! Reach out to us through any of the following channels.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-primary mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-pink text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-display font-bold text-primary mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <ContactInfo icon={<Phone />} title="Phone" content="(213) 555-0123" />
                    <ContactInfo icon={<Mail />} title="Email" content="info@lalaundry.com" />
                    <ContactInfo icon={<MapPin />} title="Address" content="Los Angeles, CA 90012" />
                    <ContactInfo
                      icon={<Clock />}
                      title="Business Hours"
                      content={
                        <>
                          Monday - Friday: 6AM - 10PM<br />
                          Saturday: 7AM - 9PM<br />
                          Sunday: 8AM - 8PM
                        </>
                      }
                    />
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gradient-to-br from-brand-pink to-brand-purple rounded-lg shadow-lg p-8 text-white">
                  <h2 className="text-2xl font-display font-bold mb-6">FAQ</h2>
                  <div className="space-y-4">
                    <FAQItem
                      question="Do you offer pickup and delivery?"
                      answer="Yes, we offer pickup and delivery services to select areas."
                    />
                    <FAQItem
                      question="What are your turnaround times?"
                      answer="Standard service is 24-48 hours. Express service is available."
                    />
                    <FAQItem
                      question="Do you handle special items?"
                      answer="Yes, we specialize in handling delicate and specialty items."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ContactInfo = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <div className="text-brand-pink">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div>
    <h3 className="font-semibold mb-1">{question}</h3>
    <p className="text-white/80">{answer}</p>
  </div>
);

export default Contact;