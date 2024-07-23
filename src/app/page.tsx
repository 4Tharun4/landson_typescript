'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
       Welcome  {session.user.UserName} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <div className=" m-4">
      <button  className="bg-black rounded-lg  text-white p-2" onClick={() => signIn()}>Login Please</button>
      </div>
      
    </>
  )
}