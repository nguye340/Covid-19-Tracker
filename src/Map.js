import React from 'react';
import {Map as LeafletMap, TileLayer} from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from './util';

function Map({countries, casesType, center, zoom}) {
    return (
        <div className="map">
            {console.log(center)}
        <LeafletMap zoom={zoom} center={center}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries, casesType)}
        </LeafletMap>
        </div>
    )
}

export default Map
