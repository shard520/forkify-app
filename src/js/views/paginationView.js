import View from './View';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const nextBtn = `
			<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
				<span>Page ${currentPage + 1}</span>
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
				</svg>
			</button>
		`;

    const prevBtn = `
			<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
				</svg>
				<span>Page ${currentPage - 1}</span>
			</button>
		`;

    // Page 1 of multiple
    if (currentPage === 1 && numPages > 1) {
      return nextBtn;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return prevBtn;
    }

    // Other page
    if (currentPage < numPages) {
      return `${prevBtn}${nextBtn}`;
    }
    // Page 1 of 1
    return '';
  }
}

export default new PaginationView();
