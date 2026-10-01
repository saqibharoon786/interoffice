import { Link } from "@tanstack/react-router";

export const brandLogoSrc = "/images/inter-office-logo.png";

export function BrandLogo({ className = "brand-link" }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="Inter Office home">
      <img src={brandLogoSrc} alt="Inter Office" />
    </Link>
  );
}
