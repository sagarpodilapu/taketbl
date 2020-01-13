import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Color from "./Color";
import TakeTableDate from "./ComponentDate";
import RestaurantInfo from "./RestaurantInfo";
import FloorPlanInfo from "./FloorPlanInfo";
import FloorPlan from "./FloorPlan";
import TableMenu from "./TableMenu";
import MergeMenu from "./MergeMenu";
import ToolBox from "./ToolBox";
import Content from "./Content";
import SectionMenu from "./SectionMenu";
import Preview from "./Preview";

import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <RestaurantInfo getRestaurants={window.getRestaurants} language={"en"} />,
  document.getElementById("RestaurantBlock")
);
ReactDOM.render(
  <FloorPlanInfo language={"en"} />,
  document.getElementById("FloorPlanInfoBlock")
);
ReactDOM.render(
  <FloorPlan
    language={"en"}
    saveFloorPlan={window.savefloorplan}
    setWeekday={window.setweekday}
    setDefault={window.setdefault}
  />,
  document.getElementById("FloorPlanBlock")
);
ReactDOM.render(
  <TakeTableDate headerText={"StartDate"} />,
  document.getElementById("startdate")
);
ReactDOM.render(
  <TakeTableDate headerText={"EndDate"} />,
  document.getElementById("enddate")
);
ReactDOM.render(
  <TableMenu savetable={window.savetable} />,
  document.getElementById("tablemenu")
);
ReactDOM.render(
  <MergeMenu savetable={window.savetable} />,
  document.getElementById("mergemenu")
);
ReactDOM.render(
  <SectionMenu savesection={window.savesection} />,
  document.getElementById("sectionmenu")
);
ReactDOM.render(
  <ToolBox drag={window.drag} />,
  document.getElementById("toolbox")
);
ReactDOM.render(
  <Content
    selecteditem={window.getSelectedItem}
    select={window.select}
    drop={window.drop}
    dragenter={window.dragenter}
    allowDrop={window.allowDrop}
  />,
  document.getElementById("tablettop")
);
ReactDOM.render(<Color />, document.getElementById("color"));
ReactDOM.render(
  <Preview
    floorplan={window.getcontent}
    tables={window.gettables}
    sections={window.getsections}
  />,
  document.getElementById("preview")
);
//tablemenu
//ReactDOM.render(<ContextMenu/>,document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
