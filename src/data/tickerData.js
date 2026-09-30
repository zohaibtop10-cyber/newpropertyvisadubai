export const DEFAULT_TICKER_ITEMS = [
  {
    id: 'act-1',
    name: 'Arjun Verma',
    action: 'secured Golden Visa',
    timeValue: 4,
    timeUnit: 'hours',
    timeMode: 'ago', // 'ago' | 'left' | 'custom'
    customTimeText: '4 hours ago',
    isActive: true
  },
  {
    id: 'act-2',
    name: 'Mateo López',
    action: 'secured Golden Visa',
    timeValue: 9,
    timeUnit: 'hours',
    timeMode: 'ago',
    customTimeText: '9 hours ago',
    isActive: true
  },
  {
    id: 'act-3',
    name: 'Giulia Rossi',
    action: 'secured Golden Visa',
    timeValue: 1,
    timeUnit: 'days',
    timeMode: 'ago',
    customTimeText: '1 day ago',
    isActive: true
  },
  {
    id: 'act-4',
    name: 'Ethan Williams',
    action: 'secured Golden Visa',
    timeValue: 16,
    timeUnit: 'hours',
    timeMode: 'ago',
    customTimeText: '16 hours ago',
    isActive: true
  },
  {
    id: 'act-5',
    name: 'Sarah Al-Mansoori',
    action: 'secured Family Visa',
    timeValue: 2,
    timeUnit: 'days',
    timeMode: 'ago',
    customTimeText: '2 days ago',
    isActive: true
  },
  {
    id: 'act-6',
    name: 'Golden Visa Fast-Track Discount',
    action: 'Limited Time Legal Advisory Offer',
    timeValue: 3,
    timeUnit: 'days',
    timeMode: 'left', // 3 days left
    customTimeText: '3 days left',
    isActive: true
  }
];

/**
 * Formats time text based on item configuration.
 * e.g., mode='ago' -> "4 hours ago", mode='left' -> "3 days left"
 */
export function formatTickerTime(item) {
  if (!item) return '';
  if (item.timeMode === 'custom' && item.customTimeText) {
    return item.customTimeText;
  }

  const val = item.timeValue ?? 1;
  const unit = item.timeUnit || 'days';
  const mode = item.timeMode || 'ago';

  const pluralUnit = val === 1 ? unit.replace(/s$/, '') : (unit.endsWith('s') ? unit : `${unit}s`);

  if (mode === 'left') {
    return `${val} ${pluralUnit} left`;
  }

  // Default 'ago'
  return `${val} ${pluralUnit} ago`;
}
