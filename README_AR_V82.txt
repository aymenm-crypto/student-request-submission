شرح الربط المختصر - نسخة V82
==============================

الجواب المهم:
الفورم غير مطلوب.
برنامجك يحتوي استماراته الخاصة، لذلك نستعمل Google Sheet فقط لاستقبال الردود.
رابط Google Form القديم يمكن تركه كما هو أو تجاهله، ولا نعتمد عليه في الحفظ.

لماذا لا يكفي رابط الشيت وحده؟
لأن GitHub Pages صفحة عامة ولا تملك صلاحية الكتابة داخل Google Sheet مباشرة.
لازم وسيط صغير من Google اسمه Apps Script حتى يستقبل الطلب من البرنامج ويضيف صفاً في الشيت.

الشيت المثبت داخل الكود هو:
1wrO7Wck-4_D5-zAvOR_O7hSDKUhyT3xOu9pT15_TlZQ

الخطوات المطلوبة مرة واحدة فقط:
1. افتح الشيت الذي أرسلته.
2. من القائمة اختر: Extensions > Apps Script.
3. احذف أي كود قديم من Code.gs.
4. الصق محتوى الملف AppsScript_Code.gs الموجود مع هذه الحزمة.
5. اضغط Save.
6. اختر Deploy > New deployment.
7. اضغط أيقونة الترس واختر Web app.
8. Execute as: Me.
9. Who has access: Anyone.
10. اضغط Deploy.
11. انسخ الرابط الذي ينتهي بـ /exec.
12. افتح config.js وضع الرابط مكان الفراغ:
    window.STUDENT_REQUEST_WEB_APP_URL = 'ضع رابط /exec هنا';
13. ارفع ملفات الموقع على GitHub Pages من جديد.

بعدها عند إرسال أي استمارة من برنامجك ستظهر الردود في ورقة Requests داخل نفس الشيت.
وإذا استُخدم رفع استمارة مكتملة ستظهر في ورقة Uploads.

ملاحظة:
إذا ظهر لك طلب Authorization في Apps Script، وافق عليه لأنه سيكتب داخل الشيت بحسابك أنت.


تم تثبيت رابط Web App داخل config.js:
https://script.google.com/macros/s/AKfycbzU9ejStmL-CZpmX6JOatraIRjJjeC2kv0o4N6lPcKA2SSWA_A3mNE5t1NQH0AUsA78/exec
