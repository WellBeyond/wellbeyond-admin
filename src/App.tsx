import * as React from "react";
import systems from "./resources/systems";
import symptoms from "./resources/symptoms";
import solutions from "./resources/solutions";
import facts from "./resources/facts";
import photos from "./resources/photos";
import videos from "./resources/videos";
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
          <Resource name="systems" {...systems} />
          <Resource name="symptoms" {...symptoms} />
          <Resource name="solutions" {...solutions} />
          <Resource name="facts" {...facts} />
          <Resource name="photos" {...photos} />
          <Resource name="videos" {...videos} />
        </Admin>
    );
  }
}

export default App;
