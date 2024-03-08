import { Box, Flex, Heading, Text, Button, Image, Icon, FormControl, Input, Stack } from '@chakra-ui/react';

import {  emails, heroImage, newsletterImage,  testimonialImage } from '../assets';
import { Products } from '.';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';


const HomepageComp = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Here you can implement the logic to submit the email (e.g., send it to a server)
    console.log('Submitted email:', email);
    // Reset the email input field after submission
    setEmail('');
  };
  
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
      <Box py="16" px={['4','5', '6']} mt={['2rem', '4rem', '6rem', '8rem']}>
        <Heading as="h2" fontSize={['2xl','3xl', '4xl', "5xl"]} textAlign='center' mb={['2', '4', '6', "8"]}  className='sub-titles'>Products</Heading>
        <Products/>
      </Box>

      {/* Brand Story */}
      

<Box bg="#f6f6f6">
<Box  py="8rem" px="4" maxW='1340px' mx='auto' mt={['2rem', '4rem', '6rem', '8rem']} textAlign="left" display={['block','block', 'flex']} gap={['3', '4','5']} pos='relative'>
<Text  display={['block', 'block', 'none']} textAlign='center'  as="h2" fontSize={['50px', '60px', '70px','80px', '100px']}>About us</Text>
<Flex justifyContent="center" w={['80%', '70%', '80%', '70%']}  mx={['auto', 'auto', 'auto', '0']} flex='1' pos='relative'>
            <Image src={newsletterImage} alt="Brand Story"  w='full' h='full' objectFit='cover' borderRadius="lg" />
        </Flex>
        <Text pos={["absolute"]} display={['none', 'none', 'block']} top={40} right='30%' as="h2" fontSize={[ 'xx-large',  '100px']}>About us</Text>
    {/* Brand Story */}
    {/* Brand Story */}
    <Box className=""  flex='1' mt={[ '2rem', '2rem', '12rem', '12rem']}>
        <Box mb="2">
            <Heading fontSize="2xl" mb="2">Brand Story</Heading>
            <Text fontSize={['md', "lg"]} mb="4">
                Our journey began with a commitment to redefine fashion through inclusivity and sustainability. Rooted in our belief that fashion should empower, not exclude, we create timeless pieces with transparency and ethical practices. Join us as we continue to inspire change in the fashion industry.
            </Text>
        </Box>

        {/* Designer Profile */}
        <Box mb="2">
            <Heading fontSize="2xl" mb="2">Designer Profile</Heading>
            <Text fontSize={['md', "lg"]} mb="2">
                Hi, I'm [Your Name], the creative force behind our brand. Drawing inspiration from diverse cultures and nature, I strive to infuse each piece with meaning and purpose. My creative process is driven by experimentation and curiosity, constantly pushing boundaries to create pieces that resonate with our community.
            </Text>
        </Box>

        {/* Press and Media */}
        <Box mt='6'>
            <Heading fontSize="2xl" mb="2">Press and Media</Heading>
            <Text fontSize={['md', "lg"]} mb="2">
                We're honored to have been featured in numerous publications and collaborated with esteemed partners. Explore our press highlights and media coverage to discover more about our brand's journey and impact.
            </Text>
        </Box>

        <div className="">
          <Link to="/"> <Icon as={FaWhatsapp} /> </Link>
          <Link to="/"> <Icon as={FaInstagram} /> </Link>
          <Link to="/"> <Icon as={FaFacebook} /> </Link>
        </div>
    </Box>
</Box>

</Box>


      {/* Testimonials */}
      <Box py="16" >
        <Heading as="h2" fontSize="3xl" mb="8">What Our Customers Say</Heading>
        <Flex justifyContent="center" alignItems="center" w='full'>
          <Image src={testimonialImage} alt="Testimonial" mb="4" w='full' h='full'  />
        </Flex>
        {/* Add testimonials component here */}
      </Box>

      {/* Newsletter Signup */}
      <Box maxW="1400px" mx="auto" p={6} display="flex" alignItems='center'>
      <Box flex="1">
        <Image src={emails} alt="Newsletter Image" maxW="100%" />
      </Box>
      <Box flex="1" maxW="600px" ml={8}>
        <Stack spacing={6}>
          <Heading as="h1" size="xl" color="blue.600">Weekly Newsletter</Heading>
          <Text fontSize="lg" color="gray.600">
            Welcome to our weekly newsletter. Here's what's been happening in our community.
          </Text>
          <Stack spacing={4}>
            <Box>
              <Heading as="h2" size="lg">Recent News</Heading>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </Box>
            <Box>
              <Heading as="h2" size="lg">Featured Article</Heading>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </Box>
            <Box>
              <Heading as="h2" size="lg">Upcoming Events</Heading>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="md"
                focusBorderColor="blue.400"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="md">Subscribe</Button>
          </form>
        </Stack>
      </Box>
    </Box>
    </Box>
  );
};

export default HomepageComp;
