import Link from 'next/link'
import Image from 'next/image'
import { Dash } from '../../components/dash/dash'
import { Input } from '../../components/input/input'
import { ThemeSelect } from '../../components/theme-select/themeSelect'
import { Center } from '../../atoms/center'

const Login = (): JSX.Element => {
  return (
    <div className="dark:bg-gray-600 bg-gray-50">
      <Center classes="h-screen w-10/12 mx-auto md:grid grid-cols-2 gap-4">
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
        <div className="mx-auto md:mx-0">
          <h1 className="text-5xl mb-8 font-sans font-semibold dark:text-gray-200 text-gray-800">
            Break Barriers
          </h1>
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
            action="/api/auth/login/"
            method="POST"
          >
            <Input placeholder="Username: " type="text" name="username" />
            <Input placeholder="Password: " type="password" name="password" />
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
      </Center>
    </div>
  )
}

export default Login
