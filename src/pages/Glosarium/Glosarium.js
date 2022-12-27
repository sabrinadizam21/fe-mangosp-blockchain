import React, { useState } from "react"
import { FiSearch } from "react-icons/fi"
import './Glosarium.css'

const Glosarium = () => {
    const [ searchInput, setSearchInput ] = useState('')
    const [ searchParam ] = useState(['title'])
    const text = [
        {title: 'Penangkar', desc: 'Aktor rantai pasok yang melakukan penangkaran benih mangga atau sebagai penyedia benih'},
        {title: 'Petani', desc: 'Aktor rantai pasok yang bertugas menyiapkan lahan, menyiapkan benih, penanaman, pemeliharaan, dan pemanenan produk mangga'},
        {title: 'Pengumpul', desc: 'Aktor yang bertugas sebagai warehouse atau pengumpul produk dalam rantai pasok'},
        {title: 'Pedagang', desc: 'Aktor yang menjual mangga ke konsumen'},
        {title: 'Aset', desc: 'Produk yang dimiliki aktor, yakni benih atau mangga'},
        {title: 'Produktivitas', desc: 'Nilai rata-rata hasil produksi per satuan luas per komoditas'},
        {title: 'Kuantitas', desc: 'Jumlah produk benih atau mangga'},
        {title: 'Umur benih', desc: 'Umur benih ketika dijual ke petani'},
        {title: 'Pestisida', desc: 'Cairan atau alat yang digunakan untuk membasmi hama'},
        {title: 'Pupuk', desc: 'Bahan yang mengandung unsur hara atau nutrisi yang baik untuk pertumbuhan dan perkembangan tanaman'},
        {title: 'Perlakuan', desc: 'Prosedur yang diterapkan pada tanaman'},
        {title: 'Varietas', desc: 'Kelompok tanaman pada jenis atau spesies tertentu yang dapat dibedakan dari berdasarkan sifat atau bentuk'},
        {title: 'Tanggal masuk', desc: 'Tanggal yang tercatat saat mangga diterima Pengumpul atau Pedagang'},
        {title: 'Teknik sorting', desc: 'Teknik dalam melakukan kegiatan pemisahan produk berdasarkan kualitasnya'},
    ].sort((a, b) => a.title > b.title ? 1 : -1)

    const filterFunction = (items) => {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase()) > -1
                );
            });
        });
    }

    const dataGlosarium = filterFunction(text) 
    
    return (
        <>
            <div className="wrapper">
                <div className="section">            
                    <h2 className="title">Glosarium</h2> 
                    <div className="content">
                    <div className="input-search">
                        <form onSubmit={e => e.preventDefault()}>
                            <input value={searchInput} placeholder="Masukan kata" id="search-glosarium" onChange={(e) => setSearchInput(e.target.value)} />
                            <button><FiSearch color="#c3c3c3" /></button>
                        </form>
                    </div>
                        {dataGlosarium.map((data, index) => {
                        return(
                            <div className="section-glosarium" key={index}>
                                <div className="title-glosarium">{data.title}</div>
                                <div>{data.desc}</div>
                            </div>
                        )})}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default Glosarium