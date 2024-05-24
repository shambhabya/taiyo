import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchCasesData = async () => {
  try {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const LineGraph: React.FC = () => {
  const {
    isLoading,
    error,
    data: casesData,
  } = useQuery({
    queryKey: ["casesData"],
    queryFn: fetchCasesData,
  });

  if (isLoading) {
    return <div className="flex justify-center ">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const entries = Object.entries(casesData.cases);

  // Sort the entries by date
  const sortedEntries = entries.sort((a, b) => {
    const dateA = new Date(a[0]).getTime();
    const dateB = new Date(b[0]).getTime();
    return dateA - dateB;
  });

  // Extract dates and cases
  const dates = sortedEntries.map((entry) => entry[0]);
  const cases = sortedEntries.map((entry) => entry[1]);

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Total Cases",
        data: cases,
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.1,
        pointRadius: 0, // Hide points for better performance with large datasets
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      decimation: {
        enabled: true,
        algorithm: "min-max",
      } as any, // This casts the decimation object to any to avoid type errors
    },
  };

  return (
    <div
      className="line-graph mb-10"
      style={{ height: "600px", width: "100%" }}
    >
      <h2>Cases Fluctuations with Time</h2>
      <Line data={lineData} options={options} />
    </div>
  );
};

export default LineGraph;
