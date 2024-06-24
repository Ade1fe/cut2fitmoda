import { Box } from '@chakra-ui/react'
import React from 'react'
import { Navbar } from '../../components'
import AddProductPage from '../../components/AddProductPage'

const AdminPage = () => {
  return (
    <Box >
        <Navbar />
      <AddProductPage />
    </Box>
  )
}

export default AdminPage
