import { getDateAndTime } from "../../Date/GetDateAndTime";

export default function logReadTag(props) {
    var logElement = document.getElementById('logReadTag');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';

    if(props instanceof String) {
        logElement.innerHTML += props + '\n';
    }
    else {
        var dateTime = getDateAndTime();
        if(props.batchNumber != undefined){
            if(props.index != undefined) {
                logElement.innerHTML += "Product information:\n" + props.info.toString() + "\nIndex: " + props.index.toString() +
                "\nBatch number: " + props.batchNumber.toString() + "\nTagged at: " + props.timeStamp.toString() +
                "\nRead at: " + dateTime + '\n';


            //logReadTag("Product information:\n" + props.info.toString() + "\nIndex: " + props.index.toString() +
            //"\nBatch number: " + props.batchNumber.toString() + "\nTagged at: " + props.timeStamp.toString() +
            //"\nRead at: " + dateTime);
            }
            else {
                logElement.innerHTML += "Product information:\n" + props.info.toString() + "\nBatch number: " +
                props.batchNumber.toString() + "\nTagged at: " + props.timeStamp.toString() + "\nRead at: " + dateTime + '\n';
            //logReadTag();
            }
        }
        else{
            if(props.index != undefined) {
                logElement.innerHTML += "Product information:\n" + props.info.toString() + "\nIndex: " + props.index.toString() +
                "\nTagged at: " + props.timeStamp.toString() + "\nRead at: " + dateTime + '\n';
            //logReadTag();
            }
            else {
                logElement.innerHTML += "Product information:\n" + props.info.toString() + "\nTagged at: " +
                props.timeStamp.toString() + "\nRead at: " + dateTime + '\n';
            //logReadTag();
            }
      }
    }

    





    
}