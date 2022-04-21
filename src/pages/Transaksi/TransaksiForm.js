import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import './TransaksiForm.css'

function TransaksiForm() {
  const [modalOpen, setModalOpen] = useState(false)
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
                    <Input label={'Jumlah'} type='text' name='jumlah' id='jumlah' 
                        placeholder='Jumlah'  onChange={'handleChange'} required />
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