import React, { memo } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule } from "react-simple-maps";


const geoUrl = `./worldGeography-110m.json`;

const colorScale = scaleLinear()
    .domain([0.0, 1.0])
    .range(["#FFE4DF", "#FF4D2D"]);
    
const MapChart = ({ setTooltipContent, selectCountry, mapData, extHover }) => {
    return (
        <div className="MapChart">
            <ComposableMap data-tip="" projectionConfig={{ rotate: [-10, 0, 0], scale: 150 }} height={365}>
                <ZoomableGroup zoom={0.8} minZoom={0.5}>

                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />

                    {mapData.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo => {
                                    var country = mapData.find(country => country.ISO3 === geo.properties.ISO_A3);

                                    if (!country)
                                        country = { ISO3: geo.properties.ISO_A3, name: geo.properties.NAME, percentage: 0 };

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(`${country.name}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            onClick={() => {
                                                selectCountry(country.name);
                                            }}
                                            style={{
                                                default: {
                                                    fill: extHover === country.name ? "#5A5A5A" : country.percentage ? colorScale(country.percentage) : "#F5F4F6",
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