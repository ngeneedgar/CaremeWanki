export interface Listing {
  id: string;
  streetAddress: string;
  fullAddress: string;
  image: string;
  images: string[];
  zillowUrl: string;
  highlight?: boolean;
}

// Exactly the 3 real listings directly from the user's Zillow specifications
// with authentic multi-photo galleries per property
export const listings: Listing[] = [
  {
    id: '37165492_zpid',
    streetAddress: '7502 Nevis Rd',
    fullAddress: '7502 Nevis Rd, Bethesda, MD 20817',
    image: '/images/listings/nevis-rd/photo-1.webp',
    images: [
      '/images/listings/nevis-rd/photo-1.webp',
      '/images/listings/nevis-rd/photo-2.webp',
      '/images/listings/nevis-rd/photo-3.webp',
      '/images/listings/nevis-rd/photo-4.webp',
      '/images/listings/nevis-rd/photo-5.webp',
      '/images/listings/nevis-rd/photo-6.webp',
    ],
    zillowUrl: 'https://www.zillow.com/homedetails/7502-Nevis-Rd-Bethesda-MD-20817/37165492_zpid/',
    highlight: false,
  },
  {
    id: '37170602_zpid',
    streetAddress: '5015 Elm St',
    fullAddress: '5015 Elm St, Bethesda, MD 20814',
    image: '/images/listings/elm-st/photo-1.webp',
    images: [
      '/images/listings/elm-st/photo-1.webp',
      '/images/listings/elm-st/photo-2.webp',
      '/images/listings/elm-st/photo-3.webp',
      '/images/listings/elm-st/photo-4.webp',
      '/images/listings/elm-st/photo-5.webp',
      '/images/listings/elm-st/photo-6.webp',
    ],
    zillowUrl: 'https://www.zillow.com/homedetails/5015-Elm-St-Bethesda-MD-20814/37170602_zpid/',
    highlight: true,
  },
  {
    id: '122043176_zpid',
    streetAddress: '1302 Scotts Run Rd',
    fullAddress: '1302 Scotts Run Rd, McLean, VA 22102',
    image: '/images/listings/scotts-run-rd/photo-1.webp',
    images: [
      '/images/listings/scotts-run-rd/photo-1.webp',
      '/images/listings/scotts-run-rd/photo-2.webp',
      '/images/listings/scotts-run-rd/photo-3.webp',
      '/images/listings/scotts-run-rd/photo-4.webp',
      '/images/listings/scotts-run-rd/photo-5.webp',
      '/images/listings/scotts-run-rd/photo-6.webp',
    ],
    zillowUrl: 'https://www.zillow.com/homedetails/1302-Scotts-Run-Rd-Mc-Lean-VA-22102/122043176_zpid/',
    highlight: false,
  },
];
