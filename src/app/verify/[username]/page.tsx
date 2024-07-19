'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'


const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username:string}>();
  return (
    <div>
      
    </div>
  )
}

export default VerifyAccount
