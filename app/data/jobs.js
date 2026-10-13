// TODO: imagini demo de pe Unsplash — de înlocuit cu poze proprii.
// `slug` dă adresa paginii jobului (/joburi/<slug>) și numele imaginii din
// /public/images/joburi. `text` e descrierea scurtă de pe card, `description`
// paragrafele de pe pagina jobului, iar `includes` lista „Ce include”.
export const jobs = [
  {
    slug: "sampling",
    title: "Sampling",
    text: "Oferim mostre direct publicului tău, acolo unde contează.",
    image: "/images/joburi/sampling.jpg",
    description: [
      "Un produs nou se vinde mai ușor după ce a fost încercat. La sampling, promoterii noștri oferă mostre în magazine, în centre comerciale, la evenimente sau pe stradă și spun, în câteva cuvinte, ce face produsul diferit.",
      "Alegem oamenii în funcție de publicul campaniei, îi instruim pe produs și pe mesajul brandului și urmărim zilnic cum merge distribuirea. La final primești un raport cu numărul de mostre oferite și cu reacțiile oamenilor.",
    ],
    includes: [
      "Promoteri instruiți pe produs și pe mesaj",
      "Coordonator care urmărește echipa pe teren",
      "Uniforme și materiale pregătite din timp",
      "Raport cu mostrele distribuite și reacțiile publicului",
    ],
  },
  {
    slug: "degustari",
    title: "Degustări",
    text: "Promoteri care prezintă produsul și invită la o primă încercare.",
    image: "/images/joburi/degustari.jpg",
    description: [
      "La degustare, clientul decide pe loc dacă îi place produsul. De aceea contează cine i-l oferă: un promoter care știe ce servește, răspunde la întrebări și îl îndrumă spre raft.",
      "Ne ocupăm de echipă de la selecție până la raportare. Promoterii respectă regulile de igienă ale magazinului, țin standul curat și notează ce spun cumpărătorii, ca să știi ce a mers și ce nu.",
    ],
    includes: [
      "Promoteri cu experiență în retail",
      "Respectarea regulilor de igienă și ale magazinului",
      "Stand ținut în ordine pe toată durata acțiunii",
      "Raport cu vânzările și părerile cumpărătorilor",
    ],
  },
  {
    slug: "premiere",
    title: "Premiere",
    text: "Echipe care răsplătesc cumpărătorii în campanii cu premii.",
    image: "/images/joburi/premiere.jpg",
    description: [
      "În campaniile cu premii, cumpărătorul primește ceva pe loc pentru produsele alese. Echipa noastră explică mecanismul, verifică bonurile și înmânează premiile corect, fără cozi și fără discuții.",
      "Promoterii țin evidența stocului de premii zi de zi, iar coordonatorul îți trimite situația la închiderea fiecărei zile. Așa știi oricând câte premii s-au dat și câte au rămas.",
    ],
    includes: [
      "Promoteri care explică limpede regulile campaniei",
      "Verificarea bonurilor și înmânarea premiilor",
      "Evidența zilnică a stocului de premii",
      "Raport pe magazine și pe zile",
    ],
  },
  {
    slug: "cross-selling",
    title: "Cross-selling",
    text: "Recomandăm produse complementare chiar la raft.",
    image: "/images/joburi/cross-selling.jpg",
    description: [
      "Cumpărătorul care a ales deja un produs e cel mai deschis la o recomandare bună. Promoterii noștri îi propun produsul care se potrivește cu ce are în coș și îi explică de ce merită luate împreună.",
      "Instruim echipa pe gama ta de produse și pe întrebările pe care le pun de obicei clienții. Recomandarea rămâne una firească, fără presiune, pentru că un client deranjat nu mai revine.",
    ],
    includes: [
      "Promoteri instruiți pe întreaga gamă",
      "Recomandări făcute firesc, fără presiune",
      "Prezență la raft în orele cu trafic mare",
      "Raport cu produsele recomandate și vândute",
    ],
  },
  {
    slug: "lansari-de-produse",
    title: "Lansări de produse",
    text: "Oameni care fac cunoscut un produs nou din prima zi.",
    image: "/images/joburi/lansari-de-produse.jpg",
    description: [
      "La o lansare ai o singură șansă să faci o primă impresie bună. Îți dăm echipa care prezintă produsul, primește invitații și are grijă ca evenimentul să decurgă după program.",
      "Lucrăm după scenariul tău sau te ajutăm să îl construiești. Fiecare om din echipă își cunoaște rolul înainte de eveniment, iar coordonatorul nostru stă pe loc de la montaj până pleacă ultimul invitat.",
    ],
    includes: [
      "Hostess și promoteri pentru eveniment și pentru teren",
      "Instruire pe produsul nou înainte de lansare",
      "Coordonator prezent pe toată durata evenimentului",
      "Sprijin la primirea invitaților și a presei",
    ],
  },
  {
    slug: "hostess-corporate",
    title: "Hostess pentru evenimente corporate",
    text: "Întâmpinare, înregistrare și ghidare a invitaților la conferințe și petreceri de firmă.",
    image: "/images/joburi/hostess-corporate.jpg",
    description: [
      "La un eveniment de firmă, hostessele sunt primii oameni pe care îi văd invitații. Ele îi întâmpină, îi înregistrează, le dau ecusoanele și îi conduc la locul potrivit.",
      "Alegem hostess cu experiență la conferințe, gale și petreceri de firmă, care vorbesc limbile de care ai nevoie. Ținuta se stabilește împreună cu tine, ca să se potrivească cu evenimentul și cu brandul.",
    ],
    includes: [
      "Întâmpinarea și înregistrarea invitaților",
      "Ghidare în sală și la mese",
      "Hostess care vorbesc limbi străine, la cerere",
      "Ținută stabilită împreună cu tine",
    ],
  },
  {
    slug: "hostess-private-vip",
    title: "Hostess pentru evenimente Private & VIP",
    text: "Prezență discretă și atentă pentru invitați speciali.",
    image: "/images/joburi/hostess-private-vip.jpg",
    description: [
      "La evenimentele private, invitații se așteaptă la atenție fără să fie deranjați. Hostessele noastre știu când să intervină și când să rămână în plan secund.",
      "Pentru astfel de evenimente alegem oameni cu experiență, punctuali și discreți. Lista invitaților și detaliile evenimentului rămân confidențiale.",
    ],
    includes: [
      "Hostess cu experiență la evenimente private",
      "Discreție și confidențialitate",
      "Atenție la invitații speciali",
      "Ținută elegantă, potrivită evenimentului",
    ],
  },
  {
    slug: "flyering",
    title: "Flyering",
    text: "Distribuire de pliante în zonele cu trafic potrivit campaniei.",
    image: "/images/joburi/flyering.jpg",
    description: [
      "Un pliant ajunge la omul potrivit doar dacă e împărțit în locul și la ora potrivită. Stabilim împreună zonele, iar promoterii noștri împart materialele acolo unde trece publicul tău.",
      "Coordonatorul verifică echipa pe teren și îți trimite fotografii din fiecare locație. Știi exact unde au ajuns pliantele și câte au fost împărțite.",
    ],
    includes: [
      "Zone și intervale orare alese împreună",
      "Promoteri care abordează politicos trecătorii",
      "Verificare pe teren, cu fotografii din fiecare locație",
      "Raport cu numărul de materiale distribuite",
    ],
  },
  {
    slug: "street-teams",
    title: "Street teams",
    text: "Echipe mobile care duc brandul în stradă.",
    image: "/images/joburi/street-teams.jpg",
    description: [
      "O echipă de stradă duce brandul acolo unde oamenii nu se așteaptă să îl întâlnească: în piețe, în campusuri, la ieșirea de la metrou. Promoterii intră în vorbă cu trecătorii și îi fac părtași la campanie.",
      "Echipele se mută dintr-o zonă în alta după un traseu stabilit dinainte. Tu vezi în fiecare zi pe unde au fost și cu câți oameni au vorbit.",
    ],
    includes: [
      "Echipe mobile, cu traseu stabilit dinainte",
      "Promoteri sociabili, obișnuiți cu lucrul în stradă",
      "Uniforme și materiale de brand",
      "Raport zilnic cu traseul și cu numărul de contacte",
    ],
  },
  {
    slug: "festivaluri",
    title: "Festivaluri",
    text: "Promoteri pentru activări de brand la festivaluri.",
    image: "/images/joburi/festivaluri.jpg",
    description: [
      "La festival, publicul vine să se distreze, iar brandul tău trebuie să facă parte din distracție. Promoterii noștri animă standul, explică activarea și țin oamenii aproape.",
      "Festivalurile înseamnă zile lungi, aglomerație și vreme schimbătoare. Formăm echipe care rezistă la acest ritm și le organizăm pe ture, ca standul să fie la fel de viu în ultima seară ca în prima.",
    ],
    includes: [
      "Promoteri energici, obișnuiți cu festivalurile",
      "Organizare pe ture, pe toată durata festivalului",
      "Coordonator la stand",
      "Raport cu numărul de participanți la activare",
    ],
  },
  {
    slug: "targuri-si-expozitii",
    title: "Târguri și expoziții",
    text: "Hostess la stand, care primesc vizitatorii și prezintă oferta.",
    image: "/images/joburi/targuri-si-expozitii.jpg",
    description: [
      "La un târg, vizitatorul trece pe lângă zeci de standuri într-o oră. Hostessele noastre îl opresc la al tău, îi prezintă pe scurt oferta și îl conduc la omul de vânzări potrivit.",
      "Înainte de târg, echipa învață produsele, prețurile și răspunsurile la întrebările obișnuite. În timpul târgului strânge datele de contact ale celor interesați, ca să ai cu cine vorbi după eveniment.",
    ],
    includes: [
      "Hostess instruite pe oferta ta",
      "Primirea vizitatorilor și prezentarea standului",
      "Colectarea datelor de contact ale celor interesați",
      "Hostess care vorbesc limbi străine, la cerere",
    ],
  },
  {
    slug: "hostess-tigari",
    title: "Hostess – țigări",
    text: "Personal pentru campaniile brandurilor de tutun, adresate adulților.",
    image: "/images/joburi/hostess-tigari.jpg",
    description: [
      "Campaniile pentru produse din tutun au reguli stricte, iar echipa trebuie să le cunoască. Hostessele noastre se adresează numai fumătorilor adulți și verifică vârsta înainte de orice discuție.",
      "Lucrăm în locațiile și în condițiile permise de lege și de politica brandului. Fiecare hostess este instruită pe produs, pe mesajul campaniei și pe ce are și ce nu are voie să spună.",
    ],
    includes: [
      "Hostess instruite pe regulile campaniilor de tutun",
      "Verificarea vârstei înaintea oricărei discuții",
      "Activitate numai în locațiile permise",
      "Raport cu numărul de contacte",
    ],
  },
  {
    slug: "cazinouri",
    title: "Cazinouri",
    text: "Hostess pentru primirea și însoțirea clienților în cazinouri.",
    image: "/images/joburi/cazinouri.jpg",
    description: [
      "Într-un cazinou, clientul trebuie să se simtă binevenit din clipa în care intră. Hostessele noastre îl primesc, îl însoțesc și au grijă să nu îi lipsească nimic.",
      "Alegem oameni cu ținută, răbdare și experiență în lucrul de noapte. Echipa respectă regulile casei și păstrează discreția față de clienți.",
    ],
    includes: [
      "Hostess cu experiență în ospitalitate",
      "Disponibilitate pentru ture de seară și de noapte",
      "Discreție față de clienți",
      "Respectarea regulilor casei",
    ],
  },
  {
    slug: "brand-ambassadors",
    title: "Brand Ambassadors",
    text: "Oameni care reprezintă brandul pe termen lung, cu aceeași față și același mesaj.",
    image: "/images/joburi/brand-ambassadors.jpg",
    description: [
      "Un brand ambassador nu vine pentru o singură zi. Este omul pe care publicul ajunge să îl recunoască și să îl lege de brandul tău, la fiecare eveniment și în fiecare campanie.",
      "Căutăm oameni care se potrivesc cu valorile brandului și care pot rămâne alături de tine luni la rând. Îi instruim temeinic, iar tu lucrezi mereu cu aceeași echipă.",
    ],
    includes: [
      "Selecție după profilul și valorile brandului",
      "Colaborare pe termen lung, cu aceiași oameni",
      "Instruire temeinică pe brand și pe produse",
      "Prezență la evenimente, în magazine și în campanii",
    ],
  },
];

export function getJob(slug) {
  return jobs.find((job) => job.slug === slug);
}

// TODO: până avem poze proprii pentru fiecare job, galeria împrumută
// imaginile următoarelor două joburi din listă.
export function getGallery(job) {
  const index = jobs.indexOf(job);
  return [1, 2].map((step) => jobs[(index + step) % jobs.length].image);
}
