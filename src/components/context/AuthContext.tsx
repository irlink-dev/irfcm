import React, { useState } from 'react'

export const AuthContext = React.createContext<IAuthContext>({
  /**
   * 액세스 토큰.
   */
  accessToken: {} as IClientTokens,
  setAccessToken: ((accessToken: IClientTokens) => {}) as React.Dispatch<
    React.SetStateAction<IClientTokens>
  >,

  /**
   * 리프레시 토큰.
   */
  refreshToken: {} as IClientTokens,
  setRefreshToken: ((refreshToken: IClientTokens) => {}) as React.Dispatch<
    React.SetStateAction<IClientTokens>
  >,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  /** 액세스 토큰 */
  const [accessToken, setAccessToken] = useState({
    lpoint: '',
  })
  /** 리프레시 토큰 */
  const [refreshToken, setRefreshToken] = useState({
    lpoint: '',
  })

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

interface IClientTokens {
  lpoint: string
}

interface IAuthContext {
  accessToken: IClientTokens
  setAccessToken: React.Dispatch<React.SetStateAction<IClientTokens>>
  refreshToken: IClientTokens
  setRefreshToken: React.Dispatch<React.SetStateAction<IClientTokens>>
}
