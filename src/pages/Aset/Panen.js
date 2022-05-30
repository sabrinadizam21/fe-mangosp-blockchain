import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'

function Panen() {
  const [modalOpen, setModalOpen] = useState(false)
  const { profile } = useContext(UserContext)
  const [input, setInput] = useState({
    jumlah : '',
    ukuran : '',
    pestisida : '',
    kadarAir : '',
    perlakuan : '',
    produktivitas : '',
  })

  const handleChange = (event) => {
      let {value, name} = event.target
      setInput({...input, [name]:value})
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
                  <p>Benih A</p>
                </div>
                <div className="status-trx">
                  <p className='status'>20 Kg</p>
                  <p className="timestamp">20 Januari 2000 - 23:14 wib</p>
                </div>
              </div>
              <div>
                  <form id='tanam-benih'>
                      <Input label={'Jumlah'} type='number' name='jumlah' id='jumlah' 
                      placeholder='Jumlah' value={input.jumlah} onChange={handleChange} required />

                      <Input label={'Ukuran'} type='text' name='ukuran' id='ukuran' 
                      placeholder='Ukuran' value={input.ukuran} onChange={handleChange} required />

                      <Input label={'Pestisida'} type='text' name='pestisida' id='pestisida' 
                      placeholder='Pestisida' value={input.pestisida} onChange={handleChange} required />

                      <Input label={'Kadar Air'} type='number' name='kadarAir' id='kadarAir' 
                      placeholder='Kadar Air' value={input.kadarAir} onChange={handleChange} required />

                      <Input label={'Perlakuan'} type='text' name='perlakuan' id='perlakuan' 
                      placeholder='Perlakuan' value={input.perlakuan} onChange={handleChange} required />

                      <Input label={'Produktivitas'} type='text' name='produktivitas' id='produktivitas' 
                      placeholder='Produktivitas' value={input.produktivitas} onChange={handleChange} required />

                      <div>
                         <Button 
                            className="openModalBtn"  type={'button'} 
                            onClick={()=>{
                              setModalOpen(true);
                            }}
                            disabled = {!input.jumlah.length || !input.ukuran.length || !input.pestisida.length || 
                              !input.kadarAir.length || !input.perlakuan.length || 
                              !input.produktivitas.length } 
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