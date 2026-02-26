export interface Package {
  id: string;
  title: string;
  destination: string;
  price: number;
  days: number;
  nights: number;
  image: string;
  rating: number;
  reviews: number;
  inclusions: string[];
  itinerary: { day: number; activity: string }[];
  hotel: { name: string; rating: number; description: string };
}

export const POPULAR_PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Majestic Swiss Alps Adventure',
    destination: 'Switzerland',
    price: 2499,
    days: 7,
    nights: 6,
    image: 'https://picsum.photos/seed/swiss/800/600',
    rating: 4.9,
    reviews: 128,
    inclusions: ['Luxury Hotel', 'Daily Breakfast', 'Mountain Train Pass', 'Guided Tours'],
    itinerary: [
      { day: 1, activity: 'Arrival in Zurich & Transfer to Lucerne' },
      { day: 2, activity: 'Mount Pilatus Golden Round Trip' },
      { day: 3, activity: 'Interlaken Exploration' },
      { day: 4, activity: 'Jungfraujoch - Top of Europe' },
      { day: 5, activity: 'Zermatt & Matterhorn Views' },
      { day: 6, activity: 'Glacier Express Scenic Train' },
      { day: 7, activity: 'Departure from Zurich' }
    ],
    hotel: {
      name: 'Grand Alpine Resort',
      rating: 5,
      description: 'A premium 5-star resort with panoramic views of the Eiger North Face.'
    }
  },
  {
    id: '2',
    title: 'Tropical Bali Paradise Escape',
    destination: 'Indonesia',
    price: 1299,
    days: 6,
    nights: 5,
    image: 'https://picsum.photos/seed/bali/800/600',
    rating: 4.8,
    reviews: 256,
    inclusions: ['Private Villa', 'Spa Treatment', 'Airport Transfers', 'Island Hopping'],
    itinerary: [
      { day: 1, activity: 'Arrival in Denpasar & Ubud Transfer' },
      { day: 2, activity: 'Tegalalang Rice Terrace & Swing' },
      { day: 3, activity: 'Sacred Monkey Forest & Ubud Market' },
      { day: 4, activity: 'Nusa Penida Day Trip' },
      { day: 5, activity: 'Seminyak Beach Sunset & Dinner' },
      { day: 6, activity: 'Departure' }
    ],
    hotel: {
      name: 'Ubud Sanctuary Villa',
      rating: 4,
      description: 'Private pool villas nestled in the lush greenery of Ubud.'
    }
  },
  {
    id: '3',
    title: 'Historic Wonders of Greece',
    destination: 'Greece',
    price: 1899,
    days: 8,
    nights: 7,
    image: 'https://picsum.photos/seed/greece/800/600',
    rating: 4.7,
    reviews: 94,
    inclusions: ['Boutique Hotels', 'Ferry Tickets', 'Acropolis Tour', 'Wine Tasting'],
    itinerary: [
      { day: 1, activity: 'Arrival in Athens' },
      { day: 2, activity: 'Acropolis & Parthenon Guided Tour' },
      { day: 3, activity: 'Ferry to Mykonos' },
      { day: 4, activity: 'Mykonos Beach Day' },
      { day: 5, activity: 'Ferry to Santorini' },
      { day: 6, activity: 'Oia Sunset & Caldera Hike' },
      { day: 7, activity: 'Santorini Wine Tour' },
      { day: 8, activity: 'Departure from Santorini' }
    ],
    hotel: {
      name: 'Aegean View Suites',
      rating: 5,
      description: 'Cliffside suites with breathtaking views of the Santorini caldera.'
    }
  }
];

export const DESTINATIONS = [
  { name: 'Paris', country: 'France', image: 'https://picsum.photos/seed/paris/400/500' },
  { name: 'Tokyo', country: 'Japan', image: 'https://picsum.photos/seed/tokyo/400/500' },
  { name: 'New York', country: 'USA', image: 'https://picsum.photos/seed/nyc/400/500' },
  { name: 'Rome', country: 'Italy', image: 'https://picsum.photos/seed/rome/400/500' },
  { name: 'Dubai', country: 'UAE', image: 'https://picsum.photos/seed/dubai/400/500' },
  { name: 'Sydney', country: 'Australia', image: 'https://picsum.photos/seed/sydney/400/500' },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    location: 'London, UK',
    text: 'GlobalLY made our honeymoon absolutely perfect. Every detail was handled with care, and the Swiss Alps package was breathtaking!',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    text: 'The Bali escape was exactly what I needed. The itinerary was well-balanced between adventure and relaxation. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    name: 'Elena Rodriguez',
    location: 'Madrid, Spain',
    text: 'Professional service and amazing value. The Greece tour was a dream come true. I will definitely book my next trip with GlobalLY.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];
