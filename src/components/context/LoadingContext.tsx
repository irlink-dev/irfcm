import React, { useState } from 'react'

export const LoadingContext = React.createContext({
  /**
   * 로딩 여부.
   */
  isLoading: false,

  /**
   * Progress 표시.
   */
  showProgress: () => {},

  /**
   * Progress 숨김.
   */
  dismissProgress: () => {},
})

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  /** 로딩 여부 */
  const [isLoading, setIsLoading] = useState(false)
  /** Progress 표시 */
  const showProgress = () => setIsLoading(true)
  /** Progress 숨김 */
  const dismissProgress = () => setIsLoading(false)

  return (
    <LoadingContext.Provider
      value={{ isLoading, showProgress, dismissProgress }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
