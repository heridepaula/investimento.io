import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Menu from '../components/Menu'
import { Container } from '@mui/material'

const theme = createTheme()

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}

export default App
