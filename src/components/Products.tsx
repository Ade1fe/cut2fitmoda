import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaWhatsapp } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Product {
  id: string;
  title?: string;  
  category: string;
  imageUrl: string;
  price: number;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // State to hold categories

  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);

      // Extract unique categories from products
      const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product.title?.toLowerCase() || '';
    return (
      productName.includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || product.category === categoryFilter)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const shareOnWhatsApp = async (productId: string, productPrice: number, productName?: string) => {
    const message = `Product ID: ${productId}\nHello I want to buy: ${productName}\nPrice: ${productPrice}\n`;
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <Box py="4" maxW="1340px" mx="auto" className='texts'>
      <Box mb="6" p={2}  rounded="md">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          p="2"
          rounded="md"
          bg="white"
          border='none'
          shadow='base'
          focusBorderColor='white'
          outlineColor="#b07d62"
          w={['full']}
        />
      </Box>
      <Box textAlign="right" mb="10" display="flex" flexWrap="wrap" gap="3" justifyContent="flex-end" >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setCategoryFilter(category === categoryFilter ? '' : category)}
            bg={category === categoryFilter ? '#b07d62' : '#fff'}
            variant="none"
            color={category === categoryFilter ? '#fff' : '#000'}
            borderBottomWidth={2}
            shadow={category === categoryFilter ? 'sm' : 'base'}
            borderBottomColor={category === categoryFilter ? '#b07d62' : '#b07d62'}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent='flex-start'  gap='2' overflowX='scroll' paddingBottom='1rem'
      css={{
        scrollbarWidth: 'thin',     
        scrollbarColor: '#b07d62 #b07d62',  
        '&::-webkit-scrollbar': {   
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#cbd5e0',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'green',
          borderRadius: '6px',
        },
      }}
      >
        {currentProducts.map((product) => (
          <Box key={product.id} bg='white' shadow="md"  borderRadius="lg" w="fit-content" pb="5">
          <Box mb="2" h={['200px']} bg="#f1f1f1" p="2" w={['200px','230px','250px']}>
            <Image w="full" h="full" objectFit="cover" src={product.imageUrl} alt={product.title} />
                </Box>
            <Box className="" px="2">
              <Text mb="2" className="sub-titles" fontWeight="bold">
                {product.title}
              </Text>
              <Text mb="2" color="gray.600">
                Price: #{product.price}
              </Text>
              <Text fontSize="sm" pt={1} color="gray.500" borderTopWidth="2px" borderTopColor="#f4f4f6">
                {product.category}
              </Text>
              <Button bg='transparent' _hover={{bg: "none", shadow: "base"}} mt="5px" w="142px" fontSize="sm" onClick={() => shareOnWhatsApp(product.id, product.price, product.title)}>
                <Icon as={FaWhatsapp} mr="1" color="green.600" /> Send a message
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Flex mt={["6", '8', '10']} justifyContent="space-between">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          <Icon as={FaArrowAltCircleLeft} boxSize={['6']} />
        </Button>
        <Text>
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </Text>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          <Icon as={FaArrowAltCircleRight} boxSize={['6']} />
        </Button>
      </Flex>
    </Box>
  );
};

export default Products;






