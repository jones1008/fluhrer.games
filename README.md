# fluhrer.games
This is the code for the website [https://fluhrer.games](https://fluhrer.games) from Fluhrer Games GbR.
It is realized with [Jekyll](https://jekyllrb.com/), a static site generator and is encapsulated in Docker with docker-compose.

> IMPORTANT: make sure to execute `chown -R 1000 ./` in this root directory to avoid jekyll permission errors when building the application.

## Development
To spin up a local server at [http://localhost:4000](http://localhost:4000) create a `.env` file with the following content:
```dotenv
MODE=dev
```
Then run `docker-compose up`.

## Production Build
To build the application for production run change your `.env` file to:
```dotenv
MODE=prod
```
After executing `docker-compose up` the site is deployed to the subdirectory `./_site`.

## Performance
[Grunt](https://gruntjs.com/) concats JavaScript and CSS files, minifies them and removes unused CSS to optimize browser performance. 
On each sub site there is also only the JavaScript loaded that is needed to further improve performance.

All images are served as `.webp` files if the browser supports it which improves the performance drastically.

## Fetch Anzahl Spielende data
On the home page of fluhrer.games is a number that changes sometimes (Anzahl Spielende).
This dynamically changing number is stored in a `spielende.csv` file on Google Drive.

The script `pull-anzahl-spielende-and-rebuild.sh` is being called by a cron job on the server every night.
The script uses [rclone](https://rclone.org/) to copy the file from Google Drive into `./_data/anzahl-spielende-google-drive/spielende.csv` if it changed.
To be able to use the script you need to install rclone on the server and add a Google Drive remote called `gdrive-cantopia` with the command `rclone config`.
Also the script assumes that the `spielende.csv` file is on the following path in Google Drive: `/Cantopia/fluhrer.games-anzahl-spielende` 
