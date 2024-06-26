import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Input, Text, Image, Icon, SimpleGrid, useToast, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Spinner } from '@chakra-ui/react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaSearch, FaWhatsapp } from 'react-icons/fa';
import { collection, getDocs, query, where, Timestamp, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { BiCartAdd } from 'react-icons/bi';
import { RxSlash } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export interface Product {
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
  const [categories, setCategories] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);

        const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
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

  const shareOnWhatsApp = (productId: string, productPrice: number, productName?: string) => {
    const message = `Product ID: ${productId}\nHello I want to buy: ${productName}\nPrice: ${productPrice}\n`;
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const getWordsAfterGreaterThan = (text: string) => {
    const parts = text.split('>');
    return parts.length > 1 ? parts[1].trim() : text;
  };

  const addToCart = async (product: Product) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast({
          title: 'Error',
          description: 'You need to be logged in to add items to your cart.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const cartQuery = query(collection(db, 'carts'), where('userId', '==', currentUser.uid), where('productId', '==', product.id));
      const cartSnapshot = await getDocs(cartQuery);

      if (!cartSnapshot.empty) {
        toast({
          title: 'Warning',
          description: 'Product already exists in cart',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const cartsRef = collection(db, 'carts');

      const newCartItemRef = await addDoc(cartsRef, {
        userId: currentUser.uid,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        timestamp: Timestamp.now(),
        imageUrl: product.imageUrl
      });

      console.log(newCartItemRef);

      toast({
        title: 'Success',
        description: 'Product added to cart successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error adding product to cart:',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  return (
    <div className="">
      <Box mb='3rem' mt={'5rem'} bg="#f6f6f6" py='3rem' px={['2','4','8','14','7rem']} className="" color='#949494' fontSize={['sm','md']}>
        <Breadcrumb spacing="8px" separator={<RxSlash color='#b07d62' />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Shop</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box p="3" maxW="1340px" mx="auto" mt='2.6rem' zIndex='13'>
        <Flex justify="flex-end" mb="2" align="center">
          {showSearch && (
            <Box w={['full', '60%']} px={2} py='1' rounded="md" bg="#f6f6f6" shadow='md'>
              <Flex align="center">
                <Icon as={FaSearch} color="gray.500" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  px="2"
                  rounded="md"
                  bg="#f6f6f6"
                  border="none"
                  focusBorderColor="#b07d62"
                  _placeholder={{ color: 'gray.400' }}
                  ml={2}
                />
              </Flex>
            </Box>
          )}
          <Button
            onClick={() => setShowSearch(!showSearch)}
            bg="transparent"
            color="gray.600"
            _hover={{ shadow: 'base' }}
            _focus={{ outline: 'none' }}
          >
            <Icon as={FaSearch} boxSize="6" />
          </Button>
        </Flex>
        <Box display={['block', 'block', 'flex']} className="" gap='5'>
          <Box textAlign="left" w={['full', '100%', '28%']} mb="10" display="flex" flexDir={['row', 'row', 'column']} overflowX='scroll' gap="3" pb='0.5rem'
            css={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#fff #fff',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#cbd5e0',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'green',
                borderRadius: '6px',
              },
              position: "-webkit-sticky",
            }}
            py='1rem' bg="white" color="black" width="full" h="full" position={['static',"static", "sticky"]} top="80px" zIndex="999"
          >
            <Text pl='10px' fontWeight='700' display={['none', 'none', 'block']} mt='20px' fontSize={['md']} className="sub-titles">subcategories</Text>
            {categories.map((category) => (
              <Button
                key={category}
                whiteSpace='nowrap'
                fontWeight='200'
                minW='150px'
                size='sm'
                w='150px'
                textTransform='capitalize'
                _hover={{ shadow: 'base' }}
                onClick={() => {
                  setCategoryFilter(category === categoryFilter ? '' : category);
                  setCurrentPage(1);  // Reset current page to 1 when category changes
                }}
                bg={category === categoryFilter ? '#b07d62' : 'white'}
                variant="none"
                color={category === categoryFilter ? '#fff' : '#959494'}
                borderBottomWidth={[2, 2, 0]}
                shadow={category === categoryFilter ? 'sm' : ''}
                borderBottomColor={category === categoryFilter ? '#b07d62' : '#b07d62'}
                textAlign={['center', 'center', 'left']}
                display={['block', 'block', 'flex']} justifyContent='flex-start'
                boxShadow={["sm", 'sm', 'none']}
              >
                {getWordsAfterGreaterThan(category)}
              </Button>
            ))}
          </Box>
          <div className="">
            <Text p={['20px']} fontSize={['sm']} fontWeight='300' color='gray.900'>
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </Text>
            {loading ? (
              <Flex justify="center" align="center" height="200px">
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='black' size={['xl',]}/>
              </Flex>
            ) : filteredProducts.length === 0 ? (
              <Text p="20px" fontSize="lg" fontWeight="bold" color="red.500">
                No products found for this search.
              </Text>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2 , md: 2, lg: 3 }} spacing="5" fontSize={['xs', "sm"]}>
                {currentProducts.map((product) => (
                  <Box key={product.id} bg="white" pos='relative' _hover={{shadow: "base"}}>
                    <Image w="full" h={['370px', '270px', '300px', "330px", "350px"]} objectFit="cover" src={product.imageUrl} alt={product.title} />
                    <Box px="3" py='2'>
                      <Text mb="1" fontWeight="600">
                        {product.title}
                      </Text>
                      <Text mb="1" color="gray.600">
                      Price: {formatPrice(product.price)}
                      </Text>
                      <Button onClick={() => addToCart(product)} pos='absolute' top='10px' right='10px' bg='white' shadow='lg' _hover={{ bg: "orange.900", color: "white" }}>
                        <Icon as={BiCartAdd} boxSize={[4, 5, 6]} />
                      </Button>
                      <Text pt={1} fontSize={['xs']} color="gray.500" borderTopWidth="2px" borderTopColor="#f4f4f6">
                        {product.category}
                      </Text>
                      <Button mt='2px' p='1' fontSize={['xs', "sm"]} bg='transparent' _hover={{ bg: "none", shadow: "base" }} display='flex' justifyContent='flex-start' w="full" onClick={() => shareOnWhatsApp(product.id, product.price, product.title)}>
                        <Icon as={FaWhatsapp} mr="1" color="green.600" /> Send a message
                      </Button>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
            <Flex mt="10" justifyContent="flex-end" gap='4' alignItems="center">
              <Button onClick={prevPage} disabled={currentPage === 1} bg='transparent' _hover={{ shadow: "base" }}>
                <Icon as={FaArrowAltCircleLeft} boxSize="6" />
              </Button>
              <Text>Page {currentPage}</Text>
              <Button onClick={nextPage} disabled={currentPage === totalPages} bg='transparent' _hover={{ shadow: "base" }}>
                <Icon as={FaArrowAltCircleRight} boxSize="6" />
              </Button>
            </Flex>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Products;

