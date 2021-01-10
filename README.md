


# Filesystem
File Management System

Below are the steps to setup developer environment. 

1. Make sure you have nodejs installed in the sytem. versions used -> node:12.x, mysql:8.x

2. Clone the repo. (https://github.com/soniharshil54/filesystem.git)

3. Checkout the `master` branch.

4. Run `npm install` to install nodejs dependencies.

5. Run `dump.sql` file in your mysql. (`dump.sql` is in the root of this repo)

6. Check if the `filesystem` database and the tables `user` and `filesystem` are created.

7. Change the database credentials in `configs/env/development.js`. (Dont change the port of server [5600] or if you change do the same in test/socket-test/index.html fro socket connection.)

8. Now the setup is good to go.

9. Import the postman collection file you will find in the base of the repo.

10. Run script `npm run development` to start the server in `development` env. 

11. open `http://localhost:5600` to see the socket events. Whenever someone adds, removes, moves file/folder. This page will listen for those events and will display the same.

12. You can play around the apis from the postman collection.

13. These apis are hosted on https://agile-plateau-03110.herokuapp.com (Heroku). And apis on the same will work but one specific api that is used to get the directory structure will not run as it isn't supported in the mysql versions below 8.x . 

You're good to go.
