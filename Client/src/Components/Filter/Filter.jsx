import React from "react";
import { FilterItem } from "./ FilterItem";

const style = {
  "background-color": "#131c1e",
  color: "white"
};

const table = {
  width: "80%",
  padding: 20
};

const th = {
  color: "rgba(25,157,116,1)",
  "text-align": "left"
};

export class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.searchAction = props.searchAction.bind(this);
    //TODO integration get all Sections
    let json = require("/src/data.json");
    this.t = json.Filter;

    this.datum = ["Letzte Stunde", "Heute", "Diese Woche", "Dieses Jahr"];

    this.max = Math.max(
      this.datum.length,
      this.t.Fachbereich.length,
      this.t.Fach.length,
      this.t.Kurs.length
    );

    this.fachbereich = this.fill(this.t.Fachbereich);
    this.fach = this.fill(this.t.Fach);
    this.kurs = this.fill(this.t.Kurs);

    this.state = {
      checked: true,
      datum: this.datum,
      fach: this.fach,
      kurs: this.kurs,
      fachbereich: this.fachbereich
    };

    this.menue = [];
    for (var i = 0; i < this.max; i++) {
      this.menue.push(
        <tr>
          <FilterItem name={this.datum[i]} searchAction={this.searchAction} />
          <FilterItem
            name={this.fachbereich[i].name}
            searchAction={this.searchAction}
          />
          <FilterItem
            name={this.fach[i].name}
            searchAction={this.searchAction}
          />
          <FilterItem
            name={this.kurs[i].name}
            searchAction={this.searchAction}
          />
        </tr>
      );
    }
  }

  fill(a) {
    return a.concat(
      new Array(this.max - a.length).fill({ name: "", id: null })
    );
  }

  render() {
    return (
      <div align="center" style={style}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>
                <u>Datum</u>
              </th>
              <th style={th}>
                <u>Fachbereich</u>
              </th>
              <th style={th}>
                <u>Fach</u>
              </th>
              <th style={th}>
                <u>Kurs</u>
              </th>
            </tr>
          </thead>
          <tbody>{this.menue}</tbody>
        </table>
      </div>
    );
  }
}
