import React, { useState } from 'react'
import IMessage from '@/types/IMessage'
import RequestType from '@/types/RequestType'

export const MessageContext = React.createContext<IMessageContext>({
  message: {} as IMessage,
  setMessage: ((message: IMessage) => {}) as React.Dispatch<
    React.SetStateAction<IMessage>
  >,
})

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  /** 메시지 */
  const [message, setMessage] = useState<IMessage>({
    authKey: 'no authorization key',
    phoneNumber: '',
    token: '',
    date: '',
    type: String(RequestType.UPLOAD_LOGS),
    isIncludeRecord: false,
    priority: 'high',
  })

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

interface IMessageContext {
  message: IMessage
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>
}
