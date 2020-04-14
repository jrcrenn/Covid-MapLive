import React, { useState, useEffect } from "react"
import { Button, Box } from "@material-ui/core"

const MenuList = ({changeMapData, addToPanel, setExternHover}) => {

	function incrementMenuIndex() {
		var newIndex = menuIndex + 1;
		if (newIndex >= listTitle.length)
			newIndex = 0;
		  
		setMenuIndex(newIndex);
	
		return newIndex;
	}
	
	function changeMenuList() {
		const newIndex = incrementMenuIndex();
	
		listTitle.forEach(function(element, index) {
			if (index === newIndex)
				document.getElementById(element).style.display = "block";
			else
				document.getElementById(element).style.display = "none";
		});
	}

	const listTitle = ["Statistics", "Countries"];
	const [menuIndex, setMenuIndex] = useState(listTitle.length);

	useEffect(() => {
		// load menu
		changeMenuList();
	}, []);

	return (
		<div>
			<Box mt={"50px"}>
            <Button variant="contained" onClick={() => { changeMenuList(); }} mt={"50%"}>
            	{`Show ${listTitle[menuIndex + 1 === listTitle.length ? 0 : menuIndex + 1]}`}
            </Button>
        	</Box>

			<p className="menuTitle">{`${listTitle[menuIndex]}`}</p>

			<ul>
			<li id={`${listTitle[0]}`}>
				<ul className="menuList">
				<li><Button onClick={() => { changeMapData("Total"); }}>Total Cases</Button></li>
				<li><Button onClick={() => { changeMapData("Active"); }}>Active Cases</Button></li>
				<li><Button onClick={() => { changeMapData("Recovered"); }}>Recovered Cases</Button></li>
				<li><Button onClick={() => { changeMapData("Critical"); }}>Critical Cases</Button></li>
				<li><Button onClick={() => { changeMapData("Unrecovered"); }}>Deaths</Button></li>
				</ul>
			</li>

			<li id={`${listTitle[1]}`}>
				<ul className="menuList">
				<li><Button onClick={() => {addToPanel("countryInfo", "France");}}  onMouseEnter={() => {setExternHover("France");}}          onMouseLeave={() => {setExternHover("")}}   >France</Button></li>
				<li><Button onClick={() => {addToPanel("countryInfo", "UK");}}      onMouseEnter={() => {setExternHover("United Kingdom");}}  onMouseLeave={() => {setExternHover("")}}   >United Kingdom</Button></li>
				<li><Button onClick={() => {addToPanel("countryInfo", "Germany");}} onMouseEnter={() => {setExternHover("Germany");}}         onMouseLeave={() => {setExternHover("")}}   >Germany</Button></li>
				<li><Button onClick={() => {addToPanel("countryInfo", "Spain");}}   onMouseEnter={() => {setExternHover("Spain");}}           onMouseLeave={() => {setExternHover("")}}   >Spain</Button></li>
				<li><Button onClick={() => {addToPanel("countryInfo", "Italy");}}   onMouseEnter={() => {setExternHover("Italy");}}           onMouseLeave={() => {setExternHover("")}}   >Italy</Button></li>
				</ul>
			</li>
			</ul>
		</div>
	);
}

export default MenuList;