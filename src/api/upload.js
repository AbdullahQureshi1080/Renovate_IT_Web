import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default async function uploadAsPromise(file, type,uploadType,userId) {
    return new Promise(async function (resolve, reject) {
      var childRoute = null;
      if (type == "image") {
        childRoute = "images";
      } else {
        childRoute = "documents";
      }
 
      const childPath = `${uploadType}/${userId}/${childRoute}/${Math.random().toString(36)}`;
 
      const task = firebase.storage().ref().child(childPath).put(file);
 
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };
      const taskCompleted = () => {
        const downloadURL = task.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      };
      const taskError = (snapshot,err) => {
        console.log("An Error Occured", snapshot);
        reject(err);
      };
 
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    });
  }