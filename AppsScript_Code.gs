/**************************************************************
 * Google Apps Script backend for Student Requests Portal v82
 * طريقة الاستخدام:
 * 1) افتح Apps Script من داخل Google Sheet أو من script.google.com.
 * 2) Extensions > Apps Script.
 * 3) الصق هذا الملف كاملاً في Code.gs.
 * 4) Deploy > New deployment > Web app.
 * 5) Execute as: Me. Who has access: Anyone.
 * 6) انسخ رابط /exec وضعه في config.js داخل الموقع.
 **************************************************************/

// تم تثبيت معرف الشيت الذي أرسله المستخدم؛ لا نحتاج Google Form.
const SPREADSHEET_ID = '1wrO7Wck-4_D5-zAvOR_O7hSDKUhyT3xOu9pT15_TlZQ';
const REQUESTS_SHEET_NAME = 'Requests';
const UPLOADS_SHEET_NAME = 'Uploads';
// اختياري: ضع ID فولدر Google Drive الذي تريد حفظ الملفات المرفوعة داخله.
// اتركه فارغاً ليتم إنشاء/استخدام فولدر باسم Student Requests Uploads في درايف الحساب.
const UPLOAD_FOLDER_ID = '';

function appServer(req) {
  req = req || {};
  return route_(req.method, req.payload || {});
}

function doGet(e) {
  const result = { ok: true, message: 'Student Requests Web App is running.', time: new Date().toISOString() };
  return json_(result);
}

function doPost(e) {
  let method = '';
  let payload = {};
  let requestId = '';
  let responseMode = '';
  let source = 'student-request-v82';

  try {
    const p = (e && e.parameter) || {};
    responseMode = p.responseMode || '';
    requestId = p.requestId || '';
    source = p.source || source;

    if (e && e.postData && e.postData.contents && !p.json && !p.payload) {
      const body = JSON.parse(e.postData.contents || '{}');
      method = body.method || '';
      payload = body.payload || {};
      responseMode = body.responseMode || responseMode;
      requestId = body.requestId || requestId;
      source = body.source || source;
    } else if (p.json) {
      const body = JSON.parse(p.json || '{}');
      method = body.method || p.method || '';
      payload = body.payload || parsePayload_(p.payload);
      requestId = body.requestId || requestId;
      source = body.source || source;
    } else {
      method = p.method || '';
      payload = parsePayload_(p.payload);
    }

    const result = route_(method, payload);
    if (responseMode === 'postMessage') return postMessage_(result, requestId, source);
    return json_(result);
  } catch (err) {
    const result = { ok: false, message: err && err.message ? err.message : String(err) };
    if (responseMode === 'postMessage') return postMessage_(result, requestId, source);
    return json_(result);
  }
}

function route_(method, payload) {
  method = String(method || '').trim();
  payload = payload || {};
  if (method === 'submitRequest') return submitRequest_(payload);
  if (method === 'uploadCompletedRequest') return uploadCompletedRequest_(payload);
  if (method === 'dashboardGetData') return dashboardGetData_();
  if (method === 'dashboardLogin') return dashboardLogin_(payload);
  return { ok: false, message: 'Unknown method: ' + method };
}

function submitRequest_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sh = getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_());
    const requestNo = payload.requestNo || nextRequestNo_(sh);
    const dynamicFields = payload.dynamicFields || {};
    const row = [
      new Date(),
      requestNo,
      payload.formId || '',
      payload.formCode || '',
      payload.formTitle || '',
      payload.studentName || '',
      payload.department || '',
      payload.studyType || '',
      payload.stage || '',
      payload.phone || '',
      payload.studentId || '',
      payload.directedTo || '',
      payload.purpose || '',
      payload.requestText || '',
      JSON.stringify(dynamicFields),
      'جديد'
    ];
    sh.appendRow(row);
    return { ok: true, requestNo: requestNo, message: 'تم حفظ الطلب في Google Sheet.' };
  } finally {
    lock.releaseLock();
  }
}

function uploadCompletedRequest_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sh = getOrCreateSheet_(ss, UPLOADS_SHEET_NAME, uploadHeaders_());
    const requestNo = payload.requestNo || nextUploadNo_(sh);
    let fileUrl = '';
    let fileName = '';
    if (payload.file && payload.file.data) {
      const fileObj = payload.file;
      const folder = getUploadFolder_();
      const bytes = Utilities.base64Decode(String(fileObj.data).split(',').pop());
      const blob = Utilities.newBlob(bytes, fileObj.mimeType || 'application/octet-stream', fileObj.name || (requestNo + '.pdf'));
      const file = folder.createFile(blob);
      fileName = file.getName();
      fileUrl = file.getUrl();
    }
    sh.appendRow([
      new Date(),
      requestNo,
      payload.formCode || '',
      payload.formTitle || '',
      payload.studentName || '',
      fileName,
      fileUrl,
      'مرفوع'
    ]);
    return { ok: true, requestNo: requestNo, fileUrl: fileUrl, message: 'تم رفع الملف وحفظ بياناته.' };
  } finally {
    lock.releaseLock();
  }
}

function dashboardLogin_(payload) {
  // دخول مبسط حتى لا تتعطل لوحة المتابعة إذا استُخدمت لاحقاً.
  return { ok: true, token: 'local-admin', staff: { name: 'Admin', role: 'admin' }, data: dashboardGetData_().data };
}

function dashboardGetData_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const req = sheetObjects_(getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_()));
  const up = sheetObjects_(getOrCreateSheet_(ss, UPLOADS_SHEET_NAME, uploadHeaders_()));
  return { ok: true, data: { requests: req, uploads: up, rows: req.concat(up) } };
}

function requestHeaders_() {
  return ['timestamp','requestNo','formId','formCode','formTitle','studentName','department','studyType','stage','phone','studentId','directedTo','purpose','requestText','dynamicFields','status'];
}

function uploadHeaders_() {
  return ['timestamp','requestNo','formCode','formTitle','studentName','fileName','fileUrl','status'];
}

function getOrCreateSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(headers);
  const first = sh.getRange(1, 1, 1, Math.max(headers.length, sh.getLastColumn())).getValues()[0];
  if (!first[0]) sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sh;
}

function nextRequestNo_(sh) {
  const n = Math.max(1, sh.getLastRow());
  const seq = String(n).padStart(5, '0');
  return 'REQ-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + seq;
}

function nextUploadNo_(sh) {
  const n = Math.max(1, sh.getLastRow());
  const seq = String(n).padStart(5, '0');
  return 'UP-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + seq;
}

function getUploadFolder_() {
  if (UPLOAD_FOLDER_ID) return DriveApp.getFolderById(UPLOAD_FOLDER_ID);
  const name = 'Student Requests Uploads';
  const it = DriveApp.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(name);
}

function sheetObjects_(sh) {
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(r => r.join('') !== '').map(r => {
    const o = {};
    headers.forEach((h, i) => o[h] = r[i]);
    return o;
  });
}

function parsePayload_(txt) {
  if (!txt) return {};
  if (typeof txt === 'object') return txt;
  try { return JSON.parse(txt); } catch (e) { return {}; }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function postMessage_(obj, requestId, source) {
  const safeJson = JSON.stringify(obj).replace(/</g, '\\u003c');
  const safeReq = JSON.stringify(requestId || '');
  const safeSource = JSON.stringify(source || 'student-request-v82');
  const html = '<!doctype html><html><head><meta charset="utf-8"><script id="student-request-result" type="application/json">' + safeJson + '</script></head><body><script>try{window.top.postMessage({source:' + safeSource + ',requestId:' + safeReq + ',result:' + safeJson + '},"*");}catch(e){}<\/script></body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
