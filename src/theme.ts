import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    mh: `'Rubik', sans-serif`,
    mb: `'Jomhuria', serif`,
    mb1: `'Amiri', serif`,

  },
})

export default theme
