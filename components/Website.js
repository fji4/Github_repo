/**
 * Created by aliceji on 10/21/17.
 */
import React, { Component } from 'react';
import {WebView} from 'react-native';
import {Actions} from 'react-native-router-flux';

/**
 * Render the web page of the repositories inside the app by pass the props
 */
export default class Website extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <WebView source={{uri:this.props.repo['html_url']}}/>

        );
    }
}