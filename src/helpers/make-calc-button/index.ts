import { type ButtonType } from '../../components/calculator-button'

import { actionButtonPayload } from './payloads/action-button-payload'
import { operatorButtonPayload } from './payloads/operator-button-payload'

export type MakeCalcButtonProps = {
  value: string
  valueLabel?: string
  buttonType?: ButtonType
}

export type ButtonPayload = {
  value: string
  valueLabel: string
  buttonType: ButtonType
  colorScheme: 'blue' | 'gray'
}

export function makeCalcButton({
  value,
  buttonType = 'digit',
  valueLabel,
}: MakeCalcButtonProps): ButtonPayload {
  if (buttonType === 'action') {
    return actionButtonPayload(value)
  } else if (buttonType === 'operator') {
    return operatorButtonPayload(value)
  }

  return {
    value,
    valueLabel: valueLabel ?? value,
    colorScheme: 'gray',
    buttonType,
  }
}
