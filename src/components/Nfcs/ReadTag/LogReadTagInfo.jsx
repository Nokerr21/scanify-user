export default function logReadTagInfo(props) {
    var logElement = document.getElementById('logReadTagTest');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}