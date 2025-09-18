import { checkAuth } from "./check-auth.js";
import { BASE_URL, LOADER_COUNT } from "./constants.js";
import {
  elCadrLoader,
  elCardSkletonTemplate,
  elInfoModal,
  elLoginLogoutButton,
  elModalLoginButton,
} from "./html-selection.js";
import { ui } from "./ui.js";

if (checkAuth()) {
  elLoginLogoutButton.innerText = "⬅ Tizimdan chiqish";
} else {
  elLoginLogoutButton.innerText = "Tizimga kirish ➡";
}

function init() {
  loader(true);
  fetch(BASE_URL + "/cars")
    .then((res) => res.json())
    .then((res) => {
      ui(res.data);
    })
    .catch(() => {})
    .finally(() => {
      loader(false);
    });
}

function loader(bool) {
  if (bool) {
    elCadrLoader.innerHTML = "";
    elCadrLoader.classList.remove("hidden");

    let i = 0;
    while (true) {
      if (i === LOADER_COUNT) break;
      const clone = elCardSkletonTemplate.cloneNode(true).content;
      elCadrLoader.append(clone);
      i++;
    }
  } else {
    elCadrLoader.classList.add("hidden");
  }
}

// CRUD
document.addEventListener("click", (evt) => {
  // Delet
  if (evt.target.classList.contains("js-delete")) {
    if (checkAuth()) {
      //
    } else {
      elInfoModal.showModal();
    }
  }

  // Edit
  if (evt.target.classList.contains("js-edit")) {
    if (checkAuth()) {
      //
    } else {
      elInfoModal.showModal();
    }
  }
});

// Start
init();

// Events
elLoginLogoutButton.addEventListener("click", () => {
  if (checkAuth()) {
    localStorage.removeItem("token");
  } else {
    location.href = "/pages/register.html";
  }

  location.reload();
});

elModalLoginButton.addEventListener("click", () => {
  location.href = "/pages/register.html";
});
