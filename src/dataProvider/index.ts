import {firebaseConfig as config} from '../FIREBASE_CONFIG';
import {FirebaseDataProvider} from "react-admin-firebase";

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
    return firebaseProviderApi(verb, resourceName, params).then((results:any) => {return handleResults(results, verb, resourceName, params)});
};

export default myDataProvider;

