import DietPlanView from "../components/DietPlans/DietPlanView";
import { useParams } from "react-router-dom";

const DietPlan = () => {
    // Shows the details of a saved diet plan.
    const uuid = useParams().uuid
    return <DietPlanView dietPlanId={uuid}/>
}

export default DietPlan;
