import React from 'react';
import Header from './Header';

const Index: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Index;
