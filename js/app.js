import { checkAuth } from "./check-auth.js";
import { BASE_URL, LOADER_COUNT } from "./constants.js";
import {
  elBtnAllCars,
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
      fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          init();
        })
        .then((res) => {})
        .finally(() => {});
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

function getById(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      fill(res);
    })
    .finally(() => {});
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteEl(e.target.id);
  }
  if (e.target.classList.contains("edit-btn")) {
    getById(e.target.id);
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

// Selection

const typeSelect = document.getElementById("typeSelect");
const valueSelect = document.getElementById("valueSelect");

typeSelect.addEventListener("change", () => {
  const selectedType = typeSelect.value;

  let data = [];
  if (selectedType === "country") {
    data = [
      "AQSH",
      "Yaponiya",
      "Germaniya",
      "Koreya",
      "Shvetsiya",
      "Buyuk Britaniya",
      "Fransiya",
      "Chexiya",
    ];
  } else if (selectedType === "category") {
    data = [
      "SUV",
      "Sedan",
      "Kupe",
      "Crossover",
      "Off-road",
      "Universal",
      "Pikap",
    ];
  } else if (selectedType === "color") {
    data = [
      "Po'lat ko'k",
      "Qora",
      "Kumush",
      "Oltin",
      "Baliq qizil",
      "Dengiz ko'k",
      "Kulrang",
      "Oq",
      "Qizil",
      "Jigarrang",
      "To'q kulrang",
      "Binafsha",
      "Yashil",
      "To'q sariq",
      "Lavanta",
      "Bej",
      "Pushti",
      "Zaytun",
      "Sariq",
      "Dark slate",
      "Orange",
      "To'q qizil",
    ];
  }

  data = [...new Set(data)];

  valueSelect.innerHTML = "<option disabled selected>Select</option>";
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    valueSelect.appendChild(option);
  });
});

valueSelect.addEventListener("change", () => {
  const selectedType = typeSelect.value;
  const selectedValue = valueSelect.value;

  let filtered = [];

  if (selectedType === "country") {
    filtered = allCars.filter((car) => car.country === selectedValue);
  } else if (selectedType === "category") {
    filtered = allCars.filter((car) => car.category === selectedValue);
  } else if (selectedType === "color") {
    filtered = allCars.filter((car) => car.colorName === selectedValue);
  }

  ui(filtered);
});

elBtnAllCars.addEventListener("click", () => {
  location.reload();
});
