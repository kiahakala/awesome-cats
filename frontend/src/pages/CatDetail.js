import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import CatItem from "../components/CatItem";
import CatsList from "../components/CatsList";
import { getAuthToken } from "../util/auth";

function CatDetailPage() {
  // Get identifier from the path
  //const params = useParams()
  //const data = useLoaderData()

  // useRouteLoaderData takes route id as an arg
  const { cat, cats } = useRouteLoaderData("cat-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={cat}>
          {(loadedCat) => <CatItem cat={loadedCat} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={cats}>
          {(loadedCats) => <CatsList cats={loadedCats} />}
        </Await>
      </Suspense>
    </>
  );
}

export default CatDetailPage;

async function loadCat(id) {
  const response = await fetch("http://localhost:8080/cats/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the selected cat" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.cat;
  }
}

async function loadCats() {
  const response = await fetch("http://localhost:8080/cats/");

  if (!response.ok) {
    throw json({ message: "Could not fetch cats." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.cats;
  }
}

export async function loader({ params }) {
  const id = params.catId;

  return defer({
    cat: await loadCat(id),
    cats: loadCats(),
  });
}

export async function action({ params, request }) {
  const catId = params.catId;
	const token = getAuthToken()
  const response = await fetch("http://localhost:8080/cats/" + catId, {
    method: request.method,
		headers: {
			'Authorization': 'Bearer ' + token
		}
  });

  if (!response.ok) {
    throw json({ message: "Could not delete cat" }, { status: 500 });
  }
  return redirect("/cats");
}
