import { useEffect, useState, RefObject } from 'react'

export function useClickOutside(ref: RefObject<HTMLElement>) {
  const [hasClickedOutside, setHasClickedOutside] = useState(false)

  const resetClickedOutside = () => {
    setHasClickedOutside(false)
  }

  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setHasClickedOutside(true)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return { hasClickedOutside, resetClickedOutside }
}
