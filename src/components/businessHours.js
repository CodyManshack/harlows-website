// Edit this file to set business hours and day groupings
// Use i18n keys for day labels, and set hours per group

export const businessHours = [
  {
    days: ['wed', 'thu'], // i18n keys for Wednesday, Thursday
    labelKey: 'wedThurs', // i18n key for group label
    hours: '19 – 01'
  },
  {
    days: ['fri'],
    labelKey: 'fri',
    hours: '19 – 01:30'
  },
  {
    days: ['sat'],
    labelKey: 'sat',
    hours: '18 – 01:30'
  },
  {
    days: ['sun'],
    labelKey: 'sun',
    hours: '19 – 00'
  }
]

// Helper to map JS day index (0=Sunday) to i18n key
export const jsDayToKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
