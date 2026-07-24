
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
  'Full Stack Developer ',
  'software enggineering ',
  'developer website ',
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

/* ==========================================
   AI CHAT (GRATIS TANPA API)
========================================== */

const profile = {
    nama: "Satriya Arif Wibowo",
    umur: "17 Tahun",
    sekolah: "SMK Sejahtera Surabaya",
    jurusan: "TJKT",
    kelas: "XI TJKT",
    lokasi: "dimana ya enaknya",
    

    role: "Full Stack Developer",

    skill: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "MySQL",
        "Git",
        "Tailwind CSS"
    ],

    project: [
        "Portfolio Website",
        "Album Kelas",
        "Shoot Love"
    ],

    hobi: [
        "Coding",
        "Gaming",
        "Web Design"
    ],

    github: "https://github.com/satriya-project",
    instagram: "@username_kamu",
    email: "emailkamu@gmail.com"
};

function addMsg(role, html) {
    const box = document.getElementById("cm");

    const d = document.createElement("div");

    d.className = "msg" + (role === "u" ? " u" : "");

    d.innerHTML = `
        <div class="av av-${role}">${role === "u" ? "U" : "AI"}</div>
        <div class="bub">${html}</div>
    `;

    box.appendChild(d);
    box.scrollTop = box.scrollHeight;

    return d;
}

function typing() {
    return addMsg(
        "ai",
        `<div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>`
    );
}

function getAnswer(text) {

    text = text.toLowerCase();

    let jawaban = [];

    if (text.includes("nama") || text.includes("siapa kamu")) {
        jawaban.push(`👤 Nama saya <b>${profile.nama}</b>.`);
    }

    if (text.includes("umur") || text.includes("usia")) {
        jawaban.push(` Umur saya ${profile.umur}.`);
    }

    if (text.includes("sekolah")) {
        jawaban.push(` Saya bersekolah di <b>${profile.sekolah}</b>.`);
    }

    if (text.includes("kelas")) {
        jawaban.push(` Saya kelas ${profile.kelas}.`);
    }

    if (text.includes("jurusan")) {
        jawaban.push(` Saya mengambil jurusan ${profile.jurusan}.`);
    }

    if (
        text.includes("tinggal") ||
        text.includes("lokasi") ||
        text.includes("asal")
    ) {
        jawaban.push(` Saya berasal dari ${profile.lokasi}.`);
    }

    if (
        text.includes("skill") ||
        text.includes("keahlian") ||
        text.includes("bisa apa")
    ) {
        jawaban.push(
            "⚡ Skill saya:<br><br>• " + profile.skill.join("<br>• ")
        );
    }

    if (
        text.includes("project") ||
        text.includes("portfolio") ||
        text.includes("karya")
    ) {
        jawaban.push(
            "🚀 Project yang pernah saya buat:<br><br>• " +
            profile.project.join("<br>• ")
        );
    }

    if (text.includes("hobi")) {
        jawaban.push(
            "🎮 Hobi saya:<br><br>• " + profile.hobi.join("<br>• ")
        );
    }

    if (text.includes("github")) {
        jawaban.push(
            `🐙 Github saya:<br><a href="${profile.github}" target="_blank">${profile.github}</a>`
        );
    }

    if (text.includes("instagram")) {
        jawaban.push(` Instagram saya ${profile.instagram}`);
    }

    if (text.includes("email")) {
        jawaban.push(`📧 Email saya ${profile.email}`);
    }

    if (
        text.includes("halo") ||
        text.includes("hai") ||
        text.includes("hi")
    ) {
        jawaban.push("Halo 👋 Ada yang ingin kamu ketahui tentang saya?");
    }

    if (jawaban.length === 0) {
        return "Maaf, saya belum mempunyai informasi mengenai pertanyaan tersebut. Coba tanyakan tentang nama, sekolah, skill, project, Github, hobi, atau kontak.";
    }

    return jawaban.join("<br><br>");
}

function send() {

    const input = document.getElementById("ci");

    const txt = input.value.trim();

    if (!txt) return;

    input.value = "";

    document.getElementById("sgg").style.display = "none";

    addMsg("u", txt);

    const bubble = typing();

    setTimeout(() => {

        bubble.remove();

        addMsg("ai", getAnswer(txt));

    }, 700);

}

function qsend(btn) {
    document.getElementById("ci").value = btn.textContent;
    send();
}

document
    .getElementById("ci")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            send();

        }

    });


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



