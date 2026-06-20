/**************************************************************
 * Google Apps Script backend for Student Requests Portal v94
 * يحفظ الطلبات في نفس الشيت ويرفع ملفات الطلبات الموقعة إلى Google Drive.
 *
 * الإعدادات المثبتة:
 * - Sheet ID: الشيت الذي أرسله المستخدم.
 * - Upload folder ID: مجلد الدرايف الذي أرسله المستخدم.
 **************************************************************/

const SPREADSHEET_ID = '1wrO7Wck-4_D5-zAvOR_O7hSDKUhyT3xOu9pT15_TlZQ';
const REQUESTS_SHEET_NAME = 'REQUESTS';
const UPLOADS_SHEET_NAME = 'UPLOADS';
const UPLOAD_FOLDER_ID = '1ePPs54VlqbCAmzt4dvST63bYqUx59as9';

function appServer(req) {
  req = req || {};
  return route_(req.method, req.payload || {});
}

function doGet(e) {
  return json_({ ok: true, message: 'Student Requests Web App v94 is running.', time: new Date().toISOString() });
}

function doPost(e) {
  let method = '';
  let payload = {};
  let requestId = '';
  let responseMode = '';
  let source = 'student-request-v94';

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
  if (method === 'dashboardMarkDone') return dashboardMarkDone_(payload);
  return { ok: false, message: 'Unknown method: ' + method };
}

function submitRequest_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sh = getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_());
    const headers = getHeaders_(sh);
    const requestNo = payload.requestNo || nextRequestNo_(sh, headers);
    const now = new Date();
    const tz = Session.getScriptTimeZone();
    const dynamicFields = payload.dynamicFields || {};

    const rowObject = {
      'رقم الطلب': requestNo,
      'تاريخ التقديم': Utilities.formatDate(now, tz, 'yyyy-MM-dd'),
      'وقت التقديم': Utilities.formatDate(now, tz, 'HH:mm:ss'),
      'نوع الطلب': payload.formTitle || payload.formCode || payload.formId || '',
      'اسم الطالب الرباعي': payload.studentName || '',
      'الجنس': payload.gender || dynamicFields.gender || dynamicFields['الجنس'] || '',
      'القسم': payload.department || '',
      'المرحلة': payload.stage || '',
      'نوع الدراسة': payload.studyType || '',
      'رقم الهاتف': payload.phone || '',
      'البريد الإلكتروني': payload.email || dynamicFields.email || dynamicFields['البريد الإلكتروني'] || '',
      'المحافظة': payload.province || dynamicFields.province || dynamicFields['المحافظة'] || '',
      'العنوان': payload.address || dynamicFields.address || dynamicFields['العنوان'] || '',
      'تفاصيل الطلب': payload.requestText || '',
      'سبب الطلب': payload.purpose || dynamicFields.petitionReason || dynamicFields.reason || '',
      'الجهة': payload.directedTo || '',
      'الحالة': 'جديد',
      'ملاحظات': JSON.stringify(dynamicFields),
      'اسم الملف المرفوع': '',
      'رابط الملف المرفوع': '',
      'تاريخ الرفع': ''
    };

    const row = getHeaders_(sh).map(h => rowObject[h] !== undefined ? rowObject[h] : '');
    sh.appendRow(row);
    return { ok: true, requestNo: requestNo, message: 'تم حفظ الطلب داخل الشيت بنجاح.' };
  } finally {
    lock.releaseLock();
  }
}

function uploadCompletedRequest_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const reqSh = getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_());
    const upSh = getOrCreateSheet_(ss, UPLOADS_SHEET_NAME, uploadHeaders_());
    const now = new Date();
    const requestNo = String(payload.requestNo || '').trim() || nextUploadNo_(upSh);
    const fileObj = payload.file || null;
    let fileUrl = '';
    let fileName = '';
    let fileId = '';

    if (fileObj && (fileObj.base64 || fileObj.data)) {
      const folder = getUploadFolder_();
      const raw = String(fileObj.base64 || fileObj.data || '').split(',').pop();
      const bytes = Utilities.base64Decode(raw);
      const safeName = cleanFileName_(requestNo + '_' + (payload.studentName || 'student') + '_' + (fileObj.name || 'signed_request.pdf'));
      const blob = Utilities.newBlob(bytes, fileObj.mimeType || 'application/octet-stream', safeName);
      const file = folder.createFile(blob);
      fileName = file.getName();
      fileUrl = file.getUrl();
      fileId = file.getId();
    }

    upSh.appendRow([
      now,
      requestNo,
      payload.formCode || '',
      payload.formTitle || '',
      payload.studentName || '',
      fileName,
      fileUrl,
      fileId,
      'مرفوع'
    ]);

    updateRequestUpload_(reqSh, requestNo, payload.studentName || '', fileName, fileUrl, now);

    return { ok: true, requestNo: requestNo, fileUrl: fileUrl, fileName: fileName, message: 'تم رفع الملف وحفظ رابطه داخل الشيت.' };
  } finally {
    lock.releaseLock();
  }
}

function dashboardLogin_(payload) {
  return { ok: true, token: 'local-admin', staff: { name: 'Admin', role: 'admin' }, data: dashboardGetData_().data };
}

function dashboardGetData_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const req = sheetObjects_(getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_()));
  const up = sheetObjects_(getOrCreateSheet_(ss, UPLOADS_SHEET_NAME, uploadHeaders_()));
  return { ok: true, data: { requests: req, uploads: up, rows: req.concat(up) } };
}

function dashboardMarkDone_(payload) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sh = getOrCreateSheet_(ss, REQUESTS_SHEET_NAME, requestHeaders_());
  const requestNo = String(payload.requestNo || '').trim();
  if (requestNo) updateStatusByRequestNo_(sh, requestNo, 'منجز');
  return dashboardGetData_();
}

function requestHeaders_() {
  return [
    'رقم الطلب','تاريخ التقديم','وقت التقديم','نوع الطلب','اسم الطالب الرباعي','الجنس','القسم','المرحلة','نوع الدراسة','رقم الهاتف','البريد الإلكتروني','المحافظة','العنوان','تفاصيل الطلب','سبب الطلب','الجهة','الحالة','ملاحظات','اسم الملف المرفوع','رابط الملف المرفوع','تاريخ الرفع'
  ];
}

function uploadHeaders_() {
  return ['تاريخ الرفع','رقم الطلب','رمز الاستمارة','نوع الطلب','اسم الطالب الرباعي','اسم الملف','رابط الملف','معرف الملف','الحالة'];
}

function getOrCreateSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(headers);
  ensureHeaders_(sh, headers);
  return sh;
}

function ensureHeaders_(sh, required) {
  const lastCol = Math.max(1, sh.getLastColumn());
  let current = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(v => String(v || '').trim());
  if (!current[0]) {
    sh.getRange(1, 1, 1, required.length).setValues([required]);
    return;
  }
  required.forEach(h => {
    if (current.indexOf(h) === -1) {
      sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
      current.push(h);
    }
  });
}

function getHeaders_(sh) {
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(h => String(h || '').trim());
}

function nextRequestNo_(sh, headers) {
  headers = headers || getHeaders_(sh);
  const col = headers.indexOf('رقم الطلب') + 1;
  let count = Math.max(0, sh.getLastRow() - 1);
  if (col > 0 && sh.getLastRow() >= 2) {
    count = sh.getRange(2, col, sh.getLastRow() - 1, 1).getValues().flat().filter(String).length;
  }
  const seq = String(count + 1).padStart(5, '0');
  return 'REQ-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + seq;
}

function nextUploadNo_(sh) {
  const n = Math.max(1, sh.getLastRow());
  const seq = String(n).padStart(5, '0');
  return 'UP-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + seq;
}

function getUploadFolder_() {
  return DriveApp.getFolderById(UPLOAD_FOLDER_ID);
}

function updateRequestUpload_(sh, requestNo, studentName, fileName, fileUrl, when) {
  const headers = getHeaders_(sh);
  const noCol = headers.indexOf('رقم الطلب') + 1;
  const nameCol = headers.indexOf('اسم الطالب الرباعي') + 1;
  const statusCol = headers.indexOf('الحالة') + 1;
  const fileNameCol = headers.indexOf('اسم الملف المرفوع') + 1;
  const fileUrlCol = headers.indexOf('رابط الملف المرفوع') + 1;
  const uploadDateCol = headers.indexOf('تاريخ الرفع') + 1;
  let row = 0;

  if (noCol > 0 && requestNo && sh.getLastRow() >= 2) {
    const values = sh.getRange(2, noCol, sh.getLastRow() - 1, 1).getValues();
    for (let i = 0; i < values.length; i++) {
      if (String(values[i][0]).trim() === requestNo) { row = i + 2; break; }
    }
  }

  // إذا لم يجد رقم الطلب، يحاول المطابقة بالاسم كحل احتياطي.
  if (!row && nameCol > 0 && studentName && sh.getLastRow() >= 2) {
    const values = sh.getRange(2, nameCol, sh.getLastRow() - 1, 1).getValues();
    for (let i = values.length - 1; i >= 0; i--) {
      if (String(values[i][0]).trim() === String(studentName).trim()) { row = i + 2; break; }
    }
  }

  if (row) {
    if (statusCol > 0) sh.getRange(row, statusCol).setValue('مرفوع');
    if (fileNameCol > 0) sh.getRange(row, fileNameCol).setValue(fileName);
    if (fileUrlCol > 0) sh.getRange(row, fileUrlCol).setValue(fileUrl);
    if (uploadDateCol > 0) sh.getRange(row, uploadDateCol).setValue(when || new Date());
  }
}

function updateStatusByRequestNo_(sh, requestNo, status) {
  const headers = getHeaders_(sh);
  const noCol = headers.indexOf('رقم الطلب') + 1;
  const statusCol = headers.indexOf('الحالة') + 1;
  if (!noCol || !statusCol || sh.getLastRow() < 2) return;
  const values = sh.getRange(2, noCol, sh.getLastRow() - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === requestNo) {
      sh.getRange(i + 2, statusCol).setValue(status);
      return;
    }
  }
}

function sheetObjects_(sh) {
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(r => r.join('') !== '').map(r => {
    const o = {};
    headers.forEach((h, i) => o[h] = r[i]);
    // مفاتيح إنكليزية مساعدة للوحة المتابعة إن احتاجتها الواجهة.
    o.requestNo = o.requestNo || o['رقم الطلب'] || '';
    o.formTitle = o.formTitle || o['نوع الطلب'] || '';
    o.studentName = o.studentName || o['اسم الطالب الرباعي'] || '';
    o.department = o.department || o['القسم'] || '';
    o.studyType = o.studyType || o['نوع الدراسة'] || '';
    o.stage = o.stage || o['المرحلة'] || '';
    o.phone = o.phone || o['رقم الهاتف'] || '';
    o.status = o.status || o['الحالة'] || '';
    o.fileName = o.fileName || o['اسم الملف المرفوع'] || o['اسم الملف'] || '';
    o.fileUrl = o.fileUrl || o['رابط الملف المرفوع'] || o['رابط الملف'] || '';
    if (o.fileUrl) {
      o.lastUploadUrl = o.fileUrl;
      o.uploadedFilesCount = 1;
      o.files = [{ fileUrl: o.fileUrl, fileName: o.fileName || 'ملف مرفوع' }];
    }
    return o;
  });
}

function parsePayload_(txt) {
  if (!txt) return {};
  if (typeof txt === 'object') return txt;
  try { return JSON.parse(txt); } catch (e) { return {}; }
}

function cleanFileName_(name) {
  return String(name || 'signed_request.pdf').replace(/[\\/:*?"<>|]/g, '-').slice(0, 180);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function postMessage_(obj, requestId, source) {
  const safeJson = JSON.stringify(obj).replace(/</g, '\\u003c');
  const safeReq = JSON.stringify(requestId || '');
  const safeSource = JSON.stringify(source || 'student-request-v94');
  const html = '<!doctype html><html><head><meta charset="utf-8"><script id="student-request-result" type="application/json">' + safeJson + '</script></head><body><script>try{window.top.postMessage({source:' + safeSource + ',requestId:' + safeReq + ',result:' + safeJson + '},"*");}catch(e){}<\/script></body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
