import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Box,
  Flex,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';
import { CartDrawer, Note } from '.';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const email = user.email;
        if (email === 'addypearl09@gmail.com' || email === 'anyaadams09@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log(userData);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path: string) => {
    const decodedPath = decodeURIComponent(path);
    return location.pathname === decodedPath ? { color: '#b07d62' } : {};
  };

  return (
    <Box bg="white" color="black" className="sub-titles" width="full" h={['60px', '70px', '80px']} position="fixed" top="0" zIndex="1000">
      <Flex alignItems="center" h="100%" px={['5', '6', '7', '8', '5rem']} justifyContent="space-between">
        <Box fontSize={['x-large', 'xx-large']} className="logo">
          <Link href="/" fontWeight="bold">CUT2FIT-MODA</Link>
        </Box>
        <Flex display={{ base: 'none', lg: 'flex' }} fontSize={['md']} fontWeight="600" alignItems='center'>
          <Link href="/products" mr="8" style={isActive('/products')}>All Products</Link>
          <Link href="/items/Native Wears" mr="8" style={isActive('/items/Native Wears')}>Native Wears</Link>
          {isAdmin && <Link href="/admin" mr="8" style={isActive('/admin')}>Admin</Link>}
          <Link href="/items/Dresses" mr="8" style={isActive('/items/Dresses')}>Dress</Link>
          <Link href="/items/Accessories" mr="8" style={isActive('/items/Accessories')}>Accessories</Link>
          <Link href="/items/Head Accessories" style={isActive('/items/Head Accessories')}>Head Accessories</Link>
          {!currentUser && <Link href="/login" ml="8" style={isActive('/login')}>Login</Link>}
          <Link ml="8" _hover={{textDecoration: "none"}}> <CartDrawer /> </Link>
          <Link  _hover={{textDecoration: "none"}}> <Note /> </Link>
        </Flex>
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          p="0"
          w="0"
          bg="#b07d62"
          color="white"
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose size="24" /> : <IoMenuSharp size="20" />}
          onClick={isOpen ? onClose : onOpen}
        />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody display='flex' flexDir='column' gap='4'>
              <Link href="/products" py="2" h="fit-content" style={isActive('/products')}>All Products</Link>
              <Link href="/items/Native Wears" py="2" h="fit-content" style={isActive('/items/Native Wears')}>Native Wears</Link>
              {isAdmin && <Link href="/admin" py="2" h="fit-content" style={isActive('/admin')}>Admin</Link>}
              <Link href="/items/Dresses" py="2" h="fit-content" style={isActive('/items/Dresses')}>Dress</Link>
              <Link href="/items/Accessories" py="2" h="fit-content" style={isActive('/items/Accessories')}>Accessories</Link>
              <Link href="/items/Head-Accessories" py="2" h="fit-content" style={isActive('/items/Head-Accessories')}>Head Accessories</Link>
              <Link py="2" h="fit-content" _hover={{textDecoration: "none"}}> <CartDrawer /> </Link>
              <Link py="2" h="fit-content" _hover={{textDecoration: "none"}}> <Note /> </Link>
              {!currentUser && <Link href="/login" py="2" h="fit-content" style={isActive('/login')}>Login</Link>}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
