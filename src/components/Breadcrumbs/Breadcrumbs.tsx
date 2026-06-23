import './Breadcrumbs.css';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(Boolean);

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const breadcrumbsPath = '/' + pathnames.slice(0, index + 1).join('/');

        const isLastIndex = index === pathnames.length - 1;

        return (
          <span key={breadcrumbsPath}>
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
