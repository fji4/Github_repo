/**
 * Created by aliceji on 11/5/17.
 */
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
 * Render the whole list of the notifications.
 * @param props
 * @returns {XML}
 * @constructor
 */
const NoteList = props => {
    const NoteItems = props.notes.map(note => {
        return (
            <NoteListItem
                key = {note.id}
                note={note}
            />
        );
    });

    return (
        <List>
            {NoteItems}
        </List>
    );
};


/**
 * Render only one repo among all the notifications
 * @param note
 * @returns {XML}
 * @constructor
 */

class NoteListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i_name:"ios-sync"
        };
        this.detectRead = this.detectRead.bind(this);
        this.detectRead();
    }

    /**
     * Detect whether the notification is read or not
     */
    detectRead(){
        if(this.props.note['unread'] == true){
            this.state.i_name = "ios-alert";
        }
        else{
            this.state.i_name = "ios-checkmark-circle-outline"
        }
    }

    render() {return(
        <ListItem>
            <Body>

            <Text>{this.props.note['subject'].title}</Text>
            <Text note>{this.props.note['repository'].full_name}</Text>
            </Body>
            <Icon name={this.state.i_name}/>
        </ListItem>
    )}


}




/**
 * The notifications page
 */
export default class Notification extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            read:[],
            unread:[]
        };
        axios.defaults.baseURL = 'https://api.github.com';
        axios.defaults.headers.common['Authorization'] = "token "+token;
        this.getReadNotes()
    }

    /**
     * call the notification github api and store the data in an array
     */
    getReadNotes() {
        axios.get("/repos/facebook/react-native/notifications?all=true")
            .then(function(response){
                console.log(response.data);
                this.setState({
                    unread:response.data
                });
            }.bind(this));
    }



    render() {
        return (

            <Container>
                <Search/>
                <Content>
                    <NoteList notes={this.state.unread}/>
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
                        <Button vertical onPress={()=>Actions.replace("following")}>
                            <Icon name="ios-people"/>
                            <Text style={styles.textSize}>Following</Text>
                        </Button>
                        <Button vertical active>
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

