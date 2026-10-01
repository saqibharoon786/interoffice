import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { catalog } from "@/lib/catalog";
import { fetchDbProducts } from "@/lib/shop-products";

export const Route = createFileRoute("/_authenticated/admin/categories")({ component: Categories });

function Categories() {
  const { data = [] } = useQuery({ queryKey: ["db-products"], queryFn: () => fetchDbProducts() });
  return (
    <>
      <div className="admin-head"><h1>Categories</h1></div>
      <p className="admin-note">Yeh wahi categories hain jo website ke dropdown menu mein hain. Counts is browser ke dummy products se aati hain.</p>
      <div className="admin-cat-grid">
        {catalog.map((c) => (
          <div className="admin-card" key={c.slug}>
            <h2><Link to="/category/$" params={{ _splat: c.slug }}>{c.label}</Link></h2>
            <ul>
              {c.subs.map((s) => (
                <li key={s.slug}><span>{s.label}</span><b>{data.filter((p) => p.category_slug === c.slug && p.sub_slug === s.slug).length}</b></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
