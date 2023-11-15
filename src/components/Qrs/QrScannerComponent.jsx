import "./QrScannerComponent.css"

export function QrScannerComponent() {
    return (
        <div className="row-scanner">
            <label className="labl">READ QR CODE</label>
            <div className="reader" id="readerQR"></div>
            <pre className="log" id="logQrScanRes"></pre>
        </div>
    );
}