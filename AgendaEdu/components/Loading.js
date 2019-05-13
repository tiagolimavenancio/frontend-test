import React from 'react'
import {
    StyleSheet
} from 'react-native'
import {
    Container,
    Spinner
} from 'native-base'

export default class Loading extends React.Component {
    render() {
        return(
            <Container style={styles.container}>
                <Spinner color='green' />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})