import "./QrScannerComponent.css"

export function QrScannerComponent() {
    return (
        <div className="row-scanner">
            <label className="labl">READ QR CODE</label>
            <div id="readerQR"></div>
            <pre className="log-scanner" id="logQrScanRes"></pre>
        </div>
    );
}