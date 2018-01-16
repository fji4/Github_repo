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

class RepoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_name:"ios-sync"
        };
        this.follow_icon(this.props.repo);
    }

    /**
     * Check the user is starring the repo or not.
     * @param repo
     */
    follow_icon(repo) {
        axios.get("/starred/"+repo['owner']['login']+"/"+repo['name']).then(function (response) {
            console.log(response);
            if(response.status===204){
                this.setState({
                    icon_name:"ios-star"
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
     * Let user star or unstar a repo.
     * @param repo
     */
    unfollow(repo) {
        if(this.state.icon_name=="ios-star") {
            axios.delete("/starred/"+repo['owner']['login']+"/"+repo['name']).then(function (response) {
                if(response.status===204){
                    this.setState({
                        icon_name:"ios-star-outline"
                    });
                }
            }.bind(this))
        }

        else{
            axios.put("/starred/"+repo['owner']['login']+"/"+repo['name']).then(function (response) {
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
            <ListItem onPress={()=>Actions.website({repo:this.props.repo})}>
                <Body>
                <Text>{this.props.repo['full_name']}</Text>
                <Text note>{this.props.repo['description']}</Text>
                </Body>
                <Button transparent onPress={()=>this.unfollow(this.props.repo)}>
                    <Icon name={this.state.icon_name} />
                </Button>
                <Icon name="ios-arrow-forward"/>
            </ListItem>
        )
    }
}

/**
 * The repositories page
 */
export default class StarRepo extends Component {
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
        axios.get("/starred")
            .then(function(response){
                AsyncStorage.setItem('starRepo',JSON.stringify(response.data));

                this.setState({
                    repos:response.data
                });
            }.bind(this));
    }

    render() {
        return (

            <Container>
                <Search/>
                <Segment>
                    <Button first onPress={() => Actions.replace("repo")}>
                        <Text>Owned repos</Text>
                    </Button>
                    <Button last active>
                        <Text>Starred repos</Text>
                    </Button>
                </Segment>
                <Content>
                    <RepoList repos={this.state.repos}/>
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

/**
 * Created by aliceji on 10/30/17.
 */
