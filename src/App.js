import React, {useEffect, useState} from "react"
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {sortData, prettyPrintStat} from "./util";
import './App.css';
import "leaflet/dist/leaflet.css"; 

function App() {
  
  const[countries, setCountries] = useState([]);
  const[country, setCountry] = useState("worldwide");
  const[countryInfo, setCountryInfo] = useState([]);
  const[tableData, setTableData] = useState([]);
  const[mapCenter, setMapCenter] = useState({lat: 0, lng: -0});
  const[mapZoom, setMapZoom] = useState(3);
  const[mapCountries, setMapCountries] = useState([]);
  const[casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
        setCountryInfo(data);
      });
  },[]);

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        let sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data); // every data not just name and value of al countries
        setCountries(countries);

      });
    };
    getCountriesData();
  },[]);

  const onCountryChange = async(event) => {
    
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide'
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      try {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
      catch(err) {
        setMapCenter({lat: 34.80746, lng: -40.4796});
        setMapZoom(3); 
      };
     
    });
  };

  return (
    <div className="app"> 
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" 
            onChange={onCountryChange} value={country}> 
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries
                  and show a drop down list of the options */}
              {
                countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
      
        <div className="app_stats">
          
          <InfoBox 
            isRed
            active={casesType === "cases"}
            title="Coronavirus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            onClick={(e)=>setCasesType('cases')}  
          />

          <InfoBox 
            active={casesType === "recovered"}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}
            onClick={(e)=>setCasesType('recovered')}
          />

          <InfoBox 
            isPurple
            active={casesType === "deaths"}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}
            onClick={(e)=>setCasesType('deaths')}
          />
              
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom} 
        />
      </div>
      <div className="app_right">
        <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}>
            </Table>
            <h3 className="app_graph_title">Worldwide new {casesType}</h3>
            <LineGraph className="app_graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
