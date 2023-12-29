import logReadTag from "./LogReadTag";
import axios from "../../../axios";
import logReadTagTest from "./LogReadTagTest"
import logTemp from "./logTemp";

export default async function readTagTemp() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    logReadTagTest("Bring the tag near the reader.  Step[1/3]");
    logTemp("");
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
          logReadTagTest("Reading tag... Step[2/3]");
          for (const record of event.message.records) {
            axios.get('/nfcs/' + decoder.decode(record.data)).then(function(result){
                logReadTagTest("Success!");
                logTemp(result.data);
            }).catch(err => {
              if (err.name == 'TypeError') {
                logReadTagTest("Oops!");
                logTemp("This tag is no longer in our database.");
              }
              else {
                logReadTagTest("This tag is not defined in our database.");
                logTemp('Message saved on this tag:\n' + decoder.decode(record.data));
              }
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
      else {
        logTemp(error);
      } 
    }
  } else {
    logReadTagTest("Oops!");
    logTemp("WebNFC API isn't supported in this browser.");
  }
}