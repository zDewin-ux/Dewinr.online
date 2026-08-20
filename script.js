import * as THREE from "three";


// ============================================
// THREE.JS
// ============================================

const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(
  0x05070d,
  0.035
);


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 8;


const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);


// ============================================
// LUCES
// ============================================

const ambientLight =
  new THREE.AmbientLight(
    0x406080,
    1.5
  );

scene.add(ambientLight);


const blueLight =
  new THREE.PointLight(
    0x38bdf8,
    25,
    15
  );

blueLight.position.set(
  3,
  3,
  4
);

scene.add(blueLight);


const purpleLight =
  new THREE.PointLight(
    0x6366f1,
    20,
    15
  );

purpleLight.position.set(
  -4,
  -2,
  3
);

scene.add(purpleLight);


// ============================================
// GRUPO 3D
// ============================================

const objects = [];


// ============================================
// MATERIAL
// ============================================

const blueMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x38bdf8,

    metalness: .8,

    roughness: .2,

    transparent: true,

    opacity: .75

  });


const purpleMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x6366f1,

    metalness: .8,

    roughness: .25,

    transparent: true,

    opacity: .65

  });


// ============================================
// ICOSAEDROS
// ============================================

for (let i = 0; i < 7; i++) {

  const geometry =
    new THREE.IcosahedronGeometry(
      Math.random() * .35 + .15,
      1
    );

  const material =
    i % 2 === 0
      ? blueMaterial.clone()
      : purpleMaterial.clone();

  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.position.set(

    (Math.random() - .5) * 13,

    (Math.random() - .5) * 9,

    (Math.random() - .5) * 5

  );


  mesh.rotation.set(

    Math.random() * 3,

    Math.random() * 3,

    Math.random() * 3

  );


  mesh.userData = {

    speed:
      Math.random() * .005 + .002,

    float:
      Math.random() * .5 + .2,

    initialY:
      mesh.position.y

  };


  scene.add(mesh);

  objects.push(mesh);

}


// ============================================
// TOROS
// ============================================

for (let i = 0; i < 4; i++) {

  const geometry =
    new THREE.TorusGeometry(
      Math.random() * .35 + .25,
      .025,
      12,
      40
    );

  const material =
    new THREE.MeshBasicMaterial({

      color:
        i % 2
          ? 0x6366f1
          : 0x38bdf8,

      transparent: true,

      opacity: .5

    });


  const torus =
    new THREE.Mesh(
      geometry,
      material
    );


  torus.position.set(

    (Math.random() - .5) * 12,

    (Math.random() - .5) * 8,

    -1 - Math.random() * 3

  );


  torus.rotation.x =
    Math.random() * Math.PI;

  torus.rotation.y =
    Math.random() * Math.PI;


  torus.userData = {

    speed:
      Math.random() * .008 + .003

  };


  scene.add(torus);

  objects.push(torus);

}


// ============================================
// PARTICULAS
// ============================================

const particleCount =
  window.innerWidth < 600
    ? 700
    : 1600;


const particleGeometry =
  new THREE.BufferGeometry();


const positions =
  new Float32Array(
    particleCount * 3
  );


for (
  let i = 0;
  i < particleCount;
  i++
) {

  positions[i * 3] =
    (Math.random() - .5) * 25;

  positions[i * 3 + 1] =
    (Math.random() - .5) * 18;

  positions[i * 3 + 2] =
    (Math.random() - .5) * 12;

}


particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    positions,
    3
  )
);


const particleMaterial =
  new THREE.PointsMaterial({

    color: 0x38bdf8,

    size:
      window.innerWidth < 600
        ? .025
        : .035,

    transparent: true,

    opacity: .55,

    depthWrite: false

  });


const particles =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );

scene.add(particles);


// ============================================
// MOUSE
// ============================================

const mouse = {

  x: 0,

  y: 0

};


window.addEventListener(
  "mousemove",
  event => {

    mouse.x =
      (event.clientX /
        window.innerWidth) *
      2 - 1;

    mouse.y =
      -(event.clientY /
        window.innerHeight) *
      2 + 1;

  }
);


// ============================================
// SCROLL
// ============================================

let scrollY = 0;

window.addEventListener(
  "scroll",
  () => {

    scrollY =
      window.scrollY;

  },
  { passive: true }
);


// ============================================
// ANIMATION
// ============================================

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const elapsed =
    clock.getElapsedTime();


  // Movimiento del grupo

  objects.forEach(
    (object, index) => {

      object.rotation.x +=
        object.userData.speed;

      object.rotation.y +=
        object.userData.speed * 1.3;


      if (
        object.userData.initialY !==
        undefined
      ) {

        object.position.y =
          object.userData.initialY +
          Math.sin(
            elapsed *
            object.userData.float +
            index
          ) *
          .25;

      }

    }
  );


  // Partículas

  particles.rotation.y =
    elapsed * .008;

  particles.rotation.x =
    Math.sin(elapsed * .1) * .03;


  // Movimiento por mouse

  camera.position.x +=
    (mouse.x * .45 -
      camera.position.x) *
    .025;

  camera.position.y +=
    (mouse.y * .3 -
      camera.position.y) *
    .025;


  // Parallax con scroll

  camera.position.y +=
    -scrollY * .00015;


  blueLight.position.x =
    mouse.x * 4;

  blueLight.position.y =
    mouse.y * 3;


  renderer.render(
    scene,
    camera
  );

}

animate();


// ============================================
// RESIZE
// ============================================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

  }
);


// ============================================
// SCROLL REVEAL
// ============================================

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("active");

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: .12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(
    element => {

      observer.observe(
        element
      );

    }
  );


// ============================================
// TILT 3D
// ============================================

function createTilt(
  selector,
  intensity = 10
) {

  document
    .querySelectorAll(selector)
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;


          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;


          const rotateX =
            ((y - centerY) /
              centerY) *
            -intensity;


          const rotateY =
            ((x - centerX) /
              centerX) *
            intensity;


          card.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

        }
      );

    });

}


createTilt(
  ".skill-card",
  8
);

createTilt(
  ".project",
  5
);

createTilt(
  ".experience",
  3
);


// ============================================
// NAVBAR
// ============================================

const navbar =
  document.querySelector(
    ".navbar"
  );


window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY > 40
    ) {

      navbar.style.background =
        "rgba(5,7,13,.88)";

      navbar.style.boxShadow =
        "0 15px 50px rgba(0,0,0,.2)";

    } else {

      navbar.style.background =
        "rgba(5,7,13,.55)";

      navbar.style.boxShadow =
        "none";

    }

  }
);