import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pianist from './pianist';
import PianistDetail from './pianist-detail';
import PianistUpdate from './pianist-update';
import PianistDeleteDialog from './pianist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PianistDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PianistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PianistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PianistDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pianist} />
    </Switch>
  </>
);

export default Routes;
