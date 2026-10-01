import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderLogin } from "@/components/header-login";
import { HeaderSocial } from "@/components/header-social";
import { Button } from "@/components/ui/button";

const weddingHref = "https://interwood.pk/collections/wedding-packages";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState(0);

  function closeMenu() {
    setMenuOpen(false);
    setOpenCategory(null);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { closeMenu(); setSearchOpen(false); }
    };
    const onResize = () => { if (window.innerWidth > 980) closeMenu(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const header = document.querySelector(".site-header");
    if (header) setDrawerTop(header.getBoundingClientRect().bottom);
  }, [menuOpen]);

  return (
    <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="brand-row">
        <button type="button" className="burger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <BrandLogo />
        <div className="mobile-actions">
          <a className="header-icon-link" href="https://interwood.pk/cart" aria-label="Cart"><ShoppingCart size={20} /></a>
        </div>
      </div>

      <div className="navigation-row">
        <nav className="category-nav" aria-label="Main navigation">
          <a href={weddingHref} className="featured-nav">Wedding Packages</a>
          {catalog.map((category) => (
            <div className={`nav-category ${openCategory === category.label ? "nav-category-open" : ""}`} key={category.slug} onMouseEnter={() => setOpenCategory(category.label)} onMouseLeave={() => setOpenCategory(null)}>
              <Button variant="navCategory" aria-expanded={openCategory === category.label} aria-label={`${category.label} menu`} onClick={() => setOpenCategory(openCategory === category.label ? null : category.label)}>
                {category.label}<ChevronDown size={12} strokeWidth={1.7} />
              </Button>
              {openCategory === category.label && (
                <div className={`nav-dropdown ${category.subs.length > 7 ? "nav-dropdown-wide" : ""}`}>
                  <Link className="nav-dropdown-all" to="/category/$" params={{ _splat: category.slug }}>Shop all {category.label} <ChevronRight size={15} /></Link>
                  {category.subs.map((sub) => <Link to="/category/$" params={{ _splat: `${category.slug}/${sub.slug}` }} key={sub.slug}>{sub.label}</Link>)}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="desktop-actions">
          <HeaderSocial />
          <Button variant="headerIcon" size="icon" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search /></Button>
          <HeaderLogin />
          <a className="header-icon-link cart-link" href="https://interwood.pk/cart" aria-label="Cart"><ShoppingCart size={20} strokeWidth={1.35} /><span>0</span></a>
        </div>
      </div>

      {searchOpen && (
        <form className="search-panel" action="https://interwood.pk/search" method="get">
          <input name="q" aria-label="Search products" placeholder="Search products..." autoFocus />
          <Button variant="headerIcon" size="icon" aria-label="Submit search" type="submit"><Search /></Button>
          <Button variant="headerIcon" size="icon" aria-label="Close search" type="button" onClick={() => setSearchOpen(false)}><X /></Button>
        </form>
      )}

      {menuOpen && (
        <div className="mobile-drawer" style={{ top: drawerTop }} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) closeMenu(); }}>
          <form className="drawer-search" action="https://interwood.pk/search" method="get">
            <input name="q" aria-label="Search products" placeholder="Search products..." />
            <button type="submit" aria-label="Submit search"><Search size={18} /></button>
          </form>
          <div className="drawer-login"><HeaderLogin /></div>
          <a className="drawer-link drawer-featured" href={weddingHref}>Wedding Packages</a>
          {catalog.map((category) => (
            <div className="drawer-group" key={category.slug}>
              <button type="button" className="drawer-link" aria-expanded={openCategory === category.label} onClick={() => setOpenCategory(openCategory === category.label ? null : category.label)}>
                {category.label}<ChevronDown size={16} />
              </button>
              {openCategory === category.label && (
                <div className="drawer-sub">
                  <Link to="/category/$" params={{ _splat: category.slug }}>Shop all {category.label}</Link>
                  {category.subs.map((sub) => <Link to="/category/$" params={{ _splat: `${category.slug}/${sub.slug}` }} key={sub.slug}>{sub.label}</Link>)}
                </div>
              )}
            </div>
          ))}
          <div className="drawer-footer">
            <HeaderSocial />
            <a className="drawer-cart" href="https://interwood.pk/cart"><ShoppingCart size={18} /> Cart</a>
          </div>
        </div>
      )}
    </header>
  );
}
