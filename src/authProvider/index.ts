import {firebaseConfig as config} from '../FIREBASE_CONFIG';
import {FirebaseAuthProvider} from "react-admin-firebase";
import * as firebase from "firebase/app";
import 'firebase/auth';

const options = {
    logging: true,
    rootRef: '/',
    watch: []
};
const firebaseProvider:any = FirebaseAuthProvider(config, options);

const handleLogin = (results:any, params: any) => {
    if (!results || !results.user || !results.user.uid) {
        return results;
    }

    const ref = firebase
        .firestore()
        .collection('admins')
        .doc(results.user.uid);

    return ref
        .get()
        .then(doc => {
            if (doc.exists) {
                const admin:any = {
                    id: doc.id,
                    ...doc.data()
                };
                localStorage.setItem('admin_permissions', JSON.stringify(admin));
                if (admin.isAdmin || admin.isClientAdmin || admin.isMaintenanceUser) {
                    results.user.admin = admin;
                    return results;
                }
                throw new Error('Login error: unauthorized');
            } else {
                // doc.data() will be undefined in this case
                throw new Error('Login error: unauthorized');
            }
        })
        .catch(error => {
            throw new Error('Login error: unauthorized');
        });

};

const handleLogout = (results:any, params: any) => {
    localStorage.removeItem('admin_permissions');
    return results;
};

const handleCheckAuth = (results:any, params: any) => {
    return results;
};

const handleCheckError = (results:any, error: any) => {
    return results;
};

const handleGetPermissions = (results:any, params: any) => {
    const admin = localStorage.getItem('admin_permissions');
    results = results || {};
    try {
        if (admin) {
            results.admin = JSON.parse(admin);
        }
    }
    catch (e) {}
    return results;
};

const myAuthProvider =  {
    login: (params:any) => {
        return firebaseProvider.login(params).then((results:any) => { return handleLogin(results, params)});
    },
    logout: (params:any) => {
        return firebaseProvider.logout(params).then((results:any) => {return handleLogout(results, params)});
    },
    checkAuth: (params:any) => {
        return firebaseProvider.checkAuth(params).then((results:any) => {return handleCheckAuth(results, params)});
    },
    checkError: (error:any) => {
        return firebaseProvider.checkError(error).then((results:any) => {return handleCheckError(results, error)});
    },
    getPermissions: (params:any) => {
        return firebaseProvider.getPermissions(params).then((results:any) => {return handleGetPermissions(results, params)});
    },
};

export default myAuthProvider;

