import {firebaseConfig as config} from '../FIREBASE_CONFIG';
import {FirebaseDataProvider} from "react-admin-firebase";

const options = {
    logging: true,
    rootRef: '/',
    watch: []
};
const firebaseProviderApi:any = FirebaseDataProvider(config, options);

const handleResults = async (results:any, verb: string, resourceName: string, params: any) => {
    if (resourceName === 'sessions' && results && results.data) {
        if (Array.isArray(results.data)) {
            results.data.forEach((result: any) => {
                result.name = result.groupType + ' group of ' + result.groupSize + ' people on ' +
                    Intl.DateTimeFormat('en', {month: "long", day: "numeric", year: "numeric"}).format(result.started);
                result.isCompleted = !!result.completed;
            });
        }
        else {
            results.data.name = results.data.groupType + ' group of ' + results.data.groupSize + ' people on ' +
                Intl.DateTimeFormat('en', {month: "long", day: "numeric", year: "numeric"}).format(results.data.started);
            results.data.isCompleted = !!results.data.completed;
        }
    }
    return results;
};

const myDataProvider = async function(verb: string, resourceName: string, params: any): Promise<any> {
    return firebaseProviderApi(verb, resourceName, params).then((results:any) => {return handleResults(results, verb, resourceName, params)});
};

export default myDataProvider;

