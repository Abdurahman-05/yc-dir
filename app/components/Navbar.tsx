import Link from 'next/link'
import Image from 'next/image'
export const Navbar = () => {
  return (
     <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
        <Image src="/logo.png" alt="logo" width={144} height={30} />

        </Link>
      </nav>
     </header>
  )
}
