export default class Sphere {
  #canvas;
  #ctx;
  #imageData;
  #radius;

  #lightSource = [0, 40, 500];
  #observer = [0, 0, 500];

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
    const [i, j] = this.indexToCircleCords(x);

    return Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) <= this.#radius;
  }

  draw() {
    for (let i = 0; i < this.#imageData.data.length; i += 4) {
      // Modify pixel data
      if (this.insideCircle(i / 4)) {
        const [x, y] = this.indexToCircleCords(i / 4);
        const z = this.circleCordsToZ(x, y);
        const N = [-x, -y, -z];
        const L = [
          this.#lightSource[0] - x,
          this.#lightSource[1] - y,
          this.#lightSource[2] - z,
        ];
        const V = [];
        const cosb =
          -this.scalarMultiply(L, N) /
          (this.vectorLength(N) * this.vectorLength(L));

        this.#imageData.data[i + 0] = this.indexToZ(i / 4) / 1.25; // R value
        this.#imageData.data[i + 1] = 0; // G value
        this.#imageData.data[i + 2] = 210; // B value
        this.#imageData.data[i + 3] = 255; // A value
      }
    }

    // Draw image data to the canvas
    this.#ctx.putImageData(this.#imageData, ...this.imageDataCentre());
  }

  indexToCircleCords(x) {
    return [
      Math.floor(x / this.#imageData.width) - this.#radius,
      (x % this.#imageData.width) - this.#radius,
    ];
  }

  indexToZ(x) {
    const [i, j] = this.indexToCircleCords(x);
    const len = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
    return Math.sqrt(Math.pow(this.#radius, 2) - Math.pow(len, 2));
  }

  circleCordsToZ(i, j) {
    const len = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
    return Math.sqrt(Math.pow(this.#radius, 2) - Math.pow(len, 2));
  }

  scalarMultiply(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
    return sum;
  }

  vectorLength([x, y, z]) {
    return Math.sqrt(x * x + y * y + z * z);
  }
}
