# Carbon 

## Development

1. Place `.env` file under home folder. Delete last line in `.env` file (delete `EXPORT NODE_OPTIONS=--openssl-legacy-provider`)

    1. Get the `.env` file from another teammate/editor

2. `docker-compose build`

3. `docker-compose up`

4. Go to [http://localhost:3000/](http://localhost:3000/)

## Deployment

1. `docker build . -t dailybruin/carbon`

2. `docker push dailybruin/carbon`
