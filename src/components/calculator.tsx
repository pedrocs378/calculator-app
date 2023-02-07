/* eslint-disable no-eval */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'

import { ActionButton, type ActionType } from './action-button'

const OPERATORS = ['+', '-', '/', '*', '%']
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',']

export function Calculator() {
  const previousOperation = useRef('')

  const [currentOperation, setCurrentOperation] = useState('0')

  function handleUpdateOperation(value: string, actionType: ActionType) {
    if (actionType === 'digit') {
      setCurrentOperation((prevState) => {
        if (prevState === 'error') {
          return value
        }

        if (value === '.') {
          const charGroups = prevState.split(' ')
          const lastCharGroup = charGroups[charGroups.length - 1]

          if (lastCharGroup.includes('.')) {
            return prevState
          }

          if (OPERATORS.includes(lastCharGroup)) {
            return `${prevState} 0${value}`
          }

          return `${prevState}${value}`
        }

        if (prevState === '0') {
          return value
        }

        const lastChar = prevState[prevState.length - 1]
        const space = OPERATORS.includes(lastChar) ? ' ' : ''

        return `${prevState}${space}${value}`
      })
    } else if (actionType === 'operator') {
      setCurrentOperation((prevState) => {
        if (prevState === 'error') {
          return `0 ${value}`
        }

        const lastChar = prevState[prevState.length - 1]

        if (OPERATORS.includes(lastChar)) {
          return prevState.replace(lastChar, value)
        }

        return `${prevState} ${value}`
      })
    }
  }

  function handleClear(value: string) {
    if (value === 'CE') {
      setCurrentOperation('0')
    } else {
      setCurrentOperation((prevState) => {
        const stateWithouSpaces = prevState.trim()

        if (stateWithouSpaces.length > 1) {
          const charToRemove = stateWithouSpaces[stateWithouSpaces.length - 1]
          const indexOfCharToRemoveOnState = prevState.lastIndexOf(charToRemove)

          return prevState.slice(0, indexOfCharToRemoveOnState)
        } else {
          return '0'
        }
      })
    }
  }

  function handleCalcPercentage() {
    setCurrentOperation((prevState) => {
      if (prevState === '0') {
        return prevState
      }

      const charGroups = prevState.split(' ')
      const lastCharGroup = charGroups[charGroups.length - 1]

      if (OPERATORS.includes(lastCharGroup)) {
        return prevState
      }

      const charGroupWithoutComma =
        lastCharGroup[lastCharGroup.length - 1] === '.'
          ? lastCharGroup.replace('.', '')
          : lastCharGroup

      const charGroupAsNumber = Number(charGroupWithoutComma)
      const calculatedPercentage = charGroupAsNumber / 100
      charGroups.splice(charGroups.length - 1, 1, String(calculatedPercentage))

      return charGroups.join(' ')
    })
  }

  const handleCalcOperation = useCallback(() => {
    setCurrentOperation((prevState) => {
      if (prevState === '0') return prevState

      previousOperation.current = prevState
      const calculatedOperation = eval(prevState)

      if (isNaN(calculatedOperation)) {
        return 'error'
      } else {
        return String(calculatedOperation)
      }
    })
  }, [])

  const normalizedOperationLabel = useMemo(() => {
    return {
      current:
        currentOperation === 'error'
          ? 'Erro'
          : currentOperation.replaceAll('.', ',').replaceAll('*', 'x'),
      previous: previousOperation.current
        .replaceAll('.', ',')
        .replaceAll('*', 'x'),
    }
  }, [currentOperation])

  useEffect(() => {
    function updateOperationByKeyboard(event: KeyboardEvent) {
      if (DIGITS.includes(event.key)) {
        if (event.key === ',') {
          handleUpdateOperation('.', 'digit')
        } else {
          handleUpdateOperation(event.key, 'digit')
        }
      }
      if (OPERATORS.includes(event.key)) {
        if (event.key === '%') {
          handleCalcPercentage()
        } else {
          handleUpdateOperation(event.key, 'operator')
        }
      }

      if (event.key === 'Backspace') {
        handleClear('C')
      }
      if (event.key === 'Delete') {
        handleClear('CE')
      }
      if (event.key === 'Enter') {
        handleCalcOperation()
      }
    }

    document.addEventListener('keypress', updateOperationByKeyboard)

    return () => {
      document.removeEventListener('keypress', updateOperationByKeyboard)
    }
  }, [handleCalcOperation])

  return (
    <Box
      p="8"
      pt="12"
      rounded="3xl"
      bg="gray.900"
      w="full"
      maxW="sm"
      boxShadow="lg"
      borderTop="4px"
      borderColor="gray.600"
    >
      <Flex flexDir="column" align="flex-end" maxW="full" overflow="hidden">
        <Text as="span" color="gray.600" minH="6" whiteSpace="nowrap">
          {normalizedOperationLabel.previous}
        </Text>
        <Text as="strong" fontSize="3xl" whiteSpace="nowrap">
          {normalizedOperationLabel.current}
        </Text>
      </Flex>

      <SimpleGrid gridAutoRows="auto" columns={4} gap="4" mt="8">
        <ActionButton
          value="CE"
          actionType="action"
          colorScheme="blue"
          onAction={handleClear}
        />
        <ActionButton value="C" actionType="action" onAction={handleClear} />
        <ActionButton
          value="%"
          actionType="operator"
          onAction={handleCalcPercentage}
        />
        <ActionButton
          value="/"
          actionType="operator"
          colorScheme="blue"
          onAction={handleUpdateOperation}
        />
        <ActionButton value="7" onAction={handleUpdateOperation} />
        <ActionButton value="8" onAction={handleUpdateOperation} />
        <ActionButton value="9" onAction={handleUpdateOperation} />
        <ActionButton
          value="*"
          valueLabel="x"
          actionType="operator"
          colorScheme="blue"
          onAction={handleUpdateOperation}
        />
        <ActionButton value="4" onAction={handleUpdateOperation} />
        <ActionButton value="5" onAction={handleUpdateOperation} />
        <ActionButton value="6" onAction={handleUpdateOperation} />
        <ActionButton
          value="-"
          actionType="operator"
          colorScheme="blue"
          onAction={handleUpdateOperation}
        />
        <ActionButton value="1" onAction={handleUpdateOperation} />
        <ActionButton value="2" onAction={handleUpdateOperation} />
        <ActionButton value="3" onAction={handleUpdateOperation} />
        <ActionButton
          value="+"
          actionType="operator"
          colorScheme="blue"
          onAction={handleUpdateOperation}
        />
        <Box />
        <ActionButton
          // gridArea="zero"
          value="0"
          onAction={handleUpdateOperation}
        />
        <ActionButton
          value="."
          valueLabel=","
          onAction={handleUpdateOperation}
        />
        <ActionButton
          value="="
          actionType="action"
          colorScheme="blue"
          variant="solid"
          isDisabled={currentOperation === '0'}
          onAction={handleCalcOperation}
        />
      </SimpleGrid>
    </Box>
  )
}
