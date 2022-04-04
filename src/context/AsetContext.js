import { useState, createContext } from 'react'
export const AsetContext = createContext()
export const AsetProvider = props => {
    const [aset,setAset] = useState([
        {varietas :'Benih A', kuantitasBenih : 1000, umurBenih : 20, umurPanen : 1, hargaPanen : 101500},
        {varietas :'Jaya Raya', kuantitasBenih : 1200, umurBenih : 10, umurPanen : 2, hargaPanen : 130000},
        {varietas :'Benih C', kuantitasBenih : 300, umurBenih : 14, umurPanen : 3, hargaPanen : 12000},
        {varietas :'Benih K', kuantitasBenih : 540, umurBenih : 18, umurPanen : 4, hargaPanen : 104000}
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