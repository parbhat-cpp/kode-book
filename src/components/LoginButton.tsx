'use client'

import React from 'react'
import CustomDialog from './CustomDialog';

interface LoginButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  btntext?: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const { className, children, btntext, onClick, ...filteredProps } = props;

  return (
    <>
      <CustomDialog
        trigger={
          <div
            className='py-2 px-7 border-2 border-white bg-lpPrimaryBg text-white rounded-3xl' {...filteredProps}>
            <p>{btntext ? btntext : 'Login'}</p>
          </div>
        }
      />
    </>
  )
}

export default LoginButton
