import { useEffect, useState } from 'react'

// Loads data from Local Storage if key exists, otherwise creates key with initialData
export function useLocalStorageState<State>(initialState: State, key: string) {
  const [state, setState] = useState<State>(() => {
    // If key exists, gather data
    const lsState = localStorage.getItem(key)
    if (lsState) {
      return JSON.parse(lsState)
    }
    // Creates new key with initial values
    return initialState
  })

  // Define an effect to update the Local Storage data whenever the "state" variable changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState] as const
}
