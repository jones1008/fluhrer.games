# fluhrer.games
This is the code for the website [https://fluhrer.games](https://fluhrer.games) from Fluhrer Games GbR.
It is realized with [Jekyll](https://jekyllrb.com/), a static site generator.

## Development
To spin up a local server at [http://localhost:4000](http://localhost:4000) just run `npm run serve` and then `grunt serve` in another command line.

## Production
To build the application for production run `npm run build` and serve this directory with a webserver to access it.

## Performance
[Grunt](https://gruntjs.com/) concats JavaScript and CSS files, minifies them and removes unused CSS to optimize browser performance. 
On each sub site there is also only the JavaScript loaded that is needed to further improve performance.

All images are served as `.webp` files if the browser supports it which improves the performance drastically.
