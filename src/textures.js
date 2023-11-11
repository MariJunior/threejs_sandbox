import {
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader
} from 'three';

function createMaterial({
  colorMapUrl,
  alphaMapUrl,
  ambientOcclusionUrl,
  heightMapUrl,
  metallicMapUrl,
  normalMapUrl,
  roughnessMapUrl,
}) {
  const textureLoader = new TextureLoader();
  const textureColor = textureLoader.load(colorMapUrl);
  textureColor.colorSpace = SRGBColorSpace;

  let textureAlpha;
  let textureAO;
  let textureHeight;
  let textureMetallic;
  let textureNormal;
  let textureRoughness;

  if (alphaMapUrl) textureAlpha = textureLoader.load(alphaMapUrl);
  if (ambientOcclusionUrl) textureAO = textureLoader.load(ambientOcclusionUrl);
  if (heightMapUrl) textureHeight = textureLoader.load(heightMapUrl);
  if (metallicMapUrl) textureMetallic = textureLoader.load(metallicMapUrl);
  if (normalMapUrl) textureNormal = textureLoader.load(normalMapUrl);
  if (roughnessMapUrl) textureRoughness = textureLoader.load(roughnessMapUrl);

  const material = new MeshStandardMaterial({
    map: textureColor,
    alphaMap: textureAlpha,
    transparent: textureAlpha !== undefined,
    displacementMap: textureHeight,
    displacementScale: 0.1,
    aoMap: textureAO,
    metalnessMap: textureMetallic,
    metalness: textureMetallic !== undefined ? 0.5 : 0.0,
    normalMap: textureNormal,
    roughnessMap: textureRoughness,
    roughness: 0.5,
  });

  return material;
}

const materialBark = createMaterial({
  colorMapUrl: '/textures/bark/bark-BaseColor.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl: '/textures/bark/bark-AmbientOcclusion.jpg',
  heightMapUrl: '/textures/bark/bark-Height.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/bark/bark-Normal.jpg',
  roughnessMapUrl: '/textures/bark/bark-Roughness.jpg',
});

const materialDoorWood = createMaterial({
  colorMapUrl: '/textures/door-wood/door-wood-basecolor.jpg',
  alphaMapUrl: '/textures/door-wood/door-wood-opacity.jpg',
  ambientOcclusionUrl: '/textures/door-wood/door-wood-ambientOcclusion.jpg',
  heightMapUrl: '/textures/door-wood/door-wood-height.png',
  metallicMapUrl: '/textures/door-wood/door-wood-metallic.jpg',
  normalMapUrl: '/textures/door-wood/door-wood-normal.jpg',
  roughnessMapUrl: '/textures/door-wood/door-wood-roughness.jpg',
});

const materialGlassStained = createMaterial({
  colorMapUrl: '/textures/glass-stained/glass-stained-basecolor.jpg',
  alphaMapUrl: '/textures/glass-stained/glass-stained-Glass.jpg',
  ambientOcclusionUrl:
    '/textures/glass-stained/glass-stained-ambient-occlusion.jpg',
  heightMapUrl: '/textures/glass-stained/glass-stained-height.png',
  metallicMapUrl: '/textures/glass-stained/glass-stained-metallic.jpg',
  normalMapUrl: '/textures/glass-stained/glass-stained-normal.jpg',
  roughnessMapUrl: '/textures/glass-stained/glass-stained-roughness.jpg',
});

const materialGlassWindow = createMaterial({
  colorMapUrl: '/textures/glass-window/glass-window-basecolor.jpg',
  alphaMapUrl: '/textures/glass-window/glass-window-opacity.jpg',
  ambientOcclusionUrl:
    '/textures/glass-window/glass-window-ambient-occlusion.jpg',
  heightMapUrl: '/textures/glass-window/glass-window-height.png',
  metallicMapUrl: '/textures/glass-window/glass-window-metallic.jpg',
  normalMapUrl: '/textures/glass-window/glass-window-normal.jpg',
  roughnessMapUrl: '/textures/glass-window/glass-window-roughness.jpg',
});

const materialPaperWrinkled = createMaterial({
  colorMapUrl: '/textures/paper-wrinkled/paper-wrinkled-basecolor.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl:
    '/textures/paper-wrinkled/paper-wrinkled-ambient-occlusion.jpg',
  heightMapUrl: '/textures/paper-wrinkled/paper-wrinkled-height.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/paper-wrinkled/paper-wrinkled-normal.jpg',
  roughnessMapUrl: '/textures/paper-wrinkled/paper-wrinkled-roughness.jpg',
});

const materialSapphire = createMaterial({
  colorMapUrl: '/textures/sapphire/sapphire-color.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl: '/textures/sapphire/sapphire-occ.jpg',
  heightMapUrl: '/textures/sapphire/sapphire-disp.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/sapphire/sapphire-norm.jpg',
  roughnessMapUrl: '/textures/sapphire/sapphire-rough.jpg',
});

const materialSkinLizard = createMaterial({
  colorMapUrl: '/textures/skin-lizard/skin-lizard-basecolor.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl:
    '/textures/skin-lizard/skin-lizard-ambient-occlusion.jpg',
  heightMapUrl: '/textures/skin-lizard/skin-lizard-height.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/skin-lizard/skin-lizard-normal.jpg',
  roughnessMapUrl: '/textures/skin-lizard/skin-lizard-roughness.jpg',
});

const materialStylizedFur = createMaterial({
  colorMapUrl: '/textures/stylized-fur/stylized-fur-basecolor.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl:
    '/textures/stylized-fur/stylized-fur-ambient-occlusion.jpg',
  heightMapUrl: '/textures/stylized-fur/stylized-fur-height.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/stylized-fur/stylized-fur-normal.jpg',
  roughnessMapUrl: '/textures/stylized-fur/stylized-fur-roughness.jpg',
});

const materialTiles = createMaterial({
  colorMapUrl: '/textures/tiles/tiles-basecolor.jpg',
  alphaMapUrl: null,
  ambientOcclusionUrl: '/textures/tiles/tiles-ambient-occlusion.jpg',
  heightMapUrl: '/textures/tiles/tiles-height.png',
  metallicMapUrl: null,
  normalMapUrl: '/textures/tiles/tiles-normal.jpg',
  roughnessMapUrl: '/textures/tiles/tiles-roughness.jpg',
});

export {
  materialBark,
  materialDoorWood,
  materialGlassStained,
  materialGlassWindow,
  materialPaperWrinkled,
  materialSapphire,
  materialSkinLizard,
  materialStylizedFur,
  materialTiles
};

