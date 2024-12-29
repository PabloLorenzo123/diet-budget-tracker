import { useState, useEffect } from "react";
import api from "../../api";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import LoadingSpinner from '../LoadingSpinner';

const Diets = () => {
    const [Loading, setLoading] = useState(false);
    const [dietPlans, setDietPlans] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                setLoading(true);
                const res = await api.get('diet/diet-plans/');
                if (res.status == 200) {
                    setDietPlans(res.data.dietPlans)
                }
            } catch (err) {
                console.log(err)
                toast.error(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchDietPlans()
    }, [])

    const goDietDetails = (id) => {
        navigate(`${id}`);
    }

    const deleteDietPlan = async (e, id, name) => {
        e.stopPropagation();
        try {
            const userConfirmed = window.confirm("Are you sure you want to delete this?");
            if (!userConfirmed) return;
            const res = await api.delete(`diet/diet-plan/${id}`);
            if (res.status == 204) {
                setDietPlans(prev => {
                    return prev.filter(dp => dp.id != id);
                })
                toast.success(`${name} has been deleted.`);
            }
        } catch (err) {
            console.log(err);
            toast.error(`${name} could'nt be deleted`);
        }
    }

    if (Loading) {
        return <LoadingSpinner />
    } else {
        return (
            <>
                <h1 className="fw-bold">Your Diet Plans</h1>
                <p className="lead">Browse through your diet plans</p>

                <div className="p-1 bg-white rounded">
                    <div className="custom-table-wrapper" >
                        <table className="table custom-table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Protein (g)</th>
                                    <th scope="col">Carbs (g)</th>
                                    <th scope="col">Fat (g)</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Budget</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dietPlans.map((d, idx) => {
                                    return (
                                        <tr key={idx} onClick={() => goDietDetails(d.id)} style={{ cursor: 'pointer' }}>
                                            <td>{d.name}</td>
                                            <td>{d.protein}g</td>
                                            <td>{d.netCarbs}g</td>
                                            <td>{d.totalFat}g</td>
                                            <td>{d.date}</td>
                                            <td>${d.budget}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteDietPlan(e, d.id, d.name);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        delete_forever
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        )
    }
}

export default Diets;