import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import Entry from './entity';

export interface ICourseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const CourseDetail = (props: ICourseDetailProps) => {
	useEffect(() => {
		props.getEntity(props.match.params.id);
	}, []);

	const { courseEntity } = props;


	return (
		<Row>
			<Col md="8">
				<h2>
					Course [<b>{courseEntity.id}</b>]
        		</h2>
				<dl className="jh-entity-details">
					<dt>
						<span id="name">Name</span>
					</dt>
					<dd>{courseEntity.name}</dd>
					<dt>
						<span id="teacher">Teacher</span>
					</dt>
					<dd>{courseEntity.teacher}</dd>
					<dt>
						<span id="entries">Entries</span>
					</dt>
					<dd>
						{courseEntity.entries ? <Entry entries={courseEntity.entries} /> : "not yet loaded"}
					</dd>
				</dl>
				<Button tag={Link} to="/course" replace color="info">
					<FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
				</Button>
        &nbsp;
        <Button tag={Link} to={`/course/${courseEntity.id}/edit`} replace color="primary">
					<FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
				</Button>
			</Col>
		</Row>
	);
};

const mapStateToProps = ({ course }: IRootState) => ({
	courseEntity: course.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
