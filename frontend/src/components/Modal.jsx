import { useState, useEffect } from "react";
import '../styles/modal.css';
import { defaultModalHeight, defaultModalWidth } from "../constants";

const Modal = ({setShow, scroll=true, width=defaultModalWidth, height=defaultModalHeight, header, children}) => {

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      // Clean up by resetting overflow when the component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
  }, []);

  return(
      <>
        
          <div className="modal-backdrop" onClick={() => setShow(false)}>
              <div className={`custom-modal ${scroll? 'overflow-y-scroll': 'overflow-y-hidden'}`} style={{width, height}} onClick={e => e.stopPropagation()}>
                <div className="custom-modal-header mb-4">
                  <h4 className="fw-bold">{header}</h4>
                </div>
                {children}
              </div>
          </div>
        
      </>
  )
}

export default Modal;