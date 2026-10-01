import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { deleteDummyProduct, fetchDbProducts } from "@/lib/shop-products";

export const Route = createFileRoute("/_authenticated/admin/products/")({ component: ProductsList });

const money = (amount: number) => `Rs.${amount.toLocaleString("en-PK")}`;

function labelFor(cat: string, sub: string) {
  const c = catalog.find((x) => x.slug === cat);
  return `${c?.label ?? cat} › ${c?.subs.find((s) => s.slug === sub)?.label ?? sub}`;
}

function ProductsList() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data = [], isLoading } = useQuery({ queryKey: ["db-products"], queryFn: () => fetchDbProducts() });
  const rows = filter ? data.filter((p) => p.category_slug === filter) : data;

  async function remove(id: string) {
    if (!confirm("Yeh product delete karna hai?")) return;
    await deleteDummyProduct(id);
    await queryClient.invalidateQueries({ queryKey: ["db-products"] });
  }

  return (
    <>
      <div className="admin-head">
        <h1>Products</h1>
        <div className="admin-head-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by category">
            <option value="">All categories</option>
            {catalog.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
          <Link to="/admin/products/new" className="admin-btn">+ Upload Product</Link>
        </div>
      </div>
      <div className="admin-card admin-table-wrap">
        {isLoading ? <p>Loading...</p> : rows.length === 0 ? <p>Koi product nahi mila.</p> : (
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th /></tr></thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>{p.image ? <img src={p.image} alt="" /> : "—"}</td>
                  <td>{p.name}</td>
                  <td>{labelFor(p.category_slug, p.sub_slug)}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.status}</td>
                  <td><button className="admin-icon-btn" aria-label={`Delete ${p.name}`} onClick={() => remove(p.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
