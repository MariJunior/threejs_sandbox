import * as dat from "lil-gui";
import Stats from "stats.js";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const init = () => {
  const canvas = document.getElementById("threejs-canvas");

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new Scene();

  const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Вызываем отображение статистики приложения. По умолчанию — панель FPS
  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  const gui = new dat.GUI({ closeFolders: true });

  const renderer = new WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  return { sizes, scene, canvas, camera, renderer, controls, stats, gui };
};

export default init;
