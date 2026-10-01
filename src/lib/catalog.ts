// Category catalog with product assignments. `items` are indices into products.
import { products, type CatalogProduct } from "@/lib/products";

export type CatalogSub = { slug: string; label: string; items: number[] };
export type CatalogCategory = { slug: string; label: string; subs: CatalogSub[] };

export const catalog: CatalogCategory[] = [
  {
    slug: "home",
    label: "Home",
    subs: [
      { slug: "coffee-chairs", label: "Coffee Chairs", items: [8, 6, 23] },
      { slug: "coffee-table", label: "Coffee Table", items: [11, 25, 18, 19] },
      { slug: "bedroom-chair", label: "Bedroom Chair", items: [8, 6, 16] },
      { slug: "bed", label: "Bed", items: [0, 1, 2, 3, 4, 5, 27] },
      { slug: "dining-table", label: "Dining Table", items: [7, 17] },
      { slug: "dining-chair", label: "Dining Chair", items: [6, 8] },
      { slug: "sofa", label: "Sofa", items: [16, 8] },
    ],
  },
  {
    slug: "office",
    label: "Office",
    subs: [
      { slug: "executive-chair", label: "Executive Chair", items: [22, 23] },
      { slug: "executive-table", label: "Executive Table", items: [26, 20] },
      { slug: "manager-chair", label: "Manager Chair", items: [22, 23] },
      { slug: "manager-table", label: "Manager Table", items: [20, 26] },
      { slug: "staff-chair", label: "Staff Chair", items: [23, 22] },
      { slug: "staff-table", label: "Staff Table", items: [21, 19] },
      { slug: "computer-table", label: "Computer Table", items: [21, 19, 14] },
      { slug: "computer-chair", label: "Computer Chair", items: [23, 22] },
      { slug: "sofa", label: "Sofa", items: [16, 8] },
      { slug: "centre-table", label: "Centre Table", items: [11, 25, 18, 19] },
      { slug: "bar-stools", label: "Bar Stools", items: [12, 10] },
      { slug: "meeting-table", label: "Meeting Table", items: [17, 7] },
    ],
  },
  {
    slug: "outdoor",
    label: "Outdoor",
    subs: [
      { slug: "dining-chair", label: "Dining Chair", items: [6, 8] },
      { slug: "dining-table", label: "Dining Table", items: [17, 7, 11] },
      { slug: "plastic-chairs-tables", label: "Plastic Chairs & Tables", items: [12, 10, 19] },
      { slug: "lawn-chairs-tables", label: "Lawn Chairs & Tables", items: [10, 11, 13] },
    ],
  },
  {
    slug: "school",
    label: "School",
    subs: [
      { slug: "classroom-chairs-tables", label: "Classroom Chairs & Tables", items: [23, 19, 21] },
      { slug: "lab-chairs-tables", label: "Lab Chairs & Tables", items: [23, 21, 14] },
      { slug: "teacher-chairs-tables", label: "Teacher Chairs & Tables", items: [22, 26] },
    ],
  },
];

export type CategoryPageData = {
  categorySlug: string;
  categoryLabel: string;
  subSlug: string | null;
  subLabel: string | null;
  title: string;
  description: string;
  products: CatalogProduct[];
};

function uniqueItems(indices: number[]): CatalogProduct[] {
  return Array.from(new Set(indices))
    .map((index) => products[index])
    .filter((product): product is CatalogProduct => Boolean(product));
}

/** Resolve "/category/<category>[/<sub>]" splat into page data, or null when unknown. */
export function getCategoryPage(splat: string): CategoryPageData | null {
  const [categorySlug, subSlug] = splat.split("/").filter(Boolean);
  const category = catalog.find((entry) => entry.slug === categorySlug);
  if (!category) return null;

  if (!subSlug) {
    const items = uniqueItems(category.subs.flatMap((sub) => sub.items));
    return {
      categorySlug: category.slug,
      categoryLabel: category.label,
      subSlug: null,
      subLabel: null,
      title: `${category.label} Furniture`,
      description: `Browse the full Inter Office ${category.label} collection — chairs, tables and more.`,
      products: items,
    };
  }

  const sub = category.subs.find((entry) => entry.slug === subSlug);
  if (!sub) return null;
  return {
    categorySlug: category.slug,
    categoryLabel: category.label,
    subSlug: sub.slug,
    subLabel: sub.label,
    title: `${sub.label} — ${category.label}`,
    description: `Shop Inter Office ${sub.label} in the ${category.label} collection.`,
    products: uniqueItems(sub.items),
  };
}
