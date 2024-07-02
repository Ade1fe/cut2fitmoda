import { Box, Icon ,Text} from '@chakra-ui/react'

import { BiLocationPlus } from 'react-icons/bi'
import { HiOutlinePhone } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <div>
        {/* Footer */}
        <Box mt={['15rem', '16rem', '17rem', '18rem', '19rem']} maxW="1340px" mx='auto' mb='20px' px={[4,4,4,4,2,0]}  textAlign='center' display={['block','block', 'flex']} gap='4' justifyContent='space-between' alignItems='center'>
      <Text fontSize="sm" color="gray.500" display={['none', 'none', 'block']}>&copy; 2023 - 2024, All Rights Reserved</Text>
      <Box mt="4" display="flex" flexDirection={["column", 'row']} flexWrap='wrap'  justifyContent={['center']} alignItems="center" gap={['2', '4', '6']}>
        <Text display="flex" alignItems="center" fontSize={['sm']}>
          <Icon as={HiOutlinePhone} mr="2" boxSize='6' color='#b07d62' />
          <Text as='span'>+2349024386013, +2349038257434</Text>
        </Text>
        <Text display="flex" alignItems="center">
          <Icon as={MdEmail} mr="2" boxSize='6' color='#b07d62' />
          <Text as='span'>addypearl09@gmail.com</Text>
        </Text>
        <Text display="flex" alignItems="center">
          <Icon as={BiLocationPlus} mr="2" boxSize='6' color='#b07d62' />
          <Text as='span'>04 Bode Edun Estate, Lagos Nigeria</Text>
        </Text>
      </Box>
      <Text fontSize="sm" color="gray.500" mt='18' display={['block', 'block', 'none']}>&copy; 2023 - 2024, All Rights Reserved</Text>
    </Box>
    </div>
  )
}

export default Footer
