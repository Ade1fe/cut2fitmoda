import { useState } from 'react';
import { Box, Text, Image, Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react';
import { db } from '../firebase'; // Assuming you have Firebase initialized in firebase.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { emails } from '../assets';

const NewLetter = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      if (email) {
        setIsLoading(true);
        // Check if email already exists
        const subscribersRef = collection(db, 'subscribers');
        const queryRef = query(subscribersRef, where('email', '==', email));
        const existingSubscribers = await getDocs(queryRef);

        if (!existingSubscribers.empty) {
          // Email already exists in Firestore
          toast({
            title: 'Email Already Subscribed',
            description: `The email ${email} is already subscribed.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        } else {
          // Save email to Firestore
          await addDoc(subscribersRef, {
            email,
            createdAt: new Date()
          });

          // Display success toast
          toast({
            title: 'Subscription Successful!',
            description: `Thank you for subscribing with ${email}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          setEmail('');
        }
      } else {
        // Display error toast if email is empty
        toast({
          title: 'Email Required',
          description: 'Please enter your email address to subscribe.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error:any) {
      console.error('Error subscribing:', error.message);
      // Display error toast if subscription fails
      toast({
        title: 'Subscription Failed',
        description: 'Failed to subscribe. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <Box maxW="1340px" mx="auto" px={[6, 6, 4, 4, 2, 0]} display={['block', 'block', 'flex']} alignItems="center" mb="10rem">
      <Box flex="1">
        <Image src={emails} alt="Newsletter Image" maxW="100%" />
      </Box>
      <Box flex="1" ml={[0, 0, 4]}>
        <Stack spacing={[2, 3, 4, 5, 6]}>
          <Text as="h1" fontSize={['3xl', '3xl', '4xl', '5xl']} fontWeight="600" mt={['30px']} className="sub-titles" textShadow="2px 1px #b07d62">
            Join Our Newsletter
          </Text>
          <Text fontSize="lg" color="gray.600">
            Stay informed with our weekly newsletter! Join thousands of subscribers who receive updates on the latest news, featured articles, and upcoming events. We promise not to spam your inbox, just quality content delivered straight to you.
          </Text>
          <form onSubmit={handleSubmit}>
            <Box display="flex">
              <FormControl w="full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  bg="#f6f6f6"
                  focusBorderColor="white"
                  border="none"
                  outline="white"
                  borderRadius="0"
                  py="2"
                  px="4"
                />
              </FormControl>
              <Button
                type="submit"
                borderRadius="0"
                bg="#b07d62"
                px="4"
                py="2"
                color="white"
                fontWeight="500"
                size="md"
                _hover={{ bg: "orange.900" }}
                isLoading={isLoading} 
              >
                Subscribe
              </Button>
            </Box>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default NewLetter;
