// src/layout/Topbar.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";

export default function Topbar() {
  const location = useLocation();

  const crumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      to: "/" + arr.slice(0, index + 1).join("/")
    }));

  return (
    <header className="topbar">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, ...crumbs]} />

      <div className="topbar-actions">
        <button className="btn-primary">New</button>
      </div>
    </header>
  );
}
