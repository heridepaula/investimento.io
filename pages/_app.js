import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import dynamic from 'next/dynamic'
import { Container } from '@mui/material'

const Menu = dynamic(() => import('../components/Menu'), { ssr: false })

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
