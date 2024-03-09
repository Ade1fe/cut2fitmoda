
// import { Box, Flex, Spacer, Link, IconButton, useDisclosure } from '@chakra-ui/react';
// import { CgClose } from 'react-icons/cg';
// import { FaHamburger } from 'react-icons/fa';

// const Navbar = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box bg="white" color="black" py="4" px="10" position="fixed" w='full' top="0" zIndex="999">
//       <Flex alignItems="center" justifyContent="space-between">
//         <Box>
//           <Link href="#" fontSize="xl" fontWeight="bold">Your Brand</Link>
//         </Box>
//         <Spacer />
//         <Box display={{ base: 'none', md: 'block' }}>
//           <Link href="#" mr="8">Home</Link>
//           <Link href="#" mr="8">Products</Link>
//           <Link href="#" mr="8">About</Link>
//           <Link href="#">Contact</Link>
//         </Box>
//         <IconButton
//           display={{ base: 'block', md: 'none' }}
//           aria-label="Toggle navigation"
//           icon={isOpen ? <CgClose /> : <FaHamburger />}
//           onClick={isOpen ? onClose : onOpen}
//         />
//       </Flex>
//       {isOpen && (
//         <Box mt="4" display={{ base: 'block', md: 'none' }}>
//           <Link href="#" display="block" mb="2">Home</Link>
//           <Link href="#" display="block" mb="2">Products</Link>
//           <Link href="#" display="block" mb="2">About</Link>
//           <Link href="#" display="block">Contact</Link>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Navbar;
























import { Box, Flex, Spacer, Link, IconButton, useDisclosure } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { FaHamburger } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" color="black" className='sub-titles' width='full' h={["60px", '70px', '80px']} py="4"  position="fixed" w='full' top="0" zIndex="999">
      <Flex alignItems="center" px="10" justifyContent="space-between">
        <Box fontSize={['x-large', 'xx-large']} className='logo'>
          <Link href="#"  fontWeight="bold">CUT2FIT-MODA</Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }} fontSize={['md','lg',]} fontWeight='600'>
          <Link href="#" mr="8">Home</Link>
          <Link href="#" mr="8">Products</Link>
          <Link href="#" mr="8">About</Link>
          <Link href="#">Contact</Link>
        </Box>
        <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose  size='24' /> : <FaHamburger   size='20'/>}
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
          <Link href="#" display="block" mb="4">About</Link>
          <Link href="#" display="block">Contact</Link>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Navbar;
