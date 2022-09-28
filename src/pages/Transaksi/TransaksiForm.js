import React, { useState, useContext, useEffect } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import UnlockAccess from '../../components/UnlockAccess'
import { UserContext } from '../../context/UserContext'
import './TransaksiForm.css'
import Cookies from 'js-cookie'
import { AsetContext } from '../../context/AsetContext'
import { Loading } from '../../components/Loading'

function TransaksiForm() {
  const [modalOpen, setModalOpen] = useState(false)
  const { functionUser, error, allUser } = useContext(UserContext)
  const { validateInput, getUserLogin, getAllUser } = functionUser
  const { createTrxPenangkar, createTrxPetani, createTrxPengumpul, createTrxPedagangCh1, createTrxPedagangCh2,
    checked, setChecked, inputTrx, setInputTrx, loading
  } = useContext(AsetContext)
  const username = Cookies.get('username')
  const role = Cookies.get('role')
  const jalur = Cookies.get('jalur')

  useEffect(()=>{
    getUserLogin(username)
    getAllUser()
  }, [username]) 

  const checkList = ["Tunai", "Transfer", "E-money", "Lainnya"]

  const handleCheck = (event) => {
    var updatedList = [...checked]
    if (event.target.checked) {
      updatedList = [...checked, event.target.value]
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1)
    }
    setChecked(updatedList)
  }

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item"

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = Cookies.get('idTrx')
    const indexOfUserPenerima = allUser.map(function (x) {return x.username}).indexOf(inputTrx.namaPenerima)
    if(indexOfUserPenerima !== -1){
      const jalurUserPenerima = allUser[indexOfUserPenerima].jalur
      if(role === 'Org1') {
        if(jalurUserPenerima === 1) createTrxPenangkar('manggach1_cc', 'channel1')
        else if (jalurUserPenerima === 2) createTrxPenangkar('manggach2_cc', 'channel2')
      }
      else if(role === 'Org2') createTrxPetani(id)
      else if(role === 'Org3') createTrxPengumpul(id)
    }
    else if(role === 'Org4') {
      if(Cookies.get('jalur') === '1') createTrxPedagangCh1(id)
      else if(Cookies.get('jalur') === '2') createTrxPedagangCh2(id)
    }
    setChecked([])
    setModalOpen(false)
  } 

  return (
    <>
    { loading ? <Loading /> : 
      <div className="wrapper">
        <div className="section">
          <div className="header">
            <div>
              <h2 className="title">Buat Transaksi</h2>
              <div className="subtitle">Lakukan transaksi dengan mengisi form dibawah</div>
            </div>
          </div>
          <div className="content">
            <form id='buat-transaksi-baru' onSubmit={handleSubmit}>
              <UnlockAccess request={'Org1'}> 
                <>
                  <Input label={'Varietas Benih'} type='text' name='varietasBenih' id='varietasBenih' errorMsg={error.varietasBenih}
                    placeholder='Varietas Benih' value={inputTrx.varietasBenih} onChange={handleChange} onBlur={validateInput} required />

                  <Input label={'Kuantitas'} type='number' name='kuantitasBenih' id='kuantitasBenih' errorMsg={error.kuantitasBenih}
                    placeholder='Kuantitas' value={inputTrx.kuantitasBenih} onChange={handleChange} onBlur={validateInput} />   

                  <Input label={'Umur Benih (bulan)'} type='number' name='umurBenih' id='umurBenih' errorMsg={error.umurBenih} 
                    placeholder='Umur Benih' value ={inputTrx.umurBenih}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Benih per Satuan (Rp)'} type='number' name='hargaBenihPerBuah' id='hargaBenihPerBuah' errorMsg={error.hargaBenihPerBuah} 
                    placeholder='Harga Benih' value ={inputTrx.hargaBenihPerBuah}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='text' name='namaPenerima' id='namaPenerima' errorMsg={error.namaPenerima} 
                    placeholder='Username Penerima' value ={inputTrx.namaPenerima}  onChange={handleChange} onBlur={validateInput} />
                        
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden required/>
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={'Org2'}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Mangga per Kg (Rp)'} type='number' name='hargaManggaPerKg' id='hargaManggaPerKg' errorMsg={error.hargaManggaPerKg} 
                    placeholder='Harga Mangga' value ={inputTrx.hargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Username Penerima'} type='text' name='namaPenerima' id='namaPenerima' errorMsg={error.namaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.namaPenerima}  onChange={handleChange} onBlur={validateInput} />

                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden required/>
                  </div>
                </>
              </UnlockAccess>

              <UnlockAccess request={'Org3'}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga per Kg (Rp)'} type='text' name='hargaManggaPerKg' id='hargaManggaPerKg' errorMsg={error.hargaManggaPerKg}
                    placeholder='Harga Mangga' value ={inputTrx.hargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />

                  {jalur === '1' ?
                  <>
                    <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' errorMsg={error.teknikSorting}
                      placeholder='Teknik Sorting' value ={inputTrx.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                    
                    <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' errorMsg={error.metodePengemasan}
                      placeholder='Metode Pengemasan' value ={inputTrx.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                    <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='pengangkutan' errorMsg={error.pengangkutan}
                    placeholder='Pengangkutan' value ={inputTrx.pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                  </>: null }

                  <Input label={'Username Penerima'} type='text' name='namaPenerima' id='namaPenerima' errorMsg={error.namaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.namaPenerima}  onChange={handleChange} onBlur={validateInput} />
                      
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden required/>
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={'Org4'}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                 
                  <Input label={'Harga Mangga per Kg (Rp)'} type='text' name='hargaManggaPerKg' id='hargaManggaPerKg' errorMsg={error.hargaManggaPerKg}
                    placeholder='Harga Mangga' value ={inputTrx.hargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />
                  
                  {jalur === '1' ?
                  <>
                    <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' errorMsg={error.teknikSorting}
                      placeholder='Teknik Sorting' value ={inputTrx.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                          
                    <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' errorMsg={error.metodePengemasan}
                      placeholder='Metode Pengemasan' value ={inputTrx.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                    <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='pengangkutan' errorMsg={error.pengangkutan}
                    placeholder='Pengangkutan' value ={inputTrx.pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                  </>: null }
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden required/>
                  </div>
                </>
              </UnlockAccess>             
                    
              <div className='aset__button'>
                <div className='btn-links'>
                  <Button 
                    className="openModalBtn" buttonStyle='btn--primary' buttonSize='btn--medium' type={'button'} 
                    onClick={()=>{
                      setModalOpen(true);
                    }}
                    disabled = { 
                      role === 'Org1' ? !inputTrx.varietasBenih ||!inputTrx.kuantitasBenih ||!inputTrx.umurBenih ||!inputTrx.hargaBenihPerBuah || !inputTrx.namaPenerima || 
                        error.varietasBenih || error.kuantitasBenih || error.umurBenih || error.hargaBenihPerBuah || error.namaPenerima || checked.length===0 :
                      role === 'Org2' ? !inputTrx.kuantitasManggaKg || !inputTrx.hargaManggaPerKg || !inputTrx.namaPenerima || 
                        error.kuantitasManggaKg || error.hargaManggaPerKg || error.namaPenerima || checked.length === 0 :
                      role === 'Org3' &&  jalur === '1'? !inputTrx.kuantitasManggaKg || !inputTrx.teknikSorting || !inputTrx.hargaManggaPerKg || !inputTrx.metodePengemasan || !inputTrx.pengangkutan || !inputTrx.namaPenerima ||
                        error.kuantitasManggaKg || error.teknikSorting || error.hargaManggaPerKg || error.metodePengemasan || error.pengangkutan || error.namaPenerima || checked.length === 0 :
                      role === 'Org3' && jalur === '2'? !inputTrx.kuantitasManggaKg  || !inputTrx.hargaManggaPerKg || !inputTrx.namaPenerima ||
                        error.kuantitasManggaKg || error.hargaManggaPerKg ||  error.namaPenerima || checked.length === 0 :
                      role === 'Org4' && jalur === '1' ?!inputTrx.kuantitasManggaKg ||!inputTrx.teknikSorting ||!inputTrx.hargaManggaPerKg ||!inputTrx.metodePengemasan ||!inputTrx.pengangkutan ||
                        error.kuantitasManggaKg || error.teknikSorting || error.hargaManggaPerKg || error.metodePengemasan || error.pengangkutan || checked.length === 0 :
                      !inputTrx.kuantitasManggaKg || !inputTrx.hargaManggaPerKg || error.kuantitasManggaKg || error.hargaManggaPerKg ||  checked.length === 0
                    }
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
                      form='buat-transaksi-baru'
                    />
                  }
                </div>
              </div> 
            </form>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default TransaksiForm