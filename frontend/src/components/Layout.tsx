import React from 'react';
import Header from './Header';
import NavBar from './NavBar';

const Layout: React.FC = ({ children }) => (
  <>
    <NavBar />
    <Header />
    {children}
  </>
);

export default Layout;
