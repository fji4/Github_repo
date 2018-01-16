/**
 * Created by aliceji on 11/6/17.
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme, VictoryPie, VictoryGroup } from 'victory-native';
import axios from 'axios';

import {
    Platform,
    StyleSheet,
    NavigatorIOS,
    View,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';

import  {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    Text,
    Badge,
    Thumbnail,
    List,
    ListItem,
    Left,
    Right,
    Separator,
    Icon
} from 'native-base';


/**
 * Render a bar chart and a pie chart for one week commitments
 */
class DataListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[{x: "Sun.", y: this.props.data['days'][0]},
                {x: "Mon.", y: this.props.data['days'][1]},
                {x: "Tue.", y: this.props.data['days'][2]},
                {x: "Wed.", y: this.props.data['days'][3]},
                {x: "Thu.", y: this.props.data['days'][4]},
                {x: "Fri.", y: this.props.data['days'][5]},
                {x: "Sat.", y: this.props.data['days'][6]}]
        }

    }


    render() {

        return (
            <Container>
        <VictoryChart theme={VictoryTheme.material} domainPadding={25}>
            <VictoryBar data={this.state.data}/>
        </VictoryChart>
                <VictoryGroup theme={VictoryTheme.material}>
                    <VictoryPie data={this.state.data}/>
                </VictoryGroup>
            </Container>

        )
    }
}

/**
 * Render the whole list of the charts
 * @param props
 * @returns {XML}
 * @constructor
 */
const DataList = props => {
    const DataItems = props.datas.map(data => {
        return (
            <DataListItem
                key = {data['week']}
                data={data}
            />
        );
    });

    return (
        <ScrollView>

            {DataItems}

        </ScrollView>
    );
};


/**
 * Call stats api and wrap up the whole year commitments together
 */
export default class Visualization extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activity:[],
            data:[]
        };

        axios.defaults.baseURL = 'https://api.github.com';
        this.getStat();
    }

    /**
     * API calling to get the commit activity data.
     */
    getStat(){
        axios.get("/repos/facebook/react-native/stats/commit_activity")
            .then(function(response){
                this.setState({
                    activity:response.data
                });
            }.bind(this));
    }


    render() {

        return (
            <ScrollView>
                <DataList datas={this.state.activity}/>
            </ScrollView>

        )
    }
}