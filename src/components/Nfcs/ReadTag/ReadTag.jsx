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
            axios.get('https://node-nfc-db.onrender.com/api/nfcs/' + decoder.decode(record.data)).then(function(result){
              logReadTag("Product information:\n" + result.data.info.toString() + "\n" + "Index: " + result.data.index.toString() +
              "\n" + "Batch number: " + result.data.batchNumber.toString() + "\n" + "TimeStamp: " + dateTime);
            });
          }
        }
      }).catch(err => {
        console.log("NFC reading stopped...");
      });
      
    } catch(error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // work time expired, just return
      }
      else{
        logReadTag(error);
      }
      
    }
  } else {
    //var res = axios.get('http://localhost:3000/api/nfcs/65366117f625ff6fec626561')
    //var nfc = res.data;
    logReadTag("Web NFC is not supported.");
    //console.log(nfc)
  }
}