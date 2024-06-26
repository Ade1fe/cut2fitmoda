import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, VStack, Text, Image, Spinner, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Button, Icon } from '@chakra-ui/react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { RxSlash } from 'react-icons/rx';
import { FaWhatsapp } from 'react-icons/fa';
import { MainLayout } from '../pages';

const ListofItemsComp = () => {
  const { category: categoryParam } = useParams<{ category: string }>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const history = useNavigate();

  useEffect(() => {
    if (!categoryParam) {
      console.error('Category parameter is missing.');
      return;
    }

    setCurrentCategory(categoryParam);

    const fetchItems = async () => {
      setLoading(true);
      try {
        let q: any;
        if (currentCategory.includes(' > ')) {
          q = query(
            collection(db, 'products'),
            where('category', '==', currentCategory)
          );
        } else {
          q = query(
            collection(db, 'products'),
            where('category', '>=', currentCategory),
            where('category', '<=', `${currentCategory}\uf8ff`)
          );
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
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedSubcategories: string[] = [];

        querySnapshot.forEach(doc => {
          const category = doc.data().category;
          if (category.startsWith(currentCategory)) {
            const parts = category.split(' > ');
            const subCategoryIndex = parts.indexOf(currentCategory.split(' > ').pop()!);
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

    fetchItems();
    fetchSubcategories();
  }, [categoryParam, currentCategory]);

  if (!categoryParam) {
    return (
      <Box p={4}>
        <Text>No category specified.</Text>
      </Box>
    );
  }

  const categoryParts = currentCategory.split(' > ');

  const handleSubcategoryClick = (subcategory: string) => {
    const newCategory = `${currentCategory} > ${subcategory}`;
    setCurrentCategory(newCategory);
    history(`/items/${newCategory}`);
  };

  const shareOnWhatsApp = (productId: string, productPrice: number, productName?: string) => {
    const message = `Product ID: ${productId}\nHello I want to buy: ${productName}\nPrice: ${productPrice}\n`;
    const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <MainLayout>
    <Box mb='3rem' mt='5rem' bg="#f6f6f6"  py='3rem' px={['2','4','8','14','6rem']} className="" color='#949494' fontSize={['sm','md']}>
      <Breadcrumb spacing="8px" separator={<RxSlash color='#b07d62' />}>
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

    <VStack mb='8rem' mt={4} align="stretch" spacing={4}  maxW='1340px' mx='auto' px='2'>
      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Text>No products available in this category.</Text>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="3">
     

{items.map((item) => (
          <Box key={item.id} shadow='md' overflow='hidden' borderRadius="lg" bg="white">
            <Image w="full" h={['200px', '230px', '260px', "290px", "350px"]} objectFit="cover" src={item.imageUrl} alt={item.title} />
            <Box px="4" py='2'>
              <Text mb="1" fontWeight="bold" fontSize={['md', 'lg']}>
                {item.title}
              </Text>
              <Text mb="1" color="gray.600" fontSize={['sm', 'md']}>
                Price: #{item.price}
              </Text>
              <Text fontSize="sm" pt={1} color="gray.500" borderTopWidth="2px" borderTopColor="#f4f4f6">
                {item.category}
              </Text>
              <Button bg='transparent' _hover={{bg: "none", shadow: "base"}} display='flex' justifyContent='flex-start' w="full" fontSize="sm" onClick={() => shareOnWhatsApp(item.id, item.price, item.title)}>
                <Icon as={FaWhatsapp} mr="1" color="green.600" /> Send a message
              </Button>
            </Box>
          </Box>
        ))}
        </SimpleGrid>
      )}
    </VStack>
  </MainLayout>
  );
};

export default ListofItemsComp;
