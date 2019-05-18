import React from "react";
/**
 * Returns you the thumbnail of a Youtube video as an img.
 * @param onclick Has onclick which will be applied to the Thumbnail
 * @param id Has an id for its data to give it to the onclick function.
 * @param videoId Has videoId is an url to a youtube video which the thumbnail should be taken.
 */
export class MenueItem extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.id = props.id;
    this.child = props.child;
    this.click = props.onclick;
  }
  render() {
    if (this.child.length < 1)
      return (
        <li>
          <div className="MenueItem" onClick={() => this.click(this.id)}>
            {this.name}
          </div>
        </li>
      );

    return (
      <li>
        <div className="MenueItem" onClick={() => this.click(this.id)}>
          {this.name}
        </div>
        <ul>{this.child}</ul>
      </li>
    );
  }
}
