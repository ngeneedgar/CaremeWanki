// HOW TO ADD REAL LISTINGS:
// 1. Add photo to /public/images/listings/[address-slug].jpg
// 2. Add a new object to the array below with streetAddress, fullAddress, and image path
// 3. Remove the placeholder entries once real listings are provided

export interface Listing {
  id: string;
  streetAddress: string;
  fullAddress: string;
  image: string;
  highlight?: boolean;
}

// TEMP SAMPLE DATA — replace with real addresses/photos once Careme sends them. Do not deploy to production with these placeholder addresses.
export const listings: Listing[] = [
  {
    id: '1',
    streetAddress: '2nd St NW',
    fullAddress: '2nd St NW, Washington, DC 20011',
    image: '/images/listings/sample-1.jpg',
  },
  {
    id: '2',
    streetAddress: '3615 Amber Way',
    fullAddress: '3615 Amber Way, Aberdeen, MD 21001',
    image: '/images/listings/sample-2.jpg',
  },
  {
    id: '3',
    streetAddress: '5108 Sharon Rd',
    fullAddress: '5108 Sharon Rd, Temple Hills, MD',
    image: '/images/listings/sample-3.jpg',
    highlight: true,
  },
];
