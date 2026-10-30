const API = (window.APP_CONFIG && window.APP_CONFIG.instagramApi) || "/api/instagram";

const langText = {
  en: {
    title: "Instagram Downloader",
    subtitle: "Download reels & videos in HD",
    btn: "Get Video",
    alert: "Paste an Instagram link",
    invalid: "That does not look like an Instagram link",
    notFound: "Video not found",
    error: "Server error, try again"
  },
  ur: {
    title: "انسٹاگرام ویڈیو ڈاؤنلوڈر",
    subtitle: "ریلز اور ویڈیوز ڈاؤن لوڈ کریں",
    btn: "ویڈیو حاصل کریں",
    alert: "انسٹاگرام لنک پیسٹ کریں",
    invalid: "یہ انسٹاگرام لنک نہیں لگتا",
    notFound: "ویڈیو نہیں ملی",
    error: "سرور کا مسئلہ، دوبارہ کوشش کریں"
  }
};

let lang = "en";

function setLang(next) {
  lang = langText[next] ? next : "en";
  const t = langText[lang];
  document.getElementById("title").innerText = t.title;
  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("fetchBtn").innerText = t.btn;
}

function isInstagramUrl(value) {
  return /^https?:\/\/(www\.)?instagram\.com\/(reel|reels|p|tv)\//i.test(value);
}

async function fetchVideo() {
  const url = document.getElementById("url").value.trim();
  const loader = document.getElementById("loader");
  const preview = document.getElementById("preview");
  const video = document.getElementById("video");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!url) {
    return alert(langText[lang].alert);
  }

  if (!isInstagramUrl(url)) {
    return alert(langText[lang].invalid);
  }

  loader.style.display = "block";
  preview.classList.add("hidden");

  try {
    const res = await fetch(`${API}?url=${encodeURIComponent(url)}`);

    if (!res.ok) {
      throw new Error(`upstream ${res.status}`);
    }

    const data = await res.json();
    loader.style.display = "none";

    if (!data.status || !data.video) {
      return alert(langText[lang].notFound);
    }

    video.src = data.video;
    downloadBtn.href = data.video;
    preview.classList.remove("hidden");

    setTimeout(() => downloadBtn.click(), 800);
  } catch (error) {
    console.error("fetch failed:", error.message);
    loader.style.display = "none";
    alert(langText[lang].error);
  }
}
