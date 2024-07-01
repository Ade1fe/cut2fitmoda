import { Box, Text, Flex, Link, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

const Advert = () => {
  const { onClose } = useDisclosure();
  const [showAd, setShowAd] = useState(true);
  const message = encodeURIComponent("Hello, I want to build a website.");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 6 * 60 * 2000);

    return () => clearTimeout(timer);
  }, [showAd]);

  const handleClose = () => {
    setShowAd(false);
    onClose();
  };

  return (
    <>
      {showAd && (
        <Box
          p={4}
          bg="#f4f4f6"
          borderRadius="10px"
          shadow="md"
          position="fixed"
          bottom={4}
          right={4}
          zIndex={999}
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Need a Website?
            </Text>
            <IconButton
              icon={<MdClose />}
              aria-label="Close advert"
              onClick={handleClose}
              bg="transparent"
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
            />
          </Flex>
          <Text mb={4}>
            Build your website at very low prices! Contact us today via{' '}
            <Link href={`https://wa.me/2349038257434?text=${message}`} color="green.500" isExternal>
              WhatsApp
            </Link>{' '}
            or{' '}
            <Link href="https://instagram.com/deife_syntax" color="red.500" isExternal>
              Instagram
            </Link>{' '}
            to get started.
          </Text>
        </Box>
      )}
    </>
  );
};

export default Advert;
