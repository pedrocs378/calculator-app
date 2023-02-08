import { useCallback, useState } from 'react'

type Operation = {
  previous: string
  current: string
}

type SetState = (
  newState: React.SetStateAction<string>,
  setPrevious?: boolean,
) => void

type UseOperation = [Operation, SetState]

export function useOperation(initialOperation = ''): UseOperation {
  const [previous, setPrevious] = useState('')
  const [current, setCurrent] = useState(initialOperation)

  const setState = useCallback(
    (newState: React.SetStateAction<string>, shouldSetPrevious = false) => {
      const stateValue =
        typeof newState === 'string' ? newState : newState(current)

      if (shouldSetPrevious) {
        setPrevious(current)
      }

      setCurrent(stateValue)
    },
    [current],
  )

  return [{ previous, current }, setState]
}
