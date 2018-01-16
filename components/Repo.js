/**
 * Created by aliceji on 10/21/17.
 */
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Icon, Footer, FooterTab, Segment } from 'native-base';
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
 * Render the whole list of the repositories.
 * @param props
 * @returns {XML}
 * @constructor
 */
const RepoList = props => {
    const RepoItems = props.repos.map(repo => {
        return (
            <RepoListItem
                key = {repo.id}
                repo={repo}
            />
        );
    });

    return (
        <List>
            {RepoItems}
        </List>
    );
};


/**
 * Render only one repo among all the repositories
 * @param repo
 * @returns {XML}
 * @constructor
 */
const RepoListItem = ({repo}) => {
    /*
    Store data locally.
     */
    AsyncStorage.setItem(repo['full_name'],JSON.stringify(repo));

    return(
       <ListItem onPress={()=>Actions.website({repo:repo})}>
                <Body>
                    <Text>{repo['full_name']}</Text>
                    <Text note>{repo['description']}</Text>
                </Body>
           <Icon name="ios-arrow-forward"/>
       </ListItem>
    );
};


/**
 * The repositories page
 */
export default class Repo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            repos:[]
        };
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+token;
        this.getRepos();
    }

    /**
     * call the repos github api and store the data in an array
     */
    getRepos() {
        axios.get("/repos")
            .then(function(response){
                AsyncStorage.setItem('repo',JSON.stringify(response.data));

                this.setState({
                    repos:response.data
                });
            }.bind(this));
    }

    /**
     * Load data stored locally for debug.
     * @returns {Promise.<void>}
     */
    showData = async () => {
        try{
            let user = await AsyncStorage.getItem('fji4/CS418');
            let parsed = JSON.parse(user);
            alert(parsed.description);
        }

        catch (error) {
            alert(error);
        }
    };

    render() {
        return (

            <Container>
                <Search/>
                <Segment>
                    <Button first active>
                        <Text>Owned repos</Text>
                    </Button>
                    <Button last onPress={() => Actions.replace("star_repo")}>
                        <Text>Starred repos</Text>
                    </Button>
                </Segment>
                <Content>
                    <RepoList repos={this.state.repos}/>
                    {/*<Button onPress={this.showData}><Text>Show Data</Text></Button>*/}
                </Content>
                <Footer>
                    <FooterTab >
                        <Button vertical onPress={()=>Actions.replace("profile")}>
                            <Icon name="person"/>
                            <Text style={styles.textSize}>Profile</Text>
                        </Button>
                        <Button vertical active>
                            <Icon name="paper"/>
                            <Text style={styles.textSize}>Repo</Text>
                        </Button>
                        <Button vertical onPress={()=>Actions.replace("follower")}>
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
 * stylesheet for resizing the footer's font size
 */
const styles = StyleSheet.create({
    textSize: {
        fontSize: 6,
    },
});

