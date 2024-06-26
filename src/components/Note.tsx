import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { CgMenuGridR } from 'react-icons/cg';

const Note: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}  bg='transparent' _hover={{shadow: "base"}}>
  <Icon as={CgMenuGridR} boxSize={[6, 7]} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={['md', 'lg']}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
          Must Read
          </DrawerHeader>
          <DrawerBody>
            <Box p="4">
              <Heading size="md" mb="2">
                Why WhatsApp Checkout?
              </Heading>
              <Text mb="4">
                We've chosen WhatsApp for checkout to provide you with a more
                personalized and direct shopping experience. Through WhatsApp,
                we can assist you in finalizing your purchase, answer any
                questions you may have, and ensure a smooth transaction.
              </Text>
              <Text>
                To proceed with your order, simply click the "Checkout on
                WhatsApp" button in your cart. We look forward to serving you!
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Note;
