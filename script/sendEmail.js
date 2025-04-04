const phoneInput = document.getElementById("phone-input");
const consultBtn = document.getElementById('consultBtn'); 

const modal = document.getElementById('callback-modal');
modal.style.display = 'none'
const openBtn = document.getElementById('open-callback-modal');
const openBtnFooter = document.getElementById('open-callback-modal-footer')
const closeBtn = document.getElementById('close-callback-modal');

openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll');
});

openBtnFooter.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll'); 
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("phone-input");

  input.addEventListener("input", function () {
      let rawValue = input.value.replace(/\D/g, "");
      if (!rawValue.startsWith("7")) {
          rawValue = "7" + rawValue; 
      }

      let formattedValue = "+7";

      if (rawValue.length > 1) {
          formattedValue += ` (${rawValue.substring(1, 4)}`;
      }
      if (rawValue.length >= 5) {
          formattedValue += `) ${rawValue.substring(4, 7)}`;
      }
      if (rawValue.length >= 8) {
          formattedValue += `-${rawValue.substring(7, 9)}`;
      }
      if (rawValue.length >= 10) {
          formattedValue += `-${rawValue.substring(9, 11)}`;
      }

      input.value = formattedValue;

      if (rawValue.length > 11) {
          input.value = input.value.substring(0, 18);
      }
  });

  input.addEventListener("focus", function () {
      if (input.value === "") {
          input.value = "+7 ";
      }
  });

  input.addEventListener("blur", function () {
      if (input.value === "+7 ") {
          input.value = "";
      }
  });
});

let isEmailSent = false
// var notification = document.querySelector(".notification");
// var errorNotification = document.querySelector(".error-notification");
// notification.classList.remove("active");
// errorNotification.classList.remove("active");
// function waitForInput() {
//   const input = document.getElementById("input_1732283973850");

//   if (input) {
//     phoneInput = input;
//     if (!input.hasEventListener) {
//       input.hasEventListener = true;
//       console.log("found!");
//     }
//   } else {
//     console.log("...");
//     setTimeout(waitForInput, 100);
//   }
// }

// waitForInput();
// function showNotification() {
//   closeNotification();
//   setTimeout(() => {
//     closeNotification();
//   }, 7500);
//   var notification = document.querySelector(".notification");
//   notification.classList.add("active");
// }

// function closeNotification() {
//   var notification = document.querySelector(".notification");
//   notification.classList.remove("active");
// }


const sendEmail = async (name, phone, email) => {

  if (!phone || phone === "" || phone.length < 10) return;
  try {
    await fetch(
      "https://app.marketmonstr.pro/api/bitrix/addLead",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        mode: "no-cors",
        body: JSON.stringify({
          fields: {
            TITLE: "Заявка с лендинга harmex.ru" + ' ' + phone,
            NAME: name,
            EMAIL: [
              {
                VALUE: email,
                VALUE_TYPE: "WORK",
              },
            ],
            PHONE: [
              {
                VALUE: phone,
                VALUE_TYPE: "WORK",
              },
            ],
          },
        }),
      }
    );
    console.log('end')
    isEmailSent = true
    modal.style.display = 'none';
    // showNotification()
  } catch (error) {
    console.error(error);
  }
};

consultBtn.addEventListener("click", async function (event) {
  if (isEmailSent) return
  event.preventDefault();
  console.log('click');
  console.log(phoneInput);
  // const name = nameInput.value;
  const phone = phoneInput.value;
  await sendEmail('Имя', phone, 'test@ya.ru');
});