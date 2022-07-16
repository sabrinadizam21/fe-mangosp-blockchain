import { Route, Switch } from "react-router-dom"
import Unauthorized from './Unauthorized'
import { useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import Cookies from 'js-cookie'
import GrantPermission from "./GrantPermission"

function RoleBasedRouting({
    component: Component, roles, ...rest
  }) {
  const { functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser

  const username = Cookies.get('username')
  useEffect(()=>{
    getUserLogin(username)
  }, [])
    
    return (
      <>
        {GrantPermission(roles) === true ? 
        (
        <Switch>
          <Route
            {...rest}
            render={(props) => (
              <>
                <Component {...props} />
              </>
            )}
          />
        </Switch>) :
        (
        <Switch>
          <Route 
            render={() => (
              <>
                <Unauthorized /> 
              </>
            )}
          />
        </Switch>
        )
        }
      </>
    );
  }

  export default RoleBasedRouting;