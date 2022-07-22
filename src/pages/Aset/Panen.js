import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'
import { AsetContext } from '../../context/AsetContext'

function Panen() {
  const [modalOpen, setModalOpen] = useState(false)
  const { inputTrx, setInputTrx, panenPetani, getId, currentIndex, aset, formatDate } = useContext(AsetContext)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser
  const dataMangga = aset[currentIndex]

  const handleChange = (event) => {
      let {value, name} = event.target
      setInputTrx({...inputTrx, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    panenPetani(getId)
    setModalOpen(false)
  }

return (
  <>
      <div className="wrapper">
          <div className="section">
            <div className="header">
              <div>
                <div className="title">Panen</div>
                <div className="subtitle">Isi form berikut untuk mendaftarkan panen mangga</div>
              </div>
            </div>
            <div className="content">
              <div className="information">
                <div className="last-note">
                  <span>Varietas</span>
                  <p>{dataMangga.varietasBenih}</p>
                </div>
                <div className="status-trx">
                  <p className='status'>{dataMangga.kuantitasBenihKg} Kg</p>
                  <p className="timestamp">{formatDate(dataMangga.tanggalTanam)}</p>
                </div>
              </div>
              <div>
                  <form id='tanam-benih' onSubmit={handleSubmit}>
                      <Input label={'Jumlah'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errMsg={error.kuantitasManggaKg}
                      placeholder='Jumlah' value={inputTrx.kuantitasManggaKg} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'ukuran'} type='text' name='ukuran' id='ukuran' errMsg={error.ukuran}
                      placeholder='ukuran' value={inputTrx.ukuran} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'pestisida'} type='text' name='pestisida' id='pestisida' errMsg={error.pestisida}
                      placeholder='pestisida' value={inputTrx.pestisida} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Kadar Air'} type='number' name='kadarAir' id='kadarAir' errMsg={error.kadarAir}
                      placeholder='Kadar Air' value={inputTrx.kadarAir} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'perlakuan'} type='text' name='perlakuan' id='perlakuan' errMsg={error.perlakuan}
                      placeholder='perlakuan' value={inputTrx.perlakuan} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'produktivitas'} type='text' name='produktivitas' id='produktivitas' errMsg={error.produktivitas}
                      placeholder='produktivitas' value={inputTrx.produktivitas} onChange={handleChange} onBlur={validateInput} required />

                      <div>
                         <Button 
                            className="openModalBtn"  type={'button'} 
                            onClick={()=>{
                              setModalOpen(true);
                            }}
                            disabled = {!inputTrx.kuantitasManggaKg || !inputTrx.ukuran || !inputTrx.pestisida || 
                              !inputTrx.kadarAir || !inputTrx.perlakuan || !inputTrx.produktivitas } 
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
                              <br />
                              <p></p>
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

export default Panen