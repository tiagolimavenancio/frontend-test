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
                <Icon type="FontAwesome" name='bars' size={18} style={{ marginHorizontal: 16, color: 'black' }} />
            </TouchableOpacity>
        )
    }
}