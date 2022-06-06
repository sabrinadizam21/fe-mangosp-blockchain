import React from 'react'
import "./Modal.css"
import { ImCross } from "react-icons/im"

function ModalDetTrx({ 
    setModalDetTrxOpen,
    modalDetTrxTitle
   }) {
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__header">
            <div className="modal__title">
                <p>{modalDetTrxTitle}</p>
            </div>
          <button
            onClick={() => {
                setModalDetTrxOpen(false);
            }}
          >
            <ImCross />
          </button>
        </div>
        <div className="modal__body">
            <table>
                <tr>
                    <td>Varietas</td>
                    <td>Benih A</td>
                </tr>
                <tr>
                    <td>Umur Benih</td>
                    <td>24 Hari</td>
                </tr>
                <tr>
                    <td>Kuantitas Benih</td>
                    <td>100 Kg</td>
                </tr>
            </table>
        </div>
       
      </div>
    </div>
  )
}

export default ModalDetTrx