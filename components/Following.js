/**
 * Created by aliceji on 10/21/17.
 */
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Thumbnail, Icon, Footer, FooterTab } from 'native-base';
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
 * Render the whole following list.
 * @param props
 * @returns {XML}
 * @constructor
 */
const FollowingList = props => {
    const FollowingItems = props.followings.map(following => {
        return (
            <FollowingListItem
                key = {following['id']}
                following={following}
            />
        );
    });

    return (
        <List>
            {FollowingItems}
        </List>
    );
};


/**
 * Render only one following of the whole list
 * @param following
 * @returns {XML}
 * @constructor
 */
class FollowingListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_name:"ios-sync"
        };
        this.follow_icon(this.props.following);
        /*
        Store data locally
         */
        AsyncStorage.setItem(this.props.following['login'],JSON.stringify(this.props.following));

    }

    /**
     * Helper function for displaying current status with the user. (following or unfollowing)
     * @param following
     */
    follow_icon(following) {
        axios.get("/following/"+following['login']).then(function (response) {
            console.log(response);
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
     * Helper function for letting user to follow and unfollow a user.
     * @param following
     */
    unfollow(following) {
        if(this.state.icon_name=="ios-star") {
            axios.delete("/following/"+following['login']).then(function (response) {
                if(response.status===204){
                    console.log("unfollow");
                    this.setState({
                        icon_name:"ios-star-outline"
                    });
                }
            }.bind(this))
        }

        else{
            axios.put("/following/"+following['login']).then(function (response) {
                if(response.status===204){
                    console.log("unfollow");
                    this.setState({
                        icon_name:"ios-star"
                    });
                }
            }.bind(this))
        }


    }

    render() {
        return(
            <ListItem onPress={()=>Actions.profile_template({api:this.props.following['url']})}>
                <Thumbnail square size={20} source={{ uri: this.props.following['avatar_url'] }} />
                <Body>
                <Text>{this.props.following['login']}</Text>
                </Body>
                <Button transparent onPress={()=>this.unfollow(this.props.following)}>
                    <Icon name={this.state.icon_name} />
                    {/*<Text onPress={()=>this.unfollow(this.props.follower)}>{this.state.icon_name}</Text>*/}
                </Button>
                <Icon name="ios-arrow-forward"/>
            </ListItem>
        )
    }
}


/**
 * The following page
 */
export default class Following extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            followings:[]
        };
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+token;
        this.getFollowings();
    }

    /**
     * call the following api and store the data into an array.
     */
    getFollowings() {
        axios.get("/following")
            .then(function(response){
                AsyncStorage.setItem('following',JSON.stringify(response.data));

                this.setState({
                    followings: response['data']
                });
            }.bind(this));
    }

    /**
     * Load data locally
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
                    <FollowingList followings={this.state.followings}/>
                    <Button onPress={this.showData}><Text>Show Data</Text></Button>
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
                        <Button vertical onPress={()=>Actions.replace("follower")}>
                            <Icon name="md-contacts"/>
                            <Text style={styles.textSize}>Follower</Text>
                        </Button>
                        <Button vertical active>
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
 * stylesheet for resize the footer's font.
 */
const styles = StyleSheet.create({
    textSize: {
        fontSize: 6,
    },
});

