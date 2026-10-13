// Camera virtuală și pozițiile invitaților. Totul se calculează o singură
// dată, la nivel de modul, cu un PRNG cu seed: serverul și browserul obțin
// exact aceeași scenă. La generare folosim doar + − × ÷ și Math.sqrt.

export const W = 1000;
export const H = 600;
export const CX = W / 2;
export const F = 520; // distanța focală: mai mică = oameni mai mici
export const CAM_H = 2.4; // înălțimea camerei (m)
export const HORIZON = 280; // linia orizontului (px)
export const Z_MIN = 5;
export const Z_MAX = 11;
export const Z_BACK = 12.5; // peretele din spate
export const ROOM = 9.5; // jumătate din lățimea sălii (m)
export const MAX_GUESTS = 100;
export const MAX_STAFF = 100;

// x = stânga/dreapta, y = înălțime față de podea, z = adâncime (m)
export function project(x, y, z) {
  return {
    x: CX + (x * F) / z,
    y: HORIZON + ((CAM_H - y) * F) / z,
    s: F / z,
  };
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SKIN = ["#f6d7c0", "#eec3a2", "#dfa97f", "#c68a5e", "#a56c43", "#7d4b2c", "#5a3520"];
const HAIR = ["#17110e", "#2b1b12", "#4a2d1a", "#6f4423", "#a8733a", "#d9b06a", "#8c2f1b", "#3a3a40"];
const TOPS = [
  "#fc0356", "#f5f1ea", "#18181b", "#2563eb", "#22b8cf", "#8b5cf6", "#f59e0b",
  "#10b981", "#ef4444", "#f472b6", "#e2e8f0", "#0f766e", "#facc15", "#334155",
];
const PANTS = ["#1e293b", "#111827", "#27364f", "#3b4a6b", "#5b6472", "#6b5a45", "#2a2a2e", "#d8cfc0"];
const DRESSES = ["#fc0356", "#111827", "#7c3aed", "#dc2626", "#0ea5a4", "#f5f1ea", "#be185d", "#1d4ed8", "#eab308"];
const SHOES = ["#f4f4f5", "#111111", "#3b2a20", "#e11d48", "#52525b"];
const HAIR_F = ["long", "long", "long", "bun", "ponytail", "afro", "short"];
const HAIR_M = ["short", "short", "short", "short", "bald", "afro", "ponytail"];
const POSES = [
  ["down", "down"],
  ["down", "down"],
  ["hip", "hip"],
  ["up", "up"],
  ["up", "up"],
  ["up", "down"],
  ["down", "up"],
  ["down", "drink"],
  ["drink", "down"],
];

function pick(rand, list) {
  return list[Math.floor(rand() * list.length)];
}

// Întunecă o culoare: oamenii din spate primesc ceva mai puțină lumină.
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k);
  const g = Math.round(((n >> 8) & 255) * k);
  const b = Math.round((n & 255) * k);
  return `rgb(${r},${g},${b})`;
}

function guestLook(rand, depth) {
  const k = 1 - depth * 0.16;
  const o = rand();
  const outfit = o < 0.58 ? "pants" : o < 0.82 ? "dress" : "skirt";
  const fem = outfit !== "pants" || rand() < 0.3;
  const skin = pick(rand, SKIN);

  return {
    outfit,
    skin: shade(skin, k),
    skinDark: shade(skin, k * 0.72),
    hair: shade(pick(rand, HAIR), k),
    hairStyle: pick(rand, fem ? HAIR_F : HAIR_M),
    top: shade(pick(rand, outfit === "dress" ? DRESSES : TOPS), k),
    bottom: shade(pick(rand, outfit === "skirt" ? DRESSES : PANTS), k),
    shoe: shade(pick(rand, SHOES), k),
    cup: shade("#e11d2e", k),
    sleeves: pick(rand, outfit === "dress" ? ["none", "none", "short"] : ["short", "short", "long"]),
    pose: pick(rand, POSES),
    facing: rand() < 0.55,
    sh: fem ? 15.5 + rand() * 2 : 17.5 + rand() * 2.5, // jumătate din lățimea umerilor (cm)
    build: 0.92 + rand() * 0.18,
    height: (fem ? 0.91 : 0.96) + rand() * 0.13,
  };
}

// Personalul apare pe rând, în ordinea de mai jos, apoi iar de la capăt,
// ca la orice număr ales echipa să fie amestecată.
export const STAFF_ROLES = [
  "reception", // hostess la recepție, în spatele unui pupitru
  "waiterFood", // ospătar cu platou acoperit
  "bear", // mascotă ursuleț
  "valet",
  "hostess",
  "waiterWine", // ospătar cu sticlă de vin și ștergar
  "bee", // mascotă albinuță
  "waiterTray", // ospătar cu tavă de pahare
];

function staffLook(rand, depth, rank) {
  const k = 1 - depth * 0.16;
  const role = STAFF_ROLES[rank % STAFF_ROLES.length];
  const waveLeft = rand() < 0.5;

  if (role === "bear" || role === "bee") {
    const bear = role === "bear";
    return {
      role,
      mascot: role,
      fur: shade(bear ? "#a8713f" : "#fbbf24", k),
      furLight: shade(bear ? "#e3c193" : "#fde68a", k),
      dark: shade(bear ? "#3b2416" : "#1c1917", k),
      waveLeft,
      wide: true,
      build: 1,
      height: 0.98 + rand() * 0.06,
    };
  }

  const isHostess = role === "reception" || role === "hostess";
  const fem = isHostess || rand() < 0.4;
  const skin = pick(rand, SKIN);

  const look = {
    role,
    outfit: isHostess ? "dress" : "pants",
    skin: shade(skin, k),
    skinDark: shade(skin, k * 0.72),
    hair: shade(pick(rand, HAIR), k),
    hairStyle: pick(rand, fem ? ["long", "long", "bun", "ponytail"] : ["short", "short", "short", "bald"]),
    top: shade(isHostess ? "#fc0356" : "#f5f1ea", k),
    bottom: shade("#16161a", k),
    shoe: shade("#111111", k),
    sleeves: isHostess ? "short" : "long",
    pose: ["down", "down"],
    facing: true,
    sh: fem ? 15.5 + rand() * 2 : 17.5 + rand() * 2.5,
    build: 0.94 + rand() * 0.12,
    height: (fem ? 0.92 : 0.97) + rand() * 0.11,
  };

  if (role === "reception") {
    look.wide = true;
    look.desk = {
      front: shade("#f7f3f1", k),
      band: shade("#fc0356", k),
      top: shade("#2a1a22", k),
      screen: shade("#1b1b20", k),
    };
  } else if (role === "hostess") {
    look.pose = pick(rand, [["down", "down"], ["hip", "down"], ["down", "hip"]]);
  } else if (role === "valet") {
    look.vest = shade("#8f1d2c", k);
    look.bowtie = shade("#111111", k);
  } else {
    look.bowtie = shade("#111111", k);
    look.apron = shade("#1b1b20", k);
    look.tray = shade("#d5d8de", k);
    look.trayDark = shade("#9da1aa", k);
    look.bottle = shade("#1f3d2b", k);
    look.cloth = shade("#f5f1ea", k);
    const carry = role === "waiterFood" ? "plate" : role === "waiterWine" ? "bottle" : "tray";
    const other = role === "waiterWine" ? "towel" : "down";
    look.pose = waveLeft ? [carry, other] : [other, carry];
  }

  return look;
}

// `spread` = jumătate din lățimea zonei în care stau oamenii (m).
function makeSpots({ seed, count, spread, lookFor }) {
  const rand = mulberry32(seed);
  const spots = [];
  let minDist = 0.95;

  while (spots.length < count) {
    let placed = false;

    for (let attempt = 0; attempt < 80 && !placed; attempt++) {
      // z proporțional cu suprafața vizibilă: în spate încap mai mulți oameni.
      const z = Math.sqrt(Z_MIN * Z_MIN + rand() * (Z_MAX * Z_MAX - Z_MIN * Z_MIN));
      const visible = ((CX - 30) * z) / F;
      const limit = Math.min(spread, visible);
      const x = (rand() * 2 - 1) * limit;

      let free = true;
      for (const other of spots) {
        const dx = other.x - x;
        const dz = other.z - z;
        if (dx * dx + dz * dz < minDist * minDist) {
          free = false;
          break;
        }
      }

      if (free) {
        spots.push({ id: spots.length, x, z, noise: rand() });
        placed = true;
      }
    }

    if (!placed) minDist *= 0.94;
  }

  // Ordinea de apariție: întâi în mijlocul sălii, apoi spre margini.
  const centerZ = (Z_MIN + Z_MAX) / 2;
  const byScore = spots
    .map((spot) => {
      const dx = (spot.x * 1.3) / spread;
      const dz = (spot.z - centerZ) / 3;
      return { id: spot.id, score: Math.sqrt(dx * dx + dz * dz) * 0.7 + spot.noise * 0.6 };
    })
    .sort((a, b) => a.score - b.score || a.id - b.id);
  const rank = [];
  byScore.forEach((entry, index) => {
    rank[entry.id] = index;
  });

  return spots
    .map((spot) => {
      const p = project(spot.x, 0, spot.z);
      const depth = (spot.z - Z_MIN) / (Z_MAX - Z_MIN);
      return {
        id: spot.id,
        rank: rank[spot.id],
        z: spot.z,
        px: Math.round(p.x * 10) / 10,
        py: Math.round(p.y * 10) / 10,
        scale: Math.round(p.s * 10) / 1000,
        look: lookFor(rand, depth, rank[spot.id]),
      };
    })
    // Ordinea de desenare e fixă: din spate spre față.
    .sort((a, b) => b.z - a.z || a.id - b.id);
}

export const GUESTS = makeSpots({ seed: 20261013, count: MAX_GUESTS, spread: ROOM - 0.4, lookFor: guestLook });
export const STAFF = makeSpots({ seed: 20261014, count: MAX_STAFF, spread: ROOM - 0.4, lookFor: staffLook });
