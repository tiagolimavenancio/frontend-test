import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    NetInfo
} from 'react-native'

const { width } = Dimensions.get('window')

class Notice extends React.PureComponent {
    
    state = {
        isConnected: true
    }

    constructor(props) {
        super(props)        
    }

    componentDidMount() {        
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
    }

    componentWillUnmount() {        
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange)
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {            
            this.setState({ isConnected })
        } else {            
            this.setState({ isConnected })
        }
    }

    render() {
        if(!this.state.isConnected) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sem conexão com a Internet</Text>
                </View>
            )
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#b52424',
        top: 35,
        width,
        height: 40
    },
    text: {
        color: '#fff'
    }
})

export default Notice