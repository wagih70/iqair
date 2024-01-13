## Environment
add .env file in the root folder with configuration as below

## Example:
DATABASE_URL=
AIR_QUALITY_BASE_URL=
AIR_QUALITY_API_KEY=

## Installation
- npm i
- npm run start:dev

Project will be running on 'localhost:3000'

## Test
- npm run test

## API Routes

1- Get Air Quality by Latitude and Longitude:
    route: '/air-quality/nearest-city'
    method: GET
    params: {
      latitude: Number,
      longitude: Number 
    }

2- Get Paris most polluted date and time:
    route: '/air-quality/most-polluted'
    method: GET