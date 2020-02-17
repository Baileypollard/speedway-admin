import React, { Component } from "react";
import RacesGrid from './racesGrid'
import '../Styles/races.css'
import {Button} from 'react-bootstrap'

class RacesPage extends Component {
    render() {
        return <div className="races">
                    <h1>Races</h1>
                    <div className="button">
                        <Button className="ml-auto">Create Race</Button>
                    </div>
                    <RacesGrid/>
                </div>
    }
}


export default RacesPage;