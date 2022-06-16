import React, { useState, useContext, useEffect } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import UnlockAccess from '../../components/UnlockAccess'
import { UserContext } from '../../context/UserContext'
import './TransaksiForm.css'
import Cookies from 'js-cookie'

function TransaksiForm() {
  const [modalOpen, setModalOpen] = useState(false)
  const { profile, functionUser, error } = useContext(UserContext)
  const { validateInput, getUserLogin } = functionUser
  const username = Cookies.get('username')

  useEffect(()=>{
    getUserLogin(username)
  }, [])

  const [input1, setInput1] = useState({
    kuantitas : '',
    umurBenih : '',
    umurPanen : '',
    hargaBenih : '',
    penerima : '',
  })

  const [input2, setInput2] = useState({
    benih : '',
    ukuran : '',
    pestisida : '',
    kadarAir : '',
    perlakuan : '',
    produktivitas : '',
    penerima : '',
  })

  const [input3, setInput3] = useState({
    kuantitasMangga : '',
    teknikSorting : '',
    hargaMangga : '',
    metodePengemasan : '',
    kadarAir : '',
    penerima : '',
    paymentMethod : ''
  })

  const [input4, setInput4] = useState({
    kuantitasMangga : '',
    teknikSorting : '',
    hargaMangga : '',
    metodePengemasan : '',
    kadarAir : '',
    penerima : ''
  })

  const handleChange = (event) => {
    let {value, name} = event.target
    if(profile.role === 1) setInput1({...input1, [name]:value})
    if(profile.role === 2) setInput2({...input2, [name]:value})
    if(profile.role === 3) setInput3({...input3, [name]:value})
    if(profile.role === 4) setInput4({...input4, [name]:value})
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
            <form id='buat-transaksi-baru'>
              <UnlockAccess request={1}> 
                <>
                  <Input label={'Kuantitas'} type='number' name='kuantitas' id='kuantitas' errorMsg={error.kuantitas}
                    placeholder='Kuantitas' value={input1.kuantitas} onChange={handleChange} onBlur={validateInput} />                    
                  
                  <Input label={'Umur Benih'} type='number' name='umurBenih' id='umurBenih' errorMsg={error.umurBenih} 
                    placeholder='Umur Benih' value ={input1.umurBenih}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Umur Panen'} type='number' name='umurPanen' id='umurPanen' errorMsg={error.umurPanen} 
                    placeholder='Umur Panen' value ={input1.umurPanen}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Harga Benih'} type='number' name='hargaBenih' id='hargaBenih' errorMsg={error.hargaBenih} 
                    placeholder='Harga Benih' value ={input1.hargaBenih}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Penerima'} type='text' name='penerima' id='penerima' errorMsg={error.penerima} 
                    placeholder='Penerima' value ={input1.penerima}  onChange={handleChange} onBlur={validateInput} />
                        
                  <div>
                    <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                    <input type="checkbox" name="paymentMethod" id="cash" value={'cash'} required /> Bayar langsung <br />
                    <input type="checkbox" name="paymentMethod" id="transfer" value={'transfer'} /> Transfer bank <br />
                    <input type="checkbox" name="paymentMethod" id="emoney" value={'emoney'} /> E-money <br />
                    <input type="checkbox" name="paymentMethod" id="other" value={'other'} /> Lainnya <br />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={2}>
                <>
                  <Input label={'Benih'} type='text' name='benih' id='benih' errorMsg={error.benih}
                    placeholder='Benih' value ={input2.benih}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' errorMsg={error.kuantitasMangga}
                    placeholder='Kuantitas Mangga' value ={input2.kuantitasMangga}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input label={'Ukuran'} type='text' name='ukuran' id='ukuran' errorMsg={error.ukuran}
                    placeholder='Ukuran' value ={input2.ukuran}  onChange={handleChange} onBlur={validateInput} />
                        
                  <Input  label={'Pestisida'} type='text' name='pestisida' id='pestisida' errorMsg={error.pestisida}
                    placeholder='Pestisida' value ={input2.pestisida}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Kadar Air'} type='text' name='kadarAir' id='kadarAir' errorMsg={error.kadarAir}
                    placeholder='Kadar Air' value ={input2.kadarAir}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Perlakuan'} type='text' name='perlakuan' id='perlakuan' errorMsg={error.perlakuan}
                    placeholder='Perlakuan' value ={input2.perlakuan}  onChange={handleChange} onBlur={validateInput} />

                  <Input label={'Produktivitas'} type='text' name='produktivitas' id='produktivitas' errorMsg={error.produktivitas}
                    placeholder='Produktivitas' value ={input2.produktivitas}  onChange={handleChange} onBlur={validateInput} />
                  
                  <Input label={'Penerima'} type='number' name='penerima' id='penerima' errorMsg={error.penerima}
                    placeholder='Penerima' value ={input2.penerima}  onChange={handleChange} onBlur={validateInput} />
                </>
              </UnlockAccess>

              <UnlockAccess request={3}>
                <>
                  <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                    placeholder='Kuantitas Mangga' value ={input3.kuantitasMangga}  onChange={handleChange} onBlur={validateInput} />
                    {error.kuantitasMangga && <span className='err'>{error.kuantitasMangga}</span>}
                        
                  <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                    placeholder='Teknik Sorting' value ={input3.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                    {error.teknikSorting && <span className='err'>{error.teknikSorting}</span>}
                  
                  <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                    placeholder='Harga Mangga' value ={input3.hargaMangga}  onChange={handleChange} onBlur={validateInput} />
                    {error.hargaMangga && <span className='err'>{error.hargaMangga}</span>}
                        
                  <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                    placeholder='Metode Pengemasan' value ={input3.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />
                    {error.metodePengemasan && <span className='err'>{error.metodePengemasan}</span>}

                  <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                    placeholder='Pengangkutan' value ={input3.pengangkutan}  onChange={handleChange} onBlur={validateInput} />
                    {error.pengangkutan && <span className='err'>{error.pengangkutan}</span>}

                  <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                    placeholder='Penerima' value ={input3.penerima}  onChange={handleChange} onBlur={validateInput} />
                    {error.penerima && <span className='err'>{error.penerima}</span>}
                      
                  <div>
                    <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                    <input type="checkbox" name="paymentMethod" id="cash" value={'cash'} required /> Bayar langsung <br />
                    <input type="checkbox" name="paymentMethod" id="transfer" value={'transfer'} /> Transfer bank <br />
                    <input type="checkbox" name="paymentMethod" id="emoney" value={'emoney'} /> E-money <br />
                    <input type="checkbox" name="paymentMethod" id="other" value={'other'} /> Lainnya <br />
                  </div>
                </>
              </UnlockAccess>
              
              <UnlockAccess request={4}>
                <>
                <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                  placeholder='Kuantitas Mangga' value ={input4.kuantitasMangga}  onChange={handleChange} onBlur={validateInput} />
                  {error.kuantitasMangga && <span className='err'>{error.kuantitasMangga}</span>}
                      
                <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                  placeholder='Teknik Sorting' value ={input4.teknikSorting}  onChange={handleChange} onBlur={validateInput} />
                  {error.teknikSorting && <span className='err'>{error.teknikSorting}</span>}
                
                <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                  placeholder='Harga Mangga' value ={input4.hargaMangga}  onChange={handleChange} onBlur={validateInput} />
                  {error.hargaMangga && <span className='err'>{error.hargaMangga}</span>}
                      
                <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                  placeholder='Metode Pengemasan' value ={input4.metodePengemasan}  onChange={handleChange} onBlur={validateInput} />
                  {error.metodePengemasan && <span className='err'>{error.metodePengemasan}</span>}

                <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                  placeholder='Pengangkutan' value ={input4.kadarAir}  onChange={handleChange} onBlur={validateInput} />
                  {error.kadarAir && <span className='err'>{error.kadarAir}</span>}

                <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                  placeholder='Penerima' value ={input4.penerima}  onChange={handleChange} onBlur={validateInput} />
                  {error.penerima && <span className='err'>{error.penerima}</span>}
                    
                <div>
                  <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                  <input type="checkbox" name="paymentMethod" id="cash" value={'cash'} required /> Bayar langsung <br />
                  <input type="checkbox" name="paymentMethod" id="transfer" value={'transfer'} /> Transfer bank <br />
                  <input type="checkbox" name="paymentMethod" id="emoney" value={'emoney'} /> E-money <br />
                  <input type="checkbox" name="paymentMethod" id="other" value={'other'} /> Lainnya <br />
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