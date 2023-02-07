import { Center, ChakraProvider } from '@chakra-ui/react'

import { Calculator } from './components/calculator'

import { colorModeManager, theme } from './styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      <Center h="100vh" px="4">
        <Calculator />
      </Center>
    </ChakraProvider>
  )
}
