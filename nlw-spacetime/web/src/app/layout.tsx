import { cookies } from 'next/headers'

import EmptyMemories from '@/components/EmptyMemories'
import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import SignIn from '@/components/SignIn'
import Copyright from '@/components/Copyright'

import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'

import './globals.css'

const roboto = Roboto({ 
  subsets: ['latin'], 
  variable: '--font-roboto' 
})

const baiJamJuree = BaiJamjuree({ 
  subsets: ['latin'], 
  weight: '700',
  variable: '--font-baiJamJuree'
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, Tailwind e Typescript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans text-gray-100 bg-gray-900`}>        
        <main className="grid grid-cols-2 min-h-screen">    
          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">      
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full"/>      
            <div className="absolute bottom-0 right-2 top-2 w-2 bg-stripes"/>
            {!isAuthenticated ? <SignIn /> : <Profile />}
            <Hero />
            <Copyright />
          </div>          
          <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
