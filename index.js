// import * as THREE from "three";
import BimatterViewer from "bimatter-viewer";

const viewer = new BimatterViewer();
viewer.utils.useStats = true;
document.addEventListener("DOMContentLoaded", () => {
    viewer.utils.propsUtils.initPropConteiner(document.getElementById("props"));
    window.addEventListener("keydown", onKeyDown);
    const input = document.getElementById("file-input");
    const demoIfc = document.getElementById("demo-ifc");
    const demoBmt = document.getElementById("demo-bmt");
    const exportBmt = document.getElementById("export-bmt");

    const color = document.getElementById("color");
    const colorize = document.getElementById("colorize");
    color.style.display = "none";
    colorize.style.display = "none";
    const infoBut = document.getElementById("infoBut");
    const info = document.getElementById("info");
    infoBut.addEventListener("mouseenter", () => {
        info.style.display = "block";
    });
    infoBut.addEventListener("mouseleave", () => {
        info.style.display = "none";
    });
    addInfoLoader(info);
    var curColor = "#454545";
    colorize.addEventListener("click", () => {
        viewer.utils.geometryUtils.createGeometryChunk({
            modelID: 0,
            ids: Array.from(viewer.selector.selectedElements[0]),
            color: curColor,
        });
    });
    color.addEventListener("change", (e) => {
        curColor = e.target.value;
    });
    input.addEventListener(
        "change",
        async (changed) => {
            for (const file of changed.target.files) {
                await viewer.loadModel(file, true);
                demoIfc.remove();
                demoBmt.remove();
            }
            if (changed.target.files.length === 1) {
                exportBmt.style.display = "block";
                input.remove();
                color.style.display = "block";
                colorize.style.display = "block";
            }
            addInfoViewer(info);
        },
        false
    );
    demoIfc.addEventListener("click", () => {
        viewer
            .loadModel("/bimatter-viewer-demo/model.ifc", true)
            .then((model) => {
                console.log(model);
                console.log(viewer);
            });
        demoIfc.remove();
        demoBmt.remove();
        exportBmt.style.display = "block";
        input.remove();
        addInfoViewer(info);
    });
    demoBmt.addEventListener("click", () => {
        viewer
            .loadModel("/bimatter-viewer-demo/model.bmt", true)
            .then((model) => {
                console.log(model);
                console.log(viewer);
            });
        // viewer.loadModel("/model.bmt", true).then((model) => {
        //     console.log(model);
        //     console.log(viewer);
        // });
        demoIfc.remove();
        demoBmt.remove();
        exportBmt.style.display = "block";
        input.remove();
        addInfoViewer(info);
    });
    exportBmt.addEventListener("click", () => {
        if (viewer && viewer.models[0]) {
            viewer.utils.exportUtils.exportBMT(0);
        }
    });
    // demoIfc.click();
    // demoBmt.click();
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
function createH3(parent, text) {
    const h = document.createElement("h3");
    h.textContent = text;
    parent.appendChild(h);
}
function createDiv(parent, text) {
    const div = document.createElement("div");
    div.innerHTML = text;
    div.style.marginBottom = "5px";
    parent.appendChild(div);
}
function addInfoViewer(parent) {
    parent.innerHTML = "";
    createH3(parent, "Mouse events");
    createDiv(parent, '"O" - Set mouse orbit on mouse position');
    createDiv(parent, "Right click - Select element");
    createDiv(parent, "Shift + Right click - Multi selection");
    createDiv(parent, "Shift + Mouse dragging - Box selection");
    createH3(parent, "Visibility events");
    createDiv(parent, '"H" - Hide selected elements');
    createDiv(parent, '"I" - Isolate selected elements');
    createDiv(parent, '"C" - Clear hidding/isolating');
    createH3(parent, "Clipping events");
    createDiv(parent, '"P" - Create clipping plane on mouse position');
    createDiv(parent, 'Alt + "P" - Remove clipping planes');
    createDiv(parent, '"P" - Create clipping plane on mouse position');
    createH3(parent, "Colorize events");
    createDiv(parent, "Select element and click color button to colorizing");
    createDiv(parent, 'Alt + "C" - Reset colorizing');
    parent.style.height = "510px";
}
function addInfoLoader(parent) {
    createH3(parent, "Loader");
    createDiv(
        parent,
        "Choose files - use Shift or Ctrl to select more then 1 file"
    );
    createDiv(parent, "Load demo ifc - load demo file using Ifc format");
    createDiv(
        parent,
        "Load demo bmt - load demo file using our own compressed format"
    );
    parent.style.height = "210px";
}
window.viewer = viewer;
