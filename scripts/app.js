notification = document.querySelector(".notification");
document
  .querySelector("#close-notification")
  .addEventListener("click", function () {
    notification.className = "hidden-notification";
  });
