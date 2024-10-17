import React from 'react'
import Image from 'next/image'
import LoginButton from './LoginButton'
import Link from 'next/link'

const PageWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div>
      {/* Navbar */}
      <header className='sticky z-20 top-0 left-0 py-3 px-10 flex justify-between bg-lpPrimaryBg'>
        {/* Kode book logo */}
        <Link href={'/'}  className='flex items-center gap-3 text-white'>
          <Image
            src={'/logo.webp'}
            alt="Kode Book Logo"
            height={50}
            width={50}
          />
          <h4>
            Kode Book
          </h4>
        </Link>
        {/* Login button */}
        <div>
          <LoginButton />
        </div>
      </header>
      {props.children}
      {/* Footer */}
    </div>
  )
}

export default PageWrapper
