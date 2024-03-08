
import { Box, Flex, Spacer, Link, IconButton, useDisclosure } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { FaHamburger } from 'react-icons/fa';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" color="black" py="4" px="10" position="fixed" w='full' top="0" zIndex="999">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="#" fontSize="xl" fontWeight="bold">Your Brand</Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }}>
          <Link href="#" mr="8">Home</Link>
          <Link href="#" mr="8">Shop</Link>
          <Link href="#" mr="8">About</Link>
          <Link href="#">Contact</Link>
        </Box>
        <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Toggle navigation"
          icon={isOpen ? <CgClose /> : <FaHamburger />}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <Box mt="4" display={{ base: 'block', md: 'none' }}>
          <Link href="#" display="block" mb="2">Home</Link>
          <Link href="#" display="block" mb="2">Shop</Link>
          <Link href="#" display="block" mb="2">About</Link>
          <Link href="#" display="block">Contact</Link>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
