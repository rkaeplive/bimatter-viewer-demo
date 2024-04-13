// import * as THREE from "three";
import BimatterViewer from "bimatter-viewer";

const viewer = new BimatterViewer();
viewer.utils.useStats = true;
document.addEventListener("DOMContentLoaded", () => {
    viewer.utils.propsUtils.initPropConteiner(document.getElementById("props"));
    window.addEventListener("keydown", onKeyDown);

    const infoBut = document.getElementById("infoBut");
    const info = document.getElementById("info");
    infoBut.addEventListener("mouseenter", () => {
        info.style.display = "block";
    });
    infoBut.addEventListener("mouseleave", () => {
        info.style.display = "none";
    });
    viewer.loadModel("/model.bmt", true).then((model) => {
        console.log(model);
        console.log(viewer);
    });
});

// viewer.loadModel("/model.bmt", true).then((model) => {
//     console.log(model);
//     console.log(viewer);
// });

function onKeyDown(event) {
    // if (event.shiftKey) {
    //     const time = Date.now();
    //     viewer.bvhManager.applyThreeMeshBVH(
    //         viewer.models[0].geometry.threeGeometry.geometry
    //     );

    //     console.log(Date.now() - time, "ms");
    // }
    if (event.keyCode === 9) {
        event.preventDefault();
        viewer.selector.preSelection.setDeep;
    }
    if (event.code === "KeyH") {
        if (!viewer.selector.isSelected) return;
        viewer.utils.geometryUtils.hideSelectedElements();
    }
    if (event.code === "KeyI") {
        if (!viewer.selector.isSelected) return;
        viewer.utils.geometryUtils.isolateSelectedElements();
    }
    if (event.code === "KeyC") {
        if (event.altKey) {
            viewer.utils.geometryUtils.resetAllModelsChunks();
        } else {
            viewer.utils.geometryUtils.showAll();
        }
    }
    if (event.code === "KeyO") {
        viewer.context.controls.setOrbitByClick();
    }
    if (event.code === "KeyP") {
        if (event.altKey) {
            viewer.utils.clippingUtils.deleteAllPlanes();
        } else {
            const plane = viewer.utils.clippingUtils.createPlane();
        }
    }
}
window.viewer = viewer;
