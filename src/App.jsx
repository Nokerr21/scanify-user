import "./styles.css"
import { useEffect } from "react"
import { renderQrScanner } from "./components/Qrs/RenderQrScanner/RenderQrScanner"
import NavComponent from "./components/Nav/NavComponent";
import { ReadTagComponent } from "./components/Nfcs/ReadTagComponent";
import { QrScannerComponent } from "./components/Qrs/QrScannerComponent";

export default function App(){


  
 

  useEffect(() => {
    renderQrScanner();
  }, [])

    function handleSubmit(e) {
        e.preventDefault()
    }


      
      
 

    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
        <NavComponent />
        <ReadTagComponent />
            <div className="form-row">
            <QrScannerComponent />
            </div>
        </form>
        </>
    )

      
      
    
    
}