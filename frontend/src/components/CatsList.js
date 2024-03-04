import { Link } from 'react-router-dom';

import classes from './CatsList.module.css'

function CatsList({cats}) {

  return (
    <div className={classes.cats}>
      <h1>All Cats</h1>
      <ul className={classes.list}>
        {cats.map((cat) => (
          <li key={cat.id} className={classes.item}>
            <Link to={`/cats/${cat.id}`}>
              <img src={cat.image} alt={cat.title} />
              <div className={classes.content}>
                <h2>{cat.title}</h2>
                <time>{cat.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatsList;