/**
 * Created by andy on 2/28/17.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import {browserHistory} from "react-router";
import Route from 'route-parser';

import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import appState from "../../../store/appState";


@observer
class ControlBar extends Component {

    constructor(props) {
        super(props);
        this.routeParser = new Route('/:name');
    }

    componentWillMount() {
        appState.cv.featured = this.routeParser.match(window.location.pathname).name === "resume";
    }

    onSwitchCVResume = () => {
        if (appState.cv.featured) {
            browserHistory.push("/cv");
        } else {
            browserHistory.push("/resume")
        }
        appState.cv.featured = !appState.cv.featured;
    };

    onSwitchSeal = () => {
        appState.cv.showSeal = !appState.cv.showSeal;
    };

    render() {
        return (<Paper className="toolbar-paper" zDepth={1} rounded={false}>
            CV
            <Toggle
                style={{display: "inline-block", width: "auto"}}
                toggled={appState.cv.featured}
                onToggle={this.onSwitchCVResume}
            />
            Resume <br />
            <Checkbox
                label="Show Seal"
                checked={appState.cv.showSeal}
                onCheck={this.onSwitchSeal}
            /> <br />
            <RaisedButton
                label="Print"
                fullWidth={true}
                primary={true}
                onTouchTap={() => {
                    print()
                }}
                icon={<FontIcon className="material-icons">print</FontIcon>}
            />
            <RaisedButton
                label="PDF"
                fullWidth={true}
                secondary={true}
                style={{marginTop: "0.2em"}}
                onTouchTap={() => {
                    window.location = (appState.cv.featured ? '/resume.pdf' : '/cv.pdf')
                }}
                icon={<FontIcon className="material-icons">file_download</FontIcon>}
            />

        </Paper>);
    }
}

export default ControlBar;
