import React from 'react'
import {
    View,
    Keyboard,
    StyleSheet,
    Alert,
    Image
} from 'react-native'
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
    Icon      
} from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Colors from '../constants/Colors'
import ReduxActions from '../redux/actions'
import Loading from '../components/Loading'
import Validates from '../utils/Validates'

class SignInScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            isEmailFocused: false,
            isEmailValid: true,
            isPasswordFocused: false,
            isPasswordValid: true    
        }
        this.submit = this.submit.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)  
        this.handleEmailFocus = this.handleEmailFocus.bind(this)   
        this.handlePasswordFocus = this.handlePasswordFocus.bind(this) 
    }

    async submit() {
        Keyboard.dismiss()        
        if(Validates.isEmpty(this.state.email) || Validates.isEmpty(this.state.password))
            return Alert.alert('Email e senha são obrigatórios')
        
        if(this.state.isEmailValid && this.state.isPasswordValid)             
            await this.props.requestSign(this.state.email, this.state.password, this.onSuccess, this.onError) 
    }

    onSuccess(data) {
        console.log("Signed In With Success: ", data)       
        setTimeout(() => { Actions.authorized({ type: 'reset' }), 500 })        
    }

    onError(error) {        
        Alert.alert('Oops!', error.response.data.message)
    }

    handleEmailFocus() {                      
        this.setState({
            isEmailFocused: !this.state.isEmailFocused            
        })
    }

    handlePasswordFocus() {                
        this.setState({
            isPasswordFocused: !this.state.isPasswordFocused
        })
    }

    validate(text, type) {          
        if(type=='email') {                                    
            Validates.validateEmail(text) 
            ? this.setState({ email: text, isEmailValid: true }) 
            : this.setState({ email: text, isEmailValid: false })               
        } else if (type=='password') {
            Validates.validatePassword(text)
            ? this.setState({ password: text, isPasswordValid: true }) 
            : this.setState({ password: text, isPasswordValid: false }) 
        }
    }

    render() {        
        let { auth } = this.props.state
        let { email, password, isEmailFocused, isEmailValid, isPasswordFocused, isPasswordValid } = this.state
        
        if (auth.isWaiting) {
            return <Loading />
        }

        return (
            <Container style={styles.container}>            
                <Content padder scrollEnabled contentContainerStyle={styles.content}>                    
                        <View style={styles.title}>
                            <Title style={styles.text}>Faça seu login</Title>
                            <Image 
                                style={styles.image}
                                source={require('../assets/icons/key.png')} />
                        </View>                        
                        <Form>
                            <View>
                                <Label style={styles.label}>E-mail ou usuário</Label> 
                                <Item regular style={[styles.input, isEmailFocused ? styles.border : null, !isEmailValid ? styles.error : null]}>
                                    <Input                                                                                                         
                                        returnKeyType='next' 
                                        keyboardType={'email-address'}
                                        autoCapitalize = 'none'
                                        onChangeText={(email) => this.validate(email, 'email')} 
                                        onEndEditing={() => this.validate()}
                                        onFocus={this.handleEmailFocus} 
                                        onBlur={this.handleEmailFocus}                                   
                                        value={email} />   
                                    <Icon                                     
                                        type="FontAwesome" 
                                        name="envelope-o" 
                                        style={styles.icon} />                            
                                </Item>
                            </View> 
                            <View>
                                <Label style={styles.label}>Senha</Label> 
                                <Item regular style={[styles.input, isPasswordFocused ? styles.border : null, !isPasswordValid ? styles.error : null]}>
                                    <Input                                                                                                         
                                        returnKeyType='done' 
                                        secureTextEntry={true}
                                        onChangeText={(password) => this.validate(password, 'password')}                                     
                                        onEndEditing={() => this.validate()}
                                        onFocus={this.handlePasswordFocus}
                                        onBlur={this.handlePasswordFocus}
                                        value={password}/>  
                                    <Icon                                     
                                        name="eye-off"
                                        style={styles.icon} />                
                                </Item>
                            </View>                                                
                        </Form> 
                          
                        <View style={styles.sectionButton}>
                            <Button block style={styles.btn} onPress={this.submit}>
                                <Text uppercase={false} style={styles.titleBtn}>Entrar</Text>
                            </Button>
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
    return bindActionCreators(ReduxActions.AuthActions, dispatch)
}

const styles = StyleSheet.create({
    container: { },
    content: {
        flex: 1,               
        justifyContent: 'center',
        paddingHorizontal: 24
    }, 
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',                 
        marginVertical: 36,
        height: 36                         
    }, 
    text: {
        fontSize: 25, 
        marginRight: 8,
        fontWeight: 'bold'
    }, 
    label: {
        color: '#666666',
        fontSize: 14,
        fontWeight: '400'
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.borderColor,
        borderRadius: 5,
        borderWidth: 2,
        height: 50,
        margin: 10
    },
    border: {               
        borderColor: Colors.accentColor,        
        borderWidth: 3,
        borderRadius: 5,
    }, 
    error: {               
        borderColor: Colors.errorColor,        
        borderWidth: 3,
        borderRadius: 5,        
    },  
    sectionButton: {
        position:'absolute',
        bottom: 40,
        left: 0,
        right: 0
    },
    btn: {                        
        backgroundColor: Colors.accentColor,   
        borderRadius: 5,
        marginHorizontal: 30                
    },
    titleBtn: {
        fontSize: 16, 
        fontWeight: '600',        
    },
    icon: {
        color: Colors.iconLightColor,
        fontSize: 19               
    },
    image: {
        width: 25, 
        height: 25 
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)