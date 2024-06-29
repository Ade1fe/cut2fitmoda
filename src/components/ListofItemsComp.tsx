

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, VStack, Text, Image, Spinner, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Button, Icon, Flex, Input, useToast } from '@chakra-ui/react';
import { query, collection, where, getDocs, limit, startAfter, Timestamp, addDoc } from 'firebase/firestore'; // Ensure Timestamp is imported
import { db, auth } from '../firebase'; // Assuming db is your Firestore instance and auth is your Firebase Auth instance
import { RxSlash } from 'react-icons/rx';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaSearch, FaWhatsapp } from 'react-icons/fa';
import { MainLayout } from '../pages';
import { BiCartAdd } from 'react-icons/bi';

const ITEMS_PER_PAGE = 10;

const ListofItemsComp = () => {
  const { category: categoryParam } = useParams<{ category: string }>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!categoryParam) {
      console.error('Category parameter is missing.');
      return;
    }

    const decodedCategory = categoryParam ? decodeURIComponent(categoryParam) : '';
    setCurrentCategory(decodedCategory); // Set current category without replacing dashes
    
    fetchItems(1);

    const fetchSubcategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedSubcategories: string[] = [];

        querySnapshot.forEach(doc => {
          const category = doc.data().category;
          if (category.startsWith(decodedCategory)) {
            const parts = category.split(' > ');
            const subCategoryIndex = parts.indexOf(decodedCategory.split(' > ').pop()!);
            const subCategory = parts[subCategoryIndex + 1];
            if (subCategory && !fetchedSubcategories.includes(subCategory)) {
              fetchedSubcategories.push(subCategory);
            }
          }
        });

        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        let q: any;
        if (decodedCategory.includes(' > ')) {
          q = query(
            collection(db, 'products'),
            where('category', '==', decodedCategory)
          );
        } else {
          q = query(
            collection(db, 'products'),
            where('category', '>=', decodedCategory),
            where('category', '<=', `${decodedCategory}\uf8ff`)
          );
        }

        const querySnapshot = await getDocs(q);
        setTotalProducts(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    fetchSubcategories();
    fetchTotalProducts();
  }, [categoryParam]);

  const fetchItems = async (page: number) => {
    setLoading(true);
    try {
      // const decodedCategory = categoryParam ? decodeURIComponent(categoryParam).replace(/-/g, ' ') : ''; // Handle categoryParam being undefined
      const decodedCategory = categoryParam ? decodeURIComponent(categoryParam) : '';
      let q: any;
      if (decodedCategory.includes(' > ')) {
        q = query(
          collection(db, 'products'),
          where('category', '==', decodedCategory),
          limit(ITEMS_PER_PAGE)
        );
      } else {
        q = query(
          collection(db, 'products'),
          where('category', '>=', decodedCategory),
          where('category', '<=', `${decodedCategory}\uf8ff`),
          limit(ITEMS_PER_PAGE)
        );
      }

      if (searchTerm) {
        q = query(
          q,
          where('title', '>=', searchTerm.toLowerCase()),
          where('title', '<=', searchTerm.toLowerCase() + '\uf8ff')
        );
      }

      if (page > 1 && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const fetchedItems = querySnapshot.docs.map(doc => {
        const data = doc.data() as {
          title: string;
          description: string;
          imageUrl: string;
          price: number;
        };
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          price: data.price
        };
      });

      setItems(fetchedItems);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryParts = currentCategory.split(' > ');

  const handleSubcategoryClick = (subcategory: string) => {
    const newCategory = `${currentCategory} > ${subcategory}`;
    setCurrentCategory(newCategory);
    history(`/items/${encodeURIComponent(newCategory)}`); // Encode category name
  };

  const filteredProducts = items.filter((item) => {
    const productName = item.title?.toLowerCase() || '';
    return productName.includes(searchTerm.toLowerCase());
  });

  const shareOnWhatsApp = (productId: string, productPrice: number, productName?: string) => {
    const message = `Product ID: ${productId}\nHello I want to buy: ${productName}\nPrice: ${productPrice}\n`;
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const addToCart = async (item: any) => {
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated.');
        return;
      }

      // Check if the product already exists in the user's cart
      const cartQuery = query(collection(db, 'carts'), where('userId', '==', user.uid), where('productId', '==', item.id));
      const cartSnapshot = await getDocs(cartQuery);
  


      if (!cartSnapshot.empty) {
        // Product already exists in cart
        console.log('Product already exists in cart');
        toast({
          title: 'Warning',
          description: 'Product already exists in cart',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
        return;
      }

      // Reference to carts collection
      const cartsRef = collection(db, 'carts');

      // Add new item to carts collection
      const newCartItemRef = await addDoc(cartsRef, {
        userId: user.uid,
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: 1, // Initial quantity
        timestamp: Timestamp.now(),
        imageUrl: item.imageUrl // Assuming imageUrl is available in item object
      });

      toast({
        title: 'Success',
        description: 'Added item to cart',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      console.log('Added item to cart:', newCartItemRef.id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error adding item to cart:',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.error('Error adding item to cart:', error);
    }
  };

  // Calculate the range of items being displayed
  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIndex = Math.min(startItemIndex + items.length - 1, startItemIndex + ITEMS_PER_PAGE - 1);

  return (
    <MainLayout>
      <Box mb='3rem' className='texts' mt='5rem' bg="#f6f6f6" py='3rem' px={['2','4','8','14','6rem']}  color='#949494' fontSize={['sm','md']}>
        <Breadcrumb  className='sub-titles' spacing="8px" separator={<RxSlash color='#b07d62' />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {categoryParts.map((part, index) => (
            <BreadcrumbItem key={index} isCurrentPage={index === categoryParts.length - 1}>
              {index === categoryParts.length - 1 ? (
                <BreadcrumbLink>{part}</BreadcrumbLink>
              ) : (
                <BreadcrumbLink as={Link} to={`/items/${categoryParts.slice(0, index + 1).join(' > ')}`}>{part}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
          {subcategories.length > 0 && (
            <BreadcrumbItem>
              <Menu>
                <MenuButton as={BreadcrumbLink} cursor="pointer">
                  Subcategories
                </MenuButton>
                <MenuList>
                  {subcategories.map((subcategory, index) => (
                    <MenuItem key={`${subcategory}-${index}`} onClick={() => handleSubcategoryClick(subcategory)}>
                      {subcategory}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Box>

      <VStack mb='8rem' mt={4} align="stretch" spacing={4} maxW='1340px' mx='auto' px='2'>
        {loading ? (
          <Spinner />
        ) : filteredProducts.length === 0 ? (
         <>
          <Box px='2' className='sub-titles' justifyContent={['','space-between']} alignItems='center' w={['full']} display={['block', 'flex']} gap={['20px']} alignContent='center'>
          {/* <Text mb={[4,0]} w={['full', '30%']}>Showing {startItemIndex}-{endItemIndex} of {totalProducts} products</Text> */}
          <Flex w={['full', '60%']} justify="flex-end" mb="2" align="center" gap='2'>
          {showSearch && (
          <Box w={['full', '60%']} px={2} py='1' rounded="md" bg="#f6f6f6" shadow='md'>
          <Flex align="center" >
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
          // mt='2'
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
          </Box>
           <Text>No products match your search.</Text>
         </>
          ) : (
          <>
          <Box px='2' className='sub-titles'justifyContent={['','space-between']} alignItems='center' w={['full']} display={['block', 'flex']} gap={['20px']} alignContent='center'>
          <Text mb={[4,0]} w={['full', '30%']}>Showing {startItemIndex}-{endItemIndex} of {totalProducts} products</Text>
          <Flex w={['full', '60%']} justify="flex-end" mb="2" align="center" gap='2'>
          {showSearch && (
          <Box w={['full', '60%']} px={2} py='1' rounded="md" bg="#f6f6f6" shadow='md'>
          <Flex align="center" >
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
          // mt='2'
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
          </Box>
          <SimpleGrid columns={{ base: 1, sm: 2 , md: 3, lg: 4 }}spacing="3" fontSize="sm">
          {filteredProducts.map((item) => (
          <Box key={item.id} bg="white"  pos='relative' fontSize={['xs', "sm"]} _hover={{shadow: "base"}}>
          <Image w="full" h={['370px', '270px', '300px', "330px", "350px"]} objectFit="cover" src={item.imageUrl} alt={item.title} />
          <Box px="3" py='2'>
          <Text   mb="1" fontWeight="600" >
          {item.title}
          </Text>
          <Text mb="1" color="gray.600" >
          Price: #{item.price}
          </Text>
          <Button onClick={() => addToCart(item)} pos='absolute' top='10px' right='10px' bg='white' shadow='lg' _hover={{bg: "orange.900", color: "white"}}> <Icon as={BiCartAdd} boxSize={[4,5, 6]} /> </Button>
          <Text fontSize="xs" pt={1} color="gray.500" borderTopWidth="2px" borderTopColor="#f4f4f6">
          {item.category}
          </Text>
          <Button p='1' bg='transparent' _hover={{bg: "none", shadow: "base"}} display='flex' justifyContent='flex-start' w="full" fontSize={["xs", 'sm']} onClick={() => shareOnWhatsApp(item.id, item.price, item.title)}>
          <Icon as={FaWhatsapp} mr="1" color="green.600" /> Send a message
          </Button>
          </Box>
          </Box>
          ))}
          </SimpleGrid>
          <Box display="flex" gap='3' justifyContent="flex-end" alignItems="center" mt={4}>
          <Button onClick={() => fetchItems(currentPage - 1)} disabled={currentPage === 1} bg='transparent' _hover={{shadow: "base"}}>
          <Icon as={FaArrowAltCircleLeft} boxSize="6" />
          </Button>
          <Text display='none'>Page {currentPage}</Text>
          <Button bg='transparent' _hover={{shadow: "base"}} onClick={() => fetchItems(currentPage + 1)} disabled={items.length < ITEMS_PER_PAGE || endItemIndex >= totalProducts}>
          <Icon as={FaArrowAltCircleRight} boxSize="6" />
          </Button>
          </Box>
          </>
          )}
          </VStack>
          </MainLayout>
          );
          };
          
          export default ListofItemsComp;








































































