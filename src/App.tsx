import * as React from "react";
import {Admin, Resource} from "react-admin";
import themeReducer from './themeReducer';
import {Layout, Login} from './layout';
import {Dashboard} from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import systemTypes from "./resources/systemTypes";
import systems from "./resources/systems";
import symptoms from "./resources/symptoms";
import solutions from "./resources/solutions";
import facts from "./resources/facts";
import checklists from "./resources/checklists";
import forms from "./resources/forms";
import formTypes from "./resources/formTypes";
import maintenanceLogs from "./resources/maintenanceLogs";
import topics from "./resources/topics";
import subjects from "./resources/subjects";
import lessons from "./resources/lessons";
import sessions from "./resources/sessions";
import photos from "./resources/photos";
import videos from "./resources/videos"
import users from "./resources/users";
import admins from "./resources/admins";
import organizations from "./resources/organizations";
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
          {(permissions:any) => {
            return ([
              <Resource name="systemTypes" {...systemTypes} />,
              <Resource name="systems" {...systems} />,
              <Resource name="symptoms" {...symptoms} />,
              <Resource name="solutions" {...solutions} />,
              <Resource name="facts" {...facts} />,
              <Resource name="checklists" {...checklists} />,
              <Resource name="forms" {...forms} />,
              <Resource name="formTypes" {...formTypes} />,
              <Resource name="maintenanceLogs" {...maintenanceLogs} />,
              <Resource name="topics" {...topics} />,
              <Resource name="subjects" {...subjects} />,
              <Resource name="sessions" {...sessions} />,
              <Resource name="lessons" {...lessons} />,
              <Resource name="photos" {...photos} />,
              <Resource name="videos" {...videos} />,
              <Resource name="users" {...users} />,
              permissions.admin && permissions.admin.isAdmin ? <Resource name="admins" {...admins} /> : null,
              <Resource name="organizations" {...organizations} />
            ]);
          }}
        </Admin>
    );
  }
}

export default App;
