import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import './DaftarAset.css'
import './Aset.css'
import { Input } from '../../components/Input'
import { AsetContext } from '../../context/AsetContext'
import { useHistory } from 'react-router'

function DaftarAset() {
  const { aset, setAset } = useContext(AsetContext)
  const [input, setInput] = useState({
    varietas :'', 
    kuantitasBenih : '',
    umurBenih : '', 
    umurPanen : '', 
    hargaPanen : ''
  })
  const [currentIndex] = useState(-1)
  let history = useHistory()

  const handleChange = (event) => {
    let {value, name} = event.target
    setInput({...input, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = aset
    if(currentIndex === -1){
      setAset([...aset, {
        varietas : input.varietas,
        kuantitasBenih : parseInt(input.kuantitasBenih),
        umurBenih : parseInt(input.umurBenih),
        umurPanen : parseInt(input.umurPanen),
        hargaPanen : parseInt(input.hargaPanen)
      }])
      //history.push('/aset')
    }
    else {
        newData[currentIndex] = input
    }
    console.log(newData)
  }
  return (
    <>
        <div className="aset__wrapper">
            <div className="aset__section">
              <div className="aset__header">
                {/* Header */}
                <div>
                  <div className="aset__title"><h4>Daftar Aset</h4></div>
                  <div className="aset__subtitle">Isi formulir berikut untuk menambah aset</div>
                </div>
              </div>
              <div className="aset__content">
                <form onSubmit={handleSubmit}>
                    <Input label={'Varietas'} type='text' name='varietas' id='varietas' 
                        placeholder='Varietas' value={input.varietas} onChange={handleChange} required />

                    <Input label={'kuantitasBenih'} type='number' name='kuantitasBenih' id='kuantitasBenih' 
                        placeholder='Kuantitas Benih' value={input.kuantitasBenih} onChange={handleChange} required />
                    
                    <Input label={'Umur Benih'} type='number' name='umurBenih' id='umurBenih' 
                        placeholder='Umur Benih' value={input.umurBenih} onChange={handleChange} required />
                    
                    <Input label={'Umur Panen'} type='number' name='umurPanen' id='umurPanen' 
                        placeholder='Umur Panen' value={input.umurPanen} onChange={handleChange} required />
                    
                    <Input  label={'Harga Panen'} type='number' name='hargaPanen' id='hargaPanen' 
                        placeholder='Harga Panen' value={input.hargaPanen} onChange={handleChange} required />
                    
                    <div className='aset__button'>
                        <div className='btn-links'>
                            <Link to='/aset'>
                                <Button buttonStyle='btn--outline' buttonSize='btn--medium'>BATAL</Button>
                            </Link>      
                        </div>
                        <div className='btn-links'>
                            <Button type={'submit'} buttonStyle='btn--primary' buttonSize='btn--medium' >SIMPAN</Button>
                        </div>
                    </div> 
                </form>
              </div>
            </div>
        </div>
    </>
  )
}

export default DaftarAset