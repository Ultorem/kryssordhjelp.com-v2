import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;