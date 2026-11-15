# HORUS — نشر الباك إند (Supabase)

> ملاحظة صريحة: هذه الملفات لم تُشغَّل ولم تُختبر في بيئة Claude (لا يوجد اتصال بالشبكة فيها).
> جرّبها أولاً على مشروع Supabase تجريبي قبل الإنتاج.

## 1) إنشاء المشروع
1. أنشئ مشروعاً على supabase.com.
2. من SQL Editor شغّل ملف `001_horus_schema.sql` كاملاً (جداول + RLS + سجل تدقيق + تخزين + بيانات THE EYE).
3. من Authentication أنشئ حسابك، ثم شغّل في SQL Editor:
   `update public.profiles set role='super_admin', active=true where id=(select id from auth.users where email='بريدك');`
   أي مستخدم جديد يُنشأ غير مفعّل افتراضياً، ولا يرى شيئاً حتى يفعّله Super Admin.

## 2) دالة استقبال الطلبات
```
npm i -g supabase
supabase login && supabase link --project-ref YOUR_REF
supabase secrets set ALLOWED_ORIGIN=https://your-domain.com IP_SALT=اكتب-نصاً-عشوائياً-طويلاً
supabase functions deploy submit-lead
```
الدالة تتحقق من البيانات، وتمنع السبام (حقل مخفي + حد 5 طلبات/ساعة لكل IP)، وتمنع تكرار نفس الرقم خلال 24 ساعة،
ولا ترجع "نجاح" إلا بعد نجاح الحفظ فعلاً.

## 3) ربط نموذج الموقع
```js
const r = await fetch(`${SUPABASE_URL}/functions/v1/submit-lead`, {
  method: "POST",
  headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  body: JSON.stringify({ name, phone, message, project: "the-eye", unit_ref, source: location.hash || "home", web: "" })
});
const out = await r.json();   // out.ok === true فقط عند نجاح الحفظ
```
استخدم **anon key فقط** في الواجهة. لا تضع `service_role` في أي كود يصل للمتصفح.

## 4) الاستضافة
الصفحة المنشورة على claude.ai تمنع الاتصال بأي موقع خارجي، لذلك الربط مع Supabase يتطلب استضافة الواجهة على
Vercel أو Netlify أو Cloudflare Pages.

## 5) ما الذي لم يُبنَ بعد
- واجهة لوحة الإدارة على Supabase (الحالية تعمل داخل claude.ai فقط).
- ربط الواجهة العامة بجداول `projects/units/zones` بدل قاعدة بيانات claude.ai.
- صفحات: من نحن، تجربة القرية، الخصوصية (نص قانوني يراجعه مختص).
