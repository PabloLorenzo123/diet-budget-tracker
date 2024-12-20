import { useState, useEffect } from "react";
import Modal from "../../Modal";
import ProductsList from "./ProductsList";

const GroceryHaulModal = ({setShowModal, receipt, totalCost}) => {
    
    return (
        <Modal setShow={setShowModal} scroll={true} header={'Groceries'} showHr={true}>
            <h5><span className="fw-bold">Total</span>: ${totalCost}</h5>
            <ProductsList
                receipt={receipt}
                totalCost={totalCost}
                expanded={true}
            />
        </Modal>
    )
}

export default GroceryHaulModal;
