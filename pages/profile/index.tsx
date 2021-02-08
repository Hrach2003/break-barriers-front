import { AxiosResponse } from 'axios'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getAPI } from '../../hooks/api'
import { IRoom } from '../../interfaces/room.interface'
import { IUser } from '../../interfaces/user.interface'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Scrollbar } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import { ThemeSelect } from '../../components/theme-select/themeSelect'
import { Dash } from '../../components/dash/dash'
import { Center } from '../../atoms/center'

SwiperCore.use([Scrollbar])

export default function Profile({
  rooms,
}: // users,
InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUser | null>(null)

  useEffect(() => {
    ;(async () => {
      const {
        data: { user },
      } = (await getAPI().get('/auth/user')) as AxiosResponse<{ user: IUser }>
      setUserInfo(user)
    })()
  }, [])

  return (
    <div className="grid grid-cols-12 dark:bg-gray-700 bg-gray-50 dark:text-gray-200 text-gray-800 min-h-screen">
      <Head>
        <title>{userInfo?.username} | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside className="md:col-span-4 col-span-full px-2">
        <h1 className="text-4xl text-white text-uppercase">Users</h1>
        <Dash />
        <Swiper
          className="h-24 py-1"
          slidesPerView={6}
          grabCursor
          scrollbar={{ draggable: true, hide: true }}
        >
          {rooms.map((room) => {
            return (
              <SwiperSlide key={room._id}>
                <img
                  className="rounded-full ring-4 ring-offset-blue-500 h-16 w-16 my-2 object-cover"
                  src={room.logo}
                  alt={room.title}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Dash />

        <div>
          <h1 className="text-4xl text-white text-uppercase">Rooms</h1>
          <Dash />
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex py-2 items-center justify-between group px-2 hover:bg-gray-500"
            >
              <div className="flex items-center">
                <img
                  className="rounded-full ring-4 h-16 w-16"
                  alt={room.title}
                  src={room.logo}
                />
                <div className="ml-2">
                  <h2 className="text-xl">{room.title}</h2>
                  <p>{room._id}</p>
                </div>
              </div>
              <Center classes="h-16 w-16 rounded-full group-hover:bg-gray-700 bg-gray-500">
                {room.members_length}
              </Center>
            </div>
          ))}
        </div>
      </aside>
      <main className="md:col-span-8 col-span-full">
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </main>
      <ThemeSelect />
    </div>
  )
}

export const getStaticProps: GetStaticProps<{
  rooms: IRoom[]
  users: IUser[]
}> = async () => {
  const { data: rooms } = (await getAPI().get('/rooms')) as AxiosResponse<
    IRoom[]
  >
  const { data: users } = (await getAPI().get('/users')) as AxiosResponse<
    IUser[]
  >
  return {
    props: {
      rooms,
      users,
    },
  }
}
