import { firebaseConfig as config } from './FIREBASE_CONFIG';
import { FirebaseDataProvider } from "react-admin-firebase";
import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from "react-admin";

const options = {
    logging: true,
    rootRef: '/',
    watch: []
};
const firebaseProviderApi:any = FirebaseDataProvider(config, options);

const handleResults = async (results:any, verb: string, resourceName: string, params: any) => {
    return results;
};

export const myDataProvider = async function(verb: string, resourceName: string, params: any): Promise<any> {
    return firebaseProviderApi(verb, resourceName, params).then((results:any) => {return handleResults(results, verb, resourceName, params)});
};
