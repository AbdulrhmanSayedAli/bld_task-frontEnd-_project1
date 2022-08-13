////load corurses/////

let courses = [];
let isLoaded = false;
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

fetch("http://localhost:3000/courses")
  .then((resonse) => resonse.json())
  .then((json) => {
    isLoaded = true;
    coursesView.innerHTML = "";
    for (let i = 0; i < json.length; i++) {
      coursesView.innerHTML += getCourse(json[i]);
      courses.push(json[i]);
    }
  });

document.querySelector("nav form button").addEventListener("click", search);
