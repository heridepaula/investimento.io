import React from 'react'
import { Container } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div>{children}</div>
    </Container>
  )
}

export default Layout
