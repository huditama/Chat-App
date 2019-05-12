import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import firebase from '../firebaseConfig'

export default class Home extends Component {
    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (!user) {
                    setTimeout(() => {
                        this.props.navigation.navigate('Join')
                    }, 3000)
                } else {
                    setTimeout(() => {
                        this.props.navigation.navigate('Chat')
                    }, 3000)
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ height: 300, width: 300 }}
                    source={{ uri: 'https://i.gifer.com/ZAbi.gif' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})