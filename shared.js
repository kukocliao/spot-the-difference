// 共用資料與繪圖：卡片資料庫、卡背 SVG、音效合成、卡片格線渲染
// 由 host.html 與 player.html 共用，維持與 index.html（單機版）一致的美術與音效

const cardsDatabase = [
    { id: "doc2607061-01-蘋果", name: "蘋果", imageA: "images/DOC2607061_01_apple_A.png", imageB: "images/DOC2607061_01_apple_B.png" },
    { id: "doc2607061-02-男孩", name: "男孩", imageA: "images/DOC2607061_02_boy_A.png", imageB: "images/DOC2607061_02_boy_B.png" },
    { id: "doc2607061-03-猴子", name: "猴子", imageA: "images/DOC2607061_03_monkey_A.png", imageB: "images/DOC2607061_03_monkey_B.png" },
    { id: "doc2607061-04-毛毛蟲", name: "毛毛蟲", imageA: "images/DOC2607061_04_caterpillar_A.png", imageB: "images/DOC2607061_04_caterpillar_B.png" },
    { id: "doc2607061-05-花", name: "花", imageA: "images/DOC2607061_05_flower_A.png", imageB: "images/DOC2607061_05_flower_B.png" },
    { id: "doc2607061-06-女孩", name: "女孩", imageA: "images/DOC2607061_06_girl_A.png", imageB: "images/DOC2607061_06_girl_B.png" },
    { id: "doc2607061-07-小雞", name: "小雞", imageA: "images/DOC2607061_07_chick_A.png", imageB: "images/DOC2607061_07_chick_B.png" },
    { id: "doc2607061-08-鉛筆", name: "鉛筆", imageA: "images/DOC2607061_08_pencil_A.png", imageB: "images/DOC2607061_08_pencil_B.png" },
    { id: "doc2607061-09-水龍頭", name: "水龍頭", imageA: "images/DOC2607061_09_faucet_A.png", imageB: "images/DOC2607061_09_faucet_B.png" },
    { id: "doc2607061-10-餐盤", name: "餐盤", imageA: "images/DOC2607061_10_plate_A.png", imageB: "images/DOC2607061_10_plate_B.png" },
    { id: "doc260706-01-小鳥", name: "小鳥", imageA: "images/DOC260706_01_bird_A.png", imageB: "images/DOC260706_01_bird_B.png" },
    { id: "doc260706-02-杯子蛋糕", name: "杯子蛋糕", imageA: "images/DOC260706_02_cupcake_A.png", imageB: "images/DOC260706_02_cupcake_B.png" },
    { id: "doc260706-03-樹", name: "樹", imageA: "images/DOC260706_03_tree_A.png", imageB: "images/DOC260706_03_tree_B.png" },
    { id: "doc260706-04-房子", name: "房子", imageA: "images/DOC260706_04_house_A.png", imageB: "images/DOC260706_04_house_B.png" },
    { id: "doc260706-05-牛", name: "牛", imageA: "images/DOC260706_05_cow_A.png", imageB: "images/DOC260706_05_cow_B.png" },
    { id: "doc260706-06-時鐘", name: "時鐘", imageA: "images/DOC260706_06_clock_A.png", imageB: "images/DOC260706_06_clock_B.png" },
    { id: "doc260706-07-鞦韆", name: "鞦韆", imageA: "images/DOC260706_07_swing_A.png", imageB: "images/DOC260706_07_swing_B.png" },
    { id: "doc260706-08-狗", name: "狗", imageA: "images/DOC260706_08_dog_A.png", imageB: "images/DOC260706_08_dog_B.png" },
    { id: "doc260706-09-太陽", name: "太陽", imageA: "images/DOC260706_09_sun_A.png", imageB: "images/DOC260706_09_sun_B.png" },
    { id: "doc260706-10-氣球", name: "氣球", imageA: "images/DOC260706_10_balloon_A.png", imageB: "images/DOC260706_10_balloon_B.png" },
    { id: "doc260706-11-公雞", name: "公雞", imageA: "images/DOC260706_11_rooster_A.png", imageB: "images/DOC260706_11_rooster_B.png" },
    { id: "doc260706-12-積木", name: "積木", imageA: "images/DOC260706_12_blocks_A.png", imageB: "images/DOC260706_12_blocks_B.png" },
    { id: "doc260706-13-寶箱", name: "寶箱", imageA: "images/DOC260706_13_chest_A.png", imageB: "images/DOC260706_13_chest_B.png" },
    { id: "doc260706-14-稻草人", name: "稻草人", imageA: "images/DOC260706_14_scarecrow_A.png", imageB: "images/DOC260706_14_scarecrow_B.png" },
    { id: "doc260706-15-跳繩女孩", name: "跳繩女孩", imageA: "images/DOC260706_15_skipping_girl_A.png", imageB: "images/DOC260706_15_skipping_girl_B.png" },
    { id: "doc260706-16-海豚", name: "海豚", imageA: "images/DOC260706_16_dolphin_A.png", imageB: "images/DOC260706_16_dolphin_B.png" },
    { id: "doc260706-17-雪人", name: "雪人", imageA: "images/DOC260706_17_snowman_A.png", imageB: "images/DOC260706_17_snowman_B.png" },
    { id: "doc260706-18-變色龍", name: "變色龍", imageA: "images/DOC260706_18_chameleon_A.png", imageB: "images/DOC260706_18_chameleon_B.png" },
    { id: "doc260706-19-魚缸", name: "魚缸", imageA: "images/DOC260706_19_fishbowl_A.png", imageB: "images/DOC260706_19_fishbowl_B.png" },
    { id: "doc260706-20-紅綠燈", name: "紅綠燈", imageA: "images/DOC260706_20_traffic_light_A.png", imageB: "images/DOC260706_20_traffic_light_B.png" },
    { id: "doc260706-21-小丑", name: "小丑", imageA: "images/DOC260706_21_clown_A.png", imageB: "images/DOC260706_21_clown_B.png" },
];

function cardById(id) {
    return cardsDatabase.find((c) => c.id === id);
}

// --- 音效合成（與單機版 index.html 完全相同） ---
let isSoundOn = true;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type) {
    if (!isSoundOn) return;
    try {
        initAudio();
        const now = audioCtx.currentTime;
        if (type === 'tick') {
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.type = 'triangle'; osc.frequency.setValueAtTime(1000, now);
            gain.gain.setValueAtTime(0.04, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
        } else if (type === 'flip') {
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.type = 'sine'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
            gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now); osc.stop(now + 0.15);
        } else if (type === 'correct') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
                const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.type = 'sine'; osc.frequency.setValueAtTime(freq, now + index * 0.08);
                gain.gain.setValueAtTime(0.1, now + index * 0.08); gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);
                osc.start(now + index * 0.08); osc.stop(now + index * 0.08 + 0.25);
            });
        } else if (type === 'incorrect') {
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(260, now); osc.frequency.linearRampToValueAtTime(100, now + 0.45);
            gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.start(now); osc.stop(now + 0.45);
        } else if (type === 'magic') {
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(2400, now + 0.4);
            gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
        }
    } catch (e) { console.warn("音效撥放受限：", e); }
}

function getCardBackSVG() {
    return `<svg viewBox="0 0 140 200" class="w-full h-full bg-[#e2e7e5] rounded-xl border-4 border-[#e6dfd3] shadow-sm">
        <defs><pattern id="jp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 12 M 0 0 L 12 12" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.45"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#jp-grid)" />
        <circle cx="70" cy="100" r="28" fill="none" stroke="#faf6f0" stroke-width="2" stroke-dasharray="4 2" />
        <circle cx="70" cy="100" r="22" fill="#faf6f0" />
        <text x="70" y="106" font-family="sans-serif" font-size="20" fill="#8c8273" text-anchor="middle">🔍</text>
        <rect x="5" y="5" width="130" height="190" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.5" rx="8"/>
    </svg>`;
}

function getCardGraphic(card, side) {
    const imgSrc = side === 'A' ? card.imageA : card.imageB;
    return `<img src="${imgSrc}" class="w-full h-full object-contain rounded-lg select-none pointer-events-none" alt="${card.name}">`;
}

function cardSizeClasses(cardCount) {
    if (cardCount === 5) return "w-32 h-44 sm:w-36 sm:h-52 md:w-44 md:h-60";
    if (cardCount === 6) return "w-28 h-40 sm:w-32 sm:h-44 md:w-36 md:h-50";
    if (cardCount > 6) return "w-20 h-28 sm:w-24 sm:h-34 md:w-26 md:h-38";
    return "w-36 h-50 sm:w-44 sm:h-60 md:w-48 md:h-64";
}

// 渲染卡片格線；opts.onPick(idx) 存在時卡片才可點擊
function renderCardGrid(container, cards, opts = {}) {
    container.innerHTML = '';
    const sizeClasses = cardSizeClasses(cards.length);
    cards.forEach((card, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = `perspective-1000 relative select-none ${sizeClasses} group ${opts.onPick ? 'cursor-pointer' : ''}`;
        wrapper.setAttribute('data-index', idx);
        const keyLabel = idx < 9
            ? `<div class="absolute -top-2 -left-2 bg-stone-50 border border-stone-200 text-stone-500 font-mono text-xs w-5 h-5 rounded-full flex items-center justify-center z-30 shadow-sm">${idx + 1}</div>`
            : '';
        wrapper.innerHTML = `
            ${keyLabel}
            <div class="card-inner w-full h-full preserve-3d relative rounded-2xl shadow-sm transition-all duration-500">
                <div class="card-front absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl border-4 border-stone-100 p-1 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                    <div class="w-full h-full flex items-center justify-center overflow-hidden pb-3.5">${getCardGraphic(card, 'A')}</div>
                    <div class="absolute bottom-0.5 left-0 right-0 text-[9px] text-stone-400 font-bold tracking-wider select-none text-center bg-white/80 py-0.5 border-t border-stone-100/50">${card.name}</div>
                </div>
                <div class="card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl">${getCardBackSVG()}</div>
            </div>
        `;
        if (opts.onPick) wrapper.addEventListener('click', () => opts.onPick(idx));
        container.appendChild(wrapper);
    });
}

function flipCardGrid(container, flipped) {
    container.querySelectorAll('.card-inner').forEach((el) => el.classList.toggle('is-flipped', flipped));
}

function swapCardFront(container, idx, card, side) {
    const wrapper = container.querySelector(`[data-index="${idx}"]`);
    if (!wrapper) return;
    const frontEl = wrapper.querySelector('.card-front');
    frontEl.innerHTML = `
        <div class="w-full h-full flex items-center justify-center overflow-hidden pb-3.5">${getCardGraphic(card, side)}</div>
        <div class="absolute bottom-0.5 left-0 right-0 text-[9px] text-stone-400 font-bold tracking-wider select-none text-center bg-white/80 py-0.5 border-t border-stone-100/50">${card.name}</div>
    `;
}

function updateTimerBar(barEl, textEl, timeLeft, maxTime) {
    const pct = maxTime > 0 ? Math.max(0, Math.min(100, (timeLeft / maxTime) * 100)) : 0;
    barEl.style.width = pct + '%';
    textEl.textContent = Math.max(0, timeLeft).toFixed(1) + ' 秒';
}
