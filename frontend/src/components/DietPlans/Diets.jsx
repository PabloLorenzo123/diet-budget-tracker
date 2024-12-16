import { useState, useEffect } from "react";
import api from "../../api";

import { toast } from "react-toastify";

const Diets = () => {
    const [dietPlans, setDietPlans] = useState([]);

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const res = await api.get('diet/diet-plans/');
                if (res.status == 200){
                    setDietPlans(res.data.dietPlans)
                }
            } catch (err) {
                console.log(err)
                toast.error(err.message)
            }
        }
        fetchDietPlans()
    }, [])

    return (
    <>
        <h1 className="fw-bold">Your Diet Plans</h1>
        <p className="lead">Browse through your diet plans</p>
        <div className="mt-2 bg-white" style={{width: '100%', height: '100%'}} >
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Date</th>
                        <th>Budget</th>
                        <th></th>
                    </tr>
                </thead>
            
                <tbody>
                    {dietPlans.map((d, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{d.name}</td>
                                <td>{d.protein}</td>
                                <td>{d.netCarbs}</td>
                                <td>{d.totalFat}</td>
                                <td>{d.date}</td>
                                <td>{d.budget}</td>
                                <td>
                                    <button type="button" className="delete-btn">
                                        <span className="material-symbols-outlined">
                                            delete_forever
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
    )
}

export default Diets;