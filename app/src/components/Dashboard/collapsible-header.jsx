import React, { Component } from "react";
import {
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component";

import '../Styles/dashboard.css'

class CollapsibleHeader extends Component {
    render() {
        return <div className="collapsible-div">
                <CollapsibleComponent>
                    <CollapsibleHead className="collapsible-header">
                        {this.props.race.name}
                    </CollapsibleHead>
                    <CollapsibleContent className="collapsible-content">
                        <p>
                            
                        </p>
                    </CollapsibleContent>
                </CollapsibleComponent>
            </div>    
    }
}

export default CollapsibleHeader