import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title } from "chart.js";

// Register the Chart.js components
Chart.register(ArcElement, Tooltip, Title);

const Dial = ({ value, label }) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#1cb683", "#e0e0e0"], // Color for the gauge
        borderWidth: 0,
        cutout: "75%", // Hollow middle
        rotation: -90, // Start at the bottom
        circumference: 180, // Semi-circle
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false }, // Disable tooltips
      title: {
        display: true,
        text: label,
        font: {
          size: "18em",
          weight: "bold",
        },
      },
      legend: { display: false }, // No legend
    },
    circumference: 180, // Semi-circle
    rotation: -90, // Rotate to start from bottom
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default Dial;
