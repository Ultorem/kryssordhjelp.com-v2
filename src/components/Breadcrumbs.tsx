import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Hjem
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <React.Fragment key={to}>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                {isLast ? (
                  <span className="text-gray-600">{name}</span>
                ) : (
                  <Link to={to} className="text-blue-600 hover:text-blue-800">
                    {name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;