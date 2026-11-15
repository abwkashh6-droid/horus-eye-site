/* Supabase adapter: gives the page the same small db/user/assets API it was built on. */
(function(){
const H=window.HORUS||{},ok=H.url&&!/YOUR-/.test(H.url)&&window.supabase;
const sb=window.sb=ok?supabase.createClient(H.url,H.anon):null;
window.BLOB=(H.url||'')+'/storage/v1/object/public/media/';
if(!sb){window.claude={use:async()=>null};return}
const SPEC={
 zones:{t:'zones',pid:1,c:['plan','code','name_ar','name_en','desc_ar','desc_en','kind','x','y','r','verified']},
 units:{t:'units',pid:1,c:['ref','name_ar','name_en','unit_type','area_min','area_max','beds','baths','floor','price_min','price_max','status','verified','description_ar','description_en','image_path'],m:{area:'area_min',price:'price_min',type:'unit_type',desc_ar:'description_ar',desc_en:'description_en',img:'image_path'}},
 plans:{t:'payment_plans',pid:1,c:['down_pct','handover_pct','years','discount_pct','sort'],m:{down:'down_pct',handover:'handover_pct',disc:'discount_pct'}},
 media:{t:'media',pid:1,c:['storage_path','caption_ar','caption_en','sort'],m:{img:'storage_path',ord:'sort'}},
 leads:{t:'leads',c:['name','phone','message','source_page','status','follow_up_at','assigned_name','interest','notes'],m:{msg:'message',source:'source_page',follow:'follow_up_at',assigned:'assigned_name'}}};
const DEFADD={zones:{},units:{status:'available'},plans:{down_pct:10,handover_pct:0,years:7,discount_pct:0},media:{storage_path:'pending'},leads:{}};
const toDb=(s,o)=>{const r={};for(const[k,v]of Object.entries(o)){const c=(s.m&&s.m[k])||k;if(s.c.includes(c))r[c]=v===''?null:v}return r};
const fromDb=(s,row)=>{const o={id:row.id};for(const c of s.c)o[c]=row[c];if(s.m)for(const[k,c]of Object.entries(s.m))o[k]=row[c];if(s.t=='leads')o.ts=Date.parse(row.created_at);return o};
const cbs={},scb=[];
const pidP=sb.from('projects').select('id').eq('slug','the-eye').maybeSingle().then(r=>r.data&&r.data.id);
async function refresh(c){const s=SPEC[c];const{data,error}=await sb.from(s.t).select('*');if(error){console.error(c,error.message);return}
 const rows=data.map(r=>fromDb(s,r));(cbs[c]||[]).forEach(f=>f({docs:rows.map(r=>({id:r.id,data:()=>{const{id,...x}=r;return x}}))}))}
const getS=async()=>{const{data}=await sb.from('settings').select('value').eq('key','site').maybeSingle();return(data&&data.value)||{}};
const loadS=async()=>{const v=await getS();scb.forEach(f=>f({data:()=>v}))};
const upS=async o=>{const cur=await getS();const{error}=await sb.from('settings').upsert({key:'site',value:{...cur,...o},is_public:true});if(error)throw error;loadS()};
const must=(r,what)=>{if(r.error)throw r.error;if(!r.data||!r.data.length)throw Error('Not permitted or not found ('+what+')')};
const dbShim={
 collection:c=>({
  onSnapshot:f=>{(cbs[c]=cbs[c]||[]).push(f);refresh(c)},
  add:async o=>{if(c=='audit')return{path:'audit/-'};const s=SPEC[c];const row={...DEFADD[c],...toDb(s,o)};
   if(c=='units'&&!row.ref)row.ref='NEW-'+(Date.now()%1e7);if(s.pid)row.project_id=await pidP;
   const r=await sb.from(s.t).insert(row).select('id');must(r,'insert');refresh(c);return{path:c+'/'+r.data[0].id}}}),
 doc:p=>{const[c,id]=p.split('/');
  if(c=='content')return{onSnapshot:f=>{scb.push(f);loadS()},set:upS,update:upS,delete:async()=>{}};
  const s=SPEC[c];const up=async o=>{const r=await sb.from(s.t).update(toDb(s,o)).eq('id',id).select('id');must(r,'update');refresh(c)};
  return{set:up,update:up,delete:async()=>{const r=await sb.from(s.t).delete().eq('id',id).select('id');must(r,'delete');refresh(c)}}}};
let sess=null,staff=false;
const ready=(async()=>{sess=(await sb.auth.getSession()).data.session;
 if(sess){const p=await sb.from('profiles').select('active').eq('id',sess.user.id).maybeSingle();staff=!!(p.data&&p.data.active)}})();
const userShim={id:async()=>{await ready;return sess&&sess.user.id},canEdit:async()=>{await ready;return staff}};
const assetsShim={upload:async f=>{const ext=(f.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');const path=crypto.randomUUID()+'.'+ext;
 const{error}=await sb.storage.from('media').upload(path,f,{contentType:f.type});if(error)throw error;return{id:path}}};
window.claude={use:async n=>({db:dbShim,user:userShim,assets:assetsShim}[n]||null)};
})();
