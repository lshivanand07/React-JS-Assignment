import './Breadcrumbs.css';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((value) => value);
  let breadcrumbsPath = '';

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbsPath += `/${name}`;

        const isLastIndex = index === pathnames.length - 1;

        return (
          <span>
            {' > '}
            {isLastIndex ? (
              <span>{name}</span>
            ) : (
              <Link to={breadcrumbsPath}>{name}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
