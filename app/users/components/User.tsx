import { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getSingleUser from 'app/users/api/users'

export const User = ({ id }) => {
  const [user] = useQuery(getSingleUser, { where: { id } })

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link href={`/users/${user.id}/edit`}>
        <a>Edit</a>
      </Link>
    </div>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>User</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <User />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowUserPage