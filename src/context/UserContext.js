import react, { useState, createContext } from 'react'
export const UserContext = createContext()
export const UserProvider = props => {
    const [userLists,setUserLists] = useState([
        {email :'penangkar@mail.com', password : 'password', role : 1, username : 'penangkar', nama : 'pak penangkar', alamat:'jl raya', nomorTelp :6281818, tanggalLahir:'08/08/1999', nik:123},
        {email :'petani@mail.com', password : 'password', role : 2, username : 'petani', nama : 'pak petani', alamat:'jl raya', nomorTelp :6281818, tanggalLahir:'08/08/1999', nik:123},
        {email :'pengumpul@mail.com', password : 'password', role : 3, username : 'pengumpul', nama : 'pak pengumpul', alamat:'jl raya', nomorTelp :6281818, tanggalLahir:'08/08/1999', nik:123},
        {email :'pedagang@mail.com', password : 'password', role : 4, username : 'pedagang', nama : 'pak pedagang', alamat:'jl raya', nomorTelp :6281818, tanggalLahir:'08/08/1999', nik:123}
    ])

    const [ loginStatus, setLoginStatus] = useState(false)
    return(
       <UserContext.Provider value={{ 
           userLists,
           setUserLists,
           loginStatus, 
           setLoginStatus,
        }}>
        {props.children}
       </UserContext.Provider>
    )

}