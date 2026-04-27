const imageInput = document.getElementById("imageInput");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let image = new Image();
let imageLoaded = false;

// Load image
imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

// When image is ready
image.onload = function () {
    imageLoaded = true;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
};

// Generate meme
function generateMeme() {
    if (!imageLoaded) {
        alert("Please upload an image first!");
        return;
    }

    // Clear and redraw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    let fontSize = canvas.width / 10;

    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    // Top text
    ctx.fillText(topText.toUpperCase(), canvas.width / 2, fontSize);
    ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fontSize);

    // Bottom text
    ctx.fillText(
        bottomText.toUpperCase(),
        canvas.width / 2,
        canvas.height - 20
    );
    ctx.strokeText(
        bottomText.toUpperCase(),
        canvas.width / 2,
        canvas.height - 20
    );
}