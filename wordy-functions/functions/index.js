const functions = require("firebase-functions");

var serviceAccount = require("C:/opt/firebase/wordy-338816-firebase-adminsdk-94cvp-27bf67a5c2.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// To add something to firestore
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   console.log(req.query.word);
//   const word = req.query.word;
//   const result = await admin
//     .firestore()
//     .collection("words")
//     .add({ word: word });

//   res.json({ result: `Message with ID: ${result.id} added.` });
// });

exports.compareWord = functions.https.onRequest(async (req, res) => {
  const wordOfTheDay = "bread";
  const userAttempt = req.query.userAttempt;
  res.set("Access-Control-Allow-Origin", "*");

  if (userAttempt.length !== wordOfTheDay.length) {
    res.json({ error: "Word has incorrect length" });
    return;
  }
  const resultArray = Array.from(wordOfTheDay).map(
    (letter, letterIndex) => userAttempt.charAt(letterIndex) === letter
  );

  res.json({ resultArray: resultArray });
});
