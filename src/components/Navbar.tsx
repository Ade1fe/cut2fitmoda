

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Flex, Spacer, Link, IconButton, useDisclosure, Collapse } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';
import { CartDrawer, Note } from '.';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
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
        <Spacer />
        <Box display={{ base: 'none', lg: 'block' }} fontSize={['md']} fontWeight="600">
          <Link href="/products" mr="8" style={isActive('/products')}>All Products</Link>
          <Link href="/items/Native-Wears" mr="8" style={isActive('/items/Native-Wears')}>Native Wears</Link>
          {isAdmin && <Link href="/admin" mr="8" style={isActive('/admin')}>Admin</Link>}
          <Link href="/items/Dresses" mr="8" style={isActive('/items/Dresses')}>Dress</Link>
          <Link href="/items/Accessories" mr="8" style={isActive('/items/Accessories')}>Accessories</Link>
          <Link href="/items/Head-Accessories" style={isActive('/items/Head-Accessories')}>Head Accessories</Link>
          <Link ml="8" _hover={{textDecoration: "none"}}> <CartDrawer /> </Link>
          <Link ml="8" _hover={{textDecoration: "none"}}> <Note /> </Link>
          {!currentUser && <Link href="/login" mr="8" style={isActive('/login')}>Login</Link>}
        </Box>
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          p="0"
          w="0"
          bg="#b07d62"
          color="white"
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose size="24" /> : <IoMenuSharp size="20" />}
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box bg="white" display='grid' w="full" px="10" pb="40px" fontSize={['md', 'lg', 'x-large']} fontWeight="600" pt="40px" textAlign="center">
        <Link href="/products" mr="8" style={isActive('/products')}>All Products</Link>
          <Link href="/items/Native-Wears" mr="8" style={isActive('/items/Native-Wears')}>Native Wears</Link>
          {isAdmin && <Link href="/admin" mr="8" style={isActive('/admin')}>Admin</Link>}
          <Link href="/items/Dresses" mr="8" style={isActive('/items/Dresses')}>Dress</Link>
          <Link href="/items/Accessories" mr="8" style={isActive('/items/Accessories')}>Accessories</Link>
          <Link href="/items/Head-Accessories" style={isActive('/items/Head-Accessories')}>Head Accessories</Link>
          <Link ml="8" _hover={{textDecoration: "none"}}> <CartDrawer /> </Link>
          <Link ml="8" _hover={{textDecoration: "none"}}> <Note /> </Link>
          {!currentUser && <Link href="/login" mr="8" style={isActive('/login')}>Login</Link>}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
