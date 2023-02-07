import { INITIAL_OPERATION } from './constants'

export function removeLastDigitOrOperator(operation: string) {
  const operationWithouSpaces = operation.trim()

  if (operationWithouSpaces.length > 1) {
    const charToRemove = operationWithouSpaces[operationWithouSpaces.length - 1]
    const indexOfCharToRemoveOnOperation = operation.lastIndexOf(charToRemove)

    return operation.slice(0, indexOfCharToRemoveOnOperation)
  } else {
    return INITIAL_OPERATION
  }
}
