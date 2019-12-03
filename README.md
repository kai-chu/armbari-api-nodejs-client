# armbari-api-nodejs-client
Node.js client library for accessing Apache Armbari APIs.


# I'm trying to create a nodejs client for Armbari APIs


# Add api adapter 
We have to add adapters for rest api. In the top level, we use the api group to manage different resources.
We start to build an admin api where we can mnaage groups and users resources.
Learned from google, we can an admin moudle and add Resource$User and Resource$Group there.
We export user as an interface for users so that user can configure auth options.
Once the configure is done in the correct way, all resources api in the admin API shall be available.

To be able to use users array in a generic return type, we need to create usersList schema from userSchema.

Admin
 -> Resource$...
    -> API 
       -> Transporter
          -> Gaxios


ArmbariApis (With global options)
  -> Admin

