import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const SimpleList = ({ head, body }) => {

	const useStyles = makeStyles({
		table: {
			listStyle: "none",
		},
		row: {
			display: "flex",
			justifyContent: "space-between",
			padding: "5px 15px",
		},
		name: {
			textAlign: "left",
		}
	})

	const classes = useStyles();

	return (
		<Box className={classes.table}>
			{body !== undefined && body.map((element) => (
				<li key={Math.random} className={classes.row}>
					<Box className={classes.name}>{element.name}</Box>
					<Box>{element.value}</Box>
				</li>
			))}
		</Box>
	)
}

export default SimpleList;