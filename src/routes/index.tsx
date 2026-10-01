import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Search, ShoppingCart, Sparkles, X } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderLogin } from "@/components/header-login";
import { HeaderSocial } from "@/components/header-social";
import { Button } from "@/components/ui/button";
import { StorefrontSections } from "@/components/storefront-sections";
import arrivalsDesktop from "@/assets/interwood-05.jpg.asset.json";
import arrivalsMobile from "@/assets/interwood-06.webp.asset.json";
import weddingDesktop from "@/assets/interwood-01.webp.asset.json";
import weddingMobile from "@/assets/interwood-02.webp.asset.json";
import deliveryDesktop from "@/assets/interwood-03.webp.asset.json";
import deliveryMobile from "@/assets/interwood-04.webp.asset.json";
import officeDesktop from "@/assets/interwood-07.webp.asset.json";
import berlinDesktop from "@/assets/interwood-08.webp.asset.json";
import berlinMobile from "@/assets/interwood-09.webp.asset.json";
import collectionDesktop from "@/assets/interwood-10.webp.asset.json";
import collectionMobile from "@/assets/interwood-11.webp.asset.json";

const slides = [
  { title: "New arrivals 2026", desktop: arrivalsDesktop.url, mobile: arrivalsMobile.url, href: "https://interwood.pk/collections/new-arrivals" },
  { title: "Wedding packages", desktop: weddingDesktop.url, mobile: weddingMobile.url, href: "https://interwood.pk/collections/wedding-packages" },
  { title: "Free nationwide delivery", desktop: deliveryDesktop.url, mobile: deliveryMobile.url, href: "https://interwood.pk/" },
  { title: "Office collection", desktop: officeDesktop.url, mobile: officeDesktop.url, href: "https://interwood.pk/collections/office" },
  { title: "Berlin collection", desktop: berlinDesktop.url, mobile: berlinMobile.url, href: "https://interwood.pk/" },
  { title: "Coalesce collection", desktop: collectionDesktop.url, mobile: collectionMobile.url, href: "https://interwood.pk/" },
];

const weddingHref = "https://interwood.pk/collections/wedding-packages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inter Office | Furniture for Every Space" },
      { name: "description", content: "Explore Inter Office furniture collections, wedding packages, and new arrivals." },
      { property: "og:title", content: "Inter Office | Furniture for Every Space" },
      { property: "og:description", content: "Explore Inter Office furniture collections, wedding packages, and new arrivals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dealsOpen, setDealsOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenCategory(null); setMenuOpen(false); setSearchOpen(false); }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <main className="site-shell">
      <div className="announcement">
        <span>Save more this wedding season!</span>
        <a href="https://interwood.pk/collections/wedding-packages">Shop Now!</a>
      </div>

      <header className="site-header">
        <div className="brand-row">
          <Button variant="headerIcon" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <BrandLogo />
          <div className="mobile-actions">
            <Button variant="headerIcon" size="icon" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search /></Button>
            <HeaderLogin />
            <a className="header-icon-link" href="https://interwood.pk/cart" aria-label="Cart"><ShoppingCart size={20} /></a>
          </div>
        </div>
        <div className="navigation-row">
          <nav className={`category-nav ${menuOpen ? "category-nav-open" : ""}`} aria-label="Main navigation">
            <a href={weddingHref} className="featured-nav" key="wedding">Wedding Packages</a>
            {catalog.map((category) => (
              <div className={`nav-category ${openCategory === category.label ? "nav-category-open" : ""}`} key={category.slug} onMouseEnter={() => setOpenCategory(category.label)} onMouseLeave={() => setOpenCategory(null)}>
                <Button variant="navCategory" aria-expanded={openCategory === category.label} aria-label={`${category.label} menu`} onClick={() => setOpenCategory(openCategory === category.label ? null : category.label)}>
                  {category.label}<ChevronDown size={12} strokeWidth={1.7} />
                </Button>
                {openCategory === category.label && <div className={`nav-dropdown ${category.subs.length > 7 ? "nav-dropdown-wide" : ""}`}><Link className="nav-dropdown-all" to="/category/$" params={{ _splat: category.slug }}>Shop all {category.label} <ChevronRight size={15} /></Link>{category.subs.map((sub) => <Link to="/category/$" params={{ _splat: `${category.slug}/${sub.slug}` }} key={sub.slug}>{sub.label}</Link>)}</div>}
              </div>
            ))}
            <HeaderSocial className="nav-social" />
          </nav>
          <div className="desktop-actions">
            <HeaderSocial />
            <Button variant="headerIcon" size="icon" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search /></Button>
            <HeaderLogin />
            <a className="header-icon-link cart-link" href="https://interwood.pk/cart" aria-label="Cart"><ShoppingCart size={20} strokeWidth={1.35} /><span>0</span></a>
          </div>
        </div>
        {searchOpen && <form className="search-panel" action="https://interwood.pk/search" method="get"><input name="q" aria-label="Search products" placeholder="Search products..." autoFocus /><Button variant="headerIcon" size="icon" aria-label="Submit search" type="submit"><Search /></Button><Button variant="headerIcon" size="icon" aria-label="Close search" type="button" onClick={() => setSearchOpen(false)}><X /></Button></form>}
      </header>

      <section className="hero-slider" aria-label="Featured collections" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const endX = event.changedTouches[0]?.clientX; if (touchStart.current === null || endX === undefined) return; const distance = endX - touchStart.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); touchStart.current = null; }}>
        {slides.map((slide, index) => (
          <a href={slide.href} key={slide.title} className={`hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active} tabIndex={index === active ? 0 : -1} aria-label={`Shop ${slide.title}`}>
            <picture><source media="(max-width: 640px)" srcSet={slide.mobile} /><img src={slide.desktop} alt={slide.title} fetchPriority={index === 0 ? "high" : "auto"} /></picture>
          </a>
        ))}
        <Button variant="sliderArrow" size="icon" className="slide-arrow slide-arrow-prev" aria-label="Previous slide" onClick={() => move(-1)}><ChevronLeft /></Button>
        <Button variant="sliderArrow" size="icon" className="slide-arrow slide-arrow-next" aria-label="Next slide" onClick={() => move(1)}><ChevronRight /></Button>
        <div className="slide-dots" aria-label="Choose a slide">
          {slides.map((slide, index) => <Button key={slide.title} variant="sliderDot" size="icon" className={index === active ? "active-dot" : ""} aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)}><span /></Button>)}
        </div>
      </section>

      <div className="delivery-strip" aria-label="Free nationwide delivery"><div className="delivery-track">{Array.from({ length: 8 }, (_, index) => <span key={index}>FREE Nationwide Delivery!</span>)}</div></div>

      <StorefrontSections />

      {dealsOpen && <div className="deals-bubble"><a href="https://interwood.pk/collections/wedding-packages"><span className="deals-sparkle"><Sparkles size={20} fill="currentColor" /></span><span>Shop Deals</span></a><Button variant="dealsClose" size="icon" aria-label="Close shop deals" onClick={() => setDealsOpen(false)}><X size={14} /></Button></div>}
      <a className="whatsapp-link" href="https://interwood.pk/pages/contact-us" aria-label="Contact Inter Office"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg></a>
    </main>
  );
}