import { type ButtonPayload } from '..'

export function operatorButtonPayload(operator: string): ButtonPayload {
  if (operator === '%') {
    return {
      value: '%',
      valueLabel: '%',
      colorScheme: 'gray',
      buttonType: 'operator',
    }
  }

  if (operator === '*') {
    return {
      value: '*',
      valueLabel: 'x',
      buttonType: 'operator',
      colorScheme: 'blue',
    }
  }

  return {
    value: operator,
    valueLabel: operator,
    colorScheme: 'blue',
    buttonType: 'operator',
  }
}
