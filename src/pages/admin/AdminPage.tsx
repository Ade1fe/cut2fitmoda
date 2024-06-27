// import { useEffect, useState } from 'react';
// import { Box, Table, TableContainer, Thead, Tbody,Image, Tr, Th, Td, TableCaption, Spinner, Center, Alert, AlertIcon, Button, IconButton } from '@chakra-ui/react';
// import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
// import Header from './Header';
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../../firebase';

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   category: string;
//   subcategory: string;
//   imageUrl: string;
// }

// const AdminPage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
//         setProducts(productsList);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, 'products', id));
//       setProducts(products.filter(product => product.id !== id));
//     } catch (err) {
//       console.error('Error deleting product:', err);
//       setError(err as Error);
//     }
//   };

//   const handleEdit = async (id: string, updatedProduct: Partial<Product>) => {
//     try {
//       await updateDoc(doc(db, 'products', id), updatedProduct);
//       setProducts(products.map(product => (product.id === id ? { ...product, ...updatedProduct } : product)));
//     } catch (err) {
//       console.error('Error updating product:', err);
//       setError(err as Error);
//     }
//   };

//   if (loading) {
//     return (
//       <Center mt="5rem">
//         <Spinner size="xl" />
//       </Center>
//     );
//   }

//   if (error) {
//     return (
//       <Center mt="5rem">
//         <Alert status="error">
//           <AlertIcon />
//           Error fetching products: {error.message}
//         </Alert>
//       </Center>
//     );
//   }

//   return (
//     <Box>
//       <Header />
//       <Box mt="5rem" p="4">
//         <TableContainer>
//           <Table variant="striped" colorScheme="teal">
//             <TableCaption>Product Management</TableCaption>
//             <Thead>
//               <Tr>
//                 <Th>Image</Th>
//                 <Th>Title</Th>
//                 <Th isNumeric>Price</Th>
//                 <Th>Category</Th>
//                 <Th>Subcategory</Th>
//                 <Th>Edit</Th>
//                 <Th>Delete</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {products.map(product => (
//                 <Tr key={product.id}>
//                   <Td> <Image src={product.imageUrl} boxSize='70px' /> </Td>
//                   <Td>{product.title}</Td>
//                   <Td isNumeric>${product.price}</Td>
//                   <Td>{product.category}</Td>
//                   <Td>{product.subcategory}</Td>
//                   <Td>
//                     <IconButton
//                       aria-label="Edit product"
//                       icon={<EditIcon />}
//                       onClick={() => handleEdit(product.id, { title: 'New Title' })} // Replace with your edit logic
//                     />
//                   </Td>
//                   <Td>
//                     <IconButton
//                       aria-label="Delete product"
//                       icon={<DeleteIcon />}
//                       onClick={() => handleDelete(product.id)}
//                     />
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default AdminPage;





























































import { useEffect, useState } from 'react';
import {
  Box, Table, TableContainer, Thead, Tbody, Tr, Th, Td, TableCaption,
  Spinner, Center, Alert, AlertIcon, IconButton, Image, Input, Flex
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Header from './Header';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  subcategory: string;
  imageUrl: string;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err as Error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await updateDoc(doc(db, 'products', id), updatedProduct);
      const updatedList = products.map(product => (product.id === id ? { ...product, ...updatedProduct } : product));
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      setEditingProductId(null);
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err as Error);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
    setUpdatedProduct(product);
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setUpdatedProduct({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.id.toLowerCase().includes(term.toLowerCase()) ||
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.price.toString().includes(term)
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <Center mt="5rem">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="5rem">
        <Alert status="error">
          <AlertIcon />
          Error fetching products: {error.message}
        </Alert>
      </Center>
    );
  }

  return (
    <Box>
      <Header />
      <Box mt="7rem" p="4">
        <Flex mb="4" py='2rem' px={['2','4','6','8','12']} bg="white" color="black" width="full" h="full" position="sticky" top="62px" zIndex="999">
          <Input
            placeholder="Search by ID, Title or Price"
            value={searchTerm}
            onChange={handleSearchChange}
            mr="2"
          />
          <IconButton aria-label="Search"   bg='white' _hover={{ shadow: "base" }} icon={<SearchIcon />} />
        </Flex>
        <TableContainer>
          <Table >
            <TableCaption>Product Management</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th isNumeric>Price</Th>
                <Th>Category</Th>
                <Th>Subcategory</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProducts.map(product => {
                const [mainCategory, subCategory] = product.category.split(' > ');
                const isEditing = editingProductId === product.id;
                return (
                  <Tr key={product.id} shadow='sm' border='0'>
                     <Td >{product.id}</Td>
                    <Td><Image src={product.imageUrl} w='70px' /></Td>
                    <Td>
                      {isEditing ? (
                        <Input
                          name="title"
                          bg='#f1f1f1'
                          minW='300px'
                          shadow='md'
                          border='0'
                          value={updatedProduct.title || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        product.title
                      )}
                    </Td>
                    <Td isNumeric>
                      {isEditing ? (
                        <Input
                          name="price"
                          bg='#f1f1f1' 
                          minW='300px'
                          shadow='md'
                          border='0'
                          type="number"
                          value={updatedProduct.price || 0}
                          onChange={handleInputChange}
                        />
                      ) : (
                        `#${product.price}`
                      )}
                    </Td>
                    <Td>{mainCategory}</Td>
                    <Td>{subCategory}</Td>
                    <Td>
                      {isEditing ? (
                        <Flex>
                          <IconButton
                            aria-label="Save"
                            icon={<CheckIcon />}
                            onClick={() => handleEdit(product.id)}
                            mr={2}
                            bg='white' _hover={{ shadow: "base" }}
                          />
                          <IconButton
                            aria-label="Cancel"
                            icon={<CloseIcon />}
                            onClick={cancelEditing}
                            bg='white' _hover={{ shadow: "base" }}
                          />
                        </Flex>
                      ) : (
                        <IconButton
                          aria-label="Edit product"
                          icon={<EditIcon />}
                          onClick={() => startEditing(product)}
                          bg='white' _hover={{ shadow: "base" }}
                        />
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete product"
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(product.id)}
                        bg='white' _hover={{ shadow: "base" }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminPage;
