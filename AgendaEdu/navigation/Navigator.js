import React from 'react';
import { 
    View, 
    Platform, 
    StatusBar, 
    StyleSheet 
} from 'react-native';
import { 
    Router, 
    Stack, 
    Scene, 
    Actions, 
    Drawer
} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import Store, { configureStore } from '../redux/store';

import ReduxActions from '../redux/actions';

import Colors from '../constants/Colors';
import Loading from '../components/Loading';

import DrawerMenu from './drawer/DrawerMenu';
import MenuButton from './drawer/MenuButton';
import SignInScreen from '../screens/SignInScreen'
import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen'

const RouterWithRedux = connect()(Router)
Store.instance = configureStore()

class Navigator extends React.Component {

    whitelistExitApp = ['home', 'sign_in']

    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            isReady: false            
        }
        this.onBackPress = this.onBackPress.bind(this)
    }

    componentDidMount() {
        this.checkSessionToken()
    }

    async checkSessionToken() {
        await Store.instance.dispatch(ReduxActions.AuthActions.checkSessionStatus((isLogged) => {            
            this.setState({ isReady: true, isLogged })
        }))
    }

    onBackPress() {
        if(this.whitelistExitApp.includes(Actions.currentScene) && Actions.state.index === 0){
            return false;
        }
        Actions.pop();
        return true;
    }

    render() {
        if(!this.state.isReady) {
            return <Loading />
        }

        return(
            <View style={styles.container}>
                <StatusBar barStyle='default' />
                <Provider store={Store.instance}>
                    <RouterWithRedux sceneStyle={styles.sceneStyle} backAndroidHandler={this.onBackPress}>
                        <Stack key='root'>
                            <Stack key='unauthorized' type='replace' initial={!this.state.isLogged} hideNavBar>
                                <Scene 
                                    key='sign_in'
                                    component={ SignInScreen } />
                            </Stack>
                            <Stack key='authorized' type='replace' initial={this.state.isLogged} hideNavBar>
                                <Drawer
                                    key='drawer'
                                    contentComponent={ DrawerMenu }
                                    navigationBarStyle={ Platform.OS == 'ios' ? {} : styles.androidNavigationBarStyle }
                                    drawerOpenRoute='DrawerOpen'
                                    drawerCloseRoute='DrawerClose'
                                    drawerToggleRoute='DrawerToggle'
                                    renderLeftButton={ () => <MenuButton /> } >
                                  <Scene 
                                        key='home'
                                        component={ HomeScreen }                                         
                                        titleStyle={ Platform.OS == "ios" ? {} : styles.navTitleStyle }
                                        title= 'Eventos' />
                                </Drawer>
                                <Scene
                                    key='detail'
                                    component={ DetailScreen }                                     
                                    titleStyle={ Platform.OS == "ios" ? {} : styles.navTitleStyle }
                                    title= 'Detalhes do evento'                                    
                                    hideNavBar={false} />
                            </Stack>
                        </Stack>
                    </RouterWithRedux>
                </Provider>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    androidNavigationBarStyle: {
        backgroundColor: Colors.primaryColor,
        paddingTop: 24,        
    },
    navTitleStyle: {
        color: 'black'
    },
    navBackButtonStyle: {
        tintColor: 'white'
    },
    sceneStyle: {
        backgroundColor: 'white'
    }
})

export default Navigator