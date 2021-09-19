allow gmail access for less secure apps (needed for sending emails during user sign-up): https://myaccount.google.com/lesssecureapps  

In order to start the project please do the following:  
create .development.env and .production.env files (watch .env.example)  
run in the terminal:  
docker-compose build  
docker-compose up  
docker ps -a (and copy the ID of the container with the name: "web_store_back_main")  
docker exec <web_store_back_main ID> npm run db:migrate  
