import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactToolTip from "react-tooltip";

import { Button, Box } from "@material-ui/core"

import { OffCanvas, OffCanvasBody, OffCanvasMenu } from "react-offcanvas"

import MapChart from "./MapChart";
import SidePanel from "./SidePanel";
import MenuList from "./MenuList";

import "./index.css";

const App = () => {

  async function addToPanel(tileType, tileOption) {
    if (tileType === "countryInfo") {
      console.log(`Add ${tileOption}'s data to side panel`);
      /* use countryData as data source */
    } else {

      // tileType == getDeathsByAge || getDeathsByGender || ...
      // await fetch(`http://localhost:8080/covid/${tileType.toLowerCase()}`).then(res => res.json()).then(res => {
        //   add res to panelData
        // });
      }
  }

  async function removeFromPanel() {
  
  }
    
  function loadPanelData() {
    // if (userConnected) {
    //   await fetch(`http://localhost:8080/covid/getUserPanel`).then(res => res.json()).then(res => {
    //     setPanelData(res);
    //   });
    // } else {
    //   set default panel data (countryInfo | USA, Italy, China);
    // }
  }
  
  async function loadCountryData() {
      await fetch(`http://localhost:8080/covid/getdataforallcountry`).then(res => res.json()).then(res => {
        setCountryData(res);
      });
  }
    
  function changeMapData(parameter) {
    console.log(`Update map colorimetry to ${parameter} cases percentage`);
    setActMapStat(`${parameter} Cases`);

    if (parameter === "default") {
      // setMapData to default parameter
      setMapData([
        { ISO3: "FRA",  name: "France",  percentage: 0.513 },
        { ISO3: "ESP",  name: "Spain",   percentage: 0.113 },
        { ISO3: "DEU",  name: "Germany", percentage: 0.813 }
      ]);
    }
    // else
    //   setMapData(parameter);
  }

  const [tooltip, setTooltip] = useState("");
  const [externHover, setExternHover] = useState("");
  
  const [countryData, setCountryData] = useState([]);
  
  const [actMapStat, setActMapStat] = useState("Default Parameter");
  const [mapData, setMapData] = useState([]);

  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [panelData, setPanelData] = useState([]);
  // panelData = [tile1, tile2, tile3, ...];

// const tile = {
//     type: "countryInfo",
//     option: "France",
//     data: {
//         name: "France",
//         active: 1233451,
//         deaths: 7546
//     }
// };

  useEffect(() => {
    // Pull API data
    loadCountryData();

    // set default colorimetry
    changeMapData("default");
    
    // set Users Panel Data
    loadPanelData();
  }, []);


  return (
    <div>
      <OffCanvas width={300} transitionDuration={300} effect={"overlay"} isMenuOpened={true} position={"left"}>

        <OffCanvasBody>
          <Box my={"25px"}>{`COVID-19  REALTIME INFORMATION CENTER | Active Map Statistic : ${actMapStat}`}</Box>
          <MapChart setTooltipContent={setTooltip} selectCountry={(Name) => { addToPanel("countryInfo", Name); }} mapData={mapData} extHover={externHover} />
          <ReactToolTip>{tooltip}</ReactToolTip>
        </OffCanvasBody>


        <OffCanvasMenu>
          <Box mt={"15px"}>
            <Button variant="contained" onClick={() => { setPanelIsOpen(!panelIsOpen); }}>
              {panelIsOpen ? "Close Panel" : "Open Panel"}
            </Button>
          </Box>

          <MenuList
            changeMapData={(parameter) => {changeMapData(parameter);}}
            addToPanel={(type, option) => {addToPanel(type, option);}}
            setExternHover={setExternHover}
          />
        </OffCanvasMenu>

      </OffCanvas>


      <SidePanel panelIsOpen={panelIsOpen} setPanelIsOpen={setPanelIsOpen} panelData={panelData}/>

    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);