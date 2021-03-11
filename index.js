function hideCard(e) {
  document.querySelectorAll(".card")[e].style.display = "none";
}

const loadPictures = async () => {
  const response = await fetch("http://www.splashbase.co/api/v1/images/latest");
  const parsedJSON = await response.json();
  console.log(parsedJSON);
  createCard(parsedJSON.images);
};
const loadSecondaryPictures = async () => {
  let searchFieldValue = document.querySelector("#searchField").value;

  if (searchFieldValue !== "") {
    const response = await fetch(
      `http://www.splashbase.co/api/v1/images/search?query=${searchFieldValue}`
    );
    const parsedJSON = await response.json();
    console.log(parsedJSON);
    createCard(parsedJSON.images);
    getUrls(parsedJSON.images);
  } else return;
};

const getUrls = async (data) => {};

const createCard = async (data) => {
  let picturesRow = document.querySelector(".pictures-row");

  data.forEach((item, idx) => {
    picturesRow.innerHTML += `<div class="col col-12 col-sm-6 col-md-4 col-lg-3">
  <div class="card mb-4 shadow-sm" >
    <img src="${item.url}" alt="" style="height: 200px" />
    <div class="card-body">
      <p class="card-text">This is a wider card with a pic</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary view-btn"
            
            
          >
            View
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary hide-btn"
            
          >
            Hide
          </button>
        </div>
        <small class="text-muted">${item.id}</small>
      </div>
    </div>
  </div>
</div>`;
  });
  document
    .querySelectorAll(".hide-btn")
    .forEach((button) => button.addEventListener("click", hide));
  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", showModal);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
  });
};

const showModal = (e) => {
  let card = e.target.closest(".card");
  let image = card.querySelector("img");
  console.log(image);
  document.querySelector(
    ".modal-body"
  ).innerHTML = `<img src="${image.src}"  class="img-fluid" alt="">`;
};

function hide(e) {
  console.log(e.target);
  const card = e.target.closest(".card");
  // card.style.opacity = '0';
  const col = card.closest(".col");
  col.classList.add("animate__animated", "animate__faster", "animate__zoomOut");
  setTimeout(() => {
    col.remove();
  }, 500);
}

const addPicsToCarousel = async (data) => {
  document.querySelector(".carousel").classList.remove("d-none");
  let carouselInner = document.querySelector(".carousel-inner");
  data.images.forEach((item, idx) => {
    if (idx == 0) {
      carouselInner.innerHTML += `<div class="carousel-item active">
                                  <img src="${item.large_url}" class="d-block w-100" alt="...">
                                </div>`;
    } else {
      carouselInner.innerHTML += `<div class="carousel-item ">
                                  <img src="${item.large_url}" class="d-block w-100" alt="...">
                                </div>`;
    }
  });
};

const addCarousel = async () => {
  const response = await fetch(
    `http://www.splashbase.co/api/v1/images/search?query=forest`
  );
  const parsedResponse = await response.json();
  console.log(parsedResponse);
  addPicsToCarousel(parsedResponse);
};

// window.onload = () => {
//   addCarousel();
// };
