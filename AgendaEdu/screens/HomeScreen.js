import React from 'react'
import {  
    View,
    RefreshControl,    
    Image,
    StyleSheet,
    ListView    
} from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,    
    Body,
    Text,    
    Icon,    
    ListItem    
} from 'native-base'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import 'moment/locale/pt-br'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReduxActions from '../redux/actions'

import Colors from '../constants/Colors'
import events from '../sample.json'

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

    onRefresh() {        
        this.setState({ isRefreshing: true })
        setTimeout(() => {this.setState({ isRefreshing: false })}, 3000)
    }

    onLoad() {

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

    renderSectionHeader(sectionData) {               
        return (
            <ListItem noBorder style={{ marginLeft: 0, paddingLeft: 0 }}>
                <Text style={ styles.sectionDate }>
                    { Moment(sectionData.startAt).format('dddd, DD [de] MMMM') }
                </Text>
            </ListItem>
   
        )
    }

    renderCards(row) {                          
        return (            
            <Card key={row.id} style={styles.card}>                
                <CardItem style={styles.cardItem} button onPress={() => Actions.detail({ title: row.title, event: row })}>                    
                    <Body style={styles.body}>
                        { 
                            row.image 
                            ? ( <View><Image source={{ uri: row.image }} style={ styles.image } /></View> )
                            : null 
                        }                        
                        <View style={styles.content}>
                            <Text style={styles.text}>EVENTOS</Text>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={styles.name} numberOfLines={1}>{row.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="time" style={styles.icon} />
                                    <Text style={styles.time}>{ Moment(row.startAt).format('LT') }</Text>
                                </View>
                            </View>
                            <Text style={styles.text} numberOfLines={1}>{ Moment(row.startAt).format("dddd, DD [de] MMMM [às] HH:mm") }</Text>
                        </View>
                    </Body>
                </CardItem>                
            </Card>            
        )
    }

    render() {      
        return(
            <Container>
                <Content contentContainerStyle={{ padding: 10 }} 
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

function mapStateToProps(state) {
    return {
        state: {
            events: state.events
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(ReduxActions.EventsActions, dispatch)
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
    },
    content: {
        flex: 1, 
        margin: 8, 
        alignItems: 'stretch'
    },
    sectionDate: {
        fontSize: 14, 
        fontWeight: '400',
        color: Colors.labelColor
    },
    text: {
        fontSize: 12, 
        fontWeight: '400', 
        color: Colors.subtitleColor
    },
    name: {
        fontSize: 16, 
        fontWeight: '500'
    },
    icon: {
        fontSize: 16, 
        marginRight: 5, 
        color: Colors.iconDarkColor, 
        alignSelf: 'center'
    },
    time: {
        fontSize: 14, 
        fontWeight: '400', 
        color: Colors.labelColor
    }    
  })

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);