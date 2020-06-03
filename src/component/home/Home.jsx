import React, {Component} from "react";
import {Link} from "react-router-dom";

class HomeComponent extends Component {
    render() {
        return (
            <div className="list-container">
                <p>
                    <h3>
                        Home page.
                    </h3>
                </p>
                <Link to={"/signin"}>
                    <h3>
                        Sign in?
                    </h3>
                </Link>
            </div>
        )
    }
}

export default HomeComponent
