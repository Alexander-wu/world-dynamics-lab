'use strict';
// Static copy is captured from the Chinese HTML once, preserving controls and input values.
const languageRules = [
  {
    "selector": ".skip-link",
    "en": "Skip to content"
  },
  {
    "selector": ".wordmark",
    "en": "World Dynamics Lab home",
    "attr": "aria-label"
  },
  {
    "selector": "#main-nav",
    "en": "Main navigation",
    "attr": "aria-label"
  },
  {
    "selector": "#main-nav a[href=\"#research\"]",
    "en": "Research"
  },
  {
    "selector": "#main-nav a[href=\"#publications\"]",
    "en": "Publications"
  },
  {
    "selector": "#main-nav a[href=\"#people\"]",
    "en": "People"
  },
  {
    "selector": ".nav-join",
    "en": "Join us <span aria-hidden=\"true\">↗</span>"
  },
  {
    "selector": ".tsinghua-seal",
    "en": "Tsinghua University emblem",
    "attr": "alt"
  },
  {
    "selector": ".university-signature strong",
    "en": "Tsinghua University"
  },
  {
    "selector": ".hero-chinese",
    "en": "Understanding how the world works."
  },
  {
    "selector": ".hero-description",
    "en": "From Earth systems to robot interactions, we study world models that capture physical laws, predict dynamics, and support reasoning and decision-making."
  },
  {
    "selector": ".hero-actions .primary",
    "en": "Explore our research <span aria-hidden=\"true\">↗</span>"
  },
  {
    "selector": ".hero-actions .text-link",
    "en": "Research internships <span class=\"status-dot\" aria-hidden=\"true\"></span>"
  },
  {
    "selector": ".hero-affiliation",
    "en": "Hao Wu &amp; Yuan Gao <span>／</span> With Prof. Xiaomeng Huang’s group at Tsinghua University"
  },
  {
    "selector": "#world-canvas",
    "en": "An animated globe of glowing particles, flow lines and orbits. Explore world models, scientific machine learning, and multimodal agents using the three research buttons. Conceptual visualization.",
    "attr": "aria-label"
  },
  {
    "selector": ".globe-hotspots",
    "en": "Explore research directions",
    "attr": "aria-label"
  },
  {
    "selector": ".globe-card-close",
    "en": "Close research direction card",
    "attr": "aria-label"
  },
  {
    "selector": ".globe-card-link",
    "en": "Explore this research <span aria-hidden=\"true\">↗</span>"
  },
  {
    "selector": ".globe-hint",
    "en": "Explore research · Hover or tap<br><small>Conceptual visualization</small>"
  },
  {
    "selector": "#research .section-head h2",
    "en": "One world. Many scales."
  },
  {
    "selector": "#research .section-intro",
    "en": "Connecting data, physics, and action to study the dynamics of our world."
  },
  {
    "selector": ".research-item:nth-child(1)>p:not(.mono)",
    "en": "We study robot video generation, physical consistency, and reward alignment to predict action-conditioned futures."
  },
  {
    "selector": ".research-item:nth-child(2)>p:not(.mono)",
    "en": "We explore multiscale dynamics, neural operators, and stable long-term forecasting for weather, oceans, and turbulence."
  },
  {
    "selector": ".research-item:nth-child(3)>p:not(.mono)",
    "en": "We combine vision, language, and physical knowledge to explore scientific reasoning, agents, and the link between prediction and decision-making."
  },
  {
    "selector": ".research-item a[data-jump-filter]",
    "en": "View related research <span>↗</span>"
  },
  {
    "selector": ".research-item a[href=\"#join\"]",
    "en": "Explore open questions with us <span>↗</span>"
  },
  {
    "selector": ".research-item:nth-child(1) .topic-tags span:nth-child(1)",
    "en": "Video generation"
  },
  {
    "selector": ".research-item:nth-child(1) .topic-tags span:nth-child(2)",
    "en": "Embodied AI"
  },
  {
    "selector": ".research-item:nth-child(1) .topic-tags span:nth-child(3)",
    "en": "Post-training"
  },
  {
    "selector": ".research-item:nth-child(2) .topic-tags span:nth-child(1)",
    "en": "Earth systems"
  },
  {
    "selector": ".research-item:nth-child(2) .topic-tags span:nth-child(2)",
    "en": "Neural operators"
  },
  {
    "selector": ".research-item:nth-child(2) .topic-tags span:nth-child(3)",
    "en": "Spatiotemporal forecasting"
  },
  {
    "selector": ".research-item:nth-child(3) .topic-tags span:nth-child(1)",
    "en": "Multimodal understanding"
  },
  {
    "selector": ".research-item:nth-child(3) .topic-tags span:nth-child(2)",
    "en": "Scientific reasoning"
  },
  {
    "selector": ".research-item:nth-child(3) .topic-tags span:nth-child(3)",
    "en": "Agents"
  },
  {
    "selector": "#publications .section-head h2",
    "en": "From questions to reproducible research."
  },
  {
    "selector": "#publications .section-intro",
    "en": "Selected work coauthored by Hao Wu and Yuan Gao."
  },
  {
    "selector": ".filters",
    "en": "Filter publications by research area",
    "attr": "aria-label"
  },
  {
    "selector": "[data-filter=\"all\"]",
    "en": "All <small>06</small>"
  },
  {
    "selector": ".paper:nth-child(1) .paper-description",
    "en": "We distill multimodal rewards for world-model post-training and use sliding-window re-encoding to improve long-horizon generation stability."
  },
  {
    "selector": "[data-figure=\"roboalign-r1\"]",
    "en": "Reward alignment and long-horizon generation",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(1) figcaption>span:first-child",
    "en": "Reward alignment and long-horizon generation"
  },
  {
    "selector": "[data-figure=\"roboalign-r1\"]",
    "en": "View original figure from RoboAlign-R1",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"roboalign-r1\"] img",
    "en": "RoboAlign-R1 paper figure: Reward alignment and long-horizon generation",
    "attr": "alt"
  },
  {
    "selector": ".paper:nth-child(2) .paper-description",
    "en": "We decouple physical simulation from error correction, using a learned corrector to reduce error propagation and amplification in coupled systems."
  },
  {
    "selector": "[data-figure=\"pnp-corrector\"]",
    "en": "Coupled forecasting and error correction",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(2) figcaption>span:first-child",
    "en": "Coupled forecasting and error correction"
  },
  {
    "selector": "[data-figure=\"pnp-corrector\"]",
    "en": "View original figure from PnP-Corrector",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"pnp-corrector\"] img",
    "en": "PnP-Corrector paper figure: Coupled forecasting and error correction",
    "attr": "alt"
  },
  {
    "selector": ".paper:nth-child(3) .paper-description",
    "en": "Progressive residual correction and physics-guided graph networks enable subseasonal-to-seasonal ocean simulation."
  },
  {
    "selector": "[data-figure=\"neuralom\"]",
    "en": "Neural ocean model architecture",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(3) figcaption>span:first-child",
    "en": "Neural ocean model architecture"
  },
  {
    "selector": "[data-figure=\"neuralom\"]",
    "en": "View original figure from NeuralOM",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"neuralom\"] img",
    "en": "NeuralOM paper figure: Neural ocean model architecture",
    "attr": "alt"
  },
  {
    "selector": ".paper:nth-child(4) .paper-description",
    "en": "A unified multiscale graph model connects global weather forecasting with high-resolution regional prediction."
  },
  {
    "selector": "[data-figure=\"oneforecast\"]",
    "en": "Global and regional weather forecasting",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(4) figcaption>span:first-child",
    "en": "Global and regional weather forecasting"
  },
  {
    "selector": "[data-figure=\"oneforecast\"]",
    "en": "View original figure from OneForecast",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"oneforecast\"] img",
    "en": "OneForecast paper figure: Global and regional weather forecasting",
    "attr": "alt"
  },
  {
    "selector": ".paper:nth-child(5) .paper-description",
    "en": "Latent dynamics and multiscale detail fusion support Earth system forecasts that balance long-term stability with fine-scale fidelity."
  },
  {
    "selector": "[data-figure=\"tritoncast\"]",
    "en": "Multiscale Earth system forecasting",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(5) figcaption>span:first-child",
    "en": "Multiscale Earth system forecasting"
  },
  {
    "selector": "[data-figure=\"tritoncast\"]",
    "en": "View original figure from TritonCast",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"tritoncast\"] img",
    "en": "TritonCast paper figure: Multiscale Earth system forecasting",
    "attr": "alt"
  },
  {
    "selector": ".paper:nth-child(6) .paper-description",
    "en": "Multigrid and hierarchical dynamics modeling address spectral bias, preserve high-frequency detail, and track long-term turbulence."
  },
  {
    "selector": "[data-figure=\"turb-l1\"]",
    "en": "Multigrid and hierarchical dynamics synthesis",
    "attr": "data-caption"
  },
  {
    "selector": ".paper:nth-child(6) figcaption>span:first-child",
    "en": "Multigrid and hierarchical dynamics synthesis"
  },
  {
    "selector": "[data-figure=\"turb-l1\"]",
    "en": "View original figure from Turb-L1",
    "attr": "aria-label"
  },
  {
    "selector": "[data-figure=\"turb-l1\"] img",
    "en": "Turb-L1 paper figure: Multigrid and hierarchical dynamics synthesis",
    "attr": "alt"
  },
  {
    "selector": ".paper-figure figcaption>span:last-child",
    "en": "Click to enlarge ↗"
  },
  {
    "selector": ".publication-note",
    "en": "Selected by research theme; author lists are abbreviated. See the papers for full authorship and contribution statements. Figures are from the corresponding papers, provided on the author’s website. Click a figure to enlarge it."
  },
  {
    "selector": "#people .section-head h2",
    "en": "Expanding the boundaries of research, together."
  },
  {
    "selector": "#people .section-intro",
    "en": "Based at Tsinghua University, working at the intersection of computing, physics, and intelligence."
  },
  {
    "selector": ".person:first-child .person-info>p:not(.mono)",
    "en": "World models · Robot video generation<br>Multimodal models &amp; agents"
  },
  {
    "selector": ".person:nth-child(2) .person-info>p:not(.mono)",
    "en": "World models · Computer vision<br>Scientific machine learning"
  },
  {
    "selector": ".person-info>a:not(.email-small)",
    "en": "Personal website ↗"
  },
  {
    "selector": ".group-band h3",
    "en": "With Prof. Xiaomeng Huang’s group"
  },
  {
    "selector": ".group-band p:last-child",
    "en": "Tsinghua University · High-performance computing &amp; artificial intelligence"
  },
  {
    "selector": ".group-band>.arrow-link",
    "en": "About Prof. Huang <span>↗</span>"
  },
  {
    "selector": ".join-heading>p:not(.eyebrow)",
    "en": "Bring your curiosity. Let’s explore together."
  },
  {
    "selector": ".join-content h3",
    "en": "Research internships"
  },
  {
    "selector": ".join-content>p",
    "en": "Interested in world models, embodied intelligence, multimodal models, or AI for Science? Get in touch. We welcome students who pursue questions deeply, run careful experiments, and enjoy sharing ideas and collaborating."
  },
  {
    "selector": ".join-content h4",
    "en": "Help us get to know you"
  },
  {
    "selector": ".apply-steps li:nth-child(1) strong",
    "en": "Your CV"
  },
  {
    "selector": ".apply-steps li:nth-child(1) p",
    "en": "Tell us about your education, research interests, and relevant skills."
  },
  {
    "selector": ".apply-steps li:nth-child(2) strong",
    "en": "A project you have worked on"
  },
  {
    "selector": ".apply-steps li:nth-child(2) p",
    "en": "A paper, open-source contribution, course project, or reproduction study can be a starting point."
  },
  {
    "selector": ".apply-steps li:nth-child(3) strong",
    "en": "Your questions and availability"
  },
  {
    "selector": ".apply-steps li:nth-child(3) p",
    "en": "Share your research interests, expected start date, time commitment, and preference for on-site or remote work."
  },
  {
    "selector": "#open-apply",
    "en": "Prepare application email <span aria-hidden=\"true\">↗</span>"
  },
  {
    "selector": ".contact-line>p",
    "en": "Contact Hao Wu and Yuan Gao directly"
  },
  {
    "selector": ".contact-person:nth-of-type(2)>span",
    "en": "Yuan Gao"
  },
  {
    "selector": ".copy-email",
    "en": "Copy"
  },
  {
    "selector": "[data-copy=\"wu-h25@mails.tsinghua.edu.cn\"]",
    "en": "Copy Hao Wu’s email address",
    "attr": "aria-label"
  },
  {
    "selector": "[data-copy=\"yuangao24@mails.tsinghua.edu.cn\"]",
    "en": "Copy Yuan Gao’s email address",
    "attr": "aria-label"
  },
  {
    "selector": ".faq-list details:nth-child(1) summary",
    "en": "Can I apply without a publication?<span>+</span>"
  },
  {
    "selector": ".faq-list details:nth-child(1)>p",
    "en": "Yes. Introduce yourself through course projects, reproduction studies, or open-source work. Explain your contributions, the challenges you encountered, and what you would like to explore next."
  },
  {
    "selector": ".faq-list details:nth-child(2) summary",
    "en": "How are topics and working arrangements decided?<span>+</span>"
  },
  {
    "selector": ".faq-list details:nth-child(2)>p",
    "en": "Start with a paper that interests you and include your ideas or questions in your email. We will discuss the research topic, dates, and working arrangements by email."
  },
  {
    "selector": ".faq-list details:nth-child(3) summary",
    "en": "What should I include in my application?<span>+</span>"
  },
  {
    "selector": ".faq-list details:nth-child(3)>p",
    "en": "Please include your CV, relevant project or code links, research interests, expected start date, and availability. Use “Prepare application email” to generate an editable draft."
  },
  {
    "selector": ".back-top",
    "en": "Back to top",
    "attr": "aria-label"
  },
  {
    "selector": ".footer-bottom>p>small",
    "en": "Prof. Xiaomeng Huang’s group · Joint research and internship opportunities"
  },
  {
    "selector": ".sources summary",
    "en": "Sources &amp; updates <span>↗</span>"
  },
  {
    "selector": ".sources>p:first-of-type",
    "en": "Sources checked on October 18, 2026. Publication links lead to conference proceedings, arXiv, or project websites."
  },
  {
    "selector": ".sources>a:nth-of-type(1)",
    "en": "Hao Wu’s website"
  },
  {
    "selector": ".sources>a:nth-of-type(2)",
    "en": "Yuan Gao’s website"
  },
  {
    "selector": ".sources>a:nth-of-type(3)",
    "en": "Prof. Xiaomeng Huang’s Tsinghua profile"
  },
  {
    "selector": ".sources>p:last-child",
    "en": "World Dynamics Lab is the name used for this research group’s website."
  },
  {
    "selector": ".close-dialog",
    "en": "Close application email window",
    "attr": "aria-label"
  },
  {
    "selector": "#apply-title",
    "en": "It starts with an email."
  },
  {
    "selector": "#apply-dialog>p:not(.eyebrow)",
    "en": "Fill in the fields below to prepare your application email. Attach your CV in your email client."
  },
  {
    "selector": "label[for=\"applicant-name\"]",
    "en": "Your name <span>(optional)</span>"
  },
  {
    "selector": "#applicant-name",
    "en": "Your name",
    "attr": "placeholder"
  },
  {
    "selector": "label[for=\"applicant-topic\"]",
    "en": "Research interest"
  },
  {
    "selector": "#applicant-topic option:last-child",
    "en": "Other / Cross-disciplinary research"
  },
  {
    "selector": "#apply-form button[type=\"submit\"]",
    "en": "Open email client ↗"
  },
  {
    "selector": "#copy-draft",
    "en": "Copy email draft"
  },
  {
    "selector": ".form-note",
    "en": "Your draft is generated only in this page. Nothing is submitted to or stored by this website."
  },
  {
    "selector": ".figure-close",
    "en": "Close paper figure",
    "attr": "aria-label"
  },
  {
    "selector": "#figure-paper-link",
    "en": "Read paper ↗"
  },
  {
    "selector": "#figure-source-link",
    "en": "Figure source ↗"
  },
  {
    "selector": "#figure-original-link",
    "en": "Open full-size figure ↗"
  }
];
const languagePhrases = {
  "研究机器人视频生成、物理一致性与奖励对齐，让模型预测与动作相关的未来。": "We study robot video generation, physical consistency, and reward alignment to predict action-conditioned futures.",
  "面向气象、海洋与湍流，研究多尺度动力学、神经算子和稳定的长期预测。": "We explore multiscale dynamics, neural operators, and stable long-term forecasting for weather, oceans, and turbulence.",
  "结合视觉、语言与物理知识，探索科学推理、智能体，以及预测与决策的连接。": "We combine vision, language, and physical knowledge to explore scientific reasoning, agents, and the link between prediction and decision-making.",
  "打开导航": "Open navigation",
  "关闭导航": "Close navigation",
  "邮箱已复制": "Email address copied",
  "请选中页面上的邮箱手动复制": "Please select and copy the email address manually.",
  "如未打开邮件客户端，可复制邮件模板": "If your email client did not open, copy the email draft instead.",
  "邮件模板已复制，请记得附上简历": "Email draft copied. Please remember to attach your CV.",
  "申请邮件模板，可选择并复制": "Application email draft. Select and copy the text.",
  "请在下方文本框中手动复制模板": "Please copy the draft from the text box below.",
  "暂停动态示意": "Pause animation",
  "播放动态示意": "Play animation",
  "[姓名]": "[Your name]",
  "收件人：": "To: ",
  "主题：": "Subject: "
};
const paperLinkLabels = {"论文 ↗": "Paper ↗", "代码 ↗": "Code ↗", "项目演示 ↗": "Demo ↗", "会议 ↗": "Conference ↗"};

const languageBindings = languageRules.flatMap(rule => [...document.querySelectorAll(rule.selector)].map(element => ({element, attr:rule.attr, zh:rule.attr?element.getAttribute(rule.attr):element.innerHTML, en:rule.en})));
document.querySelectorAll('.paper-links a').forEach(element => {
  const en=paperLinkLabels[element.textContent.trim()];
  if(en)languageBindings.push({element,zh:element.innerHTML,en});
});
let currentLanguage='zh';
const t = text => currentLanguage==='en' ? (languagePhrases[text] || text) : text;
function preferredLanguage(){
  const explicit=new URL(location.href).searchParams.get('lang');
  if(explicit==='en'||explicit==='zh')return explicit;
  try {const saved=localStorage.getItem('wdl-language');if(saved==='en'||saved==='zh')return saved;} catch { /* Storage can be disabled. */ }
  return (navigator.language||'zh').toLowerCase().startsWith('zh')?'zh':'en';
}
function setLanguage(language,{navigate=false,remember=false}={}){
  currentLanguage=language==='en'?'en':'zh';
  document.documentElement.lang=currentLanguage==='zh'?'zh-CN':'en';
  languageBindings.forEach(binding=>{
    const value=binding[currentLanguage];
    if(binding.attr)binding.element.setAttribute(binding.attr,value);else binding.element.innerHTML=value;
  });
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===currentLanguage)));
  const description=currentLanguage==='en'?'World Dynamics Lab — Joint research by Hao Wu and Yuan Gao with Prof. Xiaomeng Huang’s group at Tsinghua University. World models, embodied AI, and AI for Science. Research interns welcome.':'World Dynamics Lab — Hao Wu 与高远 Yuan Gao 的联合研究主页，依托清华大学黄小猛教授课题组。探索世界模型、具身智能与 AI for Science，欢迎科研实习生加入。';
  document.querySelector('meta[name="description"]').content=description;
  document.querySelector('meta[property="og:description"]').content=description;
  const canonical='https://alexander-wu.github.io/world-dynamics-lab/?lang='+currentLanguage;
  document.querySelector('link[rel="canonical"]').href=canonical;
  document.querySelector('meta[property="og:url"]').content=canonical;
  if(remember)try{localStorage.setItem('wdl-language',currentLanguage);}catch{/* Language selection still works without storage. */}
  if(navigate){const url=new URL(location.href);url.searchParams.set('lang',currentLanguage);history.pushState({},'',url);}
  window.dispatchEvent(new CustomEvent('languagechange'));
}
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.language!==currentLanguage)setLanguage(button.dataset.language,{navigate:true,remember:true});
}));
window.addEventListener('popstate',()=>setLanguage(preferredLanguage()));
setLanguage(preferredLanguage());
