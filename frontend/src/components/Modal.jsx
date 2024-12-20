import { useState, useEffect } from "react";
import '../styles/modal.css';
import { defaultModalHeight, defaultModalWidth } from "../constants";

import { ToastContainer } from "react-toastify";

const Modal = ({setShow, scroll=true, width=defaultModalWidth, height=defaultModalHeight, header, children, showHr=false}) => {

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      // Clean up by resetting overflow when the component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
  }, []);

  return(
      <>
        
          <div className="custom-modal-backdrop" onClick={() => setShow(false)}>
              <div className={`custom-modal ${scroll? 'overflow-y-scroll': 'overflow-y-hidden'}`} style={{width, height}} onClick={e => e.stopPropagation()}>
                <div className="custom-modal-header mb-4 d-flex justify-content-between align-items-center">
                  <h4 className="fw-bold">{header}</h4>
                  <button className="bg-transparent m-0 p-0 border-0" onClick={() => setShow(false)}>
                    <span className="material-symbols-outlined">
                      close
                    </span>
                  </button>
                  
                </div>
                {showHr && <hr className="border border-primary border-3 opacity-75"></hr>}
                {children}
              </div>
          </div>

        
      </>
  )
}

export default Modal;