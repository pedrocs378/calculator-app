import { useCallback } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export type ButtonType = 'digit' | 'operator' | 'action'

type CalculatorButtonProps = Omit<ButtonProps, 'children'> & {
  buttonType?: ButtonType
  value: string
  valueLabel?: string
  onAction?: (value: string, buttonType: ButtonType) => void
}

export function CalculatorButton({
  buttonType = 'digit',
  value,
  valueLabel,
  onAction,
  ...buttonProps
}: CalculatorButtonProps) {
  const handleClick = useCallback(() => {
    onAction?.(value, buttonType)
  }, [onAction, value, buttonType])

  return (
    <Button
      variant="ghost"
      size="lg"
      colorScheme="gray"
      {...buttonProps}
      onClick={handleClick}
    >
      {valueLabel ?? value}
    </Button>
  )
}
