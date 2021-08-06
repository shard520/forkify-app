import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  _clearAndRender(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearAndRender(markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const markup = `
	  <div class="spinner">
		<svg>
		  <use href="${icons}#icon-loader"></use>
		</svg>
	  </div>
	`;

    this._clearAndRender(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
			<div class="error">
				<div>
					<svg>
						<use href="${icons}#icon-alert-triangle"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div>
	  `;

    this._clearAndRender(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
			<div class="message">
				<div>
					<svg>
						<use href="${icons}#icon-smile"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div>
	  `;

    this._clearAndRender(markup);
  }
}
