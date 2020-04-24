import * as React from "react";
import { Admin, Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import { firebaseConfig as config } from './FIREBASE_CONFIG';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import systems from "./resources/systems";
import symptoms from "./resources/symptoms";
import solutions from "./resources/solutions";
import facts from "./resources/facts";
import subjects from "./resources/subjects";
import lessons from "./resources/lessons";
import photos from "./resources/photos";
import videos from "./resources/videos";
import dataProvider from './dataProvider'
import authProvider from './authProvider'
import polyglotI18nProvider from 'ra-i18n-polyglot';

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale === 'fr') {
    // return import('./i18n/fr').then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
}, 'en');

class App extends React.Component {
  render() {
    return (
        <Admin
            loginPage={Login}
            dataProvider={dataProvider}
            authProvider={authProvider}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            dashboard={Dashboard}
            layout={Layout}
            i18nProvider={i18nProvider}
        >
          <Resource name="systems" {...systems} />
          <Resource name="symptoms" {...symptoms} />
          <Resource name="solutions" {...solutions} />
          <Resource name="facts" {...facts} />
          <Resource name="subjects" {...subjects} />
          <Resource name="lessons" {...lessons} />
          <Resource name="photos" {...photos} />
          <Resource name="videos" {...videos} />
        </Admin>
    );
  }
}

export default App;
