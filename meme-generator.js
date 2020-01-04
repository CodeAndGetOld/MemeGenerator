let topTextInput,
  textColor,
  textSize,
  bottomTextInput,
  imageInput,
  generateBtn,
  downloadBtn,
  canvas,
  ctx;
const generateMeme = (img, topText, bottomText, textSize, textColor) => {
  let fontSize;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = textColor;
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  // text size

  fontSize = canvas.width * textSize;
  ctx.font = fontSize + "px Impact";
  ctx.lineWidth = fontSize / 15;

  //top text

  ctx.textBaseline = "top";
  topText.split("\n").forEach((ttext, index) => {
    // ====> get new line when text written in more than one line
    ctx.fillText(ttext, canvas.width / 2, index * fontSize, canvas.width);
    ctx.strokeText(ttext, canvas.width / 2, index * fontSize, canvas.width);
  });

  // bottom text

  ctx.textBaseline = "bottom";

  bottomText
    .split("\n")
    .reverse()
    .forEach((btext, index) => {
      ctx.fillText(
        btext,
        canvas.width / 2,
        canvas.height - index * fontSize,
        canvas.width
      );
      ctx.strokeText(
        btext,
        canvas.width / 2,
        canvas.height - index * fontSize,
        canvas.width
      );
    });
};

const init = () => {
  topTextInput = document.getElementById("top-text");
  bottomTextInput = document.getElementById("bottom-text");
  textSize = document.getElementById("text-size");
  textColor = document.getElementById("text-color");
  generateBtn = document.getElementById("generate-btn");
  downloadBtn = document.getElementById("download-btn");
  imageInput = document.getElementById("image-input");
  canvas = document.getElementById("meme-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 0;

  // generate meme button functionality

  generateBtn.addEventListener("click", () => {
    let reader = new FileReader();
    console.log("click");
    reader.onload = () => {
      let img = new Image();
      img.src = reader.result;

      generateMeme(
        img,
        topTextInput.value,
        bottomTextInput.value,
        textSize.value,
        textColor.value
      );
    };
    reader.readAsDataURL(imageInput.files[0]);
  });

  // download button functionality

  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = `${topTextInput.value.split(" ").join("-") +
      "-" +
      bottomTextInput.value.split(" ").join("-")}.png`;
    a.click();
    document.body.removeChild(a);
  });
};

init();
