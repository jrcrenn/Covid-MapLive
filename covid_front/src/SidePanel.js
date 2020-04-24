import React, { useState } from "react";
import SlidingPanel from 'react-sliding-side-panel';
import StackGrid from "react-stack-grid";

import { Button, Box } from "@material-ui/core"
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from '@material-ui/core/styles';

import TileCountryInfo from "./TileCountryInfo"

const SidePanel = ({panelIsOpen, setPanelIsOpen, panelData, removeFromPanel}) => {

	const useStyles = makeStyles({
		tile: {
			border: 0,
			borderRadius: 5,
			boxShadow: "1px 3px 5px 0",
			background: "grey",
			height: 350,
			padding: 5,

			display: "flex",
		},
		resizer: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
	});

	function changePanelWidth(makeLarger) {
		if (makeLarger && panelWidth < 75)
			setPanelWidth(panelWidth + 25);
		else if (!makeLarger) {
		  if (panelWidth > 25)
			  setPanelWidth(panelWidth - 25);
		  else
			  setPanelIsOpen(false);
		}
	}

	const [panelWidth, setPanelWidth] = useState(25);
	const classes = useStyles();

	return (
		<SlidingPanel type={"right"} isOpen={panelIsOpen} size={panelWidth} noBackdrop={true} panelClassName={"panel"}>
			<Box>
				<Box m={"15px"} className={classes.resizer}>
					<Button onClick={() => {changePanelWidth(true);}}>
						<ArrowBack />
					</Button>
					<Box style={{fontSize: 25, flexGrow: 100}}>Dashboard</Box>
					<Button onClick={() => {changePanelWidth(false);}}>
						<ArrowForward />
					</Button>
					<Button onClick={() => {setPanelIsOpen(false)}}>
						<CloseIcon />
					</Button>
				</Box>

				<StackGrid columnWidth={window.innerWidth / 4.5}>
					{panelData.map((tile) => (
						<Box m={"5px"} className={classes.tile} key={tile.id}>
							{tile.type === "countryInfo" ?
								<TileCountryInfo removeFromPanel={removeFromPanel} tile={tile} />
							:
								<Button onClick={() => {removeFromPanel(tile.id)}}>
									<DeleteIcon />
								</Button>
							}
						</Box>
					))}
      			</StackGrid>
			</Box>
      	</SlidingPanel>
	)
};

export default SidePanel;