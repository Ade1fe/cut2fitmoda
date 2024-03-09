
import  { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Image,
  Icon,
} from '@chakra-ui/react';
import { headband1, headband11, headband12, headband13, headband14, headband15, headband16, headband17, headband18, headband19, headband2, headband20, headband21, headband22, headband23, headband24, headband25, headband26, headband27, headband28, headband29, headband3, headband30, headband31, headband4, headband5, headband6, headband7, headband8, headband9 } from '../assets';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
}
  
const sampleProducts: Product[] = [
    { id: 1, name: 'Purple Headbonnet', category: 'Headbonnet', image: headband1, price: 1500 },
    { id: 2, name: 'Pink scrunchie', category: 'scrunchies', image: headband2, price: 700 },
    { id: 7, name: 'Red Two ways Headbonnet', category: 'Headbonnet', image: headband7, price: 2500 },
  
    { id: 29, name: 'Green Turban Headband', category: 'Headbands', image: headband30, price: 1000 },
    { id: 25, name: 'Brown Stoney Clover', category: 'Scrunichies', image: headband26, price: 1200 },
    { id: 27, name: 'Blue Turban Headband', category: 'Headbands', image: headband28, price: 1000 },
    { id: 4, name: 'African-Prints Headbonnet', category: 'Headbonnet', image: headband4, price: 2000 },
  
    { id: 5, name: 'Purple Two ways Headbonnet', category: 'Headbonnet', image: headband5, price: 2500 },
    { id: 14, name: 'Blue scrunchie', category: 'scrunchies', image: headband14, price: 700 },
    { id: 6, name: 'African-Prints Headbonnet', category: 'Headbonnet', image: headband6, price: 2000 },
    { id: 24, name: 'Pink Stoney Clover', category: 'Scrunichies', image: headband25, price: 1200 },
    { id: 3, name: 'Brown Headbonnet', category: 'Headbonnet', image: headband3, price: 1500 },
    { id: 8, name: 'Green Headbonnet', category: 'Headbonnet', image: headband8, price: 1500 },
    { id: 16, name: 'Black Two ways Headbonnet', category: 'Headbonnet', image: headband16, price: 2500 }, 
    { id: 28, name: 'Green Turban Headband', category: 'Headbands', image: headband29, price: 1000 },

    { id: 10, name: 'Red scrunchie', category: 'scrunchies', image: headband11, price: 700 },
    { id: 11, name: 'Flower Turban Headband', category: 'Headbands', image: headband20, price: 1000 },
    { id: 12, name: 'Gold scrunchie', category: 'scrunchies', image: headband12, price: 700 },
    { id: 13, name: 'Green scrunchie', category: 'scrunchies', image: headband13, price: 700 },
    { id: 9, name: 'Red Headbonnet', category: 'Headbonnet', image: headband9, price: 1500 },
    { id: 15, name: 'Gold Two ways Headbonnet', category: 'Headbonnet', image: headband15, price: 2500 },
  
    { id: 17, name: 'Purple scrunchie', category: 'scrunchies', image: headband17, price: 700 },
    { id: 18, name: 'Black scrunchie', category: 'scrunchies', image: headband18, price: 700 },
    { id: 19, name: 'Black Headbonnet', category: 'Headbonnet', image: headband19, price: 1500 },
    { id: 26, name: 'Yellow Turban Headband', category: 'Headbands', image: headband27, price: 1000 },
    { id: 20, name: 'Black Turban Headband', category: 'Headbands', image: headband21, price: 1000 },
    { id: 21, name: 'Bunny Clover', category: 'Scrunichies', image: headband22, price: 800 },
    { id: 22, name: 'Purple Turban Headband', category: 'Headbands', image: headband23, price: 1000 },
    { id: 23, name: 'Purple Stoney Clover', category: 'Scrunichies', image: headband24, price: 700 },
    { id: 30, name: 'do', category: 'Headbands', image: headband31, price: 1000 },
    // Add more products as needed
];

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const filteredProducts = sampleProducts.filter(
        (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || product.category === categoryFilter)
    );

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

    return (
        <Box py="4" maxW='1340px' mx='auto'>
            <Box mb="6"  p={2} bg='#f2f4f3'  rounded='md'>
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    p='2' rounded='md'
                    bg='#fff'
                    outlineColor='#b07d62'
                    w={['full']}
                />
            </Box>
            <Box textAlign="right" mb='10' display='flex' flexWrap='wrap' gap='3' justifyContent='flex-end'>
                <Button
                    px='4'
                    py='2'
                    fontWeight='500'
                    borderBottomWidth='2px'
                    borderBottomColor='#b07d62'
                    shadow='base'
                    bg={categoryFilter === 'Headbands' ? '#b07d62' : 'transparent'}
                    color={categoryFilter === 'Headbands' ? 'white' : 'gray.600'}
                    rounded='md'
                    onClick={() => setCategoryFilter('Headbands')}
                    >
                    Headbands
                </Button>
                <Button
                    px='4'
                    py='2'
                    fontWeight='500'
                    borderBottomWidth='2px'
                    borderBottomColor='#b07d62'
                    shadow='base'
                    bg={categoryFilter === 'scrunchies' ? '#b07d62' : 'transparent'}
                    color={categoryFilter === 'scrunchies' ? 'white' : 'gray.600'}
                    rounded='md'
                    onClick={() => setCategoryFilter('scrunchies')}
                    >
                    Scrunchies
                </Button>
                <Button
                    px='4'
                    py='2'
                    fontWeight='500'
                    borderBottomWidth='2px'
                    borderBottomColor='#b07d62'
                    shadow='base'
                    bg={categoryFilter === 'Headbonnet' ? '#b07d62' : 'transparent'}
                    color={categoryFilter === 'Headbonnet' ? 'white' : 'gray.600'}
                    rounded='md'
                    onClick={() => setCategoryFilter('Headbonnet')}
                    >
                    Headbonnets
                </Button>
            </Box>
            <Box display='grid' alignItems='flex-start' gridTemplateColumns={['repeat(auto-fit, minmax(150px, 1fr))','repeat(auto-fit, minmax(180px, 1fr))','repeat(auto-fit, minmax(200px, 1fr))','repeat(auto-fit, minmax(230px, 1fr))','repeat(auto-fit, minmax(250px, 1fr))']} gap="4">
    {currentProducts.map((product) => (
        <Box key={product.id} mx='auto'  shadow='md' overflow='hidden' borderRadius="lg" w='fit-content' pb='5'>
            <Box  mb="2" bg='#f1f1f1'  p="4">
                <Image w='full' h='full' objectFit='contain' src={product.image} alt={product.name}/>
            </Box>
            <Box className="" px='2'>
                <Text mb="2" className='sub-titles' fontWeight='bold'>{product.name}</Text>
                <Text mb="2"  color="gray.600" >Price: #{product.price}</Text>
                <Text fontSize="sm" pt={1}  color="gray.500"  borderTopWidth='2px' borderTopColor='#f4f4f6'>
                    {product.category}
                </Text>
            </Box>
        </Box>
    ))}
</Box>

            <Flex mt={["6",'8','10']} justifyContent="space-between">
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
