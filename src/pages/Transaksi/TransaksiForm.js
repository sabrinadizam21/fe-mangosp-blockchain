import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { UserContext } from '../../context/UserContext';
import './TransaksiForm.css'

function TransaksiForm() {
  const [modalOpen, setModalOpen] = useState(false)
  const {profile} = useContext(UserContext)

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
              { profile.role === 1 && (<>
               <Input label={'Kuantitas'} type='text' name='kuantitas' id='kuantitas' 
                placeholder='Kuantitas' value={input1.kuantitas} onChange={handleChange} required />
              
              <Input label={'Umur Benih'} type='number' name='umurBenih' id='umurBenih' 
                placeholder='Umur Benih' value ={input1.umurBenih}  onChange={handleChange} required />
                    
              <Input label={'Umur Panen'} type='number' name='umurPanen' id='umurPanen' 
                placeholder='Umur Panen' value ={input1.umurPanen}  onChange={handleChange} required />
                    
              <Input  label={'Harga Benih'} type='number' name='hargaBenih' id='hargaBenih' 
                placeholder='Harga Benih' value ={input1.hargaBenih}  onChange={handleChange} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima' value ={input1.penerima}  onChange={handleChange} required />
                    
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" value={input1.paymentMethod} required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" value={input1.paymentMethod} /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" value={input1.paymentMethod} /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" value={input1.paymentMethod} /> Lainnya <br />
              </div>

              </>) }
              
              { profile.role === 2 && (<>
               <Input label={'Benih'} type='text' name='benih' id='benih' 
                placeholder='Benih' value ={input2.benih}  onChange={handleChange} required />
              
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga' value ={input2.benih}  onChange={handleChange} required />
                    
              <Input label={'Ukuran'} type='text' name='ukuran' id='ukuran' 
                placeholder='Ukuran' value ={input2.ukuran}  onChange={handleChange} required />
                    
              <Input  label={'Pestisida'} type='text' name='pestisida' id='pestisida' 
                placeholder='Pestisida' value ={input2.pestisida}  onChange={handleChange} required />

              <Input label={'Kadar Air'} type='text' name='kadarAir' id='kadarAir' 
                placeholder='Kadar Air' value ={input2.kadarAir}  onChange={handleChange} required />

              <Input label={'Perlakuan'} type='text' name='perlakuan' id='perlakuan' 
                placeholder='Perlakuan' value ={input2.perlakuan}  onChange={handleChange} required />

              <Input label={'Produktivitas'} type='text' name='produktivitas' id='produktivitas' 
                placeholder='Produktivitas' value ={input2.produktivitas}  onChange={handleChange} required />
              
              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima' value ={input2.penerima}  onChange={handleChange} required />
                
              </>) }

              { profile.role === 3 && (<>
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga' value ={input3.kuantitasMangga}  onChange={handleChange} required />
                    
               <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                placeholder='Teknik Sorting' value ={input3.teknikSorting}  onChange={handleChange} required />
              
              <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                placeholder='Harga Mangga' value ={input3.hargaMangga}  onChange={handleChange} required />
                    
              <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                placeholder='Metode Pengemasan' value ={input3.metodePengemasan}  onChange={handleChange} required />

              <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                placeholder='Pengangkutan' value ={input3.kadarAir}  onChange={handleChange} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima' value ={input3.penerima}  onChange={handleChange} required />
                  
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" value={input3.paymentMethod} required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" value={input3.paymentMethod} /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" value={input3.paymentMethod} /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" value={input3.paymentMethod} /> Lainnya <br />
              </div>
                 
              </>) }
              
              { profile.role === 4 && (<>
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga' value ={input4.kuantitasMangga}  onChange={handleChange} required />
                    
               <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                placeholder='Teknik Sorting' value ={input4.teknikSorting}  onChange={handleChange} required />
              
              <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                placeholder='Harga Mangga' value ={input4.hargaMangga}  onChange={handleChange} required />
                    
              <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                placeholder='Metode Pengemasan' value ={input4.metodePengemasan}  onChange={handleChange} required />

              <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                placeholder='Pengangkutan' value ={input4.kadarAir}  onChange={handleChange} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima' value ={input4.penerima}  onChange={handleChange} required />
                  
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" value={input4.paymentMethod} required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" value={input4.paymentMethod} /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" value={input4.paymentMethod} /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" value={input4.paymentMethod} /> Lainnya <br />
              </div>
                 
              </>) }

              
                    
              <div className='aset__button'>
                <div className='btn-links'>
                  <Link to='/transaksi/buat'>
                    <Button buttonStyle='btn--outline' buttonSize='btn--medium'>BATAL</Button>
                  </Link>      
                </div>
                <div className='btn-links'>
                  <Button 
                    className="openModalBtn" buttonSize='btn--medium' type={'button'} 
                    onClick={()=>{
                      setModalOpen(true);
                    }}
                    // disabled = {!input.varietas.length|| !input.kuantitasBenih || !input.umurBenih || !input.umurPanen || !input.hargaPanen} 
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