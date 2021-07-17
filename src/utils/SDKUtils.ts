import ScanbotSDK from 'react-native-scanbot-sdk';
import {
  CameraImageFormat,
  FileEncryptionMode,
} from 'react-native-scanbot-sdk/src/enum';

export class SDKUtils {
  /*
   * TODO Add the Scanbot SDK license key here.
   * Please note: The Scanbot SDK will run without a license key for one minute per session!
   * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
   * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
   * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
   * the app identifier "io.rishi.documentscanner" of this example app.
   */
  // prettier-ignore
  static readonly SDK_LICENSE_KEY: string = "Y8kmQ8tY9PtqAX5T5mC0QLJPY++nt9" +
    "YdBR3KlJBW+uLmm30lcDDsXIeRSMfu" +
    "hp23Wo4MBUXWx6u4ji80HHBA7XaaSM" +
    "pDTjrjrRgGnK9rem6OyP6ko/Rbd70X" +
    "yhghYC/MVhZkRAAmZA7vMX7CsqxXL/" +
    "zGlUb4zL24ZlwBDREAlCoE2SBllQxU" +
    "TddsTd23SuNH/A88ZtTvFMQKZvUvUH" +
    "fBEwUt06Qc/+iTfnsp56ukLyJMXglp" +
    "KJkz1RA47vMHFfNUmCkunw94rYx9EP" +
    "QX/LI+SFud7giOIich95uAfl3k2OLG" +
    "kXJuIaXOkMOOHL2n48qXL8A12BQGjF" +
    "136vY3Pnkdjw==\nU2NhbmJvdFNESw" +
    "ppby5yaXNoaS5kb2N1bWVudHNjYW5u" +
    "ZXIKMTYyOTI0NDc5OQo4Mzg4NjA3Cj" +
    "M=\n";

  static readonly IMAGE_FILE_FORMAT: CameraImageFormat = 'JPG';

  static readonly JPG_IMAGE_QUALITY = 80;

  static readonly FILE_ENCRYPTION_ENABLED: boolean = false;

  // prettier-ignore
  static readonly FILE_ENCRYPTION_PASSWORD: string = 'SomeSecretPa$$w0rdForFileEncryption';

  static readonly FILE_ENCRYPTION_MODE: FileEncryptionMode = 'AES256';

  public static async checkLicense(): Promise<boolean> {
    const info = await ScanbotSDK.getLicenseInfo();
    if (info.isLicenseValid) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert('Scanbot SDK trial period or license has expired!', 500);
    return false;
  }
}
