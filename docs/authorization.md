###### Authentication and Authorization

Each user in the system has an associated User UID that is set when the user is created and can be found in
the Authentication tab of the Firebase project (e.g. `https://console.firebase.google.com/u/1/project/wellbeyond-development/authentication/users`).  
That same UID will be the id field for that user's information in the /users collection in Firestore.  Note
that the authentication information is used just for logging in, and cannot store arbitrary information about
a person.  That is why it is a common convention to have an associated /users collection to store 
additional information -- in our case things like what organization and community the user belongs to.
In the WellBeyond case, there is an additional collection -- /admins -- that stores information about 
people who are allowed to use this application (WellBeyond Admin).

There are fundamentally 3 different types of users for the WellBeyond application:

1. **System Administrators** - These users have an entry in the /admins collection with 
   the flag `isAdmin` set to true.  They are allowed to read or update any data in the
   Firestore database. 
   
2. **Client Administrators** - These users are allowed to update information for one or
   more organizations.  They have an entry in the /admins collection with the flag `isClientAdmin`
   set to true.  That entry will also have a list of the organizations that this person
   can manage.  Note that a client administrator may be able to manage more than one
   organization.
   
3. **End Users** - These users only access data through the front end application
   so they are not users of the WellBeyond Admin application at all and do not have
   an entry in the /admins collection.  The authorization provider `src/authProvider/index.ts`
   will return a not authorized exception when someone tries to login who is not
   either a System Administrator or a Client Administrator.
   
The rules in `firestore.rules` will actually enforce the authorization rules regarding
a Client Administrators access to data by organization.  To do this, it is necessary to
have an `organizationId` field on every collection that needs to be secured.  The only
collections that do not have an `organizationId` on them are those that can only
be modified by the System Administrator (e.g. /systemTypes).  These should be few
and far between.  The rules for limiting access based on organizationId are kind of
cumbersome, but they are virtually the same for every collection.

Firestore is kind of funny in how it applies security rules to queries.  It does not
filter the data that is returned from the query but simply fails with a not authorized
error if the query returns data that the user is not authorized to see.  For that reason,
we need to construct a filter for every query based on the security that applies
to the client administrator.  This is done in `src/dataProvider/index.ts`.  In there,
the code sets the `collectionQuery` property to filter based on `organizationId`. 
The `collectionQuery` is an undocumented feature of `https://github.com/benwinding/react-admin-firebase`.
Normally, the react-admin-firebase data provider code will query all data from a collection, and then
apply the filtering after the fact before returning it up to the caller.  By specifying
the filter as the `collectionQuery`, it will actually pass that filter to Firestore.  This
ensures that we don't get the security error.