'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $('.menu-toggle');
const navigation = $('#main-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  navigation.classList.toggle('open', open);
});
$$('a', navigation).forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', '打开导航');
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
  $('.paper-count').textContent = `${count} 篇代表论文`;
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
  toast(await copyText(button.dataset.copy) ? '邮箱已复制' : '请选中页面上的邮箱手动复制');
}));

const dialog = $('#apply-dialog');
$('#open-apply').addEventListener('click', () => dialog.showModal());
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
function application() {
  const name = $('#applicant-name').value.trim() || '[姓名]';
  const topic = $('#applicant-topic').value;
  return {
    to: 'wu-h25@mails.tsinghua.edu.cn',
    cc: 'yuangao24@mails.tsinghua.edu.cn',
    subject: `[Research Internship] ${name} - ${topic}`,
    body: `Hao Wu、高远，你们好！\n\n我叫 ${name}，希望申请 World Dynamics Lab 的科研实习，对 ${topic} 方向感兴趣。\n\n【个人背景】\n学校 / 专业 / 年级：\n相关技能与经历：\n\n【项目与研究兴趣】\n项目 / 论文 / 代码链接：\n我在项目中完成的工作：\n我想探索的问题或感兴趣的论文：\n\n【时间安排】\n预计开始时间：\n可投入的总时长与每周时间：\n所在地与线下 / 远程偏好：\n\n简历已随邮件附上。期待进一步交流，谢谢！\n\n${name}`
  };
}
$('#apply-form').addEventListener('submit', event => {
  event.preventDefault();
  const draft = application();
  window.location.href = `mailto:${draft.to}?cc=${encodeURIComponent(draft.cc)}&subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  toast('如未打开邮件客户端，可复制邮件模板');
});
$('#copy-draft').addEventListener('click', async () => {
  const draft = application();
  const content = `收件人：${draft.to}\n抄送：${draft.cc}\n主题：${draft.subject}\n\n${draft.body}`;
  if (await copyText(content)) toast('邮件模板已复制，请记得附上简历');
  else {
    let fallback = $('#draft-fallback');
    if (!fallback) {
      fallback = document.createElement('textarea');
      fallback.id = 'draft-fallback';
      fallback.setAttribute('aria-label', '申请邮件模板，可选择并复制');
      fallback.style.cssText = 'width:100%;min-height:190px;margin-top:16px;padding:12px;font:12px sans-serif';
      $('#apply-form').appendChild(fallback);
    }
    fallback.value = content;
    fallback.focus();
    fallback.select();
    toast('请在下方文本框中手动复制模板');
  }
});

// Original conceptual artwork. These trajectories are illustrative, not research results.
(() => {
  const canvas = $('#world-canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const motionButton = $('#motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = true;
  let width = 0, height = 0, angle = 0.4, frame = 0, last = 0;
  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width;
    height = box.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  const project = (x, y, z, rotation = angle) => {
    const c = Math.cos(rotation), s = Math.sin(rotation);
    const xx = x * c + z * s, zz = z * c - x * s;
    const tilt = -.22;
    return [xx * Math.cos(tilt) - y * Math.sin(tilt), xx * Math.sin(tilt) + y * Math.cos(tilt), zz];
  };
  const sphere = (lat, lon) => project(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon));
  function draw() {
    if (!width) return;
    const ctx = context, radius = Math.min(width * .375, height * .355);
    const cx = width * .52, cy = height * .50;
    ctx.clearRect(0, 0, width, height);
    const shade = ctx.createRadialGradient(cx - radius * .3, cy - radius * .3, 0, cx, cy, radius);
    shade.addColorStop(0, '#edf1d550');shade.addColorStop(.7, '#c2d4b42a');shade.addColorStop(1, '#809e7e22');
    ctx.beginPath();ctx.arc(cx, cy, radius, 0, Math.PI * 2);ctx.fillStyle = shade;ctx.fill();
    // Transparent geographic-like wire lattice.
    for (let lat = -75; lat <= 75; lat += 15) {
      drawCurve(Array.from({length:145}, (_,i) => sphere(lat * Math.PI / 180, i * Math.PI / 72)), .65);
    }
    for (let lon = 0; lon < 180; lon += 15) {
      drawCurve(Array.from({length:145}, (_,i) => sphere(i * Math.PI / 72, lon * Math.PI / 180)), .55);
    }
    function drawCurve(points, lineWidth) {
      for(let i = 1; i < points.length; i++) {
        const a=points[i-1], b=points[i];
        ctx.beginPath();ctx.moveTo(cx+a[0]*radius,cy+a[1]*radius);ctx.lineTo(cx+b[0]*radius,cy+b[1]*radius);
        ctx.strokeStyle=`rgba(73,112,79,${b[2]>0?.26:.08})`;ctx.lineWidth=lineWidth;ctx.stroke();
      }
    }
    // Smooth, multiscale bands trace an original flow field over the sphere.
    for (let band=0;band<30;band++) {
      let previous;
      for(let j=0;j<=160;j++) {
        const lon=j/160*Math.PI*2;
        const base=-1.28+band/29*2.56;
        const lat=base+.09*Math.sin(lon*3+band*.26)+.055*Math.cos(lon*7-band*.18);
        const p=sphere(lat,lon);
        if(previous && p[2]>-.1 && previous[2]>-.1) {
          ctx.beginPath();ctx.moveTo(cx+previous[0]*radius,cy+previous[1]*radius);ctx.lineTo(cx+p[0]*radius,cy+p[1]*radius);
          ctx.lineWidth=band%4===0?1.25:.6;ctx.strokeStyle=`rgba(${band%3===0?'111,139,68':'46,98,73'},${.12+Math.max(p[2],0)*.32})`;ctx.stroke();
        }
        previous=p;
      }
    }
    // Orbit extends beyond the sphere, connecting local and global scales.
    ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);ctx.beginPath();ctx.ellipse(0,0,radius*1.31,radius*.37,0,0,Math.PI*2);ctx.strokeStyle='#8da37d65';ctx.lineWidth=.8;ctx.stroke();
    const orbitAngle=angle*.7+1;const ox=Math.cos(orbitAngle)*radius*1.31,oy=Math.sin(orbitAngle)*radius*.37;
    ctx.beginPath();ctx.arc(ox,oy,3,0,Math.PI*2);ctx.fillStyle='#587e4a';ctx.fill();ctx.beginPath();ctx.arc(ox,oy,7,0,Math.PI*2);ctx.strokeStyle='#89a27066';ctx.stroke();ctx.restore();
    for(let i=0;i<140;i++) {
      const lat=Math.asin(-1+2*(i+.5)/140),lon=i*2.399963;
      const p=sphere(lat,lon);if(p[2]<0) continue;
      ctx.beginPath();ctx.arc(cx+p[0]*radius,cy+p[1]*radius,.8+p[2]*.5,0,Math.PI*2);ctx.fillStyle=`rgba(53,99,66,${.18+p[2]*.48})`;ctx.fill();
    }
    // Sparse drafting marks provide a scale reference without implying measured data.
    ctx.strokeStyle='#99ae8b70';ctx.lineWidth=.6;
    for(const [x,y] of [[cx-radius*1.16,cy-radius*.9],[cx+radius*1.15,cy+radius*.88]]) {
      ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(x+5,y);ctx.moveTo(x,y-5);ctx.lineTo(x,y+5);ctx.stroke();
    }
  }
  function updateButton() {
    motionButton.textContent=paused?'▶':'Ⅱ';
    motionButton.setAttribute('aria-label',paused?'播放动态示意':'暂停动态示意');
    motionButton.setAttribute('aria-pressed',String(paused));
  }
  function animate(timestamp) {
    if(!paused && visible && !document.hidden && timestamp-last>33) {
      angle+=.002;draw();last=timestamp;
    }
    frame=requestAnimationFrame(animate);
  }
  motionButton.addEventListener('click',()=>{paused=!paused;updateButton();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;updateButton();});
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(canvas);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',event=>{if(event.persisted)frame=requestAnimationFrame(animate);});
  updateButton();resize();frame=requestAnimationFrame(animate);
})();

// Keep original paper diagrams intact and offer a full-size view.
const figureDialog = $('#figure-dialog');
$$('[data-figure]').forEach(button => button.addEventListener('click', () => {
  const title = button.dataset.title;
  const imagePath = `assets/papers/${button.dataset.figure}.jpg`;
  $('#figure-title').textContent = title;
  $('#figure-full').src = imagePath;
  $('#figure-full').alt = `${title} 论文原图：${button.dataset.caption}`;
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
