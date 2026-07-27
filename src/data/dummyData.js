// Shared dummy data for the MVP dashboard

export const FORECAST_DATA = [
  { day: 1,  date: 'Aug 01', balance: 84320, inflow: 0,     outflow: 2100  },
  { day: 2,  date: 'Aug 02', balance: 82220, inflow: 0,     outflow: 2000  },
  { day: 3,  date: 'Aug 03', balance: 80220, inflow: 5000,  outflow: 8200  },
  { day: 4,  date: 'Aug 04', balance: 77020, inflow: 0,     outflow: 3200  },
  { day: 5,  date: 'Aug 05', balance: 75820, inflow: 12000, outflow: 1200  },
  { day: 6,  date: 'Aug 06', balance: 86620, inflow: 0,     outflow: 1800  },
  { day: 7,  date: 'Aug 07', balance: 84820, inflow: 0,     outflow: 2100  },
  { day: 8,  date: 'Aug 08', balance: 82720, inflow: 0,     outflow: 2100  },
  { day: 9,  date: 'Aug 09', balance: 80620, inflow: 7000,  outflow: 1200  },
  { day: 10, date: 'Aug 10', balance: 86420, inflow: 0,     outflow: 2200  },
  { day: 11, date: 'Aug 11', balance: 84220, inflow: 0,     outflow: 2200  },
  { day: 12, date: 'Aug 12', balance: 82020, inflow: 3500,  outflow: 1800  },
  { day: 13, date: 'Aug 13', balance: 83720, inflow: 0,     outflow: 2300  },
  { day: 14, date: 'Aug 14', balance: 81420, inflow: 0,     outflow: 2300  },
  { day: 15, date: 'Aug 15', balance: 79120, inflow: 0,     outflow: 17500 }, // Payroll
  { day: 16, date: 'Aug 16', balance: 61620, inflow: 9000,  outflow: 1800  },
  { day: 17, date: 'Aug 17', balance: 68820, inflow: 0,     outflow: 2000  },
  { day: 18, date: 'Aug 18', balance: 66820, inflow: 0,     outflow: 2000  },
  { day: 19, date: 'Aug 19', balance: 64820, inflow: 4500,  outflow: 1500  },
  { day: 20, date: 'Aug 20', balance: 67820, inflow: 0,     outflow: 2400  },
  { day: 21, date: 'Aug 21', balance: 65420, inflow: 0,     outflow: 2400  },
  { day: 22, date: 'Aug 22', balance: 63020, inflow: 0,     outflow: 1900  },
  { day: 23, date: 'Aug 23', balance: 61120, inflow: 0,     outflow: 1900  },
  { day: 24, date: 'Aug 24', balance: 59220, inflow: 2000,  outflow: 1700  },
  { day: 25, date: 'Aug 25', balance: 59520, inflow: 0,     outflow: 17500 }, // Payroll
  { day: 26, date: 'Aug 26', balance: 42020, inflow: 15000, outflow: 1600  },
  { day: 27, date: 'Aug 27', balance: 55420, inflow: 0,     outflow: 1800  },
  { day: 28, date: 'Aug 28', balance: 53620, inflow: 0,     outflow: 1800  },
  { day: 29, date: 'Aug 29', balance: 51820, inflow: 8000,  outflow: 2200  },
  { day: 30, date: 'Aug 30', balance: 57620, inflow: 0,     outflow: 2200  },
]

export const SAFETY_THRESHOLD = 35000

export const ALERTS = [
  {
    id: 1,
    severity: 'crimson',
    category: 'PAYROLL RISK',
    title: 'Payroll shortfall projected in 7 days',
    insight: 'Current trajectory places Aug 15 payroll at risk. Acme Corp invoice ($5K) is 12 days overdue.',
    actions: ['Draft Reminder', 'View Invoice'],
  },
  {
    id: 2,
    severity: 'amber',
    category: 'UNPAID INVOICE',
    title: 'Stark Industries: $3,000 overdue (5 days)',
    insight: 'Client historical delay avg is 8 days. Adjusted collection expected Aug 14 — borderline safe.',
    actions: ['Send Reminder', 'Snooze'],
  },
  {
    id: 3,
    severity: 'amber',
    category: 'SUBSCRIPTION LEAK',
    title: 'Figma charge 2.4× above baseline',
    insight: 'Z-score = 2.7. Price increased from $45 to $108/mo. Likely plan auto-upgrade in July billing.',
    actions: ['Review Charge', 'Dismiss'],
  },
  {
    id: 4,
    severity: 'emerald',
    category: 'CASH INFLOW',
    title: 'Client "Nova Ltd" paid $12,000 early',
    insight: 'Received 3 days ahead of adjusted due date. Positive runway impact: +4 days safety buffer.',
    actions: ['View Details'],
  },
  {
    id: 5,
    severity: 'indigo',
    category: 'AI INSIGHT',
    title: 'Recurring SaaS spend up 18% MoM',
    insight: 'Three vendor charges show upward drift over 90 days. Recommend audit before next billing cycle.',
    actions: ['Run Audit', 'Dismiss'],
  },
]
