import {firebaseConfig as config} from '../FIREBASE_CONFIG';
import {FirebaseDataProvider} from "react-admin-firebase";
import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
} from "react-admin";

import * as firebase from "firebase/app";
import 'firebase/firestore';

import authProvider from '../authProvider'

const options = {
    logging: true,
    rootRef: '/',
    watch: []
};
const firebaseProviderApi:any = FirebaseDataProvider(config, options);

const handleResults = async (results:any, verb: string, resourceName: string, params: any) => {
    return results;
};

const myDataProvider = async function(verb: string, resourceName: string, params: any): Promise<any> {

    return authProvider.getPermissions(null).then((permissions:any) => {
        if (!permissions || !permissions.admin) {
            return Promise.reject('Not authorized');
        }
        if (permissions.admin.isAdmin) {
            return firebaseProviderApi(verb, resourceName, params).then((results:any) => {return handleResults(results, verb, resourceName, params)});
        }
        if (permissions.admin.isClientAdmin && permissions.admin.organizations && permissions.admin.organizations.length) {
            if (verb.startsWith('GET') ) {
                params.filter = params.filter || {};
                if (resourceName === 'organizations') {
                    params.filter.collectionQuery = (resource: any) => {
                        return resource.where(firebase.firestore.FieldPath.documentId(), 'in', permissions.admin.organizations)
                    }
                }
                else {
                    params.filter.collectionQuery = (resource: any) => {
                        return resource.where('organizationId', 'in', permissions.admin.organizations)
                    }
                }
            }
            return firebaseProviderApi(verb, resourceName, params).then((results:any) => {
                return handleResults(results, verb, resourceName, params);
            }).catch((error:any) => {
                if (error.status === 403) {
                    return handleResults(verb in [GET_LIST, GET_MANY, GET_MANY_REFERENCE] ? {data: [], total:0} : {data: {}, total:0}, verb, resourceName, params);
                }
            });
        }
        return Promise.reject('Not authorized');
    });

};

export default myDataProvider;

