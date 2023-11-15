import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";
import { sleep } from "./Sleep";

export function renderQrScanner(){
    const scannerConfig = {
        fps: 10,
        qrbox: {width: 300, height: 300},
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: false,
        showTorchButtonIfSupported: true, 
    }
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", scannerConfig);
  
    html5QrcodeScanner.render(onScanSuccess);

    async function onScanSuccess(decodedText, decodedResult) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        var dateTime = date + ' ' + time;
        console.log(`Scan result: ${decodedText}`, decodedResult);
        logQrScanRes("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
        html5QrcodeScanner.pause();
        await sleep(700);
        html5QrcodeScanner.resume();
    }
}