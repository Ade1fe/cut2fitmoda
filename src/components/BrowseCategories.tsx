import { Box, Button, Image, Text } from "@chakra-ui/react"
import { collarshirt, headband2, headbon, native2, nativeattriea, pants2, pantsimg,  productImage3,  shirt2, shirtimg, vintage } from "../assets"
import { useState } from "react";


const BrowseCategories: React.FC = () => {
        const [hoveredImage, setHoveredImage] = useState<string | null>(null);
      
        const handleHover = (imageSrc: string) => {
          setHoveredImage(imageSrc);
        };
      
        const handleLeave = () => {
          setHoveredImage(null);
        };
  return (
    <Box display={['flex']}   flexWrap='wrap' justifyContent='center' gap={['1rem']}>
        <Box className="" pos='relative' width={['280px']} 
        onMouseEnter={() => handleHover(nativeattriea)}
        onMouseLeave={handleLeave}>
            <Image w={['300px']} h={['340px']}   src={hoveredImage === nativeattriea ? nativeattriea : native2} />
          <Box bg='rgba(0,0,0,0.5)' color='white' pos='absolute' p='1rem' bottom='0px' left='0' w='full' className="">
          <Text fontSize={['md','lg', 'x-large']}> Native Wears </Text>
            <Button p='2' mt='0.5rem' color='white' shadow='md' bg='transparent' borderWidth='1px' rounded='10px' borderColor='white'>Shop Now</Button>
          </Box>
        </Box>
        <Box className="" pos='relative' width={['280px']} 
        onMouseEnter={() => handleHover(shirtimg)}
        onMouseLeave={handleLeave}>
            <Image w={['300px']} h={['340px']}  src={hoveredImage === shirtimg ? shirtimg : shirt2} />
          <Box bg='rgba(255,255,255,0.5)' color='black' pos='absolute' p='1rem' bottom='0px' left='0' w='full' className="">
          <Text fontSize={['md','lg', 'x-large']}>T-Shirts </Text>
            <Button p='2' mt='0.5rem' color='black' shadow='md' bg='transparent' borderWidth='1px' rounded='10px' borderColor='black'>Shop Now</Button>
          </Box>
        </Box>
        <Box className="" pos='relative' width={['280px']} 
        onMouseEnter={() => handleHover(pantsimg)}
        onMouseLeave={handleLeave}>
            <Image w={['300px']} h={['340px']} src={hoveredImage === pantsimg ? pantsimg : pants2} />
          <Box bg='rgba(255,255,255,0.5)' color='black' pos='absolute' p='1rem' bottom='0px' left='0' w='full' className="">
          <Text fontSize={['md','lg', 'x-large']}> Shorts and Pants</Text>
            <Button p='2' mt='0.5rem' color='black' shadow='md' bg='transparent' borderWidth='1px' rounded='10px' borderColor='black'>Shop Now</Button>
          </Box>
        </Box>
        <Box className="" pos='relative' width={['280px']} 
        onMouseEnter={() => handleHover(vintage)}
        onMouseLeave={handleLeave}>
            <Image w={['300px']} h={['340px']}  src={hoveredImage === vintage ? vintage : collarshirt} />
            <Box bg='rgba(255,255,255,0.5)' color='black' pos='absolute' p='1rem' bottom='0px' left='0' w='full' className="">
          <Text fontSize={['md','lg', 'x-large']}> Shirts and Vintage </Text>
            <Button p='2' mt='0.5rem' color='black' shadow='md' bg='transparent' borderWidth='1px' rounded='10px' borderColor='black'>Shop Now</Button>
          </Box>
        </Box>
        <Box className="" pos='relative' width={['280px']} 
        onMouseEnter={() => handleHover(headbon)}
        onMouseLeave={handleLeave}>
            <Image w={['300px']} h={['340px']}  src={hoveredImage === headbon ? headbon : headband2}/>
            <Box bg='rgba(255,255,255,0.5)' color='black' pos='absolute' p='1rem' bottom='0px' left='0' w='full' className="">
          <Text fontSize={['md','lg', 'x-large']}>Head accessories</Text>
            <Button p='2' mt='0.5rem' color='black' shadow='md' bg='transparent' borderWidth='1px' rounded='10px' borderColor='black'>Shop Now</Button>
          </Box>
        </Box>
    </Box>
  )
}

export default BrowseCategories
