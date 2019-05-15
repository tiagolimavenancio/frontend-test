import React from 'react'
import {  
    View,
    RefreshControl,    
    Image,
    StyleSheet,
    ListView,
    FlatList,
    SectionList
} from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,    
    Body,
    Text,    
    Icon,
    List,    
    ListItem,
    Separator
} from 'native-base'
import Colors from '../constants/Colors';
import Moment from 'moment';
import 'moment/locale/pt-br';

const events = {
    "data": [
        {
            "id": 1,
            "title": "Evento 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-07T00:34:35.327Z",
            "image": "https://s3-us-west-2.amazonaws.com/agendaedu-dev/schools/c5c1a933-cdef-4c9b-8a87-490f25c2538d/events/5380/attachments/1550866911-$1-original-poster-agendakids.jpeg",
            "startAt": "2019-07-22T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        },
        {
            "id": 2,
            "title": "Evento 2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-08T00:34:35.327Z",
            "image": "",
            "startAt": "2019-07-23T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        }, 
        {
            "id": 3,
            "title": "Evento 3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-03-09T00:34:35.327Z",
            "image": "https://s3-us-west-2.amazonaws.com/agendaedu-dev/schools/c5c1a933-cdef-4c9b-8a87-490f25c2538d/events/5380/attachments/1550866911-$1-original-poster-agendakids.jpeg",
            "startAt": "2019-07-25T19:01:33.476Z",
            "location": "Fake Street, 1001 - Fortaleza CE"
        },
        {
            "id": 4,
            "title": "Evento 4",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium nulla non arcu aliquam rhoncus eu sed leo. Aenean cursus nibh sit amet fringilla sodales. Vestibulum faucibus venenatis tempor. Morbi placerat ac massa id ultricies.",
            "sendAt": "2019-06-15T00:34:35.327Z",
            "image": "",
            "startAt": "2019-09-10T19:01:33.476Z",
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
        super(props);
        const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];
        const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                getSectionData,
                getRowData,
        });        
        const { dataBlob, sectionIds, rowIds } = this.renderData(); 
        this.state = {
            isRefreshing: false,
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)         
        }
        Moment.locale('pt-BR');  
        this.onRefresh = this.onRefresh.bind(this)
        this.onLoad = this.onLoad.bind(this)
    }

    componentDidMount() {
        this.onRefresh()        
    }

    renderData() {
        const data = events.data;
        const sectionIds = [];
        const dataBlob = {};        
        const rowIds = [];

        for(let i = 0; i < data.length; i++) {
            const currentStartAt = data[i].startAt            
            const objs = data.filter((obj) => obj.startAt.indexOf(currentStartAt) === 0)
            if(objs.length > 0) {
                sectionIds.push(i)
                dataBlob[i] = { startAt: currentStartAt }                
                rowIds.push([])
                for(let j = 0; j < objs.length; j++) {
                    const rowId = `${i}:${j}`
                    rowIds[rowIds.length - 1].push(rowId)
                    dataBlob[rowId] = objs[j]
                }
            }
        }
         
        return { dataBlob, sectionIds, rowIds }
    }

    onRefresh() {        
        this.setState({ isRefreshing: true })
        setTimeout(() => {this.setState({ isRefreshing: false })}, 3000)
    }

    onLoad() {

    }

    renderSectionHeader(sectionData) {               
        return (
            <ListItem noBorder style={{ marginLeft: 0, paddingLeft: 0 }}>
                <Text style={{ fontSize: 14, color: Colors.labelColor }}>
                    { Moment(sectionData.startAt).format('dddd, DD [de] MMMM') }
                </Text>
            </ListItem>
   
        )
    }

    renderCards(row) {                          
        return (
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
                                        <Text style={{ fontSize: 14, color: Colors.labelColor }}>{ Moment(row.sendAt).format('LT') }</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 12, color: Colors.subtitleColor }} numberOfLines={1}>{ Moment(row.startAt).format("dddd, DD [de] MMMM [às] HH:mm") }</Text>
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
                    <ListView
                        dataSource={this.state.dataSource} 
                        renderRow={this.renderCards} 
                        renderSectionHeader={this.renderSectionHeader} />
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