import { BASE_URL } from "./constants.js";
import {
  elRegisterForm,
  elRegisterHidden,
  elRegisterLoading,
  elRegisterMassageBox,
} from "./html-selection.js";

function register(user) {
  registerLoading(true);
  fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      location.href = "../login.html";
    })
    .catch(() => {})
    .finally(() => {
      registerLoading(false);
    });
}

function registerLoading(bool) {
  if (bool) {
    setTimeout(() => {
      elRegisterLoading.classList.add("hidden");
    }, 2000);
    // elRegisterHidden.classList.add("hidden");
  } else {
    elRegisterLoading.classList.remove("hidden");
    // elRegisterHidden.classList.remove("hidden");
  }
}

function validation(arry) {
  if (arry.username.trim() === "") {
    return {
      target: "username",
      message: "Iltimos login yozing",
    };
  }

  if (arry.password.trim() === "") {
    return {
      target: "password",
      message: "Iltimos paroldi kiriting",
    };
  }

  return false;
}

elRegisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const result = [];
  formData.forEach((valeu, key) => {
    result[key] = valeu;
  });

  const check = validation(result);

  if (check) {
    elRegisterForm[check.target].focus();

    elRegisterMassageBox.classList.remove("hidden");
    elRegisterMassageBox.classList.add("bg-red-500", "text-white");

    elRegisterMassageBox.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = check.message;
    elRegisterMassageBox.append(p);

    setTimeout(() => {
      p.remove();
      elRegisterMassageBox.classList.add("hidden");
    }, 2000);
  } else {
    register(result);
  }
});
