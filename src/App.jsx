import "./styles.css"
import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"


export default function WebApp(){
  const [message, setMessage] = useState("")
  const [scanResult, setScanResult] = useState("")
  const [scanTime, setScanTime] = useState("")

  
 

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader1", { fps: 5, qrbox: 250 });

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
          
    function onScanSuccess(decodedText, decodedResult) {
        // Handle on success condition with the decoded text or result.
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanResult(decodedText);
        setScanTime(dateTime)
        consoleLogQR("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
        // ...
        html5QrcodeScanner.clear();
        // ^ this will stop the scanner (video feed) and clear the scan area.
    }

    function onScanError(err){
      console.warn(err)
    }
  }, [scanTime])

   // async function stopRead(e){
   //   abortController.signal.onabort = e => {};
   //   document.getElementById('btnStop').onclick = e => {
    //  abortController.abort();
    //  };
    //}

    function handleSubmit(e) {
        e.preventDefault()
    }


    async function readTag() {
      if ("NDEFReader" in window) {
        const ndef = new NDEFReader();
        try {
          return new Promise((resolve, reject) => {
            const ctlr = new AbortController();
            ctlr.signal.onabort = reject;
            ndef.addEventListener("reading", event => {
              ctlr.abort();
              resolve(event);
            }, { once: true });
            ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
            ndef.onreading = event => {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                //consoleLog("Record type:  " + record.recordType);
                //consoleLog("MIME type:    " + record.mediaType);
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
                var dateTime = date+' '+time;
                consoleLog("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
              }
            }
          });
        } catch(error) {
          consoleLog(error);
        }
      } else {
        consoleLog("Web NFC is not supported.");
      }
    }
      
      
      
      function consoleLog(data) {
        var logElement = document.getElementById('log');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }


      function consoleLogQR(data) {
        var logElement = document.getElementById('logQR');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <nav className="nav">
              <label className="site-title">
                NFCONTROL
              </label>
              <ul>
                <a href="https://nokerr21.github.io/nfcontrol/">About</a>
              </ul>
            </nav>
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre id="log"></pre>
            </div>
            <div className="form-row">
              <label>READ QR CODE</label>
              <div id="reader1"></div>
              <pre id="logQR"></pre>
            </div>
        </form>
        </>
    )

      
      
    
    
}