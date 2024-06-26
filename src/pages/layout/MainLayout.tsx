import React, { ReactNode } from 'react';
import { Box } from "@chakra-ui/react";
import { Footer, Navbar } from "../../components";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
