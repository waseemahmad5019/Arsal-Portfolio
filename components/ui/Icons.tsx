import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Heart({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20s-7-4.35-7-9.5A3.9 3.9 0 0 1 12 7.8 3.9 3.9 0 0 1 19 10.5c0 5.15-7 9.5-7 9.5z" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.6l6 3.4-6 3.4V8.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Palette(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.9 0-1.4-1.2-1.8-1.2-2.8 0-.8.7-1.3 1.6-1.3H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z" />
      <circle cx="8.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.6" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v11" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 0 0 5.6 5.6l1.4-2 4 1.5v3A2 2 0 0 1 18 19C10.8 18.6 5.4 13.2 5 6a2 2 0 0 1 1.5-2.5z" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4H6.5A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
    </svg>
  );
}

export function Drag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18" />
      <path d="M8 6.5L12 3l4 3.5" />
      <path d="M8 17.5L12 21l4-3.5" />
      <path d="M3 12h18" />
      <path d="M6.5 8L3 12l3.5 4" />
      <path d="M17.5 8L21 12l-3.5 4" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}
