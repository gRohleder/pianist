import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './score.reducer';
import { IScore } from 'app/shared/model/score.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScoreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ScoreDetail = (props: IScoreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { scoreEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Score [<b>{scoreEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{scoreEntity.name}</dd>
          <dt>
            <span id="creator">Creator</span>
          </dt>
          <dd>{scoreEntity.creator}</dd>
          <dt>
            <span id="howToPlay">How To Play</span>
          </dt>
          <dd>{scoreEntity.howToPlay ? 'true' : 'false'}</dd>
          <dt>
            <span id="level">Level</span>
          </dt>
          <dd>{scoreEntity.level}</dd>
          <dt>Pianist</dt>
          <dd>{scoreEntity.pianist ? scoreEntity.pianist.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/score" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/score/${scoreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ score }: IRootState) => ({
  scoreEntity: score.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDetail);
