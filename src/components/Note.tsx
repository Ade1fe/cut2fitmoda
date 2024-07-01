import React from 'react';
import { Box, Text,
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
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import "../index.css"

const Note: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} bg="transparent" _hover={{ shadow: 'base' }}>
        <Icon as={CgMenuGridR} boxSize={[6, 7]} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={['md', 'lg']}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Must Read</DrawerHeader>
          <DrawerBody color='#949494' fontSize={['sm', 'md']} textAlign='center' className='texts'>
            <Box p="4" mb='2rem'>
              <Text fontWeight='600' className='sub-titles' my='2rem' fontSize={["25px", '30px', '40px', '50px']} mb="2rem" color='black' >Hello</Text>
              <Text mb="4">
                Your one-stop destination for super affordable and trendy fashion. We add new items to our catalogue daily. Quick Fashionista Tip – see something you like? Snag it before it’s gone, things move quickly over here.
                You can message the seller on WhatsApp about the product you want, quantities, and sizes.
              </Text>
              <Text>
                To proceed with your order, simply click the "Checkout on WhatsApp" button in your cart. We look forward to serving you!
              </Text>
            </Box>
            <Box p="4" mb='2rem'>
              <Text className='sub-titles' fontWeight='800' fontSize="md" mb="2" color='black'>Why WhatsApp Checkout?</Text>
              <Text mb="4">
                We've chosen WhatsApp for checkout to provide you with a more personalized and direct shopping experience. Through WhatsApp, we can assist you in finalizing your purchase, answer any questions you may have, and ensure a smooth transaction.
              </Text>
              <Text>
                To proceed with your order, simply click the "Checkout on WhatsApp" button in your cart. We look forward to serving you!
              </Text>
            </Box>
            <Box p="4" mb='2rem'>
              <Text fontSize="md" className='sub-titles' fontWeight='800' mb="2" color='black'>Connect with Us</Text>
              <Box display="flex" gap="3" mt="4" justifyContent='center'>
                <Link to="https://wa.me/2349038257434">
                  <Icon as={FaWhatsapp} boxSize="6" color="green.600" />
                </Link>
                <Link to="https://instagram.com/deife_syntax">
                  <Icon as={FaInstagram} boxSize="6" color="red.600" />
                </Link>
                <Link to="https://web.facebook.com/johanna.adams.3576">
                  <Icon as={FaFacebook} boxSize="6" color="blue.600" />
                </Link>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Note;
