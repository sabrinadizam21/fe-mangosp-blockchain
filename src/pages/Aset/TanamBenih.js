import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'
import { AsetContext } from '../../context/AsetContext'

function TanamBenih() {
  const [modalOpen, setModalOpen] = useState(false)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser
  const { inputTrx, setInputTrx, tanamBenihPetani, getId, currentIndex, aset, formatDate} = useContext(AsetContext)
  const dataBenih = aset[currentIndex]

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    tanamBenihPetani(getId)
    setModalOpen(false)
  }
  
  return (
    <>
        <div className="wrapper">
            <div className="section">
              <div className="header">
                <div>
                  <div className="title">Tanam Benih</div>
                  <div className="subtitle">Isi jenis pupuk yang digunakan</div>
                </div>
              </div>
              <div className="content">
                <div className="information">
                  <div className="last-note">
                    <span>Varietas</span>
                    <p>{dataBenih.VarietasBenih}</p>
                  </div>
                  <div className="status-trx">
                    <p className='status'>{dataBenih.KuantitasBenihKg} Kg</p>
                    <p className="timestamp">{formatDate(dataBenih.TanggalTransaksi)}</p>
                  </div>
                </div>
                <div>
                    <form id='tanam-benih' onSubmit={handleSubmit}>
                        <Input label={'Jenis Pupuk'} type='text' name='Pupuk' id='Pupuk' errorMsg={error.Pupuk}
                        placeholder='Jenis Pupuk' value={inputTrx.Pupuk} onChange={handleChange} onBlur={validateInput} required />
                        
                        <Input label={'Lokasi Lahan'} type='text' name='LokasiLahan' id='LokasiLahan' errorMsg={error.LokasiLahan}
                        placeholder='Lokasi Lahan' value={inputTrx.LokasiLahan} onChange={handleChange} onBlur={validateInput} required />

                        <div>
                           <Button 
                              className="openModalBtn"  type={'button'} 
                              onClick={()=>{
                                setModalOpen(true);
                              }}
                              disabled = {!inputTrx.Pupuk || !inputTrx.LokasiLahan } 
                              style = {{width : '100%'}}
                            >
                              SIMPAN
                            </Button>
                        {modalOpen && 
                          <Modal setOpenModal={setModalOpen} 
                            modalTitle={'Yakin simpan data ini?'}  
                            modalBody={
                              <div style={{textAlign : 'center'}}>
                                <p>Data yang telah dikirim tidak bisa diubah kembali </p>
                              </div>
                            } 
                            cancelBtn ={'CEK KEMBALI'}
                            processBtn={'YAKIN'}
                            form='tanam-benih'
                          />
                          }
                        </div>
                    </form>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default TanamBenih