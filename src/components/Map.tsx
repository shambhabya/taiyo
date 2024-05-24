import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: require("../icons/placeholder.png"),
  iconSize: [38, 38], // size of the icon
});

interface CountryData {
  country: string;
  countryInfo: {
    iso3: string;
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const fetchCountriesData = async () => {
  try {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data: any[] = await response.json();
    // Filter and map the data to fit the CountryData interface
    const filteredData: CountryData[] = data.map((country: any) => ({
      country: country.country,
      countryInfo: {
        iso3: country.countryInfo.iso3,
        lat: country.countryInfo.lat,
        long: country.countryInfo.long,
      },
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));
    return filteredData;
  } catch (error) {
    console.log(error);
  }
};

const Map = () => {
  const {
    data: countriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [],
    queryFn: fetchCountriesData,
  });

  if (isLoading) return <p className="flex justify-center">Loading...</p>;

  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="mt-16">
      <div className="text-xl">
        Map showing Covid information of each country
      </div>
      <MapContainer center={[48.8566, 2.3522]} zoom={2}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countriesData?.map((country, index) => (
          <Marker
            key={index}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Total Active Cases: {country.active}</p>
                <p>Total Recovered: {country.recovered}</p>
                <p>Total Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
