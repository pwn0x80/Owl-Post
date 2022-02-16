const uploadSpace = document.querySelector(".upload__box__drop");
const linkGenerator = document.querySelector(".upload__box__drop__title");
const harryImg = document.querySelector(".harry__img");
const uploadBtn = document.querySelector(".browsebtn");
const fileInput = document.querySelector(".input__file");
const host = "https://owl-mail.herokuapp.com/";

uploadSpace.addEventListener("dragleave", (e) => {
  harryImg.classList.remove("upload-animation");
});

uploadSpace.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadSpace.classList.remove("upload-animation");
  const files = e.dataTransfer.files;
  if (files.length) {
    //FILES DIRECT UPLOAD
    fileInput.files = files;
    //calling axios
    uFile();
  }
});
fileInput.addEventListener("change", uFile);
uploadSpace.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!harryImg.classList.add("upload-animation")) {
    harryImg.classList.add("upload-animation");
  }
});

//call uploadFile

function dataResponse(response) {
  return response.data;
}
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

var config = {
  Headers: {
    "Content-Type": "multipart/form-data",
  },

  onUploadProgress: function (progressEvent) {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    //Todo
    console.log(percentCompleted);
  },
};
//support one file only
async function uFile() {
  const file = fileInput.files;
  const formData = new FormData();
  formData.append("u", file[0]);
  // axios support upoload progress
  axios
    .post(`${host}api/mail`, formData, config)
    .then(function (res) {
      displayLink(res["data"]["file"]);
    })
    .catch(function (erro) {
      console.error(`something went wrong please check here - ${erro}`);
    });
}
// link
const displayLink = (file) => {
  console.log();
  var linkAncor = document.createElement("a");
  linkAncor.textContent = "Click Here";
  linkGenerator.appendChild(linkAncor);

  linkAncor.className = "your-Mail";
  linkAncor.href = file;
  linkGenerator.appendChild(linkAncor);
};
