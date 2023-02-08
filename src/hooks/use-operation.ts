import { useCallback, useRef, useState } from 'react'

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
  const previous = useRef('')

  const [current, setCurrent] = useState(initialOperation)

  const setState = useCallback(
    (newState: React.SetStateAction<string>, setPrevious = false) => {
      const stateValue =
        typeof newState === 'string' ? newState : newState(current)

      if (setPrevious) {
        previous.current = current
      }

      setCurrent(stateValue)
    },
    [current],
  )

  return [{ previous: previous.current, current }, setState]
}
