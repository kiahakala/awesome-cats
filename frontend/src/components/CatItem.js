import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./CatItem.module.css";

function CatItem({ cat }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.cat}>
      <img src={cat.image} alt={cat.title} />
      <h1>{cat.title}</h1>
      <time>{cat.date}</time>
      <p>{cat.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default CatItem;
