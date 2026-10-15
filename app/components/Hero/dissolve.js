// Efectul „dissolve” din hero: scena stă lipită (sticky) cât derulezi, iar un
// shader WebGL o acoperă de jos în sus cu culoarea fundalului, cu o margine
// neregulată, ca o cerneală care se întinde.

const VERTEX = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float uProgress;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpread;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(vec3(p, 1.0), vec3(37.1, 61.7, 12.4))) * 3758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  return noise(p) * 0.5 + noise(p * 2.0) * 0.25 + noise(p * 4.0) * 0.125;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 c = (vUv - 0.5) * vec2(aspect, 1.0);

  // Linia urcă odată cu progresul, iar zgomotul (fix, nu depinde de timp)
  // o deformează, deci petele cresc mereu din aceleași locuri.
  float edge = vUv.y - uProgress * 1.2;
  float d = edge + fbm(c * 15.0) * uSpread;

  float px = 1.0 / uResolution.y;
  float a = 1.0 - smoothstep(-px, px, d);

  // Alpha premultiplicat, altfel Safari pune un voal peste zonele transparente.
  gl_FragColor = vec4(uColor * a, a);
}
`;

// Animația pornește la 10% din pistă și se termină exact când secțiunea
// următoare începe să intre în ecran (vezi `end` în resize). 1.22 trece
// intenționat de 1, ca și petele cele mai înalte să iasă complet pe sus.
const START = 0.1;
const MAX = 1.22;
const SPREAD = 0.5;
// Petele sunt mai late și mai joase (aceeași alegere ca pe briss.ro).
const STRETCH = 1.75;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

// "#fce6ed" → [r, g, b] în intervalul 0..1.
function parseColor(value) {
  let hex = value.trim().replace("#", "");
  if (hex.length === 3) hex = [...hex].map((ch) => ch + ch).join("");
  const n = parseInt(hex, 16);
  if (hex.length !== 6 || Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

// Pregătește WebGL pe canvas. Întoarce null dacă browserul nu îl suportă.
function createRenderer(canvas, color) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });
  if (!gl || gl.isContextLost()) return null;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
  } catch {
    return null;
  }
  gl.useProgram(program);

  // Două triunghiuri care acoperă tot canvas-ul.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const uProgress = gl.getUniformLocation(program, "uProgress");
  const uResolution = gl.getUniformLocation(program, "uResolution");
  gl.uniform3fv(gl.getUniformLocation(program, "uColor"), color);
  gl.uniform1f(gl.getUniformLocation(program, "uSpread"), SPREAD);

  return {
    resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, rect.width, rect.height * STRETCH);
    },
    draw(progress) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uProgress, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

// Fără WebGL: o cortină simplă, cu margine dreaptă, care urcă la fel.
function createCurtain(canvas, curtain) {
  canvas.hidden = true;
  curtain.hidden = false;
  return {
    resize() {},
    draw(progress) {
      curtain.style.transform = `scaleY(${clamp(progress * 1.2)})`;
    },
    destroy() {},
  };
}

export function mountDissolve({ hero, scene, canvas, curtain }) {
  const color = parseColor(
    getComputedStyle(document.documentElement).getPropertyValue("--background"),
  );
  let renderer = createRenderer(canvas, color) ?? createCurtain(canvas, curtain);

  let start = 0;
  let dist = 1;
  let end = 1;
  let last = -1;
  let frame = 0;

  function draw() {
    const p = clamp((window.scrollY - start) / dist);
    const d = clamp(((p - START) / (end - START)) * MAX, 0, MAX);
    if (Math.abs(d - last) < 5e-5) return;
    last = d;
    renderer.draw(d);
    // Complet acoperită, scena arată ca fundalul, deci o ascundem: secțiunea
    // următoare urcă peste ea și nu trebuie să rămână nimic deasupra.
    scene.style.visibility = d >= MAX ? "hidden" : "";
  }

  function resize() {
    // Înălțimea scenei e 100svh, deci nu sare când apare sau dispare bara de
    // adresă pe mobil. Dacă textul e mai înalt decât ecranul, scena se
    // lipește de jos, ca să rămână vizibilă până la capăt.
    const viewport = parseFloat(getComputedStyle(scene).minHeight) || window.innerHeight;
    scene.style.setProperty("--sticky-top", `${Math.min(0, viewport - scene.offsetHeight)}px`);

    start = hero.getBoundingClientRect().top + window.scrollY;
    dist = Math.max(hero.offsetHeight - viewport, 1);
    // Secțiunea următoare urcă peste ultimii 100svh ai hero-ului
    // (margin-bottom negativ în CSS) și intră în ecran cu un viewport
    // înainte de finalul pistei.
    end = Math.max((dist - Math.max(viewport, window.innerHeight)) / dist, START + 0.1);

    renderer.resize();
    last = -1;
    draw();
  }

  function onScroll() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      draw();
    });
  }

  function onContextLost(event) {
    event.preventDefault();
    renderer = createCurtain(canvas, curtain);
    last = -1;
    draw();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(scene);
  window.addEventListener("scroll", onScroll, { passive: true });
  canvas.addEventListener("webglcontextlost", onContextLost);

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    cancelAnimationFrame(frame);
    renderer.destroy();
  };
}
