<template>
  <div class="skills">
    <h2>Skills</h2>
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  mounted() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(this.$refs.canvas.clientWidth, this.$refs.canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    this.$refs.canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const rectangleWidth = 30;
    const rectangleHeight = 20;
    const rectangleGeometry = new THREE.PlaneGeometry(rectangleWidth, rectangleHeight);
    const rectangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    rectangle.rotation.x = Math.PI / 2;
    scene.add(rectangle);


    const spheres = [];
    const sphereTextures = [
      require('../assets/Textures/Git.png'),
      require('../assets/Textures/Laravel.png'),
      require('../assets/Textures/Python.png'),
      require('../assets/Textures/Three.png'),
      require('../assets/Textures/Docker.png'),
      require('../assets/Textures/Sass.png'),
      require('../assets/Textures/Node.png'),
      require('../assets/Textures/GSAP.png'),
      require('../assets/Textures/React.png'),
      require('../assets/Textures/Tailwind.png'),
      require('../assets/Textures/Typescript.png'),
      require('../assets/Textures/Nuxt.png'),
      require('../assets/Textures/HTML.png'),
      require('../assets/Textures/CSS.png'),
      require('../assets/Textures/ES6.png'),
      require('../assets/Textures/Vue.png'),
    ];

    let draggedObject = null;
    let isDragging = false;
    let velocity = new THREE.Vector2();
    let previousMousePosition = new THREE.Vector2();
    const friction = 0.98;
    const damping = 0.9;

    const canvasWidth = this.$refs.canvas.clientWidth;
    const canvasHeight = this.$refs.canvas.clientHeight;

    console.log('Canvas dimensions:', canvasWidth, canvasHeight);
    let k = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(sphereTextures[k]);
        texture.repeat.set(1, 1);
        texture.offset.set(-0.12, 0.25);
        const material = new THREE.MeshPhongMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);

        const x = (j % 4) * 4 - 6;
        const y = (i % 4) * 4 - 6;

        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = 1;
        sphere.velocity = new THREE.Vector2();
        sphere.energy = 1000;
        scene.add(sphere);
        spheres.push(sphere);
        k+=1;
      }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 200, 100);
    pointLight.position.set(0, 11, 3);
    scene.add(pointLight);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const checkCollision = (sphere1, sphere2) => {
      const collisionThreshold = 2;
      const dx = sphere1.position.x - sphere2.position.x;
      const dy = sphere1.position.y - sphere2.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < collisionThreshold;
    };

    const resolveSphereCollision = (sphere1, sphere2) => {
      const dx = sphere1.position.x - sphere2.position.x;
      const dy = sphere1.position.y - sphere2.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const collisionDistance = 2;

      if (distance < collisionDistance) {
        const normalX = dx / distance;
        const normalY = dy / distance;

        const relativeVelocityX = sphere1.velocity.x - sphere2.velocity.x;
        const relativeVelocityY = sphere1.velocity.y - sphere2.velocity.y;

        const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (velocityAlongNormal > 0) return;

        const energyTransfer = Math.min(sphere1.energy * 0.64, sphere1.energy);
        sphere1.energy = Math.max(0, sphere1.energy - energyTransfer - 100);
        
        sphere2.energy = Math.max(0, Math.min(1000, sphere2.energy + energyTransfer - 100));

        const bounce = 0.3;
        const dampingFactor = 0.4;

        const impulse = -(1 + bounce) * velocityAlongNormal;
        const impulseX = impulse * normalX;
        const impulseY = impulse * normalY;

        sphere1.velocity.x += impulseX * dampingFactor;
        sphere1.velocity.y += impulseY * dampingFactor;
        sphere2.velocity.x -= impulseX * dampingFactor;
        sphere2.velocity.y -= impulseY * dampingFactor;

        const overlap = collisionDistance - distance;
        const correctionX = (overlap / 2) * normalX;
        const correctionY = (overlap / 2) * normalY;

        sphere1.position.x += correctionX;
        sphere1.position.y += correctionY;
        sphere2.position.x -= correctionX;
        sphere2.position.y -= correctionY;
      }
    };

    const checkBorderCollision = (sphere) => {
      const radius = 1;

      const leftBorder = -rectangleWidth / 2;
      const rightBorder = rectangleWidth / 2;
      const topBorder = 10;
      const bottomBorder = -10;


      if (sphere.position.x - radius < leftBorder || sphere.position.x + radius > rightBorder) {
        sphere.velocity.x *= -1;
        sphere.position.x = Math.max(leftBorder + radius, Math.min(sphere.position.x, rightBorder - radius));
      }

      if (sphere.position.y - radius < bottomBorder || sphere.position.y + radius > topBorder) {
        sphere.velocity.y *= -1;
        sphere.position.y = Math.max(bottomBorder + radius, Math.min(sphere.position.y, topBorder - radius));
      }
    };

    const floatAmplitude = 0.001;
    const floatSpeed = 0.5;

    const animate = function () {
      requestAnimationFrame(animate);

      spheres.forEach((sphere, index) => {
        sphere.position.x += sphere.velocity.x;
        sphere.position.y += sphere.velocity.y;

        sphere.velocity.x *= friction;
        sphere.velocity.y *= friction;

        checkBorderCollision(sphere);

        sphere.position.y += Math.sin(Date.now() * 0.001 * floatSpeed + index) * floatAmplitude;

        if (Math.abs(sphere.velocity.x) < 0.001 && Math.abs(sphere.velocity.y) < 0.001) {
          sphere.velocity.set(0, 0);
        }

        for (let j = index + 1; j < spheres.length; j++) {
          if (checkCollision(sphere, spheres[j])) {
            resolveSphereCollision(sphere, spheres[j]);
          }
        }
      });

      renderer.render(scene, camera);
    };

    this.$refs.canvas.addEventListener('mousedown', (event) => {
      const rect = this.$refs.canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres);

      if (intersects.length > 0) {
        draggedObject = intersects[0].object;
        isDragging = true;
        previousMousePosition.set(mouse.x, mouse.y);
      }
    });

    this.$refs.canvas.addEventListener('mousemove', (event) => {
      if (isDragging && draggedObject) {
        const rect = this.$refs.canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const deltaX = mouse.x - previousMousePosition.x;
        const deltaY = mouse.y - previousMousePosition.y;

        const speedMultiplier = 5;
        draggedObject.position.x += deltaX * speedMultiplier;
        draggedObject.position.y += deltaY * speedMultiplier;

        velocity.set(deltaX * speedMultiplier, deltaY * speedMultiplier);

        const maxSpeed = 5;
        if (velocity.length() > maxSpeed) {
          velocity.normalize().multiplyScalar(maxSpeed);
        }

        previousMousePosition.set(mouse.x, mouse.y);
      }
    });


    this.$refs.canvas.addEventListener('mouseup', () => {
      if (isDragging && draggedObject) {
        draggedObject.velocity.copy(velocity);
      }
      isDragging = false;
      draggedObject = null;
    });
    const onWindowResize = () => {
      if (this.$refs.canvas) {
        camera.aspect = this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(this.$refs.canvas.clientWidth, this.$refs.canvas.clientHeight);
      }
    };

    window.addEventListener('resize', onWindowResize);
    animate();
  },

  beforeUnmount() {
    if (this.onWindowResize) {
      window.removeEventListener('resize', this.onWindowResize);
    }
  },
};
</script>

<style scoped>
.canvas {
  width: 100vw;
  height: 90%;
}
.skills {
  height: 100vh;
}
</style>
