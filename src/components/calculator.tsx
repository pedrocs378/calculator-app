/* eslint-disable no-eval */
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { useOperation } from '../hooks/use-operation'

import { CalculatorButton, type ButtonType } from './calculator-button'

import {
  ACTIONS,
  CALCULATOR_BUTTONS,
  DIGITS,
  INITIAL_OPERATION,
  OPERATORS,
} from '../helpers/constants'
import { Actions } from '../helpers/enums'
import {
  insertDigit,
  insertOperator,
  removeLastDigitOrOperator,
  calcOperation,
} from '../helpers'

export function Calculator() {
  const [{ current, previous }, setOperation] = useOperation(INITIAL_OPERATION)

  const containerBg = useColorModeValue('gray.50', 'gray.900')
  const containerBorderColor = useColorModeValue('gray.300', 'gray.600')
  const previousTextColor = useColorModeValue('gray.400', 'gray.600')

  const handleActionButton = useCallback(
    (buttonValue: string) => {
      if (buttonValue === Actions.Delete) {
        setOperation(INITIAL_OPERATION)
      } else if (buttonValue === Actions.Backspace) {
        setOperation(removeLastDigitOrOperator)
      } else {
        setOperation((prevState) => {
          const calculated = calcOperation(prevState)

          return calculated.value
        }, true)
      }
    },
    [setOperation],
  )

  const handleDigitButton = useCallback(
    (buttonValue: string) => {
      setOperation((prevState) => {
        return insertDigit(buttonValue, prevState)
      })
    },
    [setOperation],
  )

  const handleOperatorButton = useCallback(
    (buttonValue: string) => {
      setOperation((prevState) => {
        return insertOperator(buttonValue, prevState)
      })
    },
    [setOperation],
  )

  const handleButtonType = useCallback(
    (value: string, buttonType: ButtonType) => {
      const buttonTypeFns = {
        action: handleActionButton,
        digit: handleDigitButton,
        operator: handleOperatorButton,
      } as const

      const buttonTypeFn = buttonTypeFns[buttonType]

      buttonTypeFn(value)
    },
    [handleActionButton, handleDigitButton, handleOperatorButton],
  )

  const normalizedOperationLabel = useMemo(() => {
    return {
      current:
        current === 'error'
          ? 'Erro'
          : current.replaceAll('.', ',').replaceAll('*', 'x'),
      previous: previous.replaceAll('.', ',').replaceAll('*', 'x'),
    }
  }, [current, previous])

  useEffect(() => {
    function updateOperationByKeyboard(event: KeyboardEvent) {
      if (DIGITS.includes(event.key)) {
        const key = event.key.replace(',', '.')

        handleButtonType(key, 'digit')
      }
      if (OPERATORS.includes(event.key)) {
        handleButtonType(event.key, 'operator')
      }

      if (ACTIONS.includes(event.key as Actions)) {
        handleButtonType(event.key, 'action')
      }

      if (event.key === 'Escape') {
        handleButtonType(Actions.Delete, 'action')
      }
    }

    document.addEventListener('keydown', updateOperationByKeyboard)

    return () => {
      document.removeEventListener('keydown', updateOperationByKeyboard)
    }
  }, [handleButtonType])

  return (
    <Box
      p="8"
      pt="12"
      rounded="3xl"
      bg={containerBg}
      w="full"
      maxW="sm"
      boxShadow="lg"
      borderTop="4px"
      borderColor={containerBorderColor}
    >
      <Flex flexDir="column" align="flex-end" maxW="full" overflow="hidden">
        <Text as="span" color={previousTextColor} minH="6" whiteSpace="nowrap">
          {normalizedOperationLabel.previous}
        </Text>
        <Text as="strong" fontSize="3xl" whiteSpace="nowrap">
          {normalizedOperationLabel.current}
        </Text>
      </Flex>

      <SimpleGrid gridAutoRows="auto" columns={4} gap="4" mt="8">
        {CALCULATOR_BUTTONS.map((button) => {
          const isEnterButton = button.value === Actions.Enter
          const variant = isEnterButton ? 'solid' : 'ghost'

          return (
            <Fragment key={button.value}>
              {button.value ? (
                <CalculatorButton
                  value={button.value}
                  valueLabel={button.valueLabel}
                  buttonType={button.buttonType}
                  colorScheme={button.colorScheme}
                  variant={variant}
                  isDisabled={isEnterButton && current === '0'}
                  onAction={handleButtonType}
                />
              ) : (
                <Box />
              )}
            </Fragment>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
