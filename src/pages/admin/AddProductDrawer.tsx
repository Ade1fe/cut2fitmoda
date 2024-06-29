
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Button, useDisclosure } from '@chakra-ui/react';
import AddProductPage from '../../components/AddProductPage';




const AddProductDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const btnRef = React.useRef()
  return (
    <>
      <Button shadow='md' bg='transparent' _hover={{shadow: "base"}} onClick={onOpen}>
       Add Product
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={['md', 'lg']}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a new product</DrawerHeader>

          <DrawerBody>
         <AddProductPage />
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddProductDrawer;
