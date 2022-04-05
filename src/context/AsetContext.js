import { useState, createContext } from 'react'
export const AsetContext = createContext()
export const AsetProvider = props => {
    const [aset,setAset] = useState([
        {id : 0, createDate: '23 Maret 2022 - 23:59 WIB', varietas :'Benih A', kuantitasBenih : 1000, umurBenih : 20, umurPanen : 1, hargaPanen : 101500},
        {id : 1, createDate: '1 April 2022 - 03:15 WIB', varietas :'Jaya Raya', kuantitasBenih : 1200, umurBenih : 10, umurPanen : 2, hargaPanen : 130000},
        {id : 2, createDate: '12 Januari 2022 - 13:00 WIB', varietas :'Benih C', kuantitasBenih : 300, umurBenih : 14, umurPanen : 3, hargaPanen : 12000},
        {id : 3, createDate: '24 Februari 2022 - 09:00 WIB', varietas :'Benih K', kuantitasBenih : 540, umurBenih : 18, umurPanen : 4, hargaPanen : 104000}
    ])

    //const [ loginStatus, setLoginStatus] = useState(false)
    return(
       <AsetContext.Provider value={{ 
           aset,
           setAset,
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}