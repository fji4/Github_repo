/**
 * Created by aliceji on 11/1/17.
 */
import React, { Component } from 'react'
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Thumbnail, Icon, Footer, FooterTab,Title, Right, Picker, Form, Item } from 'native-base';
import {
    Linking,
    NavigatorIOS,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    Platform
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
token = "de37475900b221c9b18270495e34ce6376259673";

/**
 * Wrap up the list of the repo search results
 * @param props
 * @returns {XML}
 * @constructor
 */
const SearchList = props => {
    const searchItems = props.searches.map(search => {
        return (
            <SearchListItem
                key = {search.id}
                search={search}
            />
        );
    });

    return (
        <ScrollView>
        <List>
            {searchItems}
        </List></ScrollView>
    );
};


/**
 * Render one repo search result
 * @param search
 * @returns {XML}
 * @constructor
 */
const SearchListItem = ({search}) => {

    return(
        <ListItem onPress={()=>Actions.website({repo:search})}>
            <Body>
            <Text>{search['full_name']}</Text>
            <Text note>{search['description']}</Text>
            </Body>
            <Icon name="ios-arrow-forward"/>
        </ListItem>
    );
};


/**
 * The repo search result page
 */
export default class SearchRepo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input:this.props.input,
            repos: [],
            selected: "",
            order: ""
        };

        axios.defaults.baseURL = 'https://api.github.com';
        axios.defaults.headers.common['Authorization'] = "token "+token;
        this.searchRepos();
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onOrderChange = this.onOrderChange.bind(this);
    }

    /**
     * Call search repo api to get the result data
     */
    searchRepos() {
        axios.get("/search/repositories?q="+this.state.input)
            .then(function(response){
                //console.log(response.data.items);
                this.setState({
                    repos:response.data.items
                });
            }.bind(this));
    }


    /**
     * Help function for filter the results
     * @param selected
     */
    onSelectChange(selected: string) {
        this.setState({
            selected: selected,
        },this.ValueChange);

    }

    /**
     * Help function for ascending and descending the results
     * @param order
     */
    onOrderChange(order: string) {
        this.setState({
            order:order
        }, this.ValueChange);
    }


    /**
     * Apply the filter and oreder to the rendered result list
     * @constructor
     */
    ValueChange(){
        if(this.state.selected == "" && this.state.order != ""){
            axios.get("https://api.github.com/search/repositories?q="+this.state.input+"&order="+this.state.order)
                .then(function(response){
                    console.log("only order");
                    this.setState({
                        repos:response.data.items
                    });
                }.bind(this));
        }

        else if (this.state.selected != "" && this.state.order == "") {
            axios.get("/search/repositories?q="+this.state.input+"&sort="+this.state.selected)
                .then(function(response){
                    console.log("only selected");
                    console.log(this.state.selected);
                    //console.log(response);
                    this.setState({
                        repos:response.data.items
                    });
                }.bind(this));
        }

        else if(this.state.selected != "" && this.state.order != ""){
            axios.get("https://api.github.com/search/repositories?q="+this.state.input+"&sort="+this.state.selected+"&order="+this.state.order)
                .then(function(response){
                    console.log(response);
                    this.setState({
                        repos:response.data.items
                    });
                }.bind(this));
        }
        else{
            console.log("state not assigned");
        }
    }


    render() {
        return(
           <Container>
               {/*<Content>*/}
                   <Form>
                       <Picker
                           mode="dropdown"
                           placeholder="Filter"
                           selectedValue={this.state.selected}
                           onValueChange={(itemValue, itemIndex) => this.onSelectChange(itemValue)}
                       >
                           <Item label="Number of Stars" value="stars" />
                           <Item label="Recently Updated" value="updated" />
                       </Picker>
                   </Form>
               <Form>
                   <Picker
                       mode="dropdown"
                       placeholder="Order"
                       selectedValue={this.state.order}
                       onValueChange={(itemValue, itemIndex) => this.onOrderChange(itemValue)}
                   >
                       <Item label="Ascending" value="asc" />
                       <Item label="Descending" value="desc" />
                   </Picker>
               </Form>
               {/*</Content>*/}
                {/*<Text>{this.state.input}</Text>*/}


                <SearchList
                     searches= {this.state.repos}
                />

            </Container>
        )
    }
}


