/**
 * Created by aliceji on 10/21/17.
 */
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Thumbnail, Right, Icon, Footer, FooterTab } from 'native-base';
import {
    Linking,
    NavigatorIOS,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Search from './Search';

token = "de37475900b221c9b18270495e34ce6376259673";


/**
 * Render only one follower for the whole list.
 * @param follower
 * @param icon_name
 * @returns {XML}
 * @constructor
 */


class FollowerListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_name:"ios-sync"
        };
        this.follow_icon(this.props.follower);
        /*
        Store data into local storage
         */
        AsyncStorage.setItem(this.props.follower['login'],JSON.stringify(this.props.follower));

    }

    /**
     * Help function for showing the user is currently following another user or not.
     * @param follower
     */

    follow_icon(follower) {
        axios.get("/following/"+follower['login']).then(function (response) {
            if(response.status===204){
                console.log("204");
                this.setState({
                    icon_name:"ios-star"
                });
            }
            else{
                this.setState({
                    icon_name:"ios-star-outline"
                });
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
            this.setState({
                icon_name:"ios-star-outline"
            });
        }.bind(this));
    }

    /**
     * Help function for user to follow or unfollow another user.
     * @param follower
     */
    unfollow(follower) {
        if(this.state.icon_name=="ios-star") {
            axios.delete("/following/"+follower['login']).then(function (response) {
                if(response.status===204){
                    this.setState({
                        icon_name:"ios-star-outline"
                    });
                }
            }.bind(this))
        }

        else{
            axios.put("/following/"+follower['login']).then(function (response) {
                if(response.status===204){
                    this.setState({
                        icon_name:"ios-star"
                    });
                }
            }.bind(this))
        }


}

    render() {
        return(
            <ListItem onPress={()=>Actions.profile_template({api:this.props.follower['url']})}>
                <Thumbnail square size={20} source={{ uri: this.props.follower['avatar_url'] }} />
                <Body>
                <Text>{this.props.follower['login']}</Text>
                </Body>
                <Button transparent onPress={()=>this.unfollow(this.props.follower)}>
                    <Icon name={this.state.icon_name} />
                    {/*<Text onPress={()=>this.unfollow(this.props.follower)}>{this.state.icon_name}</Text>*/}
                </Button>
                <Icon name="ios-arrow-forward"/>
            </ListItem>
        )
    }
}

/**
 * Render the whole list of the followers
 * @param props
 * @returns {XML}
 * @constructor
 */
const FollowerList = props => {
    const FollowerItems = props.followers.map(follower => {
        return (
            <FollowerListItem
                key = {follower['id']}
                follower={follower}
            />
        );
    });

    return (
        <List>
            {FollowerItems}
        </List>
    );
};



/**
 * The follower page.
 */
export default class Follower extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            followers:[],
            icon_name:""
        };
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+token;
        this.getFollowers();
    }

    /**
     * Call the followers github api and store the data into an array.
     */
    getFollowers() {
        axios.get("/followers")
            .then(function(response){
                this.setState({
                    followers: response['data']
                });
            }.bind(this));
    }


    /**
     * Load data from storage for debug purpose.
     * @returns {Promise.<void>}
     */
    showData = async () => {
        try{
            let user = await AsyncStorage.getItem('zdu9');
            let parsed = JSON.parse(user);
            alert(parsed.login);
        }

        catch (error) {
            alert(error);
        }
    };


    render() {
        return (

            <Container>
                <Search/>
                <Content>
                    <FollowerList followers={this.state.followers}/>
                    {/*<Button onPress={this.showData}><Text>Show Data</Text></Button>*/}
                </Content>
                <Footer>
                    <FooterTab >
                        <Button vertical onPress={()=>Actions.replace("profile")}>
                            <Icon name="person"/>
                            <Text style={styles.textSize}>Profile</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("repo")}>
                            <Icon name="paper"/>
                            <Text style={styles.textSize}>Repo</Text>
                        </Button>
                        <Button vertical active>
                            <Icon name="md-contacts"/>
                            <Text style={styles.textSize}>Follower</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("following")}>
                            <Icon name="ios-people"/>
                            <Text style={styles.textSize}>Following</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("notification")}>
                            <Icon name="ios-notifications"/>
                            <Text style={styles.textSize}>Notification</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

/**
 * stylesheet for resize the footer font size.
 */
const styles = StyleSheet.create({
    textSize: {
        fontSize: 6,
    },
});


