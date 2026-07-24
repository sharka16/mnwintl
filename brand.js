/* =========================================================
   M&W International — shared behaviour for brand pages
   Language toggle + mobile menu.
   Each brand page defines window.PAGE_I18N = { zh:{...}, en:{...} }
   before loading this file; those keys are merged on top of the
   shared chrome strings below.
   ========================================================= */

(function () {
  'use strict';

  var CHROME = {
    zh: {
      skip: "跳至主要內容",
      navAbout: "關於我們", navBusiness: "我們的事業", navBrands: "品牌產品",
      navCapabilities: "核心能力", navMarket: "市場布局", navContact: "聯絡我們",
      navCta: "合作夥伴洽談",
      crumbHome: "首頁", crumbBrands: "品牌產品",
      storyEyebrow: "品牌故事",
      lineupEyebrow: "產品系列", lineupH2: "產品陣容",
      lineupSub: "以下為產品版位範例，實際品項與圖片待補。",
      featuresEyebrow: "產品特色", featuresH2: "為什麼選擇這個品牌",
      specsEyebrow: "產品規格", specsH2: "規格與認證",
      specName: "品名", specSize: "規格容量", specOrigin: "產地",
      specShelf: "保存期限", specCert: "認證",
      channelEyebrow: "銷售通路", channelH2: "哪裡買得到",
      channelSub: "通路資訊待補，以下為版位示意。",
      ch1: "連鎖零售", ch1d: "全台主要通路", ch2: "電商平台", ch2d: "線上購物通路",
      ch3: "餐飲通路", ch3d: "餐廳與飲品店", ch4: "海外市場", ch4d: "亞太地區代理",
      ctaEyebrow: "合作洽談", ctaH2: "想代理或引進這個品牌？",
      ctaP: "無論您是零售通路、餐飲業者或海外代理夥伴，我們都樂於一同討論合作方式。",
      ctaBtn1: "聯絡我們", ctaBtn2: "回到品牌總覽",
      sibEyebrow: "其他品牌", sibH2: "探索更多品牌",
      sibMore: "了解更多",
      footerTagline: "國際消費品開發、代理與市場拓展夥伴。",
      fCompanyOverview: "公司介紹", fTeamVision: "團隊與願景",
      fPartnerInquiries: "合作洽談", fContactInfo: "聯絡資訊",
      biz1Title: "品牌開發", biz2Title: "通路代理", biz3Title: "市場進入", biz4Title: "餐飲與生活體驗",
      cap1Title: "策略規劃", cap2Title: "創意設計", cap3Title: "商業執行",
      fPetiteDiary: "超纖日記 Petite Diary",
      copyright: "© 2026 M&W International. All rights reserved.",
      footerAddr: "巨林生化科技有限公司・台北，台灣",
      phLabel: "待補"
    },
    en: {
      skip: "Skip to main content",
      navAbout: "About Us", navBusiness: "Our Business", navBrands: "Our Brands",
      navCapabilities: "Capabilities", navMarket: "Market Reach", navContact: "Contact",
      navCta: "Partner With Us",
      crumbHome: "Home", crumbBrands: "Our Brands",
      storyEyebrow: "Brand Story",
      lineupEyebrow: "Product Range", lineupH2: "The Lineup",
      lineupSub: "Placeholder slots below — final products and photography to be added.",
      featuresEyebrow: "Why It Works", featuresH2: "What Sets This Brand Apart",
      specsEyebrow: "Specifications", specsH2: "Specs & Certifications",
      specName: "Product name", specSize: "Size / volume", specOrigin: "Country of origin",
      specShelf: "Shelf life", specCert: "Certifications",
      channelEyebrow: "Availability", channelH2: "Where To Buy",
      channelSub: "Channel details to be confirmed — layout shown for reference.",
      ch1: "Retail Chains", ch1d: "Major retailers nationwide", ch2: "E-commerce", ch2d: "Online marketplaces",
      ch3: "Foodservice", ch3d: "Restaurants & beverage bars", ch4: "Export Markets", ch4d: "Asia-Pacific distribution",
      ctaEyebrow: "Partnership", ctaH2: "Interested in carrying this brand?",
      ctaP: "Whether you are a retailer, a foodservice operator or an overseas distributor, we'd be glad to talk it through.",
      ctaBtn1: "Contact Us", ctaBtn2: "Back to All Brands",
      sibEyebrow: "More Brands", sibH2: "Explore Our Other Brands",
      sibMore: "Learn more",
      footerTagline: "Your partner for international consumer goods development, distribution, and market expansion.",
      fCompanyOverview: "Company Overview", fTeamVision: "Team & Vision",
      fPartnerInquiries: "Partnership Inquiries", fContactInfo: "Contact Info",
      biz1Title: "Brand Development", biz2Title: "Channel Distribution", biz3Title: "Market Entry", biz4Title: "Dining & Lifestyle",
      cap1Title: "Strategic Planning", cap2Title: "Creative & Design", cap3Title: "Commercial Execution",
      fPetiteDiary: "Petite Diary 超纖日記",
      copyright: "© 2026 M&W International. All rights reserved.",
      footerAddr: "M&W International Trading Co. · Taipei, Taiwan",
      phLabel: "TBC"
    }
  };

  function merge(base, extra) {
    var out = {}, k;
    for (k in base) { if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k]; }
    if (extra) { for (k in extra) { if (Object.prototype.hasOwnProperty.call(extra, k)) out[k] = extra[k]; } }
    return out;
  }

  var page = window.PAGE_I18N || { zh: {}, en: {} };
  var dicts = {
    zh: merge(CHROME.zh, page.zh),
    en: merge(CHROME.en, page.en)
  };

  function applyLang(lang) {
    var dict = dicts[lang];
    if (!dict) return;

    document.documentElement.lang = (lang === 'zh') ? 'zh-Hant' : 'en';

    if (dict.pageTitle) document.title = dict.pageTitle;
    var desc = document.getElementById('pageDesc');
    if (desc && dict.pageDesc) desc.setAttribute('content', dict.pageDesc.replace(/&amp;/g, '&'));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key].replace(/&amp;/g, '&');
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    var zhBtn = document.getElementById('langZh');
    var enBtn = document.getElementById('langEn');
    if (zhBtn && enBtn) {
      zhBtn.classList.toggle('active', lang === 'zh');
      zhBtn.setAttribute('aria-pressed', String(lang === 'zh'));
      enBtn.classList.toggle('active', lang === 'en');
      enBtn.setAttribute('aria-pressed', String(lang === 'en'));
    }

    try { localStorage.setItem('mw_lang', lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var zhBtn = document.getElementById('langZh');
    var enBtn = document.getElementById('langEn');
    if (zhBtn) zhBtn.addEventListener('click', function () { applyLang('zh'); });
    if (enBtn) enBtn.addEventListener('click', function () { applyLang('en'); });

    // same storage key as index.html, so language carries across pages
    var initial = 'zh';
    try {
      var saved = localStorage.getItem('mw_lang');
      if (saved === 'zh' || saved === 'en') initial = saved;
      else if (navigator.language && navigator.language.toLowerCase().indexOf('zh') === -1) initial = 'en';
    } catch (e) {}
    applyLang(initial);

    // mobile menu
    var toggle = document.getElementById('menuToggle');
    var mobileNav = document.getElementById('mobileNav');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        var open = mobileNav.style.display === 'block';
        mobileNav.style.display = open ? 'none' : 'block';
        toggle.setAttribute('aria-expanded', String(!open));
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileNav.style.display = 'none';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
})();
