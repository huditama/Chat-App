import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from '../firebaseConfig'
import { firestore } from '../firebaseConfig'

export default class Example extends React.Component {
    state = {
        messages: []
    };

    componentWillMount() {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.setState({
                    userId: user.uid
                })
            })

        firestore
            .collection('messages')
            .get()
            .then((snapshot) => {
                messages = []
                snapshot.forEach((doc) => {
                    messages.push({
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                    })
                })
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages)
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onSend(messages = []) {
        firestore
            .collection('messages')
            .add(messages[0])
            .then(() => {
                console.log('Added new message to firebase!')
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages)
                }));
            })
            .catch((err) => {
                console.log(err)
            })
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