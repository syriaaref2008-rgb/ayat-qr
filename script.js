// عناصر تسجيل الدخول
const overlay = document.getElementById('loginOverlay');
const loginBox = document.getElementById('loginBox');
const loginInner = loginBox.querySelector('.login-inner');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const startBtn = document.getElementById('startBtn');

// عناصر الأزرار الجانبية
const sideBtns = document.querySelectorAll('.side-btn');
const themeToggle = document.getElementById('themeToggle');

// ✅ التبديل بين تسجيل الدخول وإنشاء الحساب
if (showRegister) {
  showRegister.addEventListener('click', () => {
    loginInner.style.transform = 'rotateY(180deg)';
  });
}

if (showLogin) {
  showLogin.addEventListener('click', () => {
    loginInner.style.transform = 'rotateY(0deg)';
  });
}

// ✅ إنشاء حساب جديد
registerBtn.addEventListener('click', () => {
  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value.trim();

  if (!username || !password) {
    alert("⚠️ يرجى إدخال جميع البيانات");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) {
    alert("❌ هذا الاسم مستخدم بالفعل");
    return;
  }

  users[username] = { password };
  localStorage.setItem('users', JSON.stringify(users));
  alert("✅ تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");
  loginInner.style.transform = 'rotateY(0deg)';
});

// ✅ تسجيل الدخول
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[username] || users[username].password !== password) {
    alert("❌ اسم المستخدم أو كلمة السر غير صحيحة");
    return;
  }

  localStorage.setItem('currentUser', username);
  overlay.style.display = 'none';
});

// ✅ التحقق عند تحميل الصفحة
window.addEventListener('load', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) overlay.style.display = 'none';

  // استرجاع المظهر المحفوظ
  const savedTheme = localStorage.getItem('theme');
  const sidebar = document.querySelector('.sidebar');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = "☀️ المظهر";
    if (sidebar) {
      sidebar.style.background = "linear-gradient(180deg, #0a2b33, #08323b)";
      sidebar.style.boxShadow = "0 0 12px rgba(0,255,255,0.15)";
    }
  } else {
    document.body.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = "🌙 المظهر";
    if (sidebar) {
      sidebar.style.background = "linear-gradient(180deg, #4feaff, #1cb7c1)";
      sidebar.style.boxShadow = "0 0 10px rgba(0,0,0,0.15)";
    }
  }
});

// ✅ زر إبدأ القراءة → الانتقال لصفحة المصحف
if (startBtn) {
  startBtn.addEventListener('click', () => {
    window.location.href = "quran.html";
  });
}

// ✅ الأزرار الجانبية (كل زر يفتح صفحته الخاصة)
if (sideBtns.length >= 6) {
  // 📜 سور القرآن الكريم
  sideBtns[0].addEventListener('click', () => window.location.href = "quran.html");
  // 🕋 المسبحة الإلكترونية
  sideBtns[1].addEventListener('click', () => window.location.href = "sebha.html");
  // 📅 التقويم الهجري
  sideBtns[2].addEventListener('click', () => window.location.href = "calendar.html");
  // 🌄 أذكار الصباح والمساء
  sideBtns[3].addEventListener('click', () => window.location.href = "azkar.html");
  // 💭 عبارات دينية
  sideBtns[4].addEventListener('click', () => window.location.href = "phrases.html");
  // 📩 تواصل معنا
  sideBtns[5].addEventListener('click', () => window.location.href = "contact.html");
}

// ✅ زر المظهر
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    const sidebar = document.querySelector('.sidebar');

    themeToggle.textContent = isDark ? "☀️ المظهر" : "🌙 المظهر";

    if (sidebar) {
      sidebar.style.background = isDark
        ? "linear-gradient(180deg, #0a2b33, #08323b)"
        : "linear-gradient(180deg, #4feaff, #1cb7c1)";
      sidebar.style.boxShadow = isDark
        ? "0 0 12px rgba(0,255,255,0.15)"
        : "0 0 10px rgba(0,0,0,0.15)";
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
