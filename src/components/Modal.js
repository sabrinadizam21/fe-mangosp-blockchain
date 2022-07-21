import React from "react"
import "./Modal.css"
import { ImCross } from "react-icons/im"

function Modal({ 
  setOpenModal,
  modalTitle,
  modalBody,
  cancelBtn,
  processBtn,
  hidden,
  form,
  disabled,
  setConfirmed
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
              setOpenModal(false)
              setConfirmed(true)
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
              setOpenModal(false)
              setConfirmed(true)
            }}
            id="cancelButton"
          >
            {cancelBtn}
          </button>
          <button type='submit' form={form} hidden={hidden} disabled={disabled}>{processBtn}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;