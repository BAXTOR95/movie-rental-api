# Django Movie Rental API Project

## General Info

Movie Rental API made with Django and REST Framework

[Live-demo](http://django-rental-movie-app.herokuapp.com)

### Which Third Party Libraries Are Used?

- Django Rest Framework for the backend
- React Framework for the frontend

### How To Run It Locally

- Make sure `docker` and `docker-compose` are installed, and `docker service` is running on your system
- Clone this repo
- `cd` into the `frontend` folder and type `yarn install` or `npm install` to install frontend dependencies
- Build the frontend project by running the command `yarn build` to create the static files to be use with Django
- Go back to the previous directory by typing `cd ..`
- Run `docker-compose up --build`, under the cloned repo's directory
- Create a superuser by typing `docker-compose run --rm app sh -c "python manage.py createsuperuser"`
- Run tests by typing `docker-compose run --rm app sh -c "python manage.py test && flake8"`
- If you closed the console after building the container, just type `docker-compose up` to start it again
- Go to [http://127.0.0.1:8000](http://127.0.0.1:8000) from your favorite browser and play around with the APP
- Go to [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) to login with your admin credentials to be able to play around with the available objects
- To create a user account, make sure to use a real email since the authentication is via JWT and requires activation sent via email to the user
- Database will be persisted in `db_data_volume` docker volume, in case you restart docker services
- If you don't want to create the database from scratch, you can try to recreate it with the database dump located at `backend` in a file named `pg_dump.sql` by running the following command inside the `backend` folder to copy the dump file to the container `docker cp pg_dump.sql movie-rental-api-db-1:/pg_dump.sql` and then running `docker exec -it movie-rental-api-db-1 psql -U $DB_USER -d $DB_NAME -f /pg_dump.sql` to recreate the database
- When you are done playing around, run `docker-compose down`
- Use POSTMAN or other tools to test API Endpoints. Import `django_movie_rental_api.postman_collection.json` collection file to POSTMAN to test the different API Endpoints

## API Endpoints

- /api/auth/users/
- /api/auth/users/activation/
- /api/auth/jwt/create/
- /api/auth/jwt/refresh/
- /api/auth/users/reset_password/
- /api/auth/users/reset_password_confirm/
- /api/auth/users/me/
- /api/auth/jwt/verify/
- /api/movie/genres/
- /api/movie/movies/ [Available filters `search`, `genre`, `availability`, `order_by`]
- /api/movie/movies/{movie_id}/upload-image/
- /api/movie/rentals/
- /api/movie/rentals/{rental_id}/return-movie/
- /api/movie/purchases/
- /api/movie/likes/

Thank you!

Brian Arriaga
