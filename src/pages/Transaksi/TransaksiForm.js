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
    input1, setInput1, createTrxPenangkar, 
    input2, setInput2, checked, setChecked, createTrxPetani, 
    input3, setInput3, createTrxPengumpul, 
    input4, setInput4, createTrxPedagang 
  } = useContext(AsetContext)

  const username = Cookies.get('username')

  useEffect(()=>{
    getUserLogin(username)
  }, []) 

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
    if(profile.role === 1) setInput1({...input1, [name]:value})
    if(profile.role === 2) setInput2({...input2, [name]:value})
    if(profile.role === 3) setInput3({...input3, [name]:value})
    if(profile.role === 4) setInput4({...input4, [name]:value})
  }

  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(profile.role === 1) createTrxPenangkar()
    else if(profile.role === 2) createTrxPetani()
    else if(profile.role === 3) createTrxPengumpul()
    else if(profile.role === 4) createTrxPedagang()
    history.push('/detail-transaksi')
    setModalOpen(false)
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
                  <Input label={'Kuantitas'} type='number' name='KuantitasBenihKg' id='KuantitasBenihKg' errorMsg={error.KuantitasBenihKg}
                    placeholder='Kuantitas' value={input1.KuantitasBenihKg} onChange={handleChange} onBlur={validateInput} />                    
                  
                  <Input label={'Umur Benih'} type='number' name='UmurBenih' id='UmurBenih' errorMsg={error.UmurBenih} 
                    placeholder='Umur Benih' value ={input1.UmurBenih}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Umur Panen'} type='number' name='UmurPanen' id='UmurPanen' errorMsg={error.UmurPanen} 
                    placeholder='Umur Panen' value ={input1.UmurPanen}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Benih'} type='number' name='HargaBenihKg' id='HargaBenihKg' errorMsg={error.HargaBenihKg} 
                    placeholder='Harga Benih' value ={input1.HargaBenihKg}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='text' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima} 
                    placeholder='Penerima' value ={input1.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />
                        
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={input1.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={2}>
                <>
                  <Input label={'Benih'} type='text' name='Benih' id='Benih' errorMsg={error.Benih}
                    placeholder='Benih' value ={input2.Benih}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Kuantitas Mangga'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={input2.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Ukuran'} type='text' name='Ukuran' id='Ukuran' errorMsg={error.Ukuran}
                    placeholder='Ukuran' value ={input2.Ukuran}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Pestisida'} type='text' name='Pestisida' id='Pestisida' errorMsg={error.Pestisida}
                    placeholder='Pestisida' value ={input2.Pestisida}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Kadar Air'} type='text' name='KadarAir' id='KadarAir' errorMsg={error.KadarAir}
                    placeholder='Kadar Air' value ={input2.KadarAir}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Perlakuan'} type='text' name='Perlakuan' id='Perlakuan' errorMsg={error.Perlakuan}
                    placeholder='Perlakuan' value ={input2.Perlakuan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Produktivitas'} type='text' name='Produktivitas' id='Produktivitas' errorMsg={error.Produktivitas}
                    placeholder='Produktivitas' value ={input2.Produktivitas}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input  label={'Harga Mangga'} type='number' name='HargaManggaTotal' id='HargaManggaTotal' errorMsg={error.HargaManggaTotal} 
                    placeholder='Harga Mangga' value ={input2.HargaManggaTotal}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima}
                    placeholder='Penerima' value ={input2.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />

                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={input2.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>

              <UnlockAccess request={3}>
                <>
                  <Input label={'Kuantitas Mangga'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={input3.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='TeknikSorting' id='TeknikSorting' errorMsg={error.TeknikSorting}
                    placeholder='Teknik Sorting' value ={input3.TeknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga'} type='text' name='HargaManggaKg' id='HargaManggaKg' errorMsg={error.HargaManggaKg}
                    placeholder='Harga Mangga' value ={input3.HargaManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='MetodePengemasan' id='MetodePengemasan' errorMsg={error.MetodePengemasan}
                    placeholder='Metode Pengemasan' value ={input3.MetodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Pengangkutan'} type='text' name='Pengangkutan' id='Pengangkutan' errorMsg={error.Pengangkutan}
                    placeholder='Pengangkutan' value ={input3.Pengangkutan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='number' name='NamaPenerima' id='NamaPenerima' errorMsg={error.NamaPenerima}
                    placeholder='Penerima' value ={input3.NamaPenerima}  onChange={handleChange} onBlur={validateInput} />
                      
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={input3.CaraPembayaran = checked} onChange={handleChange} hidden />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={4}>
                <>
                <Input label={'Kuantitas Mangga'} type='number' name='KuantitasManggaKg' id='KuantitasManggaKg' errorMsg={error.KuantitasManggaKg}
                    placeholder='Kuantitas Mangga' value ={input4.KuantitasManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Teknik Sorting'} type='text' name='TeknikSorting' id='TeknikSorting' errorMsg={error.TeknikSorting}
                    placeholder='Teknik Sorting' value ={input4.TeknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Harga Mangga'} type='text' name='HargaManggaKg' id='HargaManggaKg' errorMsg={error.HargaManggaKg}
                    placeholder='Harga Mangga' value ={input4.HargaManggaKg}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='MetodePengemasan' id='MetodePengemasan' errorMsg={error.MetodePengemasan}
                    placeholder='Metode Pengemasan' value ={input4.MetodePengemasan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Pengangkutan'} type='text' name='Pengangkutan' id='Pengangkutan' errorMsg={error.Pengangkutan}
                    placeholder='Pengangkutan' value ={input4.Pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                    
                  <div>
                    <p>Metode Pembayaran : <span style={{color: 'red'}}>*</span> </p>
                    {checkList.map((item, index) => (
                      <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck} />
                        <span className={isChecked(item)}>{item}</span>
                      </div>
                    ))}
                    <input type="text" name='CaraPembayaran' value={input4.CaraPembayaran = checked} onChange={handleChange} hidden />
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