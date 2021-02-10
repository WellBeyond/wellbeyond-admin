###### Build Instructions

Building is pretty simple:

`npm run build`

This will create the optimized build in the /build directory, which can be tested by running:

`serve -s build`

Note that this will run with the NODE_ENV environment variable set to 'production', so it will point at 
the production Firebase instance. This is controlled in the file:

`/src/FIREBASE_CONFIG.ts`

It is a good idea to run a few simple tests using the built application running against the production 
environment before deploying it.  In particular, you will want to make sure that any of the new Firestore 
rules have been deployed successfully to the production environment before you deploy the code.

###### Deployment Instructions

If you have created any new resources, remember that you will have to deploy the access rules before 
you deploy the application.  The firestore.rules gives unfettered access to system admin users, but new 
rules need to be created to allow client admins to access data for their organizations.  The rules are
maintained in the wellbeyond-wash-training project (since they apply to both applications).  You run them
from that project by first making sure that you are running against the correct environment:

`firebase use wellbeyond-wash-training`

and then deploying them:

`npm run deploy-rules`

To deploy the application to `https://admin.wellbeyondwater.com`, you can use this command:

`npm run deploy`

which actually runs this Firebase script

`firebase deploy --only hosting:wellbeyond-admin`

