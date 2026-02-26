import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Search,
  ArrowRight,
  Clock,
  Hotel,
  Info
} from 'lucide-react';
import { POPULAR_PACKAGES, DESTINATIONS, TESTIMONIALS, type Package } from './constants';
import { cn } from './lib/utils';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [bookingData, setBookingData] = useState({
    destination: '',
    date: '',
    days: 7,
    travelers: 2,
    name: '',
    email: '',
    message: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch('https://formspree.io/f/xykdobnj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...bookingData,
          subject: 'New Booking Request from GlobalLY',
          selectedPackage: selectedPackage?.title || 'None'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setBookingData({
          destination: '',
          date: '',
          days: 7,
          travelers: 2,
          name: '',
          email: '',
          message: ''
        });
        setSelectedPackage(null);
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    try {
      await fetch('https://formspree.io/f/xykdobnj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          subject: 'New Newsletter Subscription'
        })
      });
      alert('Thank you for subscribing!');
      e.currentTarget.reset();
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-travel-orange p-2 rounded-lg">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className={cn(
              "text-2xl font-bold tracking-tighter",
              isScrolled ? "text-travel-blue" : "text-white"
            )}>GlobalLY</span>
          </div>

          {/* Desktop Menu */}
          <div className={cn(
            "hidden md:flex items-center gap-8 font-medium",
            isScrolled ? "text-slate-600" : "text-white/90"
          )}>
            <a href="#home" className="hover:text-travel-orange transition-colors">Home</a>
            <a href="#destinations" className="hover:text-travel-orange transition-colors">Destinations</a>
            <a href="#packages" className="hover:text-travel-orange transition-colors">Packages</a>
            <a href="#about" className="hover:text-travel-orange transition-colors">About</a>
            <a href="#contact" className="hover:text-travel-orange transition-colors">Contact</a>
            <button className="btn-primary py-2 px-6 text-sm">Book Now</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={isScrolled ? "text-slate-900" : "text-white"} /> : <Menu className={isScrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4 text-slate-800"
            >
              <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#destinations" onClick={() => setIsMenuOpen(false)}>Destinations</a>
              <a href="#packages" onClick={() => setIsMenuOpen(false)}>Packages</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <button className="btn-primary w-full">Book Now</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/travel-hero/1920/1080" 
            alt="Travel Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold mb-6 leading-tight"
          >
            Explore the World <br />
            <span className="text-travel-orange italic">Without Limits</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto"
          >
            Curated international travel experiences designed for the modern explorer. 
            Discover hidden gems and iconic landmarks with GlobalLY.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#packages" className="btn-primary flex items-center justify-center gap-2">
              Explore Packages <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#destinations" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-full transition-all border border-white/30 flex items-center justify-center">
              View Destinations
            </a>
          </motion.div>
        </div>

        {/* Quick Search Bar */}
        <div className="absolute bottom-10 left-0 right-0 z-20 px-6 hidden lg:block">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              fetch('https://formspree.io/f/xykdobnj', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, subject: 'Quick Search Lead' })
              });
              alert('Search criteria sent! We will find the best deals for you.');
            }}
            className="max-w-6xl mx-auto glass-card rounded-2xl p-6 flex items-center gap-6"
          >
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Destination</label>
              <div className="flex items-center gap-2">
                <MapPin className="text-travel-orange w-5 h-5" />
                <input name="destination" type="text" placeholder="Where to?" className="bg-transparent border-none focus:ring-0 w-full font-medium" />
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Travel Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="text-travel-orange w-5 h-5" />
                <input name="date" type="date" className="bg-transparent border-none focus:ring-0 w-full font-medium" />
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Travelers</label>
              <div className="flex items-center gap-2">
                <Users className="text-travel-orange w-5 h-5" />
                <select name="travelers" defaultValue="2 Travelers" className="bg-transparent border-none focus:ring-0 w-full font-medium">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-travel-blue text-white p-4 rounded-xl hover:bg-slate-800 transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </form>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-travel-orange font-bold tracking-widest uppercase text-sm">Top Picks</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">Popular Destinations</h2>
            </div>
            <p className="text-slate-500 max-w-md">
              From the romantic streets of Paris to the neon-lit alleys of Tokyo, 
              find your next adventure among our most-loved destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest, idx) => (
              <motion.div 
                key={dest.name}
                whileHover={{ y: -10 }}
                className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-medium text-white/80">{dest.country}</p>
                  <h3 className="text-2xl font-bold">{dest.name}</h3>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                    <ArrowRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section id="packages" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-travel-teal font-bold tracking-widest uppercase text-sm">Best Value</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Featured Tour Packages</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {POPULAR_PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div className="relative h-64">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-travel-blue flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {pkg.days} Days / {pkg.nights} Nights
                  </div>
                  <div className="absolute bottom-4 right-4 bg-travel-orange text-white px-4 py-1 rounded-full text-lg font-bold">
                    ${pkg.price}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-1 text-travel-yellow mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4 fill-current", i >= Math.floor(pkg.rating) && "text-slate-200")} />
                    ))}
                    <span className="text-slate-400 text-xs ml-1">({pkg.reviews} reviews)</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-1">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.inclusions.slice(0, 3).map(inc => (
                      <span key={inc} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded">
                        {inc}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedPackage(pkg)}
                    className="w-full border-2 border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/travel-about/800/1000" 
                alt="About GlobalLY" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 z-20 bg-travel-orange text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold">15+</p>
              <p className="text-sm font-medium opacity-80">Years of Experience</p>
            </div>
            <div className="absolute -top-10 -left-10 z-0 w-64 h-64 bg-travel-teal/10 rounded-full blur-3xl"></div>
          </div>
          
          <div>
            <span className="text-travel-orange font-bold tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Travel with Confidence and Ease</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              GlobalLY was founded on a simple belief: that travel should be transformative, 
              accessible, and perfectly tailored. We don't just book trips; we craft 
              lifelong memories through curated itineraries and local expertise.
            </p>
            
            <div className="space-y-6 mb-10">
              {[
                "Hand-picked premium accommodations",
                "24/7 dedicated travel support",
                "Expert local guides in every city",
                "Sustainable and responsible tourism"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="bg-travel-teal/10 p-1 rounded-full">
                    <CheckCircle2 className="text-travel-teal w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            
            <button className="btn-secondary">Learn More About Us</button>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-24 px-6 bg-travel-blue text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Exclusive Seasonal Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl text-left relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-travel-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">Early Bird</span>
                <h3 className="text-3xl font-bold mb-4">Summer 2026 Pre-Booking</h3>
                <p className="text-white/70 mb-8 max-w-sm">Book your summer getaway 6 months in advance and save up to 25% on all European packages.</p>
                <button className="flex items-center gap-2 font-bold hover:text-travel-orange transition-colors">
                  Claim Offer <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-travel-orange/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-travel-orange/30 transition-colors"></div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl text-left relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-travel-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">Group Deal</span>
                <h3 className="text-3xl font-bold mb-4">The More, The Merrier</h3>
                <p className="text-white/70 mb-8 max-w-sm">Traveling with friends? Groups of 6 or more get a complimentary private city tour and 10% discount.</p>
                <button className="flex items-center gap-2 font-bold hover:text-travel-teal transition-colors">
                  Claim Offer <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-travel-teal/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-travel-teal/30 transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-travel-orange font-bold tracking-widest uppercase text-sm">Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">What Our Travelers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex gap-1 text-travel-yellow mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking Form */}
      <section id="contact" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-travel-blue p-12 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-white/70 mb-12">
                  Fill out the form and our travel experts will get back to you within 24 hours 
                  with a personalized quote and itinerary.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase font-bold">Call Us</p>
                      <p className="font-medium">+1 (800) GLOBAL-LY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase font-bold">Email Us</p>
                      <p className="font-medium">hello@globally.travel</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase font-bold">Visit Us</p>
                      <p className="font-medium">123 Travel Way, Explorer City</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-12">
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-travel-orange transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-travel-orange transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-travel-orange transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div className="lg:w-3/5 p-12">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange" 
                      placeholder="John Doe"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange" 
                      placeholder="john@example.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Destination</label>
                    <select 
                      name="destination"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange"
                      value={bookingData.destination}
                      onChange={(e) => setBookingData({...bookingData, destination: e.target.value})}
                    >
                      <option value="">Select Destination</option>
                      {DESTINATIONS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                      <option value="custom">Other / Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Travel Date</label>
                    <input 
                      type="date" 
                      name="date"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Number of Travelers</label>
                    <input 
                      type="number" 
                      name="travelers"
                      min="1"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange"
                      value={bookingData.travelers}
                      onChange={(e) => setBookingData({...bookingData, travelers: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Duration (Days)</label>
                    <input 
                      type="number" 
                      name="days"
                      min="1"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange"
                      value={bookingData.days}
                      onChange={(e) => setBookingData({...bookingData, days: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Special Requests</label>
                  <textarea 
                    name="message"
                    rows={4}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-travel-orange focus:border-travel-orange" 
                    placeholder="Tell us about your dream trip..."
                    value={bookingData.message}
                    onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className={cn(
                    "btn-primary w-full py-4 text-lg flex items-center justify-center gap-2",
                    formStatus === 'loading' && "opacity-70 cursor-not-allowed",
                    formStatus === 'success' && "bg-emerald-500 hover:bg-emerald-600",
                    formStatus === 'error' && "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {formStatus === 'idle' && "Send Booking Request"}
                  {formStatus === 'loading' && "Sending..."}
                  {formStatus === 'success' && "Request Sent Successfully!"}
                  {formStatus === 'error' && "Error Sending Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-travel-orange p-2 rounded-lg">
                <Plane className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">GlobalLY</span>
            </div>
            <p className="text-slate-400 mb-8">
              Making the world accessible, one journey at a time. Your trusted partner for international travel.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Tour Packages</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Destinations</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Europe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asia Pacific</a></li>
              <li><a href="#" className="hover:text-white transition-colors">North America</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Middle East</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Africa</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-6">Subscribe to get the latest travel deals and inspiration.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input 
                type="email" 
                name="email"
                required
                placeholder="Your email" 
                className="bg-white/10 border-none rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-travel-orange" 
              />
              <button type="submit" className="bg-travel-orange p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <ChevronRight />
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} GlobalLY Travel Agency. All rights reserved.</p>
        </div>
      </footer>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPackage(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPackage(null)}
                className="absolute top-6 right-6 z-10 bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-slate-900 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-auto">
                  <img 
                    src={selectedPackage.image} 
                    alt={selectedPackage.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="lg:w-1/2 p-8 md:p-12">
                  <div className="flex items-center gap-2 text-travel-orange font-bold text-sm uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4" /> {selectedPackage.destination}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{selectedPackage.title}</h2>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg"><Clock className="text-slate-500 w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Duration</p>
                        <p className="font-bold text-slate-700">{selectedPackage.days} Days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg"><Hotel className="text-slate-500 w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Hotel</p>
                        <p className="font-bold text-slate-700">{selectedPackage.hotel.rating} Star</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-travel-teal" /> Package Inclusions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedPackage.inclusions.map(inc => (
                        <div key={inc} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="text-travel-teal w-4 h-4" /> {inc}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-10">
                    <h4 className="font-bold text-slate-900 mb-4">Itinerary Highlights</h4>
                    <div className="space-y-4">
                      {selectedPackage.itinerary.slice(0, 3).map(item => (
                        <div key={item.day} className="flex gap-4">
                          <div className="font-bold text-travel-orange">Day {item.day}</div>
                          <div className="text-sm text-slate-600">{item.activity}</div>
                        </div>
                      ))}
                      <p className="text-xs text-slate-400 italic">+ {selectedPackage.days - 3} more days of adventure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Price per person</p>
                      <p className="text-3xl font-bold text-travel-orange">${selectedPackage.price}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setBookingData({...bookingData, destination: selectedPackage.title});
                        setSelectedPackage(null);
                        document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                      }}
                      className="btn-primary"
                    >
                      Book This Trip
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
