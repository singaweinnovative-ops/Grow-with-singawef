import { SOCIAL } from "@/lib/site-content";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sf-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#5851DB" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#sf-ig-grad)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        d="M13.5 21.9v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.9c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02v2.5H7.8v3h2.6v7.6h3.1z"
        fill="#fff"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#0A66C2" />
      <path
        d="M7.6 9.6H4.9V19h2.7V9.6zM6.25 8.4a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM19.1 19h-2.7v-5.1c0-1.22-.44-2.05-1.53-2.05-.84 0-1.34.56-1.56 1.11-.08.2-.1.47-.1.75V19H10.5s.04-8.55 0-9.4h2.7v1.33c.36-.55 1-1.34 2.43-1.34 1.77 0 3.1 1.16 3.1 3.64V19z"
        fill="#fff"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M12 5.5a6.5 6.5 0 0 0-5.6 9.8L5.5 18.5l3.3-.86A6.5 6.5 0 1 0 12 5.5zm0 1.4a5.1 5.1 0 0 1 4.36 7.76l-.16.27.56 2.05-2.1-.55-.26.15A5.1 5.1 0 1 1 12 6.9z"
        fill="#fff"
      />
      <path
        d="M9.9 8.9c-.16-.36-.33-.37-.48-.37h-.4c-.14 0-.37.05-.56.27-.19.21-.74.72-.74 1.76 0 1.04.76 2.04.86 2.18.1.14 1.47 2.32 3.63 3.15 1.8.7 2.16.56 2.55.53.39-.04 1.26-.52 1.44-1.02.18-.5.18-.93.13-1.02-.05-.1-.19-.15-.4-.26-.21-.1-1.26-.62-1.46-.7-.2-.07-.34-.1-.48.1-.14.21-.55.7-.68.84-.12.14-.25.16-.46.05-.21-.1-.9-.33-1.71-1.06-.63-.56-1.06-1.26-1.18-1.47-.12-.21-.01-.32.09-.43.1-.1.21-.25.32-.38.1-.13.14-.21.21-.36.07-.14.04-.27-.02-.38-.05-.1-.48-1.2-.66-1.64z"
        fill="#25D366"
      />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#010101" />
      <g transform="translate(-0.6,0.5)">
        <circle cx="9.6" cy="15.2" r="2.7" fill="#25F4EE" />
        <rect x="12.3" y="5.4" width="2.2" height="9.8" rx="1.1" fill="#25F4EE" />
      </g>
      <g transform="translate(0.6,-0.5)">
        <circle cx="9.6" cy="15.2" r="2.7" fill="#FE2C55" />
        <rect x="12.3" y="5.4" width="2.2" height="9.8" rx="1.1" fill="#FE2C55" />
      </g>
      <circle cx="9.6" cy="15.2" r="2.7" fill="#fff" />
      <rect x="12.3" y="5.4" width="2.2" height="9.8" rx="1.1" fill="#fff" />
      <path
        d="M14.5 5.4c.4 2.15 2 3.7 4.1 3.85v2.25c-1.55 0-3-.5-4.1-1.35v-1.85c1 .55 2.05.85 2.55.9V7.9c-1.3-.35-2.25-1.35-2.55-2.5z"
        fill="#fff"
      />
    </svg>
  );
}

const LINKS: { key: keyof typeof SOCIAL; label: string; Icon: (p: IconProps) => JSX.Element }[] = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex items-center gap-3">
        {LINKS.map(({ key, label, Icon }) => (
          <li key={key}>
            <a
              href={SOCIAL[key]}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`SINGAWE Foundation on ${label}`}
              className="lift block size-9 overflow-hidden rounded-full transition-opacity hover:opacity-90"
            >
              <Icon className="size-9" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
