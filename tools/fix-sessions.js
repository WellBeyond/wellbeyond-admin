const admin = require('firebase-admin');
const async = require('async');// Imports the Google Cloud client library


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://wellbeyond-wash-training.firebaseio.com'
});

const fixSessions = async (subjectId, newSubject) => {
  return admin
    .firestore()
    .collection("sessions")
    .where('subjectId', '==', subjectId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        data.subjectId = newSubject;
        console.log(doc.id, " => ", data);
        /*
        const lessons = {};
        lessons.eIwKyxp4LU6Cn5K8AABC = data.lessons['33alHHsnTsnO8fngYhCc'];  // Module 1
        lessons.o1ng854eP9goTALw9zLr = data.lessons['KbnVR08NAZ0Qd3mpQ4Sd']; // Module 2
        lessons.XTD6kOuV3DcMwtdtFp00 = data.lessons['DVlSkUkjscggzOLcaTXY'];  // Module 3
        lessons.Qyd20Icf4I6Ft7jt4OK6 = data.lessons['cIK8vioJpvEDex99aZ4V']; // Module 4
        lessons.Pki8doaKq6shu1gwcpXl = data.lessons['HCbusXGBY4OP1SiSNfWi'];    // Module 5
        lessons.oFPzC4JgFcLvsnixxhcW = data.lessons['xvUZAi58kL70bswzm9H7'];  // Module 6
        data.lessons = lessons;
        await admin.firestore()
          .collection('sessions')
          .doc(doc.id)
          .set(data, {merge: true})
          .then(() => {
            console.log(doc.id, " => ", data);
          })
          .catch(error => {
            console.log("Error writing document:", error);
          });

         */
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

fixSessions('XbWb4KXQIxx75fy7XdzE', 'gG4XlemuLnj0pRNT0vXi');

setTimeout(function() {
  process.exit(0)
}, 600000);

