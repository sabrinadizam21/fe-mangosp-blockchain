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
    checked, setChecked, aset, inputTrx, setInputTrx, getId
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
    else if(profile.role === 2) createTrxPetani(getId)
    else if(profile.role === 3) createTrxPengumpul()
    else if(profile.role === 4) createTrxPedagang()
    history.push('/detail-transaksi')
    setModalOpen(false)
    console.log(aset)
  }  

  console.log(getId)

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
                  <Input label={'Kuantitas (Kg)'} type='number' name='KuantitasBenihKg' id='KuantitasBenihKg' errorMsg={error.KuantitasBenihKg}
                    placeholder='Kuantitas' value={inputTrx.KuantitasBenihKg} onChange={handleChange} onBlur={validateInput} />                    
                  
                  <Input label={'Umur Benih (bulan)'} type='number' name='UmurBenih' id='UmurBenih' errorMsg={error.UmurBenih} 
                    placeholder='Umur Benih' value ={inputTrx.UmurBenih}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Benih (Rp)'} type='number' name='HargaBenihKg' id='HargaBenihKg' errorMsg={error.HargaBenihKg} 
                    placeholder='Harga Benih' value ={inputTrx.HargaBenihKg}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='text' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima} 
                    placeholder='Username Penerima' value ={inputTrx.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />
                        
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={inputTrx.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={2}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Mangga (Rp)'} type='number' name='HargaManggaPerKg' id='HargaManggaPerKg' errorMsg={error.HargaManggaPerKg} 
                    placeholder='Harga Mangga' value ={inputTrx.HargaManggaPerKg}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />

                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={inputTrx.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>

              <UnlockAccess request={3}>
                <>
                  <Input label={'Kuantitas Mangga (Kg)'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='TeknikSorting' id='TeknikSorting' errorMsg={error.TeknikSorting}
                    placeholder='Teknik Sorting' value ={inputTrx.TeknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga (Rp)'} type='text' name='HargaManggaKg' id='HargaManggaKg' errorMsg={error.HargaManggaKg}
                    placeholder='Harga Mangga' value ={inputTrx.HargaManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='MetodePengemasan' id='MetodePengemasan' errorMsg={error.MetodePengemasan}
                    placeholder='Metode Pengemasan' value ={inputTrx.MetodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Pengangkutan'} type='text' name='Pengangkutan' id='Pengangkutan' errorMsg={error.Pengangkutan}
                    placeholder='Pengangkutan' value ={inputTrx.Pengangkutan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima}
                    placeholder='Username Penerima' value ={inputTrx.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />
                      
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={inputTrx.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={4}>
                <>
                <Input label={'Kuantitas Mangga (Kg)'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={inputTrx.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='TeknikSorting' id='TeknikSorting' errorMsg={error.TeknikSorting}
                    placeholder='Teknik Sorting' value ={inputTrx.TeknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga (Rp)'} type='text' name='HargaManggaKg' id='HargaManggaKg' errorMsg={error.HargaManggaKg}
                    placeholder='Harga Mangga' value ={inputTrx.HargaManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='MetodePengemasan' id='MetodePengemasan' errorMsg={error.MetodePengemasan}
                    placeholder='Metode Pengemasan' value ={inputTrx.MetodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Pengangkutan'} type='text' name='Pengangkutan' id='Pengangkutan' errorMsg={error.Pengangkutan}
                    placeholder='Pengangkutan' value ={inputTrx.Pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                    
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={inputTrx.CaraPembayaran = checked} onChange={handleChange} hidden />
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