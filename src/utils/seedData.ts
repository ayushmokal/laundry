import { supabase } from "@/integrations/supabase/client";

const seedLocations = async () => {
  const locations = [
    {
      name: "Beverly Hills Premium Laundry",
      description: "Experience luxury laundry services in the heart of Beverly Hills. Our state-of-the-art facility offers premium washing and dry cleaning services with a focus on designer garments and delicate fabrics. Enjoy our comfortable waiting area with complimentary coffee and Wi-Fi.",
      address: "432 N Beverly Dr, Beverly Hills, CA 90210",
      hours: "Monday: 7:00 AM - 9:00 PM,Tuesday: 7:00 AM - 9:00 PM,Wednesday: 7:00 AM - 9:00 PM,Thursday: 7:00 AM - 9:00 PM,Friday: 7:00 AM - 9:00 PM,Saturday: 8:00 AM - 7:00 PM,Sunday: 9:00 AM - 6:00 PM",
      contact_phone: "(310) 555-0123",
      contact_email: "info@beverlyhillslaundry.com",
      image_url: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop",
      amenities: ["Premium Detergents", "Free WiFi", "Luxury Waiting Area", "Express Service", "Designer Garment Care", "Eco-Friendly Options"],
    },
    {
      name: "Santa Monica Beach Laundromat",
      description: "Just steps from the beach, our modern laundromat combines convenience with coastal charm. We offer self-service and drop-off options, perfect for locals and tourists alike. Our facility uses energy-efficient machines and eco-friendly products.",
      address: "1234 Ocean Ave, Santa Monica, CA 90401",
      hours: "Monday: 6:00 AM - 10:00 PM,Tuesday: 6:00 AM - 10:00 PM,Wednesday: 6:00 AM - 10:00 PM,Thursday: 6:00 AM - 10:00 PM,Friday: 6:00 AM - 10:00 PM,Saturday: 7:00 AM - 9:00 PM,Sunday: 7:00 AM - 9:00 PM",
      contact_phone: "(310) 555-0456",
      contact_email: "info@santamonicalaundry.com",
      image_url: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=2070&auto=format&fit=crop",
      amenities: ["Beach View", "Self-Service", "Drop-off Service", "Energy-Efficient Machines", "Surfboard Storage", "Outdoor Drying"],
    },
    {
      name: "Downtown LA Express Cleaners",
      description: "Located in the bustling heart of DTLA, we provide fast and professional dry cleaning and laundry services for busy professionals. Our 24/7 locker system allows for convenient pickup and drop-off any time of day.",
      address: "567 S Spring St, Los Angeles, CA 90013",
      hours: "Monday: 24 Hours,Tuesday: 24 Hours,Wednesday: 24 Hours,Thursday: 24 Hours,Friday: 24 Hours,Saturday: 24 Hours,Sunday: 24 Hours",
      contact_phone: "(213) 555-0789",
      contact_email: "service@dtlacleaners.com",
      image_url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=2070&auto=format&fit=crop",
      amenities: ["24/7 Access", "Smart Lockers", "Same-Day Service", "Business Attire Specialist", "Mobile App", "Loyalty Program"],
    }
  ];

  for (const location of locations) {
    const { error } = await supabase
      .from("locations")
      .insert([location]);
    
    if (error) {
      console.error("Error inserting location:", error);
    }
  }
};

const seedBlogs = async () => {
  const blogs = [
    {
      title: "The Art of Caring for Luxury Fabrics",
      content: `Luxury fabrics require special care and attention to maintain their quality and longevity. In this comprehensive guide, we'll explore the best practices for caring for your high-end garments.

When it comes to designer clothing and delicate fabrics, proper care is essential. Different materials require different approaches, and understanding these nuances can help preserve your valuable pieces for years to come.

Silk Care:
- Always check the care label first
- Use cold water and gentle detergents
- Hand wash or use the delicate cycle
- Never wring or twist silk garments
- Lay flat to dry away from direct sunlight

Cashmere Care:
- Hand wash in lukewarm water
- Use specialized wool detergent
- Reshape while damp
- Store folded, never hung
- Use cedar blocks for storage

Designer Denim:
- Wash inside out in cold water
- Avoid frequent washing
- Use specialized denim detergent
- Air dry to prevent shrinkage
- Store properly folded

Remember, investing in proper care techniques and professional services when needed can significantly extend the life of your luxury garments. Visit our Beverly Hills location for expert care and personalized advice for your designer pieces.`,
      author: "admin",
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Sustainable Laundry Practices for a Greener Future",
      content: `As we become more environmentally conscious, it's crucial to adopt sustainable laundry practices. Here's how you can make your laundry routine more eco-friendly while maintaining excellent results.

Water Conservation:
- Use full loads whenever possible
- Choose water-efficient machines
- Collect and reuse greywater where appropriate
- Fix any leaks promptly
- Use cold water when possible

Energy Efficiency:
- Opt for energy-efficient appliances
- Use cold water cycles when possible
- Clean lint filters regularly
- Air dry when weather permits
- Schedule laundry during off-peak hours

Eco-Friendly Products:
- Choose biodegradable detergents
- Use natural stain removers
- Avoid microplastic-containing products
- Consider DIY alternatives
- Use concentrated products to reduce packaging

At our facilities, we've implemented numerous sustainable practices:
- High-efficiency washing machines
- Solar-powered water heating
- Biodegradable packaging
- Water recycling systems
- Energy-efficient lighting

Join us in our commitment to environmental sustainability. Every small change in your laundry routine can make a significant impact on our planet's future.`,
      author: "admin",
      image_url: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Time-Saving Laundry Tips for Busy Professionals",
      content: `In today's fast-paced world, efficient laundry management is crucial for busy professionals. Here are our top tips for maintaining a pristine wardrobe while maximizing your time.

Organization is Key:
- Sort clothes as you go
- Use separate hampers for different loads
- Keep supplies well-stocked
- Schedule regular laundry days
- Use a laundry service for complex items

Smart Technology Integration:
- Use app-based services
- Schedule pickup and delivery
- Track your laundry status
- Set maintenance reminders
- Utilize smart appliances

Professional Wardrobe Care:
- Invest in quality hangers
- Use garment bags for protection
- Keep an emergency cleaning kit
- Know your fabric care symbols
- Build relationships with trusted cleaners

Our 24/7 services are designed with busy professionals in mind:
- Smart locker system
- Express service options
- Mobile app integration
- Business attire specialists
- Flexible pickup/delivery

Let us help you maintain your professional image while saving your valuable time. Visit our Downtown LA location to learn more about our services tailored for busy professionals.`,
      author: "admin",
      image_url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  for (const blog of blogs) {
    const { error } = await supabase
      .from("blogs")
      .insert([blog]);
    
    if (error) {
      console.error("Error inserting blog:", error);
    }
  }
};

export const seedDatabase = async () => {
  await seedLocations();
  await seedBlogs();
  console.log("Database seeded successfully!");
};