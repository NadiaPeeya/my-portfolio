/*
 * SakuraScene — the fixed WebGL backdrop.
 *
 * One "station" (a small 3D vignette) per page section, laid out along -Z.
 * Scroll position maps to a fractional station index; the camera eases
 * between station poses. Sakura petals fall everywhere, wrapping around
 * the camera so the air never runs out of them.
 *
 * Loaded as a classic script; three.js is pulled in with a dynamic import
 * so the site also works when opened straight from disk.
 */
(function () {
  'use strict';

  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
  const STATION_GAP = 30;

  const PALETTE = {
    fog: 0xfff6f3,
    sakura: 0xff8fb1,
    sakuraPale: 0xffc9d8,
    sakuraDeep: 0xe8507a,
    beni: 0xe2403f,
    ink: 0x3b2232,
    lavender: 0xb48cff,
    cream: 0xfff8f0,
    matcha: 0xa8d58a,
    wood: 0xd9b38c,
  };

  let THREE;
  let renderer, scene, camera, clock;
  let stations = [];
  let petals;
  let progress = 0;
  let smoothProgress = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  let isMobile = false;
  let reducedMotion = false;

  /* ---------------------------------------------------------- helpers */

  function mat(color, opts) {
    return new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.05 }, opts));
  }

  function petalShape(scale) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(-0.55 * scale, 0.3 * scale, -0.5 * scale, 0.95 * scale, -0.14 * scale, 1.08 * scale);
    s.lineTo(0, 0.94 * scale);
    s.lineTo(0.14 * scale, 1.08 * scale);
    s.bezierCurveTo(0.5 * scale, 0.95 * scale, 0.55 * scale, 0.3 * scale, 0, 0);
    return s;
  }

  function glowTexture(inner, outer) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, inner);
    grd.addColorStop(1, outer);
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function glow(size, inner, outer) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(inner, outer), transparent: true, depthWrite: false,
    }));
    sprite.scale.setScalar(size);
    return sprite;
  }

  /* ---------------------------------------------------------- stations */
  // Each builder returns { group, update(t, dt) }.

  function buildTorii() {
    const group = new THREE.Group();
    const red = mat(PALETTE.beni, { roughness: 0.4 });
    const black = mat(PALETTE.ink, { roughness: 0.6 });

    const pillarGeo = new THREE.CylinderGeometry(0.15, 0.18, 3.2, 20);
    [-1.2, 1.2].forEach((x) => {
      const p = new THREE.Mesh(pillarGeo, red);
      p.position.set(x, 0, 0);
      group.add(p);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.25, 20), black);
      base.position.set(x, -1.6, 0);
      group.add(base);
    });

    const kasagi = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 0.34), black);
    kasagi.position.y = 1.72;
    group.add(kasagi);
    [-1, 1].forEach((side) => {
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.34), black);
      tip.position.set(side * 1.98, 1.8, 0);
      tip.rotation.z = side * 0.28;
      group.add(tip);
    });
    const shimaki = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.2, 0.3), red);
    shimaki.position.y = 1.52;
    group.add(shimaki);
    const nuki = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.16, 0.22), red);
    nuki.position.y = 0.95;
    group.add(nuki);
    const gaku = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.1), black);
    gaku.position.set(0, 1.23, 0.06);
    group.add(gaku);

    // pale moon + halo behind the gate
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0xffd9e4, toneMapped: false, fog: false })
    );
    moon.position.set(0.6, 1.2, -4);
    group.add(moon);
    const halo = glow(9, 'rgba(255,190,210,0.75)', 'rgba(255,220,230,0)');
    halo.position.copy(moon.position).add(new THREE.Vector3(0, 0, -0.2));
    group.add(halo);

    // a few floating stepping stones
    const stoneMat = mat(0xf3d7e0, { roughness: 0.9, flatShading: true });
    const stones = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09 + Math.random() * 0.07, 0), stoneMat);
      s.position.set(-1.8 + i * 0.9, -2.1 - Math.random() * 0.3, 0.6 + Math.random() * 0.6);
      s.userData.phase = Math.random() * Math.PI * 2;
      stones.push(s);
      group.add(s);
    }

    group.scale.setScalar(0.82);

    return {
      group,
      update(t) {
        group.rotation.y = Math.sin(t * 0.25) * 0.18 - 0.25;
        halo.material.opacity = 0.8 + Math.sin(t * 1.2) * 0.15;
        stones.forEach((s) => {
          s.position.y += Math.sin(t * 1.3 + s.userData.phase) * 0.002;
          s.rotation.x = t * 0.3 + s.userData.phase;
        });
      },
    };
  }

  function buildDango() {
    const group = new THREE.Group();
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 4.4, 12), mat(PALETTE.wood));
    stick.position.y = -0.3;
    group.add(stick);

    const colors = [0xffb3c7, PALETTE.cream, PALETTE.matcha];
    const eyeMat = new THREE.MeshBasicMaterial({ color: PALETTE.ink });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xff7d9c, transparent: true, opacity: 0.7 });
    const balls = [];

    colors.forEach((c, i) => {
      const ball = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 48, 48),
        new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.4, sheen: 1, sheenColor: new THREE.Color(0xffffff) })
      );
      body.scale.set(1, 0.88, 1);
      ball.add(body);

      // kawaii face
      [-0.22, 0.22].forEach((x) => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), eyeMat);
        eye.position.set(x, 0.08, 0.69);
        eye.scale.set(1, 1.3, 0.6);
        ball.add(eye);
        const blush = new THREE.Mesh(new THREE.CircleGeometry(0.1, 20), blushMat);
        blush.position.set(x * 1.6, -0.06, 0.64);
        blush.lookAt(blush.position.clone().multiplyScalar(3));
        ball.add(blush);
      });
      const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 8, 16, Math.PI), eyeMat);
      mouth.position.set(0, -0.04, 0.72);
      mouth.rotation.z = Math.PI;
      ball.add(mouth);

      ball.position.y = 1.2 - i * 1.3;
      ball.userData.phase = i * 0.7;
      balls.push(ball);
      group.add(ball);
    });

    const halo = glow(7, 'rgba(255,200,220,0.6)', 'rgba(255,230,240,0)');
    halo.position.z = -2;
    group.add(halo);

    return {
      group,
      update(t) {
        group.rotation.z = Math.sin(t * 0.6) * 0.12 + 0.18;
        group.rotation.y = Math.sin(t * 0.4) * 0.35;
        balls.forEach((b) => {
          const squish = 1 + Math.sin(t * 2.2 + b.userData.phase) * 0.035;
          b.scale.set(squish, 2 - squish, squish);
        });
      },
    };
  }

  function buildLanterns() {
    const group = new THREE.Group();
    const points = [];
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI;
      points.push(new THREE.Vector2(Math.sin(a) * 0.55 + 0.08, -Math.cos(a) * 0.75));
    }
    const bodyGeo = new THREE.LatheGeometry(points, 32);
    const ribGeo = new THREE.TorusGeometry(1, 0.012, 6, 40);
    const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 20);
    const capMat = mat(PALETTE.ink);
    const ribMat = mat(0xb5284a);

    const lanterns = [];
    const spots = [
      [-2.2, 0.9, 0], [0, 1.6, -1.2], [2.1, 0.6, 0.2], [-1, -1, 1], [1.3, -1.3, 0.8], [3.2, 1.9, -2], [-3.1, -0.4, -1.5],
    ];
    spots.forEach(([x, y, z], i) => {
      const l = new THREE.Group();
      const tint = i % 3 === 0 ? 0xffd2a8 : i % 3 === 1 ? 0xff8fb1 : 0xffb3c7;
      const body = new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial({
        color: tint, emissive: tint, emissiveIntensity: 0.55, roughness: 0.7, side: THREE.DoubleSide,
      }));
      l.add(body);
      for (let r = -2; r <= 2; r++) {
        const yy = r * 0.26;
        const rad = Math.sqrt(Math.max(0, 1 - (yy / 0.75) ** 2)) * 0.55 + 0.08;
        const rib = new THREE.Mesh(ribGeo, ribMat);
        rib.scale.setScalar(rad + 0.005);
        rib.rotation.x = Math.PI / 2;
        rib.position.y = yy;
        l.add(rib);
      }
      const top = new THREE.Mesh(capGeo, capMat);
      top.position.y = 0.78;
      const bottom = top.clone();
      bottom.position.y = -0.78;
      l.add(top, bottom);
      const string = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 3, 6), capMat);
      string.position.y = 2.3;
      l.add(string);
      const g = glow(2.6, 'rgba(255,170,190,0.55)', 'rgba(255,200,210,0)');
      l.add(g);

      const s = 0.7 + (i % 3) * 0.15;
      l.scale.setScalar(s);
      l.position.set(x, y, z);
      l.userData = { phase: i * 1.1, baseY: y };
      lanterns.push(l);
      group.add(l);
    });

    const light = new THREE.PointLight(0xff9fb8, 6, 10, 2);
    light.position.set(0, 0.5, 1.5);
    group.add(light);

    return {
      group,
      update(t) {
        lanterns.forEach((l) => {
          l.position.y = l.userData.baseY + Math.sin(t * 0.9 + l.userData.phase) * 0.18;
          l.rotation.z = Math.sin(t * 0.7 + l.userData.phase) * 0.06;
          l.rotation.y = t * 0.2 + l.userData.phase;
        });
      },
    };
  }

  function buildKnot() {
    const group = new THREE.Group();
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.36, 220, 32, 2, 3),
      new THREE.MeshPhysicalMaterial({
        color: 0xffc1d6, roughness: 0.22, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.15,
        iridescence: 1, iridescenceIOR: 1.6, iridescenceThicknessRange: [200, 700],
      })
    );
    group.add(knot);

    const rings = [];
    const colors = [PALETTE.sakuraDeep, PALETTE.lavender, 0xffa86b];
    colors.forEach((c, i) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(Math.PI / 2 + (i - 1) * 0.5, i * 0.6, 0);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.3 + i * 0.35, 0.008, 6, 120),
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45 })
      );
      pivot.add(ring);
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), mat(c, { emissive: c, emissiveIntensity: 0.4 }));
      pivot.add(moon);
      pivot.userData = { moon, r: 2.3 + i * 0.35, speed: 0.6 - i * 0.12, phase: i * 2 };
      rings.push(pivot);
      group.add(pivot);
    });

    return {
      group,
      update(t) {
        knot.rotation.x = t * 0.18;
        knot.rotation.y = t * 0.24;
        rings.forEach((p) => {
          const a = t * p.userData.speed + p.userData.phase;
          p.userData.moon.position.set(Math.cos(a) * p.userData.r, Math.sin(a) * p.userData.r, 0);
        });
      },
    };
  }

  function buildNeural() {
    const group = new THREE.Group();
    const layers = [4, 6, 6, 3];
    const nodes = [];
    layers.forEach((count, li) => {
      for (let n = 0; n < count; n++) {
        nodes.push({
          layer: li,
          pos: new THREE.Vector3((li - 1.5) * 1.5, (n - (count - 1) / 2) * 0.72, Math.sin(n * 1.7 + li) * 0.4),
        });
      }
    });

    const nodeGeo = new THREE.SphereGeometry(0.13, 20, 20);
    const nodeMeshes = nodes.map((n) => {
      const c = n.layer % 2 ? PALETTE.lavender : PALETTE.sakuraDeep;
      const m = new THREE.Mesh(nodeGeo, mat(c, { emissive: c, emissiveIntensity: 0.35 }));
      m.position.copy(n.pos);
      group.add(m);
      return m;
    });

    const edges = [];
    const verts = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (b.layer === a.layer + 1) {
        edges.push([i, j]);
        verts.push(a.pos.x, a.pos.y, a.pos.z, b.pos.x, b.pos.y, b.pos.z);
      }
    }));
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: PALETTE.sakura, transparent: true, opacity: 0.35 })));

    // signals hopping along edges
    const signalGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const signalMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const signals = Array.from({ length: 16 }, () => {
      const m = new THREE.Mesh(signalGeo, signalMat);
      m.userData = { edge: edges[Math.floor(Math.random() * edges.length)], t: Math.random() };
      group.add(m);
      return m;
    });

    const halo = glow(8, 'rgba(210,180,255,0.45)', 'rgba(230,210,255,0)');
    halo.position.z = -2;
    group.add(halo);

    return {
      group,
      update(t, dt) {
        group.rotation.y = Math.sin(t * 0.3) * 0.4;
        nodeMeshes.forEach((m, i) => m.scale.setScalar(1 + Math.max(0, Math.sin(t * 2.4 - nodes[i].layer * 1.1)) * 0.45));
        signals.forEach((s) => {
          s.userData.t += dt * 0.8;
          if (s.userData.t >= 1) {
            const next = edges.filter((e) => e[0] === s.userData.edge[1]);
            s.userData.edge = next.length ? next[Math.floor(Math.random() * next.length)] : edges[Math.floor(Math.random() * 16)];
            s.userData.t = 0;
          }
          const [a, b] = s.userData.edge;
          s.position.lerpVectors(nodes[a].pos, nodes[b].pos, s.userData.t);
        });
      },
    };
  }

  function buildBlossom() {
    const group = new THREE.Group();
    const flower = new THREE.Group();
    const petalGeo = new THREE.ShapeGeometry(petalShape(1.6), 24);
    const petalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffc4d4, roughness: 0.5, sheen: 1, sheenColor: new THREE.Color(0xffffff), side: THREE.DoubleSide,
    });
    for (let i = 0; i < 5; i++) {
      const pivot = new THREE.Group();
      pivot.rotation.z = (i / 5) * Math.PI * 2;
      const p = new THREE.Mesh(petalGeo, petalMat);
      p.rotation.x = -0.35;
      pivot.add(p);
      flower.add(pivot);
    }
    const centre = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), mat(PALETTE.sakuraDeep));
    flower.add(centre);
    const stamenMat = mat(0xffd36b, { emissive: 0xffb84d, emissiveIntensity: 0.3 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const st = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), stamenMat);
      st.position.set(Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0.32);
      flower.add(st);
    }
    group.add(flower);

    // orbiting skill "beads"
    const beads = [];
    const beadColors = [0xff8fb1, 0xb48cff, 0xffa86b, 0x6fc3b8, 0xffd36b, 0xe8507a];
    beadColors.forEach((c, i) => {
      const b = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.2, 1),
        new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.25, clearcoat: 1, flatShading: true })
      );
      b.userData = { a: (i / beadColors.length) * Math.PI * 2, r: 2.6 + (i % 2) * 0.4, tilt: (i % 3 - 1) * 0.5 };
      beads.push(b);
      group.add(b);
    });

    return {
      group,
      update(t) {
        flower.rotation.z = t * 0.25;
        flower.rotation.x = Math.sin(t * 0.5) * 0.25;
        flower.rotation.y = Math.cos(t * 0.4) * 0.3;
        beads.forEach((b) => {
          const a = b.userData.a + t * 0.45;
          b.position.set(Math.cos(a) * b.userData.r, Math.sin(a) * b.userData.r * 0.55 + b.userData.tilt, Math.sin(a) * 0.9);
          b.rotation.x = b.rotation.y = t + b.userData.a;
        });
      },
    };
  }

  function buildCrane() {
    const group = new THREE.Group();
    const paper = new THREE.MeshStandardMaterial({ color: 0xff9dbb, roughness: 0.8, flatShading: true, side: THREE.DoubleSide });
    const paperLight = new THREE.MeshStandardMaterial({ color: 0xffd0de, roughness: 0.8, flatShading: true, side: THREE.DoubleSide });

    function tris(arr, material) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
      g.computeVertexNormals();
      return new THREE.Mesh(g, material);
    }

    const A = [0, 0.4, 0], B = [0, -0.15, 0.75], C = [0, -0.15, -0.75], D = [-0.28, -0.2, 0], E = [0.28, -0.2, 0];
    const body = tris([
      ...A, ...B, ...E, ...A, ...E, ...C, ...A, ...C, ...D, ...A, ...D, ...B,
      ...B, ...D, ...E, ...C, ...E, ...D,
    ], paper);
    group.add(body);

    const neck = tris([-0.06, -0.05, 0.55, 0.06, -0.05, 0.55, 0, 1.0, 1.35, 0, 1.0, 1.35, -0.04, 0.92, 1.3, 0, 0.82, 1.62], paperLight);
    const tail = tris([-0.06, -0.05, -0.55, 0.06, -0.05, -0.55, 0, 1.05, -1.4], paperLight);
    group.add(neck, tail);

    const wings = [-1, 1].map((side) => {
      const pivot = new THREE.Group();
      pivot.position.set(0, 0.35, 0);
      const w = tris([
        0, 0, -0.45, 0, 0, 0.45, side * 1.9, 0.35, -0.25,
        0, 0, 0.45, side * 1.9, 0.35, -0.25, side * 1.2, 0.2, 0.45,
      ], side < 0 ? paper : paperLight);
      pivot.add(w);
      group.add(pivot);
      return { pivot, side };
    });

    group.scale.setScalar(1.25);
    const halo = glow(7, 'rgba(255,200,220,0.55)', 'rgba(255,230,240,0)');
    halo.position.z = -2.5;
    group.add(halo);

    return {
      group,
      update(t) {
        const flap = Math.sin(t * 2.2) * 0.45;
        wings.forEach(({ pivot, side }) => { pivot.rotation.z = side * -flap; });
        group.position.y = Math.sin(t * 2.2 - 0.6) * 0.18;
        group.rotation.y = -0.9 + Math.sin(t * 0.3) * 0.35;
        group.rotation.x = 0.15;
      },
    };
  }

  function buildFuji() {
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0.42, 3.2, 2.6, 11, 5, true).toNonIndexed();
    const pos = geo.attributes.position;
    const colors = [];
    const snow = new THREE.Color(0xffffff), rock = new THREE.Color(0x9b8fdc), foot = new THREE.Color(0xd7c4f5);
    for (let i = 0; i < pos.count; i += 3) {
      // colour per face (flat), jagged snowline
      const y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
      const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
      const line = 0.35 + Math.sin(x * 4) * 0.18;
      const c = y > line ? snow : rock.clone().lerp(foot, THREE.MathUtils.clamp((0.3 - y) / 1.6, 0, 1));
      for (let k = 0; k < 3; k++) colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const mountain = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.9 }));
    mountain.position.y = -0.6;
    group.add(mountain);

    const sun = new THREE.Mesh(new THREE.CircleGeometry(1.5, 48), new THREE.MeshBasicMaterial({ color: 0xff6b88 }));
    sun.position.set(1.6, 1.4, -2.5);
    group.add(sun);
    const sunGlow = glow(7, 'rgba(255,120,150,0.5)', 'rgba(255,180,200,0)');
    sunGlow.position.set(1.6, 1.4, -2.6);
    group.add(sunGlow);

    const cloudMat = mat(0xffffff, { roughness: 1 });
    const clouds = [];
    [[-2.2, -0.4, 1], [2.4, -0.9, 0.8], [-0.4, 0.9, -1.4]].forEach(([x, y, z], i) => {
      const cl = new THREE.Group();
      [[0, 0, 0.45], [0.45, 0.05, 0.35], [-0.45, 0, 0.32], [0.2, 0.25, 0.3]].forEach(([cx, cy, r]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), cloudMat);
        puff.position.set(cx, cy, 0);
        cl.add(puff);
      });
      cl.position.set(x, y, z);
      cl.scale.set(1.2, 0.8, 0.8);
      cl.userData = { baseX: x, phase: i * 2 };
      clouds.push(cl);
      group.add(cl);
    });

    return {
      group,
      update(t) {
        mountain.rotation.y = t * 0.05;
        clouds.forEach((c) => { c.position.x = c.userData.baseX + Math.sin(t * 0.3 + c.userData.phase) * 0.4; });
      },
    };
  }

  /* ---------------------------------------------------------- petals */

  function buildPetals(count) {
    const geo = new THREE.ShapeGeometry(petalShape(0.16), 6);
    geo.translate(0, -0.08, 0);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.6, emissive: 0xff8fb1, emissiveIntensity: 0.35, side: THREE.DoubleSide, transparent: true, opacity: 0.92 });
    const mesh = new THREE.InstancedMesh(geo, material, count);
    const data = [];
    const tint = new THREE.Color();
    for (let i = 0; i < count; i++) {
      data.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 14, -Math.random() * 18 + 3),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(2),
        fall: 0.35 + Math.random() * 0.5,
        sway: Math.random() * Math.PI * 2,
        s: 0.6 + Math.random() * 0.9,
      });
      tint.setHSL(0.95 + Math.random() * 0.03, 0.85, 0.8 + Math.random() * 0.12);
      mesh.setColorAt(i, tint);
    }
    mesh.frustumCulled = false;
    const dummy = new THREE.Object3D();

    return {
      mesh,
      update(t, dt) {
        const cam = camera.position;
        for (let i = 0; i < count; i++) {
          const d = data[i];
          d.p.y -= d.fall * dt;
          d.p.x += Math.sin(t * 0.8 + d.sway) * 0.35 * dt + 0.12 * dt;
          d.r.x += d.spin.x * dt; d.r.y += d.spin.y * dt; d.r.z += d.spin.z * dt;
          // wrap around the camera
          if (d.p.y < cam.y - 7) d.p.y += 14;
          if (d.p.x > cam.x + 12) d.p.x -= 24;
          if (d.p.x < cam.x - 12) d.p.x += 24;
          if (d.p.z > cam.z + 3) d.p.z -= 18;
          if (d.p.z < cam.z - 15) d.p.z += 18;
          if (d.p.y > cam.y + 7) d.p.y -= 14;
          dummy.position.copy(d.p);
          dummy.rotation.copy(d.r);
          dummy.scale.setScalar(d.s);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      },
    };
  }

  /* ---------------------------------------------------------- layout */

  // side: +1 → object sits on the right of the screen, -1 → left, 0 → centred behind content
  const LAYOUT = [
    { build: buildTorii, side: 1, y: 0 },
    { build: buildDango, side: -1, y: 0 },
    { build: buildLanterns, side: 1, y: 0.5 },
    { build: buildKnot, side: 0, y: 0, scale: 0.72 },
    { build: buildNeural, side: -1, y: 0 },
    { build: buildBlossom, side: 1, y: 0 },
    { build: buildCrane, side: -1, y: 0.3 },
    { build: buildFuji, side: 0, y: 0.6, lift: 1.4, scale: 0.8 },
  ];

  function cameraPose(i) {
    const st = stations[i];
    const shift = isMobile ? 0 : -st.side * 2.8;
    const dist = isMobile ? 10 : st.side === 0 ? 9.5 : 9;
    const target = st.group.position.clone().add(new THREE.Vector3(shift, st.lift + (isMobile ? -1.2 : 0), 0));
    const pos = target.clone().add(new THREE.Vector3(0, 0.4, dist));
    return { pos, target };
  }

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    isMobile = w < 860;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const tmpPos = { pos: null, target: null };
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime * (reducedMotion ? 0.3 : 1);

    smoothProgress += (progress - smoothProgress) * Math.min(1, dt * 3.2);
    const maxI = stations.length - 1;
    const p = THREE.MathUtils.clamp(smoothProgress, 0, maxI);
    const i0 = Math.floor(p), i1 = Math.min(i0 + 1, maxI);
    const f = THREE.MathUtils.smoothstep(p - i0, 0, 1);
    const a = cameraPose(i0), b = cameraPose(i1);
    tmpPos.pos = a.pos.lerp(b.pos, f);
    tmpPos.target = a.target.lerp(b.target, f);
    // a gentle arc between stations
    tmpPos.pos.y += Math.sin(f * Math.PI) * 1.2;

    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 2.5);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 2.5);
    camera.position.set(tmpPos.pos.x + pointer.sx * 0.6, tmpPos.pos.y - pointer.sy * 0.4, tmpPos.pos.z);
    camera.lookAt(tmpPos.target);

    stations.forEach((s, i) => {
      const near = Math.abs(p - i) < 1.6;
      s.group.visible = near;
      if (near) s.update(t, dt);
    });
    petals.update(t, reducedMotion ? dt * 0.4 : dt);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------- public API */

  async function init(canvas, onStep) {
    const step = onStep || function () {};
    step('scene', 'start');
    THREE = await import(THREE_URL);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(PALETTE.fog, 14, 34);
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
    clock = new THREE.Clock();
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scene.add(new THREE.HemisphereLight(0xfff0f5, 0xd9c8ff, 1.6));
    const sun = new THREE.DirectionalLight(0xfff1e6, 2.2);
    sun.position.set(4, 8, 6);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0xffb3c9, 1.2);
    rim.position.set(-6, 2, -4);
    scene.add(rim);

    stations = LAYOUT.map((cfg, i) => {
      const built = cfg.build();
      built.side = cfg.side;
      built.lift = cfg.lift || 0;
      if (cfg.scale) built.group.scale.setScalar(cfg.scale);
      built.group.position.set(Math.sin(i * 1.3) * 3, cfg.y + Math.cos(i * 0.9) * 1.2, -i * STATION_GAP);
      scene.add(built.group);
      return built;
    });
    step('scene', 'ok');

    step('petals', 'start');
    petals = buildPetals(window.innerWidth < 860 ? 120 : 240);
    scene.add(petals.mesh);
    step('petals', 'ok');

    onResize();
    window.addEventListener('resize', onResize);
    const first = cameraPose(0);
    camera.position.copy(first.pos);
    requestAnimationFrame(frame);
  }

  window.SakuraScene = {
    init,
    stationCount: LAYOUT.length,
    setProgress(p) { progress = p; },
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
  };
})();
