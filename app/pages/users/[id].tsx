import { Suspense } from "react"
import { Head, useRouter, useQuery, BlitzPage } from "blitz"
import getUser from "app/users/api/users"
import { User } from "app/users/components/User"

const UserPage: BlitzPage = () => {
  const router = useRouter()
  const userId = parseInt(router?.query.id as string)
  const [user] = useQuery(getUser, { id: userId })

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>User {user.id}</title>
      </Head>

      <main>
        <User user={user} />
      </main>
    </div>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserPage />
      </Suspense>
    </div>
  )
}

ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage