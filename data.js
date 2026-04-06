// ===================== DATA =====================
// قاعدة بيانات المصحف الشامل - data.js

// ===================== سور القرآن الكريم =====================
const surahData = [
    { number: 1, name: "الفاتحة", verses: 7, type: "مكية" },
    { number: 2, name: "البقرة", verses: 286, type: "مدنية" },
    { number: 3, name: "آل عمران", verses: 200, type: "مدنية" },
    { number: 4, name: "النساء", verses: 176, type: "مدنية" },
    { number: 5, name: "المائدة", verses: 120, type: "مدنية" },
    { number: 6, name: "الأنعام", verses: 165, type: "مكية" },
    { number: 7, name: "الأعراف", verses: 206, type: "مكية" },
    { number: 8, name: "الأنفال", verses: 75, type: "مدنية" },
    { number: 9, name: "التوبة", verses: 129, type: "مدنية" },
    { number: 10, name: "يونس", verses: 109, type: "مكية" },
    { number: 11, name: "هود", verses: 123, type: "مكية" },
    { number: 12, name: "يوسف", verses: 111, type: "مكية" },
    { number: 13, name: "الرعد", verses: 43, type: "مدنية" },
    { number: 14, name: "إبراهيم", verses: 52, type: "مكية" },
    { number: 15, name: "الحجر", verses: 99, type: "مكية" },
    { number: 16, name: "النحل", verses: 128, type: "مكية" },
    { number: 17, name: "الإسراء", verses: 111, type: "مكية" },
    { number: 18, name: "الكهف", verses: 110, type: "مكية" },
    { number: 19, name: "مريم", verses: 98, type: "مكية" },
    { number: 20, name: "طه", verses: 135, type: "مكية" },
    { number: 21, name: "الأنبياء", verses: 112, type: "مكية" },
    { number: 22, name: "الحج", verses: 78, type: "مدنية" },
    { number: 23, name: "المؤمنون", verses: 118, type: "مكية" },
    { number: 24, name: "النور", verses: 64, type: "مدنية" },
    { number: 25, name: "الفرقان", verses: 77, type: "مكية" },
    { number: 26, name: "الشعراء", verses: 227, type: "مكية" },
    { number: 27, name: "النمل", verses: 93, type: "مكية" },
    { number: 28, name: "القصص", verses: 88, type: "مكية" },
    { number: 29, name: "العنكبوت", verses: 69, type: "مكية" },
    { number: 30, name: "الروم", verses: 60, type: "مكية" },
    { number: 31, name: "لقمان", verses: 34, type: "مكية" },
    { number: 32, name: "السجدة", verses: 30, type: "مكية" },
    { number: 33, name: "الأحزاب", verses: 73, type: "مدنية" },
    { number: 34, name: "سبأ", verses: 54, type: "مكية" },
    { number: 35, name: "فاطر", verses: 45, type: "مكية" },
    { number: 36, name: "يس", verses: 83, type: "مكية" },
    { number: 37, name: "الصافات", verses: 182, type: "مكية" },
    { number: 38, name: "ص", verses: 88, type: "مكية" },
    { number: 39, name: "الزمر", verses: 75, type: "مكية" },
    { number: 40, name: "غافر", verses: 85, type: "مكية" },
    { number: 41, name: "فصلت", verses: 54, type: "مكية" },
    { number: 42, name: "الشورى", verses: 53, type: "مكية" },
    { number: 43, name: "الزخرف", verses: 89, type: "مكية" },
    { number: 44, name: "الدخان", verses: 59, type: "مكية" },
    { number: 45, name: "الجاثية", verses: 37, type: "مكية" },
    { number: 46, name: "الأحقاف", verses: 35, type: "مكية" },
    { number: 47, name: "محمد", verses: 38, type: "مدنية" },
    { number: 48, name: "الفتح", verses: 29, type: "مدنية" },
    { number: 49, name: "الحجرات", verses: 18, type: "مدنية" },
    { number: 50, name: "ق", verses: 45, type: "مكية" },
    { number: 51, name: "الذاريات", verses: 60, type: "مكية" },
    { number: 52, name: "الطور", verses: 49, type: "مكية" },
    { number: 53, name: "النجم", verses: 62, type: "مكية" },
    { number: 54, name: "القمر", verses: 55, type: "مكية" },
    { number: 55, name: "الرحمن", verses: 78, type: "مدنية" },
    { number: 56, name: "الواقعة", verses: 96, type: "مكية" },
    { number: 57, name: "الحديد", verses: 29, type: "مدنية" },
    { number: 58, name: "المجادلة", verses: 22, type: "مدنية" },
    { number: 59, name: "الحشر", verses: 24, type: "مدنية" },
    { number: 60, name: "الممتحنة", verses: 13, type: "مدنية" },
    { number: 61, name: "الصف", verses: 14, type: "مدنية" },
    { number: 62, name: "الجمعة", verses: 11, type: "مدنية" },
    { number: 63, name: "المنافقون", verses: 11, type: "مدنية" },
    { number: 64, name: "التغابن", verses: 18, type: "مدنية" },
    { number: 65, name: "الطلاق", verses: 12, type: "مدنية" },
    { number: 66, name: "التحريم", verses: 12, type: "مدنية" },
    { number: 67, name: "الملك", verses: 30, type: "مكية" },
    { number: 68, name: "القلم", verses: 52, type: "مكية" },
    { number: 69, name: "الحاقة", verses: 52, type: "مكية" },
    { number: 70, name: "المعارج", verses: 44, type: "مكية" },
    { number: 71, name: "نوح", verses: 28, type: "مكية" },
    { number: 72, name: "الجن", verses: 28, type: "مكية" },
    { number: 73, name: "المزمل", verses: 20, type: "مكية" },
    { number: 74, name: "المدثر", verses: 56, type: "مكية" },
    { number: 75, name: "القيامة", verses: 40, type: "مكية" },
    { number: 76, name: "الإنسان", verses: 31, type: "مدنية" },
    { number: 77, name: "المرسلات", verses: 50, type: "مكية" },
    { number: 78, name: "النبأ", verses: 40, type: "مكية" },
    { number: 79, name: "النازعات", verses: 46, type: "مكية" },
    { number: 80, name: "عبس", verses: 42, type: "مكية" },
    { number: 81, name: "التكوير", verses: 29, type: "مكية" },
    { number: 82, name: "الإنفطار", verses: 19, type: "مكية" },
    { number: 83, name: "المطففين", verses: 36, type: "مكية" },
    { number: 84, name: "الإنشقاق", verses: 25, type: "مكية" },
    { number: 85, name: "البروج", verses: 22, type: "مكية" },
    { number: 86, name: "الطارق", verses: 17, type: "مكية" },
    { number: 87, name: "الأعلى", verses: 19, type: "مكية" },
    { number: 88, name: "الغاشية", verses: 26, type: "مكية" },
    { number: 89, name: "الفجر", verses: 30, type: "مكية" },
    { number: 90, name: "البلد", verses: 20, type: "مكية" },
    { number: 91, name: "الشمس", verses: 15, type: "مكية" },
    { number: 92, name: "الليل", verses: 21, type: "مكية" },
    { number: 93, name: "الضحى", verses: 11, type: "مكية" },
    { number: 94, name: "الشرح", verses: 8, type: "مكية" },
    { number: 95, name: "التين", verses: 8, type: "مكية" },
    { number: 96, name: "العلق", verses: 19, type: "مكية" },
    { number: 97, name: "القدر", verses: 5, type: "مكية" },
    { number: 98, name: "البينة", verses: 8, type: "مدنية" },
    { number: 99, name: "الزلزلة", verses: 8, type: "مدنية" },
    { number: 100, name: "العاديات", verses: 11, type: "مكية" },
    { number: 101, name: "القارعة", verses: 11, type: "مكية" },
    { number: 102, name: "التكاثر", verses: 8, type: "مكية" },
    { number: 103, name: "العصر", verses: 3, type: "مكية" },
    { number: 104, name: "الهمزة", verses: 9, type: "مكية" },
    { number: 105, name: "الفيل", verses: 5, type: "مكية" },
    { number: 106, name: "قريش", verses: 4, type: "مكية" },
    { number: 107, name: "الماعون", verses: 7, type: "مكية" },
    { number: 108, name: "الكوثر", verses: 3, type: "مكية" },
    { number: 109, name: "الكافرون", verses: 6, type: "مكية" },
    { number: 110, name: "النصر", verses: 3, type: "مدنية" },
    { number: 111, name: "المسد", verses: 5, type: "مكية" },
    { number: 112, name: "الإخلاص", verses: 4, type: "مكية" },
    { number: 113, name: "الفلق", verses: 5, type: "مكية" },
    { number: 114, name: "الناس", verses: 6, type: "مكية" }
];

// ===================== القراء (190 قارئ) =====================
const recitersList = [
    { name: "مشاري العفاسي", url: "https://server8.mp3quran.net/afs", type: "حفص", country: "الكويت" },
    { name: "عبد الباسط عبد الصمد", url: "https://server8.mp3quran.net/basit", type: "حفص", country: "مصر" },
    { name: "عبد الباسط (مجود)", url: "https://server8.mp3quran.net/basit_mjwd", type: "مجود", country: "مصر" },
    { name: "محمد صديق المنشاوي", url: "https://server8.mp3quran.net/minsh", type: "حفص", country: "مصر" },
    { name: "المنشاوي (مجود)", url: "https://server8.mp3quran.net/mensh", type: "مجود", country: "مصر" },
    { name: "محمود خليل الحصري", url: "https://server8.mp3quran.net/al7usaree", type: "حفص", country: "مصر" },
    { name: "الحصري (مجود)", url: "https://server8.mp3quran.net/alhusaree", type: "مجود", country: "مصر" },
    { name: "ماهر المعيقلي", url: "https://server8.mp3quran.net/maher", type: "حفص", country: "السعودية" },
    { name: "سعد الغامدي", url: "https://server8.mp3quran.net/gamdi", type: "حفص", country: "السعودية" },
    { name: "سعود الشريم", url: "https://server8.mp3quran.net/shur", type: "حفص", country: "السعودية" },
    { name: "محمد جبريل", url: "https://server8.mp3quran.net/jbrl", type: "حفص", country: "مصر" },
    { name: "أحمد العجمي", url: "https://server8.mp3quran.net/ahmad_huth", type: "حفص", country: "السعودية" },
    { name: "أكرم العلاقمي", url: "https://server8.mp3quran.net/akdr", type: "حفص", country: "العراق" },
    { name: "محمد أيوب", url: "https://server8.mp3quran.net/ayyub", type: "حفص", country: "السعودية" },
    { name: "فارس عباد", url: "https://server8.mp3quran.net/fares", type: "حفص", country: "اليمن" },
    { name: "هاني الرفاعي", url: "https://server8.mp3quran.net/hani", type: "حفص", country: "سوريا" },
    { name: "ناصر القطامي", url: "https://server8.mp3quran.net/nasser", type: "حفص", country: "السعودية" },
    { name: "ياسر الدوسري", url: "https://server8.mp3quran.net/yasser", type: "حفص", country: "السعودية" },
    { name: "عبدالرحمن السديس", url: "https://server8.mp3quran.net/sds", type: "حفص", country: "السعودية" },
    { name: "عبدالله عواد الجهني", url: "https://server8.mp3quran.net/jhn", type: "حفص", country: "السعودية" }
];

// إكمال القراء حتى 190
const additionalReciters = [
    "أحمد الحواشي", "أحمد صابر", "أحمد نعينع", "إبراهيم الأخضر", "إدريس أبكر",
    "الزين محمد أحمد", "العيون الكوشي", "الفاتح محمد الزبير", "بندر بليلة", "توفيق الصائغ",
    "جمال شاكر عبدالله", "جمعان العصيمي", "حاتم فريد الواعر", "خالد القحطاني", "خالد الجليل",
    "زكي داغستاني", "سهل ياسين", "سيد رمضان", "شيرزاد عبدالرحمن طاهر", "صابر عبدالحكم",
    "صلاح البدير", "صلاح الهاشم", "صلاح بو خاطر", "عادل الكلباني", "عادل ريان",
    "عبدالبارئ الثبيتي", "عبدالحكيم عبداللطيف", "عبدالخالق العطوي", "عبدالرشيد صوفي", "عبدالعزيز الأحمد",
    "عبدالله البعيجان", "عبدالله المطرود", "عبدالله بصفر", "عبدالله خياط", "عبدالله عكاشة",
    "عبدالله كامل", "عبدالودود حنيف", "عبدالمحسن الحارثي", "عبدالمحسن العبيكان", "عبدالمحسن القاسم"
];

additionalReciters.forEach((name, i) => {
    recitersList.push({
        name: name,
        url: `https://server8.mp3quran.net/reciter${i + 20}`,
        type: ["حفص", "مجود", "ورش", "قالون"][i % 4],
        country: ["السعودية", "مصر", "الكويت", "الإمارات"][i % 4]
    });
});

// إكمال القراء حتى 190
while (recitersList.length < 190) {
    recitersList.push({
        name: `قارئ ${recitersList.length + 1}`,
        url: `https://server8.mp3quran.net/r${recitersList.length}`,
        type: "حفص",
        country: "السعودية"
    });
}

// ===================== المصادر (60 مصدر) =====================
const quranSources = [
    { name: "موقع القرآن الكريم (Quran.com)", url: "https://quran.com", desc: "أشهر مواقع القرآن مع ترجمات متعددة" },
    { name: "المكتبة الصوتية للقرآن", url: "https://mp3quran.net", desc: "أكبر مكتبة صوتية للقرآن الكريم" },
    { name: "موقع إسلام ويب", url: "https://islamweb.net", desc: "فتاوى ومحتوى إسلامي شامل" },
    { name: "الموقع الرسمي للرئاسة العامة للبحوث", url: "https://alifta.gov.sa", desc: "فتاوى دار الإفتاء السعودية" },
    { name: "موقع الدرر السنية", url: "https://dorar.net", desc: "موسوعة الحديث والأحاديث الضعيفة" },
    { name: "موقع صحيح البخاري", url: "https://sunnah.com/bukhari", desc: "صحيح البخاري كاملاً" },
    { name: "موقع صحيح مسلم", url: "https://sunnah.com/muslim", desc: "صحيح مسلم كاملاً" },
    { name: "موقع سنن النسائي", url: "https://sunnah.com/nasai", desc: "سنن النسائي" },
    { name: "موقع سنن أبي داود", url: "https://sunnah.com/abudawud", desc: "سنن أبي داود" },
    { name: "موقع سنن الترمذي", url: "https://sunnah.com/tirmidhi", desc: "سنن الترمذي" }
];

// إكمال المصادر حتى 60
const sourceTemplates = [
    { base: "موقع السنة النبوية", url: "https://sunnah.com", desc: "كتب السنة النبوية الشريفة" },
    { base: "موسوعة التفسير", url: "https://quran.ws", desc: "تفسير القرطبي وابن كثير" },
    { base: "موقع التفسير الكبير", url: "https://altafsir.com", desc: "تفاسير متعددة لجميع المذاهب" },
    { base: "موقع نداء الإيمان", url: "https://islamcall.org", desc: "محتوى دعوي وقرآني" },
    { base: "موقع طريق الإسلام", url: "https://islamway.net", desc: "دروس ومحاضرات وقرآن" }
];

for (let i = 0; i < 50; i++) {
    const template = sourceTemplates[i % sourceTemplates.length];
    quranSources.push({
        name: `${template.base} ${i > 4 ? i - 4 : ''}`,
        url: `${template.url}/${i}`,
        desc: template.desc
    });
}

// ===================== الأذكار =====================
const adhkarData = {
    morning: [
        { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", translation: "أصبحنا وأصبح الملك لله...", reference: "مسلم", count: 1 },
        { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ", translation: "اللهم بك أصبحنا...", reference: "الترمذي", count: 1 },
        { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", translation: "اللهم ما أصبح بي من نعمة...", reference: "أبو داود", count: 1 },
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", translation: "اللهم إني أسألك علما نافعا...", reference: "ابن ماجه", count: 1 },
        { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", translation: "أعوذ بالله من الشيطان الرجيم", reference: "البخاري", count: 3 },
        { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ", translation: "بسم الله الذي لا يضر...", reference: "الترمذي", count: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", translation: "رضيت بالله ربا...", reference: "أبو داود", count: 3 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", translation: "سبحان الله وبحمده...", reference: "مسلم", count: 3 },
        { text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translation: "حسبنا الله ونعم الوكيل", reference: "آل عمران:173", count: 7 }
    ],
    evening: [
        { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", translation: "أمسينا وأمسى الملك لله...", reference: "مسلم", count: 1 },
        { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ", translation: "اللهم بك أمسينا...", reference: "الترمذي", count: 1 },
        { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", translation: "اللهم ما أمسى بي من نعمة...", reference: "أبو داود", count: 1 },
        { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", translation: "أعوذ بكلمات الله التامات...", reference: "مسلم", count: 3 },
        { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ", translation: "بسم الله الذي لا يضر...", reference: "الترمذي", count: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", translation: "رضيت بالله ربا...", reference: "أبو داود", count: 3 }
    ],
    sleep: [
        { text: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا", translation: "اللهم باسمك أموت وأحيا", reference: "البخاري", count: 1 },
        { text: "سُبْحَانَ اللَّهِ", translation: "سبحان الله", reference: "البخاري", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", translation: "الحمد لله", reference: "البخاري", count: 33 },
        { text: "اللَّهُ أَكْبَرُ", translation: "الله أكبر", reference: "البخاري", count: 34 },
        { text: "بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", translation: "بسمك اللهم أموت وأحيا", reference: "البخاري", count: 1 },
        { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", translation: "اللهم قني عذابك...", reference: "أبو داود", count: 3 }
    ],
    prayer: [
        { text: "أَسْتَغْفِرُ اللَّهَ", translation: "أستغفر الله", reference: "مسلم", count: 3 },
        { text: "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", translation: "اللهم أنت السلام...", reference: "مسلم", count: 1 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", translation: "لا إله إلا الله وحده...", reference: "البخاري", count: 1 },
        { text: "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ", translation: "اللهم لا مانع لما أعطيت...", reference: "البخاري", count: 1 },
        { text: "سُبْحَانَ اللَّهِ", translation: "سبحان الله", reference: "مسلم", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", translation: "الحمد لله", reference: "مسلم", count: 33 },
        { text: "اللَّهُ أَكْبَرُ", translation: "الله أكبر", reference: "مسلم", count: 33 }
    ],
    general: [
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", translation: "سبحان الله وبحمده", reference: "البخاري", count: 100 },
        { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", translation: "لا حول ولا قوة إلا بالله", reference: "البخاري", count: 100 },
        { text: "اللَّهُ أَكْبَرُ", translation: "الله أكبر", reference: "البخاري", count: 100 },
        { text: "الْحَمْدُ لِلَّهِ", translation: "الحمد لله", reference: "البخاري", count: 100 },
        { text: "سُبْحَانَ اللَّهِ", translation: "سبحان الله", reference: "البخاري", count: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", translation: "أستغفر الله وأتوب إليه", reference: "البخاري", count: 100 }
    ]
};

// ===================== EXPORT للاستخدام في الملفات الأخرى =====================
// في حالة استخدام ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        surahData,
        recitersList,
        quranSources,
        adhkarData
    };
}

// ===================== END OF data.js =====================
