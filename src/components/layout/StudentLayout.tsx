import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { MobileNav } from '../common/MobileNav';

export const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Desktop / Tablet Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
