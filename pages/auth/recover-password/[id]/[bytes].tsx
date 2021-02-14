import { useRouter } from 'next/router'

const RecoverPassword = (): JSX.Element => {
  const { query } = useRouter()
  return (
    <div>
      bytes: {query.bytes}
      id: {query.id}
    </div>
  )
}

export default RecoverPassword
