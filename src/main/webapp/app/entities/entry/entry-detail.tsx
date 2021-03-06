import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './entry.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntryDetail = (props: IEntryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { entryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Entry [<b>{entryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{entryEntity.name}</dd>
          <dt>Pianist</dt>
          <dd>{entryEntity.pianist ? entryEntity.pianist.id : ''}</dd>
          <dt>Course</dt>
          <dd>{entryEntity.course ? entryEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/entry" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/entry/${entryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ entry }: IRootState) => ({
  entryEntity: entry.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
