import React from 'react'
import { Container, Typography } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Título da Página
      </Typography>
      <div>{children}</div>
    </Container>
  )
}

export default Layout
