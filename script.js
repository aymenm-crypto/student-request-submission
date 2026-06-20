const departments = [
  'هندسة العمارة','هندسة النفط','هندسة الطب حياتي','هندسة الأطراف والمساند الصناعية',
  'الهندسة المدنية','الهندسة الكهربائية والإلكترونية','هندسة الميكانيك'
];
const studyTypes = ['الصباحية','المسائية'];
const stages = ['الأولى','الثانية','الثالثة','الرابعة','الخامسة'];

const departmentEnglishMap = {
  'هندسة العمارة':'Architecture Engineering Department',
  'هندسة النفط':'Petroleum Engineering Department',
  'هندسة الطب حياتي':'Biomedical Engineering Department',
  'هندسة الأطراف والمساند الصناعية':'Prosthetics and Orthotics Engineering Department',
  'الهندسة المدنية':'Civil Engineering Department',
  'الهندسة الكهربائية والإلكترونية':'Electrical and Electronic Engineering Department',
  'هندسة الميكانيك':'Mechanical Engineering Department'
};

const forms = [
  {
    id:'continuity', icon:'🧾', code:'Eng.Reg.001', tag:'كتب رسمية',
    title:'استمارة طلب تأييد استمرارية بالدوام',
    desc:'طلب تأييد استمرارية بالدوام مع إدخال الجهة والغرض من قبل الطالب.',
    directedTo:'',
    purpose:'',
    printType:'continuity',
    baseFieldsVisible:['studentName','department','studyType','stage','phone','directedTo','purpose'],
    fields:[
      ['academicYear','العام الدراسي','year']
    ],
    template:'أرجو التفضل بالموافقة على منحي تأييد استمرارية بالدوام للعام الدراسي المذكور.'
  },
  {
    id:'deferment', icon:'⏳', code:'Eng.Reg.002', tag:'دراسية',
    title:'استمارة طلب تأجيل سنة دراسية أو فصل دراسي لطلبة الدراسة الأولية',
    desc:'طلب تأجيل سنة دراسية أو فصل دراسي أول/ثانٍ مع أسباب الطلب ورأي اللجنة والقسم والعمادة.',
    directedTo:'السيد عميد كلية الهندسة المحترم',
    purpose:'طلب تأجيل سنة أو فصل دراسي',
    printType:'deferment', feeType:'تأجيل',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','السنة الدراسية','year'],
      ['deferScope','نوع التأجيل','select:سنة دراسية|فصل دراسي'],
      ['semester','الفصل الدراسي','select:الأول|الثاني'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'يرجى تفضلكم بالموافقة على طلب تأجيل سنة دراسية أو فصل دراسي حسب الاختيار المبين أدناه وذلك للأسباب التالية.'
  },
  {
    id:'eveningFees', icon:'💸', code:'Eng.Reg.003', tag:'مالية',
    title:'استمارة طلب تخفيض أجور الدراسة المسائية لطلبة الدراسة الأولية',
    desc:'طلب تخفيض أجور الدراسة المسائية مع أسباب الطلب وتأييدات اللجنة والقسم.',
    directedTo:'السيد عميد كلية الهندسة المحترم',
    purpose:'طلب تخفيض أجور الدراسة المسائية',
    printType:'committee_form', feeType:'مسائية',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','السنة الدراسية','year'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'يرجى تفضلكم بالموافقة على طلب تخفيض أجور الدراسة المسائية للسنة الدراسية المذكورة وذلك للأسباب التالية.'
  },
  {
    id:'hosting', icon:'🏫', code:'Eng.Reg.004', tag:'دراسية',
    title:'استمارة طلب استضافة',
    desc:'طلب استضافة من دراسة إلى أخرى مع أسباب الطلب وآراء القسم والعمادة والرئاسة.',
    directedTo:'شعبة الشؤون الطلابية والتسجيل',
    purpose:'طلب استضافة',
    printType:'hosting',
    baseFieldsVisible:['studentName','department','stage','phone'],
    fields:[
      ['fromStudy','استضافة من الدراسة','select:الصباحية|المسائية'],
      ['toStudy','إلى الدراسة','select:الصباحية|المسائية'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'أروم الاستضافة للأسباب المذكورة في هذه الاستمارة.'
  },
  {
    id:'absence', icon:'📉', code:'Eng.Reg.005', tag:'دراسية',
    title:'استمارة رفع نسبة الغياب لطلبة الدراسة الأولية',
    desc:'طلب رفع نسبة الغياب للأسباب المبررة مع ملاحظات اللجنة والقسم والعمادة.',
    directedTo:'السيد رئيس القسم المحترم',
    purpose:'طلب رفع نسبة الغياب',
    printType:'absence',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','السنة الدراسية','year'],
      ['courseMode','نوع المادة','select:مادة واحدة|أكثر من مادة'],
      ['courseName','اسم المادة أو المواد'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'يرجى التفضل بالموافقة على رفع نسبة الغياب للسنة الدراسية المذكورة وذلك للأسباب التالية.'
  },
  {
    id:'govFees', icon:'💰', code:'Eng.Reg.006', tag:'مالية',
    title:'استمارة طلب تخفيض أجور التعليم الحكومي الخاص لطلبة الدراسة الأولية',
    desc:'طلب تخفيض أجور التعليم الحكومي الخاص (الموازي) مع أسباب الطلب.',
    directedTo:'السيد عميد كلية الهندسة المحترم',
    purpose:'طلب تخفيض أجور التعليم الحكومي الخاص',
    printType:'committee_form', feeType:'موازي',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','السنة الدراسية','year'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'يرجى تفضلكم بالموافقة على طلب تخفيض أجور التعليم الحكومي الخاص (الموازي) للسنة الدراسية المذكورة وذلك للأسباب التالية.'
  },
  {
    id:'examDelay', icon:'📝', code:'Eng.Reg.007', tag:'دراسية',
    title:'استمارة طلب تأجيل امتحان مادة أو مواد لطلبة الدراسة الأولية',
    desc:'طلب تأجيل امتحان مادة أو مواد مع أسباب الطلب وملاحظات اللجنة والقسم والعمادة.',
    directedTo:'السيد عميد كلية الهندسة المحترم',
    purpose:'طلب تأجيل امتحان مادة أو مواد',
    printType:'committee_form', feeType:'تأجيل امتحان',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['courseMode','نوع المادة','select:مادة واحدة|أكثر من مادة'],
      ['courseName','اسم المادة أو المواد'],
      ['academicYear','السنة الدراسية','year'],
      ['reason1','السبب الأول','textarea'],
      ['reason2','السبب الثاني','textarea'],
      ['reason3','السبب الثالث','textarea']
    ],
    template:'يرجى تفضلكم بالموافقة على طلب تأجيل امتحان مادة أو مواد وذلك للأسباب التالية.'
  },
  {
    id:'clearance', icon:'✅', code:'Eng.Reg.008', tag:'خدمات',
    title:'استمارة براءة الذمة',
    desc:'براءة ذمة للعام الدراسي مع الحقول الخاصة بالدراسة والمرحلة وقناة القبول والدور.',
    directedTo:'شعبة التسجيل وشؤون الطلبة',
    purpose:'استحصال براءة ذمة',
    printType:'clearance',
    baseFieldsVisible:['studentName','department','stage'],
    fields:[
      ['academicYear','العام الدراسي','year'],
      ['studyShift','الدراسة','select:الصباحية|المسائية'],
      ['admissionChannel','قناة القبول','select:عامة|موازي|ذوي الشهداء|مباشر'],
      ['round','الدور','select:الأول|الثاني']
    ],
    template:'أرجو التفضل بإكمال إجراءات براءة الذمة حسب البيانات المثبتة في هذه الاستمارة.'
  },
  {
    id:'return', icon:'↩️', code:'Eng.Reg.009', tag:'طلبات خاصة',
    title:'طلب عودة مرقنة قيودهم',
    desc:'طلب عودة إلى الدراسة على القالب الموحد.',
    directedTo:'السيد معاون العميد للشؤون العلمية المحترم',
    purpose:'عودة إلى الدراسة',
    printType:'petition', petitionKind:'return',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','العام الدراسي المقبول فيه','year'],
      ['petitionReason','وذلك بسبب','textarea']
    ],
    template:'أرجو تفضلكم بالموافقة على عودتي إلى الدراسة.'
  },
  {
    id:'dismissal', icon:'🛑', code:'Eng.Reg.010', tag:'طلبات خاصة',
    title:'طلب ترقين قيد',
    desc:'طلب ترقين قيد على القالب الموحد.',
    directedTo:'السيد معاون العميد للشؤون العلمية المحترم',
    purpose:'ترقين قيد',
    printType:'petition', petitionKind:'dismissal',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','العام الدراسي المقبول فيه','year'],
      ['petitionReason','وذلك بسبب','textarea']
    ],
    template:'أرجو تفضلكم بالموافقة على ترقين قيدي.'
  },
  {
    id:'nonfail', icon:'📚', code:'Eng.Reg.011', tag:'طلبات خاصة',
    title:'طلب احتساب سنة عدم رسوب',
    desc:'طلب احتساب سنة عدم رسوب على القالب الموحد.',
    directedTo:'السيد معاون العميد للشؤون العلمية المحترم',
    purpose:'احتساب سنة عدم رسوب',
    printType:'petition', petitionKind:'nonfail',
    baseFieldsVisible:['studentName','department','studyType','stage','phone'],
    fields:[
      ['academicYear','العام الدراسي المقبول فيه','year'],
      ['petitionReason','وذلك بسبب','textarea']
    ],
    template:'أرجو تفضلكم بالموافقة على احتساب سنة عدم رسوب.'
  },
  {
    id:'medicalCheck', icon:'🩺', code:'Eng.Reg.012', tag:'صحية',
    title:'استمارة فحص ومعالجة',
    desc:'استمارة فحص ومعالجة بالوضع الأفقي وتتضمن نسختين في الصفحة نفسها. المتغير: الاسم والقسم والمرحلة ونوع الدراسة مع تاريخ تلقائي أسفل توقيع رئيس القسم.',
    directedTo:'السيد معاون العميد للشؤون العلمية المحترم',
    purpose:'فحص ومعالجة',
    printType:'medical_check',
    pageOrientation:'landscape',
    baseFieldsVisible:['studentName','department','studyType','stage'],
    fields:[],
    template:'يرجى تفضلكم بتزويدي باستمارة فحص ومعالجة لغرض المعاينة الطبية في المركز الصحي.'
  }
];

const quickTemplates = forms.map(f => ({ title:f.title, body:f.template }));
const pages = ['homePage','formsPage','templatesPage','formPage'];
let activeForm = null;
let printLogoSrc = '';
const clearanceCollegeLogoSrc = 'data:image/png;base64,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';
const clearanceUniversityLogoSrc = 'data:image/png;base64,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';
let runtimeClearanceCollegeLogoSrc = clearanceCollegeLogoSrc;
let runtimeClearanceUniversityLogoSrc = clearanceUniversityLogoSrc;

let lastSavedKey = '';
let lastSavedRequestNo = '';

function $(id){ return document.getElementById(id); }
function qsa(s){ return Array.from(document.querySelectorAll(s)); }
function fillSelect(el, items, placeholder){
  if (!el) return;
  el.innerHTML = `<option value="">${placeholder}</option>` + items.map(i => `<option value="${i}">${i}</option>`).join('');
}
function escapeHtml(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function displayValue(v){ const s = String(v == null ? '' : v).trim(); return s ? escapeHtml(s) : '........................'; }
function courseLabelForPrint(data){
  const mode = String((data && data.courseMode) || '').trim();
  const courseName = String((data && data.courseName) || '').trim();
  if (mode === 'أكثر من مادة') return 'المواد';
  if (mode === 'مادة واحدة') return 'مادة';
  return /[,،\n]/.test(courseName) ? 'المواد' : 'مادة';
}
function courseNameForPrint(data){
  return displayValue((data && data.courseName) || '');
}
function normalizeStudy(v){
  const s = String(v == null ? '' : v).trim();
  if (!s) return '';
  if (s === 'صباحي' || s === 'صباحية' || s === 'الدراسة الصباحية') return 'الدراسة الصباحية';
  if (s === 'مسائي' || s === 'مسائية' || s === 'الدراسة المسائية') return 'الدراسة المسائية';
  return s;
}
function studyAdjective(v){
  const s = normalizeStudy(v);
  if (s === 'الدراسة الصباحية') return 'الصباحية';
  if (s === 'الدراسة المسائية') return 'المسائية';
  return s;
}
function displayStudyValue(v){ const s = studyAdjective(v); return s ? escapeHtml(s) : '........................'; }
function hostingStudyFillValue(v){ const s = studyAdjective(v); return s ? escapeHtml(s) : '&nbsp;'; }
function hostingFullStudyFillValue(v){ const s = normalizeStudy(v); return s ? escapeHtml(s) : '&nbsp;'; }
function addArabicKashidaForPrint(value, targetLen){
  let s = String(value == null ? '' : value).trim();
  if (!s) return '';
  const chars = Array.from(s);
  const positions = [];
  const connectsAfter = ch => /[\u0628-\u064A]/.test(ch) && !/[اأإآدذرزو]/.test(ch);
  const arabicLetter = ch => /[\u0621-\u064A]/.test(ch);
  for (let i = 0; i < chars.length - 1; i++){
    if (connectsAfter(chars[i]) && arabicLetter(chars[i + 1])) positions.push(i);
  }
  let need = Math.max(0, (targetLen || 0) - chars.length);
  let loop = 0;
  while (need > 0 && positions.length && loop < 80){
    const insertAt = positions[loop % positions.length] + 1;
    chars.splice(insertAt, 0, 'ـ');
    for (let j = 0; j < positions.length; j++) if (positions[j] >= insertAt) positions[j]++;
    need--; loop++;
  }
  return chars.join('');
}
function hostingFillStretchValue(v, targetLen){ const s = addArabicKashidaForPrint(v, targetLen); return s ? escapeHtml(s) : '&nbsp;'; }
function hostingFullStudyFillStretchValue(v, targetLen){ const s = addArabicKashidaForPrint(normalizeStudy(v), targetLen); return s ? escapeHtml(s) : '&nbsp;'; }
function hostingFillValue(v){ const s = String(v == null ? '' : v).trim(); return s ? escapeHtml(s) : '&nbsp;'; }
function reasonValues(data, keys){ return (keys || ['reason1','reason2','reason3']).map(k => displayValue(data[k] || '')); }
function currentArabicDate(){ try { return new Date().toLocaleDateString('ar-IQ'); } catch(e){ return ''; } }
function academicYearOptions(){ const now = new Date().getFullYear(); const arr=[]; for (let y = now-1; y <= now+4; y++) arr.push(`${y}-${y+1}`); return arr; }
function buildDynamicFieldHtml(key,label,type){
  const t = type || 'text';
  if (t === 'year') {
    return `<span>${label}</span><select name="${key}"><option value="">اختر العام الدراسي</option>${academicYearOptions().map(y=>`<option value="${y}">${y}</option>`).join('')}</select>`;
  }
  if (t === 'textarea') return `<span>${label}</span><textarea name="${key}" rows="4"></textarea>`;
  if (t.startsWith('select:')) {
    const opts = t.replace('select:','').split('|').map(o => `<option value="${o}">${o}</option>`).join('');
    return `<span>${label}</span><select name="${key}"><option value="">اختر</option>${opts}</select>`;
  }
  return `<span>${label}</span><input name="${key}">`;
}

function updateDependentFields(){
  const form = activeForm;
  const main = $('mainForm');
  if (!form || !main) return;
  if (form.id !== 'deferment') return;
  const scopeEl = main.elements['deferScope'];
  const semEl = main.elements['semester'];
  if (!scopeEl || !semEl) return;
  const semLabel = semEl.closest('label');
  const isSemester = scopeEl.value === 'فصل دراسي';
  if (semLabel) semLabel.style.display = isSemester ? '' : 'none';
  if (!isSemester) semEl.value = '';
}

function init(){
  fillSelect($('departmentSelect'), departments, 'اختر القسم');
  fillSelect($('studyTypeSelect'), studyTypes, 'اختر الدراسة');
  fillSelect($('stageSelect'), stages, 'اختر المرحلة');
  fillSelect($('uploadFormType'), forms.map(f => f.title), 'اختر نوع الاستمارة');
  if ($('todayDate')) $('todayDate').textContent = currentArabicDate();
  const brandLogoEls = Array.from(document.querySelectorAll('.brand-logos img'));
  printLogoSrc = brandLogoEls[0] ? brandLogoEls[0].src : '';
  runtimeClearanceCollegeLogoSrc = brandLogoEls[0] ? brandLogoEls[0].src : clearanceCollegeLogoSrc;
  runtimeClearanceUniversityLogoSrc = brandLogoEls[1] ? brandLogoEls[1].src : clearanceUniversityLogoSrc;

  renderCards(forms);
  renderTemplates();

  qsa('[data-page]').forEach(btn => btn.addEventListener('click', ()=>showPage(btn.dataset.page)));
  qsa('.back-home').forEach(btn => btn.addEventListener('click', ()=>showPage('homePage')));
  if ($('backToFormsBtn')) $('backToFormsBtn').addEventListener('click', ()=>showPage('formsPage'));
  if ($('themeBtn')) $('themeBtn').addEventListener('click', toggleTheme);
  if ($('themeBtn2')) $('themeBtn2').addEventListener('click', toggleTheme);

  if ($('searchInput')) $('searchInput').addEventListener('input', e => {
    const q = e.target.value.trim();
    renderCards(!q ? forms : forms.filter(f => [f.code,f.tag,f.title,f.desc].join(' ').includes(q)));
  });

  if ($('uploadFile')) $('uploadFile').addEventListener('change', ()=>{
    const f = $('uploadFile').files[0];
    $('uploadInfo').textContent = f ? `تم اختيار الملف: ${f.name}` : 'لم يتم اختيار ملف بعد';
  });

  if ($('requestFile')) $('requestFile').addEventListener('change', ()=>{
    const f = $('requestFile').files[0];
    if ($('requestFileInfo')) $('requestFileInfo').textContent = f ? `تم اختيار الملف: ${f.name}` : 'لا يوجد ملف مرفق';
  });

  if ($('autoDraftBtn')) $('autoDraftBtn').addEventListener('click', ()=>{
    if (!activeForm) return;
    if ($('mainForm').elements['requestText']) $('mainForm').elements['requestText'].value = activeForm.template || '';
    if ($('mainForm').elements['directedTo']) $('mainForm').elements['directedTo'].value = activeForm.directedTo || '';
    if ($('mainForm').elements['purpose']) $('mainForm').elements['purpose'].value = activeForm.purpose || '';
    syncPreview();
  });

  if ($('clearDraftBtn')) $('clearDraftBtn').addEventListener('click', ()=>{
    $('mainForm').reset();
    if (activeForm){
      if ($('mainForm').elements['directedTo']) $('mainForm').elements['directedTo'].value = activeForm.directedTo || '';
      if ($('mainForm').elements['purpose']) $('mainForm').elements['purpose'].value = activeForm.purpose || '';
    }
    syncPreview();
  });

  if ($('mainForm')) {
    $('mainForm').addEventListener('input', () => { updateDependentFields(); syncPreview(); });
    $('mainForm').addEventListener('change', () => { updateDependentFields(); syncPreview(); });
  }

  setupDashboardUI();
  setupServerBindings();
}
document.addEventListener('DOMContentLoaded', function(){
  try { init(); } catch(err) {
    try { console.error('init failed', err); } catch(e) {}
  } finally {}
});

function showPage(id){ pages.forEach(pageId => { if ($(pageId)) $(pageId).classList.toggle('active', pageId === id); }); window.scrollTo({top:0, behavior:'smooth'}); }
function toggleTheme(){ document.body.classList.toggle('dark'); if ($('themeBtn')) $('themeBtn').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; }

function renderCards(list){
  if (!$('cards')) return;
  $('cards').innerHTML = list.map(f => `
    <article class="card">
      <div class="card-head"><span class="card-code">${f.code}</span><span class="card-tag">${f.tag}</span></div>
      <h4>${f.icon} ${f.title}</h4>
      <p>${f.desc}</p>
      <div class="actions"><button class="btn primary open-form-btn" data-id="${f.id}" type="button">فتح الاستمارة</button></div>
    </article>
  `).join('');
  qsa('.open-form-btn').forEach(btn => btn.addEventListener('click', ()=>{
    const form = forms.find(f => f.id === btn.dataset.id);
    if (form) openForm(form);
  }));
}

function renderTemplates(){
  const grid = $('templatesGrid') || $('templateGrid');
  if (!grid) return;
  grid.innerHTML = quickTemplates.map((tpl, i) => `
    <article class="template-card">
      <h4>${tpl.title}</h4>
      <p>${escapeHtml(tpl.body)}</p>
      <div class="actions"><button class="btn ghost tiny copy-btn" data-i="${i}" type="button">نسخ النص</button></div>
    </article>
  `).join('');
  qsa('.copy-btn').forEach(btn => btn.addEventListener('click', async ()=>{
    try { await navigator.clipboard.writeText(quickTemplates[Number(btn.dataset.i)].body); btn.textContent='تم النسخ'; setTimeout(()=>btn.textContent='نسخ النص',1300); } catch(e) {}
  }));
}

function openForm(form){
  activeForm = form;
  if ($('activeFormCode')) $('activeFormCode').textContent = form.code;
  if ($('activeFormTitle')) $('activeFormTitle').textContent = form.title;
  if ($('paperCode')) $('paperCode').textContent = form.code;
  if ($('paperTitle')) $('paperTitle').textContent = form.title;
  $('mainForm').reset();
  const dynamic = $('dynamicFields');
  dynamic.innerHTML = '';
  form.fields.forEach(([key,label,type])=>{
    const wrapper = document.createElement('label');
    wrapper.className = 'field';
    wrapper.innerHTML = buildDynamicFieldHtml(key, label, type);
    dynamic.appendChild(wrapper);
  });
  if ($('mainForm').elements['directedTo']) $('mainForm').elements['directedTo'].value = form.directedTo || '';
  if ($('mainForm').elements['purpose']) $('mainForm').elements['purpose'].value = form.purpose || '';
  if ($('mainForm').elements['requestText']) $('mainForm').elements['requestText'].value = form.template || '';
  applyBaseFieldVisibility(form);
  lastSavedKey = '';
  lastSavedRequestNo = '';
  if ($('requestNumber')) $('requestNumber').textContent = 'يُنشأ عند الحفظ';
  if ($('submitStatus')) $('submitStatus').textContent = 'جاهز للحفظ.';
  updateDependentFields();
  syncPreview();
  showPage('formPage');
}

function getFormData(){
  const fd = new FormData($('mainForm'));
  const data = Object.fromEntries(fd.entries());
  (activeForm?.fields || []).forEach(([key]) => { if (!(key in data)) data[key] = ''; });
  ['studyType','studyShift','fromStudy','toStudy'].forEach(k => { if (k in data) data[k] = normalizeStudy(data[k]); });
  if (activeForm?.printType === 'continuity') {
    data.destination = data.directedTo || '';
    data.purposeReason = data.purpose || '';
    data.requestText = activeForm.template || '';
  }
  return data;
}


function logoHtml(extraClass){ return printLogoSrc ? `<img src="${printLogoSrc}" alt="" class="form-logo ${extraClass || ''}">` : '<div class="form-logo placeholder"></div>'; }
function displayYear(v){
  const s = String(v == null ? '' : v).trim();
  return s ? escapeHtml(s.replace(/\s*[-–—]\s*/g,' / ')) : '202 / 202';
}
function displayYearRange(v){
  const s = String(v == null ? '' : v).trim();
  if (!s) return '202 - 202';
  const normalized = s.replace(/\s+/g,'').replace(/[–—\\/]/g,'-');
  const parts = normalized.split('-').filter(Boolean);
  if (parts.length >= 2) return escapeHtml(parts[0] + ' - ' + parts[1]);
  return escapeHtml(s.replace(/\s*[-–—\\/]\s*/g,' - '));
}
function clearanceLogoHtml(src, extraClass){
  return src ? `<img src="${src}" alt="" class="form-logo ${extraClass || ''}">` : '<div class="form-logo placeholder"></div>';
}
function departmentEnglishName(ar){
  const s = String(ar == null ? '' : ar).trim();
  return departmentEnglishMap[s] || s;
}
function visibleBaseFields(form){
  return form && Array.isArray(form.baseFieldsVisible) && form.baseFieldsVisible.length ? form.baseFieldsVisible : ['studentName','department','studyType','stage','phone','studentId','directedTo','purpose','requestText'];
}
function applyBaseFieldVisibility(form){
  const main = $('mainForm');
  if (!main) return;
  const allowed = new Set(visibleBaseFields(form));
  ['studentName','department','studyType','stage','phone','studentId','directedTo','purpose','requestText'].forEach(name => {
    const field = main.elements[name];
    if (!field) return;
    const wrap = field.closest('label.field') || field.closest('.field') || field.parentElement;
    if (wrap) wrap.style.display = allowed.has(name) ? '' : 'none';
  });
}
function squareMark(active, rounded){
  return `<span class="${rounded ? 'round-mark' : 'square-mark'} ${active ? 'active' : ''}">${active ? '&#10003;' : ''}</span>`;
}
function ministryHeader(title, extraClass = ''){
  const headerClass = extraClass ? ` ${extraClass}` : '';
  return `
    <div class="sheet-header${headerClass}">
      <div class="sheet-header-top">
        <div class="sheet-logo-wrap">${logoHtml()}</div>
        <div class="sheet-ministry">
          <div>وزارة التعليم العالي والبحث العلمي</div>
          <div>جامعة كربلاء – كلية الهندسة</div>
          <div>شعبة التسجيل وشؤون الطلبة</div>
        </div>
      </div>
      <div class="sheet-title">${escapeHtml(title)}</div>
    </div>`;
}
function hostHeader(){
  return `
    <div class="hosting-header">
      <div class="host-title-block">
        <div>جامعة كربلاء - كلية الهندسة</div>
        <div>شعبة الشؤون الطلابية والتسجيل</div>
        <div class="hosting-main-title">استمارة استضافة</div>
      </div>
      <div class="host-logo-wrap">${logoHtml()}</div>
    </div>
    <div class="host-separator"></div>`;
}
function topInfoRow(cells){
  return `<table class="outline-table top-info-row"><tr>${cells.map(cell => `<th>${escapeHtml(cell[0])}</th><td>${cell[1]}</td>`).join('')}</tr></table>`;
}
function reasonsListHtml(data){
  return `<ol class="reason-list fixed-three">${reasonValues(data).map(v => `<li>${v}</li>`).join('')}</ol>`;
}
function renderCommitteeBody(form, data, opts){
  const intro = opts.intro;
  const includeStudyType = !!opts.includeStudyType;
  const studyLabel = opts.studyLabel || 'نوع الدراسة /';
  const regOptions = opts.regOptions || [];
  const feeNote = opts.feeNote || 'تسديد الأجور لطلبة الدراسة المسائية والموازي :';
  const undertakingLine = opts.undertakingLine || '';
  const extraAfterReasons = opts.extraAfterReasons || '';
  const showFeeBox = opts.showFeeBox !== false;
  const showAcademicFinanceBoxes = opts.showAcademicFinanceBoxes !== false;
  const deanLabel = opts.deanLabel || 'توصية السيد العميد المحترم:';
  const sheetClass = ['committee-sheet', opts.sheetClass || ''].join(' ').trim();
  const topCells = [
    ['اسم الطالب الرباعي', displayValue(data.studentName)],
    ['القسم', displayValue(data.department)],
    ['المرحلة', displayValue(data.stage)]
  ];
  const cleanStudyLabel = String(studyLabel || 'نوع الدراسة').replace(/[/:،]+\s*$/g, '').trim();
  if (includeStudyType) topCells.push([cleanStudyLabel || 'نوع الدراسة', displayStudyValue(data.studyType)]);
  return `<article class="paper official-paper form-sheet ${sheetClass}">
    ${ministryHeader(form.title, opts.headerClass || '')}
    ${topInfoRow(topCells)}
    <table class="outline-table request-table"><tr><td class="request-cell">
      <div class="request-intro">${intro}</div>
      ${reasonsListHtml(data)}
      ${extraAfterReasons}
      ${undertakingLine ? `<div class="undertaking-line committee-undertaking">${undertakingLine}</div>` : ''}
      <div class="request-sign-right">التوقيع :<br>الاسم : ${displayValue(data.studentName)}<br>التاريخ : ${currentArabicDate()}</div>
    </td></tr></table>
    <div class="outline-box review-stack-box">
      <div class="review-stack-cell">رأي لجنة الإرشاد في القسم</div>
      <div class="review-stack-cell">هامش السيد رئيس القسم</div>
    </div>
    ${showFeeBox ? `<div class="outline-box fee-merged-box">
      <div class="fee-merged-title">${feeNote}</div>
      <div class="fee-merged-body">
        <div class="fee-options-stack merged-options">
          <div class="fee-option">${squareMark(false, true)} سدد</div>
          <div class="fee-option">${squareMark(false, true)} لم يسدد</div>
        </div>
        <div class="fee-row-receipt merged-receipt">بالوصل المرقم/</div>
      </div>
    </div>` : ''}
    ${showAcademicFinanceBoxes ? `<div class="committee-lower-grid">
      <div class="outline-box academic-reg-box">
        <div class="academic-reg-cell strip-study">السيرة الدراسية للطالب<ul class="bullet-lines"><li></li><li></li><li></li><li></li></ul></div>
        <div class="academic-reg-cell strip-reg">تأييد شعبة التسجيل وشؤون الطلبة<span class="keep-with-next"> في الكلية</span>${regOptions.length ? `<div class="reg-options">${regOptions.map(v => `<div>${squareMark(false, true)} ${escapeHtml(v)}</div>`).join('')}</div>` : ''}</div>
      </div>
      <div class="outline-box finance-box">تأييد شعبة الشؤون المالية في الكلية</div>
    </div>` : ''}
    <div class="outline-box mid-box dean-box-expanded">${deanLabel}</div>
    <div class="outline-box council-box">
      <div class="council-line">رأي مجلس الكلية الموقر:</div>
      <div class="council-meta"><span>القرار</span><span>رقم الجلسة:</span><span>تاريخ الجلسة</span></div>
    </div>
  </article>`;
}

function renderContinuityForm(form, data){
  const study = normalizeStudy(data.studyType);
  return `<article class="paper official-paper form-sheet continuity-paper exact-clearance-sheet exact-continuity-sheet">
    <div class="clearance-head exact-clearance-head exact-continuity-head">
      <div class="clearance-logo clearance-logo-college">${clearanceLogoHtml(runtimeClearanceCollegeLogoSrc,'clearance-college-logo')}</div>
      <div class="clearance-ministry exact-clearance-ministry exact-continuity-ministry">
        <div>وزارة التعليم العالي والبحث العلمي</div>
        <div>جامعة كربلاء – كلية الهندسة</div>
        <div>قسم ${displayValue(data.department)}</div>
      </div>
      <div class="clearance-logo clearance-logo-university">${clearanceLogoHtml(runtimeClearanceUniversityLogoSrc,'clearance-university-logo')}</div>
    </div>
    <div class="clearance-title exact-clearance-title exact-continuity-title">استمارة طلب تأييد استمرار بالدوام للعام ${displayYearRange(data.academicYear)}</div>
    <table class="outline-table clearance-info exact-clearance-info exact-continuity-info">
      <tr>
        <th>اسم الطالب/ة</th><td>${displayValue(data.studentName)}</td>
        <th>الدراسة</th><td class="option-row">${squareMark(study==='الدراسة الصباحية')} الصباحية ${squareMark(study==='الدراسة المسائية')} المسائية</td>
      </tr>
      <tr>
        <th>القسم العلمي</th><td>${displayValue(data.department)}</td>
        <th>المرحلة</th><td class="option-row">${['الأولى','الثانية','الثالثة','الرابعة','الخامسة'].map(v => `${squareMark(data.stage===v)} ${escapeHtml(v)}`).join(' ')}</td>
      </tr>
      <tr>
        <th>رقم الهاتف</th><td>${displayValue(data.phone)}</td>
        <th>توقيع الطالب</th><td class="continuity-signature-cell"></td>
      </tr>
    </table>
    <div class="clearance-grid exact-clearance-grid exact-continuity-grid rtl-two">
      <div class="clear-box continuity-request-box compact-continuity-box">
        <div class="continuity-box-text continuity-inline-text">يرجى تفضلكم بالموافقة على منحي تأييد استمرارية بالدوام معنون إلى: <span class="continuity-inline-value">${displayValue(data.destination || form.directedTo)}</span></div>
      </div>
      <div class="clear-box continuity-purpose-box compact-continuity-box">
        <div class="continuity-box-text continuity-inline-text">وذلك لغرض: <span class="continuity-inline-value">${displayValue(data.purposeReason || form.purpose)}</span></div>
      </div>
      <div class="clear-box continuity-approval-pair-wrap">
        <div class="official-approval-grid continuity-official-approval-grid">
          <div class="official-approval-box official-approval-right">
            <div class="official-approval-title">تأييد رئيس القسم المختص وختمه</div>
            <div class="official-approval-footer">
              <div>رئيس القسم</div>
              <div class="petition-admin-date continuity-admin-date" dir="rtl"><span>التاريخ:</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-year">202</span></div>
            </div>
          </div>
          <div class="official-approval-box official-approval-left">
            <div class="official-approval-title">تأييد مدير التسجيل وختمه</div>
            <div class="official-approval-footer">
              <div>مدير التسجيل</div>
              <div class="petition-admin-date continuity-admin-date" dir="rtl"><span>التاريخ:</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-year">202</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="continuity-bottom-note">أي ملاحظات أخرى إن وجدت تكتب في ظهر الاستمارة</div>
  </article>`;
}

function renderCommitteeForm(form, data){
  let intro = '';
  let includeStudyType = false;
  let studyLabel = 'نوع الدراسة /';
  let sheetClass = '';
  if (form.id === 'examDelay') {
    const courseLabel = courseLabelForPrint(data);
    const courseText = String(data.courseName || '').trim();
    const coursePart = courseText ? `${courseLabel} (${courseNameForPrint(data)})` : courseLabel;
    intro = `يرجى تفضلكم بالموافقة على طلب تأجيل امتحان ${coursePart} للسنة الدراسية (${displayYear(data.academicYear)}) وذلك للأسباب التالية:`;
    includeStudyType = true;
    studyLabel = 'نظام الدراسة/';
    sheetClass = 'exam-delay-sheet deferment-header-like';
  } else if (form.id === 'eveningFees') {
    intro = `يرجى تفضلكم بالموافقة على طلب تخفيض أجور الدراسة المسائية للسنة الدراسية (${displayYear(data.academicYear)}) وذلك للأسباب التالية:`;
    sheetClass = 'evening-fees-sheet deferment-header-like';
  } else if (form.id === 'govFees') {
    intro = `يرجى تفضلكم بالموافقة على طلب تخفيض أجور التعليم الحكومي الخاص (الموازي) للسنة الدراسية (${displayYear(data.academicYear)}) وذلك للأسباب التالية:`;
    sheetClass = 'gov-fees-sheet deferment-header-like';
  } else {
    intro = escapeHtml(form.template || 'يرجى تفضلكم بالموافقة على الطلب وذلك للأسباب التالية:');
  }
  const headerClass = (form.id === 'eveningFees' || form.id === 'govFees' || form.id === 'examDelay') ? 'centered-ministry' : '';
  return renderCommitteeBody(form, data, { intro, includeStudyType, studyLabel, headerClass, sheetClass });
}

function renderDefermentForm(form, data){
  const scope = data.deferScope || 'سنة دراسية';
  const semText = data.deferScope === 'فصل دراسي' && data.semester ? ` / ${displayValue(data.semester)}` : '';
  const intro = `يرجى تفضلكم بالموافقة على طلب تأجيل ${escapeHtml(scope)}${semText} للسنة الدراسية (${displayYear(data.academicYear)}) وذلك للأسباب التالية:`;
  return renderCommitteeBody(form, data, {
    intro,
    includeStudyType: true,
    studyLabel: 'نوع الدراسة',
    regOptions: ['تأجيل أول','تأجيل ثاني','تأجيل ثالث'],
    undertakingLine: 'وأتعهد بعدم الانقطاع عن الدوام لحين صدور الأمر الإداري الخاص بالتأجيل وأتحمل التبعات المترتبة جراء التأجيل ولأجله وقعت.'
  }).replace('committee-sheet"', 'committee-sheet deferment-sheet"');
}

function renderAbsenceForm(form, data){
  const courseText = String(data.courseName || '').trim();
  const courseLabel = courseLabelForPrint(data);
  const coursePrefix = courseLabel === 'المواد' ? ' للمواد' : ' لمادة';
  const coursePart = courseText ? `${coursePrefix} (${courseNameForPrint(data)})` : '';
  const intro = `يرجى تفضلكم بالموافقة على رفع نسبة الغياب${coursePart} للسنة الدراسية (${displayYear(data.academicYear)}) وذلك للأسباب التالية:`;
  const notesHtml = `<div class="absence-notes committee-notes">
        <div class="notes-title">ملاحظات:</div>
        <div>1- إرفاق جميع الأوليات الثبوتية للأسباب أعلاه.</div>
        <div>2- إرفاق نسخة من أوامر القسم الخاصة بالتنبيه والإنذار والإنذار النهائي.</div>
      </div>`;
  return renderCommitteeBody(form, data, {
    intro,
    includeStudyType: true,
    studyLabel: 'نوع الدراسة',
    headerClass: 'centered-ministry',
    sheetClass: 'absence-sheet deferment-header-like',
    extraAfterReasons: notesHtml,
    undertakingLine: 'أتعهد بعدم الانقطاع عن الدوام وأتحمل التبعات المترتبة جراء تغيبي ولأجله وقعت.',
    showFeeBox: false,
    showAcademicFinanceBoxes: false,
    deanLabel: 'هامش السيد العميد المحترم:'
  });
}

function renderHostingForm(form, data){
  const currentStudy = data.fromStudy || data.studyType;
  const fill = hostingFillValue;
  const fillParen = v => {
    const s = String(v == null ? '' : v).trim();
    return s ? `(${escapeHtml(s)})` : '(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)';
  };
  const reasons = ['reason1','reason2','reason3'].map(k => fill(data[k]));
  return `<article class="paper official-paper form-sheet hosting-sheet hosting-sheet-exact">
    <div class="hosting-top-exact">
      <div class="hosting-logos-exact">
        <div class="hosting-logo-exact hosting-logo-college-exact">${clearanceLogoHtml(runtimeClearanceCollegeLogoSrc || clearanceCollegeLogoSrc,'hosting-college-logo')}</div>
        <div class="hosting-logo-exact hosting-logo-university-exact">${clearanceLogoHtml(runtimeClearanceUniversityLogoSrc || clearanceUniversityLogoSrc,'hosting-university-logo')}</div>
      </div>
      <div class="hosting-title-exact">
        <div>جامعة كربلاء- كلية الهندسة</div>
        <div>شعبة الشؤون الطلابية والتسجيل</div>
        <div class="hosting-title-main-exact">استمارة استضافة</div>
      </div>
    </div>
    <div class="hosting-rule-exact"></div>

    <div class="hosting-body-exact">
      <div class="hosting-line-exact hosting-line-transfer hosting-transfer-box"><span class="host-label">استضافة من</span> <span class="host-inline-fill short host-study-fill">${hostingFullStudyFillValue(data.fromStudy)}</span> <span class="host-label">إلى</span> <span class="host-inline-fill short host-study-fill">${hostingFullStudyFillValue(data.toStudy)}</span></div>
      <div class="hosting-line-exact hosting-line-student host-flow-line"><span class="host-label">إني الطالب/ة</span> <span class="host-inline-fill host-inline-fill-paren host-student-fill">${fillParen(data.studentName)}</span> <span class="host-label">أحد طلبة قسم</span> <span class="host-inline-fill host-inline-fill-paren host-inline-fill-department">${fillParen(data.department)}</span> <span class="host-label">المرحلة</span> <span class="host-inline-fill host-inline-fill-paren host-stage-fill">${fillParen(data.stage)}</span></div>
      <div class="hosting-line-exact hosting-line-request host-flow-line"><span class="host-label">الدراسة</span> <span class="host-inline-fill host-inline-fill-paren host-study-fill">${fillParen(studyAdjective(currentStudy))}</span> <span class="host-label">أروم الاستضافة إلى الدراسة</span> <span class="host-inline-fill host-inline-fill-paren host-study-fill">${fillParen(studyAdjective(data.toStudy))}</span></div>
      <div class="hosting-reasons-label-exact">وذلك للأسباب التالية:-</div>
      <ol class="hosting-reasons-exact">
        ${reasons.map(v => `<li>${v}</li>`).join('')}
      </ol>
    </div>

    <div class="hosting-student-sign-exact">
      <div>اسم الطالب وتوقيعه</div>
      <div class="hosting-date-exact">التاريخ &nbsp; / &nbsp; / &nbsp; 202</div>
    </div>

    <section class="hosting-review-section-exact">
      <div class="hosting-review-title-exact">رأي القسم العلمي</div>
      <div class="hosting-review-grid-exact">
        <div class="hosting-opinion-col-exact">
          <div class="hosting-checkline-exact">${squareMark(false)} <span>أوافق على الطلب لوجود طاقة استيعابية.</span></div>
          <div class="hosting-checkline-exact">${squareMark(false)} <span>لا أوافق على الطلب لعدم وجود طاقة استيعابية.</span></div>
        </div>
        <div class="hosting-sign-col-exact">
          <div>رئيس القسم</div>
          <div class="hosting-date-exact">التاريخ &nbsp; / &nbsp; / &nbsp; 202</div>
        </div>
      </div>
    </section>

    <section class="hosting-review-section-exact">
      <div class="hosting-review-title-exact">رأي السيد عميد الكلية المحترم</div>
      <div class="hosting-review-grid-exact">
        <div class="hosting-opinion-col-exact">
          <div class="hosting-checkline-exact">${squareMark(false)} <span>لا مانع لدينا ونوصي السيد رئيس الجامعة المحترم بالموافقة على الاستضافة.</span></div>
          <div class="hosting-checkline-exact">${squareMark(false)} <span>لا أوافق على رفع الطلب لعدم توفر الشروط.</span></div>
        </div>
        <div class="hosting-sign-col-exact">
          <div>أ.د.حيدر ناظم عزيز المحنة</div>
          <div>العميد</div>
          <div class="hosting-date-exact">التاريخ &nbsp; / &nbsp; / &nbsp; 202</div>
        </div>
      </div>
    </section>

    <section class="hosting-review-section-exact hosting-review-final-exact">
      <div class="hosting-review-title-exact">رأي السيد رئيس الجامعة المحترم</div>
      <div class="hosting-review-grid-exact">
        <div class="hosting-opinion-col-exact">
          <div class="hosting-checkline-exact">${squareMark(false)} <span>أوافق على الاستضافة.</span></div>
          <div class="hosting-checkline-exact">${squareMark(false)} <span>لا أوافق على الاستضافة.</span></div>
        </div>
        <div class="hosting-sign-col-exact">
          <div>أ.د.صباح واجد علي</div>
          <div>رئيس الجامعة</div>
          <div class="hosting-date-exact">التاريخ &nbsp; / &nbsp; / &nbsp; 202</div>
        </div>
      </div>
    </section>
  </article>`;
}

function renderClearanceForm(form, data){
  const study = normalizeStudy(data.studyShift || data.studyType);
  return `<article class="paper official-paper form-sheet clearance-sheet exact-clearance-sheet">
    <div class="clearance-headband">
      <div class="clearance-headband-main"></div>
      <div class="clearance-headband-cut"></div>
      <div class="clearance-headband-stripes"></div>
    </div>
    <div class="clearance-head exact-clearance-head">
      <div class="clearance-logo clearance-logo-college">${clearanceLogoHtml(runtimeClearanceCollegeLogoSrc,'clearance-college-logo')}</div>
      <div class="clearance-ministry exact-clearance-ministry">
        <div>وزارة التعليم العالي والبحث العلمي</div>
        <div>جامعة كربلاء – كلية الهندسة</div>
        <div>قسم ${displayValue(data.department)}</div>
      </div>
      <div class="clearance-logo clearance-logo-university">${clearanceLogoHtml(runtimeClearanceUniversityLogoSrc,'clearance-university-logo')}</div>
    </div>
    <div class="clearance-title exact-clearance-title">استمارة براءة الذمة للعام ${displayYearRange(data.academicYear)}</div>
    <table class="outline-table clearance-info exact-clearance-info">
      <tr>
        <th>اسم الطالب/ة</th><td>${displayValue(data.studentName)}</td>
        <th>الدراسة</th><td class="option-row">${squareMark(study==='الدراسة الصباحية')} الصباحية ${squareMark(study==='الدراسة المسائية')} المسائية</td>
      </tr>
      <tr>
        <th>القسم العلمي</th><td>${displayValue(data.department)}</td>
        <th>المرحلة</th><td class="option-row">${['الأولى','الثانية','الثالثة','الرابعة','الخامسة'].map(v => `${squareMark(data.stage===v)} ${escapeHtml(v)}`).join(' ')}</td>
      </tr>
      <tr>
        <th>قناة القبول</th><td class="option-row">${['عامة','موازي','ذوي الشهداء','مباشر'].map(v => `${squareMark(data.admissionChannel===v)} ${escapeHtml(v)}`).join(' ')}</td>
        <th>الدور</th><td class="option-row">${squareMark(data.round==='الأول')} الاول ${squareMark(data.round==='الثاني')} الثاني</td>
      </tr>
    </table>
    <div class="clearance-grid exact-clearance-grid rtl-two">
      <div class="clear-box"><div class="clear-box-title">مجانية التعليم</div><div>توقيع وختم المخول:</div><div class="clear-spacer"></div><div>الملاحظات:</div></div>
      <div class="clear-box"><div class="clear-box-title">حسابات الكلية</div><div>توقيع وختم المخول:</div><div class="clear-spacer"></div><div>الملاحظات:</div></div>
      <div class="clear-box"><div class="clear-box-title">الأقسام الداخلية</div><div>توقيع وختم المخول:</div><div class="clear-spacer"></div><div>الملاحظات:</div><div class="clear-note">إجراء سنوي (لطلبة الأقسام الداخلية)</div></div>
      <div class="clear-box"><div class="clear-box-title">الصيانة</div><div>توقيع وختم المخول:</div><div class="clear-spacer"></div><div>الملاحظات:</div></div>
      <div class="clear-box"><div class="clear-box-title">شؤون الطلبة</div><div>توقيع وختم المخول:</div><div class="clear-spacer"></div><div>الملاحظات:</div><div class="clear-note">إجراء سنوي (يتم لطلبة المرحلة الاولى والمنتهية فقط)</div></div>
      <div class="clear-box"><div class="clear-box-title">القسم العلمي</div><div>توقيع وختم رئيس القسم او من يخوله:</div><div class="clear-spacer"></div><div>الملاحظات:</div></div>
    </div>
    <div class="clearance-bottom-note">الملاحظات ان وجدت تكتب في ظهر الاستمارة</div>
    <div class="clearance-footer-strip">
      <span>07810747747</span>
      <span>reg-engineering@uokerbala.edu.iq</span>
      <span>eng.uokerbala.edu.iq</span>
    </div>
  </article>`;
}

function renderMedicalCheckForm(form, data){
  const deptRaw = String(data.department || '').trim();
  const deptAr = deptRaw ? escapeHtml(deptRaw) : '';
  const deptEn = escapeHtml(departmentEnglishName(data.department));
  const student = displayValue(data.studentName);
  const stage = displayValue(data.stage);
  const studyType = displayStudyValue(data.studyType);
  const today = currentArabicDate();
  const singleLogoSrc = runtimeClearanceUniversityLogoSrc || printLogoSrc || '';
  const singleLogoHtml = singleLogoSrc ? `<img src="${singleLogoSrc}" alt="" class="medical-logo-img medical-logo-university medical-logo-single-v54">` : '';
  function singleCopy(){
    return `
      <section class="medical-form-copy medical-form-copy-v54">
        <div class="medical-copy-header medical-copy-header-v54">
          <div class="medical-en-head medical-en-head-v54">
            <div>University of Kerbala</div>
            <div>College of Engineering</div>
            <div>${deptEn}</div>
          </div>
          <div class="medical-copy-logo medical-copy-logo-center-v54">${singleLogoHtml}</div>
          <div class="medical-ar-head medical-ar-head-v54">
            <div>جـامـعة كـــربلاء</div>
            <div>كــــلية الهنـدســـــــــة</div>
            <div>قسم ${deptAr || '......................'}</div>
          </div>
        </div>
        <div class="medical-meta-stack medical-meta-stack-v54">
          <div class="medical-meta-line medical-meta-line-v54"><span>العدد:</span><span class="medical-meta-fill medical-meta-fill-v54"></span></div>
          <div class="medical-meta-line medical-meta-line-v54"><span>التاريخ:</span><span class="medical-meta-fill medical-meta-fill-v54"></span></div>
        </div>
        <div class="medical-recipient-stack medical-recipient-stack-v54">
          <div>السيد معاون العميد للشؤون العلمية المحترم</div>
          <div>السيد رئيس قسم ${deptAr || '......................'}</div>
        </div>
        <div class="medical-subject medical-subject-v54">م/ فحص ومعالجة</div>
        <div class="medical-greeting medical-greeting-v54">تحية طيبة.......</div>
        <div class="medical-body medical-body-v54">يرجى تفضلكم بتزويدي باستمارة فحص ومعالجة لغرض المعاينة الطبية في المركز الصحي.</div>
        <div class="medical-respect medical-respect-v54">مع التقدير</div>
        <div class="medical-footer-row medical-footer-row-v54">
          <div class="medical-head-sign medical-head-sign-v54">
            <div class="medical-head-sign-title">توقيع رئيس القسم</div>
            <div class="medical-head-sign-date">${today}</div>
          </div>
          <div class="medical-student-box medical-student-box-v54">
            <div>التوقيع:</div>
            <div>الاسم: ${student}</div>
            <div>المرحلة: ${stage}</div>
            <div>الدراسة: ${studyType}</div>
          </div>
        </div>
      </section>`;
  }
  return `<article class="paper medical-two-up-sheet medical-two-up-sheet-v54 form-sheet">
    <div class="medical-two-up-grid medical-two-up-grid-v54">${singleCopy()}${singleCopy()}</div>
  </article>`;
}

function petitionVerb(kind){
  if (kind === 'return') return 'عودتي إلى الدراسة';
  if (kind === 'dismissal') return 'ترقين قيدي';
  return 'احتساب سنة عدم رسوب';
}
function petitionSubject(kind){
  if (kind === 'return') return 'عودة المرقنة قيودهم';
  if (kind === 'dismissal') return 'ترقين قيد';
  return 'احتساب سنة عدم رسوب';
}
function renderPetitionForm(form, data){
  return `<article class="paper petition-paper form-sheet petition-sheet">
    <div class="petition-frame">
      <div class="corner corner-tr"></div><div class="corner corner-tl"></div><div class="corner corner-br"></div><div class="corner corner-bl"></div>
      <div class="petition-topline">الى / السيد معاون العميد للشؤون العلمية المحترم ...</div>
      <div class="petition-topline">بواسطة / السيد مدير شعبة التسجيل والشؤون الطلابية المحترم ...</div>
      <div class="petition-mark">م/ ${escapeHtml(petitionSubject(form.petitionKind))}</div>
      <div class="petition-body">
        <div class="petition-greeting">تحية طيبة ....</div>
        <p>إني الطالب / (${displayValue(data.studentName)}) والمقبول في كليتكم الموقرة / قسم (${displayValue(data.department)}) المرحلة (${displayValue(data.stage)}) الدراسة (${displayStudyValue(data.studyType)}) والمقبول في العام الدراسي (${displayYear(data.academicYear)}).</p>
        <p>ارجو تفضلكم بالموافقة على (${escapeHtml(petitionVerb(form.petitionKind))}) وذلك بسبب (${displayValue(data.petitionReason)}).</p>
        <p class="petition-thanks">ولكم الامر ... مع فائق الشكر والاحترام</p>
      </div>
      <div class="petition-signature-block">التوقيع:<br><br>الاسم: ${displayValue(data.studentName)}<br><br>القسم: ${displayValue(data.department)}<br><br>المرحلة: ${displayValue(data.stage)}<br><br>الدراسة: ${displayStudyValue(data.studyType)}<br><br>التاريخ: ${currentArabicDate()}<br><br>رقم الهاتف: ${displayValue(data.phone)}</div>
      <div class="official-approval-grid petition-official-approval-grid">
        <div class="official-approval-box official-approval-right">
          <div class="official-approval-title">تأييد رئيس القسم المختص وختمه</div>
          <div class="official-approval-footer">
            <div>رئيس القسم</div>
            <div class="petition-admin-date" dir="rtl"><span>التاريخ:</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-year">202</span></div>
          </div>
        </div>
        <div class="official-approval-box official-approval-left">
          <div class="official-approval-title">تأييد مدير التسجيل وختمه</div>
          <div class="official-approval-footer">
            <div>مدير التسجيل</div>
            <div class="petition-admin-date" dir="rtl"><span>التاريخ:</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-slot"></span><span class="petition-date-sep">/</span><span class="petition-date-year">202</span></div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
}

function renderPreview(form, data){
  if (!form) return '';
  if (form.printType === 'continuity') return renderContinuityForm(form, data);
  if (form.printType === 'deferment') return renderDefermentForm(form, data);
  if (form.printType === 'hosting') return renderHostingForm(form, data);
  if (form.printType === 'absence') return renderAbsenceForm(form, data);
  if (form.printType === 'clearance') return renderClearanceForm(form, data);
  if (form.printType === 'medical_check') return renderMedicalCheckForm(form, data);
  if (form.printType === 'petition') return renderPetitionForm(form, data);
  return renderCommitteeForm(form, data);
}

function syncPreview(){
  if (!activeForm || !$('mainForm') || !$('printArea')) return;
  const data = getFormData();
  $('printArea').innerHTML = renderPreview(activeForm, data);
  if (iosPrintReadyKey) {
    try {
      const freshKey = payloadKey(buildRequestPayload());
      if (freshKey !== iosPrintReadyKey) {
        iosPrintReadyKey = '';
        if ($('printBtn')) $('printBtn').textContent = 'طباعة الاستمارة';
      }
    } catch(e) {}
  }
}

function buildRequestPayload(){
  if (!activeForm || !$('mainForm')) throw new Error('لا توجد استمارة نشطة.');
  const fd = new FormData($('mainForm'));
  const dynamicFieldsObj = {};
  (activeForm.fields || []).forEach(([key]) => dynamicFieldsObj[key] = fd.get(key) || '');
  return {
    formId: activeForm.id,
    formCode: activeForm.code,
    formTitle: activeForm.title,
    studentName: fd.get('studentName') || '',
    department: fd.get('department') || '',
    studyType: fd.get('studyType') || '',
    stage: fd.get('stage') || '',
    phone: fd.get('phone') || '',
    studentId: fd.get('studentId') || '',
    directedTo: fd.get('directedTo') || activeForm.directedTo || '',
    requestText: fd.get('requestText') || activeForm.template || '',
    purpose: fd.get('purpose') || activeForm.purpose || '',
    dynamicFields: dynamicFieldsObj,
  };
}
function payloadKey(payload){
  return JSON.stringify(payload);
}
async function saveActiveRequest(opts = {}){
  const { mode = 'save', force = false } = opts;
  const submitBtn = $('submitBtn');
  const printBtn = $('printBtn');
  const submitStatus = $('submitStatus');
  syncPreview();
  const payload = buildRequestPayload();
  const key = payloadKey(payload);
  if (!force && lastSavedKey && key === lastSavedKey && lastSavedRequestNo) {
    if ($('requestNumber')) $('requestNumber').textContent = lastSavedRequestNo;
    if (submitStatus) submitStatus.textContent = mode === 'print' ? 'تم استخدام الحفظ السابق وتجهيز الطباعة.' : 'الطلب محفوظ مسبقًا.';
    return { ok:true, requestNo:lastSavedRequestNo, message:'saved-cache', reused:true };
  }
  if (submitBtn) submitBtn.disabled = true;
  if (printBtn) printBtn.disabled = true;
  if (submitStatus) submitStatus.textContent = mode === 'print' ? 'جاري حفظ الطلب وتجهيز الطباعة...' : 'جاري حفظ الطلب...';
  try {
    const result = await runServer('submitRequest', payload);
    if (!result || result.ok !== true || !result.requestNo || String(result.requestNo).indexOf('PREVIEW-') === 0) {
      throw new Error('لم يتم تأكيد الحفظ في Google Sheet.');
    }
    lastSavedKey = key;
    lastSavedRequestNo = result.requestNo || '';
    if ($('requestNumber')) $('requestNumber').textContent = result.requestNo || 'تم الحفظ';
    if (submitStatus) submitStatus.textContent = mode === 'print' ? 'تم حفظ الطلب وجارٍ إرسال أمر الطباعة.' : (result.message || 'تم حفظ الطلب بنجاح.');
    return result;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (printBtn) printBtn.disabled = false;
  }
}
let iosPrintReadyKey = '';
function isIOSPrintDevice(){
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1);
}
function printCurrentPreview(){
  if (!$('printArea')) return;
  syncPreview();

  const ua = navigator.userAgent || '';
  const isTouchIpadDesktopUA = /Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1;
  const isPhoneOrTablet = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || isTouchIpadDesktopUA || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(max-width: 1100px)').matches);
  const isLandscape = !!(activeForm && activeForm.pageOrientation === 'landscape');
  const isMedicalCheck = !!(activeForm && activeForm.id === 'medicalCheck');
  const useMobileMedicalRotate = !!(isLandscape && isMedicalCheck && isPhoneOrTablet);

  Array.from(document.body.classList).forEach(cls => {
    if (cls.indexOf('print-form-') === 0 || cls === 'mobile-medical-rotate-print') {
      document.body.classList.remove(cls);
    }
  });

  let pageStyleEl = document.getElementById('runtimePrintPageStyle');
  if (pageStyleEl && pageStyleEl.parentNode) pageStyleEl.parentNode.removeChild(pageStyleEl);
  pageStyleEl = document.createElement('style');
  pageStyleEl.id = 'runtimePrintPageStyle';

  const mobileFullPagePrintForms = new Set(['deferment','eveningFees','govFees','absence','examDelay','hosting','return','dismissal','nonfail']);
  const useFullPagePhonePrint = !!(isPhoneOrTablet && !isLandscape && activeForm && mobileFullPagePrintForms.has(activeForm.id));

  if (useMobileMedicalRotate) {
    pageStyleEl.textContent = '@page { size: A4 portrait; margin: 0; } @media print { html, body { width:210mm !important; height:297mm !important; min-width:210mm !important; min-height:297mm !important; overflow:hidden !important; background:#fff !important; } }';
  } else if (useFullPagePhonePrint) {
    pageStyleEl.textContent = '@page { size: A4 portrait; margin: 0; } @media print { html, body { width:210mm !important; height:297mm !important; min-width:210mm !important; min-height:297mm !important; margin:0 !important; padding:0 !important; overflow:hidden !important; background:#fff !important; } }';
  } else if (isLandscape) {
    pageStyleEl.textContent = '@page { size: A4 landscape; margin: 6mm; }';
  } else {
    pageStyleEl.textContent = '@page { size: A4 portrait; margin: 5mm; }';
  }
  document.head.appendChild(pageStyleEl);

  const formPrintClass = activeForm && activeForm.id ? 'print-form-' + activeForm.id : '';
  const mobileRotateClass = useMobileMedicalRotate ? 'mobile-medical-rotate-print' : '';
  let cleanupTimer = null;
  let returnCleanupTimer = null;
  let printStartedAt = 0;

  const scheduleReturnCleanup = () => {
    if (!document.body.classList.contains('print-mode-active')) return;
    if (returnCleanupTimer) clearTimeout(returnCleanupTimer);
    const elapsed = printStartedAt ? Date.now() - printStartedAt : 9999;
    const minWait = useMobileMedicalRotate ? 1800 : 900;
    const delay = elapsed < minWait ? (minWait - elapsed) : (useMobileMedicalRotate ? 500 : 250);
    returnCleanupTimer = setTimeout(cleanupPrintMode, delay);
  };
  const focusCleanupHandler = () => scheduleReturnCleanup();
  const visibilityCleanupHandler = () => {
    if (document.visibilityState === 'visible') scheduleReturnCleanup();
  };

  const cleanupPrintMode = () => {
    window.removeEventListener('afterprint', afterPrintHandler);
    window.removeEventListener('focus', focusCleanupHandler);
    document.removeEventListener('visibilitychange', visibilityCleanupHandler);
    if (cleanupTimer) clearTimeout(cleanupTimer);
    if (returnCleanupTimer) clearTimeout(returnCleanupTimer);
    document.body.classList.remove('print-mode-active');
    if (formPrintClass) document.body.classList.remove(formPrintClass);
    if (mobileRotateClass) document.body.classList.remove(mobileRotateClass);
    if (pageStyleEl && pageStyleEl.parentNode) pageStyleEl.parentNode.removeChild(pageStyleEl);
    if ($('submitBtn')) $('submitBtn').disabled = false;
    if ($('printBtn')) $('printBtn').disabled = false;
  };

  const afterPrintHandler = () => {
    setTimeout(cleanupPrintMode, useMobileMedicalRotate ? 1600 : 700);
  };

  document.body.classList.add('print-mode-active');
  if (formPrintClass) document.body.classList.add(formPrintClass);
  if (mobileRotateClass) document.body.classList.add(mobileRotateClass);
  window.addEventListener('afterprint', afterPrintHandler);
  window.addEventListener('focus', focusCleanupHandler);
  document.addEventListener('visibilitychange', visibilityCleanupHandler);

  cleanupTimer = setTimeout(cleanupPrintMode, useMobileMedicalRotate ? 15000 : 7000);
  const openPrintDialog = () => {
    printStartedAt = Date.now();
    window.focus();
    window.print();
  };
  if (isIOSPrintDevice() && !useMobileMedicalRotate) {
    openPrintDialog();
  } else {
    setTimeout(openPrintDialog, useMobileMedicalRotate ? 850 : 180);
  }
}


function buildIOSSavablePdfHtml(){
  syncPreview();
  const printArea = $('printArea');
  if (!printArea) throw new Error('لا توجد استمارة جاهزة للطباعة.');
  const styleText = Array.from(document.querySelectorAll('style')).map(s => s.textContent || '').join('\n');
  const formPrintClass = activeForm && activeForm.id ? 'print-form-' + activeForm.id : '';
  const isMedicalIOSPdf = !!(activeForm && activeForm.id === 'medicalCheck');
  const isPetitionIOSPdf = !!(activeForm && ['return','dismissal','nonfail'].includes(activeForm.id));
  const pageCss = isMedicalIOSPdf
    ? `@page { size: 297mm 210mm; margin: 0; }
       @media print { @page { size: 297mm 210mm; margin:0; } }
       html, body { width:297mm !important; height:210mm !important; min-width:297mm !important; min-height:210mm !important; margin:0 !important; padding:0 !important; background:#fff; direction:rtl; overflow:hidden !important; }
       #formPage, #printArea { display:block !important; width:297mm !important; height:210mm !important; min-width:297mm !important; min-height:210mm !important; margin:0 auto !important; padding:0 !important; background:#fff !important; overflow:hidden !important; }
       body.print-mode-active.print-form-medicalCheck #formPage .medical-two-up-sheet,
       body.print-mode-active.print-form-medicalCheck #formPage .medical-two-up-sheet-v54,
       body.print-mode-active.print-form-medicalCheck #formPage .medical-two-up-sheet.medical-two-up-sheet-v54{
         width:282mm !important; min-width:282mm !important; max-width:282mm !important;
         min-height:194mm !important; height:auto !important; margin:6mm auto 0 !important;
         padding-top:3mm !important; padding-right:6mm !important; padding-left:6mm !important; padding-bottom:4mm !important;
         transform:none !important; -webkit-transform:none !important; position:relative !important; top:auto !important; left:auto !important;
         box-shadow:none !important; border:0 !important; overflow:visible !important; background:#fff !important;
       }
       body.print-mode-active.print-form-medicalCheck #formPage .medical-two-up-grid,
       body.print-mode-active.print-form-medicalCheck #formPage .medical-two-up-grid-v54{ grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; gap:4mm !important; }`
    : isPetitionIOSPdf
    ? `@page { size: A4 portrait; margin: 0; }
       @media print { @page { size: A4 portrait; margin:0; } }
       html, body { width:210mm !important; height:297mm !important; min-width:210mm !important; min-height:297mm !important; max-height:297mm !important; margin:0 !important; padding:0 !important; background:#fff; direction:rtl; overflow:hidden !important; }
       #formPage, #printArea { display:block !important; width:210mm !important; height:297mm !important; min-width:210mm !important; min-height:297mm !important; max-height:297mm !important; margin:0 auto !important; padding:0 !important; background:#fff !important; overflow:hidden !important; page-break-before:avoid !important; page-break-after:avoid !important; page-break-inside:avoid !important; break-before:avoid-page !important; break-after:avoid-page !important; break-inside:avoid-page !important; }
       #printArea > .petition-sheet { page-break-before:avoid !important; page-break-after:avoid !important; page-break-inside:avoid !important; break-before:avoid-page !important; break-after:avoid-page !important; break-inside:avoid-page !important; }
       body.ios-pdf-mode.print-form-return #printArea > .form-sheet,
       body.ios-pdf-mode.print-form-dismissal #printArea > .form-sheet,
       body.ios-pdf-mode.print-form-nonfail #printArea > .form-sheet { transform:none !important; -webkit-transform:none !important; margin-left:auto !important; margin-right:auto !important; }
       body.ios-pdf-mode .petition-body { text-rendering:geometricPrecision; }`
    : `@page { size: A4 portrait; margin: 3mm 2mm 2mm 2mm; }
       html, body { width:206mm; min-height:292mm; margin:0; padding:0; background:#fff; direction:rtl; }
       #formPage, #printArea { display:block !important; width:206mm; min-height:292mm; margin:0 auto; padding:0; background:#fff; overflow:hidden; }
       body.ios-pdf-mode #printArea > .form-sheet { transform:translateY(1.8mm) scale(.992); -webkit-transform:translateY(1.8mm) scale(.992); transform-origin:top center; -webkit-transform-origin:top center; }
       body.ios-pdf-mode .petition-body, body.ios-pdf-mode .request-intro, body.ios-pdf-mode .hosting-body-exact { text-rendering:geometricPrecision; }
       body.ios-pdf-mode .petition-line, body.ios-pdf-mode .request-intro { line-height:1.85 !important; }`;
  const extraPrintCss = `
    ${pageCss}
    body { font-family:'Cairo', Arial, sans-serif; }
    .topbar, .home-panel, .section-panel, .workspace-panel:first-child, .preview-head, .actions { display:none !important; }
  `;
  const iosPdfClass = isMedicalIOSPdf ? 'ios-pdf-mode ios-pdf-medical-landscape' : 'ios-pdf-mode';
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${styleText}</style><style>${extraPrintCss}</style></head><body class="print-mode-active ${iosPdfClass} ${formPrintClass}"><div id="formPage"><div id="printArea">${printArea.innerHTML}</div></div></body></html>`;
}
function openIOSPdfPreparingWindow(){
  let w = null;
  try {
    w = window.open('', '_blank');
    if (w && w.document) {
      w.document.open();
      w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>تجهيز PDF</title><style>body{font-family:Arial,sans-serif;direction:rtl;text-align:center;padding:40px 18px;line-height:2} .box{border:1px solid #ddd;border-radius:14px;padding:18px;max-width:420px;margin:auto}</style></head><body><div class="box"><h3>جاري تجهيز ملف PDF...</h3><p>انتظر لحظات، بعدها يفتح الملف للحفظ أو المشاركة.</p></div></body></html>');
      w.document.close();
    }
  } catch(e) {
    w = null;
  }
  return w;
}
function openGeneratedPdfFile(pdfWindow, fileUrl){
  if (!fileUrl) throw new Error('لم يتم إنشاء رابط PDF.');
  if (pdfWindow && !pdfWindow.closed) {
    try {
      pdfWindow.location.href = fileUrl;
      return;
    } catch(e) {}
  }
  try {
    const opened = window.open(fileUrl, '_blank');
    if (!opened) window.location.href = fileUrl;
  } catch(e) {
    window.location.href = fileUrl;
  }
}

async function saveAndPrintCurrentRequest(){
  const isIOS = isIOSPrintDevice();

  /* iPhone/iPad only: generate a savable PDF file instead of opening the native print dialog.
     Android and computer continue using the existing print path. */
  if (isIOS) {
    const pdfWindow = openIOSPdfPreparingWindow();
    try {
      if ($('submitStatus')) $('submitStatus').textContent = 'جاري حفظ الطلب وتجهيز PDF للآيفون...';
      const result = await saveActiveRequest({ mode:'print', force:true });
      if (!result || result.ok !== true || !result.requestNo || String(result.requestNo).indexOf('PREVIEW-') === 0) {
        throw new Error('لم يتم تأكيد الحفظ في Google Sheet.');
      }
      const html = buildIOSSavablePdfHtml();
      const pdfResult = await runServer('createPrintablePdf', {
        html: html,
        requestNo: result.requestNo,
        formCode: activeForm ? activeForm.code : '',
        formTitle: activeForm ? activeForm.title : '',
        studentName: buildRequestPayload().studentName || ''
      });
      if (!pdfResult || pdfResult.ok !== true || !pdfResult.fileUrl) {
        throw new Error('تعذر تجهيز ملف PDF للآيفون.');
      }
      if ($('submitStatus')) $('submitStatus').textContent = 'تم تجهيز PDF. افتح الملف للحفظ أو المشاركة.';
      openGeneratedPdfFile(pdfWindow, pdfResult.fileUrl);
    } catch(err) {
      if (pdfWindow && !pdfWindow.closed) {
        try { pdfWindow.close(); } catch(e) {}
      }
      if ($('submitStatus')) $('submitStatus').textContent = err.message || 'تعذر تجهيز PDF للآيفون، سيتم فتح الطباعة العادية.';
      try { printCurrentPreview(); } catch(e) {}
      if ($('submitBtn')) $('submitBtn').disabled = false;
      if ($('printBtn')) $('printBtn').disabled = false;
    }
    return;
  }

  try {
    const result = await saveActiveRequest({ mode:'print', force:true });
    if (!result || result.ok !== true || !result.requestNo || String(result.requestNo).indexOf('PREVIEW-') === 0) {
      throw new Error('لم يتم تأكيد الحفظ في Google Sheet، لذلك تم إيقاف الطباعة.');
    }
    printCurrentPreview();
  } catch(err) {
    if ($('submitStatus')) $('submitStatus').textContent = err.message || 'تعذر حفظ الطلب قبل الطباعة.';
    if ($('submitBtn')) $('submitBtn').disabled = false;
    if ($('printBtn')) $('printBtn').disabled = false;
  }
}
function fileToObject(file){
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve({ name:file.name, mimeType:file.type || 'application/octet-stream', base64:String(reader.result).split(',')[1] });
    reader.onerror = () => reject(new Error('تعذر قراءة الملف.'));
    reader.readAsDataURL(file);
  });
}


/* ===== GitHub Pages backend: Google Form submission only ===== */
const GOOGLE_FORM_ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSfybTW8gztzG4-FzOXNpKZ3ZY77t_TZKMntc-ENEzMvaT0K9A/formResponse';
const GOOGLE_FORM_FIELDS = {
  requestNo: 'entry.733863792',
  requestType: 'entry.1697986856',
  studentName: 'entry.1871558669',
  gender: 'entry.932390662',
  department: 'entry.872749219',
  stage: 'entry.1466097518',
  studyType: 'entry.33250945',
  phone: 'entry.1924961303',
  email: 'entry.44513465',
  governorate: 'entry.283381111',
  address: 'entry.1857603075',
  details: 'entry.418785480',
  reason: 'entry.392138003',
  directedTo: 'entry.869274495',
  notes: 'entry.2138721097'
};

function setupDashboardUI(){}
function dashboardSafeBootV13(){}
function dashboardSafeBootV14(){}

function generateStaticRequestNo(){
  const d = new Date();
  const pad = (n, len=2) => String(n).padStart(len,'0');
  const yy = d.getFullYear();
  const stamp = `${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rnd = Math.floor(Math.random()*900 + 100);
  return `REQ-${yy}-${stamp}-${rnd}`;
}

function dynamicFieldsText(obj){
  if (!obj) return '';
  return Object.keys(obj).map(k => `${k}: ${obj[k] || ''}`).filter(Boolean).join('\n');
}

function buildGoogleFormDetails(payload){
  const dyn = dynamicFieldsText(payload.dynamicFields);
  return [
    `رمز الاستمارة: ${payload.formCode || ''}`,
    `عنوان الاستمارة: ${payload.formTitle || ''}`,
    payload.requestText ? `نص الطلب:\n${payload.requestText}` : '',
    dyn ? `الحقول الخاصة:\n${dyn}` : '',
    payload.studentId ? `الرقم الجامعي: ${payload.studentId}` : ''
  ].filter(Boolean).join('\n\n');
}

async function runServer(method, payload){
  if (method !== 'submitRequest') {
    return { ok:true, message:'تم تجاوز هذه العملية في نسخة GitHub Pages.' };
  }
  const requestNo = generateStaticRequestNo();
  const fd = new FormData();
  fd.append(GOOGLE_FORM_FIELDS.requestNo, requestNo);
  fd.append(GOOGLE_FORM_FIELDS.requestType, payload.formTitle || payload.formCode || 'طلب طالب');
  fd.append(GOOGLE_FORM_FIELDS.studentName, payload.studentName || '');
  /* إذا كان سؤال الجنس مطلوبًا في Google Form، غيّره إلى اختياري لاحقًا. نرسل ذكر افتراضيًا فقط حتى لا يرفض النموذج الرد. */
  fd.append(GOOGLE_FORM_FIELDS.gender, 'ذكر');
  fd.append(GOOGLE_FORM_FIELDS.department, payload.department || '');
  fd.append(GOOGLE_FORM_FIELDS.stage, payload.stage || '');
  fd.append(GOOGLE_FORM_FIELDS.studyType, payload.studyType || '');
  fd.append(GOOGLE_FORM_FIELDS.phone, payload.phone || '');
  fd.append(GOOGLE_FORM_FIELDS.email, '');
  fd.append(GOOGLE_FORM_FIELDS.governorate, '');
  fd.append(GOOGLE_FORM_FIELDS.address, '');
  fd.append(GOOGLE_FORM_FIELDS.details, buildGoogleFormDetails(payload));
  fd.append(GOOGLE_FORM_FIELDS.reason, payload.purpose || '');
  fd.append(GOOGLE_FORM_FIELDS.directedTo, payload.directedTo || '');
  fd.append(GOOGLE_FORM_FIELDS.notes, payload.studentId ? ('الرقم الجامعي: ' + payload.studentId) : '');
  try {
    await fetch(GOOGLE_FORM_ENDPOINT, { method:'POST', mode:'no-cors', body: fd });
  } catch(e) {
    /* no-cors لا يعيد تأكيدًا حقيقيًا، لذلك نعرض نجاحًا بعد محاولة الإرسال */
  }
  return { ok:true, requestNo: requestNo, message:'تم حفظ الطلب وتجهيز الاستمارة للطباعة.' };
}

/* تعطيل مسار PDF الخاص بآيفون لأنه كان يعتمد على Apps Script. الطباعة العادية تبقى متاحة. */
async function saveAndPrintCurrentRequest(){
  try {
    const result = await saveActiveRequest({ mode:'print', force:true });
    if (!result || result.ok !== true || !result.requestNo) {
      throw new Error('لم يتم إنشاء رقم الطلب.');
    }
    printCurrentPreview();
  } catch(err) {
    if ($('submitStatus')) $('submitStatus').textContent = err.message || 'تعذر حفظ الطلب قبل الطباعة.';
    if ($('submitBtn')) $('submitBtn').disabled = false;
    if ($('printBtn')) $('printBtn').disabled = false;
  }
}

function setupServerBindings(){
  const submitBtn = $('submitBtn');
  const printBtn = $('printBtn');
  if (submitBtn) {
    submitBtn.style.display = '';
    submitBtn.textContent = 'حفظ فقط';
  }
  if (printBtn) {
    printBtn.textContent = 'حفظ وطباعة';
    printBtn.title = 'يحفظ الطلب ثم يطبع الاستمارة';
  }
  if ($('mainForm')) {
    $('mainForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!activeForm) return;
      try {
        await saveActiveRequest({ mode:'save' });
      } catch(err) {
        if ($('submitStatus')) $('submitStatus').textContent = err.message || 'حدث خطأ أثناء الحفظ.';
      }
    });
  }
  if (printBtn) {
    printBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!activeForm) return;
      await saveAndPrintCurrentRequest();
    });
  }
}
