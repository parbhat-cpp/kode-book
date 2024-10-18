'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LoginButton from './LoginButton'
import Link from 'next/link'
import { routes } from '@/constants/common'
import { List } from '@phosphor-icons/react'

const PageWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, [])


  return (
    <div>
      {/* Navbar */}
      <header className='sticky z-20 top-0 left-0 py-3 px-10 flex justify-between bg-lpPrimaryBg'>
        {/* Kode book logo */}
        <div className='flex gap-3'>
          <Link href={'/'} className='flex items-center gap-3 text-white'>
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
          <div className='md:flex hidden gap-5 items-center mx-5 text-lpSecondaryText'>
            <Link className='hover:text-white' href={routes.about.url} aria-label={routes.about.label} target='_blank'>
              About
            </Link>
            <Link className='hover:text-white' href={routes.github.url} aria-label={routes.github.label} target='_blank'>
              GitHub
            </Link>
          </div>
        </div>
        {/* Login button */}
        <div className='md:block hidden'>
          <LoginButton />
        </div>
        {/* Menu Button for smaller devices */}
        <button className='md:hidden flex items-center justify-center text-white'>
          <List size={25} />
        </button>
      </header>
      {props.children}
      {/* Footer */}
      <footer className='bg-lpPrimaryBg py-5 px-12 text-white'>
        <h5>&copy; Kode Book {date?.getUTCFullYear().toString()}</h5>
      </footer>
    </div>
  )
}

export default PageWrapper
