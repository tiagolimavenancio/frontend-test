import React from 'react';
import {
    View,
    Keyboard,
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import {
    Container,
    Content,
    Input,
    Label,
    Text,
    Title,
    Button,
    Form,
    Item,
    Icon,
    InputGroup
} from 'native-base';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReduxActions from '../redux/actions';
import Loading from '../components/Loading';

class SignInScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
        this.submit = this.submit.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)        
    }

    async submit() {
        Keyboard.dismiss()
        let { user } = this.state
        await this.props.signIn(user.email, user.password, this.onSuccess, this.onError)
    }

    onSuccess() {
        setTimeout(() => { Actions.authorized({ type: 'reset' }) }, 500)
    }

    onError(error) {
        Alert.alert('Oops!', error.message)
    }

    render() {
        let { auth } = this.props.state
        let { user } = this.state

        if (auth.isWaiting) {
            return <Loading />
        }

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <View>
                        <View style={styles.title}>
                            <Title style={{ fontSize: 25, marginRight: 10 }}>Faça seu login</Title>
                            <Image 
                                style={{ width: 25, height: 25 }}
                                source={require('../assets/icons/key.png')} />
                        </View>
                        <Form>
                            <Item stackedLabel style={{ marginBottom: 10 }} last>
                                <Label style={styles.label}>E-mail ou usuário</Label>
                                <Input
                                    style={styles.input} 
                                    returnKeyType='next' 
                                    onChangeText={(email) => this.setState({ user: { ...user, email }})} 
                                    value={user.email} />
                                <Icon name='mail' style={styles.icon} />
                            </Item>
                            <Item stackedLabel style={{ marginBottom: 10 }} last>
                                <Label style={styles.label}>Senha</Label>
                                <Input 
                                    style={styles.input}
                                    returnKeyType='done' 
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ user: { ...user, password }})} 
                                    value={user.password} />
                                <Icon name='eye-off' style={styles.icon} />
                            </Item>
                            <Button block style={styles.btn} onPress={this.submit}>
                                <Text>Entrar</Text>
                            </Button>
                        </Form>
                    </View>
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        state: {
            auth: state.auth
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators(ReduxActions.authActions, dispatch);
}

const styles = StyleSheet.create({
    container: { },
    content: {
        flex: 1,
        alignItems: 'center',        
        justifyContent: 'center',
        paddingHorizontal: 10
    }, 
    title: {
        flexDirection: 'row',
        textAlign: 'left', 
        marginHorizontal: 18,
        alignItems: 'center',
        marginVertical: 36,
        height: 36                         
    }, 
    text: {
        fontWeight: 'bold',         
        color: '#333333'
    },
    label: {
        color: '#666666'
    },
    input: {
        borderColor: '#ABB1B7',
        borderRadius: 5,
        borderWidth: 1,
    },
    btn: {                       
        marginHorizontal: 10,              
        backgroundColor: '#733DBE',                
    },
    icon: {
        color: '#AAAAAA'           
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)