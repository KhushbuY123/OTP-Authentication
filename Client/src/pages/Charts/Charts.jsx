import * as React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { UserDataWithValues, valueFormatter } from "./chart";

export default function PieArcLabel() {
  const navigate = useNavigate();
  const [itemData, setItemData] = React.useState(null);

  const handleClick = (event, item) => {
    setItemData(item);
    console.log(item)
    const profile=UserDataWithValues[item.dataIndex].label
    console.log(profile)
    navigate(`/charts/${profile}`);
  };

  return (
    <div>
      <PieChart
        onItemClick={handleClick}
        series={[
          {
            arcLabel: (item) => `${item.value}`, 
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            data: UserDataWithValues,
            valueFormatter,
          },
        ]}
        {...size}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fontSize: 12,
            fill: "white",

          },
        }}
      />

      {/* {itemData && (
        <div>
          <h4>Clicked Data:</h4>
          <pre>{JSON.stringify(itemData.dataIndex, null, 2)}</pre>
          <p>{UserDataWithValues[itemData.dataIndex].label}</p>
        </div>
      )} */}

       
    </div>
  );
}

const size = {
  width: 400,
  height: 200,
};

