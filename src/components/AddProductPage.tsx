import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Container,
  useToast,
  Spinner,
  Select,
} from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';

const AddProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      toast({
        title: 'No image selected',
        description: 'Please select an image for the product.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setUploading(true);
    try {
      const imageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        'state_changed',
        () => {}, 
        (error) => {
          throw error;
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'products'), {
            title,
            category,
            description,
            price: parseFloat(price),
            imageUrl,
          });
          setUploading(false);
          toast({
            title: 'Product added.',
            description: 'The product has been added successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // Reset form fields
          setTitle('');
          setCategory('');
          setDescription('');
          setPrice('');
          setImage(null);
        }
      );
    } catch (error) {
      setUploading(false);
      toast({
        title: 'Error adding product.',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="xl" color="teal.500">
            Add New Product
          </Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="category" isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <FormControl id="description" isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="price" isRequired mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl id="image" isRequired mt={4}>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              mt={4}
              isDisabled={uploading}
            >
              {uploading ? <Spinner size="sm" /> : 'Add Product'}
            </Button>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default AddProductPage;
