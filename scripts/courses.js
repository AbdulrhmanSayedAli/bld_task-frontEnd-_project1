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
  return `<li>
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
</li>`;
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
      for (let i = 0; i < json.length; i++) {
        coursesView.innerHTML += getCourse(json[i]);
        courses.push(json[i]);
      }
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

loadCourses();
document.querySelector("nav form button").addEventListener("click", search);

for (let i = 0; i < coursesTabs.length; i++) {
  coursesTabs[i].addEventListener("click", () => {
    onTabClick(coursesTabs[i]);
  });
}
