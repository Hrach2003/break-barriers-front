import { useState, useEffect } from 'react'
import { baseURL } from './api'
import io from 'socket.io-client'

export const useSocket = (
  namespace?: string,
  opt?: SocketIOClient.ConnectOpts
): SocketIOClient.Socket | null => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)

  useEffect(() => {
    const socketIo = io(baseURL, opt)
    console.log(socketIo)
    setSocket(socketIo)
    return () => {
      socketIo.disconnect()
    }
  }, [namespace, opt])

  return socket
}
