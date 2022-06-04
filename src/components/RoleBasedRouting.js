import { Route } from "react-router-dom"
import Unauthorized from './Unauthorized'
import { useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import Cookies from 'js-cookie'
function RoleBasedRouting({
    component: Component, roles, ...rest
  }) {
  const { profile, functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser

  const username = Cookies.get('username')
  useEffect(()=>{
    getUserLogin(username)
  }, [])

    const grantPermission = async (requestedRoles) => {
      if (profile.role === requestedRoles) return true
      else if(profile.role !== requestedRoles) return false
    }
    
    return (
      <>
        {grantPermission(roles) == true ? 
        (<Route
          {...rest}
          render={(props) => (
            <>
              <Component {...props} />
            </>
          )}
        />) :
        (
          <Route 
            render={() => (
              <>
                <Unauthorized /> 
              </>
            )}
          />
        )
        }
      </>
    );
  }

  export default RoleBasedRouting;