import React from "react";
import "./Modal.css";
import { ImCross } from "react-icons/im"

function Modal({ 
  setOpenModal,
  modalTitle,
  modalBody,
  cancelBtn,
  processBtn,
  typePrcsBtn
 }) {
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__header">
            <div className="modal__title">
                <p>{modalTitle}</p>
            </div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <ImCross />
          </button>
        </div>
        <div className="modal__body">
          {modalBody}
        </div>
        <div className="modal__footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelButton"
          >
            {cancelBtn}
          </button>
          <button type={typePrcsBtn} >{processBtn}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;