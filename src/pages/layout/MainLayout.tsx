import React, { ReactNode } from 'react';
import { Box } from "@chakra-ui/react";
import { Advert, Footer, Navbar, WhatsApp } from "../../components";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      <Footer />
      <WhatsApp />
     <Advert />
    </Box>
  );
};

export default MainLayout;
