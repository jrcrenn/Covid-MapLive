import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Box } from "@material-ui/core"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SimpleList from './SimpleList';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
		justifyContent: "flex-start",
    flexGrow: 1,
  },
  tabs: {
    background: 'darkgrey',
  },
  slideContainer: {
    flexGrow: 1,
  },
  slide: {
    color: 'darkred',
    backgroundColor: '#737373',
  },
};

class FullWidthTabs extends React.Component {

  state = {
    index: 0,
    geoUrl: "./worldGeography-110m.json",
  };

/* <Geographies geography={geoUrl}>
  {({ geographies }) =>
      geographies.map(geo => {})}
</Geographies> */

  rowInfo = {
    name: "",
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  getNumbers = () => {

    if (this.props.tile !== undefined)
      return [
        { name: "Population", value: "N/A"},
        { name: "Active Cases", value: "N/A"},
        { name: "Serious Cases", value: "N/A"},
        { name: "Total Cases", value: "N/A"},
        { name: "Total Recovered", value: "N/A"},
        { name: "Total Deaths", value: "N/A"},
      ];

    var countries = require("./country-by-population.json");
    var country = countries.find(obj => obj.country === this.props.tile.data.Country);

    if (country !== undefined) {

      var popest = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return [
        { name: "Population", value: popest},
        { name: "Active Cases", value: this.props.tile.data.ActiveCases},
        { name: "Serious Cases", value: this.props.tile.data.Serious_Critical},
        { name: "Total Cases", value: this.props.tile.data.TotalCases},
        { name: "Total Recovered", value: this.props.tile.data.TotalRecovered},
        { name: "Total Deaths", value: this.props.tile.data.TotalDeaths},
      ];
    }
  };

  getRatios = () => {

    var countries = require("./country-by-population.json");
    var x = "N/A";
    var y = "N/A";
    var z = "N/A";

    if (this.props.tile !== undefined && this.props.tile.data.TotalCases !== "N/A") {

      var country = countries.find(obj => obj.country === this.props.tile.data.Country);

      const b = parseInt(this.props.tile.data.ActiveCases.replace(/,/g, ''));
      const c = parseInt(this.props.tile.data.Serious_Critical.replace(/,/g, ''));
      const e = parseInt(this.props.tile.data.TotalRecovered.replace(/,/g, ''));
      const f = parseInt(this.props.tile.data.TotalDeaths.replace(/,/g, ''));

      if (!isNaN(b)) {
        x = b / country.population;
        if (!isNaN(c))
          y = c / b;
      }

      if (!isNaN(e) && !isNaN(f))
          z = e / (e + f);
    }

    return [
      { name: "Active Cases / Population", value: x === "N/A" ? x : `${x.toFixed(5)}%`},
      { name: "Serious Cases / Active Cases", value: y === "N/A" ? y : `${y.toFixed(5)}%`},
      { name: "Total Deaths / Cases with outcome", value: z === "N/A" ? z : `${z.toFixed(5)}%`},
    ];
  };

  render() {
    const { index } = this.state;

    const numberContent = this.getNumbers();
    const ratiosContent = this.getRatios();

    return (
      <Box style={styles.container}>
        <Tabs value={index} variant={"fullWidth"} onChange={this.handleChange} style={styles.tabs}>
          <Tab label="Values" />
          <Tab label="Ratios" />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} style={styles.slideContainer}>
          <Box style={styles.slide}>
            <SimpleList body={numberContent} />
          </Box>
          <Box style={styles.slide}>
            <SimpleList body={ratiosContent} />
          </Box>
        </SwipeableViews>
      </Box>
    );
  }
}

export default FullWidthTabs;