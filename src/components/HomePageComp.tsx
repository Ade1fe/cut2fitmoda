import { useState } from 'react';
import { Box, Flex, Text, Button, Image, Icon, FormControl, Input, Stack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTruck, FaWhatsapp } from 'react-icons/fa';
import { BrowseCategories, Footer,  } from '.';
import { Link } from 'react-router-dom';
import { emails, heroImage, newsletterImage } from '../assets';

import { TbNeedleThread } from "react-icons/tb";
import { SiStylelint } from "react-icons/si";

const HomepageComp = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };
  
  return (
    <Box mt='4rem'  className='texts'>
      {/* Hero Image */}
      <Box bg="white" mb={['2rem']} color='white' textAlign="center" position='relative'>
        <Box w={['full']} h={['650px', '690px', '730px', '750px', '770px']}>
          <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" zIndex="1"></Box>
          <Image h={['full']} w={['full']} objectFit='cover' src={heroImage} alt="Hero Image" mb="8" mx="auto" zIndex="0" />
        </Box>
        <Box position="absolute" px='4' w={['full','full', '70%', 'fit-content']} top="50%" left="50%" transform="translate(-50%, -50%)" zIndex="3">
          <Text as="h1" fontSize="4xl" mb="4" className='sub-titles' textShadow='2px 1px #b07d62'>Explore Our Latest Collection</Text>
          <Text fontSize="xl" mb={['4','5','6','7', "9"]} textShadow='2px 1px black'>Discover chic fashion essentials and accessories, perfect for adding flair to any outfit. Make your fashion statement with our curated selection or find crafting materials. </Text>
          <Link  to= "/products"><Text w='fit-content' mx='auto'  bg="rgba(0,0,0,0.5)" rounded='md' py='2'_hover={{bg: "#b07d62", border: "#b07d62"}} colorScheme='blackAlpha' px='3' color='white' size="lg">  Shop now </Text></Link>
        </Box>
      </Box>

      {/* Product Grid */}
      <Box py="16" px={['4','5', '6']} mt={['2rem', '4rem', '6rem', '8rem']}>
        <Text as="h2" fontSize={['3xl','3xl', '4xl', "5xl"]} textAlign='center' mb={['2', '4', '6', "8"]}  className='sub-titles' textShadow='2px 1px #b07d62'>Browse Our Collection</Text>
        {/* <Products/> */}
        <BrowseCategories />
      </Box>

      {/* Brand Story */}
      <Box bg="#f6f6f6">
        <Box py="8rem" px="6" maxW='1340px' mx='auto' mt={['2rem', '4rem', '6rem', '8rem']} textAlign="left" display={['block','block', 'flex']} gap={['3', '4','5']} pos='relative'>
          <Text  display={['block', 'block', 'none']} textAlign='center'  as="h2" fontSize={['50px', '60px', '70px','80px', '100px']} className='sub-titles' textShadow='2px 1px #b07d62'>About us</Text>
          <Flex justifyContent="center" w={['80%', '70%', '80%', '70%']}  mx={['auto', 'auto', 'auto', '0']} flex='1' pos='relative'>
            <Image src={newsletterImage} alt="Brand Story"  w='full' h='full' objectFit='cover' borderRadius="lg" />
          </Flex>
          <Text pos={["absolute"]} display={['none', 'none', 'block']} top={40} right='30%' as="h2" fontSize={[ 'xx-large',  '100px']} className='sub-titles' textShadow='2px 1px #b07d62'>About us</Text>
          <Box className=""  flex='1' mt={[ '2rem', '2rem', '12rem', '12rem']}>
            <Box mb="2">
              <Text fontSize="2xl" mb="2">Brand Story</Text>
              <Text fontSize={['md', "lg"]} mb="4">
                Our journey began with a commitment to redefine fashion through inclusivity and sustainability. Rooted in our belief that fashion should empower, not exclude, we create timeless pieces with transparency and ethical practices. Join us as we continue to inspire change in the fashion industry.
              </Text>
            </Box>
            <Box mb="2">
              <Text fontSize="2xl" mb="2">Designer Profile</Text>
              <Text fontSize={['md', "lg"]} mb="2">
                Hi, I'm Oluwadamisi Damilola, the creative force behind our brand. Drawing inspiration from diverse cultures and nature, I strive to infuse each piece with meaning and purpose. My creative process is driven by experimentation and curiosity, constantly pushing boundaries to create pieces that resonate with our community.
              </Text>
            </Box>
            <Box mt='6'>
              <Text fontSize="2xl" mb="2">Press and Media</Text>
              <Text fontSize={['md', "lg"]} mb="2">
                We're honored to have been featured in numerous publications and collaborated with esteemed partners. Explore our press highlights and media coverage to discover more about our brand's journey and impact.
              </Text>
            </Box>
            <Box display="flex" gap='3' mt='4'>
              <Link to="https://wa.me/2349038257434"> <Icon as={FaWhatsapp} boxSize={['6']} color='green.600' /> </Link>
              <Link to="https://instagram.com/deife_syntax"> <Icon as={FaInstagram} boxSize={['6']} color='red.600' /> </Link>
              <Link to="https://web.facebook.com/johanna.adams.3576"> <Icon as={FaFacebook} boxSize={['6']} color='blue.600' /> </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Testimonials */}
      <Box my={['10rem']} px='6' maxWidth='1340px' mx='auto' textAlign='center'>
        <Text fontSize={['3xl','3xl', '4xl', "5xl"]} textAlign='center' mb={['2',]}  className='sub-titles' fontWeight='600' textShadow='2px 1px #b07d62'>Testimonials</Text>
        <Text fontSize={['md','lg','2xl']} mb='4' fontWeight='600'>Why Choose Our Fashion Collection</Text>
        <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']} gap='10' mt='2rem'>
          <Box p='10' shadow='base' h='300px' display='flex' flexDir='column' alignItems='center' justifyContent='center' gap='6' borderRadius='20px'> 
            <Icon as={SiStylelint} boxSize={[39]} color='gray.600' />
            <Text mb='0px' className='sub-titles' fontSize={['md','lg']} fontWeight='600'>Stylish Designs</Text>
            <Text mb='0px' color="gray.600">I've never felt more confident in my outfits since I started shopping here. The designs are always so trendy and unique!</Text>
            <Text mb='0px' fontWeight='bold'>- Ayojesu Alpha</Text>
          </Box>
          <Box p='10' shadow='2xl' h='300px' display='flex' flexDir='column' alignItems='center' justifyContent='center' gap='6' borderRadius='20px'> 
            <Icon as={FaTruck} boxSize={[39]} color='blue.800' />
            <Text mb='0px' className='sub-titles' fontSize={['md','lg']} fontWeight='600'>Fast Shipping</Text>
            <Text mb='0px' color="gray.600">I'm amazed by how quickly my orders arrive. It's like Christmas every time I receive a package from your store!</Text>
            <Text mb='0px' fontWeight='bold'>- Miriam Adeniyi</Text>
          </Box>
          <Box p='10' shadow='base' h='300px' display='flex' flexDir='column' alignItems='center' justifyContent='center' gap='6' borderRadius='20px'> 
            <Icon as={TbNeedleThread} boxSize={[39]} color='gray.700' />
            <Text mb='0px' className='sub-titles' fontSize={['md','lg']} fontWeight='600'>Quality Fabrics</Text>
            <Text mb='0px' color="gray.600">The fabric of your clothing is so comfortable and durable. I've washed my favorite dress countless times, and it still looks brand new!</Text>
            <Text mb='0px' fontWeight='bold'>- Chioma Ude</Text>
          </Box>
        </Box>
      </Box>

      {/* Newsletter Signup */}
      <Box maxW="1340px" mx="auto" px={[6,6,4,4,2,0]} display={['block','block', "flex"]} alignItems='center'  mb='10rem'>
        <Box flex="1">
          <Image src={emails} alt="Newsletter Image" maxW="100%" />
        </Box>
        <Box flex="1"  ml={[0,0,4]}>
          <Stack spacing={[2, 3,4,5,6]}>
            <Text as="h1" fontSize={['3xl','3xl', '4xl', "5xl"]} fontWeight='600' mt={['30px']} className='sub-titles' textShadow='2px 1px #b07d62'>Join Our Newsletter</Text>
            <Text fontSize="lg" color="gray.600">
              Stay informed with our weekly newsletter! Join thousands of subscribers who receive updates on the latest news, featured articles, and upcoming events. We promise not to spam your inbox, just quality content delivered straight to you.
            </Text>
            <form onSubmit={handleSubmit}>
              <Box display="flex">
                <FormControl w='full'>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="md"
                    // _focusWithin={{border: 'orange.800'}}
                    w='full' py='2' px='4'
                    bg='#f6f6f6'
                    focusBorderColor="white"
                    border='none'
                    outline='white'
                    borderRadius='0'
                    
                  />
                </FormControl>
                <Button borderRadius='0' type="submit" bg='#b07d62' px='4' py='2' color='white' fontWeight='500' size="md">Subscribe</Button>
              </Box>
            </form>
          </Stack>
        </Box>
      </Box>

    
    <Footer />
    </Box>
  );
};

export default HomepageComp;
