import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { Dash } from '../../../../components/dash/dash'
import { ThemeSelect } from '../../../../components/theme-select/themeSelect'
import { Input } from '../../../../components/input/input'
import { useForm } from 'react-hook-form'
import { getAPI } from '../../../../hooks/api'
import { AxiosResponse } from 'axios'
import { IUser } from '../../../../interfaces/user.interface'

const RecoverPasswordByEmail = (): JSX.Element => {
  const router = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  const [serverError, setServerError] = useState('')
  const [isChanged, setIsChanged] = useState(false)

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = async ({
    password,
  }: {
    password: string
  }): Promise<void> => {
    console.log(password)
    try {
      const {
        query: { id, bytes },
      } = router
      ;(await getAPI()({
        method: 'POST',
        url: `/auth/recover-password/${id}/${bytes}/`,
        data: { password },
      })) as AxiosResponse<{ user: IUser }>
      setIsChanged(true)
      setServerError('')
      router.replace('/auth/login')
    } catch (error) {
      setServerError(error.message)
      setIsChanged(false)
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
        <div className="flex items-center w-full">
          <div className="w-full">
            <h1 className="text-4xl mb-8 font-sans font-semibold dark:text-gray-200 text-gray-800">
              Recover Password
            </h1>
            {serverError && (
              <p className="px-4 py-2 bg-red-800 bg-opacity-25 rounded-md my-2 border-2 border-red-900 text-gray-200 font-semibold text-center">
                {serverError}
              </p>
            )}
            {isChanged && (
              <p className="px-4 py-2 bg-green-800 bg-opacity-25 rounded-md my-2 border-2 border-green-900 text-gray-200 font-semibold text-center">
                Password changed successfully.
              </p>
            )}
            <Dash />

            <form
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                ref={register({
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                })}
                placeholder="Password: "
                type="password"
                name="password"
              />
              {errors.password && (
                <span className="text-red-800 text-sm">
                  {errors.password.message}
                </span>
              )}
              <Input
                ref={register({
                  validate: (value) => {
                    console.log(password.current)
                    return (
                      value === password.current || 'The passwords do not match'
                    )
                  },
                })}
                placeholder="Confirm password: "
                type="password"
                name="password_repeat"
              />
              {errors.password_repeat && (
                <span className="text-red-800 text-sm">
                  {errors.password_repeat.message}
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
    </div>
  )
}

export default RecoverPasswordByEmail
