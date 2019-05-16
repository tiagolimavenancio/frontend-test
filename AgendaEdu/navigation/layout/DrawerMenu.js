import React from 'react'
import {
    Image,
    StyleSheet,
    Platform,
    Alert
} from 'react-native'
import {
    Container,
    Content,
    List,
    ListItem,
    Body,
    Text,
    Title,
    Subtitle,
    Spinner
} from 'native-base'
import { Actions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ReduxActions from '../../redux/actions'

import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);        
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    defineItemStyle(key) {
        return this.props.activeItemKey == key ? styles.listItemActive : styles.listItem
    }

    defineItemTextStyle(key) {
        return this.props.activeItemKey == key ? styles.listItemActiveText : styles.listItemText
    }

    onSignOut() {        
        setTimeout(() => { this.props.requestSignOut(this.onSuccess, this.onError) }, 500)
    }

    onSuccess() {
        Actions.unauthorized({ type: 'reset' })
    }

    onError(error) {
        Alert.alert('Oops!', error.message)
    }

    showAlert() {
        Alert.alert(
            'Sair',
            'Deseja realizar essa ação?',
            [
                { text: 'Sim', onPress: () => this.onSignOut(), style: 'destructive' },
                { text: 'Não', onPress: () => console.log('No Pressed')}
            ],
            { cancelable: false }
        )
    }

    render() {
        let { auth } = this.props.state
        return(
            <Container>
                <Body style={styles.headerDrawer}>
                    <Image style={ styles.avatar } source={require('../../assets/avatar/avatar_1.png')} />
                    <Title style={ styles.title }>Nome do Estudante</Title>
                    <Subtitle style={ styles.subtitle }>student@ae.com</Subtitle>
                </Body>
                <Content>
                    <List>
                        <ListItem style={[this.defineItemStyle('home'), Layout.firstListItem]} first onPress={ _ => Actions.home() }>
                            <Body>
                                <Text style={this.defineItemTextStyle('home')}>Início</Text>
                            </Body>
                        </ListItem> 
                        <ListItem last onPress={ _ => this.showAlert()}>
                            <Body>
                                <Text style={styles.logout}>Sair</Text>
                            </Body>
                            {
                                (auth.isWaiting)
                                ? <Spinner color={ Colors.accentColor } size='small' style={{ width: 20, height: 20}} />
                                : null
                            }              
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            auth: state.auth
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return  bindActionCreators(ReduxActions.AuthActions, dispatch)    
}

const styles = StyleSheet.create({
    headerDrawer: {
      flex: 1,
      maxHeight: 160,
      paddingHorizontal: 5,
      paddingVertical: Platform.OS === 'ios' ? 10 : 24,
      marginTop: Platform.OS === 'ios' ? 10 : 24,
      alignSelf:"stretch",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primaryColor
    },
    listItem: {
      backgroundColor: 'rgba(153, 153, 153, 0)',
    },
    listItemActive:{
      backgroundColor: 'rgba(153, 153, 153, 0.1)',
    },
    listItemText:{
      fontWeight: '600',
    },
    listItemActiveText:{
      fontWeight: '600',
      color: Colors.accentColor
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30
    },
    title: {
      marginHorizontal: 5,
      fontSize: 20,
      color: Colors.accentColor,
      fontWeight: '600',
    },
    subtitle: {
      fontSize: 12,
      color: 'gray',
      fontWeight: '500',
    },
    logout: {
      fontWeight: '600',
      fontSize: 18,
      color: 'red'
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu)