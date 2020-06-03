import React, {Component} from "react";

class LoadingSpinner extends Component {
    render() {
        return (
            <div>
                <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves" width={250}/>
            </div>
        )
    }
}

export default LoadingSpinner
