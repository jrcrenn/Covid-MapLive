import React, { useState } from "react";
import SlidingPanel from 'react-sliding-side-panel';

import { Button, Box } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const SidePanel = ({panelIsOpen, setPanelIsOpen, panelData}) => {

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

	return (
		<div>
			<SlidingPanel type={"right"} isOpen={panelIsOpen} size={panelWidth} noBackdrop={true} panelClassName={"panel"}>
				<Box my={"15px"} className={"panelResizer"}>
					<Button aria-label="Extend" onClick={() => {changePanelWidth(true);}}>
						<AddIcon />
					</Button>
					<Button aria-label="Reduce" onClick={() => {changePanelWidth(false);}}>
						<RemoveIcon />
					</Button>
				</Box>

        		<Box m={"15px"} className={"gridRoot"}>
					<GridList cellHeight={160} className={"gridList"} cols={panelWidth / 25}>
						{panelData.map((tile) => (
						<GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
							<img src={tile.img} alt={tile.title} />
						</GridListTile>
						))}
					</GridList>
        		</Box>
      		</SlidingPanel>
		</div>
	)
};

export default SidePanel;