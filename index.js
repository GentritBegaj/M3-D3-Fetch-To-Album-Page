window.onload = () => {};

// let hideButtons = document.querySelectorAll(".btn-outline-secondary");
// hideButtons.forEach((button) =>
//   button.addEventListener("click", alert("clicked"))
// );

function hideCard(e) {
  document.querySelectorAll(".card")[e].style.display = "none";
}

const loadPictures = async () => {
  const response = await fetch("http://www.splashbase.co/api/v1/images/latest");
  const parsedJSON = await response.json();
  console.log(parsedJSON);
  createCard(parsedJSON.images);
};

const createCard = async (data) => {
  let picturesRow = document.querySelector(".pictures-row");
  data.forEach((item, idx) => {
    picturesRow.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card mb-4 shadow-sm" style="height:300px">
                <img src="${item.url}"  alt="" style=" width=200px; height:180px">
                <div class="card-body">
                  <p class="card-text">
                    This is a wider card with a pic
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        id=${idx}
                        onclick="hideCard(this.id)"
                        
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
};
