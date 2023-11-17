import { renderer, scene, camera } from "./setup.js";

// Helper function for some simple rotation
export function presentationRotation(group) {
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
}

// Debugging function
export function describeGeometryOnConsole(models) {
  for (const key in models) {
    console.log(key);
    console.log(models[key]);
  }
}

// A function that allows the scene to be rendered repeatedly
export function animate(models) {
  requestAnimationFrame(() => animate(models));
  // console.log(models);
  for (const model of models) {
    if (!model) continue;

    try {
      presentationRotation(model);
    } catch (e) {
      console.error(e);
    }

  }

  renderer.render(scene, camera);
}
