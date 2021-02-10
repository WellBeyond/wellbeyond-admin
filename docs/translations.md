###### Creating translations

At this time, it is necessary to run a standalone program to translate a subject (and all of the associated lessons) from English to another language.

To run the translation, modify this line near the bottom of the xlate-subject.js file:

`xlateSubject('GEPLhmUi89hMZmTXD8le', 'so');`

to reference the id of the subject that you want to translate and the language that you want to translate it into.

You will need to have the Firebase Admin credentials setup and reference them in your environment variables:

`GOOGLE_APPLICATION_CREDENTIALS=C:\Users\daveh\Workspaces\wellbeyond\wellbeyond-wash-training\.firebase\private-key.json`

