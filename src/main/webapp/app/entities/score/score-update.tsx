import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPianist } from 'app/shared/model/pianist.model';
import { getEntities as getPianists } from 'app/entities/pianist/pianist.reducer';
import { getEntity, updateEntity, createEntity, reset } from './score.reducer';
import { IScore } from 'app/shared/model/score.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScoreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ScoreUpdate = (props: IScoreUpdateProps) => {
  const [pianistId, setPianistId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { scoreEntity, pianists, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/score');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPianists();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...scoreEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pianistApp.score.home.createOrEditLabel">Create or edit a Score</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : scoreEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="score-id">ID</Label>
                  <AvInput id="score-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="score-name">
                  Name
                </Label>
                <AvField id="score-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorLabel" for="score-creator">
                  Creator
                </Label>
                <AvField id="score-creator" type="text" name="creator" />
              </AvGroup>
              <AvGroup check>
                <Label id="howToPlayLabel">
                  <AvInput id="score-howToPlay" type="checkbox" className="form-check-input" name="howToPlay" />
                  How To Play
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="levelLabel" for="score-level">
                  Level
                </Label>
                <AvInput
                  id="score-level"
                  type="select"
                  className="form-control"
                  name="level"
                  value={(!isNew && scoreEntity.level) || 'BEGINNER'}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="score-pianist">Pianist</Label>
                <AvInput id="score-pianist" type="select" className="form-control" name="pianist.id">
                  <option value="" key="0" />
                  {pianists
                    ? pianists.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/score" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  pianists: storeState.pianist.entities,
  scoreEntity: storeState.score.entity,
  loading: storeState.score.loading,
  updating: storeState.score.updating,
  updateSuccess: storeState.score.updateSuccess
});

const mapDispatchToProps = {
  getPianists,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ScoreUpdate);
