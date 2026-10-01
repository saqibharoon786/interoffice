import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getDummySession } from "@/lib/dummy-auth";

export function HeaderLogin() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getDummySession());
  }, []);

  return (
    <Link to={loggedIn ? "/admin" : "/auth"} className="header-login-btn">
      {loggedIn ? "Admin" : "Login"}
    </Link>
  );
}
