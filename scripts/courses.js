////load corurses/////

let courses = [];
let coursesTabs = document.querySelectorAll(".courses-section .types strong");
let isLoaded = false;
let currentChosenTab = "Python";
let coursesView = document.querySelector(".courses-section .courses");
let formInput = document.querySelector("nav form input");

function getCourse(courseData) {
  let ratingBar = "";
  for (let i = 0; i < courseData["rate"]; i++)
    ratingBar += `<i class="material-icons full-star">star_rate</i>`;
  for (let i = 0; i < 5 - courseData["rate"]; i++)
    ratingBar += `<i class="material-icons empty-star">star_rate</i>`;
  return `<div class="item">
  <img src="${courseData["image"]}" alt="course image" />
  <h4>
    <strong>
    ${courseData["title"]}
    </strong>
  </h4>
  <p>${courseData["author"]}</p>
  <span class="rating-bar">
    <p class="rate">${courseData["rate"]}</p>
    ${ratingBar}
    <p class="raters">${courseData["raters_count"]}</p>
  </span>

  <span class="price">
    <p><strong>${courseData["new_price"]}$</strong></p>
    <p><strong>${courseData["old_price"]}$</strong></p>
  </span>
</div>`;
}

function getLoading() {
  return `<div class="loader"></div>`;
}

function search() {
  if (!isLoaded) {
    return;
  }

  let query = formInput.value;

  coursesView.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    if (
      courses[i]["title"].toLowerCase().includes(query.toLowerCase()) ||
      query == ""
    ) {
      coursesView.innerHTML += getCourse(courses[i]);
      console.log(courses[i]);
    }
  }
}

function manageOwlCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    navText: [
      `<i class='material-icons'>	keyboard_arrow_left</i>`,
      `<i class='material-icons'>	keyboard_arrow_right</i>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
}

function loadCourses() {
  isLoaded = false;
  courses = [];
  coursesView.innerHTML = "";
  coursesView.innerHTML += getLoading();
  fetch(`http://localhost:3000/${currentChosenTab}`)
    .then((resonse) => resonse.json())
    .then((json) => {
      isLoaded = true;
      coursesView.innerHTML = "";
      coursesView.innerHTML += `
      <div class="row">
      <div class="col-12 m-auto">
      <div class="owl-carousel owl-theme"></div></div></div>`;
      for (let i = 0; i < json.length; i++) {
        coursesView.querySelector(".owl-carousel").innerHTML += getCourse(
          json[i]
        );
        courses.push(json[i]);
      }
      manageOwlCarousel();
    });
}

function onTabClick(tab) {
  for (let i = 0; i < coursesTabs.length; i++) {
    coursesTabs[i].classList.remove("chosen");
  }
  tab.classList.add("chosen");
  currentChosenTab = tab.textContent.replace(" ", "");
  loadCourses();
}

document.querySelector("nav form button").addEventListener("click", search);

for (let i = 0; i < coursesTabs.length; i++) {
  coursesTabs[i].addEventListener("click", () => {
    onTabClick(coursesTabs[i]);
  });
}

loadCourses();
