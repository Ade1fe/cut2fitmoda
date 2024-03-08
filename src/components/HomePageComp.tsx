import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';

import {  heroImage, newsletterImage,  testimonialImage } from '../assets';
import { Products } from '.';


const HomepageComp = () => {
  return (
    <Box pt='50px' className='texts'>
      {/* Hero Image */}
      <Box bg="white" mb={['2rem']} color='white' textAlign="center" position='relative'>
  <Box w={['full']} h={['480px', '550px', '650px', '750px', '770px']}>
    <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" zIndex="1"></Box>
    <Image h={['full']} w={['full']} objectFit='cover' src={heroImage} alt="Hero Image" mb="8" mx="auto" zIndex="0" />
  </Box>
  <Box position="absolute" px='4' w={['full','full', '70%', 'fit-content']} top="50%" left="50%" transform="translate(-50%, -50%)" zIndex="3">
    <Heading as="h1" fontSize="4xl" mb="4" className='sub-titles' textShadow='2px 1px purple'>Explore Our Latest Collection</Heading>
    <Text fontSize="xl" mb={['4','5','6','7', "9"]} textShadow='2px 1px black'>Chic head bonnets and accessories await, perfect for adding flair to any outfit. Make your fashion statement or find crafting materials. Shop now and unleash your creativity.</Text>
    <Button bg='purple.300' rounded='md' px='4' py='2' size="lg">Shop Now</Button>
  </Box>
</Box>


      {/* Product Grid */}
      <Box py="16" px={['2','3','4','5', '6']}>
        <Heading as="h2" fontSize="3xl" mb="0"  className='sub-titles'>Products</Heading>
        <Products/>
      </Box>

      {/* Brand Story */}
      

<Box bg="gray.100" py="16" px="6" textAlign="left" display={['flex']}  pos='relative'>

<Flex justifyContent="center" flex='1' pos='relative'>
            <Image src={newsletterImage} alt="Brand Story" maxW="80%" borderRadius="lg" />
        </Flex>
        <Text pos="absolute" top={20} right='35%' as="h2" fontSize={['xx-large', '100px']}>About us</Text>
    {/* Brand Story */}
    {/* Brand Story */}
    <Box className=""  flex='1' mt='12rem'>
        <Box mb="2">
            <Heading fontSize="2xl" mb="2">Brand Story</Heading>
            <Text fontSize="lg" mb="4">
                Our journey began with a commitment to redefine fashion through inclusivity and sustainability. Rooted in our belief that fashion should empower, not exclude, we create timeless pieces with transparency and ethical practices. Join us as we continue to inspire change in the fashion industry.
            </Text>
        </Box>

        {/* Designer Profile */}
        <Box mb="2">
            <Heading fontSize="2xl" mb="2">Designer Profile</Heading>
            <Text fontSize="lg" mb="2">
                Hi, I'm [Your Name], the creative force behind our brand. Drawing inspiration from diverse cultures and nature, I strive to infuse each piece with meaning and purpose. My creative process is driven by experimentation and curiosity, constantly pushing boundaries to create pieces that resonate with our community.
            </Text>
        </Box>

        {/* Press and Media */}
        <Box mt='6'>
            <Heading fontSize="2xl" mb="2">Press and Media</Heading>
            <Text fontSize="lg" mb="2">
                We're honored to have been featured in numerous publications and collaborated with esteemed partners. Explore our press highlights and media coverage to discover more about our brand's journey and impact.
            </Text>
        </Box>
    </Box>
</Box>



      {/* Testimonials */}
      <Box py="16" >
        <Heading as="h2" fontSize="3xl" mb="8">What Our Customers Say</Heading>
        <Flex justifyContent="center" alignItems="center">
          <Image src={testimonialImage} alt="Testimonial" mb="4" maxW="80%" />
        </Flex>
        {/* Add testimonials component here */}
      </Box>

      {/* Newsletter Signup */}
      <Box bg="gray.200" py="16"  textAlign="center">
        <Heading as="h2" fontSize="3xl" mb="8">Stay Updated</Heading>
        <Flex justifyContent="center" alignItems="center">
          <Image src={newsletterImage} alt="Newsletter" mb="4" maxW="80%" />
        </Flex>
        <Text fontSize="lg" mb="8">Subscribe to our newsletter for exclusive offers and updates on new arrivals.</Text>
        {/* Add newsletter signup form here */}
      </Box>
    </Box>
  );
};

export default HomepageComp;
