import {
  type ColorMode,
  type ColorModeProviderProps,
  extendTheme,
  type StyleFunctionProps,
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
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },
    }),
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
