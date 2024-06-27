import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  Box, Flex, Spacer, Link, IconButton, useDisclosure, Collapse,
} from '@chakra-ui/react';
import {  IoMenuSharp } from 'react-icons/io5';

import Note from '../../components/Note';
import { db } from '../../firebase';
import AddProductDrawer from './AddProductDrawer'; 
import { CgClose } from 'react-icons/cg';

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const isAdmin = ['addypearl09@gmail.com', 'anyaadams09@gmail.com'].includes(user.email!);
        setIsAdmin(isAdmin);

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

  const isActive = (path: string) => location.pathname === path ? { color: '#b07d62' } : {};

  return (
    <Box bg="white" color="black" width="full" h={['60px', '70px', '80px']} position="fixed" top="0" zIndex="1000">
      <Flex alignItems="center" h="100%" px={['5', '6', '7', '8', '5rem']} justifyContent="space-between">
        <Box fontSize={['x-large', 'xx-large']} fontWeight="bold" className="logo">
          <Link href="/">CUT2FIT-MODA</Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', lg: 'block' }} fontSize="md" fontWeight="600">
          <Link href="/products" mr="8" style={isActive('/')}>Home</Link>
          {isAdmin && <Link href="/admin" mr="8" style={isActive('/admin')}>Admin</Link>}
          <Link ml="8" _hover={{ textDecoration: "none" }}> <Note /> </Link>
          {!currentUser && <Link href="/login" mr="8" style={isActive('/login')}>Login</Link>}
          <AddProductDrawer isOpen={isDrawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
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
        <Box bg="white" display="grid" w="full" px="10" pb="40px" fontSize={['md', 'lg', 'x-large']} fontWeight="600" pt="40px" textAlign="center">
          <Link href="/products" mb='3' style={isActive('/')}>Home</Link>
          {isAdmin && <Link href="/admin" mb='3' style={isActive('/admin')}>Admin</Link>}
          <Link mb='3' _hover={{ textDecoration: "none" }}> <Note /> </Link>
          {!currentUser && <Link mb='3'  href="/login"  style={isActive('/login')}>Login</Link>}
          <AddProductDrawer isOpen={isDrawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;
