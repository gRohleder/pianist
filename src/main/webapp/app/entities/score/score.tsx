import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './score.reducer';
import { IScore } from 'app/shared/model/score.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScoreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Score = (props: IScoreProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { scoreList, match, loading } = props;
  return (
    <div>
      <h2 id="score-heading">
        Scores
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Score
        </Link>
      </h2>
      <div className="table-responsive">
        {scoreList && scoreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Creator</th>
                <th>How To Play</th>
                <th>Level</th>
                <th>Pianist</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scoreList.map((score, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${score.id}`} color="link" size="sm">
                      {score.id}
                    </Button>
                  </td>
                  <td>{score.name}</td>
                  <td>{score.creator}</td>
                  <td>{score.howToPlay ? 'true' : 'false'}</td>
                  <td>{score.level}</td>
                  <td>{score.pianist ? <Link to={`pianist/${score.pianist.id}`}>{score.pianist.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${score.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${score.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${score.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Scores found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ score }: IRootState) => ({
  scoreList: score.entities,
  loading: score.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Score);
