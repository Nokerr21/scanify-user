import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";
import { sleep } from "./Sleep";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export function renderQrScanner(){
    const scannerConfig = {
        fps: 15,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: false,
        showTorchButtonIfSupported: true,
        aspectRatio: 1.0
    }
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", scannerConfig);
  
    html5QrcodeScanner.render(onScanSuccess);

    async function onScanSuccess(decodedText) {
        var dateTime = getDateAndTime();
        
        try{
            new URL(decodedText); // is decodedText the URL?
            logQrScanRes("Decoded information:\n" + "<a href=" + "\"" + decodedText + "\"" + ">" + decodedText + "</a>" + "\nScanned at: " + dateTime);
        } catch (err) {
            // if decodedText can not be the URL 
            logQrScanRes("Decoded information:\n" + decodedText + "\nScanned at: " + dateTime);
        }
    
        html5QrcodeScanner.pause();
        await sleep(700);
        html5QrcodeScanner.resume();
    }
}