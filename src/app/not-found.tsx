import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <ArrowLeftCircle size={20} />
          Go back home
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
