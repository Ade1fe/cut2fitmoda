import { Box } from '@chakra-ui/react'
import { Advert, HomepageComp, Navbar, WhatsApp,  } from '../../components'

const HomePage = () => {
  return (
    <Box>
     <div className=""><Navbar /> </div>
     <div className=""> <HomepageComp /> </div>
     <WhatsApp />
     <Advert />
    </Box>
  )
}

export default HomePage
