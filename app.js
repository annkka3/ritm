import { firebaseConfig } from './firebase-config.js';

const APP_VERSION = '1.0.0';
const LOCAL_KEY = 'ritm-local-v1', MODE_KEY = 'ritm-mode', MIGRATED_KEY = 'ritm-local-migrated', PREFS_KEY = 'ritm-prefs';
const DAYS_SHORT = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const DAYS_FULL = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
const DAYS_LOWER = ['пн','вт','ср','чт','пт','сб','вс'];
const MONTHS_NOM = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_PREP = ['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','ноябре','декабре'];
const MONTHS_SHORT = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
const COLORS = ['violet','sky','mint','coral','sun','rose','lime','slate'];
const PL = {days:['день','дня','дней'],times:['раз','раза','раз'],habits:['привычка','привычки','привычек'],things:['дело','дела','дел'],marks:['отметка','отметки','отметок'],records:['запись','записи','записей']};
const ICONS = {
  book:'<path d="M12 6.5C10 5 7 4.6 4 5v13c3-.4 6 0 8 1.5 2-1.5 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5z"/><path d="M12 6.5v13"/>',
  chat:'<path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-5 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 9.5h8M8 12.5h5"/>',
  lotus:'<path d="M12 5.5c2 2.3 2.4 5.4 0 8.8-2.4-3.4-2-6.5 0-8.8z"/><path d="M12 14.3C9.6 14 6.4 12.6 4.8 9.6c3 .1 5.7 1.4 7.2 4.7zM12 14.3c2.4-.3 5.6-1.7 7.2-4.7-3 .1-5.7 1.4-7.2 4.7z"/><path d="M6 18h12"/>',
  dumbbell:'<path d="M7 7v10M17 7v10M4 9.5v5M20 9.5v5M7 12h10"/>',
  drop:'<path d="M12 3.8c3 3.6 5.8 6.9 5.8 10a5.8 5.8 0 0 1-11.6 0c0-3.1 2.8-6.4 5.8-10z"/>',
  moon:'<path d="M19 14.8A7.5 7.5 0 0 1 9.2 5 7.5 7.5 0 1 0 19 14.8z"/>',
  mountain:'<path d="M3 19l6.5-11 4 6.5 2.5-3.5L21 19z"/>',
  heart:'<path d="M12 19.5s-7.5-4.4-7.5-10A4.1 4.1 0 0 1 12 7.2a4.1 4.1 0 0 1 7.5 2.3c0 5.6-7.5 10-7.5 10z"/>',
  pen:'<path d="M5 19l1-4.2L15.6 5.2a2.1 2.1 0 0 1 3 3L9.2 18z"/><path d="M13.8 7l3.2 3.2"/>',
  music:'<path d="M9 17.5V6.5l10-2v11"/><circle cx="6.8" cy="17.5" r="2.3"/><circle cx="16.8" cy="15.5" r="2.3"/>',
  sun:'<circle cx="12" cy="12" r="3.8"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6"/>',
  leaf:'<path d="M5.5 18.5C5 11 9.5 5.8 19 5c.3 9.2-5 14-13.5 13.5z"/><path d="M5.5 18.5 13 11"/>',
  apple:'<path d="M12 8c-1.3-1.6-4.2-1.8-5.6 0-2 2.6-1 8.3 1.4 10.8 1.3 1.4 2.6 1.3 4.2.6 1.6.7 2.9.8 4.2-.6 2.4-2.5 3.4-8.2 1.4-10.8-1.4-1.8-4.3-1.6-5.6 0z"/><path d="M12 8c0-1.8.8-3.2 2.5-3.8"/>',
  spark:'<path d="M12 4l1.9 5.1L19 11l-5.1 1.9L12 18l-1.9-5.1L5 11l5.1-1.9z"/>',
  pill:'<rect x="3.2" y="8.6" width="17.6" height="6.8" rx="3.4" transform="rotate(-40 12 12)"/><path d="M9.8 9.4l4.4 5.2"/>',
  palette:'<path d="M12 4a8 8 0 1 0 0 16c1.3 0 1.9-.9 1.6-1.9-.4-1.1.3-2.3 1.6-2.3H17a3 3 0 0 0 3-3C20 7.6 16.4 4 12 4z"/><circle cx="8.2" cy="11" r="1"/><circle cx="11" cy="7.8" r="1"/><circle cx="15" cy="8.4" r="1"/>',
  home:'<path d="M4 11l8-6.5 8 6.5"/><path d="M6.2 9.5V19h11.6V9.5"/>',
  star:'<path d="M12 4.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.6l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/>'
};
const ICON_KEYS = Object.keys(ICONS);
const GUESS = [[/чит|книг|страниц/i,'book'],[/франц|англ|язык|испан|немец|итал|китай|слов/i,'chat'],[/йог|медит|растяж|дыхан/i,'lotus'],
  [/трен|спорт|зал|пресс|присед|отжим|фитнес|пилатес/i,'dumbbell'],[/вод[аыу]|стакан/i,'drop'],[/сон|спать|лечь|отбой/i,'moon'],
  [/прогул|шаг|ходьб|поход|пробеж|бег\b|бегать/i,'mountain'],[/пис[аь]|дневник|журнал/i,'pen'],[/музык|гитар|пиан|фортеп|вокал|пени/i,'music'],
  [/витамин|таблет|лекарств/i,'pill'],[/рис|дизайн|скетч|рисун/i,'palette'],[/убор|дом|порядок/i,'home'],[/еда|овощ|фрукт|сахар|завтрак|питан/i,'apple'],
  [/благодар|аффирм|радост/i,'heart'],[/утр|подъ[её]м|солн/i,'sun']];
const QUICK = [
  {name:'Чтение',icon:'book',color:'violet'},{name:'Французский',icon:'chat',color:'sky'},{name:'Йога',icon:'lotus',color:'mint'},
  {name:'Тренировка',icon:'dumbbell',color:'coral'},{name:'Вода',icon:'drop',color:'sky',goal:8},{name:'Прогулка',icon:'mountain',color:'lime'},
  {name:'Сон до 23:00',icon:'moon',color:'slate'}];
const SVG = (inner, sw) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const TICK = SVG('<path d="M6 12.5l4 4 8-9"/>', 2.6);
const FLAME = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5c.6 3.4-2.8 5-2.8 8.4a2.8 2.8 0 0 0 5.6 0c0-.9-.3-1.7-.8-2.3 2.3 1.2 4.2 3.6 4.2 6.4a6.2 6.2 0 0 1-12.4 0c0-5.2 5.1-7.4 6.2-12.5z"/></svg>';
const PLUS = SVG('<path d="M12 5v14M5 12h14"/>', 2);

const $ = s => document.querySelector(s);
/* every user-entered string passes through esc() before it reaches innerHTML */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function plural(n, f){const a=Math.abs(n)%100,b=a%10;if(a>10&&a<20)return f[2];if(b>1&&b<5)return f[1];if(b===1)return f[0];return f[2]}
const cnt = (n, k) => `${n} ${plural(n, PL[k])}`;
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
const lsDel = k => { try { localStorage.removeItem(k); } catch (e) {} };

/* dates, local time, weeks start on Monday */
const pad = n => String(n).padStart(2, '0');
const toStr = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today = () => toStr(new Date());
function parse(s){const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)}
function addDays(s, n){const d=parse(s);d.setDate(d.getDate()+n);return toStr(d)}
const wd = s => (parse(s).getDay()+6)%7;
const weekStart = s => addDays(s, -wd(s));
const daysBetween = (a, b) => Math.round((parse(b)-parse(a))/86400000);
const isD = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
function fmtDay(s){const d=parse(s);return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`}
function fmtShort(s){const d=parse(s);return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`}
function fmtRange(a, b){const A=parse(a),B=parse(b);return A.getMonth()===B.getMonth()?`${A.getDate()}–${B.getDate()} ${MONTHS_GEN[B.getMonth()]}`:`${fmtShort(a)} – ${fmtShort(b)}`}
const newId = () => 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- state ---------- */
let items = [], marks = {}, loaded = false, store = null, user = null;
let fb = null, fbAuth = null, fbDb = null;
let syncState = {pendingI:false, pendingL:false, cacheI:true, cacheL:true, error:null};
let selDay = today(), selWeek = weekStart(selDay), calMonth = selDay.slice(0, 7);
let view = 'day', justKey = null, lastToday = today();
try { const p = JSON.parse(lsGet(PREFS_KEY) || '{}'); if (['day','cal','habits'].includes(p.view)) view = p.view; } catch (e) {}
const savePrefs = () => lsSet(PREFS_KEY, JSON.stringify({view}));

function norm(o){
  const kind = o.kind === 'task' ? 'task' : 'habit';
  const x = {id:String(o.id), kind, name:String(o.name||'').trim().slice(0,80)||'Без названия',
    icon:(o.icon==='letter'||ICONS[o.icon])?o.icon:'letter', color:COLORS.includes(o.color)?o.color:'violet',
    order:Number(o.order)||0, createdAt:Number(o.createdAt)||0};
  if (kind === 'habit'){
    let days = Array.isArray(o.days) ? [...new Set(o.days.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 6))].sort((a,b)=>a-b) : [];
    if (!days.length) days = [0,1,2,3,4,5,6];
    x.days = days; x.goal = Math.min(50, Math.max(1, Math.round(Number(o.goal)||1)));
    x.start = isD(o.start) ? o.start : today(); x.end = isD(o.end) ? o.end : null;
  } else {
    x.date = isD(o.date) ? o.date : null; x.week = isD(o.week) ? o.week : null; x.doneAt = isD(o.doneAt) ? o.doneAt : null;
    if (!x.date && !x.week) x.date = today();
  }
  return x;
}
function bodyOf(x){const b=Object.assign({},x);delete b.id;Object.keys(b).forEach(k=>{if(b[k]===undefined)b[k]=null});return b}
const byOrder = (a, b) => (a.order-b.order) || (a.createdAt-b.createdAt);
function cleanMarks(m){
  const out = {};
  if (!m || typeof m !== 'object') return out;
  Object.keys(m).forEach(D => { if (!isD(D) || !m[D] || typeof m[D] !== 'object') return;
    const v = {}; Object.keys(m[D]).forEach(id => { const n = Number(m[D][id]); if (n > 0) v[id] = Math.min(50, Math.round(n)); });
    if (Object.keys(v).length) out[D] = v; });
  return out;
}
/* Firestore keeps one document per month: log/2026-09 = {d: {"30": {itemId: count}}} */
function marksFromLog(docs){
  const m = {};
  docs.forEach(d => {
    if (!/^\d{4}-\d{2}$/.test(d.id)) return;
    const body = d.data() || {}, days = body.d && typeof body.d === 'object' ? body.d : {};
    Object.keys(days).forEach(dd => { const v = days[dd]; if (!v || typeof v !== 'object') return;
      const D = d.id + '-' + dd, clean = {}; Object.keys(v).forEach(k => { const n = Number(v[k]); if (n > 0) clean[k] = n; });
      m[D] = Object.assign({}, m[D], clean); });
  });
  return m;
}

/* ---------- stores: same interface for the account (Firestore) and for this-device-only mode ---------- */
function readLocal(){
  try { const c = JSON.parse(lsGet(LOCAL_KEY) || 'null'); if (c && Array.isArray(c.items)) return {items:c.items.map(norm), marks:cleanMarks(c.marks)}; } catch (e) {}
  return null;
}
function makeLocalStore(){
  const save = () => { if (!lsSet(LOCAL_KEY, JSON.stringify({items, marks}))) toast('Не получилось сохранить: хранилище браузера недоступно'); };
  return {
    kind:'local',
    start(){ const c = readLocal(); items = c ? c.items : []; marks = c ? c.marks : {}; loaded = true; updateSync(); render(); },
    stop(){},
    saveItem: save, removeItem: save, setMark: save, importAll: save
  };
}
function makeCloudStore(uid){
  const {collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch} = fb;
  const ref = (c, id) => doc(fbDb, 'users', uid, c, id);
  let unsubs = [], srvItems = null, srvMarks = null, firstServer = true, grace = false, graceTimer = null;
  const fail = err => { syncState.error = (err && err.code) || 'unknown'; loaded = true; updateSync(); render();
    if (syncState.error === 'permission-denied') toast('Нет доступа к базе: проверь правила Firestore'); };
  const wfail = err => toast(err && err.code === 'permission-denied' ? 'Не сохранилось: нет доступа к базе' : 'Не сохранилось: ' + ((err && err.code) || 'ошибка'));
  const apply = () => {
    if (srvItems) items = srvItems.slice();
    if (srvMarks) marks = Object.assign({}, srvMarks);
    // a new device first answers from an empty local cache; wait briefly for the server so the page doesn't flash "empty"
    const emptyGuess = syncState.cacheI && srvItems && !srvItems.length && navigator.onLine !== false && !grace;
    loaded = !!(srvItems && srvMarks) && !emptyGuess;
    updateSync(); render();
  };
  return {
    kind:'cloud',
    start(){
      syncState = {pendingI:false, pendingL:false, cacheI:true, cacheL:true, error:null};
      graceTimer = setTimeout(() => { grace = true; apply(); }, 4000);
      unsubs.push(onSnapshot(collection(fbDb, 'users', uid, 'items'), {includeMetadataChanges:true}, snap => {
        srvItems = snap.docs.map(d => norm(Object.assign({}, d.data(), {id:d.id})));
        syncState.pendingI = snap.metadata.hasPendingWrites; syncState.cacheI = snap.metadata.fromCache; syncState.error = null;
        if (firstServer && !snap.metadata.fromCache){ firstServer = false; maybeMigrate(uid, srvItems.length); }
        apply();
      }, fail));
      unsubs.push(onSnapshot(collection(fbDb, 'users', uid, 'log'), {includeMetadataChanges:true}, snap => {
        srvMarks = marksFromLog(snap.docs);
        syncState.pendingL = snap.metadata.hasPendingWrites; syncState.cacheL = snap.metadata.fromCache;
        apply();
      }, fail));
    },
    stop(){ unsubs.forEach(u => u()); unsubs = []; clearTimeout(graceTimer); },
    // writes are not awaited: offline they wait in Firestore's local queue and go out when the connection is back
    saveItem(x){ setDoc(ref('items', x.id), bodyOf(x)).catch(wfail); },
    removeItem(id){ deleteDoc(ref('items', id)).catch(wfail); },
    setMark(D, id, n){ setDoc(ref('log', D.slice(0, 7)), {d:{[D.slice(8)]:{[id]:n}}}, {merge:true}).catch(wfail); },
    importAll(its, mks){
      const ops = [];
      its.forEach(x => ops.push(b => b.set(ref('items', x.id), bodyOf(x))));
      const byMonth = {};
      Object.keys(mks).forEach(D => { (byMonth[D.slice(0, 7)] = byMonth[D.slice(0, 7)] || {})[D.slice(8)] = mks[D]; });
      Object.keys(byMonth).forEach(ym => ops.push(b => b.set(ref('log', ym), {d:byMonth[ym]}, {merge:true})));
      for (let i = 0; i < ops.length; i += 400){ const b = writeBatch(fbDb); ops.slice(i, i + 400).forEach(f => f(b)); b.commit().catch(wfail); }
    }
  };
}
function maybeMigrate(uid, cloudCount){
  if (cloudCount) return;
  const c = readLocal(); if (!c || !c.items.length || lsGet(MIGRATED_KEY) === uid) return;
  store.importAll(c.items, c.marks);
  lsSet(MIGRATED_KEY, uid);
  toast('Данные с этого устройства перенесены в аккаунт');
}
function switchStore(s){
  if (store) store.stop();
  store = s; items = []; marks = {}; loaded = false;
  render(); s.start();
}

function setSync(state, text){const el=$('#sync');el.className='sync '+state;el.querySelector('.txt').textContent=text}
function updateSync(){
  if (!store){ setSync('pending', 'запускаю…'); return; }
  if (store.kind === 'local'){ setSync('off', 'только на этом устройстве'); return; }
  if (syncState.error){ setSync('err', syncState.error === 'permission-denied' ? 'нет доступа к базе' : 'ошибка синхронизации'); return; }
  const pending = syncState.pendingI || syncState.pendingL;
  if (navigator.onLine === false){ setSync('pending', pending ? 'нет интернета · изменения ждут отправки' : 'нет интернета · отметки сохранятся'); return; }
  if (pending){ setSync('pending', 'отправляю изменения…'); return; }
  if (syncState.cacheI || syncState.cacheL){ setSync('pending', 'подключаюсь…'); return; }
  setSync('on', 'синхронизировано');
}
window.addEventListener('online', updateSync);
window.addEventListener('offline', updateSync);
document.addEventListener('visibilitychange', () => { if (!document.hidden) checkMidnight(); });

function persist(n){
  const i = items.findIndex(t => t.id === n.id); if (i >= 0) items[i] = n; else items.push(n);
  if (store) store.saveItem(n);
  render();
}
function removeItem(id){ items = items.filter(t => t.id !== id); if (store) store.removeItem(id); render(); }
function setMark(D, id, n){
  marks[D] = Object.assign({}, marks[D], {[id]:n});
  if (store) store.setMark(D, id, n);
  render();
}

/* ---------- derived ---------- */
const isHabit = x => x.kind === 'habit';
const activeOn = (h, D) => h.start <= D && (!h.end || D <= h.end) && h.days.includes(wd(D));
const dueOn = (x, D) => isHabit(x) ? activeOn(x, D) : x.date === D;
const getN = (D, id) => (marks[D] && Number(marks[D][id])) || 0;
const isDone = (x, D) => isHabit(x) ? getN(D, x.id) >= x.goal : !!x.doneAt;
const progressOf = (x, D) => isHabit(x) ? Math.min(1, getN(D, x.id)/x.goal) : (x.doneAt ? 1 : 0);
let memo = new Map();
function dayInfo(D){
  if (memo.has(D)) return memo.get(D);
  const list = items.filter(x => dueOn(x, D));
  const done = list.filter(x => isDone(x, D)).length;
  const units = list.reduce((s, x) => s + progressOf(x, D), 0);
  const r = {list, total:list.length, done, p:list.length ? units/list.length : 0, full:list.length > 0 && done === list.length};
  memo.set(D, r); return r;
}
function earliest(){
  const t = today(); let e = t;
  items.forEach(x => { const s = isHabit(x) ? x.start : (x.date || x.week); if (s && s < e) e = s; });
  const floor = addDays(t, -1100); return e < floor ? floor : e;
}
function dayStreak(){
  const t = today(), first = earliest(); let s = dayInfo(t).full ? 1 : 0, D = addDays(t, -1);
  while (D >= first){ const i = dayInfo(D); if (i.total){ if (i.full) s++; else break; } D = addDays(D, -1); }
  return s;
}
function bestStreak(){
  const t = today(); let D = earliest(), cur = 0, best = 0;
  while (D <= t){ const i = dayInfo(D); if (i.total){ if (i.full){ cur++; if (cur > best) best = cur; } else if (D < t) cur = 0; } D = addDays(D, 1); }
  return best;
}
function habitStreak(h){
  const t = today(); let s = (activeOn(h, t) && isDone(h, t)) ? 1 : 0, D = addDays(t, -1), guard = 0;
  while (D >= h.start && guard++ < 1100){ if (activeOn(h, D)){ if (isDone(h, D)) s++; else break; } D = addDays(D, -1); }
  return s;
}
function habitBest(h){
  const t = today(); let D = h.start < addDays(t, -1100) ? addDays(t, -1100) : h.start, cur = 0, best = 0;
  while (D <= t && (!h.end || D <= h.end)){ if (activeOn(h, D)){ if (isDone(h, D)){ cur++; if (cur > best) best = cur; } else if (D < t) cur = 0; } D = addDays(D, 1); }
  return best;
}
function habitRate(h, n){
  const t = today(); let sched = 0, done = 0;
  for (let i = 0; i < n; i++){ const D = addDays(t, -i); if (D < h.start) break;
    if (activeOn(h, D)){ if (D === t && !isDone(h, D)) continue; sched++; if (isDone(h, D)) done++; } }
  return sched ? Math.round(done/sched*100) : null;
}
function schedText(x){
  const d = x.days.join(',');
  let s = d === '0,1,2,3,4,5,6' ? 'каждый день' : d === '0,1,2,3,4' ? 'по будням' : d === '5,6' ? 'по выходным' : x.days.map(i => DAYS_LOWER[i]).join(', ');
  if (x.goal > 1) s += ` · ${x.goal} ${plural(x.goal, PL.times)} в день`;
  return s;
}
function periodText(x){
  const t = today();
  if (x.start > t) return `начнётся ${fmtDay(x.start)}` + (x.end ? `, до ${fmtDay(x.end)}` : '');
  if (!x.end) return 'без срока';
  if (x.end < t) return `завершена ${fmtDay(x.end)}`;
  const left = daysBetween(t, x.end) + 1;
  return `до ${fmtDay(x.end)} · ${left === 1 ? 'последний день' : 'осталось ' + cnt(left, 'days')}`;
}
function dayTitle(D){
  const diff = daysBetween(today(), D);
  if (diff === 0) return 'Сегодня'; if (diff === -1) return 'Вчера'; if (diff === 1) return 'Завтра';
  return DAYS_FULL[wd(D)];
}
const iconHTML = x => x.icon === 'letter' || !ICONS[x.icon] ? `<span class="letter">${esc((x.name||'?').trim().charAt(0).toUpperCase()||'?')}</span>` : SVG(ICONS[x.icon]);

/* ---------- render ---------- */
function render(){
  memo = new Map(); items.sort(byOrder);
  $('#app').dataset.view = view;
  [['#tabDay','day'],['#tabHabits','habits'],['#nvDay','day'],['#nvCal','cal'],['#nvHabits','habits']].forEach(([s, v]) => {
    $(s).setAttribute('aria-selected', String(view === v || (s === '#tabDay' && view === 'cal'))); });
  renderDay(); renderCal(); renderHabits();
  justKey = null;
}
function renderDay(){
  const t = today(), D = selDay;
  $('#dayTitle').textContent = dayTitle(D);
  const w = DAYS_FULL[wd(D)].toLowerCase();
  $('#daySub').textContent = (Math.abs(daysBetween(t, D)) <= 1 ? `${w}, ` : '') + fmtDay(D) + (D.slice(0, 4) !== t.slice(0, 4) ? ' ' + D.slice(0, 4) : '');
  $('#todayBtn').hidden = D === t;
  let wk = '';
  for (let i = 0; i < 7; i++){
    const d = addDays(selWeek, i), inf = dayInfo(d), cls = ['wd'];
    if (d === D) cls.push('sel'); if (d === t) cls.push('today'); if (d > t) cls.push('future');
    if (!inf.total) cls.push('none'); if (inf.full && d <= t) cls.push('lit');
    const p = d > t ? 0 : Math.round(inf.p*100);
    wk += `<button class="${cls.join(' ')}" data-act="day" data-d="${d}" aria-pressed="${d === D}" aria-label="${DAYS_FULL[i]}, ${fmtDay(d)}: ${inf.done} из ${inf.total}"><span class="dn">${DAYS_SHORT[i]}</span><span class="rg" style="--p:${p}"><span class="num">${parse(d).getDate()}</span></span></button>`;
  }
  $('#week').innerHTML = wk;
  renderHero(); renderDayBody();
}
function ringSVG(list, D, lit){
  const R = 50, C = 2*Math.PI*R, n = list.length, SW = 11;
  const gap = n > 1 ? Math.min(SW + 6, C/n*0.5) : 0;
  let tr = '', pr = '';
  list.forEach((x, i) => {
    const seg = C/n - gap, start = i*C/n + gap/2 + (n > 1 ? SW/2 : 0), len = Math.max(0.01, seg - (n > 1 ? SW : 0));
    const col = lit ? 'currentColor' : `var(--h-${x.color})`;
    tr += `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${lit ? 'currentColor' : 'var(--line)'}" stroke-opacity="${lit ? .18 : 1}" stroke-width="${SW}" stroke-linecap="round" stroke-dasharray="${len.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-start).toFixed(2)}"/>`;
    const p = progressOf(x, D);
    if (p > 0) pr += `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${col}" stroke-opacity="${lit ? .85 : 1}" stroke-width="${SW}" stroke-linecap="round" stroke-dasharray="${(len*p).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-start).toFixed(2)}"/>`;
  });
  if (!n) tr = `<circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--line)" stroke-width="${SW}" stroke-dasharray="2 8" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${tr}${pr}</svg>`;
}
function quickChips(){
  const names = new Set(items.map(x => x.name.toLowerCase()));
  return QUICK.map((q, i) => names.has(q.name.toLowerCase()) ? '' : `<button type="button" class="qchip" style="--c:var(--h-${q.color})" data-act="quick" data-i="${i}"><span class="qi">${SVG(ICONS[q.icon], 2)}</span>${esc(q.name)}${q.goal ? ` <small>×${q.goal}</small>` : ''}</button>`).join('');
}
function renderHero(){
  const el = $('#hero'), t = today(), D = selDay, inf = dayInfo(D);
  if (!loaded){ el.innerHTML = `<div class="hero"><div class="ring">${ringSVG([], D, false)}</div><div class="msg"><h3>Загружаю привычки…</h3><p>Секунду, подтягиваю отметки.</p></div></div>`; return; }
  if (!items.length){
    el.innerHTML = `<div class="hero onboard"><div class="msg" style="display:grid;gap:6px"><h3>Собери свой ритм</h3><p>Добавь привычки, которые хочешь делать регулярно. Отмечай их каждый день, и когда сделаешь всё, день загорится в календаре.</p></div><div class="quick">${quickChips()}</div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" data-act="add" data-kind="habit">Своя привычка</button><button class="btn" data-act="settings">Загрузить копию</button></div></div>`;
    return;
  }
  let cls = 'hero', big = '', of = '', h = '', p = '';
  const names = list => { const a = list.map(x => x.name); return a.length > 3 ? a.slice(0, 3).join(', ') + ` и ещё ${a.length - 3}` : a.join(', '); };
  if (!inf.total){ h = 'Свободный день'; p = 'На этот день нет привычек и задач.'; big = '—'; }
  else if (D > t){ big = String(inf.total); of = plural(inf.total, PL.things); h = 'Запланировано'; p = names(inf.list); }
  else if (inf.full){
    cls += ' lit'; big = `${inf.done}/${inf.total}`; of = 'готово'; h = 'Цель дня достигнута';
    const st = D === t ? dayStreak() : 0;
    p = st > 1 ? `${cnt(st, 'days')} подряд без пропусков` : 'Все отметки на месте.';
  } else {
    const left = inf.list.filter(x => !isDone(x, D));
    big = String(inf.done); of = `из ${inf.total}`;
    if (D === t) h = inf.done === 0 ? 'Начнём день' : `Осталось ${left.length}`;
    else h = inf.done === 0 ? 'День без отметок' : 'Не всё отмечено';
    p = (D < t ? 'Можно отметить задним числом: ' : '') + names(left);
  }
  el.innerHTML = `<div class="${cls}" id="heroCard"><div class="ring" id="heroRing">${ringSVG(inf.list, D, inf.full && D <= t)}<div class="ctr"><div><div class="big">${esc(big)}</div>${of ? `<div class="of">${esc(of)}</div>` : ''}</div></div></div><div class="msg"><h3>${esc(h)}</h3><p>${esc(p)}</p></div></div>`;
}
function rowHTML(x, D, opts){
  opts = opts || {};
  const t = today(), hab = isHabit(x), n = hab ? getN(D, x.id) : 0, done = isDone(x, D), locked = hab && D > t;
  const cls = ['row']; if (!hab) cls.push('task'); if (done) cls.push('done'); if (locked) cls.push('locked');
  if (justKey === x.id + '|' + D) cls.push('just');
  const sub = [];
  if (hab){
    const st = habitStreak(x);
    if (st >= 2) sub.push(`<span class="streak">${FLAME}${cnt(st, 'days')} подряд</span>`);
    sub.push(`<span>${esc(schedText(x))}</span>`);
  } else {
    if (x.week) sub.push(`<span>план на неделю${x.doneAt ? ' · сделано ' + fmtShort(x.doneAt) : ''}</span>`);
    else if (x.date < t && !x.doneAt) sub.push(`<span>было на ${fmtDay(x.date)}</span>`);
    else sub.push('<span>разовая задача</span>');
  }
  let right = '';
  if (hab && x.goal > 1){
    right += `<span class="count">${n}<small>/${x.goal}</small></span>`;
    if (n > 0 && !locked) right += `<button type="button" class="mini" data-act="dec" data-id="${x.id}" data-d="${D}" aria-label="Убрать одну отметку">−</button>`;
  }
  if (opts.move) right += `<button type="button" class="btn sm" data-act="move" data-id="${x.id}">На сегодня</button>`;
  const p = hab && x.goal > 1 && !done ? Math.round(n/x.goal*100) : 0;
  return `<div class="${cls.join(' ')}" style="--c:var(--h-${x.color})" data-id="${x.id}" data-d="${D}">
    <button type="button" class="chk" data-act="tap" data-id="${x.id}" data-d="${D}" aria-pressed="${done}" ${locked ? 'disabled' : ''} aria-label="${esc(x.name)}: ${done ? 'сделано' : 'отметить'}">${p ? `<span class="prog" style="--p:${p}"></span>` : ''}<span class="ico">${iconHTML(x)}</span><span class="tick">${TICK}</span></button>
    <div class="t"><b>${esc(x.name)}</b><small>${sub.join('')}</small></div>${right}</div>`;
}
function renderDayBody(){
  const el = $('#dayBody'), t = today(), D = selDay;
  if (!loaded || !items.length){ el.innerHTML = ''; return; }
  const inf = dayInfo(D), habs = inf.list.filter(isHabit), tasks = inf.list.filter(x => !isHabit(x));
  let h = '';
  if (habs.length){
    const d = habs.filter(x => isDone(x, D)).length;
    h += `<div class="sec-h"><h4>Привычки<span>${d} из ${habs.length}</span></h4>${D > t ? '<span class="sec-note">отметить можно в этот день</span>' : ''}</div><div class="list">${habs.map(x => rowHTML(x, D)).join('')}</div>`;
  }
  h += `<div class="sec-h"><h4>Задачи на день${tasks.length ? `<span>${tasks.filter(x => x.doneAt).length} из ${tasks.length}</span>` : ''}</h4></div><div class="list">${tasks.map(x => rowHTML(x, D)).join('')}<button type="button" class="addline" data-act="add" data-kind="task" data-when="day">${PLUS}Задача на ${D === t ? 'сегодня' : fmtDay(D)}</button></div>`;
  if (D === t){
    const tail = items.filter(x => !isHabit(x) && x.date && x.date < t && !x.doneAt && daysBetween(x.date, t) <= 30);
    if (tail.length) h += `<div class="sec-h"><h4>Не успела раньше<span>${tail.length}</span></h4></div><div class="list">${tail.map(x => rowHTML(x, t, {move:true})).join('')}</div>`;
  }
  const ws = weekStart(D), plans = items.filter(x => !isHabit(x) && x.week === ws), pd = plans.filter(x => x.doneAt).length;
  h += `<div class="sec-h"><h4>Планы на неделю${plans.length ? `<span>${pd} из ${plans.length}</span>` : ''}</h4><span class="sec-note">${fmtRange(ws, addDays(ws, 6))}</span></div><div class="list">${plans.map(x => rowHTML(x, D <= t ? D : t)).join('')}<button type="button" class="addline" data-act="add" data-kind="task" data-when="week">${PLUS}План на эту неделю</button></div>`;
  el.innerHTML = h;
}
function renderCal(){
  const t = today(), [y, m] = calMonth.split('-').map(Number), off = wd(calMonth + '-01'), dim = new Date(y, m, 0).getDate();
  $('#calTitle').textContent = `${MONTHS_NOM[m-1]} ${y}`;
  let g = '';
  for (let i = 0; i < off; i++) g += '<span class="cd pad"></span>';
  let lit = 0, possible = 0;
  for (let d = 1; d <= dim; d++){
    const D = `${calMonth}-${pad(d)}`, inf = dayInfo(D), cls = ['cd'];
    if (D > t) cls.push('future'); else if (!inf.total) cls.push('none'); else if (inf.full) cls.push('lit');
    if (D <= t && inf.total){ possible++; if (inf.full) lit++; }
    if (D === t) cls.push('today'); if (D === selDay) cls.push('sel');
    const p = D <= t && !inf.full ? Math.round(inf.p*100) : 0;
    g += `<button class="${cls.join(' ')}" data-act="day" data-d="${D}" data-from="cal" aria-label="${fmtDay(D)}: ${inf.done} из ${inf.total}">${p ? `<span class="fill" style="--p:${p}"></span>` : ''}<span class="n">${d}</span>${cls.includes('lit') ? `<svg class="spark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS.spark}</svg>` : ''}</button>`;
  }
  $('#calGrid').innerHTML = g;
  if (!items.length){ $('#tiles').innerHTML = ''; $('#bars').innerHTML = ''; return; }
  const cur = dayStreak(), best = bestStreak();
  $('#tiles').innerHTML = `
    <div class="tile ${lit ? 'hot' : ''}"><div class="v">${lit}<small>/${possible}</small></div><div class="l">${lit === 1 ? 'день' : 'дней'} с целью в ${MONTHS_PREP[m-1]}</div></div>
    <div class="tile"><div class="v">${cur}</div><div class="l">${plural(cur, PL.days)} подряд сейчас</div></div>
    <div class="tile"><div class="v">${best}</div><div class="l">лучшая серия, ${plural(best, PL.days)}</div></div>`;
  let bars = '';
  items.filter(isHabit).forEach(x => {
    let sched = 0, done = 0;
    for (let d = 1; d <= dim; d++){ const D = `${calMonth}-${pad(d)}`; if (D > t) break; if (activeOn(x, D)){ sched++; if (isDone(x, D)) done++; } }
    if (!sched) return;
    bars += `<div class="hbar" style="--c:var(--h-${x.color})"><span class="nm"><i></i><span>${esc(x.name)}</span></span><span class="v">${done} из ${sched}</span><div class="track"><b style="width:${Math.round(done/sched*100)}%"></b></div></div>`;
  });
  $('#bars').innerHTML = bars ? `<h4>По привычкам за месяц</h4>${bars}` : '';
}
function stripHTML(x){
  const t = today(), ws = addDays(weekStart(t), -28); let h = '';
  for (let w = 0; w < 5; w++){
    h += '<div class="wk">';
    for (let i = 0; i < 7; i++){
      const D = addDays(ws, w*7 + i); let c = '';
      if (D > t) c = ''; else if (!activeOn(x, D)) c = 'off'; else if (isDone(x, D)) c = 'on'; else if (getN(D, x.id) > 0) c = 'part'; else c = D === t ? '' : 'miss';
      if (D === t) c += ' today';
      h += `<i class="${c}" title="${fmtDay(D)}"></i>`;
    }
    h += '</div>';
  }
  return `<div class="strip" aria-hidden="true">${h}</div><div class="strip-cap"><span>${fmtShort(ws)}</span><span>5 недель</span><span>сегодня</span></div>`;
}
function renderHabits(){
  const el = $('#viewHabits'), t = today();
  const habs = items.filter(isHabit), active = habs.filter(x => !x.end || x.end >= t), ended = habs.filter(x => x.end && x.end < t);
  const tasks = items.filter(x => !isHabit(x));
  const open = tasks.filter(x => !x.doneAt).sort((a, b) => String(a.date || a.week).localeCompare(String(b.date || b.week)));
  const doneT = tasks.filter(x => x.doneAt && daysBetween(x.doneAt, t) <= 14).sort((a, b) => b.doneAt.localeCompare(a.doneAt));
  let h = `<div class="hv-head"><div><h2>Привычки</h2><div class="sub">${active.length ? cnt(active.length, 'habits') + ' в ритме' : 'пока пусто'}</div></div><button class="btn primary sm" data-act="add" data-kind="habit">+ Привычка</button></div>`;
  if (!active.length && loaded) h += `<div class="hero onboard" style="margin-bottom:0"><p>Выбери из готовых или добавь свою.</p><div class="quick">${quickChips()}</div></div>`;
  h += '<div class="cards">' + active.map(x => {
    const st = habitStreak(x), best = habitBest(x), rate = habitRate(x, 30);
    return `<article class="hcard" style="--c:var(--h-${x.color})">
      <div class="hc-top"><span class="badge">${iconHTML(x)}</span><div class="t"><b>${esc(x.name)}</b><small>${esc(schedText(x))} · ${esc(periodText(x))}</small></div>
      <button class="btn icon ghost" data-act="edit" data-id="${x.id}" aria-label="Изменить «${esc(x.name)}»">${SVG(ICONS.pen)}</button></div>
      <div class="hc-stats"><span><b>${st}</b>${plural(st, PL.days)} подряд</span><span><b>${best}</b>лучшая серия</span><span><b>${rate == null ? '—' : rate + '%'}</b>за 30 дней</span></div>
      ${stripHTML(x)}</article>`;
  }).join('') + '</div>';
  h += `<div class="sec-h" style="margin-top:28px"><h4>Задачи${open.length ? `<span>${open.length}</span>` : ''}</h4><button class="link" data-act="add" data-kind="task">+ задача</button></div>`;
  if (!open.length && !doneT.length) h += '<div class="empty-note">Разовые дела на конкретный день или планы на неделю появятся здесь.</div>';
  h += '<div class="list">' + open.map(taskRow).join('') + doneT.map(taskRow).join('') + '</div>';
  if (ended.length){
    h += `<div class="sec-h" style="margin-top:28px"><h4>Завершённые привычки<span>${ended.length}</span></h4></div><div class="list">` + ended.map(x => `<div class="trow" style="--c:var(--h-${x.color})"><span class="dotc"></span><div class="t"><b>${esc(x.name)}</b><small>${fmtShort(x.start)} – ${fmtShort(x.end)} · лучшая серия ${cnt(habitBest(x), 'days')}</small></div><button class="btn sm" data-act="edit" data-id="${x.id}">Открыть</button></div>`).join('') + '</div>';
  }
  h += store && store.kind === 'cloud'
    ? '<p class="offline-note">Отметки сохраняются на устройстве сразу, даже без интернета, и уходят на другие устройства, как только связь появится.</p>'
    : '<p class="offline-note">Сейчас данные хранятся только в этом браузере. Чтобы видеть их на телефоне и компьютере, войди в аккаунт в настройках.</p>';
  el.innerHTML = h;
}
function taskRow(x){
  const t = today();
  const when = x.week ? `неделя ${fmtRange(x.week, addDays(x.week, 6))}` : (x.date === t ? 'сегодня' : x.date === addDays(t, 1) ? 'завтра' : fmtDay(x.date));
  const late = !x.doneAt && x.date && x.date < t;
  return `<div class="trow ${x.doneAt ? 'done' : ''}" style="--c:var(--h-${x.color})"><span class="dotc"></span><div class="t"><b>${esc(x.name)}</b><small class="${late ? 'late' : ''}">${x.doneAt ? 'сделано ' + fmtShort(x.doneAt) : (late ? 'просрочено · ' : '') + when}</small></div>
    <button class="btn icon ghost" data-act="toggleTask" data-id="${x.id}" aria-label="${x.doneAt ? 'Вернуть в работу' : 'Отметить сделанной'}">${x.doneAt ? SVG('<path d="M9 14l-4-4 4-4"/><path d="M5 10h9a5 5 0 0 1 0 10h-2"/>') : SVG('<path d="M6 12.5l4 4 8-9"/>', 2.2)}</button>
    <button class="btn icon ghost" data-act="edit" data-id="${x.id}" aria-label="Изменить">${SVG(ICONS.pen)}</button></div>`;
}

/* ---------- actions ---------- */
function tap(id, D){
  const x = items.find(i => i.id === id); if (!x) return;
  const t = today(), before = dayInfo(D).full;
  if (isHabit(x)){
    if (D > t){ toast('Этот день ещё не наступил'); return; }
    const n = getN(D, id);
    if (x.goal > 1 && n >= x.goal){ setMark(D, id, 0); toast(`«${x.name}» сброшено`, {label:'Вернуть', fn:() => setMark(D, id, n)}); return; }
    const v = x.goal === 1 ? (n ? 0 : 1) : n + 1;
    if (v > n) justKey = id + '|' + D;
    setMark(D, id, v);
  } else {
    if (!x.doneAt) justKey = id + '|' + D;
    persist(Object.assign({}, x, {doneAt:x.doneAt ? null : (D < t ? D : t)}));
    if (x.week && !x.doneAt){ const plans = items.filter(i => !isHabit(i) && i.week === x.week); if (plans.length > 1 && plans.every(i => i.doneAt)) toast('Все планы недели выполнены'); }
  }
  if (!before && dayInfo(D).full && D <= t) celebrate(D);
}
function celebrate(D){
  const st = D === today() ? dayStreak() : 0;
  toast(st > 1 ? `Цель дня достигнута · ${cnt(st, 'days')} подряд` : 'Цель дня достигнута');
  if (D !== selDay) return;
  const card = $('#heroCard'); if (card){ card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop'); }
  const ring = $('#heroRing');
  if (ring && (view !== 'cal' || window.innerWidth >= 960)) burst(ring);
}
function burst(el){
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = $('#fx'), ctx = c.getContext && c.getContext('2d'); if (!ctx) return;
  const dpr = window.devicePixelRatio || 1, W = innerWidth, H = innerHeight;
  c.width = W*dpr; c.height = H*dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const r = el.getBoundingClientRect(), x0 = r.left + r.width/2, y0 = r.top + r.height/2;
  const cs = getComputedStyle(document.documentElement);
  const cols = ['--glow-a','--glow-b','--glow-a','--glow-b'].concat(items.filter(isHabit).map(x => '--h-' + x.color)).map(v => cs.getPropertyValue(v).trim()).filter(Boolean);
  const P = [];
  for (let i = 0; i < 96; i++){ const a = Math.random()*Math.PI*2, s = 3 + Math.random()*7.5;
    P.push({x:x0, y:y0, vx:Math.cos(a)*s, vy:Math.sin(a)*s - 3.2, w:4 + Math.random()*6, h:3 + Math.random()*4, r:Math.random()*6, vr:(Math.random() - .5)*.4, c:cols[i % cols.length], round:Math.random() < .35}); }
  const t0 = performance.now();
  function frame(now){
    const k = (now - t0)/1700; ctx.clearRect(0, 0, W, H); if (k >= 1) return;
    ctx.globalAlpha = Math.max(0, 1 - k*k);
    P.forEach(p => { p.vy += .22; p.vx *= .985; p.vy *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.fillStyle = p.c; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      if (p.round){ ctx.beginPath(); ctx.arc(0, 0, p.w/2.2, 0, Math.PI*2); ctx.fill(); } else ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore(); });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function selectDay(D, fromCal){
  selDay = D; selWeek = weekStart(D);
  if (fromCal && window.innerWidth < 960){ view = 'day'; savePrefs(); window.scrollTo({top:0}); }
  render();
}
function quickAdd(i){
  const q = QUICK[i]; if (!q) return;
  const x = norm({id:newId(), kind:'habit', name:q.name, icon:q.icon, color:q.color, days:[0,1,2,3,4,5,6], goal:q.goal || 1, start:today(), end:null, order:Date.now(), createdAt:Date.now()});
  persist(x);
  toast(`«${q.name}» добавлена · каждый день`, {label:'Настроить', fn:() => openForm('habit', x.id)});
}

let toastTimer = null;
function toast(msg, action){
  const el = $('#toast');
  el.textContent = '';
  const span = document.createElement('span'); span.textContent = msg; el.appendChild(span);
  if (action){ const b = document.createElement('button'); b.type = 'button'; b.className = 'tbtn'; b.textContent = action.label;
    b.addEventListener('click', () => { hideToast(); action.fn(); }); el.appendChild(b); }
  el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, action ? 5500 : 2800);
}
function hideToast(){ $('#toast').classList.remove('show'); }

/* ---------- add / edit form ---------- */
let form = null, editing = null, iconTouched = false, delArmed = null;
function nextColor(){ const used = items.filter(x => !x.end || x.end >= today()).map(x => x.color); return COLORS.find(c => !used.includes(c)) || COLORS[items.length % COLORS.length]; }
function openForm(kind, id, when){
  const t = today();
  editing = id ? items.find(x => x.id === id) || null : null;
  const x = editing, baseDay = selDay >= t ? selDay : t;
  form = {kind:x ? x.kind : (kind || 'habit'), icon:x ? x.icon : 'letter', color:x ? x.color : nextColor(),
    days:new Set(x && isHabit(x) ? x.days : [0,1,2,3,4,5,6]), goal:x && isHabit(x) ? x.goal : 1,
    period:x && isHabit(x) && x.end ? 'date' : 'none', when:'today', week:null};
  $('#fNameInput').value = x ? x.name : '';
  $('#fStart').value = x && isHabit(x) ? x.start : baseDay;
  $('#fEnd').value = x && isHabit(x) && x.end ? x.end : addDays(baseDay, 29);
  $('#fDate').value = x && !isHabit(x) && x.date ? x.date : baseDay;
  const cw = weekStart(t);
  if (x && !isHabit(x)){
    if (x.week){ form.week = x.week; form.when = x.week === cw ? 'week' : x.week === addDays(cw, 7) ? 'nextweek' : 'custom'; }
    else form.when = x.date === t ? 'today' : x.date === addDays(t, 1) ? 'tomorrow' : 'date';
  } else if (!x){
    if (when === 'week'){ const ws = weekStart(selDay); form.week = ws; form.when = ws === cw ? 'week' : ws === addDays(cw, 7) ? 'nextweek' : 'custom'; }
    else form.when = baseDay === t ? 'today' : baseDay === addDays(t, 1) ? 'tomorrow' : 'date';
  }
  iconTouched = !!x;
  $('#fName').classList.remove('invalid');
  ['#nameErr','#daysErr','#endErr'].forEach(s => $(s).hidden = true);
  disarm(); renderForm();
  const dlg = $('#dlg'); if (!dlg.open) dlg.showModal();
  if (!x && window.innerWidth >= 720) setTimeout(() => $('#fNameInput').focus(), 30);
}
function renderForm(){
  const f = form, x = editing, hab = f.kind === 'habit', t = today();
  $('#dlgTitle').textContent = x ? (hab ? 'Привычка' : 'Задача') : (hab ? 'Новая привычка' : 'Новая задача');
  document.querySelectorAll('#kindSeg button').forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.kind === f.kind)); b.disabled = !!x && b.dataset.kind !== f.kind; });
  $('#kindHint').textContent = hab ? 'Повторяется по выбранным дням. Когда отметишь все привычки дня, день загорится в календаре.' : 'Разовое дело: на конкретный день или в планы недели.';
  $('#fNameInput').placeholder = hab ? 'Например, 20 страниц книги' : 'Например, записаться к стоматологу';
  $('#habitFields').hidden = !hab; $('#taskFields').hidden = hab;
  const letter = esc(($('#fNameInput').value.trim().charAt(0) || 'А').toUpperCase());
  $('#iconPick').innerHTML = [`<button type="button" class="ib ${f.icon === 'letter' ? 'on' : ''}" style="--c:var(--h-${f.color})" data-icon="letter" aria-label="Первая буква названия" aria-pressed="${f.icon === 'letter'}"><span class="letter" style="font-size:16px">${letter}</span></button>`]
    .concat(ICON_KEYS.map(k => `<button type="button" class="ib ${f.icon === k ? 'on' : ''}" style="--c:var(--h-${f.color})" data-icon="${k}" aria-label="Значок ${k}" aria-pressed="${f.icon === k}">${SVG(ICONS[k])}</button>`)).join('');
  $('#colorPick').innerHTML = COLORS.map(c => `<button type="button" class="sw ${f.color === c ? 'on' : ''}" style="--c:var(--h-${c})" data-color="${c}" aria-label="Цвет ${c}" aria-pressed="${f.color === c}"></button>`).join('');
  if (hab){
    $('#dayPick').innerHTML = DAYS_SHORT.map((d, i) => `<button type="button" class="dp" data-dp="${i}" aria-pressed="${f.days.has(i)}">${d}</button>`).join('');
    const key = [...f.days].sort((a, b) => a - b).join(',');
    $('#dayPresets').innerHTML = [['0,1,2,3,4,5,6','Каждый день'],['0,1,2,3,4','Будни'],['5,6','Выходные'],['0,2,4','Пн, ср, пт']].map(([v, l]) => `<button type="button" class="chip soft" data-preset="${v}" aria-pressed="${key === v}">${l}</button>`).join('');
    $('#goalOut').textContent = f.goal;
    $('#goalHint').textContent = f.goal === 1 ? 'одна отметка в день' : `например, ${f.goal} ${plural(f.goal, ['стакан','стакана','стаканов'])} воды`;
    $('#periodChips').innerHTML = [['none','Без срока'],['7','Неделя'],['21','21 день'],['30','30 дней'],['date','До даты']].map(([v, l]) => `<button type="button" class="chip" data-period="${v}" aria-pressed="${f.period === v}">${l}</button>`).join('');
    $('#endWrap').hidden = f.period !== 'date';
  } else {
    const opts = [['today','Сегодня'],['tomorrow','Завтра'],['date','Выбрать дату'],['week','На эту неделю'],['nextweek','На следующую неделю']];
    if (f.when === 'custom' && f.week) opts.push(['custom', `Неделя ${fmtRange(f.week, addDays(f.week, 6))}`]);
    $('#whenChips').innerHTML = opts.map(([v, l]) => `<button type="button" class="chip" data-when="${v}" aria-pressed="${f.when === v}">${esc(l)}</button>`).join('');
    $('#dateWrap').hidden = f.when !== 'date';
  }
  renderSummary();
  $('#delBtn').hidden = !x;
  $('#endBtn').hidden = !(x && hab && x.start <= t);
  if (x && hab) $('#endBtn').textContent = x.end && x.end < t ? 'Возобновить' : 'Завершить сегодня';
}
function habitEnd(){
  const s = $('#fStart').value || today(), p = form.period;
  if (p === 'none') return null; if (p === 'date') return $('#fEnd').value || null;
  return addDays(s, Number(p) - 1);
}
function taskWhen(){
  const t = today(), cw = weekStart(t), f = form;
  if (f.when === 'today') return {date:t, week:null};
  if (f.when === 'tomorrow') return {date:addDays(t, 1), week:null};
  if (f.when === 'date') return {date:$('#fDate').value || t, week:null};
  if (f.when === 'week') return {date:null, week:cw};
  if (f.when === 'nextweek') return {date:null, week:addDays(cw, 7)};
  return {date:null, week:f.week || cw};
}
function renderSummary(){
  const f = form, el = $('#sumLine');
  if (f.kind === 'habit'){
    const s = $('#fStart').value || today(), e = habitEnd();
    const sched = schedText({days:[...f.days].sort((a, b) => a - b), goal:f.goal});
    const per = e ? `${fmtDay(s)} — ${fmtDay(e)}, ${e >= s ? cnt(daysBetween(s, e) + 1, 'days') : 'проверь даты'}` : `с ${fmtDay(s)}, без срока`;
    el.innerHTML = f.days.size ? `<b>${esc(sched.charAt(0).toUpperCase() + sched.slice(1))}</b> · ${esc(per)}` : 'Выбери дни недели';
  } else {
    const w = taskWhen();
    el.innerHTML = w.week ? `Появится в <b>планах недели</b> ${esc(fmtRange(w.week, addDays(w.week, 6)))}` : `Появится в списке на <b>${esc(fmtDay(w.date))}</b>`;
  }
}
function saveForm(){
  const f = form, x = editing, name = $('#fNameInput').value.trim();
  let ok = true;
  $('#fName').classList.toggle('invalid', !name); $('#nameErr').hidden = !!name; if (!name) ok = false;
  const base = {id:x ? x.id : newId(), kind:f.kind, name, icon:f.icon, color:f.color, order:x ? x.order : Date.now(), createdAt:x ? x.createdAt : Date.now()};
  let n;
  if (f.kind === 'habit'){
    const days = [...f.days].sort((a, b) => a - b); $('#daysErr').hidden = !!days.length; if (!days.length) ok = false;
    const start = $('#fStart').value || today(), end = habitEnd();
    const bad = !!end && end < start; $('#endErr').hidden = !bad; if (bad) ok = false;
    n = Object.assign(base, {days, goal:f.goal, start, end});
  } else {
    n = Object.assign(base, taskWhen(), {doneAt:x && !isHabit(x) ? x.doneAt : null});
  }
  if (!ok){ if (!name) $('#fNameInput').focus(); return; }
  n = norm(n);
  persist(n);
  $('#dlg').close();
  if (!x) toast(n.kind === 'habit' ? `Привычка «${n.name}» добавлена` : `Задача «${n.name}» добавлена`);
}
function disarm(){ const b = $('#delBtn'); b.classList.remove('armed'); b.textContent = 'Удалить'; clearTimeout(delArmed); delArmed = null; }

/* ---------- settings, backup, install ---------- */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; });
const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function openSettings(){ renderSettings(); const d = $('#setDlg'); if (!d.open) d.showModal(); }
function renderSettings(){
  const cloud = store && store.kind === 'cloud';
  $('#accName').textContent = cloud ? (user && user.email) || 'Аккаунт' : 'Без аккаунта';
  $('#accSub').textContent = cloud ? 'Отметки синхронизируются между устройствами'
    : firebaseConfig ? 'Данные хранятся только в этом браузере' : 'Синхронизация не настроена: заполни firebase-config.js';
  $('#accBtn').textContent = cloud ? 'Выйти' : 'Войти';
  $('#accBtn').hidden = !firebaseConfig;
  let txt;
  if (standalone()) txt = 'Приложение уже установлено и открывается без браузера.';
  else if (installPrompt) txt = 'Установи, чтобы открывать «Ритм» с рабочего стола или экрана «Домой», как обычное приложение.';
  else if (isIOS) txt = 'В Safari нажми «Поделиться», затем «На экран „Домой“». Иконка появится рядом с другими приложениями.';
  else txt = 'В Chrome или Edge: меню браузера → «Установить приложение». В Safari на Mac: «Файл» → «Добавить в Dock».';
  $('#installText').textContent = txt;
  $('#installBtn').hidden = !installPrompt || standalone();
  $('#verLine').textContent = `Ритм ${APP_VERSION}`;
}
function exportBackup(){
  const data = {app:'ritm', format:1, exportedAt:new Date().toISOString(), items:items.map(x => Object.assign({}, x)), marks:cleanMarks(marks)};
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = `ritm-${today()}.json`; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Копия сохранена в загрузки');
}
async function importBackup(file){
  let data;
  try { data = JSON.parse(await file.text()); } catch (e) { toast('Это не файл копии «Ритма»'); return; }
  if (!data || !Array.isArray(data.items)){ toast('В файле нет привычек и задач'); return; }
  const its = data.items.filter(o => o && o.id && /^[A-Za-z0-9_-]{1,60}$/.test(String(o.id))).map(norm);
  const mks = cleanMarks(data.marks);
  its.forEach(n => { const i = items.findIndex(t => t.id === n.id); if (i >= 0) items[i] = n; else items.push(n); });
  Object.keys(mks).forEach(D => { marks[D] = Object.assign({}, marks[D], mks[D]); });
  if (store) store.importAll(its, mks);
  render();
  const nm = Object.values(mks).reduce((s, v) => s + Object.keys(v).length, 0);
  toast(`Загружено: ${cnt(its.length, 'records')}, ${cnt(nm, 'marks')}`);
}

/* ---------- sign-in ---------- */
let authMode = 'in';
function showAuth(){ $('#auth').hidden = false; renderAuth(); }
function hideAuth(){ $('#auth').hidden = true; }
function renderAuth(){
  document.querySelectorAll('#authSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === authMode)));
  $('#authSubmit').textContent = authMode === 'in' ? 'Войти' : 'Создать аккаунт';
  $('#authPass').setAttribute('autocomplete', authMode === 'in' ? 'current-password' : 'new-password');
  $('#authPassHint').hidden = authMode === 'in';
  $('#forgotBtn').hidden = authMode !== 'in';
}
function authError(msg){ const e = $('#authErr'); e.textContent = msg; e.hidden = !msg; if (msg) $('#authOk').hidden = true; }
function authOk(msg){ const e = $('#authOk'); e.textContent = msg; e.hidden = !msg; if (msg) $('#authErr').hidden = true; }
function authMessage(err){
  const code = (err && err.code) || '';
  const map = {
    'auth/invalid-credential':'Неверная почта или пароль', 'auth/wrong-password':'Неверная почта или пароль', 'auth/user-not-found':'Неверная почта или пароль',
    'auth/invalid-login-credentials':'Неверная почта или пароль',
    'auth/email-already-in-use':'Этот адрес уже зарегистрирован. Переключись на «Вход».',
    'auth/weak-password':'Пароль слишком короткий: нужно минимум 6 символов',
    'auth/invalid-email':'Проверь адрес почты',
    'auth/missing-password':'Впиши пароль',
    'auth/network-request-failed':'Нет интернета. Для первого входа нужна сеть, дальше приложение работает и без неё.',
    'auth/too-many-requests':'Слишком много попыток. Подожди пару минут.',
    'auth/operation-not-allowed':'Вход по почте не включён в Firebase: Authentication → Sign-in method → Email/Password.'
  };
  return map[code] || 'Не получилось: ' + (code || 'неизвестная ошибка');
}
async function submitAuth(){
  const email = $('#authEmail').value.trim(), pass = $('#authPass').value;
  if (!email){ authError('Впиши почту'); $('#authEmail').focus(); return; }
  if (!pass){ authError('Впиши пароль'); $('#authPass').focus(); return; }
  if (!fbAuth){ authError('Синхронизация ещё загружается, попробуй через секунду'); return; }
  const btn = $('#authSubmit'); btn.disabled = true; authError('');
  try {
    if (authMode === 'in') await fb.signInWithEmailAndPassword(fbAuth, email, pass);
    else await fb.createUserWithEmailAndPassword(fbAuth, email, pass);
    $('#authPass').value = '';
  } catch (e) { authError(authMessage(e)); }
  finally { btn.disabled = false; }
}
async function forgotPassword(){
  const email = $('#authEmail').value.trim();
  if (!email){ authError('Сначала впиши почту, на неё придёт ссылка'); $('#authEmail').focus(); return; }
  try { await fb.sendPasswordResetEmail(fbAuth, email); authOk(`Письмо со ссылкой для нового пароля отправлено на ${email}`); }
  catch (e) { authError(authMessage(e)); }
}
function useLocal(){ lsSet(MODE_KEY, 'local'); hideAuth(); switchStore(makeLocalStore()); }

/* ---------- events ---------- */
function bind(){
  document.addEventListener('click', e => {
    if (e.target.closest('dialog') || e.target.closest('#auth')) return;
    const a = e.target.closest('[data-act]');
    if (a){
      const act = a.dataset.act, id = a.dataset.id, D = a.dataset.d;
      if (act === 'tap') tap(id, D);
      else if (act === 'dec'){ const n = getN(D, id); if (n > 0) setMark(D, id, n - 1); }
      else if (act === 'day') selectDay(D, a.dataset.from === 'cal');
      else if (act === 'week'){ selWeek = addDays(selWeek, 7*Number(a.dataset.dir)); selDay = addDays(selWeek, wd(selDay)); render(); }
      else if (act === 'today'){ calMonth = today().slice(0, 7); selectDay(today()); }
      else if (act === 'cal'){ const [y, m] = calMonth.split('-').map(Number), d = new Date(y, m - 1 + Number(a.dataset.dir), 1); calMonth = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; renderCal(); }
      else if (act === 'view'){ view = a.dataset.v; savePrefs(); render(); window.scrollTo({top:0}); }
      else if (act === 'add') openForm(a.dataset.kind, null, a.dataset.when);
      else if (act === 'edit') openForm(null, id);
      else if (act === 'quick') quickAdd(Number(a.dataset.i));
      else if (act === 'settings') openSettings();
      else if (act === 'move'){ const x = items.find(i => i.id === id); if (x) persist(Object.assign({}, x, {date:today()})); }
      else if (act === 'toggleTask'){ const x = items.find(i => i.id === id); if (x) persist(Object.assign({}, x, {doneAt:x.doneAt ? null : today()})); }
      return;
    }
    const row = e.target.closest('.row[data-id]');
    if (row && !row.classList.contains('locked')) tap(row.dataset.id, row.dataset.d);
  });
  /* swipe the week strip */
  let sx = null, sy = null;
  $('#week').addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; }, {passive:true});
  $('#week').addEventListener('touchend', e => {
    if (sx == null) return; const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)*1.5){ selWeek = addDays(selWeek, dx < 0 ? 7 : -7); selDay = addDays(selWeek, wd(selDay)); render(); }
  }, {passive:true});

  const dlg = $('#dlg');
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', disarm);
  $('#form').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-close')){ dlg.close(); return; }
    if (b.dataset.kind && !b.disabled){ form.kind = b.dataset.kind; renderForm(); return; }
    if (b.dataset.icon){ form.icon = b.dataset.icon; iconTouched = true; renderForm(); return; }
    if (b.dataset.color){ form.color = b.dataset.color; renderForm(); return; }
    if (b.dataset.dp != null){ const i = Number(b.dataset.dp); if (form.days.has(i)) form.days.delete(i); else form.days.add(i); $('#daysErr').hidden = true; renderForm(); return; }
    if (b.dataset.preset){ form.days = new Set(b.dataset.preset.split(',').map(Number)); $('#daysErr').hidden = true; renderForm(); return; }
    if (b.dataset.goal){ form.goal = Math.min(50, Math.max(1, form.goal + Number(b.dataset.goal))); renderForm(); return; }
    if (b.dataset.period){ form.period = b.dataset.period; $('#endErr').hidden = true; renderForm(); return; }
    if (b.dataset.when){ form.when = b.dataset.when; renderForm(); return; }
  });
  $('#fNameInput').addEventListener('input', () => {
    $('#fName').classList.remove('invalid'); $('#nameErr').hidden = true;
    if (!iconTouched){ const v = $('#fNameInput').value, g = GUESS.find(([re]) => re.test(v)); form.icon = g ? g[1] : 'letter'; }
    renderForm();
  });
  ['#fStart','#fEnd','#fDate'].forEach(s => $(s).addEventListener('change', () => { $('#endErr').hidden = true; renderSummary(); }));
  $('#form').addEventListener('submit', e => { e.preventDefault(); saveForm(); });
  $('#delBtn').addEventListener('click', () => {
    const b = $('#delBtn'), x = editing; if (!x) return;
    if (!b.classList.contains('armed')){ b.classList.add('armed'); b.textContent = isHabit(x) ? 'Удалить вместе с историей?' : 'Точно удалить?'; delArmed = setTimeout(disarm, 4000); return; }
    disarm(); dlg.close();
    const copy = Object.assign({}, x); removeItem(x.id);
    toast(`«${x.name}» удалено`, {label:'Вернуть', fn:() => persist(copy)});
  });
  $('#endBtn').addEventListener('click', () => {
    const x = editing; if (!x) return; const t = today();
    if (x.end && x.end < t){ persist(Object.assign({}, x, {end:null})); toast(`«${x.name}» снова в ритме`); }
    else { persist(Object.assign({}, x, {end:t})); toast(`«${x.name}» завершена, история сохранена`); }
    dlg.close();
  });

  const setDlg = $('#setDlg');
  setDlg.addEventListener('click', e => { if (e.target === setDlg || e.target.closest('[data-close-set]')) setDlg.close(); });
  $('#accBtn').addEventListener('click', async () => {
    setDlg.close();
    if (store && store.kind === 'cloud'){ await fb.signOut(fbAuth); toast('Ты вышла из аккаунта'); }
    else { lsDel(MODE_KEY); if (store) store.stop(); store = null; showAuth(); }
  });
  $('#installBtn').addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    try { await installPrompt.userChoice; } catch (e) {}
    installPrompt = null; renderSettings();
  });
  $('#exportBtn').addEventListener('click', exportBackup);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (f){ setDlg.close(); importBackup(f); } e.target.value = ''; });

  document.querySelectorAll('#authSeg button').forEach(b => b.addEventListener('click', () => { authMode = b.dataset.mode; authError(''); renderAuth(); }));
  $('#authForm').addEventListener('submit', e => { e.preventDefault(); submitAuth(); });
  $('#forgotBtn').addEventListener('click', forgotPassword);
  $('#localBtn').addEventListener('click', useLocal);
}
function checkMidnight(){
  const t = today(); if (t === lastToday) return;
  if (selDay === lastToday){ selDay = t; selWeek = weekStart(t); calMonth = t.slice(0, 7); }
  lastToday = t; render();
}
setInterval(checkMidnight, 60000);

/* ---------- offline shell ---------- */
function registerSW(){
  if (!('serviceWorker' in navigator)) return;
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) toast('Вышло обновление приложения', {label:'Перезагрузить', fn:() => location.reload()});
  });
}

/* ---------- boot ---------- */
async function boot(){
  bind(); render(); registerSW();
  if (!firebaseConfig){ switchStore(makeLocalStore()); return; }
  try {
    fb = await import('./vendor/firebase.js');
    const app = fb.initializeApp(firebaseConfig);
    fbAuth = fb.getAuth(app); fbAuth.languageCode = 'ru';
    fbDb = fb.initializeFirestore(app, {localCache:fb.persistentLocalCache({tabManager:fb.persistentMultipleTabManager()})});
  } catch (e) {
    console.error(e); toast('Синхронизация недоступна, данные сохраняются на этом устройстве');
    switchStore(makeLocalStore()); return;
  }
  fb.onAuthStateChanged(fbAuth, u => {
    user = u;
    if (u){ lsDel(MODE_KEY); hideAuth(); switchStore(makeCloudStore(u.uid)); }
    else if (lsGet(MODE_KEY) === 'local'){ hideAuth(); if (!store || store.kind !== 'local') switchStore(makeLocalStore()); }
    else { if (store) store.stop(); store = null; items = []; marks = {}; loaded = false; render(); updateSync(); showAuth(); }
  });
}
boot();
