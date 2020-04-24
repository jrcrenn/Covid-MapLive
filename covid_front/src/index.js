import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactToolTip from "react-tooltip";
import { OffCanvas, OffCanvasBody, OffCanvasMenu } from "react-offcanvas"

import { Button, Box } from "@material-ui/core"

import MapChart from "./MapChart";
import SidePanel from "./SidePanel";
import MenuList from "./MenuList";

import { csv } from "d3-fetch";

import "./index.css";

const App = () => {

// const tile = {
//     type: "countryInfo",
//     option: "France",
//     data: countryData["${option}"]
// };

  async function addToPanel(tileType, tileOption) {
    var nameObject = nameSwitch.find(object => object.name === tileOption);
    var data = countryData.find(object => object.Country === nameObject.name);
    if (tileType === "countryInfo") {
      setPanelData(panelData => [...panelData,
        {
          id: Math.random(),
          type: tileType,
          option: nameObject ? nameObject.fullname : tileOption,
          data: data ? data : {
            "TotalCases": "N/A",
            "NewCases": "N/A",
            "TotalDeaths": "N/A",
            "NewDeaths": "N/A",
            "TotalRecovered": "N/A",
            "ActiveCases": "N/A",
            "TotalTests": "N/A",
            "Continent": "N/A",
            "Deaths_1M_pop": "N/A",
            "Country": "N/A",
            "Serious_Critical": "N/A",
            "Tests_1M_Pop": "N/A",
            "TotCases_1M_Pop": "N/A"
          },
        }
      ]);

    } else {

      // tileType == getDeathsByAge || getDeathsByGender || ...
      // await fetch(`http://localhost:8080/covid/${tileType.toLowerCase()}`).then(res => res.json()).then(res => {
        //   add res to panelData
        // });
      }
      console.log(panelData);
  }

  async function removeFromPanel(id) {
    setPanelData(panelData.filter(obj => obj.id !== id));
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
  
  function loadCountryData() {
    fetch(`http://localhost:8080/covid/getdataforallcountry`).then(res => res.json()).then(res => {
      setCountryData(res);
      changeMapData(actMapStat, res);
    });
  }

  function getValue(parameter, object) {
    if (parameter === "Total")
      return parseInt(object.TotalCases.replace(/,/g, ''));
    else if (parameter === "Active")
      return parseInt(object.ActiveCases.replace(/,/g, ''));
    else if (parameter === "Recovered")
      return parseInt(object.TotalRecovered.replace(/,/g, ''));
    else if (parameter === "Critical")
      return parseInt(object.Serious_Critical.replace(/,/g, ''));
    else if (parameter === "Unrecovered")
      return parseInt(object.TotalDeaths.replace(/,/g, ''));
  }

  function changeMapData(parameter, apiData) {
    if (parameter === "None" || !apiData)
      return;

    console.log(`Update map colorimetry to ${parameter} cases percentage`);
    setActMapStat(parameter);

    var tmpObj;
    var tmpVal;

    setMapData(mapData.map(element => {
      tmpObj = apiData.find(object => object.Country === element.name);
      if (tmpObj !== undefined) {
        tmpVal = getValue(parameter, tmpObj);
        if (!isNaN(tmpVal))
          element.percentage = tmpVal;
      }
      return element
    }));

    console.log(mapData);
  }

  const [tooltip, setTooltip] = useState("");
  const [externHover, setExternHover] = useState("");
  
  const [countryData, setCountryData] = useState([]);
  const [nameSwitch, setNameSwitch] = useState([]);
  
  const [actMapStat, setActMapStat] = useState("None");
  const [mapData, setMapData] = useState([]);

  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [panelData, setPanelData] = useState([]);

  useEffect(() => {

    // load names file
    csv("./vulnerability.csv").then(data => {
      setNameSwitch(data);

      // initialize mapData
      data.forEach(element => {
        setMapData(mapData => [...mapData,
          {
            ISO3: element.ISO3,
            name: element.name,
            percentage: "NaN"
          }
        ]);
      });
    });

    // Pull API data
    loadCountryData();

    // set Users Panel Data
    loadPanelData();
  }, []);


  return (
    <div>
      <OffCanvas width={300} transitionDuration={300} effect={"overlay"} isMenuOpened={true} position={"left"}>

        <OffCanvasBody>
          <Box my={"25px"}>{`COVID-19  REALTIME INFORMATION CENTER | Active Map Statistic : ${actMapStat} Cases`}</Box>
          <MapChart setTooltipContent={setTooltip} selectCountry={(Name) => { addToPanel("countryInfo", Name); }} mapData={mapData} extHover={externHover} />
          <ReactToolTip>{tooltip}</ReactToolTip>
        </OffCanvasBody>


        <OffCanvasMenu>
          <Box my={"15px"}>
            <Button variant="contained" onClick={() => { setPanelIsOpen(!panelIsOpen); }}>
              {panelIsOpen ? "Close Panel" : "Open Panel"}
            </Button>
          </Box>

          <MenuList
            changeMapData={(parameter) => {changeMapData(parameter, countryData);}}
            addToPanel={(type, option) => {addToPanel(type, option);}}
            setExternHover={setExternHover}
          />

          <Box my={"15px"}>
            <Button variant="contained" onClick={() => { loadCountryData(); }}>
              Update Country Data
            </Button>
          </Box>
        </OffCanvasMenu>

      </OffCanvas>


      <SidePanel panelIsOpen={panelIsOpen} setPanelIsOpen={setPanelIsOpen} panelData={panelData} removeFromPanel={removeFromPanel}/>

    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);