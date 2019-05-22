import React from 'react'
import {  
    View,
    RefreshControl,    
    Image,
    StyleSheet,
    ListView,    
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,    
    Body,
    Text,    
    Icon,    
    ListItem,
    Footer    
} from 'native-base'
import * as _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Moment from 'moment'
import 'moment/locale/pt-br'
import ReduxActions from '../redux/actions'
import Colors from '../constants/Colors'
import Theme from '../constants/Theme' 

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
})

function updateDataSource(rows) {
    return ds.cloneWithRowsAndSections(rows)
}

class HomeScreen extends React.Component {
    
    constructor(props){        
        super(props);     
        this.state = {
            canLoadMoreContent: false
        }   
        Moment.locale('pt-br')   
        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)   
        this.onRefresh = this.onRefresh.bind(this)
        this.onLoad = this.onLoad.bind(this)              
    }

    componentDidMount() {
        this.onRefresh()        
    }

    onRefresh() {  
        const { events } = this.props.state    
        if(!events.isWaiting) {      
            this.props.getEvents(this.onSuccess, this.onError) 
        }                        
    }

    onLoad = async () => {        
        const { events } = this.props.state
        if (!this.state.canLoadMoreContent) return
    
        await this.props.loadMoreEvents(events.metadata.page, this.onSuccess, this.onError)                            
    }

    onSuccess() {
        this.setState({ canLoadMoreContent: true })
        console.log("On Success")
    }
    
    onError(error) {  
        this.setState({ canLoadMoreContent: false })      
        Alert.alert('Oops!', error.message)
    }

    renderSectionHeader(sectionData, sectionID) {                     
        return (
            <ListItem noBorder style={{ marginLeft: 0, paddingLeft: 0 }}>
                <Text style={ styles.sectionDate }>
                    { Moment(sectionID).format('dddd, DD [de] MMMM') }
                </Text>
            </ListItem>
        )
    }

    renderRow(rowData, sectionID, rowID) {        
        return (
            <Card key={rowData.id} style={styles.card}>                
                 <CardItem style={styles.cardItem} button onPress={() => Actions.detail({title: rowData.title, event: rowData})}>                    
                    <Body style={styles.body}>
                        { 
                            rowData.image 
                            ? ( <View><Image source={{uri: rowData.image}} style={ styles.image } /></View> )
                            : null 
                        }                        
                        <View style={styles.content}>
                            <Text style={styles.text}>EVENTOS</Text>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={styles.name} numberOfLines={1}>{rowData.title || ''}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="time" style={styles.icon} />
                                    <Text style={styles.time}>{ Moment(rowData.startAt).format('LT') }</Text>
                                </View>
                            </View>
                            <Text style={styles.text} numberOfLines={1}>{ Moment(rowData.startAt).format("dddd, DD [de] MMMM [às] HH:mm") }</Text>
                        </View>
                    </Body>
                </CardItem>               
            </Card>
        )
    }

    renderFooter = () => {  
        const { events } = this.props.state
        if (!events.isLoading) return

        return (
            <Footer style={styles.footer}>
                <ActivityIndicator animating size="large" />
            </Footer>
        )
    }

    render() {    
        let { events } = this.props.state           
        let dataSource = updateDataSource(events.data)
        return(
            <Container>
                <Content contentContainerStyle={{ padding: 10 }}
                    refreshControl={ <RefreshControl refreshing={events.isWaiting} onRefresh={this.onRefresh} /> } >
                    <ListView
                        dataSource={dataSource}                        
                        pageSize={10}
                        renderRow={this.renderRow}
                        renderSectionHeader={this.renderSectionHeader} 
                        renderFooter={this.renderFooter} 
                        keyExtractor={(item, index) => item.key}
                        onEndReached={_.debounce(this.onLoad, 2000)}
                        onEndReachedThreshold={1} />
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
    return bindActionCreators(ReduxActions.EventsActions, dispatch)
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
    },
    footer: {
        backgroundColor: Colors.primaryColor 
    }    
  })

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);