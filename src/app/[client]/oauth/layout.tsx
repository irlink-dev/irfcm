'use client'

import React from 'react'
import { AuthProvider } from '@/components/context/AuthContext'

const ClientOAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default ClientOAuthLayout
