import Cookies from 'js-cookie'
import { useContext } from 'react'
import { UserContext } from "../context/UserContext"

function GrantPermission(requestedRoles) {
    const { profile } = useContext(UserContext)
    if (Cookies.get('role') === requestedRoles) return true
    else if(Cookies.get('role') !== requestedRoles) return false
}

export default GrantPermission