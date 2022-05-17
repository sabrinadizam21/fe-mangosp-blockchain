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
                placeholder='Kuantitas'  onChange={'handleChange'} required />
              
              <Input label={'Umur Benih'} type='number' name='umurBenih' id='umurBenih' 
                placeholder='Umur Benih'  onChange={'handleChange'} required />
                    
              <Input label={'Umur Panen'} type='number' name='umurPanen' id='umurPanen' 
                placeholder='Umur Panen'  onChange={'handleChange'} required />
                    
              <Input  label={'Harga Benih'} type='number' name='hargaBenih' id='hargaBenih' 
                placeholder='Harga Benih'  onChange={'handleChange'} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima'  onChange={'handleChange'} required />
                    
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" /> Lainnya <br />
              </div>

              </>) }
              
              { profile.role === 2 && (<>
               <Input label={'Benih'} type='text' name='benih' id='benih' 
                placeholder='Benih'  onChange={'handleChange'} required />
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga'  onChange={'handleChange'} required />
                    
              <Input label={'Ukuran'} type='text' name='ukuran' id='ukuran' 
                placeholder='Ukuran'  onChange={'handleChange'} required />
                    
              <Input  label={'Pestisida'} type='text' name='pestisida' id='pestisida' 
                placeholder='Pestisida'  onChange={'handleChange'} required />

              <Input label={'Kadar Air'} type='text' name='kadarAir' id='kadarAir' 
                placeholder='Kadar Air'  onChange={'handleChange'} required />

              <Input label={'Perlakuan'} type='text' name='perlakuan' id='perlakuan' 
                placeholder='Perlakuan'  onChange={'handleChange'} required />

              <Input label={'Produktivitas'} type='text' name='produktivitas' id='produktivitas' 
                placeholder='Produktivitas'  onChange={'handleChange'} required />
              
              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima'  onChange={'handleChange'} required />
                
              </>) }

              { profile.role === 3 && (<>
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga'  onChange={'handleChange'} required />
                    
               <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                placeholder='Teknik Sorting'  onChange={'handleChange'} required />
              
              <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                placeholder='Harga Mangga'  onChange={'handleChange'} required />
                    
              <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                placeholder='Metode Pengemasan'  onChange={'handleChange'} required />

              <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                placeholder='Pengangkutan'  onChange={'handleChange'} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima'  onChange={'handleChange'} required />
                  
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" /> Lainnya <br />
              </div>
                 
              </>) }
              
              { profile.role === 4 && (<>
              <Input label={'Kuantitas Mangga'} type='number' name='kuantitasMangga' id='kuantitasMangga' 
                placeholder='Kuantitas Mangga'  onChange={'handleChange'} required />
                    
               <Input label={'Teknik Sorting'} type='text' name='teknikSorting' id='teknikSorting' 
                placeholder='Teknik Sorting'  onChange={'handleChange'} required />
              
              <Input label={'Harga Mangga'} type='text' name='hargaMangga' id='hargaMangga' 
                placeholder='Harga Mangga'  onChange={'handleChange'} required />
                    
              <Input  label={'Metode Pengemasan'} type='text' name='metodePengemasan' id='metodePengemasan' 
                placeholder='Metode Pengemasan'  onChange={'handleChange'} required />

              <Input label={'Pengangkutan'} type='text' name='pengangkutan' id='kadarAir' 
                placeholder='Pengangkutan'  onChange={'handleChange'} required />

              <Input label={'Penerima'} type='number' name='penerima' id='penerima' 
                placeholder='Penerima'  onChange={'handleChange'} required />
                  
              <div>
                <label htmlFor="">Metode Pembayaran : <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="checkbox" name="paymentMethod" id="cash" required /> Bayar langsung <br />
                <input type="checkbox" name="paymentMethod" id="transfer" /> Transfer bank <br />
                <input type="checkbox" name="paymentMethod" id="emoney" /> E-money <br />
                <input type="checkbox" name="paymentMethod" id="other" /> Lainnya <br />
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