import { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  wrapperElement.style.position = 'absolute'
  wrapperElement.style.top = '0px'
  wrapperElement.style.left = '0px'
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export const ReactPortal: FC<{ children: ReactNode; wrapperId: string }> = ({
  children,
  wrapperId = 'react-portal-wrapper'
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (element == null) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode != null) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}
