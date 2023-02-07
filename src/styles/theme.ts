import {
  type ColorMode,
  type ColorModeProviderProps,
  extendTheme,
} from '@chakra-ui/react'

export const colorModeManager: ColorModeProviderProps['colorModeManager'] = {
  type: 'localStorage',
  set: (value) => {
    localStorage.setItem('@calculator:colorMode', value)
  },
  get: (init) => {
    const storagedColorMode = localStorage.getItem('@calculator:colorMode')

    if (!storagedColorMode) return init

    return storagedColorMode as ColorMode
  },
}

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
