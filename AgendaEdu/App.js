import React from 'react';
import { AppLoading, Font } from 'expo';
import { Container, StyleProvider, getTheme } from 'native-base';

import Theme from './constants/Theme';
import Notice from './components/Notice';
import Navigator from './navigation/Navigator';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async cacheResourcesAsync() {
    await Font.loadAsync({
      'sf-pro-display-semibold': require('./assets/fonts/SF-Pro-Text-Semibold.ttf'),      
      'sf-pro-display-regular': require('./assets/fonts/SF-Pro-Text-Regular.ttf'),
      'sf-pro-display-bold': require('./assets/fonts/SF-Pro-Display-Bold.ttf'),
      'sf-pro-display-ultralight': require('./assets/fonts/SF-Pro-Display-Ultralight.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
  }

  render() {
    if(!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn} />
      )
    }
    return (
      <StyleProvider style={getTheme(Theme)}>
        <Container>
          <Navigator />
          <Notice />
        </Container>
      </StyleProvider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
