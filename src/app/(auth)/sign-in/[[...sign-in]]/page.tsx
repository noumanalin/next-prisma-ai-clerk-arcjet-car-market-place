import React from 'react'
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div>LoginPage
        <SignIn/>
    </div>
  )
}

export default LoginPage