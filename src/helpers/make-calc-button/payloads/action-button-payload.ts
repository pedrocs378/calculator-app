import { Actions } from '../../enums'

import { type ButtonPayload } from '..'

export function actionButtonPayload(action: string): ButtonPayload {
  if (action === Actions.Delete) {
    return {
      value: Actions.Delete,
      valueLabel: 'CE',
      colorScheme: 'blue',
      buttonType: 'action',
    }
  } else if (action === Actions.Backspace) {
    return {
      value: Actions.Backspace,
      buttonType: 'action',
      valueLabel: 'C',
      colorScheme: 'gray',
    }
  } else {
    return {
      value: Actions.Enter,
      valueLabel: '=',
      buttonType: 'action',
      colorScheme: 'blue',
    }
  }
}
