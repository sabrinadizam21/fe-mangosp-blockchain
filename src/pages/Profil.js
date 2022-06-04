import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

function Profil() {
  const { profile } = useContext(UserContext)
  return (
    <>
        <p>{profile.userName}</p>
        <p>{profile.role}</p>
    </>
  )
}

export default Profil