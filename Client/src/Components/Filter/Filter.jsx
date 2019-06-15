import React from "react";
import { FilterItem } from "./ FilterItem";
import "./Filter.css";
import "axios";
import { section } from "../../server";

export class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.searchAction = props.searchAction;
    //TODO integration get all Sections
    const axios = require("axios");
    axios.get(section).then(response => this.filterItems(response.data));

    let json = require("./../../data.json");
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

  filterItems(json) {
    //json = JSON.stringify(json);
    console.log(json[0]._id);
    this.datum = ["Letzte Stunde", "Heute", "Diese Woche", "Dieses Jahr"];

    this.max = Math.max(
      this.datum.length,
      json.length,
      this.t.Fach.length,
      this.t.Kurs.length
    );

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
    /*


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
   */
  }

  fill(a) {
    return a.concat(
      new Array(this.max - a.length).fill({ name: "", id: null })
    );
  }

  render() {
    return (
      <div align="center" className="style">
        <table className="table">
          <thead>
            <tr>
              <th>
                <u>Datum</u>
              </th>
              <th>
                <u>Fachbereich</u>
              </th>
              <th>
                <u>Fach</u>
              </th>
              <th>
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
