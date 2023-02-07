import { INITIAL_OPERATION, OPERATORS } from './constants'

export function insertDigit(digit: string, operation: string) {
  if (operation === 'error') {
    return digit
  }

  if (digit === '.') {
    const charGroups = operation.split(' ')
    const lastCharGroup = charGroups[charGroups.length - 1]

    if (lastCharGroup.includes('.')) {
      return operation
    }

    if (OPERATORS.includes(lastCharGroup)) {
      return `${operation} 0${digit}`
    }

    return `${operation}${digit}`
  }

  if (operation === INITIAL_OPERATION) {
    return digit
  }

  const lastChar = operation[operation.length - 1]
  const space = OPERATORS.includes(lastChar) ? ' ' : ''

  return `${operation}${space}${digit}`
}
