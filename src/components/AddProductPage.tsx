// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   VStack,
//   Heading,
//   Container,
//   useToast,
//   Spinner,
//   Select,
// } from '@chakra-ui/react';
// import { addDoc, collection } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { db, storage } from '../firebase';

// const AddProductPage: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const toast = useToast();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!image) {
//       toast({
//         title: 'No image selected',
//         description: 'Please select an image for the product.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//       return;
//     }

//     setUploading(true);
//     try {
//       const imageRef = ref(storage, `products/${image.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, image);

//       uploadTask.on(
//         'state_changed',
//         () => {}, 
//         (error) => {
//           throw error;
//         },
//         async () => {
//           const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
//           await addDoc(collection(db, 'products'), {
//             title,
//             category,
//             description,
//             price: parseFloat(price),
//             imageUrl,
//           });
//           setUploading(false);
//           toast({
//             title: 'Product added.',
//             description: 'The product has been added successfully.',
//             status: 'success',
//             duration: 5000,
//             isClosable: true,
//           });
//           // Reset form fields
//           setTitle('');
//           setCategory('');
//           setDescription('');
//           setPrice('');
//           setImage(null);
//         }
//       );
//     } catch (error) {
//       setUploading(false);
//       toast({
//         title: 'Error adding product.',
//         description: (error as Error).message,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Container centerContent>
//       <Box
//         p={8}
//         maxWidth="500px"
//         borderWidth={1}
//         borderRadius={8}
//         boxShadow="lg"
//         bg="white"
//       >
//         <VStack spacing={4}>
//           <Heading as="h1" size="xl" color="teal.500">
//             Add New Product
//           </Heading>
//           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//             <FormControl id="title" isRequired>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Enter product title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="category" isRequired mt={4}>
//               <FormLabel>Category</FormLabel>
//               <Select
//   placeholder="Select category"
//   value={category}
//   onChange={(e) => setCategory(e.target.value)}
// >
//   <option value="tops">Tops</option>
//   <option value="shirts">Shirts</option>
//   <option value="blouses">Blouses</option>
//   <option value="sweaters">Sweaters</option>
//   <option value="tees">T-Shirts</option>
//   <option value="tank-tops">Tank Tops</option>
//   <option value="crop-tops">Crop Tops</option>
//   <option value="cardigans">Cardigans</option>
//   <option value="two-piece">Two Piece</option>
//   <option value="vintage">Vintage</option>
//   <option value="hoodies">Hoodies</option>
//   <option value="jackets">Jackets</option>
//   <option value="blazers">Blazers</option>
//   <option value="sweatshirts">Sweatshirts</option>
//   <option value="vests">Vests</option>
//   <option value="polo-shirts">Polo Shirts</option>
//   <option value="button-downs">Button-Down Shirts</option>
//   <option value="long-sleeve">Long Sleeve Tops</option>
//   <option value="short-sleeve">Short Sleeve Tops</option>
//   <option value="muscle-tops">Muscle Tops</option>
//   <option value="underwear">Underwear</option>
//   <option value="accessories">Accessories</option>
//   <option value="coats">Coats</option>
//   <option value="shorts">Shorts</option>
//   <option value="dresses">Dresses</option>
//   <option value="skirts">Skirts</option>
  
// </Select>

//             </FormControl>
//             <FormControl id="description" isRequired mt={4}>
//               <FormLabel>Description</FormLabel>
//               <Textarea
//                 placeholder="Enter product description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="price" isRequired mt={4}>
//               <FormLabel>Price</FormLabel>
//               <Input
//                 type="number"
//                 placeholder="Enter product price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="image" isRequired mt={4}>
//               <FormLabel>Product Image</FormLabel>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
//               />
//             </FormControl>
//             <Button
//               type="submit"
//               colorScheme="teal"
//               width="full"
//               mt={4}
//               isDisabled={uploading}
//             >
//               {uploading ? <Spinner size="sm" /> : 'Add Product'}
//             </Button>
//           </form>
//         </VStack>
//       </Box>
//     </Container>
//   );
// };

// export default AddProductPage;
































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

// Define type for categories object
type Categories = {
  [key: string]: string[];
};

const categories: Categories = {
  "Native Wears": ["Ankara", "Aso Oke", "Dashiki", "Kente"],
  "Shorts and Pants": ["Cargo Pants", "Chinos", "Denim Shorts", "Joggers"],
  "T-Shirts and Shirts": ["Polo Shirts", "Button-Down Shirts", "Tees", "Long Sleeve"],
  "Head Accessories": ["Caps", "Hats", "Headbands", "Scarves"],
  "Dresses":["Casual dresses", "Glam dresses", "Maxi dresses", "Shirt dresses", "Work dresses", "Wrap dresses"],
  "Accessories": ["Bags","Belts","Bracelets","Earrings", "Necklaces", "Rings", ""],


};

const AddProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleMainCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMainCategory(event.target.value);
    setSubCategory('');
  };

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

    if (!mainCategory || !subCategory) {
      toast({
        title: 'Category not selected',
        description: 'Please select both main category and sub category.',
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
            category: `${mainCategory} > ${subCategory}`,
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
          setMainCategory('');
          setSubCategory('');
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
            <FormControl id="mainCategory" isRequired mt={4}>
              <FormLabel>Main Category</FormLabel>
              <Select
                placeholder="Select main category"
                value={mainCategory}
                onChange={handleMainCategoryChange}
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormControl>
            {mainCategory && (
              <FormControl id="subCategory" isRequired mt={4}>
                <FormLabel>Sub Category</FormLabel>
                <Select
                  placeholder="Select sub category"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {categories[mainCategory].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
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
