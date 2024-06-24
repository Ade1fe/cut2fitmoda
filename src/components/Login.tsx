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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Logged in successfully.',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error: unknown) {
      toast({
        title: 'Error logging in.',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent h="100vh" display="flex" alignContent="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        bg="white"
        borderWidth={3}
        borderColor="#b07d62"
        borderRadius={8}
        boxShadow="xl"
        className="sub-titles"
      >
        <VStack spacing={4}>
          <Box fontSize={['x-large', 'xx-large']} className="logo" mb="1rem">
            <Link href="/" fontWeight="bold">CUT2FIT-MODA</Link>
          </Box>
          <Text fontSize="lg" color="gray.600">
            Enter your credentials to access your account.
          </Text>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl id="email" isRequired>
              <FormLabel mb="5px">Email address</FormLabel>
              <Input
                name="email"
                type="email"
                w="full"
                shadow="base"
                bg="white"
                p="2"
                outline="white"
                borderRadius="5px"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel mb="5px">Password</FormLabel>
              <Input
                name="password"
                type="password"
                w="full"
                shadow="base"
                outline="white"
                bg="white"
                p="2"
                borderRadius="5px"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Login
            </Button>
          </form>
          <HStack mt={4}>
            <Text fontSize="sm" color="gray.600">
              Don't have an account?
            </Text>
            <Link color="teal.500" href="/signup">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
