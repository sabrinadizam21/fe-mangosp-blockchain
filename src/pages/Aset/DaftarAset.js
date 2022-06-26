import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import './DaftarAset.css'
import './Aset.css'
import { Input } from '../../components/Input'
import { AsetContext } from '../../context/AsetContext'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'

function DaftarAset() {
  const { error, functionUser } = useContext(UserContext)
  const { validateInput } = functionUser
  const { input, setInput, createBenih } = useContext(AsetContext)
  const [modalOpen, setModalOpen] = useState(false)

  const handleChange = (event) => {
    let {value, name} = event.target
    setInput({...input, [name]:value})
    validateInput(event)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBenih()
    setModalOpen(false)
  }
  return (
    <>
        <div className="wrapper">
            <div className="section">
              <div className="header">
                {/* Header */}
                <div>
                  <div className="title">Daftar Aset</div>
                  <div className="subtitle">Isi formulir berikut untuk menambah aset</div>
                </div>
              </div>
              <div className="content">
                <form id='daftar-aset-baru' onSubmit={handleSubmit}>
                    <Input label={'Varietas Benih'} type='text' name='VarietasBenih' id='VarietasBenih' errorMsg={error.VarietasBenih}
                        placeholder='Varietas Benih' value={input.VarietasBenih} onChange={handleChange} onBlur={validateInput} required />

                    <Input label={'Kuantitas Benih (Kg)'} type='number' name='KuantitasBenihKg' id='KuantitasBenihKg' errorMsg={error.KuantitasBenihKg}
                        placeholder='Kuantitas Benih' value={input.KuantitasBenihKg} onChange={handleChange} onBlur={validateInput} required />
                    
                    <Input label={'Umur Benih (hari)'} type='number' name='UmurBenih' id='UmurBenih' errorMsg={error.UmurBenih}
                        placeholder='Umur Benih' value={input.UmurBenih} onChange={handleChange} onBlur={validateInput} required />
                    
                    <div className='aset__button'>
                        <div className='btn-links'>
                            <Link to='/aset'>
                                <Button buttonStyle='btn--outline' buttonSize='btn--medium'>BATAL</Button>
                            </Link>      
                        </div>
                        <div className='btn-links'>
                           <Button 
                              className="openModalBtn" buttonSize='btn--medium' type={'button'} 
                              onClick={()=>{
                                setModalOpen(true);
                              }}
                              disabled = {!input.VarietasBenih.length|| !input.KuantitasBenihKg.length || !input.UmurBenih.length } 
                            >
                              SIMPAN
                            </Button>
                        {modalOpen && 
                          <Modal setOpenModal={setModalOpen} 
                            modalTitle={'Konfirmasi Daftar Aset'}  
                            modalBody={
                              <div style={{textAlign : 'center'}}>
                                <p>Data yang telah dikirim tidak bisa diubah kembali </p>
                                <br />
                                <p>Apakah Anda yakin menyimpan data ini?</p>
                              </div>
                            } 
                            cancelBtn ={'CEK KEMBALI'}
                            processBtn={'YAKIN'}
                            form='daftar-aset-baru'
                          />
                          }
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