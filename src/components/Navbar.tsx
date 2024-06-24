import { Box, Flex, Spacer, Link, IconButton, useDisclosure } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const MotionBox = motion(Box);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box bg="white" color="black" className='sub-titles' width='full' h={["60px", '70px', '80px']} position="fixed" w='full' top="0" zIndex="999">
      <Flex alignItems="center" h='100%' px={['5','6', '7', '8', "10"]} justifyContent="space-between">
        <Box fontSize={['x-large', 'xx-large']} className='logo'>
          <Link href="/" fontWeight="bold">CUT2FIT-MODA</Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }} fontSize={['md','lg']} fontWeight='600'>
          <Link href="#" mr="8">Home</Link>
          <Link href="#" mr="8">Products</Link>
          {isAdmin && <Link href="/admin" mr="8">Admin</Link>}
          {!currentUser && <Link href="/login" mr="8">Login</Link>}
          <Link href="#">Contact</Link>
        </Box>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          p='0'
          w='0'
          bg='#b07d62'
          color='white'
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose size='24' /> : <IoMenuSharp size='20' />}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      <MotionBox
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, translateY: isOpen ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        mt="0"
        w='full'
        display={{ base: 'block', md: 'none' }}
      >
        <Box bg='white' w='full' px="10" pb='40px' fontSize={['md','lg', 'x-large']} fontWeight='600' pt='40px' textAlign='center'>
          <Link href="#" display="block" mb="4">Home</Link>
          <Link href="#" display="block" mb="4">Products</Link>
          {isAdmin && <Link href="/admin" display="block" mb="4">Admin</Link>}
          {!currentUser && <Link href="/login" display="block" mb="4">Login</Link>}
          <Link href="#" display="block">Contact</Link>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Navbar;
