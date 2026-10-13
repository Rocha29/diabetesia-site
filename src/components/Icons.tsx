interface IconProps {
  className?: string;
}

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

type P = IconProps;

export const IconDroplet = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" />
  </svg>
);

export const IconMeal = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10" />
    <path d="M17 21V3c-2.2 1.2-3.5 3.6-3.5 7v3H17" />
  </svg>
);

export const IconPill = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="6" y="7" width="12" height="14" rx="2.5" />
    <path d="M5 3.5h14M12 11v6M9 14h6" />
  </svg>
);

export const IconHeart = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
  </svg>
);

export const IconDocument = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 13h6M10 17h6" />
  </svg>
);

export const IconChat = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="8" width="14" height="11" rx="3" />
    <path d="M12 4v4M9.5 13h.01M14.5 13h.01M10 16h4" />
  </svg>
);

export const IconHistory = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
    <path d="M3 4v4h4M12 8v4l3 2" />
  </svg>
);

export const IconHome = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />
  </svg>
);

export const IconMenu = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconCamera = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconEye = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconLock = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </svg>
);

export const IconKey = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8-8M16 7l2 2M14 9l2 2" />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
    <circle cx="17" cy="9" r="2.3" />
    <path d="M21 19c0-2.3-1.7-4-4-4.4" />
  </svg>
);

export const IconUserX = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M16 8l4 4M20 8l-4 4" />
  </svg>
);

export const IconBell = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20.5h4" />
  </svg>
);

export const IconCalendar = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="5" width="16" height="15" rx="2.5" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </svg>
);

export const IconSparkle = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.5l-1.8-5.8L4.5 10.8 10.2 9z" />
    <path d="M19 3v3M17.5 4.5h3" />
  </svg>
);

export const IconBolt = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" />
  </svg>
);

export const IconLeaf = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
    <path d="M5 19c3-4 6-6.5 9.5-8.5" />
  </svg>
);

export const IconTextSize = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 19 8 6l5 13M4.8 14.5h6.4M14.5 19l3.2-8 3.3 8M15.4 16.8h4.6" />
  </svg>
);

export const IconTable = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M4 10h16M4 15h16M10 10v10" />
  </svg>
);

export const IconChart = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 4v16h16" />
    <path d="m7 15 4-4 3 3 5-6" />
  </svg>
);

export const IconArrowRight = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconChevronLeft = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const IconChevronRight = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const IconPlus = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconInfo = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const IconAndroid = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 11a6 6 0 0 1 12 0v6H6z" />
    <path d="M8 5 6.5 3M16 5l1.5-2M10 8.5h.01M14 8.5h.01M8 17v3M16 17v3" />
  </svg>
);

/** Logo do DiabetesIA (coração com linha de pulso). */
export const LogoMark = ({ className }: P) => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
    <rect width="32" height="32" rx="9" fill="var(--accent-primary)" />
    <path
      d="M16 24.5s-7.4-4.4-7.4-9.7a4.4 4.4 0 0 1 7.4-3.2 4.4 4.4 0 0 1 7.4 3.2c0 5.3-7.4 9.7-7.4 9.7Z"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M9.6 16h2.8l1.5 3 2.3-6 1.8 3h4.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
