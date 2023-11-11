import debounce from 'lodash/debounce';
import * as THREE from 'three';
import TWEEN from 'three/examples/jsm/libs/tween.module';
import init from './init';
import {
	materialBark,
	materialDoorWood,
	materialGlassStained,
	materialGlassWindow,
	materialPaperWrinkled,
	materialSapphire,
	materialSkinLizard,
	materialStylizedFur,
	materialTiles,
} from './textures';

import './style.css';

const { sizes, camera, scene, canvas, controls, renderer, stats, gui } = init();

const lightColor = 0xffffff;
const lightIntensity = 4;
const light = new THREE.AmbientLight(lightColor, lightIntensity);

scene.add(light);

scene.background = new THREE.Color(0x004537);

camera.position.z = 22;

const figuresGroup = new THREE.Group();

const GEOMETRIES = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.ConeGeometry(1, 2, 16, 4),
  new THREE.CylinderGeometry(0.75, 1, 2.25, 16, 4),
  new THREE.TetrahedronGeometry(1, 0),
  new THREE.TorusGeometry(1, 0.5, 16, 100),
  new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 5),
  new THREE.DodecahedronGeometry(1, 0),
  new THREE.OctahedronGeometry(1, 0),
  new THREE.SphereGeometry(1, 32, 16),
];

const TEXTURES = [
  materialDoorWood,
  materialBark,
  materialGlassStained,
  materialPaperWrinkled,
  materialSkinLizard,
  materialGlassWindow,
  materialSapphire,
  materialTiles,
  materialStylizedFur,
];

// const COLORS = [0x53e0a7, 0xec933b, 0xd5a5ff, 0xa5ffa8, 0xfaffa5];

let geometryIndex = 0;
let activeIndex = -1;

// Создаём и заполняем сетку из массива заданных геометрий
for (let i = -5; i <= 5; i += 5) {
  for (let j = -5; j <= 5; j += 5) {
    const mesh = new THREE.Mesh(
      GEOMETRIES[geometryIndex],
      TEXTURES[geometryIndex],
    );
    const geometryType = GEOMETRIES[geometryIndex].type;

    const figureGUIFolder = gui.addFolder(
      `${geometryType} [${i}, ${j}] settings`,
    );

    figureGUIFolder.add(mesh, 'visible').name('Is visible?');
    figureGUIFolder
      .add(mesh.scale, 'x')
      .min(1)
      .max(4)
      .step(0.25)
      .name('Scale x');
    figureGUIFolder
      .add(mesh.scale, 'y')
      .min(1)
      .max(4)
      .step(0.25)
      .name('Scale y');

    mesh.position.set(i, j, 10);
    mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv;
    mesh.currentIndex = geometryIndex;
    mesh.basicPosition = new THREE.Vector3(i, j, 10);
    figuresGroup.add(mesh);

    geometryIndex += 1;
  }
}

scene.add(figuresGroup);

const resetActiveFigure = () => {
  // figuresGroup.children[activeIndex].material.color.set('gray');
  // При помощи GSAP анимируем приближение выбранной фигуры
  new TWEEN.Tween(figuresGroup.children[activeIndex].position)
    .to(
    {
      x: figuresGroup.children[activeIndex].basicPosition.x,
        y: figuresGroup.children[activeIndex].basicPosition.y,
      z: figuresGroup.children[activeIndex].basicPosition.z,
    },
      Math.random() * 1000 + 500,
    )
    .easing(TWEEN.Easing.Exponential.InOut)
    .start();
  activeIndex = -1;
};

const clock = new THREE.Clock();

const tick = () => {
  stats.begin();
  const delta = clock.getDelta();

  if (activeIndex !== -1) {
    // Вращаем нашу активную фигурку
    figuresGroup.children[activeIndex].rotation.y += delta * 0.5;
  }

  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
  stats.end();
  window.requestAnimationFrame(tick);
};
tick();

// Добавим отслеживание кликов по фигурам
// В данной ситуации обычный addEventListener на click не подойдёт, т.к.
// сетки — сущности внутри Canvas, а не DOM
// Таким образом, нам нужен функционал Raycaster https://threejs.org/docs/#api/en/core/Raycaster
// TODO: доработать ограничение клика при нажатии на объект в центре:
// если есть активный,убирать его, если нет активного — выбирать центральный
const raycaster = new THREE.Raycaster();
const handleFigureClick = (event) => {
  const pointer = new THREE.Vector2();
  // Нормализуем значения координат курсора
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const figuresClickIntersections = raycaster.intersectObjects(
    figuresGroup.children,
  );

  // Сбрасываем состояние до дефолтного у предыдущей активной фигуры
  if (activeIndex !== -1) resetActiveFigure();

  figuresClickIntersections.forEach((figure) => {
    // figure.object.material.color.set(COLORS[Math.floor(Math.random() * 4 + 1)]);

    activeIndex = figure.object.currentIndex;

    // При помощи GSAP анимируем приближение выбранной фигуры
    new TWEEN.Tween(figure.object.position)
      .to(
      {
        x: 0,
        y: 0,
        z: 18,
      },
        Math.random() * 1000 + 500,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  });
};

window.addEventListener('click', handleFigureClick);

// TODO: добавить кнопочку 'reset' для возвращения сцены к дефолтному состоянию

/** Базовые обработчики событий для поддержки ресайза */
window.addEventListener(
  'resize',
  debounce(() => {
    // Обновляем размеры
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
  }, 200),
);

window.addEventListener(
  'dblclick',
  debounce(() => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, 200),
);
