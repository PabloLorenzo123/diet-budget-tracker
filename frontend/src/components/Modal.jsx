import { useState, useEffect } from "react";
import '../styles/modal.css';

const Modal = ({setShow, children}) => {

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
              <div className="custom-modal" onClick={e => e.stopPropagation()}>
                {children}
              </div>
          </div>
        
      </>
  )
}

export default Modal;