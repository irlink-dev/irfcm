import React, { useState } from 'react'

export const LoadingContext = React.createContext({
  isLoading: false,
  showProgress: () => {
    /* empty */
  },
  dismissProgress: () => {
    /* empty */
  },
})

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const showProgress = () => setIsLoading(true)
  const dismissProgress = () => setIsLoading(false)

  return (
    <LoadingContext.Provider
      value={{ isLoading, showProgress, dismissProgress }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
