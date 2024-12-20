import { useState, useEffect, Fragment } from "react";
import { roundTo } from "../../../lib/functions";

const ProductsList = ({receipt, groceriesTotalCost, expanded=false}) => {

    return (
        <table className={`table ${expanded? 'table-striped table-bordered table-hover': ''}`}>
        <thead className={`${expanded? 'table-dark': ''}`}>
            <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>$</th>
            </tr>
        </thead>
        
        <tbody>
            {/* All products in the shopping cart*/}
            {receipt.map((product, idx) => {
                return (
                    <Fragment key={idx}>
                    {(() => {
                            console.log(receipt)
                            const productName = product.product.foodData.productName;
                            const foodData = product.product.foodData;
                            const nItemsToBuy = product.nItemsToBuy;
                            const totalCost = product.totalCost;

                            return (
                                <tr key={idx}>
                                    <td>
                                        <span className="d-flex justify-content-between align-content-center" title={productName}>
                                            {productName.length > 30 && !expanded?  `${productName.slice(0, 30)}...`: productName}
                                            <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center">
                                                <span className="material-symbols-outlined">
                                                    {foodData.productLink?
                                                        <a href={foodData.productLink} target="_blank" className="text-decoration-none text-body">
                                                            open_in_new
                                                        </a>
                                                        :
                                                        'open_in_new'
                                                    }
                                                </span>
                                            </button>
                                        </span>
                                    </td>
                                    <td>{nItemsToBuy}</td>
                                    <td>{totalCost}</td>
                                </tr>
                            )
                        })()}
                    </Fragment>
                )   
            })}
        </tbody>
    </table>
    )
}

export default ProductsList;
