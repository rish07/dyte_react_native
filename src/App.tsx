import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { DocumentDirectoryPath, ExternalDirectoryPath } from 'react-native-fs';

import { HomeScreen } from './pages/HomeScreen';
import { ImageResultScreen } from './pages/ImageResultScreen';
import { ImageDetailScreen } from './pages/ImageDetailScreen';
import { Navigation } from './utils/Navigation';
import { Styles } from './model/Styles';
import ScanbotSDK, { InitializationOptions } from 'react-native-scanbot-sdk';
import { SDKUtils } from './utils/SDKUtils';
import { ViewUtils } from "./utils/ViewUtils";

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.initScanbotSdk();
  }

  async initScanbotSdk() {
    const options: InitializationOptions = {
      licenseKey: SDKUtils.SDK_LICENSE_KEY,
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      storageImageFormat: SDKUtils.IMAGE_FILE_FORMAT,
      storageImageQuality: SDKUtils.JPG_IMAGE_QUALITY,
      storageBaseDirectory: this.getCustomStoragePath(), // Optional custom storage path. See comments below!
      documentDetectorMode: 'ML_BASED',
    };
    if (SDKUtils.FILE_ENCRYPTION_ENABLED && SDKUtils.FILE_ENCRYPTION_PASSWORD) {
      options.fileEncryptionPassword = SDKUtils.FILE_ENCRYPTION_PASSWORD;
      options.fileEncryptionMode = SDKUtils.FILE_ENCRYPTION_MODE;
    }
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log(result);
    } catch (e) {
      console.error('Error initializing Scanbot SDK:', e);
      ViewUtils.showAlert(
        'Error initializing Scanbot SDK:\n' + JSON.stringify(e),
      );
    }
  }

  getCustomStoragePath(): string {

    if (Platform.OS === 'ios') {
      return DocumentDirectoryPath + '/my-custom-storage';
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath + '/my-custom-storage';
    }
    return '';
  }

  render() {
    return (
      <NavigationContainer theme={Styles.ScanbotTheme}>
        <Stack.Navigator initialRouteName={Navigation.HOME}>
          <Stack.Screen name={Navigation.HOME} component={HomeScreen} />
          <Stack.Screen
            name={Navigation.IMAGE_RESULTS}
            component={ImageResultScreen}
          />


          <Stack.Screen
            name={Navigation.IMAGE_DETAILS}
            component={ImageDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
