import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router'

function Panen() {
  const [modalOpen, setModalOpen] = useState(false)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser

  const [ inputTrx, setInputTrx] = useState({
    Ukuran : '', 
    Pestisida : '', 
    KadarAir : '', 
    Perlakuan : '', 
    Produktivitas : '', 
    KuantitasManggaKg : '',
    TanggalTanam : ''
  })

  const [currentIndex] = useState(-1)

  const [ panen, setPanen ] = useState([
    {Ukuran : 'Besar', Pestisida : 'A', KadarAir : '10', Perlakuan : 'AA', Produktivitas : 'a', 
    KuantitasManggaKg : 10, TanggalTanam : 1648054793}
  ])

  const handleChange = (event) => {
      let {value, name} = event.target
      setInputTrx({...inputTrx, [name]:value})
  }

  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentIndex === -1){
      setPanen([...panen, {
        fcn : "CreateTrxManggaByPenangkar",
        peers: [
            "peer0.penangkar.example.com",
            "peer0.petani.example.com",
            "peer0.pengumpul.example.com",
            "peer0.pedagang.example.com"
        ],
        chaincodeName: "manggasatu_cc",
        channelName: "channel1",
        args: [{
          Ukuran : inputTrx.Ukuran, 
          Pestisida : inputTrx.Pestisida, 
          KadarAir : inputTrx.KadarAir, 
          Perlakuan : inputTrx.Perlakuan, 
          Produktivitas : inputTrx.Produktivitas, 
          KuantitasManggaKg : inputTrx.KuantitasManggaKg,
          TanggalTanam : new Date().getTime(), 
        }]
      }])
    setInputTrx({
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : '', 
        Perlakuan : '', 
        Produktivitas : '', 
        KuantitasManggaKg : '',
        TanggalTanam : '' 
      })
    }
    history.push('/detail-transaksi')
    setModalOpen(false)
    console.log(panen)
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
                            disabled = {!inputTrx.KuantitasManggaKg.length || !inputTrx.Ukuran.length || !inputTrx.Pestisida.length || 
                              !inputTrx.KadarAir.length || !inputTrx.Perlakuan.length || !inputTrx.Produktivitas.length } 
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