const challenges = [
    { 
        challenge: "تحدي 1: ما هو اسم وحدة المعالجة الرئيسية في الكمبيوتر؟", 
        answer: ["CPU", "cpu", "المعالج", "Central Processing Unit", "وحدة المعالجة المركزية"], 
        points: 10 
    },
    { 
        challenge: "تحدي 2: ما هو النظام المستخدم لتصفح الإنترنت؟", 
        answer: ["المتصفح", "Browser", "browser", "متصفح الإنترنت", "Web Browser"], 
        points: 15 
    },
    { 
        challenge: "تحدي 3: ما هو نظام التشغيل الأكثر استخدامًا على أجهزة الكمبيوتر؟", 
        answer: ["Windows", "windows", "ويندوز", "نظام ويندوز", "Microsoft Windows"], 
        points: 20 
    },
    { 
        challenge: "تحدي 4: ما هو الاختصار الذي يمثل الذاكرة العشوائية في الكمبيوتر؟", 
        answer: ["RAM", "ram", "ذاكرة الوصول العشوائي", "Random Access Memory", "الذاكرة العشوائية"], 
        points: 25 
    },
    { 
        challenge: "تحدي 5: ما هي اللغة التي يتم استخدامها لتصميم صفحات الويب؟", 
        answer: ["HTML", "html", "Hypertext Markup Language", "لغة HTML", "لغة ترميز النص التشعبي"], 
        points: 30 
    }
];

let currentChallengeIndex = 0;
let totalPoints = 0;
let codeKey = "free Palestine";
let finalAnswer = "الحرية لفلسطين";
let teamName = "";
let timerInterval;
let timeLeft = 300;  // 5 دقائق لكل تحدي

// تشغيل الصوت عند إدخال إجابة خاطئة
function playWrongAnswerSound() {
    const audio = new Audio('Y2meta.app - Naruto saying BAKA _ Naruto _ (128 kbps).mp3'); // تأكد من مسار ملف الصوت الصحيح
    audio.play();
}

function verifyPassword() {
    const password = document.getElementById("password-input").value;
    teamName = document.getElementById("team-name-input").value;

    if (teamName === "") {
        alert("يرجى إدخال اسم الفريق.");
        return;
    }

    if (password === "سر") {
        document.getElementById("password-section").style.display = "none";
        document.getElementById("challenges-section").style.display = "block";
        document.getElementById("progress-bar-container").style.display = "block";  // إظهار شريط التقدم
        loadChallenge();
    } else {
        alert("كلمة السر خاطئة! حاول مرة أخرى.");
    }
}

function loadChallenge() {
    if (currentChallengeIndex < challenges.length) {
        document.getElementById("challenge-container").innerText = challenges[currentChallengeIndex].challenge;
        startTimer();  // بدء المؤقت
        updateProgressBar();  // تحديث شريط التقدم
    } else {
        endChallenges();
    }
}

function submitAnswer() {
    const answer = document.getElementById("answer-input").value.trim().toLowerCase(); // تحويل الإجابة إلى حروف صغيرة
    const correctAnswers = challenges[currentChallengeIndex].answer.map(a => a.toLowerCase()); // تحويل الإجابات الصحيحة إلى حروف صغيرة

    if (correctAnswers.includes(answer)) { // التحقق من وجود الإجابة ضمن الإجابات الصحيحة
        totalPoints += challenges[currentChallengeIndex].points;
        currentChallengeIndex++;
        showNotification("إجابة صحيحة!", "#28a745");
        loadChallenge();
    } else {
        showNotification("إجابة خاطئة، حاول مرة أخرى.", "#dc3545");
        playWrongAnswerSound(); // تشغيل صوت الإجابة الخاطئة
        totalPoints -= 5; // خصم 5 نقاط في حال الإجابة الخاطئة
    }

    // مسح حقل الإدخال لإدخال الإجابة التالية
    document.getElementById("answer-input").value = ""; 
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 300;  // إعادة ضبط الوقت لكل تحدي
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = `الوقت المتبقي: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();  // إذا انتهى الوقت
        }
        timeLeft--;
    }, 1000);
}

function timeUp() {
    totalPoints -= 5; // خصم 5 نقاط إذا انتهى الوقت ولم يتم الإجابة
    showNotification("انتهى الوقت! سيتم خصم 5 نقاط.", "#dc3545");
    currentChallengeIndex++;
    loadChallenge(); // الانتقال إلى التحدي التالي
}

function updateProgressBar() {
    const progressPercentage = (currentChallengeIndex / challenges.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progressPercentage}%`;
    document.getElementById("progress-text").innerText = `${currentChallengeIndex} من ${challenges.length} تحديات مكتملة`;
}

function showNotification(message, color) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    notificationMessage.innerText = message;
    notification.style.backgroundColor = color;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function endChallenges() {
    clearInterval(timerInterval);
    document.getElementById("challenges-section").style.display = "none";
    document.getElementById("final-section").style.display = "block";
    document.getElementById("code-key").innerText = codeKey; // عرض الشيفرة
}

function submitFinalAnswer() {
    const finalAnswerInput = document.getElementById("final-answer-input").value;
    if (finalAnswerInput === finalAnswer) {
        totalPoints += 50; // إضافة 50 نقطة للإجابة النهائية الصحيحة
        document.getElementById("final-section").style.display = "none";
        document.getElementById("result-section").style.display = "block";
        document.getElementById("final-message").innerText = `تهانينا ${teamName}! لقد أكملت جميع التحديات. النقاط النهائية: ${totalPoints}`;

        // إظهار مشغل الصوت
        document.getElementById("audio-player").style.display = "block";
    } else {
        showNotification("إجابة خاطئة!", "#dc3545");
    }
}

document.getElementById("final-answer-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitFinalAnswer();
    }
});
