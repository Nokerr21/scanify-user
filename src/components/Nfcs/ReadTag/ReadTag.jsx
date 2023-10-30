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
            logReadTag("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
          }
        }
      });
    } catch(error) {
      logReadTag(error);
    }
  } else {
    logReadTag("Web NFC is not supported.");
    var res = axios.get('http://localhost:3000/api/nfcs/65366117f625ff6fec626561')
    var nfc = (await res).data;
    console.log(nfc);
  }
}