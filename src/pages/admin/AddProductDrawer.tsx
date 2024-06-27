import React from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Box, Button, Icon } from '@chakra-ui/react';
import { FaMarsAndVenus } from 'react-icons/fa6';
import AddProductPage from '../../components/AddProductPage';
import { AddIcon } from '@chakra-ui/icons';

interface AddProductDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <Button onClick={onOpen} bg="transparent" _hover={{ shadow: "base" }}>
        <Icon as={AddIcon} boxSize={[6, 7]} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={['md', 'lg']}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a product</DrawerHeader>
          <DrawerBody p='2' >
            {/* <Box > */}
              <AddProductPage />
            {/* </Box> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddProductDrawer;
