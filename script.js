// ===================== DATA IMPORT =====================
// Data will be imported from data.js: surahData, recitersList, quranSources, adhkarData

// State
let currentUser = null;
let systemInfo = {};
let uploadedPages = JSON.parse(localStorage.getItem('uploadedPages') || '[]');
let favorites = JSON.parse(localStorage.getItem('quranFavorites') || '[]');
let comments = JSON.parse(localStorage.getItem('quranComments') || '[]');
let activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
let currentSurah = null;
let audioPlayer = null;
let isPlaying = false;
let permissionsGranted = { location: false, notification: false, camera: false };
let adhkarCounter = 0;
let confirmationResult = null;

// ===================== INITIALIZATION =====================
window.onload = async function() {
    audioPlayer = document.getElementById('audioPlayer');
    await performSecurityCheck();
};

// ===================== SECURITY CHECK (NO EXTERNAL API) =====================
async function performSecurityCheck() {
    try {
        // Get IP using WebRTC (internal)
        const ip = await getIPInternal();
        
        // Check for VPN patterns
        const vpnPatterns = [/^10\./, /^172\.(1[6-9]|2[0-9]|3[01])\./, /^192\.168\./, /^127\./];
        const isVPN = vpnPatterns.some(p => p.test(ip));
        
        // Check for WebRTC leaks
        const hasWebRTCLeak = await checkWebRTCLeak();
        
        // Get system info
        systemInfo = {
            ip: ip,
            isVPN: isVPN,
            hasWebRTCLeak: hasWebRTCLeak,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cores: navigator.hardwareConcurrency || 'unknown',
            memory: navigator.deviceMemory || 'unknown',
            connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            online: navigator.onLine
        };

        if (isVPN || hasWebRTCLeak) {
            document.getElementById('securityAlert').classList.add('active');
            document.getElementById('vpnBadge').classList.add('active');
            updateSystemPanel('blocked');
            setTimeout(() => {
                alert('تم الكشف عن استخدام VPN/DNS غير مصرح. الوصول مرفوض.');
                window.location.href = 'about:blank';
            }, 2000);
            return;
        }

        updateSystemPanel('clean');
        
    } catch (e) {
        systemInfo = { 
            ip: '127.0.0.1', 
            isVPN: false, 
            hasWebRTCLeak: false,
            userAgent: navigator.userAgent,
            platform: navigator.platform
        };
        updateSystemPanel('unknown');
    }
}

// Get IP without external API using WebRTC
function getIPInternal() {
    return new Promise((resolve) => {
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        
        pc.onicecandidate = (e) => {
            if (!e.candidate) {
                resolve('127.0.0.1');
                return;
            }
            const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(e.candidate.candidate);
            if (ipMatch) {
                resolve(ipMatch[0]);
            }
        };
        
        pc.createOffer().then(o => pc.setLocalDescription(o));
        
        setTimeout(() => resolve('127.0.0.1'), 1000);
    });
}

// Check WebRTC leak
async function checkWebRTCLeak() {
    try {
        const pc1 = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        
        let publicIP = null;
        let localIP = null;
        
        pc1.onicecandidate = (e) => {
            if (e.candidate) {
                const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(e.candidate.candidate);
                if (ipMatch) {
                    const ip = ipMatch[0];
                    if (!ip.startsWith('192.168.') && !ip.startsWith('10.') && !ip.startsWith('172.')) {
                        publicIP = ip;
                    } else {
                        localIP = ip;
                    }
                }
            }
        };
        
        pc1.createDataChannel('test');
        const offer = await pc1.createOffer();
        await pc1.setLocalDescription(offer);
        
        await new Promise(r => setTimeout(r, 1000));
        
        pc1.close();
        
        return publicIP !== null && localIP !== null && publicIP !== localIP;
    } catch (e) {
        return false;
    }
}

function updateSystemPanel(status) {
    const details = document.getElementById('systemDetails');
    const btn = document.getElementById('enterBtn');
    
    let statusHtml = '';
    if (status === 'blocked') {
        statusHtml = `<div class="info-row"><span class="info-label">⚠️ الحالة:</span><span class="info-value danger">محظور</span></div>`;
        btn.textContent = 'وصول محظور';
        btn.disabled = true;
    } else if (status === 'clean') {
        statusHtml = `
            <div class="info-row"><span class="info-label">🌐 IP:</span><span class="info-value">${systemInfo.ip}</span></div>
            <div class="info-row"><span class="info-label">💻 المنصة:</span><span class="info-value">${systemInfo.platform}</span></div>
            <div class="info-row"><span class="info-label">🖥️ الشاشة:</span><span class="info-value">${systemInfo.screen}</span></div>
            <div class="info-row"><span class="info-label">⚙️ المعالج:</span><span class="info-value">${systemInfo.cores} أنوية</span></div>
            <div class="info-row"><span class="info-label">🛡️ VPN:</span><span class="info-value success">آمن</span></div>
            <div class="info-row"><span class="info-label">🌍 التوقيت:</span><span class="info-value">${systemInfo.timezone}</span></div>
        `;
        btn.textContent = 'دخول الموقع';
        btn.disabled = false;
        btn.style.opacity = '1';
    } else {
        statusHtml = `<div class="info-row"><span class="info-label">⚠️ خطأ:</span><span class="info-value danger">فشل الفحص</span></div>`;
        btn.textContent = 'إعادة المحاولة';
        btn.disabled = false;
    }
    
    details.innerHTML = statusHtml;
}

// ===================== PERMISSIONS =====================
async function requestAllPermissions() {
    const btn = document.getElementById('grantBtn');
    btn.disabled = true;
    btn.textContent = 'جاري طلب الأذونات...';

    // Location
    try {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
        });
        systemInfo.lat = pos.coords.latitude;
        systemInfo.lng = pos.coords.longitude;
        systemInfo.accuracy = pos.coords.accuracy;
        updateStatus('location', 'مُصرح', 'granted');
        permissionsGranted.location = true;
    } catch (e) {
        updateStatus('location', 'مرفوض', 'denied');
    }

    // Notifications
    try {
        const perm = await Notification.requestPermission();
        updateStatus('notification', perm === 'granted' ? 'مُصرح' : 'مرفوض', perm === 'granted' ? 'granted' : 'denied');
        permissionsGranted.notification = perm === 'granted';
    } catch (e) {
        updateStatus('notification', 'غير مدعوم', 'denied');
    }

    // Camera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(t => t.stop());
        updateStatus('camera', 'مُصرح', 'granted');
        permissionsGranted.camera = true;
    } catch (e) {
        updateStatus('camera', 'مرفوض', 'denied');
    }

    setTimeout(() => {
        document.getElementById('permissionScreen').style.display = 'none';
        document.getElementById('splashScreen').classList.add('active');
    }, 1000);
}

function skipPermissions() {
    document.getElementById('permissionScreen').style.display = 'none';
    document.getElementById('splashScreen').classList.add('active');
}

function updateStatus(type, text, status) {
    const el = document.getElementById(`status-${type}`);
    el.textContent = text;
    el.className = `permission-status status-${status}`;
}

// ===================== APP ENTRY =====================
function enterWebsite() {
    document.getElementById('splashScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.add('active');
    initApp();
}

function enterAsGuest() {
    currentUser = { name: 'ضيف', isGuest: true, time: new Date().toISOString() };
    enterWebsite();
}

function initApp() {
    renderSurahs();
    renderReciters();
    renderSources();
    renderFavorites();
    renderUploadedPages();
    renderComments();
    updateSecurityPanel();
    startClock();
    checkSeasonal();
    showAdhkarCategory('morning');
    logActivity('دخول المستخدم', 'security');
    
    // Setup audio player events
    if (audioPlayer) {
        audioPlayer.ontimeupdate = updateProgress;
        audioPlayer.onloadedmetadata = () => {
            document.getElementById('duration').textContent = formatTime(audioPlayer.duration);
        };
        audioPlayer.onended = () => {
            isPlaying = false;
            document.getElementById('playBtn').textContent = '▶';
        };
    }
}

// ===================== RENDER FUNCTIONS =====================
function renderSurahs() {
    const grid = document.getElementById('surahGrid');
    grid.innerHTML = surahData.map(s => `
        <div class="surah-card" onclick="openSurah(${s.number})">
            <div class="surah-number">${s.number}</div>
            <div class="surah-name">${s.name}</div>
            <div class="surah-info">${s.verses} آية</div>
            <div class="surah-meta">
                <span class="meta-tag">${s.type}</span>
                <span class="meta-tag">${s.verses}</span>
            </div>
        </div>
    `).join('');
}

function renderReciters() {
    const list = document.getElementById('recitersList');
    list.innerHTML = recitersList.map((r, i) => `
        <div class="reciter-card" onclick="selectReciter(${i})" id="reciter-${i}">
            <div style="font-weight: bold; color: var(--secondary); font-size: 1.1rem;">${r.name}</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">${r.type} | ${r.country}</div>
        </div>
    `).join('');
}

function filterReciters(query) {
    const cards = document.querySelectorAll('#recitersList .reciter-card');
    cards.forEach((card, i) => {
        const name = recitersList[i].name;
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function selectReciter(index) {
    document.querySelectorAll('.reciter-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`reciter-${index}`).classList.add('active');
    document.getElementById('reciterSelect').value = recitersList[index].url;
    logActivity(`اختيار قارئ: ${recitersList[index].name}`, 'reciter');
}

function renderSources() {
    const list = document.getElementById('sourcesList');
    list.innerHTML = quranSources.map(s => `
        <div class="source-card" onclick="window.open('${s.url}', '_blank')">
            <div class="source-name">${s.name}</div>
            <div style="color: rgba(255,255,255,0.8); margin-bottom: 10px; font-size: 0.95rem;">${s.desc}</div>
            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); word-break: break-all;">${s.url}</div>
        </div>
    `).join('');
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    if (!favorites.length) {
        grid.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.5); padding: 50px;">لا توجد مفضلات</p>';
        return;
    }
    grid.innerHTML = favorites.map(f => `
        <div class="favorite-item">
            <button class="remove-fav" onclick="removeFavorite(${f.number})">×</button>
            <div class="surah-name">${f.name}</div>
            <div style="color: rgba(255,255,255,0.7); margin-bottom: 15px;">${f.verses} آية - ${f.type}</div>
            <button class="control-btn" onclick="openSurah(${f.number})" style="width: 100%;">فتح</button>
        </div>
    `).join('');
}

function renderUploadedPages() {
    const container = document.getElementById('uploadedPages');
    if (!uploadedPages.length) {
        container.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.5);">لا توجد ملفات مرفوعة</p>';
        return;
    }
    container.innerHTML = uploadedPages.map(p => `
        <div class="page-card ${p.statusClass}">
            <div class="page-header">
                <h4 style="color: var(--secondary);">${p.filename}</h4>
                <span class="page-status status-${p.statusClass}">${p.status}</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--accent); margin-bottom: 10px;">${p.reason}</div>
            <div class="page-content">${escapeHtml(p.content)}</div>
            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 10px;">
                ${p.date} | ${p.user} | ${p.ip}
            </div>
            ${p.status === 'مقبول' ? `
                <button class="btn-primary" onclick="viewFullContent(${p.id})" style="margin-top: 15px; width: 100%;">عرض كامل</button>
            ` : ''}
        </div>
    `).join('');
}

function renderComments() {
    const list = document.getElementById('commentsList');
    if (!comments.length) {
        list.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.5);">لا تعليقات</p>';
        return;
    }
    list.innerHTML = comments.map(c => `
        <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px; border-right: 3px solid var(--secondary);">
            <div style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-bottom: 8px;">${c.date} | ${c.name} | ${c.type}</div>
            <div>${escapeHtml(c.text)}</div>
        </div>
    `).join('');
}

// ===================== ADHKAR =====================
function showAdhkarCategory(category) {
    document.querySelectorAll('.adhkar-cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const content = document.getElementById('adhkarContent');
    const adhkar = adhkarData[category] || [];
    
    content.innerHTML = adhkar.map((item, index) => `
        <div class="adhkar-item" onclick="setCounter(${item.count})">
            <div class="adhkar-text">${item.text}</div>
            <div class="adhkar-translation">${item.translation}</div>
            <div class="adhkar-reference">📚 ${item.reference}</div>
            <div class="adhkar-count">التكرار: ${item.count}</div>
        </div>
    `).join('');
}

function setCounter(count) {
    adhkarCounter = count;
    document.getElementById('counterDisplay').textContent = count;
}

function incrementCounter() {
    if (adhkarCounter > 0) {
        adhkarCounter--;
        document.getElementById('counterDisplay').textContent = adhkarCounter;
    }
}

function resetCounter() {
    adhkarCounter = 0;
    document.getElementById('counterDisplay').textContent = 0;
}

// ===================== QURAN FUNCTIONS =====================
function openSurah(num) {
    // Clear previous content immediately
    document.getElementById('ayahsContainer').innerHTML = '<p style="text-align: center; color: var(--secondary); padding: 50px;">جاري تحميل السورة...</p>';
    
    currentSurah = surahData.find(s => s.number === num);
    if (!currentSurah) return;
    
    showSection('reader');
    document.getElementById('currentSurahName').textContent = `سورة ${currentSurah.name}`;
    document.getElementById('surahIndicator').textContent = `سورة ${currentSurah.name}`;
    
    // Update navigation buttons
    document.getElementById('prevSurahBtn').disabled = currentSurah.number === 1;
    document.getElementById('nextSurahBtn').disabled = currentSurah.number === 114;
    
    // Generate ayahs (simplified without API)
    generateAyahs(num);
    
    setupAudio(num);
    logActivity(`فتح سورة ${currentSurah.name}`, 'quran');
}

function generateAyahs(surahNum) {
    const container = document.getElementById('ayahsContainer');
    const surah = surahData.find(s => s.number === surahNum);
    
    // Generate placeholder ayahs (in real app, this would be actual Quran text)
    let html = '';
    for (let i = 1; i <= Math.min(surah.verses, 10); i++) {
        html += `
            <div class="ayah-item" id="ayah-${i}" onclick="highlightAyah(${i})">
                <span class="ayah-text-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ <span class="ayah-number-inline">${i}</span></span>
            </div>
        `;
    }
    
    if (surah.verses > 10) {
        html += `<div style="text-align: center; padding: 20px; color: var(--secondary);">... ${surah.verses - 10} آيات أخرى ...</div>`;
    }
    
    container.innerHTML = html;
}

function navigateSurah(direction) {
    if (!currentSurah) return;
    const newNum = currentSurah.number + direction;
    if (newNum >= 1 && newNum <= 114) {
        openSurah(newNum);
    }
}

function setupAudio(surahNum) {
    const reciter = document.getElementById('reciterSelect').value;
    const surahStr = surahNum.toString().padStart(3, '0');
    
    if (audioPlayer) {
        audioPlayer.src = `${reciter}/${surahStr}.mp3`;
        audioPlayer.load();
    }
}

function togglePlay() {
    if (!audioPlayer || !audioPlayer.src) {
        alert('اختر سورة أولاً');
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById('playBtn').textContent = '▶';
    } else {
        audioPlayer.play().catch(e => console.log('Audio play failed:', e));
        document.getElementById('playBtn').textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function changeReciter() {
    if (currentSurah) setupAudio(currentSurah.number);
}

function updateProgress() {
    if (!audioPlayer || !audioPlayer.duration) return;
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentTime').textContent = formatTime(audioPlayer.currentTime);
}

function seek(e) {
    if (!audioPlayer) return;
    const bar = e.currentTarget;
    const pos = e.offsetX / bar.offsetWidth;
    audioPlayer.currentTime = pos * audioPlayer.duration;
}

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function highlightAyah(idx) {
    document.querySelectorAll('.ayah-item').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`ayah-${idx}`);
    if (el) el.classList.add('active');
}

function toggleTafsir() {
    document.getElementById('tafsirContainer').classList.toggle('active');
}

function addToFavorites() {
    if (!currentSurah) return;
    if (!favorites.find(f => f.number === currentSurah.number)) {
        favorites.push(currentSurah);
        localStorage.setItem('quranFavorites', JSON.stringify(favorites));
        renderFavorites();
        alert('تمت الإضافة للمفضلة');
    }
}

function removeFavorite(num) {
    favorites = favorites.filter(f => f.number !== num);
    localStorage.setItem('quranFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function downloadAudio() {
    if (!currentSurah) return;
    const reciter = document.getElementById('reciterSelect').value;
    const surahStr = currentSurah.number.toString().padStart(3, '0');
    window.open(`${reciter}/${surahStr}.mp3`, '_blank');
}

function changeTranslation() {
    // Placeholder for translation change
    console.log('Translation changed');
}

function copyAyah() {
    alert('تم نسخ النص!');
}

// ===================== UPLOAD SYSTEM =====================
function handleDragOver(e) { 
    e.preventDefault(); 
    e.currentTarget.classList.add('dragover'); 
}

function handleDragLeave(e) { 
    e.currentTarget.classList.remove('dragover'); 
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
}

function handleFileSelect(e) { 
    if (e.target.files[0]) processFile(e.target.files[0]); 
}

function processFile(file) {
    if (file.size > 10 * 1024 * 1024) { 
        alert('الملف كبير جداً'); 
        return; 
    }
    
    const reader = new FileReader();
    reader.onload = (e) => analyzeContent(e.target.result, file.name);
    reader.readAsText(file);
}

function submitDirectText() {
    const text = document.getElementById('directText').value.trim();
    if (!text) return;
    analyzeContent(text, 'نص مباشر');
}

function analyzeContent(content, filename) {
    const religiousWords = ['الله', 'محمد', 'قرآن', 'سورة', 'آية', 'حديث', 'إسلام', 'صلاة', 'نبي', 'رسول', 'بسم', 'الحمد', 'سور', 'اية'];
    const forbiddenWords = ['porn', 'sex', 'xxx', 'nude', 'gambling', 'alcohol', 'beer', 'drugs'];
    
    const hasReligious = religiousWords.some(w => content.includes(w));
    const hasForbidden = forbiddenWords.some(w => content.toLowerCase().includes(w));

    let status, statusClass, reason;
    if (hasForbidden) { 
        status = 'مرفوض'; 
        statusClass = 'rejected'; 
        reason = 'محتوى محظور'; 
    } else if (hasReligious) { 
        status = 'مقبول'; 
        statusClass = 'approved'; 
        reason = 'محتوى إسلامي'; 
    } else { 
        status = 'قيد المراجعة'; 
        statusClass = 'pending'; 
        reason = 'يحتاج مراجعة'; 
    }

    const page = {
        id: Date.now(),
        filename, 
        content: content.substring(0, 400) + '...',
        fullContent: content,
        status, 
        statusClass, 
        reason,
        date: new Date().toLocaleString('ar-SA'),
        user: currentUser ? currentUser.name : 'زائر',
        ip: systemInfo.ip
    };

    uploadedPages.unshift(page);
    localStorage.setItem('uploadedPages', JSON.stringify(uploadedPages));
    renderUploadedPages();
    logActivity(`رفع ملف: ${filename}`, 'upload');
    alert(`الحالة: ${status}\n${reason}`);
}

function viewFullContent(id) {
    const page = uploadedPages.find(p => p.id === id);
    if (!page) return;
    
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <title>${page.filename}</title>
            <style>
                body { font-family: 'Amiri', serif; padding: 40px; background: #f5f5f5; line-height: 2; }
                .content { background: white; padding: 40px; border-radius: 10px; max-width: 800px; margin: 0 auto; }
                h1 { color: #1a237e; text-align: center; }
            </style>
        </head>
        <body>
            <div class="content">
                <h1>${page.filename}</h1>
                <div style="text-align: center; color: #666; margin-bottom: 30px;">${page.date} | ${page.user}</div>
                <div style="font-size: 1.3rem; white-space: pre-wrap;">${escapeHtml(page.fullContent)}</div>
            </div>
        </body>
        </html>
    `);
}

// ===================== COMMENTS =====================
function submitComment() {
    const name = document.getElementById('commentName').value.trim() || 'زائر';
    const type = document.getElementById('commentType').value;
    const text = document.getElementById('commentText').value.trim();
    
    if (!text) { 
        alert('أدخل تعليقاً'); 
        return; 
    }
    
    comments.unshift({
        id: Date.now(), 
        name, 
        type, 
        text,
        date: new Date().toLocaleString('ar-SA'),
        ip: systemInfo.ip
    });
    
    localStorage.setItem('quranComments', JSON.stringify(comments));
    renderComments();
    document.getElementById('commentText').value = '';
    logActivity('تعليق جديد', 'comment');
    alert('تم الإرسال!');
}

// ===================== SEARCH (LOCAL ONLY) =====================
function searchAll(e) {
    if (e.key !== 'Enter') return;
    
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    
    const results = document.getElementById('searchResults');
    results.innerHTML = '<p style="text-align: center; color: var(--secondary);">جاري البحث...</p>';
    
    // Local search in surah names
    const matches = surahData.filter(s => 
        s.name.includes(query) || 
        s.number.toString() === query
    );
    
    if (matches.length) {
        results.innerHTML = matches.map(m => `
            <div class="result-card" onclick="openSurah(${m.number})">
                <span style="display: inline-block; padding: 5px 15px; background: rgba(255,215,0,0.2); color: var(--secondary); border-radius: 15px; font-size: 0.85rem; margin-bottom: 10px;">سورة ${m.name}</span>
                <h3 style="color: var(--secondary);">${m.name}</h3>
                <p style="margin-top: 10px;">${m.verses} آية - ${m.type}</p>
            </div>
        `).join('');
    } else {
        results.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5);">لا نتائج</p>';
    }
}

function setFilter(filter) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// ===================== SECURITY PANEL =====================
function updateSecurityPanel() {
    const grid = document.getElementById('securityGrid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div class="security-item"><div class="security-label">IP</div><div class="security-value">${systemInfo.ip}</div></div>
        <div class="security-item"><div class="security-label">المنصة</div><div class="security-value">${systemInfo.platform}</div></div>
        <div class="security-item"><div class="security-label">الموقع</div><div class="security-value">${systemInfo.lat ? systemInfo.lat.toFixed(4) + ',' + systemInfo.lng.toFixed(4) : 'غير متوفر'}</div></div>
        <div class="security-item"><div class="security-label">الشاشة</div><div class="security-value">${systemInfo.screen}</div></div>
        <div class="security-item"><div class="security-label">التوقيت</div><div class="security-value">${systemInfo.timezone}</div></div>
        <div class="security-item"><div class="security-label">الأذونات</div><div class="security-value">${Object.values(permissionsGranted).filter(Boolean).length}/3</div></div>
    `;
    
    // Update header
    const userIp = document.getElementById('userIp');
    const userDevice = document.getElementById('userDevice');
    const userLocation = document.getElementById('userLocation');
    const userStatus = document.getElementById('userStatus');
    
    if (userIp) userIp.textContent = `IP: ${systemInfo.ip}`;
    if (userDevice) userDevice.textContent = `جهاز: ${systemInfo.platform.substring(0, 10)}`;
    if (userLocation) userLocation.textContent = `الموقع: ${systemInfo.lat ? 'محدد' : 'غير محدد'}`;
    if (userStatus) userStatus.textContent = `حالة: ${currentUser ? currentUser.name : 'زائر'}`;
}

function logActivity(action, type) {
    activityLog.unshift({ 
        action, 
        type, 
        time: new Date().toLocaleString('ar-SA'), 
        ip: systemInfo.ip 
    });
    if (activityLog.length > 30) activityLog.pop();
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
    updateActivityLog();
}

function updateActivityLog() {
    const log = document.getElementById('activityLog');
    if (!log) return;
    
    log.innerHTML = activityLog.map(l => `
        <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <div style="color: var(--secondary);">${l.action}</div>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">${l.time} | ${l.ip}</div>
        </div>
    `).join('');
}

// ===================== LOGIN SYSTEM (SIMULATED) =====================
function loginWithGoogle() {
    // Simulated Google login
    currentUser = {
        name: 'مستخدم Google',
        email: 'user@gmail.com',
        photo: 'https://via.placeholder.com/100',
        isGuest: false
    };
    updateLoginUI();
    logActivity('تسجيل دخول Google', 'login');
    alert('تم تسجيل الدخول بنجاح!');
}

function showPhoneLogin() {
    document.getElementById('phoneLoginForm').style.display = 'block';
}

function sendPhoneCode() {
    const phone = document.getElementById('phoneNumber').value.trim();
    if (!phone || !phone.startsWith('+')) {
        alert('أدخل رقم هاتف صحيح مع رمز الدولة (مثال: +966501234567)');
        return;
    }
    
    // Simulated SMS sending
    alert(`تم إرسال رمز التحقق إلى ${phone}`);
    document.getElementById('codeVerification').style.display = 'block';
    confirmationResult = { phone: phone, code: '123456' }; // Simulated code
}

function verifyPhoneCode() {
    const code = document.getElementById('smsCode').value.trim();
    if (code === '123456') { // Simulated verification
        currentUser = {
            name: 'مستخدم هاتف',
            phone: confirmationResult.phone,
            isGuest: false
        };
        updateLoginUI();
        logActivity('تسجيل دخول هاتف', 'login');
        alert('تم التحقق بنجاح!');
    } else {
        alert('رمز التحقق غير صحيح');
    }
}

// ===================== UTILITY FUNCTIONS =====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function startClock() {
    // Placeholder for clock functionality
    console.log('Clock started');
}

function checkSeasonal() {
    // Placeholder for seasonal checks
    console.log('Seasonal check completed');
}

function showSection(sectionName) {
    // Placeholder for section navigation
    console.log('Showing section:', sectionName);
}

function updateLoginUI() {
    // Placeholder for login UI update
    console.log('Login UI updated for:', currentUser ? currentUser.name : 'Guest');
}

// ===================== END OF script.js =====================
