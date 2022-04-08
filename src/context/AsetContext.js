import { useState, createContext } from 'react'
export const AsetContext = createContext()
export const AsetProvider = props => {

    const formatDate = (x) => {
        let date = new Date(x*1000)
        const day = date.toLocaleString('default', {day: 'numeric'})
        const month = date.toLocaleString('default', {month: 'long'})
        const year = date.toLocaleString('default', {year: 'numeric'})
        const hour = date.toLocaleString('default', {hour : 'numeric', minute : 'numeric', hour12 : false})
        return day + ' ' + month + ' ' + year + ' - ' + hour
    }
    
    const [aset,setAset] = useState([
        {id : 0, createDate: 1648054793, varietas :'Benih A', kuantitasBenih : 1000, umurBenih : 20, umurPanen : 1, hargaPanen : 101500},
        {id : 1, createDate: 1648757753, varietas :'Jaya Raya', kuantitasBenih : 1200, umurBenih : 10, umurPanen : 2, hargaPanen : 130000},
        {id : 2, createDate: 1641967200, varietas :'Benih C', kuantitasBenih : 300, umurBenih : 14, umurPanen : 3, hargaPanen : 12000},
        {id : 3, createDate: 1645668000, varietas :'Benih K', kuantitasBenih : 540, umurBenih : 18, umurPanen : 4, hargaPanen : 104000}
    ])
    
    const sortData = (data) => data.sort((a,b) => (a.createDate < b.createDate) ? 1 : -1)
    
    function numberFormat(number){
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    }
    return(
       <AsetContext.Provider value={{ 
           aset,
           setAset,
           numberFormat,
           formatDate,
           sortData
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}