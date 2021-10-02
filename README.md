allow gmail access for less secure apps (needed for sending emails during user sign-up): https://myaccount.google.com/lesssecureapps  

In order to start the project in docker containers please do the following:  
create .development.env and .production.env files (watch .env.example; note that for docker the following is important: POSTGRES_HOST=postgres; postgres is the name of the service in docker-compose.yml)  
run in the terminal: 
docker-compose build  
docker-compose up -d  
please make sure that inside of ormconfig.json file you have the following: "host": "postgres" (postgres is the name of the service in docker-compose.yml)  
docker-compose exec main npm run db:migrate  
In order to stop the containers use: docker-compose down (add --volumes at the end if you want to delete volumes)   


In order to start the project locally without docker containers please do the following:
create .development.env and .production.env files (watch .env.example; note the following is important: POSTGRES_HOST=localhost;  
create database in postgres with the name that you specified as the POSTGRES_DB env variable. 
run in the terminal:
npm install  
please make sure that inside of ormconfig.json file you have the following: "host": "localhost"
npm run db:migrate  