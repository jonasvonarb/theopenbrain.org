<template>
  <div ref="renderScreen" if="sceneBrain" class="fixed top-0 left-0 w-full h-full"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";

export default {
  data() {
    return {
      camera: "",
      scene: "",
      width3d: "",
      height3d: "",
      pixelHeight: "",
      pixelWidth: "",
      lineGeometrys: [],
      linePointPositions: [],
      pointVectors: [],
      p2d: [],
      menus: [],
      menusEl: document.getElementsByClassName("menus"),
      render: "",
      group: "",
      mouseDown: false,
      mouseX: 0,
      mouseY: 0,
      changeX: null,
      counter: 0,
    };
  },

  watch: {
    changeX(newX, oldX) {
      this.counter++;
      this.updateLine();
    },
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  mounted() {
    /* Scene */
    const scene = new THREE.Scene();
    this.scene = scene;
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera = camera;
    camera.position.set(0, 0, 300);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    /* Canvas Initalizing */
    var canvas = renderer.domElement;
    this.$refs.renderScreen.appendChild(canvas);

    /* Stats */
    // const stats = Stats();
    // document.body.appendChild(stats.dom).classList.add("stats");

    /* Light */
    const light = new THREE.AmbientLight(16777215, 1);
    light.castShadow = true;
    scene.add(light);
    const pointLight1 = new THREE.PointLight(16069427, 5, 500);
    pointLight1.position.set(100, 100, 100);
    pointLight1.castShadow = true;
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(7829503, 5, 1000);
    pointLight2.position.set(-100, 100, 100);
    pointLight2.castShadow = true;
    scene.add(pointLight2);

    this.onWindowResize();

    /* loader */
    const gltfLoader = new GLTFLoader();
    var group = new THREE.Group();
    this.group = group;

    var platzhalterMenupunkt;
    gltfLoader.load(
      "/assets/models/brain.gltf",
      function (gltf) {
        const model = gltf.scene.children[0];
        platzhalterMenupunkt = [gltf.scene.children[4], gltf.scene.children[3]];
        model.name = "brain";
        model.castShadow = true;
        model.receiveShadow = true;
        const punkt1 = gltf.scene.children[4];
        const punkt2 = gltf.scene.children[3];
        punkt1.name = "punkt1";
        punkt1.visible = false;
        punkt2.name = "punkt2";
        punkt2.visible = false;
        const diffuseColor = new THREE.Color().setHSL(alpha, 0.5, 0.25);
        var alpha = 1;
        model.traverse((o) => {
          if (o.isMesh)
            o.material = new THREE.MeshPhysicalMaterial({
              color: diffuseColor,
              metalness: 0,
              roughness: 0,
              clearcoat: 0.1,
              clearcoatRoughness: 0,
              reflectivity: 0.3,
            });
        });
        punkt1.traverse((o) => {
          if (o.isMesh) o.material = new THREE.MeshNormalMaterial();
        });
        punkt2.traverse((o) => {
          if (o.isMesh) o.material = new THREE.MeshNormalMaterial();
        });
        model.visible = true;
        group.name = "brainGroup";
        group.add(model);
        group.add(punkt1);
        group.add(punkt2);
        scene.add(group);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    /*----------- Action ---------*/

    var brain, pointInitial;

    var interval = setInterval(() => {
      brain = scene.getObjectByName("brain");
      if (brain) {
        if (brain.children.length > 0) {
          clearInterval(interval);
          for (var i = 0; i < this.menus.length; i++) {
            //line
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 16711680,
              linecap: "round",
              linejoin: "round", //ignored by WebGLRenderer
            });
            pointInitial = platzhalterMenupunkt[i % 2].position;
            this.pointVectors = [];
            var pointVector = new THREE.Vector3(
              pointInitial.x,
              pointInitial.y,
              pointInitial.z
            );
            this.pointVectors.push(pointVector);
            this.pointVectors.push(
              new THREE.Vector3(this.menus[i].x, this.menus[i].y, 0)
            );
            var lineGeometry = new THREE.BufferGeometry().setFromPoints(
              this.pointVectors
            );
            this.lineGeometrys.push(lineGeometry);
            var line = new THREE.Line(this.lineGeometrys[i], lineMaterial);
            line.name = "line" + i;
            this.scene.add(line);
          }
        }
      }
    }, 10);

    /* Render */
    var that = this;
    function animate() {
      var els = document.getElementsByClassName("menus");
      if (els.length > 0) {
        var value = els[els.length - 1].getBoundingClientRect().x;
        that.changeX = value;
      }

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // stats.update();
    }
    animate();
    window.addEventListener("resize", this.onWindowResize);
    this.addMouseHandler(document.getElementsByTagName("canvas")[0]);
  },
  methods: {
    onWindowResize() {
      const camera = this.camera;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      this.updateLine();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    visibleWidthAtZDepth(depth, camera) {
      const height = this.visibleHeightAtZDepth(depth, camera);
      return height * camera.aspect;
    },
    visibleHeightAtZDepth(depth, camera) {
      // compensate for cameras not positioned at z=0
      const cameraOffset = camera.position.z;
      if (depth < cameraOffset) depth -= cameraOffset;
      else depth += cameraOffset;
      // vertical fov in radians
      const vFOV = (camera.fov * Math.PI) / 180;
      // Math.abs to ensure the result is always positive
      return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
    },
    updateLine() {
      const camera = this.camera;
      this.width3d = this.visibleWidthAtZDepth(0, camera) / 2;
      this.height3d = this.visibleHeightAtZDepth(0, camera) / 2;
      this.pixelHeight =
        this.visibleHeightAtZDepth(0, camera) / window.innerHeight;
      this.pixelWidth =
        this.visibleWidthAtZDepth(0, camera) / window.innerWidth;

      for (var i = 0; i < this.menusEl.length; i++) {
        var pos = this.menusEl[i].getBoundingClientRect();

        this.p2d.push({
          px: pos.x + pos.width,
          py: pos.y + pos.height / 2,
        });
      }
      this.menus = [];
      for (var i = 0; i < this.p2d.length; i++) {
        this.menus.push({
          x: -(this.width3d - this.p2d[i].px * this.pixelWidth),
          y: this.height3d - this.p2d[i].py * this.pixelHeight,
          z: 0,
        });
      }

      if (this.lineGeometrys) {
        for (var i = 0; i < this.lineGeometrys.length; i++) {
          var e;
          if ((i + 1) % 2 == 0) {
            e = 2;
          } else {
            e = 1;
          }
          this.linePointPositions[i] = this.group.children[e].getWorldPosition(
            this.pointVectors[e - 1]
          );
        }
      }
      if (this.linePointPositions) {
        for (var i = 0; i < this.linePointPositions.length; i++) {
          var pointsNew = [];
          pointsNew.push(
            new THREE.Vector3(
              this.linePointPositions[i].x,
              this.linePointPositions[i].y,
              this.linePointPositions[i].z
            )
          );
          pointsNew.push(
            new THREE.Vector3(this.menus[i].x, this.menus[i].y, this.menus[i].z)
          );
          this.scene.traverse(function (child) {
            if (child.name === "line" + i) {
              child.geometry.setFromPoints(pointsNew);
            }
          });
        }
      }
    },
    onMouseMove(evt) {
      if (!this.mouseDown) {
        return;
      }
      evt.preventDefault();
      var deltaX = evt.clientX - this.mouseX,
        deltaY = evt.clientY - this.mouseY;
      this.mouseX = evt.clientX;
      this.mouseY = evt.clientY;
      var brainGroup = this.scene.getObjectByName("brainGroup");
      this.rotateScene(deltaX, deltaY, brainGroup);
    },
    onMouseDown(evt) {
      evt.preventDefault();
      this.mouseDown = true;
      this.mouseX = evt.clientX;
      this.mouseY = evt.clientY;
    },
    onMouseUp(evt) {
      evt.preventDefault();
      this.mouseDown = false;
    },
    addMouseHandler(canvas) {
      var that = this;
      canvas.addEventListener(
        "mousemove",
        function (e) {
          that.onMouseMove(e);
        },
        false
      );
      canvas.addEventListener(
        "mousedown",
        function (e) {
          that.onMouseDown(e);
        },
        false
      );
      canvas.addEventListener(
        "mouseup",
        function (e) {
          that.onMouseUp(e);
        },
        false
      );
    },
    rotateScene(deltaX, deltaY, root) {
      root.rotation.y += deltaX / 100;
      root.rotation.x += deltaY / 100;
      this.updateLine();
    },
  },
};
</script>

<style scoped></style>
