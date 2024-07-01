import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Container,
  Text,
  HStack,
  Link,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Error creating account.',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        email,
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);

      toast({
        title: 'Account created.',
        description: 'Your account has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error creating account.',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent h='100vh' display='flex' alignContent='center' justifyContent='center'>
      <Box
        p={8}
        maxWidth="500px"
        bg='white'
        borderWidth={3}
        borderColor='#b07d62'
        borderRadius={8}
        boxShadow="xl"
        className='sub-titles'
      >
        <VStack spacing={4}>
          <Box fontSize={['x-large', 'xx-large']} className='logo' mb='1rem'>
            <Link href="/" fontWeight="bold">CUT2FIT-MODA</Link>
          </Box>
          <Text fontSize="lg" color="gray.600">
            Create a new account to get started.
          </Text>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password" isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Sign Up
            </Button>
          </form>
          <HStack mt={4}>
            <Text fontSize="sm" color="gray.600">
              Already have an account?
            </Text>
            <Link color="teal.500" href="/login">
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Signup;
