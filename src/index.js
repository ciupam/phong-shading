import "./styles/reset.css";
import Sphere from "./modules/Sphere";

const sphere = new Sphere("#canvas", 300);

window.addEventListener("resize", () => {
  sphere.render();
});
