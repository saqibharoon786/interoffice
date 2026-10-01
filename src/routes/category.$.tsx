import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home } from "lucide-react";
import { catalog, getCategoryPage, type CatalogSub, type CategoryPageData } from "@/lib/catalog";
import { fetchDbProducts, type DbProduct } from "@/lib/shop-products";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderLogin } from "@/components/header-login";
import { HeaderSocial } from "@/components/header-social";

const money = (amount: number) => `Rs.${amount.toLocaleString("en-PK")}`;

export const Route = createFileRoute("/category/$")({
  loader: ({ params }): CategoryPageData => {
    const page = getCategoryPage(params._splat ?? "");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} | Inter Office` : "Category | Inter Office" },
      { name: "description", content: loaderData?.description ?? "Browse Inter Office furniture collections." },
      { property: "og:title", content: loaderData ? `${loaderData.title} | Inter Office` : "Category | Inter Office" },
      { property: "og:description", content: loaderData?.description ?? "Browse Inter Office furniture collections." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryPage() {
  const page = Route.useLoaderData();
  const siblings = catalog.find((category) => category.slug === page.categorySlug)?.subs ?? [];
  const { data: dbProducts = [] } = useQuery({
    queryKey: ["db-products", page.categorySlug, page.subSlug],
    queryFn: () => fetchDbProducts({ category: page.categorySlug, sub: page.subSlug }),
  });
  const totalCount = page.products.length + dbProducts.length;

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="brand-row">
          <BrandLogo />
          <div className="category-header-tools"><HeaderSocial /><HeaderLogin /></div>
        </div>
      </header>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/"><Home size={13} /> Home</Link>
        <ChevronRight size={13} />
        <Link to="/category/$" params={{ _splat: page.categorySlug }}>{page.categoryLabel}</Link>
        {page.subLabel && (<><ChevronRight size={13} /><span>{page.subLabel}</span></>)}
      </nav>

      <section className="category-hero" aria-labelledby="category-title">
        <h1 id="category-title">{page.title}</h1>
        <p>{page.description}</p>
      </section>

      <section className="category-body" aria-label={`${page.title} products`}>
        <div className="sub-chips" role="navigation" aria-label={`${page.categoryLabel} subcategories`}>
          <Link to="/category/$" params={{ _splat: page.categorySlug }} className={page.subSlug ? "sub-chip" : "sub-chip sub-chip-active"}>
            All {page.categoryLabel}
          </Link>
          {siblings.filter((sub) => sub.slug !== page.subSlug).map((sub: CatalogSub) => (
            <Link key={sub.slug} to="/category/$" params={{ _splat: `${page.categorySlug}/${sub.slug}` }} className="sub-chip">
              {sub.label}
            </Link>
          ))}
        </div>

        <span className="category-count">{totalCount} {totalCount === 1 ? "product" : "products"}</span>

        <div className="products-grid">
          {dbProducts.map((product) => <DbProductCard product={product} key={product.id} />)}
          {page.products.map((product) => (
            <article className="product-item" key={product.handle}>
              <a className="product-image-link" href={`https://interwood.pk/products/${product.handle}`} aria-label={`View ${product.name}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-status">{product.status}</span>
              </a>
              <div className="product-info">
                <a href={`https://interwood.pk/products/${product.handle}`} className="product-name">{product.name}</a>
                <span className="product-price">{money(product.price)}</span>
              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  );
}

function DbProductCard({ product }: { product: DbProduct }) {
  return (
    <article className="product-item">
      <span className="product-image-link" aria-label={product.name}>
        {product.image ? <img src={product.image} alt={product.name} /> : <span className="product-placeholder">No image</span>}
        <span className="product-status">{product.status}</span>
      </span>
      <div className="product-info">
        <span className="product-new">NEW</span>
        <span className="product-name">{product.name}</span>
        <span className="product-price">{money(product.price)}</span>
      </div>
    </article>
  );
}

function CategoryNotFound() {
  return (
    <main className="site-shell category-missing">
      <h1>Category not found</h1>
      <p>The collection you are looking for is not available.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}
