const links = [
  {
    label: "Inter Office on Instagram",
    href: "https://www.instagram.com/",
    className: "social-instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
      </svg>
    ),
  },
  {
    label: "Inter Office on Facebook",
    href: "https://www.facebook.com/",
    className: "social-facebook",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M22.68 0H1.32A1.32 1.32 0 0 0 0 1.32v21.36A1.32 1.32 0 0 0 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.8.71-1.8 1.76v2.31h3.59l-.47 3.62h-3.12V24h6.12A1.32 1.32 0 0 0 24 22.68V1.32A1.32 1.32 0 0 0 22.68 0z" />
      </svg>
    ),
  },
  {
    label: "Inter Office on TikTok",
    href: "https://www.tiktok.com/",
    className: "social-tiktok",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#25F4EE" d="M14.2 3.2v9.9a3.15 3.15 0 1 1-2.7-3.12V7.1a6.4 6.4 0 1 0 5.55 6.34V8.2a7.2 7.2 0 0 0 4.2 1.34V6.7a4.15 4.15 0 0 1-3.9-3.5h-3.15z" />
        <path fill="#FE2C55" d="M15.05 3.2v9.9a3.15 3.15 0 1 1-2.7-3.12V7.1a6.4 6.4 0 1 0 5.55 6.34V8.2a7.2 7.2 0 0 0 4.2 1.34V6.7a4.15 4.15 0 0 1-3.9-3.5H15.05z" />
        <path fill="#fff" d="M14.6 2.4v10.2a2.9 2.9 0 1 1-2.48-2.87V6.2A6.15 6.15 0 1 0 17.2 12V7.55A7.05 7.05 0 0 0 21.3 8.9V6.05a3.95 3.95 0 0 1-3.7-3.65H14.6z" />
      </svg>
    ),
  },
];

export function HeaderSocial({ className = "" }: { className?: string }) {
  return (
    <div className={`header-social ${className}`.trim()}>
      {links.map((item) => (
        <a key={item.label} href={item.href} className={item.className} target="_blank" rel="noreferrer" aria-label={item.label}>
          {item.icon}
        </a>
      ))}
    </div>
  );
}
