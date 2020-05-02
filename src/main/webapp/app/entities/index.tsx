import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pianist from './pianist';
import Score from './score';
import Course from './course';
import Entry from './entry';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}pianist`} component={Pianist} />
      <ErrorBoundaryRoute path={`${match.url}score`} component={Score} />
      <ErrorBoundaryRoute path={`${match.url}course`} component={Course} />
      <ErrorBoundaryRoute path={`${match.url}entry`} component={Entry} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
