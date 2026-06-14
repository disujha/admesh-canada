// Canadian Market Configuration
export const CANADA_CONFIG = {
  currency: {
    code: 'CAD',
    symbol: '$',
    locale: 'en-CA',
  },
  region: {
    code: 'CA',
    name: 'Canada',
    timeZone: 'America/Toronto',
  },
  business: {
    taxRate: 0.13, // HST for most provinces
    phoneNumber: '+1-416-XXX-XXXX',
    email: 'canada@admesh.com',
  },
  firebase: {
    region: 'northamerica-northeast1', // Canadian region
  },
} as const;

export default CANADA_CONFIG;
