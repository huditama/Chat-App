import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from '../firebaseConfig'
import { firestore } from '../firebaseConfig'

export default class Example extends React.Component {
    state = {
        messages: []
    };

    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.setState({
                    userId: user.uid
                })
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

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.state.userId
                }}
            />
        );
    }
}