class View {
  _parentEl = document.querySelector(".search");
  _errorContainer = document.querySelector(".error-container");
  _btn = document.querySelector(".btn");

  _getQuery() {
    const input = document.querySelector(".input").value;
    return input;
  }

  _renderError(err) {
    document.querySelector(".error-msg").textContent = err;
    this._errorContainer.classList.remove("hidden");
    document.querySelector(".results-container").classList.add("hidden");
  }

  _renderData(data) {
    /// show results container
    this._errorContainer.classList.add("hidden");
    document.querySelector(".results-container").classList.remove("hidden");

    document.querySelector(".result-ip").textContent = data.ip;
    document.querySelector(".result-location").textContent =
      data.location.join(",");
    document.querySelector(".postal-code").textContent = data.postalCode;
    document.querySelector(
      ".result-timezone"
    ).textContent = `UTC ${data.timezone}`;
    document.querySelector(".result-isp").textContent = data.isp;
  }

  _addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      // get query
      const query = this._getQuery();
      // clear query
      document.querySelector(".input").value = "";
      // sent it to controler
      handler(query);
    });
  }
}

export default new View();
