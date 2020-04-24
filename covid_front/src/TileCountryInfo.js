import React from "react";

import { Box, Button } from "@material-ui/core"
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

import FullWidthTabs from "./FullWidthTabs";

const TileCountryInfo = ({ removeFromPanel, tile }) => {

	const useStyles = makeStyles({
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			flexGrow: 1,
		},
		head:  {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		title: {
			textAlign: "left",
		},
		body: {
			display: "flex",
			flexGrow: 1,
		},
	});

	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Box className={classes.head}>
				<Box ml="2%" className={classes.title}>{tile.option}</Box>
				<Button onClick={() => {removeFromPanel(tile.id)}}>
					<RemoveIcon />
				</Button>
			</Box>
			<Box className={classes.body}>
				<FullWidthTabs tile={tile} />
			</Box>
		</Box>
	)
}

export default TileCountryInfo;