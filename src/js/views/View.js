import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  _clearAndRender(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    this._clearAndRender(markup);
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
