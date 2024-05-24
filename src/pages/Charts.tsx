import LineGraph from "../components/LineGraph";
import Map from "../components/Map";

const Charts = () => {
  return (
    <div>
      <div className="flex justify-center text-5xl font-bold mb-10">
        Covid Cases Dashboard
      </div>
      <LineGraph />
      <Map />
    </div>
  );
};

export default Charts;
