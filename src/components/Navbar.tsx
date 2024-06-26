import { Box, Flex, Spacer, Link, IconButton, useDisclosure, Collapse } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <Box bg="white" color="black" className='sub-titles' width='full' h={["60px", '70px', '80px']} position="fixed" top="0" zIndex="1000">
      <Flex alignItems="center" h='100%' px={['5', '6', '7', '8', "5rem"]} justifyContent="space-between">
        <Box fontSize={['x-large', 'xx-large']} className='logo'>
          <Link href="/" fontWeight="bold">CUT2FIT-MODA</Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }} fontSize={['md', 'lg']} fontWeight='600'>
          <Link href="/" mr="8">Home</Link>
          <Link href="/products" mr="8">Products</Link>
          {isAdmin && <Link href="/admin" mr="8">Admin</Link>}
          {!currentUser && <Link href="/login" mr="8">Login</Link>}
          <Link href="/contact">Contact</Link>
        </Box>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          p='0'
          w='0'
          bg='#b07d62'
          color='white'
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose size='24' /> : <IoMenuSharp size='20' />}
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box bg='white' w='full' px="10" pb='40px' fontSize={['md', 'lg', 'x-large']} fontWeight='600' pt='40px' textAlign='center'>
          <Link href="/" display="block" mb="4">Home</Link>
          <Link href="/products" display="block" mb="4">Products</Link>
          {isAdmin && <Link href="/admin" display="block" mb="4">Admin</Link>}
          {!currentUser && <Link href="/login" display="block" mb="4">Login</Link>}
          <Link href="/contact" display="block">Contact</Link>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
