import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaHospital,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/patients', icon: FaUserInjured, label: 'Patients' },
    { to: '/doctors', icon: FaUserMd, label: 'Doctors' },
    { to: '/appointments', icon: FaCalendarAlt, label: 'Appointments' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-100">
          <FaHospital className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">IDU Hospital</h1>
          <p className="text-xs text-gray-500 font-medium">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-900 hover:bg-gray-100'
              }`}
            >
              <Icon className={`text-xl ${
                active 
                ? 'text-white' 
                : 'text-gray-900'
              }`} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
          © 2026 IDU Final Project
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <FaHospital className="text-white" />
          </div>
          <span className="font-bold text-gray-900">IDU Hospital</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-30">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar; 