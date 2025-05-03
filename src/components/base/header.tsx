import React from 'react'
import {  SignInButton, SignUpButton, SignedIn, SignedOut, UserButton,} from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CarFront, Heart, Layout } from 'lucide-react'
import { checkUser } from "@/lib/checkUser"

const Header = async ({isAdminPage=false}) => {
  const user = await checkUser()
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className='fixed top-0 w-full bg-white backdrop-blur-md z-40 border-b border-b-gray-400'>
      <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href={isAdminPage?'/admin':'/'}>
          <Image className='h-12 object-contain' src={'/logos/header-logo.png'} width={200} height={200} alt='logo'/>
        </Link>

      {/* Left Part With Actions Buttons  */}
        <div className="flex items-center gap-2">
          {isAdminPage ? (
            <>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
            </>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link
                  href="/reservations"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              )}
              <a href="/saved-cars">
                <Button className="flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </a>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/">
                <Button variant="outline">Login</Button>
              </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* appearance={{elements:{avatarBox: "w-15 h-15",}}} */}
            <UserButton  />
          </SignedIn>
        </div>
       
      </nav>

        {/* <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn> */}
    </header>
  )
}

export default Header