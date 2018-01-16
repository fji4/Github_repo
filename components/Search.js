/**
 * Created by aliceji on 11/1/17.
 */


import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import axios from 'axios';

import {
    Platform,
    StyleSheet,
    NavigatorIOS,
    View,
    Image,
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
    Icon,
    Item,
    Input,
    Form,
    Picker
} from 'native-base';

import {
    Scene,
    Router,
    Actions,
    Stack
} from 'react-native-router-flux';

/**
 * Render the search bar at the top of every page
 */
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input:"",
            target:""
        };

        this.inputSearch=this.inputSearch.bind(this);
    }

    /**
     * Get the search input.
     * @param text
     */
    inputSearch(text) {
        this.setState({
            input:text
        });
    }

    /**
     * Determine the search target is a user or a repo.
     */
    searchTarget() {
        if(this.state.target == "users"){
            Actions.search_user({input:this.state.input})
        }
        else if (this.state.target == "repos"){
            Actions.search_repo({input:this.state.input})
        }
    }

    render() {
        return(

                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={(text) => this.inputSearch(text)}/>
                        <Form>
                            <Picker
                                mode="dropdown"
                                placeholder="target"
                                selectedValue={this.state.target}
                                onValueChange={(itemValue, itemIndex) => this.setState({target: itemValue})}
                            >
                                <Item label="Users" value="users" />
                                <Item label="repos" value="repos" />
                            </Picker>
                        </Form>
                    </Item>
                    <Button transparent onPress={() => this.searchTarget``}>
                        <Text>Search</Text>
                    </Button>
                </Header>

        )
    }

}