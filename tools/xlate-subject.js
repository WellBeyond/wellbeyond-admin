const admin = require('firebase-admin');
const async = require('async');// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://wellbeyond-wash-training.firebaseio.com'
});

async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  return translate.translate(text, target).then(translations => {
    if (Array.isArray(translations) && translations.length) {
      return translations[0];
    }
  });
}

const xlateLesson = async (lessonId, target) => {
  return admin
    .firestore()
    .collection("lessons")
    .doc(lessonId)
    .get()
    .then(async doc => {
      if (!doc.exists) {
        return
      }
      const original = doc.data();
      let copy = {...original};
      copy.locale = target;
      copy.originalId = doc.id;
      copy.isPublished = false;
      copy.name = await translateText(copy.name || '', target);
      copy.description = await translateText(copy.description || '', target);
      
      // Translate the title and text of pages
      let pageTitles = await translateText(original.pages ? original.pages.map((p) => p.title || '') : [], target);
      let pageTexts = await translateText(original.pages ? original.pages.map((p) => p.text || '') : [], target);
      let photoCaptions = await translateText(original.pages ? original.pages.map((p) => p.photoCaption || '') : [], target);
      let videoCaptions = await translateText(original.pages ? original.pages.map((p) => p.videoCaption || '') : [], target);
      let attestations = await translateText(original.pages ? original.pages.map((p) => p.attestation || '') : [], target);
      copy.pages = [];
      if (original.pages) {
        original.pages.forEach((page, i) => {
          copy.pages.push(Object.assign(page, {title: pageTitles[i], text: pageTexts[i], photoCaption: photoCaptions[i], videoCaption: videoCaptions[i], attestation: attestations[i]}));
        });
      }
      
      // Translate the questions
      let questionTexts = await translateText(original.questions ? original.questions.map((q) => q.questionText || '') : [], target);
      let correctAnswers = await translateText(original.questions ? original.questions.map((q) => q.correctAnswer || '') : [], target);
      let explanations = await translateText(original.questions ? original.questions.map((q) => q.explanation || '') : [], target);
      if (original.questions && original.questions.length) {
        copy.questions = new Array(original.questions.length);
        await Promise.all(original.questions.map(async (question,i) => {
          return new Promise(async resolve => {
            let translated = Object.assign(question, {questionText: questionTexts[i], explanation: explanations[i]});
            if (question.questionType === 'choose-one') {
              translated.correctAnswer = correctAnswers[i];
            }
            if (question.choices) {
              let choices = await translateText(question.choices ? question.choices.map((c) => c.value || '') : [], target);
              translated.choices = choices.map((choice) => {
                return {value: choice}
              });
            }
            copy.questions[i] = translated;
            resolve();
          });
        }));
      }
      else {
        copy.questions = [];
      }
      copy.createdate = new Date();
      copy.lastupdate = new Date();
      let ref = await admin
        .firestore()
        .collection("lessons")
        .add(copy);
      return ref;
    });
}


const xlateSubject = async (subjectId, target) => {
  return admin
    .firestore()
    .collection("subjects")
    .doc(subjectId)
    .get()
    .then(async doc => {
      if (!doc.exists) {
        return;
      }
      const original = doc.data();
      let copy = {...original};
      copy.locale = target;
      copy.originalId = doc.id;
      copy.isPublished = false;
      copy.name = await translateText(original.name || '', target);
      copy.description = await translateText(original.description || '', target);
      if (original.lessons && original.lessons.length) {
        copy.lessons = new Array(original.lessons.length);
        await Promise.all(original.lessons.map((ol, i) => {
          return new Promise(async resolve => {
            if (ol.lessonId) {
              const tl = await xlateLesson(ol.lessonId, target);
              copy.lessons[i] = {lessonId: tl.id};
            }
            else {
              copy.lessons[i] = {};
            }
            resolve();
          });
        }));
      }
      else {
        copy.lessons = [];
      }
      copy.createdate = new Date();
      copy.lastupdate = new Date();
      let ref = await admin
        .firestore()
        .collection("subjects")
        .add(copy);
      return ref;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

xlateSubject('2YRBNdUBBsI210xQ0jrp', 'am');

setTimeout(function() {
  process.exit(0)
}, 600000);

