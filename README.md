# Carbon 

## Development

1. Get the `.env` file from another teammate/editor

2. Place `.env` file under the top project directory.

3. `docker-compose build`
   1. If you encounter issues in building the docker containers, delete last line (10th line) in `.env` file

4. `docker-compose up`

5. Go to [http://localhost:3000/](http://localhost:3000/)

## Deployment

1. `docker build . -t dailybruin/carbon`

2. `docker push dailybruin/carbon`
