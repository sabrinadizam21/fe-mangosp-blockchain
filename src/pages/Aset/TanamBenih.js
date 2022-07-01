import React, { useState, useContext } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router'

function TanamBenih() {
  const [modalOpen, setModalOpen] = useState(false)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser

  const [ currentIndex ] = useState(-1)

  const [ tanamBenih, setTanamBenih ] = useState([
    {Benih : 'A', Pupuk : 'A', TanggalTanam : 1648054793, LokasiLahan : 'Bandung',}
  ])
    
  const [inputTrx, setInputTrx,] = useState({
    Benih : '',
    Pupuk : '', 
    TanggalTanam : '', 
    LokasiLahan : '',
  })

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
  }

  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentIndex === -1){
      setTanamBenih([...tanamBenih, {
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
          Benih : 'AAA',
          Pupuk : inputTrx.Pupuk, 
          TanggalTanam : new Date().getTime(), 
          LokasiLahan : inputTrx.LokasiLahan, 
        }]
      }])
      setInputTrx({
        Benih : '',
        Pupuk : '', 
        TanggalTanam : '', 
        LokasiLahan : '', 
      })
    }
    history.push('/detail-transaksi')
    console.log(tanamBenih)
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