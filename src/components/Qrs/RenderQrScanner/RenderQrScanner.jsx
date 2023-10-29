import { Html5QrcodeScanner } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";
import { sleep } from "./Sleep";

export function renderQrScanner(){
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", { fps: 5, qrbox: 250 });
  
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