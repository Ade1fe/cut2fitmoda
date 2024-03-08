
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
import { headband1, headband2, headband3, headband4, headband5, headband6, headband7, headband8, headband9 } from '../assets';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
}
  
const sampleProducts: Product[] = [
    { id: 1, name: 'Headband 1', category: 'Headbands', image: headband1, price: 10 },
    { id: 2, name: 'Headband 2', category: 'Scrunichies', image: headband2, price: 10 },
    { id: 3, name: 'Headband 3', category: 'Headbands', image: headband3, price: 10 },
    { id: 4, name: 'Headband 4', category: 'Headbands', image: headband4, price: 10 },
    { id: 5, name: 'Headband 5', category: 'Headbands', image: headband5, price: 10 },
    { id: 6, name: 'Headband 6', category: 'Headbands', image: headband6, price: 10 },
    { id: 7, name: 'Headband 7', category: 'Headbands', image: headband7, price: 10 },
    { id: 8, name: 'Headband 8', category: 'Headbands', image: headband8, price: 10 },
    { id: 9, name: 'Headband 9', category: 'Headbands', image: headband9, price: 10 },
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
        <Box py="4">
            <Box mb="6"  p={2} bg='#f2f4f3'  rounded='md'>
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    p='2' rounded='md'
                    bg='#fff'
                    outlineColor='purple.300'
                    w={['full']}
                />
            </Box>
            <Box textAlign="right" mb='10' display='flex' flexWrap='wrap' gap='3' justifyContent='flex-end'>
                <Button
                    px='4'
                    py='2'
                    fontWeight='500'
                    borderBottomWidth='2px'
                    borderBottomColor='purple.300'
                    shadow='base'
                    bg={categoryFilter === 'Headbands' ? 'purple.300' : 'transparent'}
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
                    borderBottomColor='purple.300'
                    shadow='base'
                    bg={categoryFilter === 'Scrunichies' ? 'purple.300' : 'transparent'}
                    color={categoryFilter === 'Scrunichies' ? 'white' : 'gray.600'}
                    rounded='md'
                    onClick={() => setCategoryFilter('Scrunichies')}
                    >
                    Scrunichies
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
                <Text mb="2"  color="gray.600" >Price: ${product.price}</Text>
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
