import "./styles/reset.css";
import Sphere from "./modules/Sphere";

const sphere = new Sphere("#canvas", 100);

window.addEventListener("resize", () => {
  sphere.render();
});
