import { Navbar } from "../components/Navbar"
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
        <Navbar />
        {children}
    </main>
  )
}
