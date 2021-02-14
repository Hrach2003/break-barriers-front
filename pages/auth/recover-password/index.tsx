import Image from 'next/image'
import React, { useState } from 'react'
import { Dash } from '../../../components/dash/dash'
import { ThemeSelect } from '../../../components/theme-select/themeSelect'
import { Input } from '../../../components/input/input'
import { useForm } from 'react-hook-form'
import { getAPI } from '../../../hooks/api'
import { AxiosResponse } from 'axios'

const RecoverPasswordByEmail = (): JSX.Element => {
  const { register, handleSubmit } = useForm()
  const [serverError, setServerError] = useState(false)
  const [isSend, setIsSend] = useState(false)

  const onSubmit = async ({ email }: { email: string }): Promise<void> => {
    try {
      const isSend = (await getAPI()({
        method: 'POST',
        url: '/auth/recover-password/',
        data: { email },
      })) as AxiosResponse<boolean>
      setIsSend(!!isSend)
      setServerError(false)
    } catch (error) {
      setServerError(error.message)
      setIsSend(false)
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
                This mail does not exist
              </p>
            )}
            {isSend && (
              <p className="px-4 py-2 bg-green-800 bg-opacity-25 rounded-md my-2 border-2 border-green-900 text-gray-200 font-semibold text-center">
                Mail sent successfully.
              </p>
            )}
            <Dash />

            <form
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                ref={register({ required: true })}
                placeholder="Email: "
                type="text"
                name="email"
              />
              <div className="flex justify-between items-center">
                <input
                  className="my-2 rounded-md cursor-pointer shadow-lg focus:ring-4 font-semibold  px-4 py-2 text-gray-200 bg-gray-900"
                  type="submit"
                  value="Send"
                />
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
