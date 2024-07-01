import { Box, Icon } from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'

const WhatsApp = () => {

    const shareOnWhatsApp = () => {
        const message = ` `;
        const whatsappLink = `https://wa.me/2349038257434?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
      };

  return (
    <Box>
      <Box onClick={() => shareOnWhatsApp()} shadow='md' bg='green.400' pos='fixed' left='20px' bottom='30px' borderRadius='5px' color='white' p='2' display='flex' alignContent='center' justifyContent='center' w='fit-content' className="">
        <Icon as={BsWhatsapp}  boxSize={[7,8,9]}/>
      </Box>
    </Box>
  )
}

export default WhatsApp
