import { FC, PropsWithChildren, ReactElement, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SegmentDisplay } from "./components/segment-display";
import { SmileButton } from "./components/smile-button";
import { generateCells } from "./utils/gameUtils";
import { Cell } from "./components/cell";

function App(): ReactElement {
  const [cells, setCells] = useState(generateCells());

  const board = cells.map((row) =>
    row.map(({ value, state }) => <Cell cell={value} />)
  );

  return (
    <div className="App">
      <div className="header">
        <SegmentDisplay value={40} />
        <SmileButton smile={0} />
        <SegmentDisplay value={0} />
      </div>
      <div className="board">{board}</div>
    </div>
  );
}

export default App;
