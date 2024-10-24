import { useState, useEffect } from "react";

const DetailsForm = ({foodData, setFoodData}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
        <div className="create-food-form">
                <p className="fw-bold h4">Info</p>

                <div className="row mb-3">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Product Full Name</label>
                    <div className="col-sm-8">
                        <input type="text" id="productName" placeholder="Full product name" onChange={handleChange}
                        className="form-control" name="productName" value={foodData.productName}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="productLink" className="col-sm-2 col-form-label">Product Link</label>
                    <div className="col-sm-8">
                        <input type="urls" id="productLink" placeholder="Product Link" onChange={handleChange}
                        className="form-control" name="productLink" value={foodData.productLink}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="servingTable" className="col-sm-2 col-form-label">Serving Sizes</label>
                    <div className="col-sm-6">
                        <table id="servingTable" className="table serving-table">
                            <colgroup>
                                <col style={{width: '33%'}}/>
                                <col style={{width: '33%'}}/>
                                <col style={{width: '33%'}}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th># Servings</th>
                                    <th>Serving Unit</th>
                                    <th>Serving Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="number" min="1" onChange={handleChange} className="form-control"
                                        name="servings" value={foodData.servings}/>
                                    </td>
                                    <td>
                                        <select onChange={handleChange} className="form-select" name="servingUnit" value={foodData.servingUnit} >
                                            <option value="g">Grams</option>
                                            <option value="ml">Mililiters</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" min="1" onChange={handleChange} className="form-control"
                                        name="servingSize" value={foodData.servingSize} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="productPrice" className="col-sm-2 col-form-label">Product Price</label>
                    <div className="col-sm-2">
                        <input type="number" min="1" step="0.01" id="productPrice" placeholder="Product Price" className="form-control"/>
                    </div>
                </div>
                
                <div className="mb-3">
                    
                </div>

            </div>
        </>
    )
}

export default DetailsForm;
