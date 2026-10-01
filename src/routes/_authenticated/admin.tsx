import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Package, PlusCircle, Store, Tags } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { clearDummySession } from "@/lib/dummy-auth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Inter Office" },
      { name: "description", content: "Manage Inter Office products and categories." },
      { property: "og:title", content: "Admin Panel | Inter Office" },
      { property: "og:description", content: "Manage Inter Office products and categories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    clearDummySession();
    navigate({ to: "/auth", replace: true });
  }

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Products", icon: Package, exact: true },
    { to: "/admin/products/new", label: "Upload Product", icon: PlusCircle, exact: true },
    { to: "/admin/categories", label: "Categories", icon: Tags, exact: true },
  ] as const;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <BrandLogo className="admin-logo" />
        <nav>
          {links.map(({ to, label, icon: Icon, exact }) => (
            <Link key={to} to={to} activeOptions={{ exact }} activeProps={{ className: "admin-link admin-link-active" }} inactiveProps={{ className: "admin-link" }}>
              <Icon size={17} /> {label}
            </Link>
          ))}
          <Link to="/" className="admin-link"><Store size={17} /> View Website</Link>
        </nav>
        <div className="admin-user">
          <span>{user.email}</span>
          <button onClick={signOut} className="admin-link"><LogOut size={17} /> Logout</button>
        </div>
      </aside>
      <section className="admin-main">
        <Outlet />
      </section>
    </div>
  );
}
