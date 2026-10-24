export interface Property {
  id: string;
  address: string;
  city: string;
  state: 'DC' | 'MD' | 'VA';
  zip: string;
  price: number;
  formattedPrice: string;
  beds: number;
  baths: number;
  sqft: number;
  status: 'Active' | 'Pending' | 'Showcase';
  headline: string;
  description: string;
  features: string[];
  image: string;
  isSample: boolean;
  zillowLink: string;
}

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'bethesda-bradley-hills',
    address: '7412 Bradley Blvd',
    city: 'Bethesda',
    state: 'MD',
    zip: '20817',
    price: 1875000,
    formattedPrice: '$1,875,000',
    beds: 5,
    baths: 4.5,
    sqft: 4850,
    status: 'Showcase',
    headline: 'Modern Transitional in Bradley Hills',
    description:
      'Impeccably detailed estate in Bethesda featuring 10-foot ceilings, chef’s scullery kitchen with custom white-oak cabinetry, expansive bluestone terrace, and an oversized primary sanctuary with dual dressing suites. Minutes to downtown Bethesda and premier regional schools.',
    features: [
      'Chef’s Kitchen with Sub-Zero & Wolf suite',
      'Dual Primary Dressing Closets',
      'Finished Walk-Out Lower Level with Wine Room',
      'Bluestone Covered Patio & Outdoor Fireplace',
    ],
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    isSample: true,
    zillowLink: 'https://www.zillow.com/bethesda-md/',
  },
  {
    id: 'georgetown-historic-row',
    address: '3248 N St NW',
    city: 'Washington',
    state: 'DC',
    zip: '20007',
    price: 2450000,
    formattedPrice: '$2,450,000',
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    status: 'Showcase',
    headline: 'Historic Georgetown Federal with Private Courtyard',
    description:
      'A classic Georgetown residence combining preserved architectural millwork with modern refinements. Features three restored wood-burning fireplaces, refined library, sun-drenched conservatory, and a private English brick courtyard garden.',
    features: [
      'Original Pine Plank Flooring & Restored Crown Molding',
      'Brick Walled Garden Courtyard with Water Feature',
      'Custom Library with Floor-to-Ceiling Shelving',
      'Prime West Village Location off Wisconsin Ave',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    isSample: true,
    zillowLink: 'https://www.zillow.com/washington-dc/',
  },
  {
    id: 'arlington-country-club-hills',
    address: '3910 N Vacation Ln',
    city: 'Arlington',
    state: 'VA',
    zip: '22207',
    price: 1595000,
    formattedPrice: '$1,595,000',
    beds: 4,
    baths: 3.5,
    sqft: 3600,
    status: 'Showcase',
    headline: 'Country Club Hills Craftsman',
    description:
      'Elevated living in North Arlington. Designed with an open entertainer’s floor plan, screened porch overlooking mature hardwoods, private executive office suite, and walk-in wine storage. Convenient proximity to National Landing, Tysons, and D.C.',
    features: [
      'Screened Ipe Wood Porch & Flat Lawn',
      'Dedicated Main-Level Executive Office',
      'Hardwood Floors Throughout Both Levels',
      'Two-Car Garage with EV 240V Charging Station',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    isSample: true,
    zillowLink: 'https://www.zillow.com/arlington-va/',
  },
  {
    id: 'chevychase-somerset',
    address: '4708 Dorset Ave',
    city: 'Chevy Chase',
    state: 'MD',
    zip: '20815',
    price: 2150000,
    formattedPrice: '$2,150,000',
    beds: 5,
    baths: 4,
    sqft: 4100,
    status: 'Showcase',
    headline: 'Somerset Architectural Colonial',
    description:
      'Quintessential Chevy Chase presence. Thoughtfully expanded with sunlit breakfast conservatory, marble culinary island, primary retreat with heated spa flooring, and strollable access to Friendship Heights dining and Metro.',
    features: [
      'Sunlit Breakfast Conservatory',
      'Radiant Heated Bathroom Floors',
      'Strollable to Metro and Somerset Pool',
      'Custom Butler Pantry and Beverage Station',
    ],
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    isSample: true,
    zillowLink: 'https://www.zillow.com/chevy-chase-md/',
  },
];
