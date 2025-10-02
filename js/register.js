import { BASE_URL } from "./constants.js";
import {
  elRegisterForm,
  elRegisterHidden,
  elRegisterLoading,
  elRegisterMassageBox,
} from "./html-selection.js";

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    elRegisterLoading.classList.add("hidden");
    elRegisterHidden.classList.remove("hidden");
  }, 2000);
});

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
      alert("Tizimga muafaqyatli kirdingiz! ✔")
      location.href = "../login.html";
    })
    .catch(() => {
      alert("Xatolik yuz berdi qayta urunib ko'ring! 💔")
    })
    .finally(() => {
      registerLoading(false);
      alert("Ustoz auth ishlamagani uchun siz aytgandek qila olmadim chunki tekshira olmadim lekin qo'ldan kelgancha harakat qildim")
    });
}

function registerLoading(bool) {
  if (bool) {
    elRegisterHidden.classList.add("hidden");
    elRegisterLoading.classList.remove("hidden");
  } else {
    elRegisterLoading.classList.add("hidden");
    elRegisterHidden.classList.remove("hidden");
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
