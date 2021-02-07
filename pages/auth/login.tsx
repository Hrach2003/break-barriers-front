import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dash } from '../../components/dash/dash'
import { Input } from '../../components/input/input'
import { ThemeSelect } from '../../components/theme-select/themeSelect'
import { useForm } from 'react-hook-form'
import { getAPI } from '../../hooks/api'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

interface LoginResponse {
  token: string
}

const Login = (): JSX.Element => {
  const { register, handleSubmit, reset, errors } = useForm()
  const [serverError, setServerError] = useState(false)
  const router = useRouter()
  const onSubmit = async (data: {
    username: string
    password: string
  }): Promise<void> => {
    try {
      console.log(data)
      const {
        data: { token },
      } = (await getAPI()({
        url: '/auth/login/',
        method: 'POST',
        data,
      })) as AxiosResponse<LoginResponse>
      Cookies.set('jwt_token', token, {
        secure: true,
        expires: 10,
      })
      router.replace('/profile')
    } catch (error) {
      setServerError(true)
      console.error(error)
      reset()
    }
  }
  return (
    <div className="dark:bg-gray-600 min-h-screen bg-gray-50">
      <div className="h-full w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-4 md:pt-24">
        <div className="my-2 md:my-0">
          <Image
            className="w-full h-full object-contain"
            src="/assets/app.png"
            alt="Application"
            width={500}
            height={350}
            layout="responsive"
          />
          <Dash />
        </div>
        <div>
          <h1 className="text-5xl mb-8 font-sans font-semibold dark:text-gray-200 text-gray-800">
            Break Barriers
          </h1>
          {serverError && (
            <p className="px-4 py-2 bg-red-800 bg-opacity-25 rounded-md my-2 border-2 border-red-900 text-gray-200 font-semibold text-center">
              Username or password is wrong
            </p>
          )}
          <a
            href="/auth/google/"
            className="overflow-hidden w-full h-12 relative flex items-center rounded-md dark:bg-gray-900 bg-white shadow-lg hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-800"
          >
            <div className="h-full absolute inset-y-0 left-0">
              <img
                src="https://banner2.cleanpng.com/20180723/btg/kisspng-google-logo-google-search-google-images-g-suite-google-adwords-5b5695e47fdc94.0743248315324011245237.jpg"
                className="h-full p-2 rounded-md dark:bg-white bg-gray-200"
                alt="google banner"
              />
            </div>
            <span className="mx-auto dark:text-gray-200 text-gray-700 text-lg font-medium font-sans">
              Log in by Google
            </span>
          </a>
          <Dash />

          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              ref={register({ required: true })}
              placeholder="Username: "
              type="text"
              name="username"
            />
            {errors.username && (
              <span className="text-red-800 text-sm">Username is required</span>
            )}
            <Input
              ref={register({ required: true, minLength: 6 })}
              placeholder="Password: "
              type="password"
              name="password"
            />
            {errors.password && (
              <span className="text-red-800 text-sm">
                Password must be more than 6 character
              </span>
            )}
            <div className="flex justify-between items-center">
              <input
                className="my-2 rounded-md cursor-pointer shadow-lg focus:ring-4 font-semibold  px-4 py-2 text-gray-200 bg-gray-900"
                type="submit"
                value="Send"
              />
              <span className="dark:text-gray-200 text-gray-700">
                Create an account{' '}
                <Link href="/auth/signin/">
                  <a className="underline text-blue-300">here.</a>
                </Link>
              </span>
            </div>
          </form>
          <ThemeSelect />
        </div>
      </div>
    </div>
  )
}

export default Login
