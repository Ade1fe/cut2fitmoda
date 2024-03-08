import { Box } from '@chakra-ui/react'
import { HomepageComp, Navbar, Products } from '../../components'

const HomePage = () => {
  return (
    <Box>
     <div className=""><Navbar /> </div>
     <div className=""> <HomepageComp /> </div>
     <div className=""><Products /> </div>
    </Box>
  )
}

export default HomePage
