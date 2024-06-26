
import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
  Spacer,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import {
  collection,
  query,
  where,
  doc,
  writeBatch,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase'; 
import { SlBag } from 'react-icons/sl';

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const currentUser = auth.currentUser;
  let unsubscribe: (() => void) | undefined;

  useEffect(() => {
    if (currentUser) {
      const cartQuery = query(collection(db, 'carts'), where('userId', '==', currentUser.uid));
      unsubscribe = onSnapshot(cartQuery, (snapshot) => {
        const updatedCartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(updatedCartItems);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser]);

  const removeFromCart = async (itemId: string) => {
    try {
      const batch = writeBatch(db);
      const cartItemRef = doc(db, 'carts', itemId);
      batch.delete(cartItemRef);
      await batch.commit();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const batch = writeBatch(db);
      const cartItemRef = doc(db, 'carts', itemId);
      batch.update(cartItemRef, { quantity: newQuantity });
      await batch.commit();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const batch = writeBatch(db);
      cartItems.forEach((item) => {
        const cartItemRef = doc(db, 'carts', item.id);
        batch.delete(cartItemRef);
      });
      await batch.commit();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };


  const shareOnWhatsApp = () => {
    const message = cartItems.map((item) => (
      `Product ID: ${item.id}\nName: ${item.title}\nPrice: ₦${item.price}\nQuantity: ${item.quantity}\nTotal Price: ₦${item.price * item.quantity}\n`
    )).join('\n');
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <Button onClick={onOpen} bg='transparent' _hover={{shadow: "base"}}> <Icon as={SlBag} boxSize={[6, 7]} /> </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={['md', 'lg']}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody p={['2','3']}>
            {cartItems.length === 0 ? (
              <Text>Cart is empty.</Text>
            ) : (
              <VStack align="stretch" spacing={4}>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    bg="white"
                    p={[2, 4]}
                    shadow="md"
                    borderRadius="md"
                  >
                    <Flex align="center" gap={['2','0']} flexDir={['column','row']} fontSize={['xs', 'sm']} >
                      <Image src={item.imageUrl} alt={item.title} height={['auto', '50px']} w={['100px', "50px"]} borderRadius="md" mr={4} />
                      <Text flex="1">{item.title}</Text>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          bg="white"
                          shadow='base'
                          _hover={{bg: "#ddd"}}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                         size="sm"
                         bg="white"
                         shadow='base'
                         _hover={{bg: "#ddd"}}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <Spacer />
                        <Text>{formatPrice(item.price * item.quantity)}</Text>
                        <IconButton
                         bg="white"
                         shadow='base'
                         _hover={{bg: "#ddd"}}
                          aria-label="Remove Item"
                          icon={<FaTrash />}
                          onClick={() => removeFromCart(item.id)}
                          size="sm"
                        />
                      </HStack>
                    </Flex>
                  </Box>
                ))}
                <Box bg="white" mt='2rem' mb='1rem' p={4} shadow="md" borderRadius="md">
                  <Flex align="center">
                    <Text flex="1" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontWeight="bold">{formatPrice(calculateTotal())}</Text>
                  </Flex>
                </Box>
                <Button bg='white' mb='0.5rem' _hover={{ shadow: "base" }} onClick={clearCart}>Clear Cart</Button>
                <Button bg='white' mb='2rem'   _hover={{ shadow: "base" }} onClick={shareOnWhatsApp} leftIcon={<FaWhatsapp />}>
                  Checkout on WhatsApp
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
