// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Text,
//   Button,
//   VStack,
//   HStack,
//   IconButton,
//   Spacer,
//   Flex,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   useDisclosure,
//   Image,
// } from '@chakra-ui/react';
// import { FaTrash } from 'react-icons/fa';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
//   writeBatch, // Import writeBatch for batch operations
// } from 'firebase/firestore';
// import { auth, db } from '../firebase'; // Assuming db is your Firebase Firestore instance

// const CartDrawer = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (currentUser) {
//         try {
//           const cartQuery = query(collection(db, 'carts'), where('userId', '==', currentUser.uid));
//           const cartSnapshot = await getDocs(cartQuery);
//           const fetchedCartItems = cartSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setCartItems(fetchedCartItems);
//         } catch (error) {
//           console.error('Error fetching cart items:', error);
//         }
//       }
//     };

//     fetchCartItems();
//   }, [currentUser]);

//   const removeFromCart = async (itemId: string) => {
//     try {
//       const batch = writeBatch(db); // Create a batch instance
//       const cartItemRef = doc(db, 'carts', itemId);
//       batch.delete(cartItemRef);
//       await batch.commit(); // Commit the batch
//       const updatedCart = cartItems.filter((item) => item.id !== itemId);
//       setCartItems(updatedCart);
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   const updateQuantity = async (itemId: string, newQuantity: number) => {
//     try {
//       const batch = writeBatch(db); // Create a batch instance
//       const cartItemRef = doc(db, 'carts', itemId);
//       batch.update(cartItemRef, { quantity: newQuantity });
//       await batch.commit(); // Commit the batch
//       const updatedCart = cartItems.map((item) =>
//         item.id === itemId ? { ...item, quantity: newQuantity } : item
//       );
//       setCartItems(updatedCart);
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       const batch = writeBatch(db); // Create a batch instance
//       cartItems.forEach((item) => {
//         const cartItemRef = doc(db, 'carts', item.id);
//         batch.delete(cartItemRef);
//       });
//       await batch.commit(); // Commit the batch
//       setCartItems([]);
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
//   };

//   return (
//     <>
//       <Button onClick={onOpen}>Open Cart</Button>
//       <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Your Cart</DrawerHeader>
//           <DrawerBody>
//             {cartItems.length === 0 ? (
//               <Text>Your cart is empty.</Text>
//             ) : (
//               <VStack align="stretch" spacing={4}>
//                 {cartItems.map((item) => (
//                   <Box
//                     key={item.id}
//                     bg="white"
//                     p={4}
//                     shadow="md"
//                     borderRadius="md"
//                   >
//                     <Flex align="center">
//                       <Image src={item.imageUrl} alt={item.title} w="50px" h="50px" borderRadius="md" mr={4} />
//                       <Text flex="1">{item.title}</Text>
//                       <HStack spacing={2}>
//                         <Button
//                           size="sm"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           disabled={item.quantity === 1}
//                         >
//                           -
//                         </Button>
//                         <Text>{item.quantity}</Text>
//                         <Button
//                           size="sm"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                         >
//                           +
//                         </Button>
//                         <Spacer />
//                         <Text>₦{item.price * item.quantity}</Text>
//                         <IconButton
//                           aria-label="Remove Item"
//                           icon={<FaTrash />}
//                           onClick={() => removeFromCart(item.id)}
//                           size="sm"
//                         />
//                       </HStack>
//                     </Flex>
//                   </Box>
//                 ))}
//                 <Box bg="white" p={4} shadow="md" borderRadius="md">
//                   <Flex align="center">
//                     <Text flex="1" fontWeight="bold">
//                       Total
//                     </Text>
//                     <Text fontWeight="bold">₦{calculateTotal()}</Text>
//                   </Flex>
//                 </Box>
//                 <Button onClick={clearCart}>Clear Cart</Button>
//               </VStack>
//             )}
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default CartDrawer;







































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
} from '@chakra-ui/react';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import {
  collection,
  query,
  where,
//   getDocs,
//   deleteDoc,
//   updateDoc,
  doc,
  writeBatch,
  onSnapshot, // Add onSnapshot for real-time updates
} from 'firebase/firestore';
import { db, auth } from '../firebase'; // Assuming db and auth are your Firebase Firestore and auth instances

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

  const shareOnWhatsApp = () => {
    const message = cartItems.map((item) => (
      `Product ID: ${item.id}\nName: ${item.title}\nPrice: ₦${item.price}\nQuantity: ${item.quantity}\nTotal Price: ₦${item.price * item.quantity}\n`
    )).join('\n');
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <Button onClick={onOpen}>Open Cart</Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <VStack align="stretch" spacing={4}>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    bg="white"
                    p={4}
                    shadow="md"
                    borderRadius="md"
                  >
                    <Flex align="center">
                      <Image src={item.imageUrl} alt={item.title} w="50px" h="50px" borderRadius="md" mr={4} />
                      <Text flex="1">{item.title}</Text>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <Spacer />
                        <Text>₦{item.price * item.quantity}</Text>
                        <IconButton
                          aria-label="Remove Item"
                          icon={<FaTrash />}
                          onClick={() => removeFromCart(item.id)}
                          size="sm"
                        />
                      </HStack>
                    </Flex>
                  </Box>
                ))}
                <Box bg="white" p={4} shadow="md" borderRadius="md">
                  <Flex align="center">
                    <Text flex="1" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontWeight="bold">₦{calculateTotal()}</Text>
                  </Flex>
                </Box>
                <Button onClick={clearCart}>Clear Cart</Button>
                <Button onClick={shareOnWhatsApp} leftIcon={<FaWhatsapp />}>
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
