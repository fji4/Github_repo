/**
 * Created by aliceji on 10/20/17.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
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
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

/**
 * The template profile page which used to render the profile page for followers and followings
 */
class ProfileTemplate extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user:{}
        };

        this.getUserInformation();
    }

    /**
     * Get the user profile api by passing the props and store the data in dic
     */
    getUserInformation() {
        axios.get(this.props.api)
            .then(function(response){
                //console.log(response);
                this.setState({
                    user:response.data
                });
            }.bind(this));
    }




    render() {
        return (
            <Container>
                {/*<Header />*/}
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
                        <ListItem itemDivider>
                            <Left>
                                <Text>Summary</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Username</Text>
                            </Left>
                                <Text>{this.state.user['login']}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Left>
                                <Text>Detail</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Repositories</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['public_repos']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem onPress={()=>Actions.follower({follower:this.state.user['followers_url']})}>
                            <Left>
                                <Text>Followers</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.user['followers']}</Text>
                            </Right>
                        </ListItem>
                        <ListItem onPress={()=>Actions.following({following:this.state.user['following_url']})}>
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
                    </List>
                </Content>
            </Container>
        );
    }
}

/**
 * Stylesheet for centering the name of the user in the second column of the page.
 */
const styles = StyleSheet.create({
    centralize: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default ProfileTemplate;