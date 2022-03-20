import react, { useState, createContext } from 'react'
export const UserContext = createContext()
export const UserProvider = props => {
    const userLists = [
        {email :'penangkar@mail.com', password : 'password', role : 1, username : 'penangkar', name : 'pak penangkar'},
        {email :'petani@mail.com', password : 'password', role : 2, username : 'petani', name : 'pak petani'},
        {email :'pengumpul@mail.com', password : 'password', role : 3, username : 'pengumpul', name : 'pak pengumpul'},
        {email :'pedagang@mail.com', password : 'password', role : 4, username : 'pedagang', name : 'pak pedagang'}
    ]

    const [ loginStatus, setLoginStatus] = useState(false)
    return(
       <UserContext.Provider value={{ 
           userLists,
           loginStatus, 
           setLoginStatus
        }}>
        {props.children}
       </UserContext.Provider>
    )

}