import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { catalog } from "@/lib/catalog";
import { fetchDbProducts } from "@/lib/shop-products";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Dashboard });

const money = (amount: number) => `Rs.${amount.toLocaleString("en-PK")}`;

function Dashboard() {
  const { data = [], isLoading } = useQuery({ queryKey: ["db-products"], queryFn: () => fetchDbProducts() });
  const subCount = catalog.reduce((sum, c) => sum + c.subs.length, 0);
  const total = data.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <div className="admin-head"><h1>Dashboard</h1><Link to="/admin/products/new" className="admin-btn">+ Upload Product</Link></div>
      <div className="admin-stats">
        <div className="admin-card"><span>Uploaded products</span><strong>{isLoading ? "…" : data.length}</strong></div>
        <div className="admin-card"><span>Categories</span><strong>{catalog.length}</strong></div>
        <div className="admin-card"><span>Subcategories</span><strong>{subCount}</strong></div>
        <div className="admin-card"><span>Total stock value</span><strong>{money(total)}</strong></div>
      </div>
      <div className="admin-card">
        <h2>Products per category</h2>
        <ul className="admin-bars">
          {catalog.map((c) => {
            const count = data.filter((p) => p.category_slug === c.slug).length;
            return <li key={c.slug}><span>{c.label}</span><div><i style={{ width: `${data.length ? (count / data.length) * 100 : 0}%` }} /></div><b>{count}</b></li>;
          })}
        </ul>
      </div>
      <div className="admin-card">
        <h2>Recently uploaded</h2>
        {data.length === 0 ? <p>Abhi koi product upload nahi hua. <Link to="/admin/products/new">Pehla product upload karein</Link></p> : (
          <ul className="admin-recent">{data.slice(0, 5).map((p) => <li key={p.id}>{p.image && <img src={p.image} alt="" />}<span>{p.name}</span><b>{money(p.price)}</b></li>)}</ul>
        )}
      </div>
    </>
  );
}
