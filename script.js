const upload = document.getElementById("upload"); 
const preview = document.getElementById("preview"); 
const widthInput = document.getElementById("width"); 
const heightInput = document.getElementById("height"); 
const resizeBtn = document.getElementById("resizeBtn"); 
const canvas = document.getElementById("canvas"); 
const lockRatio = document.getElementById("aspect-ratio"); 
const download = document.getElementById("download"); 

let originalWidth, originalHeight;

upload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      preview.onload = function () {
        originalWidth = preview.naturalWidth;
        originalHeight = preview.naturalHeight;
        widthInput.value = originalWidth;
        heightInput.value = originalHeight;
      };
    };
    reader.readAsDataURL(file); 
  }
});

widthInput.addEventListener("input", () => {
  if (lockRatio.checked) {
    const ratio = originalHeight / originalWidth;
    heightInput.value = Math.round(widthInput.value * ratio); 
  }
});

heightInput.addEventListener("input", () => {
  if (lockRatio.checked) {
    const ratio = originalWidth / originalHeight;
    widthInput.value = Math.round(heightInput.value * ratio); 
  }
});

resizeBtn.addEventListener("click", () => {
  const width = parseInt(widthInput.value);
  const height = parseInt(heightInput.value);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(preview, 0, 0, width, height);

  const dataURL = canvas.toDataURL("image/png");
  download.href = dataURL;
  download.style.display = "inline";
});