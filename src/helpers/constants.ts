import { Actions } from './enums'
import { makeCalcButton } from './make-calc-button'

export const INITIAL_OPERATION = '0'
export const OPERATORS = ['+', '-', '/', '*', '%']
export const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',']
export const ACTIONS = [Actions.Backspace, Actions.Delete, Actions.Enter]

export const CALCULATOR_BUTTONS = [
  makeCalcButton({ value: Actions.Delete, buttonType: 'action' }),
  makeCalcButton({ value: Actions.Backspace, buttonType: 'action' }),
  makeCalcButton({ value: '%', buttonType: 'operator' }),
  makeCalcButton({ value: '/', buttonType: 'operator' }),
  makeCalcButton({ value: '7' }),
  makeCalcButton({ value: '8' }),
  makeCalcButton({ value: '9' }),
  makeCalcButton({ value: '*', buttonType: 'operator' }),
  makeCalcButton({ value: '4' }),
  makeCalcButton({ value: '5' }),
  makeCalcButton({ value: '6' }),
  makeCalcButton({ value: '-', buttonType: 'operator' }),
  makeCalcButton({ value: '1' }),
  makeCalcButton({ value: '2' }),
  makeCalcButton({ value: '3' }),
  makeCalcButton({ value: '+', buttonType: 'operator' }),
  makeCalcButton({ value: '' }),
  makeCalcButton({ value: '0' }),
  makeCalcButton({ value: '.', valueLabel: ',' }),
  makeCalcButton({ value: Actions.Enter, buttonType: 'action' }),
]
