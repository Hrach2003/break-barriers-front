import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSocket } from '../../../hooks/socket'
import { IMessage } from '../../../interfaces/message.interface'
import { AxiosResponse } from 'axios'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAPI } from '../../../hooks/api'
import { IRoom } from '../../../interfaces/room.interface'
import Head from 'next/head'

export default function RoomId({
  room,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter()
  const socket = useSocket('rooms')
  const { roomId } = router.query

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log(socket.id)
      })
      socket.on('error', (err: any) => {
        console.log('Sorry, there seems to be an issue with the connection!')
        console.log(err)
      })
      socket.on('admin-messages', (message: IMessage) => {
        console.log(message)
      })
      socket.emit('joined-room', { roomId })
      console.log('connected: ', socket.connected)
    } else console.log('connecting ...')
  }, [socket, roomId])

  return (
    <div>
      <Head>
        <title>{room.title} | Break Barriers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <pre>{JSON.stringify(room, null, 2)}</pre>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: rooms } = (await getAPI().get('/rooms/')) as AxiosResponse<
    IRoom[]
  >
  const paths = rooms.map(({ _id }) => ({
    params: { roomId: _id },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  room: IRoom
}> = async ({ params }) => {
  const { data: room } = (await getAPI().get(
    `/rooms/${params?.roomId}/`
  )) as AxiosResponse<IRoom>
  return {
    props: {
      room,
    },
    revalidate: 1,
  }
}
