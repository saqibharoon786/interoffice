import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { catalog } from "@/lib/catalog";
import { addDummyProduct } from "@/lib/shop-products";

export const Route = createFileRoute("/_authenticated/admin/products/new")({ component: NewProduct });

function NewProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState(catalog[0]?.slug ?? "home");
  const subs = catalog.find((c) => c.slug === category)?.subs ?? [];
  const [sub, setSub] = useState(subs[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("READY TO SHIP");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!file) return setError("Product ki picture select karein.");
    setBusy(true);
    try {
      await addDummyProduct({
        name: name.trim(),
        price: Number(price),
        status,
        category_slug: category,
        sub_slug: sub,
        description: description.trim() || null,
        file,
      });
      await queryClient.invalidateQueries({ queryKey: ["db-products"] });
      navigate({ to: "/admin/products" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Product save nahi hua.");
      setBusy(false);
    }
  }

  return (
    <>
      <div className="admin-head"><h1>Upload Product</h1></div>
      <form className="admin-card admin-form" onSubmit={onSubmit}>
        <div className="admin-form-grid">
          <label>Category
            <select value={category} onChange={(e) => { setCategory(e.target.value); setSub(catalog.find((c) => c.slug === e.target.value)?.subs[0]?.slug ?? ""); }}>
              {catalog.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
            </select>
          </label>
          <label>Subcategory
            <select value={sub} onChange={(e) => setSub(e.target.value)}>
              {subs.map((s) => <option key={s.slug} value={s.slug}>{s.label}</option>)}
            </select>
          </label>
          <label className="admin-span">Product name<input required maxLength={150} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aria Executive Chair" /></label>
          <label>Price (Rs.)<input required type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="25000" /></label>
          <label>Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>READY TO SHIP</option><option>PRE-ORDER</option><option>LIMITED EDITION</option>
            </select>
          </label>
          <label className="admin-span">Description (optional)<textarea rows={3} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
          <label className="admin-span admin-upload">Picture
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0] ?? null; setFile(f); setPreview(f ? URL.createObjectURL(f) : null); }} />
            {preview && <img src={preview} alt="Preview" />}
          </label>
        </div>
        {error && <p className="auth-message">{error}</p>}
        <button className="admin-btn" type="submit" disabled={busy}>{busy ? "Saving..." : "Save product"}</button>
      </form>
    </>
  );
}
