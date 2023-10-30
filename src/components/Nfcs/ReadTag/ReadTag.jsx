import logReadTag from "./LogReadTag";
import axios from "axios";


export default async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      return new Promise((resolve, reject) => {
        const abortContr = new AbortController();
        abortContr.signal.onabort = reject;
        ndef.addEventListener("reading", event => {
          abortContr.abort();
          resolve(event);
        }, { once: true });
        ndef.scan({ signal: abortContr.signal }).catch(err => reject(err));
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            var dateTime = date + ' ' + time;
            console.log("1");
            //var res = axios.get('http://192.168.1.69:3000/api/nfcs/' + decoder.decode(record.data))
            //var nfc = res.data;
            const temp = decoder.decode(record.data)
            logReadTag("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
          }
        }
      }).catch(err => {
        console.log("NFC reading stopped...");
      });
      var res = axios.get('http://192.168.1.69:3000/api/nfcs/' + temp)
      var nfc = res.data;
    } catch(error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // work time expired, just return
      }
      else{
        logReadTag(error);
      }
      
    }
  } else {
    logReadTag("Web NFC is not supported.");
  }
}