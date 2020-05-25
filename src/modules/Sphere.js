export default class Sphere {
  #canvas;
  #ctx;
  #imageData;
  #radius;

  constructor(canvasQuery, radius) {
    this.#canvas = document.querySelector(canvasQuery);
    this.#ctx = this.#canvas.getContext("2d");
    this.#imageData = this.#ctx.createImageData(2 * radius + 1, 2 * radius + 1); // nieparzyste wymiary, żeby środek był jednym pixelem
    this.#radius = radius;

    this.render();
  }

  imageDataCentre() {
    return [
      this.#canvas.scrollWidth / 2 - this.#imageData.width / 2,
      this.#canvas.scrollHeight / 2 - this.#imageData.height / 2,
    ];
  }

  render() {
    const width = this.#canvas.parentElement.clientWidth;
    const height = window.innerHeight;
    this.#canvas.width = width;
    this.#canvas.height = height;

    this.draw();
  }

  insideCircle(x) {
    const i = Math.floor(x / this.#imageData.width);
    const j = x % this.#imageData.width;
    const ci = this.#radius;
    const cj = this.#radius;
    const len = Math.sqrt(Math.pow(i - ci, 2) + Math.pow(j - cj, 2));
    return len <= this.#radius;
  }

  draw() {
    for (let i = 0; i < this.#imageData.data.length; i += 4) {
      // Modify pixel data
      if (this.insideCircle(i / 4)) {
        this.#imageData.data[i + 0] = 190; // R value
        this.#imageData.data[i + 1] = 0; // G value
        this.#imageData.data[i + 2] = 210; // B value
        this.#imageData.data[i + 3] = 255; // A value
      }
    }

    // Draw image data to the canvas
    this.#ctx.putImageData(this.#imageData, ...this.imageDataCentre());
  }
}
