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
const loadSecondaryPictures = async () => {
  let searchFieldValue = document.querySelector("#searchField").value;
  console.log(searchFieldValue);
  if (searchFieldValue !== "") {
    const response = await fetch(
      `http://www.splashbase.co/api/v1/images/search?query=${searchFieldValue}`
    );
    const parsedJSON = await response.json();
    console.log(parsedJSON);
    createCard(parsedJSON.images);
  } else return;
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
                        class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal"
                        
                      >
                        View
                      </button>
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <img src="${item.url}" class="img-fluid"  alt="" >
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
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
