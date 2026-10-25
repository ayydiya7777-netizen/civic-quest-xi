
/* CIVIC QUEST XI
   Mode demo: localStorage
   Mode online: Supabase
*/
const SUPABASE_URL = "https://qqingsyczvncvmztyiji.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_6h2HHfXRMIFfrpbpuVfuVQ_sJll3eqm";
const GROUP_ACCESS_CODE = "CQXI2026";
const TEACHER_CODE = "GURU-CQXI";

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
 id:3, title:"Persatuan Indonesia",
 focus:"Kebinekaan, solidaritas, dan menjaga persatuan dalam perbedaan.",
 brief:"Persatuan bukan berarti semua orang harus sama. Persatuan dibangun melalui kerja sama dan penghormatan terhadap perbedaan.",
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
 id:4, title:"Kerakyatan dan Permusyawaratan",
 focus:"Musyawarah, partisipasi, keterbukaan, dan keputusan bijaksana.",
 brief:"Sila keempat menekankan pengambilan keputusan yang bijaksana melalui musyawarah dan perwakilan. Perbedaan pendapat perlu didengar dan dipertimbangkan.",
 prompt:"Cari kasus faktual tentang pengabaian aspirasi, musyawarah yang tidak inklusif, atau keputusan publik yang dipersoalkan.",
 law:"UUD NRI Tahun 1945 Pasal 1 ayat (2) dapat menjadi konteks awal. Tentukan aturan lebih spesifik berdasarkan lembaga dan proses dalam kasus.",
 quiz:{
  q:"Dalam musyawarah kelas, beberapa siswa belum menyampaikan pendapat. Ketua sebaiknya…",
  options:["Langsung memutuskan sendiri","Memberi kesempatan yang adil dan mencari keputusan bijaksana","Hanya mendengar teman dekat","Mengabaikan pendapat berbeda"],
  answer:1,
  explain:"Musyawarah yang baik memberi ruang partisipasi dan mempertimbangkan pendapat secara bijaksana."
 }
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

  if(code!==GROUP_ACCESS_CODE){
    notify("Kode akses tidak sesuai. Tanyakan kepada guru.");
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
function renderMission() {
  const m=missions.find(x=>x.id===current),r=state.reports[current]||{};
  $("brief").innerHTML=`
    <div class="eyebrow" style="color:var(--red)">BRIEFING MISI</div>
    <h3>${escapeHTML(m.title)}</h3>
    <p>${escapeHTML(m.brief)}</p>
    <div class="notice"><b>Tugas investigasi:</b> ${escapeHTML(m.prompt)}</div>
    <h3>Petunjuk Legal Hunter</h3><p>${escapeHTML(m.law)}</p>
    <p class="muted">Pilih kasus nyata dari sumber tepercaya. Contoh topik bukan bukti bahwa kasus tertentu telah terverifikasi.</p>
    <button class="btn dark" data-tab="quiz">Mulai mini-game →</button>
    <button class="btn light" data-tab="form">Isi investigasi</button>`;

  const q=m.quiz,done=state.quizzes.includes(current);
  $("quiz").innerHTML=`
    <span class="tag">HADIAH +20 XP</span><h3>${escapeHTML(q.q)}</h3>
    ${q.options.map((o,i)=>`<button class="option" data-answer="${i}" ${done?"disabled":""}>${String.fromCharCode(65+i)}. ${escapeHTML(o)}</button>`).join("")}
    <div id="feedback"></div>
    ${done?'<div class="notice good">Mini-game sudah tercatat. XP tidak diberikan dua kali.</div>':""}
    <p class="muted">Pilih jawaban dan baca umpan balik.</p>`;

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
});
async function answerQuizSafe(i){await answer(i)}
document.addEventListener("submit",e=>{
  if(e.target.id==="investigation")submitReport(e);
});
$("connection").textContent=online?"ONLINE":"MODE DEMO • LOKAL";
