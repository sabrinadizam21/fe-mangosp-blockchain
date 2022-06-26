import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router'

function TanamBenih() {
    const [modalOpen, setModalOpen] = useState(false)
    const { profile } = useContext(UserContext)
    const [input, setInput] = useState({
        pupuk : ''
    })

    const handleChange = (event) => {
        let {value, name} = event.target
        setInput({...input, [name]:value})
    }

    let history = useHistory()

    const handleSubmit = (e) => {
      e.preventDefault()
      history.push('/detail-transaksi')
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
                    <p>Benih A</p>
                  </div>
                  <div className="status-trx">
                    <p className='status'>20 Kg</p>
                    <p className="timestamp">20 Januari 2000 - 23:14 wib</p>
                  </div>
                </div>
                <div>
                    <form id='tanam-benih' onSubmit={handleSubmit}>
                        <Input label={'Jenis Pupuk'} type='text' name='pupuk' id='pupuk' 
                        placeholder='Jenis Pupuk' value={input.pupuk} onChange={handleChange} required />

                        <div>
                           <Button 
                              className="openModalBtn"  type={'button'} 
                              onClick={()=>{
                                setModalOpen(true);
                              }}
                              disabled = {!input.pupuk.length} 
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