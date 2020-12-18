import {firebaseConfig as config} from '../FIREBASE_CONFIG';
import {FirebaseDataProvider} from "react-admin-firebase";

import * as firebase from "firebase/app";
import 'firebase/firestore';

import authProvider from '../authProvider'

const options = {
    logging: true,
    rootRef: '/',
    watch: []
};
const firebaseProviderApi:any = FirebaseDataProvider(config, options);

const handleResults = async (results:any, resource: string, params: any) => {
    return results;
};

const checkPermission = async (): Promise<any> => {
    return authProvider.getPermissions(null).then((permissions:any) => {
        if (!permissions || !permissions.admin) {
            return Promise.reject('Not authorized');
        }
        if (permissions.admin.isAdmin) {
            return Promise.resolve(permissions);
        }
        if (permissions.admin.isClientAdmin && permissions.admin.organizations && permissions.admin.organizations.length) {
            return Promise.resolve(permissions);
        }
        return Promise.reject('Not authorized');
    });
}

const setFilter = (permissions:any, resource: string, params: any): void => {
    if (permissions && permissions.admin.isClientAdmin && permissions.admin.organizations && permissions.admin.organizations.length) {
        params.filter = params.filter || {};
        if (resource === 'organizations') {
            params.filter.collectionQuery = (resource: any) => {
                return resource.where(firebase.firestore.FieldPath.documentId(), 'in', permissions.admin.organizations)
            }
        } else {
            params.filter.collectionQuery = (resource: any) => {
                return resource.where('organizationId', 'in', permissions.admin.organizations)
            }
        }
    }
}


const myDataProvider = {
    getList: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            setFilter(permissions, resource, params);
            return firebaseProviderApi.getList(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            }).catch((error:any) => {
                if (error.status === 403) {
                    return handleResults({data: [], total:0}, resource, params);
                }
            });
        });
    },
    getOne: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            setFilter(permissions, resource, params);
            return firebaseProviderApi.getOne(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            }).catch((error:any) => {
                if (error.status === 403) {
                    return handleResults({data: {}, total:0}, resource, params);
                }
            });
        });
    },
    getMany: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            setFilter(permissions, resource, params);
            return firebaseProviderApi.getMany(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            }).catch((error:any) => {
                if (error.status === 403) {
                    return handleResults({data: [], total:0}, resource, params);
                }
            });
        });
    },
    getManyReference: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            setFilter(permissions, resource, params);
            return firebaseProviderApi.getManyReference(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            }).catch((error:any) => {
                if (error.status === 403) {
                    return handleResults({data: [], total:0}, resource, params);
                }
            });
        });
    },
    update: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            return firebaseProviderApi.update(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            });
        });
    },
    updateMany: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            return firebaseProviderApi.updateMany(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            });
        });
    },
    create: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            return firebaseProviderApi.create(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            });
        });
    },
    delete: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            return firebaseProviderApi.delete(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            });
        });
    },
    deleteMany: (resource:string, params:any) => {
        return checkPermission().then((permissions:any) => {
            return firebaseProviderApi.deleteMany(resource, params).then((results:any) => {
                return handleResults(results, resource, params);
            });
        });
    }
}

export default myDataProvider;

