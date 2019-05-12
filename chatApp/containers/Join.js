import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Left,
    Body,
    Form,
    Item,
    Input,
    Label
} from 'native-base';
import firebase from '../firebaseConfig'

export default class Login extends Component {
    state = {
        name: ''
    }

    handleJoin = () => {
        firebase
            .auth()
            .signInAnonymously()
            .then(({ user }) => {
                console.log(user, '=== INI USER SETELAH SIGN IN ANONYMOUS')
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                // ...
            });
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'steelblue' }}>
                <Header>
                    <Body>
                        <Text>Join</Text>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon-by-vexels.png' }} />
                                <Body>
                                    <Text>Start Chatting!</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <Form>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input onChangeText={(name) => this.setState({ name })} />
                            </Item>
                        </Form>
                        <CardItem>
                            <Left>
                                <Button onPress={this.handleJoin} >
                                    <Text>Join</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})