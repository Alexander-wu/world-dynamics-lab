'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $('.menu-toggle');
const navigation = $('#main-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', t(open ? '关闭导航' : '打开导航'));
  navigation.classList.toggle('open', open);
});
$$('a', navigation).forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', t('打开导航'));
}));

function filterPapers(category) {
  let count = 0;
  $$('.paper').forEach(paper => {
    const visible = category === 'all' || paper.dataset.category === category;
    paper.hidden = !visible;
    if (visible) count += 1;
  });
  $$('[data-filter]').forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('.paper-count').textContent = currentLanguage === 'en' ? `${count} selected ${count === 1 ? 'publication' : 'publications'}` : `${count} 篇代表论文`;
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => filterPapers(button.dataset.filter)));
$$('[data-jump-filter]').forEach(link => link.addEventListener('click', () => filterPapers(link.dataset.jumpFilter)));

let toastTimer;
function toast(message) {
  if ($('#apply-dialog').open) { $('.dialog-status').textContent = message; return; }
  const element = $('.toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('show'), 3000);
}
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = value;
    area.style.cssText = 'position:fixed;left:0;top:0;opacity:0';
    (document.querySelector('dialog[open]') || document.body).appendChild(area);
    area.select();
    let success = false;
    try { success = document.execCommand('copy'); } catch { /* Visible fallback below. */ }
    area.remove();
    return success;
  }
}
$$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  toast(await copyText(button.dataset.copy) ? t('邮箱已复制') : t('请选中页面上的邮箱手动复制'));
}));

const dialog = $('#apply-dialog');
$('#open-apply').addEventListener('click', () => dialog.showModal());
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
function application() {
  const name = $('#applicant-name').value.trim() || t('[姓名]');
  const topic = $('#applicant-topic').selectedOptions[0].textContent;
  return {
    to: 'wu-h25@mails.tsinghua.edu.cn,yuangao24@mails.tsinghua.edu.cn',
    subject: `[Research Internship] ${name} - ${topic}`,
    body: currentLanguage === 'en' ? `Dear Hao Wu and Yuan Gao,\n\nMy name is ${name}. I would like to apply for a research internship at World Dynamics Lab, with an interest in ${topic}.\n\nBACKGROUND\nUniversity / major / year of study:\nRelevant skills and experience:\n\nPROJECTS AND RESEARCH INTERESTS\nLinks to projects / papers / code:\nMy contributions:\nQuestions or papers I would like to explore:\n\nAVAILABILITY\nExpected start date:\nTotal duration and hours per week:\nLocation and on-site / remote preference:\n\nMy CV is attached. I look forward to hearing from you. Thank you!\n\n${name}` : `Hao Wu、高远，你们好！\n\n我叫 ${name}，希望申请 World Dynamics Lab 的科研实习，对 ${topic} 方向感兴趣。\n\n【个人背景】\n学校 / 专业 / 年级：\n相关技能与经历：\n\n【项目与研究兴趣】\n项目 / 论文 / 代码链接：\n我在项目中完成的工作：\n我想探索的问题或感兴趣的论文：\n\n【时间安排】\n预计开始时间：\n可投入的总时长与每周时间：\n所在地与线下 / 远程偏好：\n\n简历已随邮件附上。期待进一步交流，谢谢！\n\n${name}`
  };
}
$('#apply-form').addEventListener('submit', event => {
  event.preventDefault();
  const draft = application();
  window.location.href = `mailto:${draft.to}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  toast(t('如未打开邮件客户端，可复制邮件模板'));
});
$('#copy-draft').addEventListener('click', async () => {
  const draft = application();
  const content = `${t("收件人：")}${draft.to}\n${t("主题：")}${draft.subject}\n\n${draft.body}`;
  if (await copyText(content)) toast(t('邮件模板已复制，请记得附上简历'));
  else {
    let fallback = $('#draft-fallback');
    if (!fallback) {
      fallback = document.createElement('textarea');
      fallback.id = 'draft-fallback';
      fallback.setAttribute('aria-label', t('申请邮件模板，可选择并复制'));
      fallback.style.cssText = 'width:100%;min-height:190px;margin-top:16px;padding:12px;font:16px var(--serif)';
      $('#apply-form').appendChild(fallback);
    }
    fallback.value = content;
    fallback.focus();
    fallback.select();
    toast(t('请在下方文本框中手动复制模板'));
  }
});

// Conceptual globe: illustrative dynamics, with accessible research controls.
(() => {
  const stage = $('.world-visual'), canvas = $('#world-canvas');
  const ctx = canvas.getContext('2d');
  const card = $('#globe-card'), buttons = $$('.globe-hotspot');
  const motionButton = $('#motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const directions = {
    world: { kicker:'01 / UNDERSTAND & GENERATE', title:'World Models & Embodied AI', description:'研究机器人视频生成、物理一致性与奖励对齐，让模型预测与动作相关的未来。', link:'#publications', filter:'world', x:.73, y:.27 },
    science: { kicker:'02 / SIMULATE & FORECAST', title:'Scientific Machine Learning', description:'面向气象、海洋与湍流，研究多尺度动力学、神经算子和稳定的长期预测。', link:'#publications', filter:'science', x:.22, y:.46 },
    agents: { kicker:'03 / REASON & INTERACT', title:'Multimodal Models & Agents', description:'结合视觉、语言与物理知识，探索科学推理、智能体，以及预测与决策的连接。', link:'#research', x:.70, y:.62 }
  };
  let active = null, pinned = false, dismissTimer, paused = reducedMotion.matches;
  let width=0,height=0,angle=.4,time=0,last=0,frame=0,visible=true;
  let pointer={x:0,y:0}, tilt={x:0,y:0};
  function show(key, lock=false) {
    clearTimeout(dismissTimer);
    if (pinned && !lock) return;
    if (active !== key) {
      const d=directions[key]; active=key;
      $('.globe-card-kicker').textContent=d.kicker;
      $('#globe-card-title').textContent=d.title;
      $('.globe-card-description').textContent=t(d.description);
      $('.globe-card-link').href=d.link;
    }
    pinned=lock; card.hidden=false;stage.dataset.active=key;
    buttons.forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.direction===key)));
    if (paused) draw();
  }
  function hide() {
    clearTimeout(dismissTimer); active=null;pinned=false;card.hidden=true;delete stage.dataset.active;
    buttons.forEach(b=>b.setAttribute('aria-expanded','false'));
    if (paused) draw();
  }
  buttons.forEach(button=>{
    button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show(button.dataset.direction);});
    button.addEventListener('focus',()=>show(button.dataset.direction));
    button.addEventListener('click',()=>{
      const key=button.dataset.direction;
      if(pinned && active===key) hide(); else show(key,true);
    });
  });
  stage.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse' || e.target!==canvas) return;
    const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    pointer={x:(x-.5)*.18,y:(y-.45)*.14};
    if(Math.hypot((x-.5)/.43,(y-.43)/.39)>1) return;
    const key=Object.keys(directions).reduce((best,k)=> Math.hypot(x-directions[k].x,y-directions[k].y)<Math.hypot(x-directions[best].x,y-directions[best].y)?k:best,'world');
    show(key);
  });
  stage.addEventListener('pointerenter',()=>clearTimeout(dismissTimer));
  stage.addEventListener('pointerleave',()=>{pointer={x:0,y:0};if(!pinned && !stage.contains(document.activeElement))dismissTimer=setTimeout(hide,200);});
  stage.addEventListener('focusout',e=>{if(!stage.contains(e.relatedTarget)&&!pinned)hide();});
  stage.addEventListener('keydown',e=>{if(e.key==='Escape'){hide();e.stopPropagation();}});
  $('.globe-card-close').addEventListener('click',()=>{const origin=buttons.find(b=>b.dataset.direction===active);origin?.focus();hide();});
  document.addEventListener('pointerdown',e=>{if(!stage.contains(e.target))hide();});
  $('.globe-card-link').addEventListener('click',()=>{const d=directions[active];if(d?.filter)filterPapers(d.filter);hide();});
  function updateButton(){motionButton.textContent=paused?'▶':'Ⅱ';motionButton.setAttribute('aria-label',t(paused?'播放动态示意':'暂停动态示意'));motionButton.setAttribute('aria-pressed',String(paused));}
  motionButton.addEventListener('click',()=>{paused=!paused;updateButton();});
  reducedMotion.addEventListener('change',e=>{paused=e.matches;pointer={x:0,y:0};tilt={x:0,y:0};updateButton();draw();});
  window.addEventListener('languagechange',()=>{
    updateButton();
    if(active) $('.globe-card-description').textContent=t(directions[active].description);
  });
  updateButton();
  if(!ctx) return;
  const TAU=Math.PI*2;
  const xyz=(lat,lon)=>[Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)];
  const paths=[];
  for(let lat=-75;lat<=75;lat+=15)paths.push({kind:0,points:Array.from({length:97},(_,i)=>xyz(lat*Math.PI/180,i/96*TAU))});
  for(let lon=0;lon<180;lon+=20)paths.push({kind:0,points:Array.from({length:97},(_,i)=>xyz(i/96*TAU,lon*Math.PI/180))});
  for(let band=0;band<18;band++)paths.push({kind:1,points:Array.from({length:113},(_,i)=>{const lon=i/112*TAU;return xyz(-1.25+band/17*2.5+.07*Math.sin(lon*3+band*.3)+.04*Math.cos(lon*7),lon);})});
  const particles=Array.from({length:260},(_,i)=>xyz(Math.asin(-1+2*(i+.5)/260),i*2.399963));
  function project(p){
    const c=Math.cos(angle+tilt.x),s=Math.sin(angle+tilt.x),x=p[0]*c+p[2]*s,z=p[2]*c-p[0]*s;
    const t=-.24+tilt.y;
    return [x*Math.cos(t)-p[1]*Math.sin(t),x*Math.sin(t)+p[1]*Math.cos(t),z];
  }
  function draw(){
    if(!width||!ctx)return;
    const r=Math.min(width*.34,height*.37),cx=width*.5,cy=height*.48;
    ctx.clearRect(0,0,width,height);
    const halo=ctx.createRadialGradient(cx,cy,r*.7,cx,cy,r*1.55);
    halo.addColorStop(0,'#b67dde44');halo.addColorStop(.65,'#c79ee425');halo.addColorStop(1,'#c79ee400');
    ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
    // Fine orbit trails pass behind a luminous, translucent sphere.
    function orbit(rotation,phase,front){
      ctx.save();ctx.translate(cx,cy);ctx.rotate(rotation);
      ctx.beginPath();ctx.ellipse(0,0,r*1.32,r*.43,0,front?0:Math.PI,front?Math.PI:TAU);
      ctx.lineWidth=front?1.1:.7;ctx.strokeStyle=front?'#9b55bf88':'#a377bb40';ctx.stroke();
      if(front){const x=Math.cos(phase)*r*1.32,y=Math.sin(phase)*r*.43;
        ctx.shadowColor='#c271f5';ctx.shadowBlur=12;ctx.fillStyle='#7f2eb1';ctx.beginPath();ctx.arc(x,y,3,0,TAU);ctx.fill();ctx.shadowBlur=0;}
      ctx.restore();
    }
    orbit(-.42,time*.48,false);orbit(.74,-time*.32+2,false);
    const surface=ctx.createRadialGradient(cx-r*.38,cy-r*.42,r*.03,cx,cy,r);
    surface.addColorStop(0,'#cfa4ee');surface.addColorStop(.45,'#9d64c2');surface.addColorStop(.82,'#633285');surface.addColorStop(1,'#301641');
    ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.fillStyle=surface;ctx.shadowColor='#ac6bd457';ctx.shadowBlur=24;ctx.fill();ctx.shadowBlur=0;
    for(const path of paths){
      const points=path.points.map(project);
      for(const front of [false,true]){
        ctx.beginPath();let started=false;
        for(const p of points){if((p[2]>0)!==front){started=false;continue;} const x=cx+p[0]*r,y=cy+p[1]*r;if(!started){ctx.moveTo(x,y);started=true;}else ctx.lineTo(x,y);}
        ctx.strokeStyle=front?(path.kind?'#efdaff90':'#efd7ff36'):'#d2a5f015';ctx.lineWidth=path.kind?.85:.55;ctx.stroke();
      }
    }
    particles.forEach((v,i)=>{const p=project(v);if(p[2]<0)return;
      const pulse=.7+.3*Math.sin(time*1.5+i);ctx.globalAlpha=.35+p[2]*.6;
      ctx.fillStyle=i%9===0?'#fff3d9':'#f3dfff';ctx.beginPath();ctx.arc(cx+p[0]*r,cy+p[1]*r,(i%9===0?1.8:.8)*pulse,0,TAU);ctx.fill();});ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.strokeStyle='#ecceff80';ctx.lineWidth=1.2;ctx.stroke();
    orbit(-.42,time*.48,true);orbit(.74,-time*.32+2,true);
    if(active){
      const d=directions[active],x=d.x*width,y=d.y*height;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+(x-cx)*.3,cy-50,x,y);ctx.strokeStyle='#e8c4ff99';ctx.lineWidth=1;ctx.setLineDash([3,5]);ctx.stroke();ctx.setLineDash([]);
      ctx.beginPath();ctx.arc(x,y,12+Math.sin(time*2)*2,0,TAU);ctx.strokeStyle='#a55bc970';ctx.stroke();
    }
  }
  function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw();}
  function animate(timestamp){
    if(!paused&&visible&&!document.hidden&&timestamp-last>32){
      const dt=last?Math.min((timestamp-last)/1000,.05):.033;last=timestamp;time+=dt;angle+=dt*(active?.045:.10);
      if(!reducedMotion.matches){tilt.x+=(pointer.x-tilt.x)*.06;tilt.y+=(pointer.y-tilt.y)*.06;}
      draw();
    }
    frame=requestAnimationFrame(animate);
  }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0;}).observe(stage);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',e=>{if(e.persisted){last=0;frame=requestAnimationFrame(animate);}});
  resize();frame=requestAnimationFrame(animate);
})();

// Keep original paper diagrams intact and offer a full-size view.
const figureDialog = $('#figure-dialog');
$$('[data-figure]').forEach(button => button.addEventListener('click', () => {
  const title = button.dataset.title;
  const imagePath = `assets/papers/${button.dataset.figure}.jpg`;
  figureDialog.dataset.figure = button.dataset.figure;
  $('#figure-title').textContent = title;
  $('#figure-full').src = imagePath;
  $('#figure-full').alt = currentLanguage === 'en' ? `${title} paper figure: ${button.dataset.caption}` : `${title} 论文原图：${button.dataset.caption}`;
  $('#figure-caption').textContent = button.dataset.caption;
  $('#figure-paper-link').href = button.closest('.paper').querySelector('h3 a').href;
  $('#figure-source-link').href = button.dataset.source;
  $('#figure-original-link').href = imagePath;
  figureDialog.showModal();
}));
$('.figure-close').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => {
  const rect = figureDialog.getBoundingClientRect();
  if (event.target === figureDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) figureDialog.close();
});

// Update dynamic content without resetting forms, selected filters, or open dialogs.
function refreshLanguage(){
  filterPapers($('[data-filter][aria-pressed="true"]').dataset.filter);
  menu.setAttribute('aria-label',t(menu.getAttribute('aria-expanded')==='true'?'关闭导航':'打开导航'));
  clearTimeout(toastTimer);$('.toast').classList.remove('show');$('.dialog-status').textContent='';
  const fallback=$('#draft-fallback');
  if(fallback){const draft=application();fallback.value=`${t('收件人：')}${draft.to}\n${t('主题：')}${draft.subject}\n\n${draft.body}`;fallback.setAttribute('aria-label',t('申请邮件模板，可选择并复制'));}
  if(figureDialog.open){
    const button=$(`[data-figure="${figureDialog.dataset.figure}"]`);
    $('#figure-caption').textContent=button.dataset.caption;
    $('#figure-full').alt=currentLanguage==='en'?`${button.dataset.title} paper figure: ${button.dataset.caption}`:`${button.dataset.title} 论文原图：${button.dataset.caption}`;
  }
}
window.addEventListener('languagechange',refreshLanguage);
refreshLanguage();
