// src/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Byggflow</div>

      <nav className="sidebar-nav">
        <NavLink to="/" end>📊 Dashboard</NavLink>
        <NavLink to="/projects">📁 Projects</NavLink>
        <NavLink to="/documents">📂 Documents</NavLink>
        <NavLink to="/hse">🚧 HSE</NavLink>
        <NavLink to="/logistics">🚚 Logistics</NavLink>
        <NavLink to="/photos">📷 Photos</NavLink>
        <NavLink to="/reports">📈 Reports</NavLink>
      </nav>

      <div className="sidebar-section">Administration</div>
      <nav className="sidebar-nav">
        <NavLink to="/users">👤 Users</NavLink>
        <NavLink to="/roles">🔐 Roles & Permissions</NavLink>
        <NavLink to="/settings">⚙️ Settings</NavLink>
      </nav>
    </aside>
  );
}
