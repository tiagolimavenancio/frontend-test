import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Icon } from 'native-base'

export default class MenuButton extends React.Component {

    constructor(props) {
        super(props)
        this.drawerOpen = this.drawerOpen.bind(this)
    }

    drawerOpen() {
        Actions.drawerOpen()
    }

    render() {
        return (
            <TouchableOpacity onPress={this.drawerOpen}>
                <Icon name='menu' style={{ marginHorizontal: 18, color: 'black' }} />
            </TouchableOpacity>
        )
    }
}