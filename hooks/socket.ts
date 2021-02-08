import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { baseURL } from './api'

export const useSocket = (
  namespace?: string,
  opt?: SocketIOClient.ConnectOpts
): SocketIOClient.Socket | null => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)

  useEffect(() => {
    const socketIo = io(`${baseURL}/${namespace}`, opt)
    console.log(`${baseURL}/${namespace}`)
    setSocket(socketIo)
    return () => {
      socketIo.disconnect()
    }
  }, [namespace, opt])

  return socket
}
