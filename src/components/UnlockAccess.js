import grantPermission from './GrantPermission'
const UnlockAccess = ({ children, request }) => {
    const permission = grantPermission(request)
    return (
      <>
        {permission && children}
      </>
    )
}

export default UnlockAccess