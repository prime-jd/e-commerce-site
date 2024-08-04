# E-Commerce Site
1. user signup
2. User Login authentication(JWT and bcrypt)
3. Shopping Items
4. Shopping Cart

# TO RUN

1. Create env file as in env.sample
2. Run command
   ```
   docker-compose up
   ```
3. Re-install bcrypt in docker container 
   ``` 
   docker exex -it <server-container name> bash
   ```
4. After entering server cntainer, Run command in running container
   ```
   npm uninstall bcrypt
   ```
   ```
   npm install bcrypt
   ```
   now all set
5. Enjoy
