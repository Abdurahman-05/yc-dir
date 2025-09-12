import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut , signIn} from '../../auth'


export const Navbar = async () => {
  const session = await auth()

  return (
     <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center px-2 text-black">
        <Link href="/">
        <Image src="/logo.png" alt="logo" width={144} height={30} /> 
        </Link>
        <div className="flex items-center gap-3">
        {session && session?.user ? (
          <>
          <Link href="/startup/create">
            <span>create</span>
          </Link>
        
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button type="submit" className="px-3 py-1 text-sm rounded border">
                Logout
              </button>
            </form>
          <Link href={`/user/${session?.user?.id}`}>
            <span>{session?.user?.name}</span>
          </Link>
          </>
        ) : (
          <form
          action={async () => {
            'use server'
            await signIn('github')
          }}
          >
            <button type="submit" className="px-3 py-1 text-sm rounded border ">
              Login
            </button>
          </form>
        )}
        </div>
      </nav>
     </header>
  )
}
