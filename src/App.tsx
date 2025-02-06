import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Eye,
  Search,
  Clock,
  Globe,
  ChevronRight,
  Lock,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';
import policeCarImage from './assets/police-car.jpg';
import policeMotorcycleImage from './assets/police-motorcycle.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    
    // Create payload for webhook with complete details
    const payload = {
      recipientArray: [formData.email],
      from: "specialistoperations@outlook.com",
      content: `Thank you,\n\n ${formData.name} your message has been logged and someone will be in touch shortly.\n\n\nSPECIALIST OPERATIONS   Pro bono publico`,
      sender: "Specialist Operations",
      subject: formData.name,
      priority: "normal",
      contentType: "text",
      headers: {},
      // Add form details in a structured format
      formDetails: {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        enquiryTime: now.toLocaleString()
      },
      submission_time: {
        iso: now.toISOString(),
        local: now.toLocaleString(),
        timestamp: now.getTime()
      }
    };

    try {
      const response = await fetch('https://hook.eu2.make.com/9e1k18t5r91o8aqrtdfb3ugde5xvabc7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Webhook response:', responseData);
        
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        
        alert('Your consultation request has been submitted successfully.');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again later.');
    }
  };

  const services = [
    {
      icon: Shield,
      title: 'High-Value Asset Transport',
      description: 'Secure logistics and transportation solutions for valuable assets with real-time monitoring, including Jewellery, Precious stones, Bonds, Documents, Art, and much more',
    },
    {
      icon: Users,
      title: 'Executive Protection',
      description: 'Elite personal security details led by former protection operators and intelligence professionals.',
    },
    {
      icon: Eye,
      title: 'Counter-Intelligence',
      description: 'Advanced threat detection and prevention strategies to protect your organization\'s sensitive information.',
    },
    {
      icon: Search,
      title: 'Private Investigations',
      description: 'Discreet, thorough investigations conducted by experienced professionals with law enforcement backgrounds.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-gold">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'nav-blur py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-gold" />
              <span className="ml-2 text-xl font-bold text-white">SPECIALIST OPERATIONS</span>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gold hover:text-gold-light"
              >
                {isMenuOpen ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6 text-gold" />}
              </button>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#services" className="text-white hover:text-gold-light transition-colors">Services</a>
                <a href="#about" className="text-white hover:text-gold-light transition-colors">About</a>
                <a href="#testimonials" className="text-white hover:text-gold-light transition-colors">Testimonials</a>
                <a href="#contact" className="bg-white text-black bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-opacity-100 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 nav-blur">
            <a href="#services" className="block px-3 py-2 text-white hover:text-gold-light rounded-md">Services</a>
            <a href="#about" className="block px-3 py-2 text-white hover:text-gold-light rounded-md">About</a>
            <a href="#testimonials" className="block px-3 py-2 text-white hover:text-gold-light rounded-md">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 bg-white text-black hover:bg-opacity-80 rounded-md">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-pattern relative min-h-screen flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
            <span className="hero-text-3d">Specialist Security Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
            Rooted in law enforcement and specialist operations, our security services offer unparalleled protection for corporate leaders, government officials, VIP clients and private individuals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="group border border-gold text-white px-8 py-4 rounded-md hover:border-gold-light hover:text-gold-light transition-colors inline-flex items-center justify-center backdrop-blur-sm">
              Request Consultation <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-gold" />
            </a>
            <a href="#services" className="group border border-gold text-white px-8 py-4 rounded-md hover:border-gold-light hover:text-gold-light transition-colors inline-flex items-center justify-center backdrop-blur-sm">
              Explore Services <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-gold" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 relative overflow-hidden services-background">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card p-8 rounded-lg relative overflow-hidden">
                <service.icon className="h-12 w-12 mb-4 text-gold !text-[#FFD700] !important" style={{color: '#FFD700'}} />
                <h3 className="text-xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-white">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-grid relative py-20 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card p-8 rounded-lg">
              <Clock className="h-8 w-8 text-gold !text-[#FFD700] !important" style={{color: '#FFD700'}} />
              <div>
                <h3 className="text-xl font-bold mb-2 text-gold">24/7 Global Operations</h3>
                <p className="text-black">Round-the-clock security services and rapid response capabilities worldwide.</p>
              </div>
            </div>
            <div className="service-card p-8 rounded-lg">
              <Globe className="h-8 w-8 text-gold !text-[#FFD700] !important" style={{color: '#FFD700'}} />
              <div>
                <h3 className="text-xl font-bold mb-2 text-gold">International Reach</h3>
                <p className="text-black">Operations in over 50 countries with local expertise and global standards.</p>
              </div>
            </div>
            <div className="service-card p-8 rounded-lg">
              <Lock className="h-8 w-8 text-gold !text-[#FFD700] !important" style={{color: '#FFD700'}} />
              <div>
                <h3 className="text-xl font-bold mb-2 text-gold">Advanced Technology</h3>
                <p className="text-black">State-of-the-art security systems and protocols for maximum protection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">Request a Consultation</h2>
          <form onSubmit={handleSubmit} className="contact-form p-8 rounded-lg space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  className="w-full px-4 py-3 bg-navy-800 bg-opacity-50 border border-gold rounded-md focus:border-gold-light focus:ring focus:ring-gold focus:ring-opacity-50 transition-all duration-300 text-white"
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  className="w-full px-4 py-3 bg-navy-800 bg-opacity-50 border border-gold rounded-md focus:border-gold-light focus:ring focus:ring-gold focus:ring-opacity-50 transition-all duration-300 text-white"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-white">Company</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                className="w-full px-4 py-3 bg-navy-800 bg-opacity-50 border border-gold rounded-md focus:border-gold-light focus:ring focus:ring-gold focus:ring-opacity-50 transition-all duration-300 text-white"
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                className="w-full px-4 py-3 bg-navy-800 bg-opacity-50 border border-gold rounded-md focus:border-gold-light focus:ring focus:ring-gold focus:ring-opacity-50 transition-all duration-300 text-white"
                required
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="group border border-gold text-white px-8 py-4 rounded-md hover:border-gold-light hover:text-gold-light transition-colors inline-flex items-center backdrop-blur-sm"
              >
                Submit Request <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-gold" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-gold" />
                <span className="ml-2 text-xl font-bold text-white">SPECIALIST OPERATIONS</span>
              </div>
              <p className="text-white">Pro bono publico</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Contact</h4>
              <p className="text-white">All emails are monitored, once you are in contact a contact number will be supplied.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-white">
                <li>
                  <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                  <p className="text-sm mt-1 text-gray-400">
                    We prioritise the privacy and security of your personal information, ensuring it is collected, used, and protected in compliance with applicable laws. Your data is never shared without consent, except as required by law.
                  </p>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                  <p className="text-sm mt-1 text-gray-400">
                    We conduct due diligence on prospective clients to assess credibility, compliance, and potential risks before engagement. This includes verifying legal standing, financial stability, and reputation to ensure alignment with our standards. We reserve the right to decline partnerships that do not meet our ethical or regulatory criteria.
                  </p>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">Compliance</a>
                  <p className="text-sm mt-1 text-gray-400">
                    Obeying local laws is essential for order, safety, and legal compliance. Regulations vary by region, covering traffic, business, and digital domains like data protection. Staying informed prevents violations and ensures lawful conduct.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white">
            <p>&copy; 2024 Specialist Operations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <img src="/path/to/your/image.jpg" alt="Description" />
    </div>
  );
}

export default App;