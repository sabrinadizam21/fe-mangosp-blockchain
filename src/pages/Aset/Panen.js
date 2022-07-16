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
                  <p>{dataMangga.VarietasBenih}</p>
                </div>
                <div className="status-trx">
                  <p className='status'>{dataMangga.KuantitasBenihKg} Kg</p>
                  <p className="timestamp">{formatDate(dataMangga.TanggalTanam)}</p>
                </div>
              </div>
              <div>
                  <form id='tanam-benih' onSubmit={handleSubmit}>
                      <Input label={'Jumlah'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errMsg={error.KuantitasManggaKg}
                      placeholder='Jumlah' value={inputTrx.KuantitasManggaKg} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Ukuran'} type='text' name='Ukuran' id='Ukuran' errMsg={error.Ukuran}
                      placeholder='Ukuran' value={inputTrx.Ukuran} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Pestisida'} type='text' name='Pestisida' id='Pestisida' errMsg={error.Pestisida}
                      placeholder='Pestisida' value={inputTrx.Pestisida} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Kadar Air'} type='number' name='KadarAir' id='KadarAir' errMsg={error.KadarAir}
                      placeholder='Kadar Air' value={inputTrx.KadarAir} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Perlakuan'} type='text' name='Perlakuan' id='Perlakuan' errMsg={error.Perlakuan}
                      placeholder='Perlakuan' value={inputTrx.Perlakuan} onChange={handleChange} onBlur={validateInput} required />

                      <Input label={'Produktivitas'} type='text' name='Produktivitas' id='Produktivitas' errMsg={error.Produktivitas}
                      placeholder='Produktivitas' value={inputTrx.Produktivitas} onChange={handleChange} onBlur={validateInput} required />

                      <div>
                         <Button 
                            className="openModalBtn"  type={'button'} 
                            onClick={()=>{
                              setModalOpen(true);
                            }}
                            disabled = {!inputTrx.KuantitasManggaKg || !inputTrx.Ukuran || !inputTrx.Pestisida || 
                              !inputTrx.KadarAir || !inputTrx.Perlakuan || !inputTrx.Produktivitas } 
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