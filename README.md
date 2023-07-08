# tides

## Data

The data comes from [NOAA](https://tidesandcurrents.noaa.gov/).

Stations

```shell
https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions
```

Tide Predictions

```shell
https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=20230707&end_date=20230810&datum=MLLW&station=8446166&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred
```

## Development

### Style

Uses Prettier. Check or Fix style

```shell
npm run check-style
```

```shell
npm run fix-style
```

## Recreate this Project

My intent with this project is a simple React SPA.

### Using

- React
- React Router
- Vite with SWC _for speedy dev builds_
- Typescript _because I need to learn stupid Typescript better_
- Prettier

### Create Project

Start with Vite.

```shell
npm create vite@latest
✔ Project name: … tides
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC
```

Add [Prettier](https://prettier.io/docs/en/install.html)

```shell
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
npx prettier . --write
```
