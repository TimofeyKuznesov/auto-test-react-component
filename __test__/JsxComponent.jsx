import React, { Component } from "react";
import PropTypes from "prop-types";

export default class JsxComponent extends Component {
    static propTypes={
        name: PropTypes.string,
        id: PropTypes.number,
        values: PropTypes.object
    }
    render() {
        // if(process.env.NODE_ENV !== "production")
        // // eslint-disable-next-line no-console
        //     console.log(this.props);
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
}
