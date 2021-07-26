import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  recipeView.renderSpinner();

  try {
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`💥💥 ${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3} Render search results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination views
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (pageNum) {
  // 1} Render new search results
  resultsView.render(model.getSearchResultsPage(pageNum));

  // 2) Render new pagination views
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in state
  model.updateServings(newServings);

  // update recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
