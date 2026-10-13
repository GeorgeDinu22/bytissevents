// Un om desenat în coordonate locale: tălpile la y = 0, creștetul la
// aproximativ y = -175, 1 unitate = 1 cm. Umbrirea vine din gradientul
// #pp-shade, definit o singură dată în <defs>-ul scenei.

const SHADE = "url(#pp-shade)";
// Capul e mărit puțin în jurul bărbiei, ca să rămână lipit de gât.
const HEAD = "translate(0 -153) scale(1.12) translate(0 153)";

// Cot și mână, relativ la umăr (x se oglindește pentru brațul stâng).
const ARMS = {
  down: { elbow: [3.5, -112], hand: [3, -84] },
  hip: { elbow: [11, -116], hand: [-2, -95] },
  up: { elbow: [9, -160], hand: [5, -187] },
  drink: { elbow: [4.5, -114], hand: [-7, -128] },
  tray: { elbow: [5, -116], hand: [10, -140] },
  plate: { elbow: [5, -116], hand: [10, -140] },
  bottle: { elbow: [4.5, -114], hand: [-6, -124] },
  towel: { elbow: [4, -113], hand: [-9, -111] },
};

function Arm({ side, pose, look }) {
  const { sh, skin, top, sleeves, cup, tray, trayDark, bottle, cloth } = look;
  const { elbow, hand } = ARMS[pose];
  const sx = side * (sh - 2.5);
  const sy = -142;
  const ex = side * (sh + elbow[0]);
  const ey = elbow[1];
  const hx = side * (sh + hand[0]);
  const hy = hand[1];
  const long = sleeves === "long";

  return (
    <g strokeLinecap="round" fill="none">
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={long ? top : skin} strokeWidth="9.4" />
      <line x1={ex} y1={ey} x2={hx} y2={hy} stroke={long ? top : skin} strokeWidth="7.8" />
      {sleeves === "short" && (
        <line
          x1={sx}
          y1={sy}
          x2={sx + (ex - sx) * 0.45}
          y2={sy + (ey - sy) * 0.45}
          stroke={top}
          strokeWidth="10.6"
        />
      )}
      <circle cx={hx} cy={hy} r="4.7" fill={skin} />
      {pose === "drink" && (
        <g transform={`translate(${hx} ${hy - 2})`}>
          <path d="M-3.4,-9 L3.4,-9 L2.5,2 L-2.5,2 Z" fill={cup} />
          <path d="M-3.4,-9 L3.4,-9" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.1" />
        </g>
      )}
      {pose === "tray" && (
        <g transform={`translate(${hx + side * 2} ${hy - 6})`}>
          <rect x="-7" y="-10" width="4" height="9" rx="1" fill="#ffffff" fillOpacity="0.85" />
          <rect x="-1.5" y="-12" width="4" height="11" rx="1" fill="#ffffff" fillOpacity="0.85" />
          <rect x="4.5" y="-10" width="4" height="9" rx="1" fill="#ffffff" fillOpacity="0.85" />
          <ellipse cx="0" cy="0" rx="15" ry="2.8" fill={tray} />
        </g>
      )}
      {pose === "plate" && (
        <g transform={`translate(${hx + side * 2} ${hy - 6})`}>
          <path d="M-12,-1 C-12,-17 12,-17 12,-1 Z" fill={tray} />
          <path d="M-7,-7 C-5,-12 0,-13.5 4,-13" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.4" />
          <circle cx="0" cy="-14.5" r="2" fill={trayDark} />
          <ellipse cx="0" cy="0" rx="15" ry="2.8" fill={trayDark} />
        </g>
      )}
      {pose === "bottle" && (
        <g transform={`translate(${hx} ${hy})`}>
          <path d="M-3.2,6 L-3.2,-12 Q-3.2,-16 -1.3,-18 L-1.3,-27 L1.3,-27 L1.3,-18 Q3.2,-16 3.2,-12 L3.2,6 Z" fill={bottle} />
          <rect x="-3.2" y="-9" width="6.4" height="8" fill={cloth} />
          <rect x="-1.5" y="-28.5" width="3" height="3" fill="#b91c1c" />
          <circle cx="0" cy="0" r="4.7" fill={skin} />
        </g>
      )}
      {pose === "towel" && (
        <path
          d={`M${(ex + hx) / 2 - 5},${(ey + hy) / 2 - 4} L${(ex + hx) / 2 + 5},${(ey + hy) / 2 - 4} L${(ex + hx) / 2 + 5},${(ey + hy) / 2 + 20} L${(ex + hx) / 2 - 5},${(ey + hy) / 2 + 20} Z`}
          fill={cloth}
        />
      )}
    </g>
  );
}

function BackHair({ style, color, facing }) {
  if (style === "afro") return <circle cx="0" cy="-169" r="15.5" fill={color} />;
  if (!facing) return null; // din spate, părul se desenează peste cap
  if (style === "long") {
    return (
      <path
        d="M-11,-166 C-12,-181 12,-181 11,-166 L12.5,-134 Q0,-129 -12.5,-134 Z"
        fill={color}
      />
    );
  }
  if (style === "bun") return <circle cx="0" cy="-177.5" r="5.2" fill={color} />;
  if (style === "ponytail") {
    return <path d="M7,-171 Q18,-167 14.5,-144 Q11,-150 9.5,-160 Z" fill={color} />;
  }
  return null;
}

const CAP =
  "M-9.6,-162 C-11.5,-180 11.5,-180 9.6,-162 C8.5,-168 5,-171.5 0,-171.5 C-5,-171.5 -8.5,-168 -9.6,-162 Z";

function Face({ look }) {
  const { skinDark, hair, hairStyle } = look;
  return (
    <g>
      <ellipse cx="-3.6" cy="-163" rx="1" ry="1.25" fill="#1b1210" />
      <ellipse cx="3.6" cy="-163" rx="1" ry="1.25" fill="#1b1210" />
      <path
        d="M-5.6,-166.4 L-1.9,-166.9 M1.9,-166.9 L5.6,-166.4"
        stroke={hairStyle === "bald" ? skinDark : hair}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M0.2,-162 L0.9,-158.6 L-0.6,-158.3"
        fill="none"
        stroke={skinDark}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M-3.3,-156.6 Q0,-153.6 3.3,-156.6"
        fill="none"
        stroke="#7a2630"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {hairStyle !== "bald" && <path d={CAP} fill={hair} />}
    </g>
  );
}

function HairFromBehind({ look }) {
  const { hair, hairStyle } = look;
  if (hairStyle === "bald") return null;
  return (
    <g fill={hair}>
      <ellipse cx="0" cy="-165.3" rx="9.7" ry="10.4" />
      {hairStyle === "long" && (
        <path d="M-11,-166 C-12,-181 12,-181 11,-166 L12.5,-128 Q0,-123 -12.5,-128 Z" />
      )}
      {hairStyle === "bun" && <circle cx="0" cy="-177.5" r="5.2" />}
      {hairStyle === "ponytail" && (
        <path d="M-2.6,-170 Q-4.8,-150 -2,-134 L2,-134 Q4.8,-150 2.6,-170 Z" />
      )}
    </g>
  );
}

function Desk({ desk }) {
  return (
    <g>
      <rect x="-48" y="-104" width="96" height="104" rx="3" fill={desk.front} />
      <rect x="-48" y="-104" width="96" height="104" rx="3" fill={SHADE} />
      <rect x="-48" y="-72" width="96" height="14" fill={desk.band} />
      <rect x="-36" y="-127" width="24" height="17" rx="1.5" fill={desk.screen} />
      <rect x="14" y="-119" width="20" height="9" rx="1" fill={desk.front} />
      <rect x="17" y="-115.5" width="14" height="2" fill={desk.band} />
      <rect x="-52" y="-111" width="104" height="8" rx="2" fill={desk.top} />
    </g>
  );
}

// Mascotă în costum de pluș: ursuleț sau albinuță, cu o mână ridicată.
function Mascot({ look }) {
  const { mascot, fur, furLight, dark, waveLeft } = look;
  const bee = mascot === "bee";
  const limb = bee ? dark : fur;
  const flip = waveLeft ? "scale(-1 1)" : undefined;

  return (
    <g transform={flip}>
      {bee && (
        <g fill="#ffffff" fillOpacity="0.8" stroke="#c7ccd6" strokeWidth="1">
          <ellipse cx="-31" cy="-128" rx="17" ry="29" transform="rotate(-22 -31 -128)" />
          <ellipse cx="31" cy="-128" rx="17" ry="29" transform="rotate(22 31 -128)" />
        </g>
      )}

      <g stroke={limb} strokeWidth="16" strokeLinecap="round">
        <line x1="-12" y1="-46" x2="-13" y2="-10" />
        <line x1="12" y1="-46" x2="13" y2="-10" />
      </g>
      <ellipse cx="-15" cy="-5" rx="13" ry="6" fill={bee ? dark : furLight} />
      <ellipse cx="15" cy="-5" rx="13" ry="6" fill={bee ? dark : furLight} />

      <ellipse cx="0" cy="-87" rx="29" ry="43" fill={fur} />
      {bee ? (
        <g stroke={dark} strokeWidth="11" fill="none">
          <path d="M-25,-106 Q0,-99 25,-106" />
          <path d="M-27,-82 Q0,-75 27,-82" />
          <path d="M-20,-58 Q0,-52 20,-58" />
        </g>
      ) : (
        <ellipse cx="0" cy="-82" rx="18" ry="27" fill={furLight} />
      )}
      <ellipse cx="0" cy="-87" rx="29" ry="43" fill={SHADE} />

      <g stroke={limb} strokeWidth="14" strokeLinecap="round">
        <line x1="-24" y1="-112" x2="-36" y2="-76" />
        <line x1="24" y1="-112" x2="43" y2="-146" />
      </g>

      {bee ? (
        <g stroke={dark} strokeWidth="2.2" strokeLinecap="round" fill={dark}>
          <line x1="-8" y1="-174" x2="-15" y2="-193" />
          <line x1="8" y1="-174" x2="15" y2="-193" />
          <circle cx="-15" cy="-194" r="3.4" />
          <circle cx="15" cy="-194" r="3.4" />
        </g>
      ) : (
        <>
          <circle cx="-20" cy="-174" r="9.5" fill={fur} />
          <circle cx="20" cy="-174" r="9.5" fill={fur} />
          <circle cx="-20" cy="-174" r="5" fill={furLight} />
          <circle cx="20" cy="-174" r="5" fill={furLight} />
        </>
      )}

      <circle cx="0" cy="-152" r="26" fill={fur} />
      <circle cx="0" cy="-152" r="26" fill={SHADE} />
      {bee ? (
        <>
          <circle cx="-9" cy="-156" r="6" fill="#ffffff" />
          <circle cx="9" cy="-156" r="6" fill="#ffffff" />
          <circle cx="-8" cy="-155" r="3" fill={dark} />
          <circle cx="10" cy="-155" r="3" fill={dark} />
          <circle cx="-17" cy="-145" r="3.4" fill="#fb7185" fillOpacity="0.7" />
          <circle cx="17" cy="-145" r="3.4" fill="#fb7185" fillOpacity="0.7" />
          <path d="M-7,-142 Q0,-135 7,-142" fill="none" stroke={dark} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="0" cy="-144" rx="12.5" ry="9.5" fill={furLight} />
          <ellipse cx="0" cy="-148.5" rx="4.4" ry="3.2" fill={dark} />
          <circle cx="-9.5" cy="-159" r="2.7" fill={dark} />
          <circle cx="9.5" cy="-159" r="2.7" fill={dark} />
          <path d="M-5,-142.5 Q0,-138 5,-142.5" fill="none" stroke={dark} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

export default function Body({ look }) {
  if (look.mascot) return <Mascot look={look} />;

  const { outfit, skin, skinDark, hair, hairStyle, top, bottom, shoe, pose, facing, sh, vest, bowtie, apron } = look;
  const waist = sh * 0.78;
  const hip = outfit === "pants" ? sh * 0.9 : sh * 0.98;

  const shoulders = `M${-sh},-141 Q${-sh},-146.5 ${-sh + 5},-147.5 L-4,-149.5 Q0,-146.5 4,-149.5 L${sh - 5},-147.5 Q${sh},-146.5 ${sh},-141 L${waist + 1},-112`;
  const torso =
    outfit === "dress"
      ? `${shoulders} L${hip + 7},-66 Q0,-60 ${-hip - 7},-66 L${-waist - 1},-112 Z`
      : `${shoulders} L${hip},-84 L${-hip},-84 L${-waist - 1},-112 Z`;
  const legs =
    outfit === "pants"
      ? `M${-hip},-88 C${-hip - 0.5},-58 -13.5,-36 -12,-5 L-3.6,-5 C-3,-36 -1.5,-56 -0.4,-77 L0.4,-77 C1.5,-56 3,-36 3.6,-5 L12,-5 C13.5,-36 ${hip + 0.5},-58 ${hip},-88 Z`
      : "M-12.4,-80 C-13.4,-50 -10.6,-30 -9.6,-5 L-4,-5 C-3.4,-30 -1.6,-50 -1,-80 Z M12.4,-80 C13.4,-50 10.6,-30 9.6,-5 L4,-5 C3.4,-30 1.6,-50 1,-80 Z";
  const vestPanels = `M${-sh + 4},-147.3 L-4.5,-149.3 L-1.2,-120 L-1.2,-84 L${-hip},-84 L${-waist - 1},-112 L${-sh + 1},-138 Z M${sh - 4},-147.3 L4.5,-149.3 L1.2,-120 L1.2,-84 L${hip},-84 L${waist + 1},-112 L${sh - 1},-138 Z`;
  const apronPanel = `M${-hip - 0.5},-106 L${hip + 0.5},-106 L${hip + 1.5},-46 L${-hip - 1.5},-46 Z`;
  const skirt = `M${-waist - 1.5},-111 L${waist + 1.5},-111 L${hip + 6},-64 Q0,-58 ${-hip - 6},-64 Z`;

  return (
    <g>
      <g transform={HEAD}>
        <BackHair style={hairStyle} color={hair} facing={facing} />
      </g>

      <path d={legs} fill={outfit === "pants" ? bottom : skin} />
      <path d={legs} fill={SHADE} />

      <path d="M-12.6,-6 L-3,-6 L-2.6,-1.2 Q-2.6,0 -4,0 L-14,0 Q-15.8,0 -15,-2.6 Z" fill={shoe} />
      <path d="M12.6,-6 L3,-6 L2.6,-1.2 Q2.6,0 4,0 L14,0 Q15.8,0 15,-2.6 Z" fill={shoe} />

      <rect x="-4.6" y="-155" width="9.2" height="10" fill={skin} />
      {facing && <path d="M-4.6,-152.5 Q0,-147.5 4.6,-152.5 L4.6,-155 L-4.6,-155 Z" fill={skinDark} />}

      <path d={torso} fill={top} />
      <path d={torso} fill={SHADE} />
      {outfit === "skirt" && (
        <>
          <path d={skirt} fill={bottom} />
          <path d={skirt} fill={SHADE} />
        </>
      )}
      {vest && (
        <>
          <path d={vestPanels} fill={vest} />
          <path d={vestPanels} fill={SHADE} />
        </>
      )}
      {apron && (
        <>
          <path d={apronPanel} fill={apron} />
          <path d={apronPanel} fill={SHADE} />
        </>
      )}
      {bowtie && <path d="M0,-146.5 L-5,-149.6 L-5,-143.4 Z M0,-146.5 L5,-149.6 L5,-143.4 Z" fill={bowtie} />}

      <g transform={HEAD}>
        <ellipse cx="-9.2" cy="-163" rx="1.7" ry="2.7" fill={skinDark} />
        <ellipse cx="9.2" cy="-163" rx="1.7" ry="2.7" fill={skinDark} />

        <ellipse cx="0" cy="-163.5" rx="9" ry="11.5" fill={skin} />
        <ellipse cx="0" cy="-163.5" rx="9" ry="11.5" fill={SHADE} />

        {facing ? <Face look={look} /> : <HairFromBehind look={look} />}
      </g>

      <Arm side={-1} pose={pose[0]} look={look} />
      <Arm side={1} pose={pose[1]} look={look} />

      {look.desk && <Desk desk={look.desk} />}
    </g>
  );
}
