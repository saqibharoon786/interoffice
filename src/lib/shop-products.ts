// Dummy products live only in this browser. Nothing is sent to a database or backend.
import { products } from "@/lib/products";

const STORAGE_KEY = "interwood-dummy-products";

export type DbProduct = {
  id: string;
  name: string;
  price: number;
  status: string;
  category_slug: string;
  sub_slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  image: string | null;
};

export type NewDummyProduct = {
  name: string;
  price: number;
  status: string;
  category_slug: string;
  sub_slug: string;
  description: string | null;
  file: File;
};

const seed: DbProduct[] = [
  productFromCatalog(0, "home", "bed"),
  productFromCatalog(22, "office", "executive-chair"),
  productFromCatalog(16, "home", "sofa"),
];

function productFromCatalog(index: number, category: string, sub: string): DbProduct {
  const item = products[index];
  return {
    id: `dummy-seed-${index}`,
    name: item.name,
    price: item.price,
    status: item.status,
    category_slug: category,
    sub_slug: sub,
    description: "Dummy product. Sirf is browser mein saved hai.",
    image_url: item.image,
    image: item.image,
    created_at: new Date(Date.now() - index * 86_400_000).toISOString(),
  };
}

function readAll(): DbProduct[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as DbProduct[];
    if (!Array.isArray(parsed)) return seed;
    return refreshStoredImages(parsed);
  } catch {
    return seed;
  }
}

function writeAll(rows: DbProduct[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

function refreshStoredImages(rows: DbProduct[]): DbProduct[] {
  let changed = false;
  const next = rows.map((row) => {
    const broken = !row.image || row.image.startsWith("/__l5e");
    if (!broken) return row;
    const match = products.find((item) => item.name === row.name);
    if (!match) return row;
    changed = true;
    return { ...row, image: match.image, image_url: match.image };
  });
  if (changed) writeAll(next);
  return next;
}

export async function fetchDbProducts(filter?: { category?: string; sub?: string | null }): Promise<DbProduct[]> {
  return readAll().filter((product) => {
    if (filter?.category && product.category_slug !== filter.category) return false;
    if (filter?.sub && product.sub_slug !== filter.sub) return false;
    return true;
  });
}

export async function addDummyProduct(input: NewDummyProduct): Promise<void> {
  const image = await fileToDataUrl(input.file);
  const product: DbProduct = {
    id: crypto.randomUUID(),
    name: input.name,
    price: input.price,
    status: input.status,
    category_slug: input.category_slug,
    sub_slug: input.sub_slug,
    description: input.description,
    image_url: image,
    image,
    created_at: new Date().toISOString(),
  };
  try {
    writeAll([product, ...readAll()]);
  } catch {
    throw new Error("Picture bohot bari hai. Chhoti image try karein.");
  }
}

export async function deleteDummyProduct(id: string): Promise<void> {
  writeAll(readAll().filter((product) => product.id !== id));
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Picture read nahi hui."));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 900;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => reject(new Error("Yeh picture use nahi ho sakti."));
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
