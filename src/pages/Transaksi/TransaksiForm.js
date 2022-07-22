import React, { useState, useContext, useEffect } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import UnlockAccess from '../../components/UnlockAccess'
import { UserContext } from '../../context/UserContext'
import './TransaksiForm.css'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'
import { AsetContext } from '../../context/AsetContext'

function TransaksiForm() {
  const [modalOpen, setModalOpen] = useState(false)
  const { profile, functionUser, error } = useContext(UserContext)
  const { validateInput, getUserLogin } = functionUser
  const { 
    createTrxPenangkar, createTrxPetani, createTrxPengumpul, createTrxPedagang,
    checked, setChecked, aset, inputTrx, setInputTrx, getId, currentIndex
  } = useContext(AsetContext)
  const username = Cookies.get('username')

  useEffect(()=>{
    getUserLogin(username)
  }, [username]) 

  const checkList = ["Bayar Langsung", "Transfer", "E-money", "Lainnya"]

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

  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(profile.role === 1) createTrxPenangkar(getId)
    else if(profile.role === 2) createTrxPetani(aset[currentIndex].manggaID)
    else if(profile.role === 3) createTrxPengumpul(aset[currentIndex].txID2)
    else if(profile.role === 4) createTrxPedagang(aset[currentIndex].txID3)
    history.push('/detail-transaksi')
    setModalOpen(false)
    console.log(aset)
  }  

  return (
    <>
      <div className="wrapper">
        <div className="section">
          <div className="header">
            <div>
              <div className="title">Buat Transaksi</div>
              <div className="subtitle">Lakukan transaksi dengan mengisi form dibawah</div>
            </div>
          </div>
          <div className="content">
            <form id='buat-transaksi-baru' onSubmit={handleSubmit}>
              <UnlockAccess request={1}> 
                <>
                  <Input label={'Kuantitas (Kg)'} type='number' name='kuantitasBenihKg' id='kuantitasBenihKg' errorMsg={error.kuantitasBenihKg}
                    placeholder='Kuantitas' value={inputTrx.kuantitasBenihKg} onChange={handleChange} onBlur={validateInput} />                    
                  
                  <Input label={'Umur Benih (bulan)'} type='number' name='umurBenih' id='umurBenih' errorMsg={error.umurBenih} 
                    placeholder='Umur Benih' value ={inputTrx.umurBenih}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Benih (Rp)'} type='number' name='hargaBenihPerKg' id='hargaBenihPerKg' errorMsg={error.hargaBenihPerKg} 
                    placeholder='Harga Benih' value ={inputTrx.hargaBenihPerKg}  onChange={handleChange} onBlur={validateInput} />

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
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={2}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Mangga (Rp)'} type='number' name='HargaManggaPerKg' id='HargaManggaPerKg' errorMsg={error.HargaManggaPerKg} 
                    placeholder='Harga Mangga' value ={inputTrx.HargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='namaPenerima' id='namaPenerima' errorMsg={error.namaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.namaPenerima}  onChange={handleChange} onBlur={validateInput} />

                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>

              <UnlockAccess request={3}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' errorMsg={error.teknikSorting}
                    placeholder='Teknik Sorting' value ={inputTrx.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga (Rp)'} type='text' name='hargaManggaPerKg' id='hargaManggaPerKg' errorMsg={error.hargaManggaPerKg}
                    placeholder='Harga Mangga' value ={inputTrx.hargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' errorMsg={error.metodePengemasan}
                    placeholder='Metode Pengemasan' value ={inputTrx.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'pengangkutan'} type='text' name='pengangkutan' id='pengangkutan' errorMsg={error.pengangkutan}
                    placeholder='pengangkutan' value ={inputTrx.pengangkutan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='namaPenerima' id='namaPenerima' errorMsg={error.namaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.namaPenerima}  onChange={handleChange} onBlur={validateInput} />
                      
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={4}>
                <>
                <Input label={'Kuantitas Mangga (Kg)'} type='number' name='kuantitasManggaKg' id='kuantitasManggaKg' errorMsg={error.kuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.kuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' errorMsg={error.teknikSorting}
                    placeholder='Teknik Sorting' value ={inputTrx.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga (Rp)'} type='text' name='hargaManggaPerKg' id='hargaManggaPerKg' errorMsg={error.hargaManggaPerKg}
                    placeholder='Harga Mangga' value ={inputTrx.hargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' errorMsg={error.metodePengemasan}
                    placeholder='Metode Pengemasan' value ={inputTrx.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'pengangkutan'} type='text' name='pengangkutan' id='pengangkutan' errorMsg={error.pengangkutan}
                    placeholder='pengangkutan' value ={inputTrx.pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                    
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='caraPembayaran' value={inputTrx.caraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>

              
                    
              <div className='aset__button'>
                <div className='btn-links'>
                  <Button 
                    className="openModalBtn" buttonSize='btn--medium' type={'button'} 
                    onClick={()=>{
                      setModalOpen(true);
                    }}
                    // disabled = {
                    //   !input1.kuantitas.length || !input1.umurBenih || !input1.umurPanen ||
                    //   !input1.hargaBenih || !input1.penerima || 
                    //   !input2.benih || !input2.kuantitasMangga || !input2.ukuran ||
                    //   !input2.pestisida || !input2.kadarAir || !input2.perlakuan ||
                    //   !input2.produktivitas || !input2.penerima ||
                    //   !input3.kuantitasMangga || !input3.teknikSorting || !input3.hargaMangga || 
                    //   !input3.metodePengemasan || !input3.pengangkutan || !input3.penerima || 
                    //     !input4.kuantitasMangga || !input4.teknikSorting ||
                    //   !input4.hargaMangga || !input4.metodePengemasan || !input4.kadarAir ||
                    //   !input4.penerima 
                    // } 
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
    </>
  )
}

export default TransaksiForm