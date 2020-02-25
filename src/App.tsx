import * as React from "react";
import { SymptomIcon, SymptomList, SymptomShow, SymptomCreate, SymptomEdit } from "./resources/symptom";
import { PhotoIcon, PhotoList, PhotoShow, PhotoCreate, PhotoEdit } from "./resources/photo";
import { VideoIcon, VideoList, VideoShow, VideoCreate, VideoEdit } from "./resources/video";
import { Admin, Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import { myDataProvider } from './dataProvider'
import { firebaseConfig as config } from './FIREBASE_CONFIG';

const options = {
  logging: true,
  rootRef: '/'
};
const authProvider = FirebaseAuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
        <Admin
            dataProvider={myDataProvider}
            authProvider={authProvider}
        >
          <Resource
              name="symptoms"
              icon={SymptomIcon}
              list={SymptomList}
              show={SymptomShow}
              create={SymptomCreate}
              edit={SymptomEdit}
          />
          <Resource
              name="photos"
              icon={PhotoIcon}
              list={PhotoList}
              show={PhotoShow}
              create={PhotoCreate}
              edit={PhotoEdit}
          />
          <Resource
              name="videos"
              icon={VideoIcon}
              list={VideoList}
              show={VideoShow}
              create={VideoCreate}
              edit={VideoEdit}
          />
        </Admin>
    );
  }
}

export default App;
