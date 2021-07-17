import React from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScanbotSDK, {
  DocumentScannerConfiguration,

} from 'react-native-scanbot-sdk';

import { Examples, FeatureId } from '../model/Examples';
import { Styles } from '../model/Styles';
import { ImageUtils } from '../utils/ImageUtils';
import { SDKUtils } from '../utils/SDKUtils';
import { Pages } from '../model/Pages';
import { ViewUtils } from '../utils/ViewUtils';
import { Navigation } from '../utils/Navigation';
import { BaseScreen } from '../utils/BaseScreen';
import { Colors } from '../model/Colors';
import { PageStorage } from '../utils/PageStorage';

export class HomeScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    try {
      const loaded = await PageStorage.INSTANCE.load();
      console.log(`Loaded ${loaded.length} pages from storage`);
      if (loaded.length === 0) {
        return;
      }
      const refreshed = await ScanbotSDK.refreshImageUris({ pages: loaded });
      await Pages.addList(refreshed.pages);
    } catch (e) {
      console.error('Error loading/refreshing pages: ' + JSON.stringify(e));
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
          <ActivityIndicator
            size="large"
            color={Styles.BASE_COLOR}
            style={Styles.INSTANCE.common.progress}
            animating={this.progressVisible}
          />
          <SectionList
            style={Styles.INSTANCE.home.list}
            sections={Examples.list}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item }) => (
              <View style={Styles.INSTANCE.home.sectionItemContainer}>
                <TouchableOpacity onPress={() => this.onListItemClick(item)}>
                  <Text
                    style={
                      Styles.INSTANCE.home.sectionItem
                    }>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={Styles.INSTANCE.home.sectionHeader}>{title}</Text>
            )}
          />
        </SafeAreaView>

      </>
    );
  }

  async onListItemClick(item: any) {
    if (item.id === FeatureId.LearnMore) {
      await Linking.openURL('https://scanbot.io');
      return;
    }

    if (item.id === FeatureId.LicenseInfo) {
      const info = await ScanbotSDK.getLicenseInfo();
      ViewUtils.showAlert(JSON.stringify(info));
      return;
    }

    if (!(await SDKUtils.checkLicense())) {
      return;
    }

    switch (item.id) {
      case FeatureId.DocumentScanner:
        this.startDocumentScanner();
        break;
      case FeatureId.ImportImage:
        this.importImageAndDetectDocument();
        break;
      case FeatureId.ViewPages:
        this.viewImageResults();
        break;



    }
  }

  async startDocumentScanner() {
    const config: DocumentScannerConfiguration = {
      // Customize colors, text resources, etc..
      polygonColor: '#00ffff',
      bottomBarBackgroundColor: Colors.BASE_COLOR,
      topBarBackgroundColor: Colors.BASE_COLOR,
      cameraBackgroundColor: Colors.BASE_COLOR,
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
      // documentImageSizeLimit: { width: 2000, height: 3000 },
      // maxNumberOfPages: 3,

    };

    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    if (result.status === 'OK') {
      await Pages.addList(result.pages);
      this.pushPage(Navigation.IMAGE_RESULTS);
    }
  }

  async importImageAndDetectDocument() {
    const result = await ImageUtils.pickFromGallery();
    this.showProgress();

    if (result.didCancel) {
      this.hideProgress();
      return;
    }

    if (!result.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    let page = await ScanbotSDK.createPage(result.uri);
    page = await ScanbotSDK.detectDocumentOnPage(page);
    await Pages.add(page);
    this.hideProgress();

    // TODO move estimateBlur() example to another location
    //const blur = await ScanbotSDK.estimateBlur({ imageFileUri: page.documentImageFileUri! });
    //console.log("Blur:", blur);

    this.pushPage(Navigation.IMAGE_RESULTS);
  }

  viewImageResults() {
    this.pushPage('Image Results');
  }


}
