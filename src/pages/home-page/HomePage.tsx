import { Box } from '@chakra-ui/react'
import { HomepageComp, Navbar,  } from '../../components'

const HomePage = () => {
  return (
    <Box>
     <div className=""><Navbar /> </div>
     <div className=""> <HomepageComp /> </div>
    </Box>
  )
}

export default HomePage
