import { useCallback } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export type ActionType = 'digit' | 'operator' | 'action'

type ActionButtonProps = Omit<ButtonProps, 'children'> & {
  actionType?: ActionType
  value: string
  valueLabel?: string
  onAction?: (value: string, actionType: ActionType) => void
}

export function ActionButton({
  actionType = 'digit',
  value,
  valueLabel,
  onAction,
  ...buttonProps
}: ActionButtonProps) {
  const handleClick = useCallback(() => {
    onAction?.(value, actionType)
  }, [onAction, value, actionType])

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
