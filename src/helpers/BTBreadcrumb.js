import React from 'react';
import { Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

const BTBreadcrumb = (props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {props.arr.map((item, i) => (
          <li
            key={i}
            className="breadcrumb-item"
            aria-current={!item.url ? 'page' : 'false'}
          >
            {item.url ? (
              <Link className="bc-sub-item" to={item.url}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BTBreadcrumb;
