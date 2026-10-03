interface IconProps {
  className?: string;
}

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function IconDroplet({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" />
    </svg>
  );
}

export function IconMeal({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconPill({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="9" width="16" height="7" rx="3.5" transform="rotate(-35 12 12)" />
      <path d="M9.5 8.5 14.5 15.5" />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3h7l3 3v15H7z" />
      <path d="M14 3v3h3" />
      <path d="M9.5 12h5M9.5 15h5M9.5 9h2" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5h16v11H9l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function IconHistory({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
      <path d="M4 10a8 8 0 0 1 2.3-5" />
    </svg>
  );
}

export function IconReport({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 20V10M11 20V4M17 20v-7" />
    </svg>
  );
}

export function IconCounter({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

export function IconGoogle({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8M12 8v8" opacity="0.001" />
      <path d="M16 12a4 4 0 1 1-1.3-3" />
      <path d="M16 12h-4" />
    </svg>
  );
}

export function IconCompare({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 4v16M16 4v16" />
      <path d="M5 9h6M13 15h6" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

export function IconCloud({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 17.5 17H7Z" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M21 19c0-2.3-1.7-4-4-4.4" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
