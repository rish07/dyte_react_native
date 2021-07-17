export enum FeatureId {
  DocumentScanner = 1,
  ImportImage,
  ViewPages,
  ScanBarcodes,
  ScanBatchBarcodes,
  DetectBarcodesOnStillImage,
  DetectBarcodesOnStillImages,
  BarcodeFormatsFilter,
  BarcodeDocumentFormatsFilter,
  ScanMRZ,
  ScanEHIC,
  ScanIdCard,
  ReadPassportNFC,
  LicenseInfo,
  OcrConfigs,
  LearnMore,
  LicensePlateScannerML,
  LicensePlateScannerClassic
}
export class Examples {
  public static list = [
    {
      title: 'DOCUMENT SCANNER',
      data: [
        { id: FeatureId.DocumentScanner, title: 'Scan Document' },
        { id: FeatureId.ImportImage, title: 'Import Image & Detect Document' },
        { id: FeatureId.ViewPages, title: 'View Image Results' },
      ],
    },

  ];
}
