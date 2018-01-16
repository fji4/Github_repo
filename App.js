import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

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

import Repo from './components/Repo';
import Follower from './components/Follower';
import Following from './components/Following';
import Website from  './components/Website';
import ProfileTemplate from './components/Profile';
import StarRepo from './components/StarRepo';
import Profile from './components/Home';
import SearchRepo from './components/SearchRepo';
import SearchUser from './components/SearchUser';
import Notification from './components/Notification';
import Visualization from './components/Visualization';
token = "de37475900b221c9b18270495e34ce6376259673";

/*
Router Definition for all pages.
 */
export default class App extends Component {

    render() {
        return (
            <Router sceneStyle={{paddingTop:5, paddingRight:5}}>
                <Stack key="root">
                    <Scene key="profile" component={Profile} title="Profile" initial/>
                    <Scene key="repo" component={Repo} title="Repositories"/>
                    <Scene key="follower" component={Follower} title="Followers"/>
                    <Scene key="following" component={Following} title="Followings"/>
                    <Scene key="website" component={Website}/>
                    <Scene key="profile_template" component={ProfileTemplate}/>
                    <Scene key="star_repo" component={StarRepo} title="Repositories"/>
                    <Scene key="search_repo" component={SearchRepo} title="Search Results"/>
                    <Scene key="search_user" component={SearchUser} title="Search Results"/>
                    <Scene key="notification" component={Notification} title="Notifications"/>
                    <Scene key="visualization" component={Visualization} title="Last Year Commit"/>
                </Stack>
            </Router>
        );
    }
}


AppRegistry.registerComponent('GitApp', () => App);
