import React from "react";
import { StartButton } from "./StyledButton";
import { render } from "react-dom";

export class Filter extends React.Component {
  constructor(props) {
    super(props);
    let json = require("/src/Section.json");
    this.root = this.getRootSections(json);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Fachbereich</th>
              <th>Fach</th>
              <th>Kurs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <StartButton text="Letzte Stunde" />
              </td>
              <td>
                <StartButton text="Heute" />
              </td>
              <td>
                <StartButton text="Diese Woche" />
              </td>
              <td>
                <StartButton text="Dieses Jahr" />
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
