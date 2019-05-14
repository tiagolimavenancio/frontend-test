import React from 'react'
import {  
    View,
    RefreshControl,    
    Image,
    StyleSheet
} from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,    
    Body,
    Left,
    Title,
    Text,    
    Icon,
    List    
} from 'native-base'

import Colors from '../constants/Colors'
import Validates from '../utils/Validates'

const events = {
    "data": [
        {
            "id": 1,
            "title": "Event 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-07T00:34:35.327Z",
            "image": "https://s3-us-west-2.amazonaws.com/agendaedu-dev/schools/c5c1a933-cdef-4c9b-8a87-490f25c2538d/events/5380/attachments/1550866911-$1-original-poster-agendakids.jpeg",
            "startAt": "2019-07-22T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        },
        {
            "id": 2,
            "title": "Event 2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-087T00:34:35.327Z",
            "image": "",
            "startAt": "2019-07-23T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        },
        {
            "id": 3,
            "title": "Event 3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-097T00:34:35.327Z",
            "image": "https://s3-us-west-2.amazonaws.com/agendaedu-dev/schools/c5c1a933-cdef-4c9b-8a87-490f25c2538d/events/5380/attachments/1550866911-$1-original-poster-agendakids.jpeg",
            "startAt": "2019-07-25T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        }
    ],
    "metadata": {
        "page": 1,
        "limit": 2,
        "pre_page": null,
        "next_page": 2,
        "total": 100,
        "total_pages": 50
    }
}

class HomeScreen extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isRefreshing: false
        }
        this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount() {
        this.onRefresh()
    }

    onRefresh() {        
        this.setState({ isRefreshing: true })
        setTimeout(() => {this.setState({ isRefreshing: false })}, 3000)
    }

    renderCards(row) {
        return(
            <Card style={styles.card}>                
                <CardItem style={styles.cardItem}>                    
                    <Body style={styles.body}>
                        { 
                            row.image 
                            ? ( <View><Image source={{ uri: row.image }} style={ styles.image } /></View> )
                            : null 
                        }                        
                        <View style={{ flex: 1, margin: 8, alignItems: 'stretch' }}>
                            <Text style={{ fontSize: 12, color: Colors.subtitleColor }}>EVENTOS</Text>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16 }} numberOfLines={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue dapibus lectus quis hendrerit. In luctus aliquam nibh, eu pellentesque erat lacinia sit amet.</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="time" style={{ fontSize: 16, marginRight: 5, color: Colors.iconDarkColor, alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 14, color: Colors.labelColor }}>16:00</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 12, color: Colors.subtitleColor }} numberOfLines={1}>Quarta, 25 de Janeiro às 20:00h</Text>
                        </View>
                    </Body>
                </CardItem>                
            </Card>
        )
    }

    render() {
        return(
            <Container>
                <Content 
                    contentContainerStyle={{ padding: 10 }} 
                    refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} /> } >
                    <List dataArray={events.data} renderRow={ this.renderCards } />
                </Content>
            </Container>
        )
    }
} 

const styles = StyleSheet.create({
    card: {
        flex: 1,         
        height: 144,
        borderRadius: 5,
        backgroundColor: Colors.accentColor            
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        marginLeft: 5,  
        alignItems: 'center'              
    }, 
    body: {
        flex: 1, 
        flexDirection: 'row', 
        margin: 8, 
        justifyContent: 'center', 
        alignItems: 'center'
    },  
    image: {
        flex: 1,        
        borderRadius: 5,  
        margin: 8,      
        width: 82,         
        height: 66,
        resizeMode: 'cover'
    }
  })

export default HomeScreen;