import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { coloring } from "../../GlobalTheme";
import { mockLine as data } from"../../components/placeHolderData/PlaceHolderData";
// import { mockLine as data } from "../../components/placeHolderData/TrueData";

let dataTemp = [{
  id: "Hold 1",
  color: coloring("dark").lime[500],
  data: [],
}];

console.log(data.length);

for (let index = data.length - 1; index >= 0; index--) {
// for (let index = 0; index < data.length; index++) {
  console.log(data[index]);

  let thisData = {
      x: data[index]['periodStartTime'].substring(0,10), // periodStartTime for X 
      y: data[index]['periodTotalReward'] / data[index]['periodTotalStake'] * 365 // Yield cal as periodTotalReward / periodTotalStake
    };
  dataTemp[0].data.push(thisData);
  
}
console.log(dataTemp);

// data = dataTemp;


const Line = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = coloring(theme.palette.mode);

  return (
    <ResponsiveLine
      data={dataTemp}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} 
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Yield", 
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Line;