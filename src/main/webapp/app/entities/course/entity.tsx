import React from 'react';
import { Table } from 'reactstrap';


export default ({ entries }) => (
	<Table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Pianist No</th>
				<th />
			</tr>
		</thead>
		<tbody>
		{entries.map((entry) => (
			<tr key={entry.id}>
				<td>{entry.name}</td>
				<td>{entry.pianist.number}</td>
			</tr>
		))}
		</tbody>
	</Table>
);