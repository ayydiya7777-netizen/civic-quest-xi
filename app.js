
/* CIVIC QUEST XI
   Mode demo: localStorage
   Mode online: Supabase
*/
const SUPABASE_URL = "https://qqingsyczvncvmztyiji.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6h2HHfXRMIFfrpbpuVfuVQ_sJll3eqm";
const GROUP_CODES = {
  "Garuda Pancasila": "GARUDA01",
  "Bhinneka Tunggal Ika": "BHINNEKA02",
  "Cakra Nusantara": "CAKRA03",
  "Patriot Muda": "PATRIOT04",
  "Ksatria Pancasila": "KSATRIA05",
  "Benteng Persatuan": "BENTENG06",
  "Generasi Emas": "EMAS07",
  "Garda Konstitusi": "GARDA08",
  "Pemuda Demokrasi": "DEMOKRASI09",
  "Pelopor Keadilan": "ADIL10"
};
const TEACHER_CODE = "GURU-CQXI";


// ILUSTRASI PUZZLE TOLERANSI
const toleranceSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#dceeff"/>
  <circle cx="680" cy="85" r="45" fill="#f5cb68"/>
  <path d="M0 330 Q180 260 350 330 T800 310 V500 H0Z" fill="#9bcf9c"/>
  <rect x="245" y="105" width="310" height="190" rx="12" fill="#f4d7a0"/>
  <path d="M220 115 L400 35 L580 115Z" fill="#c93643"/>
  <rect x="365" y="190" width="70" height="105" fill="#8b6548"/>
  <g fill="#a9d8f5">
    <rect x="275" y="145" width="55" height="55"/>
    <rect x="470" y="145" width="55" height="55"/>
  </g>
  <g fill="#397b4b">
    <circle cx="95" cy="220" r="65"/>
    <circle cx="710" cy="235" r="70"/>
  </g>
  <g>
    <circle cx="170" cy="275" r="31" fill="#a96c48"/>
    <path d="M125 390 Q130 310 170 310 Q210 310 215 390Z" fill="#c93643"/>
    <circle cx="310" cy="265" r="31" fill="#e0aa7b"/>
    <path d="M265 390 Q270 300 310 300 Q350 300 355 390Z" fill="#28649b"/>
    <circle cx="450" cy="265" r="31" fill="#8b563e"/>
    <path d="M405 390 Q410 300 450 300 Q490 300 495 390Z" fill="#e8b84f"/>
    <circle cx="590" cy="275" r="31" fill="#d99b70"/>
    <path d="M545 390 Q550 310 590 310 Q630 310 635 390Z" fill="#7657a5"/>
  </g>
  <g fill="#fff">
    <circle cx="160" cy="270" r="4"/><circle cx="180" cy="270" r="4"/>
    <circle cx="300" cy="260" r="4"/><circle cx="320" cy="260" r="4"/>
    <circle cx="440" cy="260" r="4"/><circle cx="460" cy="260" r="4"/>
    <circle cx="580" cy="270" r="4"/><circle cx="600" cy="270" r="4"/>
  </g>
  <g stroke="#fff" stroke-width="3" fill="none">
    <path d="M160 285 Q170 295 180 285"/>
    <path d="M300 275 Q310 285 320 275"/>
    <path d="M440 275 Q450 285 460 275"/>
    <path d="M580 285 Q590 295 600 285"/>
  </g>
  <text x="400" y="455" text-anchor="middle"
    font-family="Arial" font-size="24" font-weight="bold"
    fill="#14233d">BERBEDA KEYAKINAN, TETAP HIDUP RUKUN</text>
</svg>`;

const PUZZLE_IMAGE =
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(toleranceSVG);

// TIGA PERTANYAAN ANALISIS KELAS XI
const toleranceQuestions = [
  {
    q: "Dalam masyarakat majemuk, apa prinsip utama yang harus diterapkan untuk menjaga kerukunan antarumat beragama?",
    options: [
      "Menyeragamkan seluruh keyakinan masyarakat",
      "Menghormati perbedaan dan menjamin kebebasan beragama",
      "Mengutamakan kelompok agama mayoritas",
      "Membatasi interaksi antarkelompok agama"
    ],
    answer: 1,
    explain: "Toleransi berarti menghormati perbedaan dan hak setiap orang untuk menjalankan agama atau kepercayaannya."
  },
  {
    q: "Apa makna konstitusional Pasal 29 ayat (2) UUD NRI Tahun 1945?",
    options: [
      "Negara hanya mengakui satu agama",
      "Masyarakat wajib memiliki keyakinan yang sama",
      "Negara menjamin kemerdekaan penduduk untuk memeluk agama dan beribadat menurut agama dan kepercayaannya",
      "Kebebasan beragama hanya berlaku di lingkungan keluarga"
    ],
    answer: 2,
    explain: "Pasal 29 ayat (2) menjamin kemerdekaan tiap-tiap penduduk untuk memeluk agama dan beribadat menurut agama dan kepercayaannya."
  },
  {
    q: "Jika terjadi tindakan intoleransi di sekolah, tindakan yang paling tepat berdasarkan nilai Pancasila adalah ...",
    options: [
      "Membalas tindakan tersebut dengan diskriminasi",
      "Membiarkannya agar tidak terjadi konflik",
      "Menyebarkan identitas pelaku di media sosial",
      "Melindungi pihak yang dirugikan, berdialog, dan melaporkan melalui mekanisme sekolah yang tepat"
    ],
    answer: 3,
    explain: "Penyelesaian harus mengutamakan perlindungan hak, dialog, keadilan, dan mekanisme yang bertanggung jawab."
  }
];

const online = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase
);
const db = online
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const missions = [
{
 id:1, title:"Ketuhanan Yang Maha Esa",
 focus:"Toleransi, kebebasan beragama, dan penghormatan terhadap keyakinan.",
 brief:"Sila pertama mengajarkan penghormatan terhadap kebebasan beragama dan berkepercayaan. Analisislah fakta tanpa prasangka terhadap kelompok agama tertentu.",
 prompt:"Cari kasus faktual tentang intoleransi, diskriminasi agama, atau hambatan beribadah.",
 law:"UUD NRI Tahun 1945 Pasal 28E ayat (1)–(2) dan Pasal 29 ayat (2). Jelaskan kaitannya dengan kasus dan periksa aturan relevan lainnya.",
 quiz:{
  q:"Temanmu sedang menjalankan ibadah. Sikap yang paling sesuai dengan sila pertama adalah…",
  options:["Mengejek keyakinannya","Menghormati dan tidak mengganggu ibadah","Memaksanya mengikuti keyakinan kita","Menyebarkan informasi pribadinya"],
  answer:1,
  explain:"Menghormati kebebasan beragama dan tidak mengganggu ibadah merupakan bentuk penghormatan terhadap keyakinan."
 }
},
{
 id:2, title:"Kemanusiaan yang Adil dan Beradab",
 focus:"Martabat manusia, kesetaraan, anti-kekerasan, dan perlindungan hak.",
 brief:"Sila kedua menekankan perlakuan yang adil, beradab, dan menghormati martabat manusia. Perhatikan korban, hak yang terdampak, serta relasi kuasa.",
 prompt:"Cari kasus faktual tentang perundungan, kekerasan, diskriminasi, atau pelanggaran hak.",
 law:"UUD NRI Tahun 1945 Pasal 28A–28J dapat menjadi titik awal. Untuk kasus anak, telusuri UU Perlindungan Anak beserta perubahan yang berlaku.",
 quiz:{
  q:"Seorang siswa mengalami perundungan. Respons yang tepat adalah…",
  options:["Menyebarkan videonya","Menyalahkan korban","Membantu korban dan melapor melalui jalur aman","Menganggapnya candaan biasa"],
  answer:2,
  explain:"Sikap beradab mengutamakan empati, perlindungan martabat, dan tindakan aman untuk menghentikan kekerasan."
 }
},

{
 id:3,
 title:"Persatuan Indonesia",
 focus:"Kebinekaan, solidaritas, dan menjaga persatuan dalam perbedaan.",
 brief:`
  <h2>🌏 MISI 3: NUSANTARA CHALLENGE</h2>
  <h3>Mengenal Keberagaman, Menguatkan Persatuan</h3>

  <h3>🎯 TUJUAN PEMBELAJARAN</h3>
  <p>Setelah mengikuti permainan Nusantara Challenge, peserta didik diharapkan mampu:</p>
  <ol>
   <li>Mengidentifikasi keberagaman budaya, sejarah, identitas daerah, dan landmark Indonesia.</li>
   <li>Menjelaskan hubungan keberagaman budaya dengan semboyan Bhinneka Tunggal Ika.</li>
   <li>Menganalisis peran keberagaman dalam memperkuat persatuan dan kesatuan bangsa.</li>
   <li>Menunjukkan sikap toleransi, menghargai perbedaan, cinta tanah air, dan menjaga persatuan sesuai nilai Sila Ketiga Pancasila.</li>
  </ol>

  <h3>📖 LATAR BELAKANG TANTANGAN</h3>
  <p>Indonesia merupakan negara yang kaya akan keberagaman suku, budaya, bahasa, adat istiadat, dan karakteristik daerah. Setiap daerah memiliki identitas dan keunikan yang menjadi kekayaan bangsa.</p>
  <p>Melalui Nusantara Challenge, kalian akan menjelajahi berbagai daerah di Indonesia, mengenali landmark dan identitas budayanya, serta memahami bahwa keberagaman merupakan kekuatan untuk memperkokoh persatuan bangsa.</p>

  <h3>⚔️ ATURAN PERMAINAN</h3>
  <ol>
   <li>Perhatikan petunjuk dan pertanyaan yang muncul.</li>
   <li>Identifikasi nama daerah, landmark, atau budaya yang dimaksud.</li>
   <li>Pilih jawaban yang paling tepat.</li>
   <li>Gunakan petunjuk apabila mengalami kesulitan.</li>
   <li>Selesaikan seluruh tantangan untuk memperoleh poin.</li>
   <li>Diskusikan hubungan keberagaman dengan Sila Ketiga Pancasila.</li>
  </ol>

  <h3>🚀 LANGKAH PENYELESAIAN</h3>
  <ul>
   <li>Amati informasi dan petunjuk pada setiap tantangan.</li>
   <li>Kenali landmark serta karakteristik daerah di Indonesia.</li>
   <li>Jawab setiap tantangan dengan teliti.</li>
   <li>Pelajari penjelasan dari setiap jawaban.</li>
   <li>Tarik kesimpulan tentang pentingnya menjaga persatuan dalam keberagaman.</li>
  </ul>

  <h3>🏆 TANTANGAN KELOMPOK</h3>
  <p>Buktikan bahwa kelompok kalian mampu menjelajahi kekayaan Nusantara! Kenali keberagaman daerah, kumpulkan poin, dan tunjukkan bahwa perbedaan dapat menjadi kekuatan untuk membangun Indonesia yang bersatu.</p>

 <h3>🔎 TUGAS TAMBAHAN: INVESTIGASI KASUS</h3>
<p>Setelah menyelesaikan permainan Nusantara Challenge, setiap kelompok mendapatkan tantangan tambahan untuk mencari dan menganalisis kasus faktual yang berkaitan dengan konflik antarkelompok, penyebaran hoaks pemecah belah, atau ujaran kebencian berbasis identitas.</p>
<h3>💭 PERTANYAAN REFLEKSI</h3>
  <p>Indonesia memiliki banyak daerah dengan budaya, sejarah, dan karakteristik yang berbeda. Bagaimana keberagaman tersebut dapat memperkuat persatuan bangsa sesuai nilai Sila Ketiga Pancasila?</p>


<p>Identifikasi fakta kasus, penyebab, dampak, aturan hukum yang relevan, serta solusi yang dapat dilakukan untuk menjaga persatuan bangsa.</p>

<p><strong>Ingat!</strong> Keberagaman harus menjadi kekuatan bangsa, bukan alasan untuk saling memecah belah.</p>
 `,
 prompt:"Cari kasus faktual tentang konflik antarkelompok, hoaks pemecah belah, atau ujaran kebencian berbasis identitas.",
 law:"UUD NRI Tahun 1945 Pasal 1 ayat (1) dan ketentuan relevan sesuai konteks. UU ITE atau aturan lainnya hanya digunakan jika sesuai dengan fakta dan unsur hukumnya.",
 quiz:{
  q:"Beredar pesan viral yang menuduh kelompok tertentu tanpa bukti. Apa yang sebaiknya dilakukan?",
  options:["Langsung meneruskan pesan","Memeriksa sumber sebelum membagikan","Menambahkan hinaan","Menganggap pesan viral pasti benar"],
  answer:1,
  explain:"Memeriksa informasi dan menolak provokasi membantu mencegah prasangka serta menjaga persatuan."
 }
},


{
  id: 4,
  title: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
  focus: "Musyawarah, partisipasi, keterbukaan, dan keputusan bijaksana.",
  brief: `
    <h2>🗳️ MISI 4: RAHASIA MUSYAWARAH</h2>
    <h3>Mengungkap Makna Sila Keempat Pancasila</h3>

    <p>Selamat datang di tantangan Rahasia Musyawarah!
    Dalam misi ini, kamu akan menguji pengetahuan tentang
    nilai-nilai sila keempat Pancasila melalui permainan
    Tebak Kotak. Temukan lima kata rahasia berdasarkan
    petunjuk yang tersedia dan pahami makna setiap kata
    dalam kehidupan demokrasi.</p>

    <h3>🎯 Tujuan Pembelajaran</h3>
    <ol>
      <li>Mengidentifikasi makna dan nilai-nilai sila keempat Pancasila.</li>
      <li>Menjelaskan pentingnya musyawarah, mufakat, dan menghargai perbedaan pendapat.</li>
      <li>Menganalisis penerapan nilai demokrasi dan partisipasi dalam kehidupan sehari-hari.</li>
      <li>Menunjukkan sikap bijaksana dan bertanggung jawab dalam mengambil keputusan bersama.</li>
    </ol>

    <h3>📖 Petunjuk Pengerjaan</h3>
    <ol>
      <li>Bacalah petunjuk pada setiap tantangan.</li>
      <li>Perhatikan jumlah kotak huruf yang tersedia.</li>
      <li>Ketik jawaban menggunakan huruf kapital.</li>
      <li>Klik tombol Periksa Jawaban.</li>
      <li>Gunakan Lihat Bantuan jika mengalami kesulitan.</li>
      <li>Setiap jawaban benar memperoleh 20 XP.</li>
      <li>Selesaikan kelima tantangan.</li>
    </ol>

    <div class="notice">
      <b>💡 Ingat!</b>
      Musyawarah bukan tentang siapa yang paling kuat
      mempertahankan pendapat, melainkan bagaimana setiap
      pendapat dihargai untuk menghasilkan keputusan
      yang bijaksana dan bertanggung jawab.
    </div>
  `,
  prompt: "Cari kasus faktual tentang pengambilan keputusan yang tidak demokratis, pengabaian aspirasi masyarakat, atau masalah musyawarah dalam kehidupan publik.",
  law: "UUD NRI Tahun 1945 Pasal 1 ayat (2), Pasal 22E, dan ketentuan terkait lembaga perwakilan sesuai konteks kasus."
},


{
 id:5, title:"Keadilan Sosial bagi Seluruh Rakyat Indonesia",
 focus:"Kesetaraan kesempatan, akses layanan, kesejahteraan, dan keadilan.",
 brief:"Sila kelima mendorong terwujudnya keadilan sosial. Perhatikan siapa yang memperoleh manfaat, siapa yang dirugikan, dan faktor penyebab ketimpangan.",
 prompt:"Cari kasus faktual tentang ketimpangan akses pendidikan, pelayanan publik, kesempatan kerja, atau distribusi bantuan.",
 law:"UUD NRI Tahun 1945 Pasal 27 ayat (2), Pasal 31, atau Pasal 34 dapat relevan bergantung pada kasus. Telusuri aturan sektoral yang tepat.",
 quiz:{
  q:"Bantuan perlengkapan belajar terbatas. Bagaimana membagikannya secara adil?",
  options:["Hanya kepada teman dekat","Secara acak tanpa mempertimbangkan kebutuhan","Dengan kriteria transparan berdasarkan kebutuhan","Kepada siswa paling populer"],
  answer:2,
  explain:"Keadilan sosial membutuhkan kriteria yang transparan dan memperhatikan kebutuhan yang relevan."
 }
}
];

const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? "").replace(
  /[&<>"']/g,
  c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])
);
const emptyState = () => ({
  group:"", code:"", members:"", xp:0,
  quizzes:[], reports:{}, createdAt:new Date().toISOString()
});

let state = emptyState();
let current = 1;
let tab = "brief";
let teacherOpen = false;

function notify(message, good=false) {
  const el=$("toast");
  el.textContent=message;
  el.className="notice"+(good?" good":"");
  el.classList.remove("hidden");
  setTimeout(()=>el.classList.add("hidden"),3500);
}
function show(id) {
  ["login","student","missionPage","teacher"].forEach(
    x=>$(x).classList.toggle("hidden",x!==id)
  );
}
function keyFor(group,code) {
  return (code+"_"+group).toLowerCase().replace(/[^a-z0-9_-]/g,"_");
}
function localKey() { return "cqxi_"+keyFor(state.group,state.code); }
function getDB() {
  try { return JSON.parse(localStorage.getItem("cqxi_db") ||
    '{"groups":[],"reports":[]}'); }
  catch { return {groups:[],reports:[]}; }
}
function saveDB(data) {
  localStorage.setItem("cqxi_db",JSON.stringify(data));
}
function finished() {
  return missions.filter(m=>state.quizzes.includes(m.id)&&state.reports[m.id]).length;
}
function getBadges() {
  return [
    ["🧠","Pemecah Kode",state.quizzes.length>0],
    ["🔎","Peneliti Fakta",Object.keys(state.reports).length>0],
    ["⚖️","Legal Hunter",Object.values(state.reports).some(r=>r.law.length>10)],
    ["🤝","Kolaborator",state.members.trim().length>4],
    ["🤝","Duta Toleransi",state.quizzes.includes(1)],
    ["⚖️","Ahli Kemanusiaan",state.quizzes.includes(2)],
    ["🏆","Penjaga Pancasila",finished()===5]
  ];
}

function saveLocal() {
  localStorage.setItem(localKey(),JSON.stringify(state));
  const data=getDB(),key=keyFor(state.group,state.code);
  const group={
    key,group:state.group,members:state.members,xp:state.xp,
    quizzes:state.quizzes,completed:finished(),
    reportCount:Object.keys(state.reports).length,
    updated:new Date().toISOString()
  };
  const index=data.groups.findIndex(g=>g.key===key);
  if(index<0)data.groups.push(group);else data.groups[index]=group;
  data.reports=data.reports.filter(r=>r.key!==key);
  Object.values(state.reports).forEach(r=>data.reports.push({
    ...r,key,group:state.group
  }));
  saveDB(data);
}

async function syncOnline() {
  if(!online)return;
  try {
    const key=keyFor(state.group,state.code);
    const {error}=await db.from("cqxi_groups").upsert({
      group_key:key,group_name:state.group,group_code:state.code,
      members:state.members,xp:state.xp,quiz_done:state.quizzes,
      updated_at:new Date().toISOString()
    },{onConflict:"group_key"});
    if(error)throw error;

    for(const r of Object.values(state.reports)){
      const {error:reportError}=await db.from("cqxi_reports").upsert({
        group_key:key,mission_id:r.id,mission_title:r.title,
        case_title:r.caseTitle,source_url:r.source,
        facts:r.facts,causes:r.causes,impacts:r.impacts,
        law:r.law,solution:r.solution,pancasila_link:r.link,
        submitted_at:r.submitted
      },{onConflict:"group_key,mission_id"});
      if(reportError)throw reportError;
    }
    $("connection").textContent="ONLINE • TERSAMBUNG";
  } catch(error) {
    console.error(error);
    $("connection").textContent="ONLINE • GAGAL SINKRON";
    notify("Sinkronisasi gagal. Periksa konfigurasi Supabase.");
  }
}
async function persist() {
  saveLocal();
  await syncOnline();
  renderStudent();
}

async function login(e) {
  e.preventDefault();
  const group=$("group").value.trim();
  const code=$("access").value.trim();
  const members=$("members").value.trim();

  const expectedCode = GROUP_CODES[group];

if (!expectedCode || code !== expectedCode) {
  notify("Nama kelompok atau kode akses tidak sesuai.");
  return;
}

  const key=keyFor(group,code);
  state=emptyState();
  if(online){
    try{
      const {data,error}=await db.from("cqxi_groups")
        .select("*").eq("group_key",key).maybeSingle();
      if(error)throw error;
      if(data){
        state.group=data.group_name;
        state.code=data.group_code;
        state.members=data.members||"";
        state.xp=data.xp||0;
        state.quizzes=data.quiz_done||[];
        const {data:reports,error:re}=await db.from("cqxi_reports")
          .select("*").eq("group_key",key);
        if(re)throw re;
        (reports||[]).forEach(r=>{
          state.reports[r.mission_id]={
            id:r.mission_id,title:r.mission_title,
            caseTitle:r.case_title,source:r.source_url,
            facts:r.facts,causes:r.causes,impacts:r.impacts,
            law:r.law,solution:r.solution,link:r.pancasila_link,
            submitted:r.submitted_at
          };
        });
      }
    }catch(err){console.error(err);notify("Data online gagal dimuat.");}
  } else {
    try {
      const saved=localStorage.getItem("cqxi_"+key);
      if(saved)state=JSON.parse(saved);
    } catch {}
  }
  state.group=group;state.code=code;state.members=members;
  await persist();
  $("connection").textContent=online?"ONLINE":"MODE DEMO • LOKAL";
  show("student");
  notify("Selamat datang, "+group+"!",true);
}

function renderStudent() {
  $("welcome").textContent=state.group;
  $("xp").textContent=state.xp+" XP";
  $("done").textContent=finished()+"/5";
  $("quizzes").textContent=state.quizzes.length+"/5";
  const progress=Math.round((state.quizzes.length+
    Object.keys(state.reports).length)/10*100);
  $("percent").textContent=progress+"%";
  $("level").textContent="LEVEL "+(Math.floor(state.xp/100)+1);
  $("progressText").textContent=(state.quizzes.length+
    Object.keys(state.reports).length)+"/10 capaian";
  $("progressBar").style.width=progress+"%";

  $("missionGrid").innerHTML=missions.map(m=>{
    const q=state.quizzes.includes(m.id),r=!!state.reports[m.id];
    return `<article class="card mission">
      <span class="tag">LEVEL ${m.id}</span>
      <h3>${escapeHTML(m.title)}</h3>
      <p class="muted">${escapeHTML(m.focus)}</p>
      <p>${q?"✅ Mini-game selesai":"○ Mini-game belum selesai"}</p>
      <p>${r?"✅ Laporan dikirim":"○ Laporan belum dikirim"}</p>
      <div class="progress"><span style="width:${(Number(q)+Number(r))*50}%"></span></div>
      <button class="btn dark" style="margin-top:12px" data-open="${m.id}">Buka misi →</button>
    </article>`;
  }).join("");

  $("badges").innerHTML=getBadges().map(b=>
    `<div class="badge ${b[2]?"earned":""}">${b[0]} ${b[1]} ${b[2]?"✓":"🔒"}</div>`
  ).join("");
}

function openMission(id) {
  current=Number(id);tab="brief";
  const m=missions.find(x=>x.id===current);
  $("missionTitle").textContent=m.title;
  $("missionLevel").textContent="LEVEL "+m.id;
  $("focus").textContent=m.focus;
  renderMission();
  show("missionPage");
}
function setTab(name) {
  tab=name;
  document.querySelectorAll("[data-tab]").forEach(b=>
    b.classList.toggle("active",b.dataset.tab===name));
  $("brief").classList.toggle("hidden",name!=="brief");
  $("quiz").classList.toggle("hidden",name!=="quiz");
  $("formPanel").classList.toggle("hidden",name!=="form");
}

/* MINI-GAME 1: PUZZLE TOLERANSI */
let puzzleState = null;
let puzzleClock = null;

function stopPuzzleClock() {
  if (puzzleClock) {
    clearInterval(puzzleClock);
    puzzleClock = null;
  }
}

function shufflePuzzle(size) {
  const total = size * size;
  let tiles = Array.from({length: total}, (_, i) => i);

  // Acak dan pastikan susunannya tidak langsung benar
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (tiles.every((v, i) => v === i));

  return tiles;
}

function startPuzzle(size) {
  stopPuzzleClock();

  puzzleState = {
    size,
    tiles: shufflePuzzle(size),
    selected: null,
    remaining: 180,
    phase: "puzzle",
    questionIndex: 0,
    feedback: ""
  };

  renderMission();
}

function startPuzzleClock() {
  stopPuzzleClock();

  if (!puzzleState || puzzleState.phase !== "puzzle") return;

  puzzleClock = setInterval(() => {
    if (!puzzleState || puzzleState.phase !== "puzzle") {
      stopPuzzleClock();
      return;
    }

    puzzleState.remaining--;

    const timer = $("puzzleTimer");
    if (timer) {
      const minutes = Math.floor(puzzleState.remaining / 60);
      const seconds = puzzleState.remaining % 60;
      timer.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
    }

    if (puzzleState.remaining <= 0) {
      stopPuzzleClock();
      puzzleState = null;
      renderMission();
      notify("Waktu habis. Silakan coba puzzle kembali.");
    }
  }, 1000);
}

function renderPuzzleGame() {
  if (state.quizzes.includes(1)) {
    return `
      <div class="notice good">
        <h3>🏅 Puzzle Toleransi Selesai!</h3>
        <p>Kamu telah menyelesaikan mini-game dan pertanyaan analisis.</p>
        <b>+20 XP telah tercatat.</b>
        <p>Badge: Duta Toleransi</p>
      </div>`;
  }

  if (!puzzleState) {
    return `
      <span class="tag">MINI-GAME • +20 XP</span>
      <h3>🧩 Puzzle Toleransi</h3>
      <p>Susun gambar keberagaman masyarakat Indonesia.
      Setelah gambar selesai, kamu harus menjawab tiga pertanyaan analisis.</p>

      <img src="${PUZZLE_IMAGE}" alt="Ilustrasi keberagaman masyarakat Indonesia"
        style="width:100%;max-height:260px;object-fit:contain;
        border-radius:12px;background:#eaf2fa;margin:12px 0">

      <h3>Pilih tingkat kesulitan</h3>
      <div class="grid">
        <button class="btn light" data-puzzle-level="2">
          Pemula<br>4 keping
        </button>
        <button class="btn light" data-puzzle-level="3">
          Menengah<br>9 keping
        </button>
        <button class="btn dark" data-puzzle-level="4">
          Ahli<br>16 keping
        </button>
      </div>
      <p class="muted">Waktu pengerjaan: maksimal 3 menit.</p>`;
  }

  if (puzzleState.phase === "analysis") {
    const q = toleranceQuestions[puzzleState.questionIndex];

    return `
      <span class="tag">TAHAP ANALISIS</span>
      <h3>Puzzle berhasil disusun! 🎉</h3>
      <p>Jawab pertanyaan berikut untuk menuntaskan misi.</p>
      <p><b>Pertanyaan ${puzzleState.questionIndex + 1} dari 3</b></p>
      <h3>${escapeHTML(q.q)}</h3>
      ${q.options.map((o, i) => `
        <button class="option" data-tolerance-answer="${i}">
          ${String.fromCharCode(65+i)}. ${escapeHTML(o)}
        </button>
      `).join("")}
      <div id="puzzleFeedback">
        ${puzzleState.feedback ?
          `<div class="notice bad">${escapeHTML(puzzleState.feedback)}</div>` : ""}
      </div>`;
  }

  const n = puzzleState.size;
  const tiles = puzzleState.tiles;

  return `
    <span class="tag">PUZZLE TOLERANSI • ${n*n} KEPING</span>
    <row style="justify-content:space-between;align-items:center">
      <b>Waktu tersisa</b>
      <title id="puzzleTimer" color="danger" size="xl" tabularNums>
        ${String(Math.floor(puzzleState.remaining/60)).padStart(2,"0")}:${String(puzzleState.remaining%60).padStart(2,"0")}
      </title>
    </row>
    <p class="muted">Ketuk satu kepingan, lalu ketuk kepingan lain untuk menukar posisinya.</p>

    <div style="
      display:grid;
      grid-template-columns:repeat(${n},1fr);
      gap:4px;
      width:100%;
      max-width:460px;
      margin:16px auto;
      background:#14233d;
      padding:5px;
      border-radius:12px;">
      ${tiles.map((tile, position) => {
        const row = Math.floor(tile / n);
        const col = tile % n;
        const bgX = n === 1 ? 0 : col / (n - 1) * 100;
        const bgY = n === 1 ? 0 : row / (n - 1) * 100;
        const selected = puzzleState.selected === position;

        return `
          <button type="button"
            data-puzzle-piece="${position}"
            aria-label="Kepingan puzzle ${position+1}"
            style="
              aspect-ratio:1;
              min-width:0;
              padding:0;
              border:${selected ? "4px solid #f2c96d" : "1px solid white"};
              border-radius:5px;
              cursor:pointer;
              background-image:url('${PUZZLE_IMAGE}');
              background-size:${n*100}% ${n*100}%;
              background-position:${bgX}% ${bgY}%;
              outline:${selected ? "3px solid #c93643" : "none"};
            ">
          </button>`;
      }).join("")}
    </div>

    <button class="btn light" data-puzzle-restart="true">
      ↻ Acak ulang puzzle
    </button>
    <p class="muted">Pastikan semua kepingan membentuk gambar yang utuh.</p>`;
}

function selectPuzzlePiece(position) {
  if (!puzzleState || puzzleState.phase !== "puzzle") return;

  if (puzzleState.selected === null) {
    puzzleState.selected = position;
  } else {
    const first = puzzleState.selected;

    [
      puzzleState.tiles[first],
      puzzleState.tiles[position]
    ] = [
      puzzleState.tiles[position],
      puzzleState.tiles[first]
    ];

    puzzleState.selected = null;
  }

  const solved = puzzleState.tiles.every((v, i) => v === i);

  if (solved) {
    stopPuzzleClock();
    puzzleState.phase = "analysis";
    puzzleState.feedback = "";
    notify("Puzzle berhasil! Lanjutkan pertanyaan analisis.", true);
  }

  $("quiz").innerHTML = renderPuzzleGame();
}

async function answerTolerance(index) {
  if (!puzzleState || puzzleState.phase !== "analysis") return;

  const q = toleranceQuestions[puzzleState.questionIndex];

  if (index !== q.answer) {
    puzzleState.feedback =
      "Jawaban belum tepat. " + q.explain + " Coba lagi.";
    $("quiz").innerHTML = renderPuzzleGame();
    return;
  }

  puzzleState.feedback = "";
  puzzleState.questionIndex++;

  if (puzzleState.questionIndex >= toleranceQuestions.length) {
    state.quizzes.push(1);
    state.xp += 20;

    puzzleState = null;
    await persist();

    renderMission();
    setTab("quiz");
    notify("Hebat! Misi Puzzle Toleransi selesai. +20 XP", true);
    return;
  }

  $("quiz").innerHTML = renderPuzzleGame();
}


// ===================================
// GAME 2: TEKA-TEKI SILANG SILA KEDUA
// ===================================

let crosswordAnswers = {};

const crosswordWords = [
  {
    number: 1,
    word: "PERSAMAAN",
    row: 0,
    col: 7,
    dir: "down",
    clue: "Prinsip HAM bahwa setiap orang memiliki kedudukan yang sama di hadapan hukum."
  },
  {
    number: 2,
    word: "EMPATI",
    row: 0,
    col: 12,
    dir: "down",
    clue: "Kemampuan memahami perasaan dan keadaan orang lain."
  },
  {
    number: 3,
    word: "KEMANUSIAAN",
    row: 1,
    col: 9,
    dir: "down",
    clue: "Nilai sila kedua yang menekankan penghormatan terhadap martabat manusia."
  },
  {
    number: 4,
    word: "DISKRIMINASI",
    row: 5,
    col: 1,
    dir: "across",
    clue: "Perlakuan tidak adil terhadap seseorang berdasarkan perbedaan tertentu."
  },
  {
    number: 5,
    word: "KEADILAN",
    row: 8,
    col: 0,
    dir: "across",
    clue: "Sikap memberikan hak kepada seseorang secara layak dan tidak memihak."
  },
  {
    number: 6,
    word: "ADIL",
    row: 8,
    col: 2,
    dir: "down",
    clue: "Sikap tidak berat sebelah."
  },
  {
    number: 7,
    word: "HAK",
    row: 9,
    col: 11,
    dir: "down",
    clue: "Sesuatu yang seharusnya diterima atau diperoleh seseorang."
  },
  {
    number: 8,
    word: "MARTABAT",
    row: 10,
    col: 5,
    dir: "across",
    clue: "Nilai kehormatan dan harga diri manusia."
  }
];

function getCrosswordCells() {
  const cells = {};

  crosswordWords.forEach(item => {
    for (let i = 0; i < item.word.length; i++) {
      const r = item.row + (item.dir === "down" ? i : 0);
      const c = item.col + (item.dir === "across" ? i : 0);
      const key = `${r}-${c}`;

      cells[key] = {
        letter: item.word[i],
        row: r,
        col: c
      };
    }
  });

  return cells;
}

function renderCrosswordGame() {
  const cells = getCrosswordCells();
  const numbers = {};

  crosswordWords.forEach(item => {
    numbers[`${item.row}-${item.col}`] = item.number;
  });

  let board = "";

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 13; c++) {
      const key = `${r}-${c}`;
      const cell = cells[key];

      if (!cell) {
        board += `<div></div>`;
        continue;
      }

      const number = numbers[key] || "";
      const value = crosswordAnswers[key] || "";

      board += `
        <div style="
          position:relative;
          width:26px;
          height:26px;
          background:white;
          border:1px solid #334155;
          box-sizing:border-box;
        ">
          ${number ? `<small style="
            position:absolute;
            top:0;
            left:2px;
            font-size:8px;
            color:#334155;
            z-index:1;
          ">${number}</small>` : ""}
          <input
            type="text"
            maxlength="1"
            autocomplete="off"
            data-crossword-cell="${key}"
            value="${escapeHTML(value)}"
            aria-label="Baris ${r + 1}, kolom ${c + 1}"
            style="
              width:100%;
              height:100%;
              padding:5px 0 0;
              border:0;
              outline:none;
              background:transparent;
              text-align:center;
              text-transform:uppercase;
              font-weight:bold;
              font-size:13px;
              box-sizing:border-box;
            "
          />
        </div>
      `;
    }
  }

  return `
    <div class="card">
      <h2>🧩 Teka-Teki Silang: Jejak Kemanusiaan</h2>
      <p>Lengkapi kotak-kotak berikut berdasarkan petunjuk mendatar dan menurun.</p>

      ${state.quizzes.includes(2) ? `
        <p style="color:green;font-weight:bold">
          ✓ Misi telah diselesaikan. Kamu boleh mencoba kembali!
        </p>
      ` : ""}

      <div style="overflow-x:auto;padding:12px 0">
        <div style="
          display:grid;
          grid-template-columns:repeat(13,26px);
          width:max-content;
          margin:auto;
          gap:0;
        ">
          ${board}
        </div>
      </div>

      <h3>Petunjuk Mendatar</h3>
      ${crosswordWords.filter(w => w.dir === "across").map(w => `
        <p><b>${w.number}.</b> ${w.clue}</p>
      `).join("")}

      <h3>Petunjuk Menurun</h3>
      ${crosswordWords.filter(w => w.dir === "down").map(w => `
        <p><b>${w.number}.</b> ${w.clue}</p>
      `).join("")}

      <button class="btn-primary" data-crossword-check>
        Periksa Jawaban
      </button>

      <button class="btn-secondary" data-crossword-reset>
        Ulangi TTS
      </button>
    </div>
  `;
}

function checkCrossword() {
  const correct = crosswordWords.every(item => {
    const answer = Array.from(item.word).map((_, i) => {
      const r = item.row + (item.dir === "down" ? i : 0);
      const c = item.col + (item.dir === "across" ? i : 0);
      return (crosswordAnswers[`${r}-${c}`] || "").toUpperCase();
    }).join("");

    return answer === item.word;
  });

  if (!correct) {
    notify("Masih ada jawaban yang belum tepat. Coba periksa kembali!");
    return;
  }

  if (!state.quizzes.includes(2)) {
    state.quizzes.push(2);
    state.xp += 20;
    persist();
    notify("Hebat! Kamu mendapatkan 20 XP!");
  } else {
    notify("Semua jawaban benar! Misi ini sudah pernah diselesaikan.");
  }

  renderMission();
}


// ======================================
// GAME 4: TEBAK KOTAK - RAHASIA MUSYAWARAH
// ======================================

const wordBoxQuestions = [
  {
    clue: "Kegiatan membahas masalah bersama untuk mencapai keputusan.",
    answer: "MUSYAWARAH",
    explain: "Musyawarah merupakan cara mengambil keputusan dengan mendengarkan dan mempertimbangkan pendapat bersama."
  },
  {
    clue: "Kesepakatan yang dicapai melalui pembicaraan bersama.",
    answer: "MUFAKAT",
    explain: "Mufakat adalah hasil kesepakatan bersama yang dicapai melalui musyawarah."
  },
  {
    clue: "Pendapat, harapan, atau keinginan masyarakat yang perlu didengar.",
    answer: "ASPIRASI",
    explain: "Aspirasi masyarakat perlu diperhatikan dalam proses pengambilan keputusan."
  },
  {
    clue: "Sistem pemerintahan yang memberikan kekuasaan kepada rakyat.",
    answer: "DEMOKRASI",
    explain: "Demokrasi memberikan ruang bagi rakyat untuk berpartisipasi dalam kehidupan bernegara."
  },
  {
    clue: "Seseorang atau lembaga yang bertugas mewakili kepentingan pihak lain.",
    answer: "PERWAKILAN",
    explain: "Perwakilan menjadi salah satu cara rakyat menyampaikan aspirasi dalam sistem demokrasi."
  }
];

let wordBoxRound = 0;
let wordBoxSolved = false;
let wordBoxScore = 0;
let wordBoxHintUsed = false;

function renderWordBoxGame() {
  if (state.quizzes.includes(4)) {
    return `
      <div class="notice">
        <h3>🏆 Misi Tebak Kotak Selesai!</h3>
        <p>Kamu telah menyelesaikan lima tantangan Rahasia Musyawarah.</p>
        <b>Hadiah: 100 XP</b>
      </div>
    `;
  }

  const q = wordBoxQuestions[wordBoxRound];

  const boxes = q.answer.split("").map((letter, index) => `
    <div style="
      width:34px;
      height:42px;
      display:flex;
      align-items:center;
      justify-content:center;
      border:2px solid var(--red);
      border-radius:7px;
      font-weight:bold;
      background:var(--card);
    ">
      ${wordBoxHintUsed && index === 0 ? letter : "?"}
    </div>
  `).join("");

  return `
    <div class="notice">
      <div class="eyebrow">MISSION 4 • TEBAK KOTAK</div>
      <h3>🔐 Rahasia Musyawarah</h3>
      <p>Temukan kata rahasia berdasarkan petunjuk berikut!</p>
      <b>Tantangan ${wordBoxRound + 1} dari 5</b>
      <div style="margin:12px 0;background:var(--line);height:8px;border-radius:8px;overflow:hidden">
        <div style="width:${((wordBoxRound + 1) / 5) * 100}%;height:8px;background:var(--red)"></div>
      </div>
      <p><b>Petunjuk:</b> ${q.clue}</p>
      <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin:18px 0">
        ${boxes}
      </div>
      <p style="text-align:center;color:var(--muted);font-size:12px">
        ${q.answer.length} kotak huruf tersembunyi
      </p>

      ${
        wordBoxSolved
          ? `
            <div class="notice">
              <h3>✅ Jawaban Benar!</h3>
              <p><b>${q.answer}</b></p>
              <p>${q.explain}</p>
              <b>+20 XP</b>
            </div>
            <button class="btn primary" data-word-next>
              ${wordBoxRound === 4 ? "Selesaikan Misi" : "Tantangan Berikutnya →"}
            </button>
          `
          : `
            <input
              id="wordBoxAnswer"
              type="text"
              placeholder="Ketik jawabanmu di sini..."
              autocomplete="off"
              style="width:100%;padding:12px;border-radius:8px;border:1px solid var(--line);margin:8px 0;text-transform:uppercase"
            >
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
              <button class="btn primary" data-word-check>Periksa Jawaban</button>
              <button class="btn" data-word-hint>Lihat Bantuan</button>
            </div>
            ${
              wordBoxHintUsed
                ? `<p style="color:var(--muted)">Petunjuk tambahan: huruf pertama sudah dibuka.</p>`
                : ""
            }
          `
      }
      <p style="margin-top:12px">Skor permainan: <b>${wordBoxScore} XP</b></p>
    </div>
  `;
}

function checkWordBoxAnswer() {
  const input = document.getElementById("wordBoxAnswer");
  if (!input) return;

  const answer = input.value.trim().toUpperCase();
  const correct = wordBoxQuestions[wordBoxRound].answer;

  if (answer === correct) {
    wordBoxSolved = true;
    wordBoxScore += 20;
    $("quiz").innerHTML = renderWordBoxGame();
  } else {
    notify("Belum tepat. Coba periksa kembali petunjuknya!");
  }
}

function showWordBoxHint() {
  wordBoxHintUsed = true;
  $("quiz").innerHTML = renderWordBoxGame();
}

function nextWordBoxRound() {
  if (!wordBoxSolved) return;

  if (wordBoxRound < wordBoxQuestions.length - 1) {
    wordBoxRound++;
    wordBoxSolved = false;
    wordBoxHintUsed = false;
    $("quiz").innerHTML = renderWordBoxGame();
    return;
  }

  if (!state.quizzes.includes(4)) {
    state.quizzes.push(4);
    state.xp += wordBoxScore;
    persist();
  }

  $("quiz").innerHTML = renderWordBoxGame();
}


// ==========================================
// GAME MISI 5: TATA KONSEP KEADILAN SOSIAL
// ==========================================

const conceptCards = [
  {
    statement: "Setiap warga negara memiliki hak dan kewajiban yang sama di hadapan hukum.",
    answer: "nilai",
    explain: "Persamaan hak dan kewajiban merupakan bagian dari nilai keadilan sosial."
  },
  {
    statement: "Membagikan tugas kelompok secara merata kepada seluruh anggota.",
    answer: "penerapan",
    explain: "Pembagian tugas secara adil merupakan contoh penerapan keadilan."
  },
  {
    statement: "Menolak teman mengikuti kegiatan karena kondisi ekonominya.",
    answer: "pelanggaran",
    explain: "Tindakan tersebut merupakan diskriminasi dan bertentangan dengan keadilan."
  },
  {
    statement: "Menghormati hak orang lain tanpa membeda-bedakan latar belakang.",
    answer: "nilai",
    explain: "Menghormati hak orang lain merupakan nilai penting dalam keadilan sosial."
  },
  {
    statement: "Memberikan kesempatan pendidikan kepada seluruh anak.",
    answer: "penerapan",
    explain: "Kesempatan pendidikan yang merata merupakan penerapan keadilan sosial."
  },
  {
    statement: "Menggunakan fasilitas umum hanya untuk kepentingan pribadi.",
    answer: "pelanggaran",
    explain: "Fasilitas umum harus dimanfaatkan dengan memperhatikan kepentingan bersama."
  },
  {
    statement: "Mengembangkan sikap gotong royong dan kekeluargaan.",
    answer: "nilai",
    explain: "Gotong royong dan kekeluargaan mencerminkan nilai keadilan sosial."
  },
  {
    statement: "Memberikan bantuan kepada masyarakat yang membutuhkan secara tepat sasaran.",
    answer: "penerapan",
    explain: "Bantuan yang tepat sasaran membantu mewujudkan kesejahteraan bersama."
  },
  {
    statement: "Mendahulukan orang yang dikenal ketika membagikan bantuan.",
    answer: "pelanggaran",
    explain: "Mengutamakan orang tertentu tanpa dasar yang adil merupakan tindakan tidak adil."
  },
  {
    statement: "Menjaga keseimbangan antara hak dan kewajiban.",
    answer: "nilai",
    explain: "Keseimbangan hak dan kewajiban merupakan bagian dari keadilan sosial."
  }
];

let conceptSelections = {};
let conceptChecked = false;
let conceptGameAwarded = false;

function renderConceptGame() {
  conceptSelections = {};
  conceptChecked = false;

  return `
    <div class="game-box">
      <div class="eyebrow">🎮 MINI GAME MISI 5</div>
      <h3>⚖️ Tata Konsep: Keadilan Sosial</h3>
      <p>
        Kelompokkan setiap pernyataan ke dalam kategori yang tepat.
        Pilih satu kategori untuk setiap kartu, kemudian periksa jawabanmu!
      </p>

      <div class="notice">
        <b>🎯 Tantangan:</b> Selesaikan 10 kartu untuk memperoleh
        maksimal 100 XP.
      </div>

      <div class="concept-categories">
        <span>🟢 Nilai Keadilan Sosial</span>
        <span>🔵 Contoh Penerapan</span>
        <span>🔴 Pelanggaran Keadilan</span>
      </div>

      <div id="concept-card-list">
        ${conceptCards.map((card, index) => `
          <div class="concept-card" data-concept-card="${index}">
            <b>Kartu ${index + 1}</b>
            <p>${card.statement}</p>

<div class="concept-options">
  <button
    type="button"
    class="${conceptSelections[index] === 'nilai' ? 'selected' : ''}"
    data-concept-choice="${index}"
    data-category="nilai">
    Nilai Keadilan Sosial
  </button>

  <button
    type="button"
    class="${conceptSelections[index] === 'penerapan' ? 'selected' : ''}"
    data-concept-choice="${index}"
    data-category="penerapan">
    Contoh Penerapan
  </button>

  <button
    type="button"
    class="${conceptSelections[index] === 'pelanggaran' ? 'selected' : ''}"
    data-concept-choice="${index}"
    data-category="pelanggaran">
    Pelanggaran Keadilan
  </button>
</div>
          
            <div class="concept-feedback" id="concept-feedback-${index}"></div>
          </div>
        `).join("")}
      </div>

      <button type="button" class="btn-primary" data-concept-check>
        Periksa Jawaban
      </button>

      <div id="concept-result" class="notice" style="margin-top:15px">
        Pilih kategori untuk seluruh kartu terlebih dahulu.
      </div>
    </div>
  `;
}

function chooseConceptCategory(index, category) {
  if (conceptChecked) return;

  conceptSelections[index] = category;

  const card = document.querySelector(
    `[data-concept-card="${index}"]`
  );

  if (!card) return;

  card.querySelectorAll("[data-concept-choice]").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.category === category
    );
  });

  const result = $("concept-result");
  if (result) {
    result.textContent =
      `Kartu ${Object.keys(conceptSelections).length} dari 10 sudah dipilih.`;
  }
}

function checkConceptAnswers() {
  if (conceptChecked) return;

  if (Object.keys(conceptSelections).length !== conceptCards.length) {
    notify("Lengkapi pilihan kategori untuk semua kartu terlebih dahulu.");
    return;
  }

  conceptChecked = true;

  let score = 0;

  conceptCards.forEach((card, index) => {
    const isCorrect = conceptSelections[index] === card.answer;
    const feedback = $(`concept-feedback-${index}`);

    if (isCorrect) {
      score += 10;
      feedback.innerHTML = `
        <span style="color:green">✓ Benar!</span>
        <p>${card.explain}</p>
      `;
    } else {
      feedback.innerHTML = `
        <span style="color:#c62828">✗ Belum tepat.</span>
        <p>Jawaban yang benar: <b>${getConceptCategory(card.answer)}</b>.</p>
        <p>${card.explain}</p>
      `;
    }
  });

  const result = $("concept-result");

  if (!conceptGameAwarded) {
    state.xp += score;
    conceptGameAwarded = true;
    persist();
  }

  if (result) {
    result.innerHTML = `
      <h3>🏆 Hasil Tantangan</h3>
      <p>Jawaban benar: <b>${score / 10} dari 10 kartu</b></p>
      <p>XP diperoleh: <b>+${score} XP</b></p>
      <p>${
        score === 100
          ? "Luar biasa! Kamu memahami konsep keadilan sosial."
          : "Bagus! Pelajari kembali pembahasan pada setiap kartu."
      }</p>
    `;
  }

  document.querySelectorAll("[data-concept-choice]").forEach(button => {
    button.disabled = true;
  });

  notify(`Tantangan selesai! Kamu memperoleh ${score} XP.`);
}

function getConceptCategory(category) {
  const labels = {
    nilai: "Nilai Keadilan Sosial",
    penerapan: "Contoh Penerapan",
    pelanggaran: "Pelanggaran Keadilan"
  };

  return labels[category] || category;
}


function renderMission() {
  const m=missions.find(x=>x.id===current),r=state.reports[current]||{};
  $("brief").innerHTML=`
    <div class="eyebrow" style="color:var(--red)">BRIEFING MISI</div>
    <h3>${escapeHTML(m.title)}</h3>
    ${[3, 4, 5].includes(current) ? m.brief : `<p>${escapeHTML(m.brief)}</p>`}

${current === 1 ? `
  <h3>Tujuan Pembelajaran</h3>
  <ul>
    <li>Menganalisis penerapan nilai Ketuhanan Yang Maha Esa dalam masyarakat majemuk.</li>
    <li>Mengidentifikasi bentuk toleransi dan intoleransi.</li>
    <li>Merumuskan sikap menghormati kebebasan beragama berdasarkan Pancasila dan UUD NRI Tahun 1945.</li>
  </ul>
  <h3>Petunjuk Mini-Game</h3>
  <ol>
    <li>Pilih tingkat kesulitan puzzle.</li>
    <li>Susun kepingan dengan mengetuk dua kepingan untuk menukar posisi.</li>
    <li>Selesaikan puzzle dalam waktu maksimal tiga menit.</li>
    <li>Jawab tiga pertanyaan analisis setelah puzzle selesai.</li>
  </ol>
` : ""}

${current === 2 ? `
  <h3>Tujuan Pembelajaran</h3>
  <ul>
    <li>Mengidentifikasi penerapan nilai kemanusiaan dalam kehidupan sehari-hari.</li>
    <li>Menganalisis permasalahan perundungan, diskriminasi, dan pelanggaran HAM.</li>
    <li>Menjelaskan pentingnya empati, kesetaraan, dan penghormatan terhadap martabat manusia.</li>
    <li>Merumuskan solusi berdasarkan nilai Pancasila dan ketentuan hukum yang berlaku.</li>
  </ul>

  <h3>Petunjuk Mini-Game</h3>
  <ol>
    <li>Buka permainan Teka-Teki Silang: Jejak Kemanusiaan.</li>
    <li>Bacalah petunjuk mendatar dan menurun.</li>
    <li>Isilah setiap kotak dengan huruf yang sesuai.</li>
    <li>Periksa jawaban sampai seluruh kata terisi dengan benar.</li>
    <li>Dapatkan 20 XP setelah menyelesaikan permainan.</li>
  </ol>
` : ""}

${current === 5 ? `
  <h3>🎯 Tujuan Pembelajaran</h3>
  <ul>
    <li>Memahami makna nilai keadilan sosial bagi seluruh rakyat Indonesia.</li>
    <li>Mengidentifikasi contoh penerapan dan pelanggaran keadilan sosial.</li>
    <li>Menganalisis permasalahan ketidakadilan dalam kehidupan masyarakat.</li>
    <li>Merumuskan solusi untuk mewujudkan keadilan sosial di lingkungan sekitar.</li>
  </ul>

  <h3>📝 Petunjuk Pengerjaan Mini-Game</h3>
  <ol>
    <li>Bacalah sepuluh kartu pernyataan yang tersedia.</li>
    <li>Pilih kategori yang tepat untuk setiap kartu: Nilai Keadilan Sosial, Contoh Penerapan, atau Pelanggaran Keadilan.</li>
    <li>Pastikan semua kartu sudah dipilih kategorinya.</li>
    <li>Klik tombol Periksa Jawaban.</li>
    <li>Baca pembahasan untuk mengetahui alasan jawaban benar atau salah.</li>
    <li>Kumpulkan XP berdasarkan jumlah jawaban yang benar.</li>
  </ol>
` : ""}

    <div class="notice"><b>Tugas investigasi:</b> ${escapeHTML(m.prompt)}</div>
    <h3>Petunjuk Legal Hunter</h3><p>${escapeHTML(m.law)}</p>
    <p class="muted">Pilih kasus nyata dari sumber tepercaya. Contoh topik bukan bukti bahwa kasus tertentu telah terverifikasi.</p>
    <button class="btn dark" data-tab="quiz">Mulai mini-game →</button>
    <button class="btn light" data-tab="form">Isi investigasi</button>`;

 
 if (current === 1) {
  $("quiz").innerHTML = renderPuzzleGame();

  if (puzzleState?.phase === "puzzle") {
    startPuzzleClock();
  }

} else if (current === 2) {
  $("quiz").innerHTML = renderCrosswordGame();

} else if (current === 3) {
  renderCityGame();
} else if (current === 4) {
  $("quiz").innerHTML = renderWordBoxGame();
} else if (current === 5) {
  $("quiz").innerHTML = renderConceptGame();  

} else {
  const q = m.quiz;
  const done = state.quizzes.includes(current);

  $("quiz").innerHTML = `
    <span class="tag">HADIAH +20 XP</span>
    <h3>${escapeHTML(q.q)}</h3>
    ${q.options.map((o,i)=>`
      <button class="option" data-answer="${i}" ${done?"disabled":""}>
        ${String.fromCharCode(65+i)}. ${escapeHTML(o)}
      </button>
    `).join("")}
    <div id="feedback"></div>
    ${done?'<div class="notice good">Mini-game sudah tercatat. XP tidak diberikan dua kali.</div>':""}
    <p class="muted">Pilih jawaban dan baca umpan balik.</p>`;
} 

  $("formPanel").innerHTML=`
    <span class="tag">LAPORAN INVESTIGASI • +30 XP PENGIRIMAN PERTAMA</span>
    <h3>Formulir Investigasi Kasus</h3>
    <p class="muted">Tuliskan fakta secara terpisah dari pendapat. Jangan mengarang sumber, kasus, atau dasar hukum.</p>
    <form id="investigation">
      <div class="field"><label>1. Judul kasus faktual *</label>
        <input name="caseTitle" required maxlength="180" value="${escapeHTML(r.caseTitle||"")}"></div>
      <div class="field"><label>2. Sumber berita/laporan dan tautan *</label>
        <input name="source" required value="${escapeHTML(r.source||"")}" placeholder="URL atau identitas sumber yang dapat diperiksa"></div>
      <div class="field"><label>3. Kronologi dan fakta utama *</label>
        <textarea name="facts" required>${escapeHTML(r.facts||"")}</textarea></div>
      <div class="field"><label>4. Analisis penyebab *</label>
        <textarea name="causes" required>${escapeHTML(r.causes||"")}</textarea></div>
      <div class="field"><label>5. Dampak bagi kehidupan berbangsa *</label>
        <textarea name="impacts" required>${escapeHTML(r.impacts||"")}</textarea></div>
      <div class="field"><label>6. Dasar hukum, pasal, dan relevansinya *</label>
        <textarea name="law" required>${escapeHTML(r.law||"")}</textarea></div>
      <div class="field"><label>7. Solusi praktis *</label>
        <textarea name="solution" required>${escapeHTML(r.solution||"")}</textarea></div>
      <div class="field"><label>8. Hubungan dengan nilai sila Pancasila *</label>
        <textarea name="link" required>${escapeHTML(r.link||"")}</textarea></div>
      <div class="notice">Periksa sumber resmi dan keberlakuan peraturan. Tidak semua tindakan yang tidak sesuai nilai Pancasila otomatis merupakan tindak pidana.</div>
      <button class="btn dark">📨 ${r.submitted?"Perbarui laporan":"Kirim laporan"}</button>
    </form>
    ${r.submitted?'<p class="muted">Laporan sudah dikirim sebelumnya.</p>':""}`;
  setTab(tab);
}

async function answer(i) {
  const m=missions.find(x=>x.id===current),q=m.quiz;
  if(state.quizzes.includes(current))return;
  if(i===q.answer){
    state.quizzes.push(current);state.xp+=20;
    $("feedback").innerHTML=`<div class="notice good"><b>Benar! +20 XP</b><br>${escapeHTML(q.explain)}</div>`;
    document.querySelectorAll("[data-answer]").forEach(b=>b.disabled=true);
    await persist();renderMission();setTab("quiz");
  } else {
    $("feedback").innerHTML=`<div class="notice bad"><b>Belum tepat.</b><br>${escapeHTML(q.explain)} Coba lagi.</div>`;
  }
}


// ==========================================
// GAME 3: NUSANTARA CHALLENGE - SILA KETIGA
// ==========================================

const cityQuestions = [
  {
    city: "BUKITTINGGI",
    clue: "Aku memiliki menara jam ikonik yang dikenal dengan nama Jam Gadang.",
    hint: "Aku berada di Sumatera Barat.",
    explain: "Jam Gadang merupakan landmark Kota Bukittinggi. Keunikan daerah menjadi bagian dari kekayaan budaya Indonesia."
  },
  {
    city: "SEMARANG",
    clue: "Di kotaku terdapat bangunan bersejarah bernama Lawang Sewu.",
    hint: "Aku merupakan ibu kota Provinsi Jawa Tengah.",
    explain: "Lawang Sewu merupakan bangunan bersejarah di Semarang. Melestarikan sejarah daerah merupakan bentuk menghargai identitas bangsa."
  },
  {
    city: "PONTIANAK",
    clue: "Di kotaku terdapat Tugu Khatulistiwa yang menandai garis lintang nol derajat.",
    hint: "Aku berada di Kalimantan Barat.",
    explain: "Tugu Khatulistiwa merupakan ikon Kota Pontianak. Keunikan geografis setiap daerah memperkaya identitas Nusantara."
  },
  {
    city: "JAKARTA",
    clue: "Di kotaku berdiri Monumen Nasional atau Monas.",
    hint: "Aku merupakan ibu kota negara Indonesia.",
    explain: "Monas menjadi simbol perjuangan bangsa Indonesia dalam memperoleh kemerdekaan."
  },
  {
    city: "YOGYAKARTA",
    clue: "Kotaku dikenal dengan Keraton Yogyakarta dan kebudayaan Jawa.",
    hint: "Namaku sering disingkat menjadi Jogja.",
    explain: "Yogyakarta memiliki warisan budaya Jawa yang kuat. Menghargai budaya daerah lain merupakan wujud Persatuan Indonesia."
  }
];

let cityRound = 0;
let citySolved = false;
let cityScore = 0;

function renderCityGame() {
  const item = cityQuestions[cityRound];

  if (state.quizzes.includes(3)) {
    $("quiz").innerHTML = `
      <div class="notice good">
        <h3>🎉 Nusantara Challenge Selesai!</h3>
        Kamu telah menyelesaikan lima tantangan kota Nusantara.
        <br>Keberagaman daerah merupakan kekuatan Persatuan Indonesia.
      </div>`;
    return;
  }

  const boxes = Array.from(
    { length: item.city.length },
    (_, i) => `
      <input
        data-city-letter="${i}"
        maxlength="1"
        autocomplete="off"
        style="width:32px;height:42px;text-align:center;
        text-transform:uppercase;font-size:17px;font-weight:bold;
        margin:3px;border-radius:6px;border:1px solid #999;"
        ${citySolved ? "disabled" : ""}
      >
    `
  ).join("");

  $("quiz").innerHTML = `
    <span class="tag">SILA 3 • PERSATUAN INDONESIA</span>

    <h3>🌏 NUSANTARA CHALLENGE</h3>

    <p><b>Tantangan ${cityRound + 1} dari 5</b></p>

    <p>XP kelompok: <b>${state.xp} XP</b></p>

    <div class="notice">
      <b>Petunjuk Kota:</b><br>
      ${escapeHTML(item.clue)}
    </div>

    <p class="muted">
      Masukkan nama kota dengan mengisi satu huruf pada setiap kotak.
    </p>

    <div style="display:flex;flex-wrap:wrap;justify-content:center;">
      ${boxes}
    </div>

    <br>

    <button class="btn dark" type="button" data-city-check
      ${citySolved ? "disabled" : ""}>
      Periksa Jawaban
    </button>

    <button class="btn light" type="button" data-city-hint
      ${citySolved ? "disabled" : ""}>
      💡 Petunjuk Tambahan
    </button>

    <div id="cityHint"></div>
    <div id="cityFeedback"></div>

    ${citySolved ? `
      <button class="btn dark" type="button" data-city-next>
        ${cityRound === 4 ? "Selesaikan Misi" : "Lanjut Tantangan →"}
      </button>
    ` : ""}

    <p class="muted">
      Jawaban benar: +20 XP | Jawaban salah: -5 XP.
      XP minimum adalah 0.
    </p>

    <div class="notice">
      Misi ini mengajak kita mengenali keberagaman daerah
      sebagai kekuatan untuk menjaga Persatuan Indonesia.
    </div>
  `;
}

async function checkCityAnswer() {
  if (citySolved) return;

  const item = cityQuestions[cityRound];

  const inputs = document.querySelectorAll("[data-city-letter]");

  const entered = Array.from(inputs)
    .map(input => input.value.trim().toUpperCase())
    .join("");

  const feedback = $("cityFeedback");

  if (Array.from(inputs).some(input => !input.value.trim())) {
    feedback.innerHTML = `
      <div class="notice bad">
        Kotak belum lengkap. Isi semua huruf terlebih dahulu!
      </div>`;
    return;
  }

  if (entered === item.city) {
    citySolved = true;
    cityScore += 20;

    feedback.innerHTML = `
      <div class="notice good">
        <b>Benar! +20 XP 🎉</b><br>
        Kota yang tepat adalah ${item.city}.<br>
        ${item.explain}
      </div>`;

    inputs.forEach(input => input.disabled = true);

    document.querySelector("[data-city-check]").disabled = true;
    document.querySelector("[data-city-hint]").disabled = true;

    const nextButton = document.createElement("button");
    nextButton.className = "btn dark";
    nextButton.type = "button";
    nextButton.dataset.cityNext = "";
    nextButton.textContent =
      cityRound === 4 ? "Selesaikan Misi" : "Lanjut Tantangan →";

    feedback.after(nextButton);

    // XP benar baru ditambahkan ketika tantangan diselesaikan.
    // Penambahan total dilakukan pada akhir permainan.
  } else {
    state.xp = Math.max(0, Number(state.xp || 0) - 5);

    await persist();

    feedback.innerHTML = `
      <div class="notice bad">
        <b>Jawaban belum tepat! -5 XP.</b><br>
        XP kelompok sekarang: ${state.xp} XP.<br>
        ${item.explain}<br>
        Silakan coba lagi!
      </div>`;

    const xpDisplay = document.querySelector("#quiz p");
    // XP akan diperbarui saat tampilan misi dirender kembali.
  }
}

function showCityHint() {
  if (citySolved) return;

  $("cityHint").innerHTML = `
    <div class="notice">
      💡 <b>Petunjuk tambahan:</b><br>
      ${escapeHTML(cityQuestions[cityRound].hint)}
    </div>`;
}

async function nextCityRound() {
  if (!citySolved) return;

  if (cityRound < 4) {
    cityRound++;
    citySolved = false;
    renderCityGame();
  } else {
    if (!state.quizzes.includes(3)) {
      state.quizzes.push(3);
      state.xp += cityScore;
    }

    cityRound = 0;
    citySolved = false;
    cityScore = 0;

    await persist();

    renderMission();
    setTab("quiz");
  }
}

async function submitReport(e) {
  e.preventDefault();
  const form=new FormData(e.target),old=state.reports[current];
  const report={
    id:current,title:missions.find(m=>m.id===current).title,
    caseTitle:String(form.get("caseTitle")).trim(),
    source:String(form.get("source")).trim(),
    facts:String(form.get("facts")).trim(),
    causes:String(form.get("causes")).trim(),
    impacts:String(form.get("impacts")).trim(),
    law:String(form.get("law")).trim(),
    solution:String(form.get("solution")).trim(),
    link:String(form.get("link")).trim(),
    submitted:new Date().toISOString()
  };
  state.reports[current]=report;
  if(!old)state.xp+=30;
  await persist();renderMission();setTab("form");
  notify(old?"Laporan diperbarui.":"Laporan dikirim! +30 XP",true);
}

/* DASHBOARD GURU */
function showTeacher() {
  show("teacher");teacherOpen=false;
  $("teacherGate").classList.remove("hidden");
  $("teacherData").classList.add("hidden");
}
async function getTeacherData() {
  const local=getDB();
  if(!online)return local;
  try {
    const [g,r]=await Promise.all([
      db.from("cqxi_groups").select("*").order("xp",{ascending:false}),
      db.from("cqxi_reports").select("*").order("submitted_at",{ascending:false})
    ]);
    if(g.error)throw g.error;if(r.error)throw r.error;
    return {
      groups:(g.data||[]).map(x=>({
        key:x.group_key,group:x.group_name,members:x.members,
        xp:x.xp,quizzes:x.quiz_done||[],completed:0
      })),
      reports:(r.data||[]).map(x=>({
        key:x.group_key,group:(g.data||[]).find(y=>y.group_key===x.group_key)?.group_name||x.group_key,
        id:x.mission_id,title:x.mission_title,caseTitle:x.case_title,
        source:x.source_url,facts:x.facts,causes:x.causes,
        impacts:x.impacts,law:x.law,solution:x.solution,link:x.pancasila_link
      }))
    };
  } catch(err) {
    console.error(err);notify("Data online tidak dapat dimuat; menampilkan data lokal.");
    return local;
  }
}
async function renderTeacher() {
  const data=await getTeacherData();
  $("groupCount").textContent=data.groups.length;
  $("reportCount").textContent=data.reports.length;
  $("xpTotal").textContent=data.groups.reduce((n,g)=>n+(g.xp||0),0);
  $("fullCount").textContent=data.groups.filter(g=>g.completed===5).length;
  const groups=[...data.groups].sort((a,b)=>(b.xp||0)-(a.xp||0));
  $("leaderboard").innerHTML=groups.length?groups.map((g,i)=>
    `<p><b>${i+1}. ${escapeHTML(g.group)}</b> — ${g.xp||0} XP</p>`
  ).join(""):"<p>Belum ada kelompok.</p>";
  $("reportRows").innerHTML=data.reports.length?data.reports.map(r=>`
    <tr><td><b>${escapeHTML(r.group)}</b><br>${escapeHTML(r.title)}</td>
    <td><b>${escapeHTML(r.caseTitle)}</b><br>
      <a href="${escapeHTML(r.source)}" target="_blank" rel="noopener">Buka sumber</a>
      <p>${escapeHTML(r.facts)}</p></td>
    <td><b>Penyebab</b><p>${escapeHTML(r.causes)}</p>
      <b>Dampak</b><p>${escapeHTML(r.impacts)}</p></td>
    <td>${escapeHTML(r.law)}</td><td>${escapeHTML(r.solution)}
      <p><b>Kaitan Pancasila:</b> ${escapeHTML(r.link)}</p></td></tr>`
  ).join(""):'<tr><td colspan="5">Belum ada laporan.</td></tr>';
}
function downloadCSV(filename,rows) {
  const csv=rows.map(row=>row.map(v=>
    '"'+String(v??"").replace(/"/g,'""')+'"'
  ).join(",")).join("\r\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}
async function exportReports() {
  const d=await getTeacherData();
  downloadCSV("civic-quest-laporan.csv",[
    ["Kelompok","Misi","Kasus","Sumber","Fakta","Penyebab","Dampak","Dasar hukum","Solusi","Kaitan Pancasila"],
    ...d.reports.map(r=>[r.group,r.title,r.caseTitle,r.source,r.facts,r.causes,r.impacts,r.law,r.solution,r.link])
  ]);
}
async function exportProgress() {
  const d=await getTeacherData();
  downloadCSV("civic-quest-progres.csv",[
    ["Kelompok","Anggota","XP","Mini-game selesai","Laporan","Misi tuntas"],
    ...d.groups.map(g=>[g.group,g.members,g.xp,(g.quizzes||[]).length,
      d.reports.filter(r=>r.key===g.key).length,g.completed||0])
  ]);
}

/* Event handlers */
$("loginForm").addEventListener("submit",login);
$("teacherEntry").addEventListener("click",showTeacher);
$("teacherBack").addEventListener("click",()=>show("login"));
$("teacherForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if($("teacherCode").value!==TEACHER_CODE){
    notify("Kode guru salah.");return;
  }
  teacherOpen=true;
  $("teacherGate").classList.add("hidden");
  $("teacherData").classList.remove("hidden");
  await renderTeacher();
});
$("continue").addEventListener("click",()=>{
  const m=missions.find(m=>!state.quizzes.includes(m.id)||!state.reports[m.id])||missions[0];
  openMission(m.id);
});
$("logout").addEventListener("click",()=>{state=emptyState();show("login")});
$("back").addEventListener("click",()=>{renderStudent();show("student")});
$("exportReports").addEventListener("click",exportReports);
$("exportProgress").addEventListener("click",exportProgress);

document.addEventListener("click",e=>{
  const open=e.target.closest("[data-open]");
  if(open)openMission(open.dataset.open);
  const tabBtn=e.target.closest("[data-tab]");
  if(tabBtn)setTab(tabBtn.dataset.tab);
  const answer=e.target.closest("[data-answer]");
  if(answer)answerQuizSafe(Number(answer.dataset.answer));


  const puzzleLevel = e.target.closest("[data-puzzle-level]");
  if (puzzleLevel) {
    startPuzzle(Number(puzzleLevel.dataset.puzzleLevel));
  }

  const puzzlePiece = e.target.closest("[data-puzzle-piece]");
  if (puzzlePiece) {
    selectPuzzlePiece(Number(puzzlePiece.dataset.puzzlePiece));
  }

  const puzzleRestart = e.target.closest("[data-puzzle-restart]");
  if (puzzleRestart && puzzleState) {
    startPuzzle(puzzleState.size);
  }

  const toleranceAnswer = e.target.closest("[data-tolerance-answer]");
  if (toleranceAnswer) {
    answerTolerance(Number(toleranceAnswer.dataset.toleranceAnswer));
  }

// EVENT LISTENER GAME 3: NUSANTARA CHALLENGE
const cityCheck = e.target.closest("[data-city-check]");
if (cityCheck) {
  checkCityAnswer();
}

const cityHint = e.target.closest("[data-city-hint]");
if (cityHint) {
  showCityHint();
}

const cityNext = e.target.closest("[data-city-next]");
if (cityNext) {
  nextCityRound();
}

});
async function answerQuizSafe(i){await answer(i)}
document.addEventListener("submit",e=>{
  if(e.target.id==="investigation")submitReport(e);
});
$("connection").textContent=online?"ONLINE":"MODE DEMO • LOKAL";


// Menyimpan huruf yang dimasukkan siswa
document.addEventListener("input", e => {
  const cell = e.target.closest("[data-crossword-cell]");
  if (!cell) return;

  const key = cell.dataset.crosswordCell;
  const value = cell.value
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 1);

  cell.value = value;
  crosswordAnswers[key] = value;
});

// Tombol pemeriksaan dan pengulangan
document.addEventListener("click", e => {
  if (e.target.closest("[data-crossword-check]")) {
    checkCrossword();
  }

  if (e.target.closest("[data-crossword-reset]")) {
    crosswordAnswers = {};
    renderMission();
  }
});


// EVENT LISTENER GAME 4: TEBAK KOTAK
document.addEventListener("click", e => {
  if (e.target.closest("[data-word-check]")) {
    checkWordBoxAnswer();
  }

  if (e.target.closest("[data-word-hint]")) {
    showWordBoxHint();
  }

  if (e.target.closest("[data-word-next]")) {
    nextWordBoxRound();
  }
});


// EVENT LISTENER GAME 5: TATA KONSEP

document.addEventListener("click", e => {
  const choice = e.target.closest("[data-concept-choice]");

  if (choice) {
    chooseConceptCategory(
      Number(choice.dataset.conceptChoice),
      choice.dataset.category
    );
  }

  if (e.target.closest("[data-concept-check]")) {
    checkConceptAnswers();
  }
});

