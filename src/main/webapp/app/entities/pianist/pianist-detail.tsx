import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pianist.reducer';
import { IPianist } from 'app/shared/model/pianist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPianistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PianistDetail = (props: IPianistDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pianistEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Pianist [<b>{pianistEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">Number</span>
          </dt>
          <dd>{pianistEntity.number}</dd>
        </dl>
        <Button tag={Link} to="/pianist" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pianist/${pianistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pianist }: IRootState) => ({
  pianistEntity: pianist.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PianistDetail);
