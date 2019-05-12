import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from './containers/Home'
import Join from './containers/Join'
import Chat from './containers/Chat'

const appNavigator = createSwitchNavigator({
    Home: {
        screen: Home
    },
    Join: {
        screen: Join
    },
    Chat: {
        screen: Chat
    }
}, {
        initialRouteName: 'Home'
    }
)

export default createAppContainer(appNavigator)