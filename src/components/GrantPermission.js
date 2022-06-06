import { useContext } from 'react'
import { UserContext } from "../context/UserContext"

function GrantPermission(requestedRoles) {
    const { profile } = useContext(UserContext)
    if (profile.role === requestedRoles) return true
    else if(profile.role !== requestedRoles) return false
}

export default GrantPermission