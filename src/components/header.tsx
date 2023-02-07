import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex as="header" px="4" h="16" align="center" justify="flex-end">
      <IconButton
        aria-label={
          colorMode === 'dark'
            ? 'Mudar para tema claro'
            : 'Mudar para tema escuro'
        }
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}
