import React from 'react';
import {
    StyleSheet,
    View,    
    ImageBackground
} from 'react-native';
import {
    Container,
    Title,
    Content,
    Text, 
    Icon,
    Body         
} from 'native-base';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Moment from 'moment';

class DetailScreen extends React.Component {    
    render() {
        const { event } = this.props
        return(
            <Container>
                <ImageBackground 
                    resizeMode={'cover'}
                    style={styles.image} 
                    source={{ uri: event.image.length  ? event.image : 'https://www.megasistema.com.br/public/assets/front-end/img/placeholder-image-sq.png'}} />
                <Content contentContainerStyle={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.section}>
                            <View style={styles.date}>                                
                                <View style={styles.overlay} />
                                <Text style={styles.day}>
                                    { Moment(event.startAt).format('DD')}
                                </Text>
                                <Text style={styles.month}>
                                    { Moment(event.startAt).format('MMM').toUpperCase() }
                                </Text>
                            </View>                            
                            <View style={styles.info}>                                
                                <Text style={styles.title} numberOfLines={2}>{event.title}</Text> 
                                <View style={{flexDirection:'row'}}>
                                    <Icon name="time" style={styles.icon} />
                                    <Text style={styles.time}>{ Moment(event.startAt).format('LT') }</Text>
                                </View>
                            </View> 
                        </View>                                                                         
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: Colors.labelColor, fontSize: 16, fontWeight: '400' }}>{ event.description }</Text> 
                    </View>                                            
                </Content>
            </Container>
        )
    }
} 

const styles = StyleSheet.create({
    image: {        
        position: 'absolute',
        top: 0,
        left: 0,
        height: 263,
        width: Theme.deviceWidth,
        zIndex: 0       
    },
    content: {        
        flex: 1,        
        marginTop: 160,                
        zIndex: 2,
        padding: 20,                  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        backgroundColor: 'white',
        height: Theme.deviceHeight,        
    },
    body: {
        flex: .5,         
        justifyContent: 'center', 
        alignItems: 'center'
    },
    section: {
        flex: 1, 
        margin: 22,        
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems:'center'               
    },
    date: {
        flex: .3,        
        width: 60, 
        height: 60,
        marginHorizontal: 10,        
        justifyContent: 'flex-start', 
        alignItems:'center',                
        borderRadius: 5                         
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
        backgroundColor: Colors.accentColor,
        opacity: 0.1,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 0,        
    },
    day: {
        color: Colors.accentColor, 
        fontSize: 22, 
        fontWeight: 'bold'
    },
    month: {
        color: Colors.accentColor, 
        fontSize: 14, 
        fontWeight: '400'        
    },
    info: {
        flex: .8
    },
    title: {        
        fontSize: 16, 
        fontWeight: 'bold',        
    },
    icon: {
        fontSize: 22, 
        marginRight: 5, 
        color: Colors.iconDarkColor, 
        alignSelf: 'center'
    },
    time: {
        fontSize: 16, 
        fontWeight: '400', 
        color: Colors.labelColor 
    }
})

export default DetailScreen;