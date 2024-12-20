import { useState, useEffect } from "react";
import Modal from "../../Modal";
import ProductsList from "./ProductsList";

const GroceryHaulModal = ({setShowModal, receipt, totalGroceriesCost}) => {
    
    return (
        <Modal setShow={setShowModal} scroll={true} header={'Groceries'} showHr={true}>
            <h5><span className="fw-bold">Total</span>: ${totalGroceriesCost}</h5>
            <ProductsList
                receipt={receipt}
                totalCost={totalGroceriesCost}
                expanded={true}
            />
        </Modal>
    )
}

export default GroceryHaulModal;
