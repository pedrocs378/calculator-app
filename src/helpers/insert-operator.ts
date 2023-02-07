import { INITIAL_OPERATION, OPERATORS } from './constants'

function calcPercentage(operation: string) {
  if (operation === INITIAL_OPERATION) {
    return operation
  }

  const charGroups = operation.split(' ')
  const lastCharGroup = charGroups[charGroups.length - 1]

  if (OPERATORS.includes(lastCharGroup)) {
    return operation
  }

  const charGroupWithoutComma =
    lastCharGroup[lastCharGroup.length - 1] === '.'
      ? lastCharGroup.replace('.', '')
      : lastCharGroup

  const charGroupAsNumber = Number(charGroupWithoutComma)
  const calculatedPercentage = charGroupAsNumber / 100
  charGroups.splice(charGroups.length - 1, 1, String(calculatedPercentage))

  return charGroups.join(' ')
}

export function insertOperator(operator: string, operation: string) {
  if (operation === 'error') {
    return `${INITIAL_OPERATION} ${operator}`
  }

  if (operator === '%') {
    return calcPercentage(operation)
  }

  const lastChar = operation[operation.length - 1]

  if (OPERATORS.includes(lastChar)) {
    return operation.replace(lastChar, operator)
  }

  return `${operation} ${operator}`
}
