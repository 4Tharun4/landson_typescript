import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <div className='flex justify-center items-center'>
      Nor found 

      <Link href="/">Go to Home</Link>
    </div>
  )
}

export default notfound
