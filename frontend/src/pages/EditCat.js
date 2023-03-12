import { useRouteLoaderData } from "react-router-dom";
import CatForm from "../components/CatForm";

function EditCatPage() {
	const data = useRouteLoaderData('cat-detail')
	
	return (
		<CatForm method='patch' cat={data.cat}/>
	)
}

export default EditCatPage