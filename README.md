# Django Movie Rental API Project

## General Info

Movie Rental API made with Django and REST Framework

### Which Third Party Libraries Are Used?

- Django Rest Framework for easy API Creation

### How To Run It Locally

- Make sure `docker` and `docker-compose` are installed, and `docker service` is running on your system
- Clone this repo
- `cd` into the `frontend` folder and type `yarn install` or `npm install` to install frontend dependencies
- Build the frontend project by running the command `yarn build` to create the static files to be use with Django
- Go back to the previous directory by typing `cd ..`
- Run `docker-compose up`, under the cloned repo's directory
- Create a superuser by typing `docker-compose run --rm app sc -c "python manage.py createsuperuser"`
- Run tests by typing `docker-compose run --rm app sc -c "python manage.py test && flake8"`
- Go to [http://localhost:3000](http://localhost:3000) from your favorite browser and play around with the APP
- Go to [http://localhost:3000/admin/](http://localhost:3000/admin/) to login with your admin credentials to be able to play around with the available objects
- To create a user account, make sure to use a real email since the authentication is via JWT and requires activation sent via email to the user
- Database will be persisted in `postgres_data` folder, in case you restart docker services
- When you are done playing around, run `docker-compose down`
- Use POSTMAN or other tools to test API Endpoints. Import `Django Movie Rental API.postman_collection.json` collection file to POSTMAN to test the different API Endpoints

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
