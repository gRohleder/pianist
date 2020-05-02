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
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entry.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntryUpdate = (props: IEntryUpdateProps) => {
  const [pianistId, setPianistId] = useState('0');
  const [courseId, setCourseId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { entryEntity, pianists, courses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/entry');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPianists();
    props.getCourses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...entryEntity,
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
          <h2 id="pianistApp.entry.home.createOrEditLabel">Create or edit a Entry</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entry-id">ID</Label>
                  <AvInput id="entry-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="entry-name">
                  Name
                </Label>
                <AvField id="entry-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="entry-pianist">Pianist</Label>
                <AvInput id="entry-pianist" type="select" className="form-control" name="pianist.id">
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
              <AvGroup>
                <Label for="entry-course">Course</Label>
                <AvInput id="entry-course" type="select" className="form-control" name="course.id">
                  <option value="" key="0" />
                  {courses
                    ? courses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/entry" replace color="info">
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
  courses: storeState.course.entities,
  entryEntity: storeState.entry.entity,
  loading: storeState.entry.loading,
  updating: storeState.entry.updating,
  updateSuccess: storeState.entry.updateSuccess
});

const mapDispatchToProps = {
  getPianists,
  getCourses,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryUpdate);
