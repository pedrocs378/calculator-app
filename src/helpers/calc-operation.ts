/* eslint-disable no-eval */
import { INITIAL_OPERATION } from './constants'

export function calcOperation(operation: string) {
  if (operation === INITIAL_OPERATION) {
    return { previous: '', value: operation }
  }

  const previous = operation
  const calculatedOperation = eval(operation)

  if (isNaN(calculatedOperation)) {
    return { previous, value: 'error' }
  } else {
    return { previous, value: String(calculatedOperation) }
  }
}
