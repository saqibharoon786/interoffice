import { useEffect, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { products } from "@/lib/products";
import { fetchDbProducts, type DbProduct } from "@/lib/shop-products";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderSocial } from "@/components/header-social";
import { Button } from "@/components/ui/button";

const money = (amount: number) => `Rs.${amount.toLocaleString("en-PK")}`;

export function StorefrontSections() {
  const [uploaded, setUploaded] = useState<DbProduct[]>([]);

  useEffect(() => {
    fetchDbProducts().then(setUploaded);
  }, []);

  return (
    <>
      <section className="products-section" id="new-arrivals" aria-labelledby="arrivals-title">
        <div className="section-heading">
          <div><span className="section-eyebrow">THE LATEST AT INTER OFFICE</span><h2 id="arrivals-title">New arrivals</h2></div>
          <a className="section-view-link" href="https://interwood.pk/collections/new-arrivals">View all products <ArrowRight size={17} /></a>
        </div>
        <div className="products-grid">
          {uploaded.map((product) => (
            <article className="product-item" key={product.id}>
              <a className="product-image-link" href={`/category/${product.category_slug}/${product.sub_slug}`} aria-label={`View ${product.name}`}>
                {product.image ? <img src={product.image} alt={product.name} /> : <span className="product-placeholder">No image</span>}
                <span className="product-status">{product.status}</span>
              </a>
              <div className="product-info">
                <span className="product-new">NEW</span>
                <a href={`/category/${product.category_slug}/${product.sub_slug}`} className="product-name">{product.name}</a>
                <span className="product-price">{money(product.price)}</span>
              </div>
            </article>
          ))}
          {products.map((product, index) => (
            <article className="product-item" key={`${product.handle}-${index}`}>
              <a className="product-image-link" href={`https://interwood.pk/products/${product.handle}`} aria-label={`View ${product.name}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-status">{product.status}</span>
              </a>
              <div className="product-info">
                <span className="product-new">NEW</span>
                <a href={`https://interwood.pk/products/${product.handle}`} className="product-name">{product.name}</a>
                <span className="product-price">{money(product.price)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="editorial-title">
        <div className="editorial-inner">
          <div className="editorial-copy">
            <span className="editorial-eyebrow">SPACES FOR EVERY STORY</span>
            <h2 id="editorial-title">Make room for<br /><em>what matters.</em></h2>
            <p>Thoughtfully made furniture for the moments that make a house your home.</p>
            <Button variant="editorial" size="lg" asChild><a href="https://interwood.pk/collections/home">Explore the collection <ArrowRight size={18} /></a></Button>
          </div>
          <div className="editorial-gallery" aria-hidden="true">
            <div className="editorial-frame editorial-frame-one"><img src={products[16]!.image} alt="" loading="lazy" /></div>
            <div className="editorial-frame editorial-frame-two"><img src={products[7]!.image} alt="" loading="lazy" /></div>
            <div className="editorial-frame editorial-frame-three"><img src={products[0]!.image} alt="" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <footer className="store-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <BrandLogo />
            <p>Furniture designed for the way you live.</p>
            <HeaderSocial />
          </div>
          <div className="footer-column"><h3>Shop</h3><a href="https://interwood.pk/collections/home">Home</a><a href="https://interwood.pk/collections/office">Office</a><a href="https://interwood.pk/collections/wedding-packages">Wedding Packages</a><a href="https://interwood.pk/collections/new-arrivals">New Arrivals</a></div>
          <div className="footer-column"><h3>Customer care</h3><a href="https://interwood.pk/pages/contact-us">Contact Us</a><a href="https://interwood.pk/pages/about-us">About Us</a><a href="https://interwood.pk/policies/shipping-policy">Shipping Policy</a><a href="https://interwood.pk/policies/refund-policy">Returns & Refunds</a></div>
          <div className="footer-column footer-contact"><h3>Get in touch</h3><a href="https://interwood.pk/pages/contact-us"><MapPin size={17} /> Find a store</a><a href="mailto:info@interoffice.pk"><Mail size={17} /> info@interoffice.pk</a><a href="https://interwood.pk/pages/contact-us"><Phone size={17} /> Contact our team</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Inter Office. All rights reserved.</span><span>Made for living.</span></div>
      </footer>
    </>
  );
}
