import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSocket } from '../../hooks/socket'
import { IMessage } from '../../interfaces/message.interface'

export default function RoomId(): JSX.Element {
  const router = useRouter()
  const socket = useSocket('room')
  const { roomId } = router.query

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log(socket.id)
      })
      socket.on('admin-messages', (message: IMessage) => {
        console.log(message)
      })
      socket.emit('joined-room', { roomId })
      console.log('connected: ', socket.connected)
    } else console.log('connecting ...')
  }, [socket, roomId])

  return <div></div>
}
