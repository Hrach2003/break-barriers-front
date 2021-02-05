import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Center } from '../../atoms/center'
import { Dash } from '../../components/dash/dash'
import { Input } from '../../components/input/input'
import { ThemeSelect } from '../../components/theme-select/themeSelect'
import axios from 'axios'

const SignIn = (): JSX.Element => {
  const { register, reset, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    try {
      await axios.post('https://break-barriers.herokuapp.com/api/auth/login/', {
        data,
      })
    } catch (error) {
      reset()
      console.log(error)
    }
  }
  return (
    <div className="dark:bg-gray-600 bg-gray-50">
      <Center classes="h-screen">
        <div className="pt-16 w-10/12 mx-auto h-screen md:grid items-center grid-cols-2 gap-4">
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
            <div className="border shadow-sm py-3 my-1 rounded-md flex justify-center items-center bg-yellow-100">
              <i className="text-green-700 fas fa-check mr-4"></i>
              <span className="font-semibold font-sans text-green-700">
                Get more by using this app!!
              </span>
            </div>
            <Dash />
            <form
              id="form"
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                ref={register({ required: true })}
                placeholder="Username: "
                type="text"
                name="username"
              />
              <Input
                ref={register({ required: true })}
                placeholder="Email: "
                type="email"
                name="email"
              />
              <Input
                ref={register({ required: true, minLength: 6 })}
                placeholder="Password: at least 6 character "
                type="password"
                name="password"
              />
              <div className="flex justify-between items-center">
                <button
                  className="my-2 rounded-md focus:ring-4 font-semibold disabled:opacity-50 px-4 py-2 text-gray-300 bg-gray-900"
                  type="submit"
                >
                  Send
                </button>
                <span className="dark:text-gray-200 text-gray-700">
                  Already have an account?{' '}
                  <Link href="/auth/login/">
                    <a className="underline text-blue-300">Login here.</a>
                  </Link>
                </span>
              </div>
            </form>
            <ThemeSelect />
          </div>
        </div>
      </Center>
    </div>
  )
}

export default SignIn
