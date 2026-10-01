// Product names, prices and images were sourced from public furniture listings.
import image00 from "@/assets/products/product-00.png.asset.json";
import image01 from "@/assets/products/product-01.png.asset.json";
import image02 from "@/assets/products/product-02.jpg.asset.json";
import image03 from "@/assets/products/product-03.png.asset.json";
import image04 from "@/assets/products/product-04.webp.asset.json";
import image05 from "@/assets/products/product-05.png.asset.json";
import image06 from "@/assets/products/product-06.png.asset.json";
import image07 from "@/assets/products/product-07.png.asset.json";
import image08 from "@/assets/products/product-08.png.asset.json";
import image09 from "@/assets/products/product-09.png.asset.json";
import image10 from "@/assets/products/product-10.jpg.asset.json";
import image11 from "@/assets/products/product-11.jpg.asset.json";
import image12 from "@/assets/products/product-12.jpg.asset.json";
import image13 from "@/assets/products/product-13.jpg.asset.json";
import image14 from "@/assets/products/product-14.jpg.asset.json";
import image15 from "@/assets/products/product-15.jpg.asset.json";
import image16 from "@/assets/products/product-16.jpg.asset.json";
import image17 from "@/assets/products/product-17.jpg.asset.json";
import image18 from "@/assets/products/product-18.jpg.asset.json";
import image19 from "@/assets/products/product-19.png.asset.json";
import image20 from "@/assets/products/product-20.png.asset.json";
import image21 from "@/assets/products/product-21.jpg.asset.json";
import image22 from "@/assets/products/product-22.webp.asset.json";
import image23 from "@/assets/products/product-23.png.asset.json";
import image24 from "@/assets/products/product-24.webp.asset.json";
import image25 from "@/assets/products/product-25.webp.asset.json";
import image26 from "@/assets/products/product-26.webp.asset.json";
import image27 from "@/assets/products/product-27.png.asset.json";
import image28 from "@/assets/products/product-28.png.asset.json";
import image29 from "@/assets/products/product-29.png.asset.json";
import image30 from "@/assets/products/product-30.webp.asset.json";

export type CatalogProduct = { name: string; price: number; handle: string; status: string; image: string };

export const products: CatalogProduct[] = [
  {"name": "Aura King Size Bed", "price": 230500, "handle": "aura-king-bed", "status": "READY TO SHIP", image: image00.url },
  {"name": "Romano King Size Bed", "price": 228000, "handle": "romano-king-bed", "status": "READY TO SHIP", image: image01.url },
  {"name": "Bella King Size Bed", "price": 142000, "handle": "bella-bed", "status": "PRE-ORDER", image: image02.url },
  {"name": "Kav King Bed Set (Bed, Bed Side Tables, Dresser, Mirror)", "price": 215000, "handle": "kav-bed-set-towel-dark-beige", "status": "LIMITED EDITION", image: image03.url },
  {"name": "Valen 2.0 King Size Bed Set", "price": 170500, "handle": "valen-2-0-bed-set", "status": "READY TO SHIP", image: image04.url },
  {"name": "Sienna King Size Bed", "price": 272000, "handle": "sienna-king-size-bed-off-white-headboard", "status": "PRE-ORDER", image: image05.url },
  {"name": "Como Dining Chair", "price": 12750, "handle": "como-dining-chair", "status": "PRE-ORDER", image: image06.url },
  {"name": "Como Extendable Dining Table", "price": 96000, "handle": "como-dining-table", "status": "READY TO SHIP", image: image07.url },
  {"name": "Como Sofa Chair", "price": 47500, "handle": "como-sofa-chair", "status": "PRE-ORDER", image: image08.url },
  {"name": "Como Media Unit", "price": 60000, "handle": "como-media-unit", "status": "READY TO SHIP", image: image09.url },
  {"name": "Patio Side Table", "price": 18000, "handle": "patio-side-table-category", "status": "READY TO SHIP", image: image10.url },
  {"name": "Patio Center Table", "price": 39000, "handle": "patio-center-table", "status": "READY TO SHIP", image: image11.url },
  {"name": "Patio Stool", "price": 48000, "handle": "patio-stool", "status": "LIMITED EDITION", image: image12.url },
  {"name": "Patio Tea Trolley", "price": 54000, "handle": "patio-tea-trolley", "status": "LIMITED EDITION", image: image13.url },
  {"name": "Erin Accent Table", "price": 25000, "handle": "erin-accent-table", "status": "READY TO SHIP", image: image14.url },
  {"name": "Erin Side Table", "price": 39000, "handle": "erin-side-table", "status": "READY TO SHIP", image: image15.url },
  {"name": "Erin Sofa", "price": 83000, "handle": "erin-sofa", "status": "READY TO SHIP", image: image16.url },
  {"name": "Erin Extendable Dinning Table (6-8 Person)", "price": 116000, "handle": "erin-extendable-dinning-table-6-8-person", "status": "READY TO SHIP", image: image17.url },
  {"name": "Willow Nest Of Tables", "price": 19000, "handle": "willow-nest-of-table", "status": "LIMITED EDITION", image: image18.url },
  {"name": "Callisto Nested Table", "price": 14000, "handle": "callisto-nested-tabl", "status": "PRE-ORDER", image: image19.url },
  {"name": "Callisto TV Unit", "price": 23000, "handle": "callisto-tv-unit", "status": "READY TO SHIP", image: image20.url },
  {"name": "Callisto Computer Table", "price": 26000, "handle": "callisto-computer-table", "status": "PRE-ORDER", image: image21.url },
  {"name": "Aria Manager Chair", "price": 26000, "handle": "aria-manager-chair", "status": "READY TO SHIP", image: image22.url },
  {"name": "Mentor Study Chair (Without Tablet Arm)", "price": 24500, "handle": "mentor-study-chair-without-tablet-arm", "status": "READY TO SHIP", image: image23.url },
  {"name": "Ariel 2.0 Side Table", "price": 22500, "handle": "ariel-2-0-side-table", "status": "READY TO SHIP", image: image24.url },
  {"name": "Fusion 3.0 Center Table", "price": 37000, "handle": "fusion-3-0-center-table", "status": "READY TO SHIP", image: image25.url },
  {"name": "Fusion 3.0 Tv Unit", "price": 60000, "handle": "fusion-3-0-tv-unit", "status": "READY TO SHIP", image: image26.url },
  {"name": "Como King Size Bed", "price": 144500, "handle": "como-king-size-bed", "status": "READY TO SHIP", image: image27.url },
  {"name": "Como Dresser", "price": 56000, "handle": "como-dresser", "status": "PRE-ORDER", image: image28.url },
  {"name": "Como Bed Side Table", "price": 26200, "handle": "como-bed-side", "status": "PRE-ORDER", image: image29.url },
  {"name": "Como Mirror", "price": 22750, "handle": "como-mirror", "status": "READY TO SHIP", image: image30.url },
];
