Pokédex
===

A pokédex is an electronic device featuring a list of pokémon with information about the pokémon species, used in the Pokémon world, including manga, anime and games.

This specific project is a web app that mimics a pokédex, and fetches pokémon data from the [PokéAPI](https://github.com/PokeAPI/pokeapi) RESTful service.

It's live on https://roboe.github.io/pokedex/


## Technology & Design

The web app is built in JavaScript with [React](https://facebook.github.io/react/). Pokémon data is fetched from the [PokéAPI](https://github.com/PokeAPI/pokeapi) RESTful service. Styles are written in plain CSS, taking advantage of the [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) layout mode and following the [BEM](http://getbem.com/) methodology. Visual design mostly follows the [Material Design](https://material.io/) guidelines. [Create React App](https://github.com/facebookincubator/create-react-app) handles the tooling: [Autoprefixer](https://github.com/postcss/autoprefixer) adds CSS vendor prefixes, [Babel](http://babeljs.io/) transpiles next-gen JavaScript, and [Webpack](https://webpack.github.io/) is the module bundler. The site is deployed to [GitHub Pages](https://pages.github.com/) with a npm deploy script using the [gh-pages](https://github.com/tschaub/gh-pages) utility.


## License

Source code is released under the GPLv3 License. The full text of the license is available in the [LICENSE file](LICENSE).
