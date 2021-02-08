import { useState, useEffect } from 'react'
import { baseURL } from './api'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io-client')

export const useSocket = (
  namespace?: string,
  opt?: SocketIOClient.ConnectOpts
): SocketIOClient.Socket | null => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)

  useEffect(() => {
    const socketIo = io(`${baseURL}/${namespace}/`, opt)
    console.log(socketIo)
    console.log(`${baseURL}/${namespace}`)
    setSocket(socketIo)
    return () => {
      socketIo.disconnect()
    }
  }, [namespace, opt])

  return socket
}
