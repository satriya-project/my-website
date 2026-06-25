
/* ═══════════════════════════════════════
   CURSOR
═══════════════════════════════════════ */
const cEl = document.getElementById('cur');
const cRel = document.getElementById('cur-r');
let mx=0, my=0, rx=0, ry=0;
const mobile = 'ontouchstart' in window || window.innerWidth < 768;

if (mobile) {
  cEl.style.display = 'none';
  cRel.style.display = 'none';
  document.body.classList.add('touch-dev');
} else {
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cEl.style.left=mx+'px'; cEl.style.top=my+'px'; });
  document.querySelectorAll('a,button,.pc,.sk,.sg').forEach(el => {
    el.addEventListener('mouseenter', () => { cEl.classList.add('big'); cRel.classList.add('big'); });
    el.addEventListener('mouseleave', () => { cEl.classList.remove('big'); cRel.classList.remove('big'); });
  });
  (function lag() {
    rx += (mx-rx)*0.11; ry += (my-ry)*0.11;
    cRel.style.left=rx+'px'; cRel.style.top=ry+'px';
    requestAnimationFrame(lag);
  })();
}

/* ═══════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════ */
const cnv = document.getElementById('cnv');
const ctx = cnv.getContext('2d');
let W, H, pts=[];

function resize() { W=cnv.width=cnv.offsetWidth; H=cnv.height=cnv.offsetHeight; }
window.addEventListener('resize', resize);
resize();

function Pt() {
  this.reset = function() {
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.vx = (Math.random()-.5)*.55; this.vy = (Math.random()-.5)*.55;
    this.r = Math.random()*1.4+.5; this.a = Math.random()*.5+.1;
  };
  this.reset();
  this.step = function() {
    this.x+=this.vx; this.y+=this.vy;
    const dx=mx-this.x, dy=my-this.y, d=Math.hypot(dx,dy);
    if (d<140) { this.x+=dx*.02; this.y+=dy*.02; }
    if (this.x<0) this.x=W; if (this.x>W) this.x=0;
    if (this.y<0) this.y=H; if (this.y>H) this.y=0;
  };
  this.draw = function() {
    ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(99,102,241,${this.a})`; ctx.fill();
  };
}
for (let i=0;i<100;i++) { const p=new Pt(); pts.push(p); }

(function tick() {
  ctx.clearRect(0,0,W,H);
  for (let i=0;i<pts.length;i++) {
    pts[i].step(); pts[i].draw();
    for (let j=i+1;j<pts.length;j++) {
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
      if (d<130) {
        ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(99,102,241,${.12*(1-d/130)})`; ctx.lineWidth=.5; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(tick);
})();

/* ═══════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════ */
const ROLES = [
  'Full Stack Developer 💻',
  'software enggineering 💡',
  'developer website 🔧',
];
let ri=0, ci=0, fwd=true;
const typEl = document.getElementById('typed');

(function tw() {
  const w = ROLES[ri];
  typEl.textContent = fwd ? w.slice(0,++ci) : w.slice(0,--ci);
  if (fwd && ci===w.length) { fwd=false; setTimeout(tw,1900); return; }
  if (!fwd && ci===0) { fwd=true; ri=(ri+1)%ROLES.length; }
  setTimeout(tw, fwd?82:34);
})();

/* ═══════════════════════════════════════
   NAV SCROLL
═══════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', window.scrollY>50));

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
document.querySelectorAll('.rv').forEach(el => {
  new IntersectionObserver(es => {
    if (es[0].isIntersecting) es[0].target.classList.add('vis');
  }, { threshold:.12 }).observe(el);
});

/* ═══════════════════════════════════════
   3D CARD TILT
═══════════════════════════════════════ */
document.querySelectorAll('.pc').forEach(c => {
  c.style.transition = 'border-color .3s, box-shadow .3s, transform .3s';
  c.addEventListener('mousemove', e => {
    const r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    c.style.transform = `translateY(-6px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
  });
  c.addEventListener('mouseleave', () => c.style.transform='');
});

/* ═══════════════════════════════════════
   AI CHAT
═══════════════════════════════════════ */
/*
  🔧 PENTING — Ganti teks di dalam SYS ini dengan info lengkap tentang dirimu!
  Ini yang akan dipakai AI untuk menjawab pertanyaan pengunjung.
*/
const SYS = `Kamu adalah AI assistant untuk portfolio seorang developer.

Informasi lengkap tentang pemilik portfolio:
- Nama: [satriya arif wibowo] — GANTI INI!
- Lokasi: [Kota, Indonesia] — GANTI INI!
- Role: Full Stack Developer yang passionate
- Skill utama: HTML, CSS, JavaScript, React, Node.js, Python, MySQL, MongoDB, Git, Tailwind CSS
- Mulai belajar coding: 2021 dari HTML dasar
- 2022: Belajar JavaScript, mulai memahami pemrograman interaktif
- 2023: Masuk ke Full Stack development, project pertama live dan bisa diakses publik
- Sekarang: Aktif membangun project, terus belajar teknologi baru
- Project unggulan: [Sebutkan nama & deskripsi project terbaikmu di sini]
- Hobi & kepribadian: [Tambahkan di sini — misal: suka musik, gaming, dll]
- Bisa dihubungi lewat: GitHub, LinkedIn, Instagram, Email

Cara kamu menjawab:
- Bahasa Indonesia yang casual, friendly, dan singkat
- Jika tidak tahu detail spesifik, katakan jujur tapi tetap ramah
- Hanya jawab pertanyaan terkait pemilik portfolio ini
- Gunakan emoji sesekali biar terasa lebih hidup`;

let apiKey = localStorage.getItem('_pk') || '';

function addMsg(role, html) {
  const box = document.getElementById('cm');
  const d = document.createElement('div');
  d.className = 'msg' + (role==='u'?' u':'');
  d.innerHTML = `<div class="av av-${role}">${role==='u'?'U':'AI'}</div><div class="bub">${html}</div>`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
  return d;
}

function typing() {
  return addMsg('ai', '<div class="dots"><span></span><span></span><span></span></div>');
}

async function send() {
  const input = document.getElementById('ci');
  const txt = input.value.trim();
  if (!txt) return;
  input.value = '';
  document.getElementById('sgg').style.display = 'none';
  addMsg('u', txt);
  const t = typing();

  const h = { 'Content-Type': 'application/json' };
  if (apiKey) {
    h['x-api-key'] = apiKey;
    h['anthropic-version'] = '2023-06-01';
    h['anthropic-dangerous-direct-browser-access'] = 'true';
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: h,
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYS,
        messages: [{ role: 'user', content: txt }]
      })
    });
    t.remove();
    if (res.status===401||res.status===403) {
      document.getElementById('an').classList.add('show');
      addMsg('ai','Perlu API key buat chat di luar Claude. Masukkan di bawah ya! 🔑');
      return;
    }
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Hmm ada yang salah. Coba lagi ya!';
    addMsg('ai', reply.replace(/\n/g,'<br>'));
  } catch {
    t.remove();
    document.getElementById('an').classList.add('show');
    addMsg('ai','Kayaknya perlu API key nih. Masukkan di bawah untuk aktifkan chat! 🔑');
  }
}

function qsend(btn) { document.getElementById('ci').value = btn.textContent; send(); }

function saveK() {
  const k = document.getElementById('aki').value.trim();
  if (k.startsWith('sk-ant-')) {
    apiKey = k;
    localStorage.setItem('_pk', k);
    document.getElementById('an').classList.remove('show');
    addMsg('ai','✅ API key tersimpan! Sekarang kamu bisa tanya apa saja tentang pemilik portfolio ini 🚀');
  } else {
    alert('Format key tidak valid. Harus dimulai dengan "sk-ant-"');
  }
}

document.getElementById('ci').addEventListener('keypress', e => { if (e.key==='Enter') send(); });



function setupMusic() {
            const music = document.getElementById('backgroundMusic');

            const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
            const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

            if (isMusicPlaying) {
                music.currentTime = parseFloat(musicCurrentTime);
            }

            music.addEventListener('play', () => {
                localStorage.setItem('musicPlaying', 'true');
            });

            music.addEventListener('pause', () => {
                localStorage.setItem('musicPlaying', 'false');
            });

            setInterval(() => {
                localStorage.setItem('musicCurrentTime', music.currentTime);
            }, 1000);

            document.addEventListener('click', function startMusic() {
                music.play().catch(error => {
                    console.log('Autoplay prevented', error);
                });
                document.removeEventListener('click', startMusic);
            });
        }

        document.addEventListener('DOMContentLoaded', setupMusic);

        
function continueMusic() {
    const music = document.getElementById("backgroundMusic");

    if (!music) return;

    const isMusicPlaying =
        localStorage.getItem("musicPlaying") === "true";

    const musicCurrentTime =
        localStorage.getItem("musicCurrentTime") || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);

        music.play().catch((error) => {
            console.log("Music playback failed", error);
        });
    }

    document.addEventListener(
        "touchstart",
        startMusic,
        { once: true }
    );

    document.addEventListener(
        "click",
        startMusic,
        { once: true }
    );

    function startMusic() {
        music.play().catch((error) => {
            console.log("Autoplay prevented", error);
        });
    }

    music.addEventListener("timeupdate", () => {
        localStorage.setItem(
            "musicCurrentTime",
            music.currentTime
        );
    });

    music.addEventListener("play", () => {
        localStorage.setItem("musicPlaying", "true");
    });

    music.addEventListener("pause", () => {
        localStorage.setItem("musicPlaying", "false");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    continueMusic();
});


document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("backgroundMusic");

    if (!music) return;

    // ambil status dari halaman sebelumnya
    const isPlaying = localStorage.getItem("musicPlaying") === "true";
    const time = localStorage.getItem("musicTime") || 0;

    music.currentTime = parseFloat(time);

    if (isPlaying) {
        music.play().catch(() => { });
    }

    // simpan posisi terus
    setInterval(() => {
        localStorage.setItem("musicTime", music.currentTime);
    }, 1000);

    music.addEventListener("play", () => {
        localStorage.setItem("musicPlaying", "true");
    });

    music.addEventListener("pause", () => {
        localStorage.setItem("musicPlaying", "false");
    });

    // INI KUNCI UTAMA (klik sekali saja di mana saja)
    document.addEventListener("click", function startMusic() {
        music.play().catch(() => { });
        document.removeEventListener("click", startMusic);
    });
});

