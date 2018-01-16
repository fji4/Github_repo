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
    Icon
} from 'native-base';

import {
    Scene,
    Router,
    Actions,
    Stack
} from 'react-native-router-flux';

import Search from './Search';

/**
 * The Profile page. Should appear first.
 */
export default class Profile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user:{},
            user_api:""
        };

        this.getAuthInformation();
    }

    /**
     * Call github api to get all the user information and store them to a dic.
     */

    getAuthInformation() {
        axios.get("https://api.github.com/user?access_token="+token)
            .then(function(response){
                 /*
                 Store data locally.
                  */
                AsyncStorage.setItem('user',JSON.stringify(response.data));
                this.setState({
                    user:response.data
                });
            }.bind(this));
    }

    /**
     * Load data stored locally for debug.
     * @returns {Promise.<void>}
     */
    showData = async () => {
        try{
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            alert(parsed.bio);
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
                    <List>
                        <ListItem>
                            <View style={styles.centralize}>
                                <Thumbnail large source={{url:this.state.user['avatar_url']}} />
                            </View>
                        </ListItem>
                        <ListItem style={styles.centralize}>
                            <Text>{this.state.user['name']}</Text>
                        </ListItem>
                        <ListItem style={styles.centralize}>
                            <Text>{this.state.user['bio']}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Left>
                                <Text>Summary</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Username</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['login']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            {/*<Left>*/}
                            <Text>Website</Text>
                            {/*</Left>*/}
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.user['blog']}</Text>

                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Location</Text>
                            </Left>

                            <Text>{this.state.user['location']}</Text>

                        </ListItem>
                        <ListItem itemDivider>
                            <Left>
                                <Text>Detail</Text>
                            </Left>
                        </ListItem>
                        <ListItem onPress={()=>Actions.replace("repo",{repo:this.state.user['repos_url']})}>
                            <Left>
                                <Text>Repositories</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['owned_private_repos']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem onPress={()=>Actions.replace("follower",{follower:this.state.user['followers_url']})}>
                            <Left>
                                <Text>Followers</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['followers']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem onPress={()=>Actions.replace("following",{following:this.state.user['following_url']})}>
                            <Left>
                                <Text>Followings</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['following']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Create Date</Text>
                            </Left>
                            <Text>{
                                (this.state.user['created_at'] !== undefined) ? this.state.user['created_at'].split('T')[0] : ''
                            }</Text>
                        </ListItem>
                        <ListItem>
                            <Text onPress={() => Actions.visualization()}>React Native Data Visualization</Text>
                        </ListItem>
                    </List>
                    {/*<Button onPress={this.showData}>*/}
                        {/*<Text>Show data</Text>*/}
                    {/*</Button>*/}
                </Content>
                <Footer>
                    <FooterTab >
                        <Button vertical active>
                            <Icon name="person"/>
                            <Text style={styles.textSize}>Profile</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("repo", {repo:this.state.user['repos_url']})}>
                            <Icon name="paper"/>
                            <Text style={styles.textSize}>Repo</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("follower",{follower:this.state.user['followers_url']})}>
                            <Icon name="md-contacts"/>
                            <Text style={styles.textSize}>Follower</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("following",{following:this.state.user['following_url']})}>
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
 * stylesheet for centralize the first two column of text of profile page and make the font of footer smaller.
 */
const styles = StyleSheet.create({
    centralize: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSize: {
        fontSize: 6,
    },
});