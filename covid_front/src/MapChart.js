import React, { memo } from "react";
import { scaleThreshold, scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule } from "react-simple-maps";


const thresholdScale = scaleThreshold()
    .domain([0, 100, 1000, 10000, 50000, 100000, 500000, 1000000, 5000000, 1000000000])
    .range(["#B9ED00", "#E0ED00", "#EDD300", "#EDAB00", "#ED8400", "#ED5C00", "#BE3112", "#931F22", "#6E2637", "#4E2939"])

const percentScale = scaleLinear()
    .domain([0.0, 1.0])
    .range("#FFF0DC", "#D33819")

const MapChart = ({ setTooltipContent, selectCountry, mapData, extHover }) => {
    
    const geoUrl = `./worldGeography-110m.json`;
    
    function colorScale(country) {
        if (extHover === country.name)
            return "#5A5A5A";
        else if (country.percentage === "NaN")
            return "#D5D5D5";
        else if (country.percentage % 1 === 0)
            return thresholdScale(country.percentage);
        else
            return percentScale(country.percentage);
    }

    return (
        <div className="MapChart">
            <ComposableMap data-tip="" projectionConfig={{ rotate: [-10, 0, 0], scale: 150 }} height={355}>
                <ZoomableGroup zoom={0.8} minZoom={0.5}>

                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />

                    {mapData.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo => {

                                    var country = mapData.find(country => country.ISO3 === geo.properties.ISO_A3);

                                    if (!country)
                                        country = { ISO3: geo.properties.ISO_A3, name: geo.properties.NAME_LONG, percentage: "NaN" };

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(`${country.ISO3}: ${country.percentage}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            onClick={() => {
                                                selectCountry(country.name);
                                            }}
                                            style={{
                                                default: {
                                                    fill: colorScale(country),
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "#5A5A5A",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "#5A5A5A",
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}

                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
};

export default memo(MapChart);