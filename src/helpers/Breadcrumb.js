import React from 'react';
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathnames = pathname.split('/').filter((x) => x);
  return pathname !== '/Home' ? (
    <MUIBreadcrumbs style={{ marginTop: '1rem' }} aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link
          style={{
            color: 'white',
          }}
          onClick={() => history.push('/Home')}
        >
          Home
        </Link>
      ) : (
        <Typography color="inherit"> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            style={{
              color: 'white',
              textTransform: 'capitalize',
            }}
            key={name}
          >
            {name}
          </Typography>
        ) : (
          <Link
            style={{
              textTransform: 'capitalize',
              color: 'white',
            }}
            key={name}
            onClick={() => history.push(routeTo)}
          >
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  ) : null;
};

export default withRouter(Breadcrumbs);
