import { Center, ChakraProvider } from '@chakra-ui/react'

import { Calculator } from './components/calculator'
import { Header } from './components/header'

import { colorModeManager, theme } from './styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      <Header />

      <Center minH="calc(100vh - 4rem)" px="4">
        <Calculator />
      </Center>
    </ChakraProvider>
  )
}
