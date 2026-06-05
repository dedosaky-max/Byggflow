import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs">
      {items.map((item, i) => (
        <span key={i}>
          <Link to={item.to}>{item.label}</Link>
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}
