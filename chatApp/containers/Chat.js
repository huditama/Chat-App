import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from '../firebaseConfig'
import { firestore } from '../firebaseConfig'
import { Button } from 'react-native'
import { Header, Right } from 'native-base'

export default class Example extends React.Component {
    state = {
        messages: [],
        userId: ''
    };

    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        userId: user.uid
                    })
                } else {
                    this.setState({
                        userId: ''
                    })
                }
            })

        firestore
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                messages = []
                snapshot.forEach((doc) => {
                    messages.push({
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                    })
                })
                this.setState({
                    messages
                })
            })
    }

    onSend(messages = []) {
        firestore
            .collection('messages')
            .add(messages[0])
    }

    handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                // Sign-out successful.
                this.props.navigation.navigate('Join')
            }).catch(function (error) {
                // An error happened.
                console.log(error)
            });
    }

    render() {
        let displayName = 'Username...'
        if (this.props.navigation.state.params.name) {
            displayName = this.props.navigation.state.params.name
        }
        return (
            <>
                <Header >
                    <Right>
                        <Button
                            title='Logout'
                            onPress={this.handleLogout}
                        />
                    </Right>
                </Header>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    renderUsernameOnMessage={true}
                    isAnimated={true}
                    user={{
                        _id: this.state.userId,
                        name: displayName
                    }}
                />
            </>
        );
    }
}