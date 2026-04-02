/* ================================================================
   LOVE SURVEY MODULE — love-survey.js
   Integrates into existing romantic website as a standalone module.
   All functions are prefixed "ls" or wrapped to avoid conflicts.
   ================================================================

   BACKEND API BASE: change LS_API to your deployed backend URL.
   While developing locally use: http://localhost:5000/api

   ================================================================ */

const LS_API = 'http://localhost:5000/api';

/* ── State ───────────────────────────────────────────────────── */
let lsState = {
  initialized:    false,
  currentUser:    null,   // { username, token }
  selectedUser:   null,   // 'mahmoud' | 'rawan'
  prefQuestions:  [],     // full 200 questions
  prefAnswers:    {},     // { question_id: 'A'|'B'|'C' }
  prefIndex:      0,      // current question index (0-based)
  prefTotal:      200,
  quizQuestions:  [],     // 20 random questions
  quizAnswers:    {},     // user's quiz guesses
  quizIndex:      0,
  quizScore:      0,
  cooldownInterval:   null,
  midnightInterval:   null,
  quizResult:         null,  // stored result for WhatsApp
};

/* ── Phone map ───────────────────────────────────────────────── */
const LS_PHONES = {
  mahmoud: '201107576839',
  rawan:   '201500545584',
};

/* ── DOM refs ────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

/* ================================================================
   PUBLIC ENTRY — called by script.js when nav switches to survey
   ================================================================ */
function initLoveSurvey() {
  if (lsState.initialized) return; // don't re-init on tab revisit unless logged out
  lsState.initialized = true;

  // Wire up all static event listeners once
  _lsBindEvents();

  // If already logged in (token in sessionStorage), skip to main flow
  const saved = sessionStorage.getItem('ls_session');
  if (saved) {
    try {
      lsState.currentUser = JSON.parse(saved);
      _lsAfterLogin();
      return;
    } catch (e) { /* ignore bad session */ }
  }

  _lsShowStep('lsIntroCard');
}

/* ================================================================
   EVENT BINDING
   ================================================================ */
function _lsBindEvents() {
  // Intro
  $('lsStartBtn').addEventListener('click', () => _lsShowStep('lsAuthStep'));

  // Identity selection
  document.querySelectorAll('.ls-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lsState.selectedUser = btn.dataset.user;
      document.querySelectorAll('.ls-user-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      $('lsPasswordTitle').textContent = `Welcome, ${_lsCapitalize(lsState.selectedUser)}! 💕`;
      $('lsIdentityStep').classList.add('ls-hidden');
      $('lsPasswordStep').classList.remove('ls-hidden');
      $('lsPasswordInput').focus();
    });
  });

  // Back to identity
  $('lsBackToIdentity').addEventListener('click', () => {
    $('lsPasswordStep').classList.add('ls-hidden');
    $('lsIdentityStep').classList.remove('ls-hidden');
    $('lsPasswordInput').value = '';
    lsState.selectedUser = null;
    _lsHideCooldown();
  });

  // Password toggle
  $('lsPasswordToggle').addEventListener('click', () => {
    const inp = $('lsPasswordInput');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  // Login on Enter
  $('lsPasswordInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });

  // Login button
  $('lsLoginBtn').addEventListener('click', handleLogin);

  // Preference navigation
  $('lsPrefPrevBtn').addEventListener('click', _lsPrefPrev);
  $('lsPrefNextBtn').addEventListener('click', _lsPrefNext);
  $('lsSaveProgressBtn').addEventListener('click', savePreferenceAnswer.bind(null, true));

  // Preference options
  ['lsPrefOptA','lsPrefOptB','lsPrefOptC'].forEach(id => {
    $(id).addEventListener('click', () => _lsSelectPrefOption($(id).dataset.choice));
  });

  // Quiz options
  ['lsQuizOptA','lsQuizOptB','lsQuizOptC'].forEach(id => {
    $(id).addEventListener('click', () => submitQuizAnswer($(id).dataset.choice));
  });

  // Go to quiz
  $('lsGoToQuizBtn').addEventListener('click', startDailyQuiz);

  // View last result
  $('lsViewLastResultBtn').addEventListener('click', () => {
    if (lsState.quizResult) _lsRenderResult(lsState.quizResult.score, lsState.quizResult.total);
  });

  // WhatsApp
  $('lsSendWhatsAppBtn').addEventListener('click', triggerWhatsAppMessage);

  // Return home from result
  $('lsReturnHomeBtn').addEventListener('click', () => {
    // Switch back to home section via existing navigation
    const homeBtn = document.querySelector('[data-section="home"]');
    if (homeBtn) homeBtn.click();
  });

  // Change password
  $('lsChangePasswordBtn').addEventListener('click', openChangePasswordModal);
  $('lsModalClose').addEventListener('click', _lsClosePasswordModal);
  $('lsCpVerifyBtn').addEventListener('click', _lsCpVerify);
  $('lsCpSubmitBtn').addEventListener('click', submitPasswordChange);
  $('lsCpDoneBtn').addEventListener('click', _lsClosePasswordModal);

  // Close modal on overlay click
  $('lsPasswordModal').addEventListener('click', e => {
    if (e.target === $('lsPasswordModal')) _lsClosePasswordModal();
  });
}

/* ================================================================
   AUTHENTICATION
   ================================================================ */
async function handleLogin() {
  const password = $('lsPasswordInput').value.trim();
  if (!password) { lsToast('Please enter your password 💕', 'error'); return; }
  if (!lsState.selectedUser) { lsToast('Please select your identity first', 'error'); return; }

  const btn = $('lsLoginBtn');
  _lsSetLoading(btn, true, 'Logging in...');

  try {
    const res = await _lsFetch('/auth/login', 'POST', {
      username: lsState.selectedUser,
      password,
    });

    if (res.success) {
      lsState.currentUser = { username: lsState.selectedUser, token: res.token };
      sessionStorage.setItem('ls_session', JSON.stringify(lsState.currentUser));
      _lsHideCooldown();
      $('lsPasswordInput').value = '';
      lsToast(`Welcome back, ${_lsCapitalize(lsState.selectedUser)}! 💕`, 'success');
      _lsAfterLogin();
    } else {
      _lsHandleLoginFail(res);
    }
  } catch (err) {
    lsToast('Could not connect to server. Please try again.', 'error');
  } finally {
    _lsSetLoading(btn, false, 'Login 💕');
  }
}

function _lsHandleLoginFail(res) {
  if (res.locked) {
    _lsStartCooldown(res.lockoutSeconds || 600);
    lsToast('Account locked. Too many failed attempts.', 'error');
  } else {
    const remaining = res.attemptsRemaining ?? '?';
    lsToast(`Wrong password! ${remaining} attempt(s) remaining.`, 'error');
  }
}

/* ── After successful login: decide which step to show ── */
async function _lsAfterLogin() {
  _lsShowStep('lsPreferenceStep'); // show loading state
  try {
    const res = await _lsFetch('/survey/status', 'GET');

    if (res.prefComplete) {
      // Check daily quiz limit
      if (res.quizUsedToday) {
        lsState.quizResult = res.lastResult || null;
        if (lsState.quizResult) {
          $('lsLastScore').textContent = `${lsState.quizResult.score}/20`;
        }
        _lsStartMidnightCountdown();
        _lsShowStep('lsDailyLimitStep');
      } else {
        _lsShowStep('lsPrefCompleteStep');
      }
    } else {
      // Load preference questions and resume
      await loadPreferenceQuestions();
    }
  } catch (err) {
    lsToast('Error loading your profile. Please refresh.', 'error');
  }
}

/* ── Cooldown Timer (login lockout) ── */
function startCooldownTimer(seconds) { _lsStartCooldown(seconds); }

function _lsStartCooldown(seconds) {
  clearInterval(lsState.cooldownInterval);
  $('lsCooldownBox').classList.remove('ls-hidden');
  $('lsLoginBtn').disabled = true;

  let remaining = seconds;
  _lsUpdateCooldownDisplay(remaining);

  lsState.cooldownInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(lsState.cooldownInterval);
      _lsHideCooldown();
    } else {
      _lsUpdateCooldownDisplay(remaining);
    }
  }, 1000);
}

function _lsUpdateCooldownDisplay(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2,'0');
  const s = (sec % 60).toString().padStart(2,'0');
  $('lsCooldownTimer').textContent = `${m}:${s}`;
}

function _lsHideCooldown() {
  clearInterval(lsState.cooldownInterval);
  $('lsCooldownBox').classList.add('ls-hidden');
  $('lsLoginBtn').disabled = false;
}

/* ── Midnight Countdown ── */
function startMidnightCountdown() { _lsStartMidnightCountdown(); }

function _lsStartMidnightCountdown() {
  clearInterval(lsState.midnightInterval);

  function update() {
    const now  = new Date();
    const midnight = new Date();
    midnight.setHours(24,0,0,0);
    const diff = Math.floor((midnight - now) / 1000);
    if (diff <= 0) {
      clearInterval(lsState.midnightInterval);
      $('lsMidnightCountdown').textContent = '00:00:00';
      // Auto-refresh the status
      _lsAfterLogin();
      return;
    }
    const h = Math.floor(diff / 3600).toString().padStart(2,'0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2,'0');
    const s = (diff % 60).toString().padStart(2,'0');
    $('lsMidnightCountdown').textContent = `${h}:${m}:${s}`;
  }

  update();
  lsState.midnightInterval = setInterval(update, 1000);
}

/* ================================================================
   PREFERENCE QUESTIONS
   ================================================================ */
async function loadPreferenceQuestions() {
  try {
    const res = await _lsFetch('/survey/questions', 'GET');
    lsState.prefQuestions = res.questions || [];
    lsState.prefTotal = lsState.prefQuestions.length;

    // Load saved progress
    const progressRes = await _lsFetch('/survey/progress', 'GET');
    lsState.prefAnswers = progressRes.answers || {};
    // Resume from last unanswered
    lsState.prefIndex = _lsFindResumeIndex();

    _lsShowStep('lsPreferenceStep');
    _lsRenderPrefQuestion();
  } catch (err) {
    lsToast('Error loading questions. Please refresh.', 'error');
  }
}

function _lsFindResumeIndex() {
  for (let i = 0; i < lsState.prefQuestions.length; i++) {
    const q = lsState.prefQuestions[i];
    if (!lsState.prefAnswers[q.question_id]) return i;
  }
  return lsState.prefQuestions.length - 1;
}

function _lsRenderPrefQuestion() {
  const q = lsState.prefQuestions[lsState.prefIndex];
  if (!q) return;

  const idx   = lsState.prefIndex;
  const total = lsState.prefTotal;
  const pct   = Math.round((idx / total) * 100);

  $('lsPrefProgressText').textContent = `Question ${idx + 1} / ${total}`;
  $('lsPrefProgressPct').textContent  = `${pct}%`;
  $('lsPrefProgressFill').style.width = `${pct}%`;
  $('lsPrefCategory').textContent     = _lsCapitalize(q.category);
  $('lsPrefQuestionText').textContent = q.question_text;
  $('lsPrefOptA').textContent         = q.option_a;
  $('lsPrefOptB').textContent         = q.option_b;
  $('lsPrefOptC').textContent         = q.option_c;

  // Restore saved answer highlight
  const saved = lsState.prefAnswers[q.question_id];
  ['A','B','C'].forEach(ch => {
    const btn = $(`lsPrefOpt${ch}`);
    btn.classList.toggle('selected', saved === ch);
  });

  // Prev button
  $('lsPrefPrevBtn').disabled = idx === 0;
}

function _lsSelectPrefOption(choice) {
  const q = lsState.prefQuestions[lsState.prefIndex];
  if (!q) return;
  lsState.prefAnswers[q.question_id] = choice;
  ['A','B','C'].forEach(ch => $(`lsPrefOpt${ch}`).classList.toggle('selected', ch === choice));
}

function _lsPrefNext() {
  const q = lsState.prefQuestions[lsState.prefIndex];
  if (!lsState.prefAnswers[q?.question_id]) {
    lsToast('Please choose an option before continuing 💭', 'info');
    return;
  }
  // Auto-save silently
  savePreferenceAnswer(false);

  if (lsState.prefIndex < lsState.prefTotal - 1) {
    lsState.prefIndex++;
    _lsRenderPrefQuestion();
  } else {
    // All answered → complete
    _lsCompletePrefProfile();
  }
}

function _lsPrefPrev() {
  if (lsState.prefIndex > 0) {
    lsState.prefIndex--;
    _lsRenderPrefQuestion();
  }
}

async function savePreferenceAnswer(showToast = false) {
  const answersToSave = Object.entries(lsState.prefAnswers).map(([qid, ans]) => ({
    question_id: qid,
    selected_answer: ans,
  }));

  if (!answersToSave.length) return;

  try {
    await _lsFetch('/survey/save-progress', 'POST', { answers: answersToSave });
    if (showToast) lsToast('Progress saved! Come back anytime 💾', 'success');
  } catch (err) {
    if (showToast) lsToast('Could not save progress. Check your connection.', 'error');
  }
}

async function _lsCompletePrefProfile() {
  const answersToSave = Object.entries(lsState.prefAnswers).map(([qid, ans]) => ({
    question_id: qid,
    selected_answer: ans,
  }));
  try {
    await _lsFetch('/survey/complete-profile', 'POST', { answers: answersToSave });
    _lsShowStep('lsPrefCompleteStep');
    lsToast('Your profile is complete! 🎉', 'success');
  } catch (err) {
    lsToast('Error saving profile. Please try again.', 'error');
  }
}

function resumeProgress() { _lsRenderPrefQuestion(); }

/* ================================================================
   QUIZ MODULE
   ================================================================ */
async function startDailyQuiz() {
  try {
    const res = await _lsFetch('/quiz/start', 'POST');
    if (res.alreadyUsed) {
      lsState.quizResult = res.lastResult || null;
      if (lsState.quizResult) $('lsLastScore').textContent = `${lsState.quizResult.score}/20`;
      _lsStartMidnightCountdown();
      _lsShowStep('lsDailyLimitStep');
      return;
    }

    lsState.quizQuestions = res.questions;
    lsState.quizAnswers   = {};
    lsState.quizIndex     = 0;
    lsState.quizScore     = 0;

    const partner = lsState.currentUser.username === 'mahmoud' ? 'Rawan' : 'Mahmoud';
    $('lsQuizTitle').textContent    = `Quiz About ${partner} 💕`;
    $('lsQuizSubtitle').textContent = `Can you guess ${partner}'s answers?`;

    _lsShowStep('lsQuizStep');
    _lsRenderQuizQuestion();
  } catch (err) {
    lsToast('Error starting quiz. Please try again.', 'error');
  }
}

function _lsRenderQuizQuestion() {
  const q    = lsState.quizQuestions[lsState.quizIndex];
  const idx  = lsState.quizIndex;
  const total= lsState.quizQuestions.length;
  const pct  = Math.round((idx / total) * 100);

  $('lsQuizProgressText').textContent = `Question ${idx + 1} / ${total}`;
  $('lsQuizProgressPct').textContent  = `${pct}%`;
  $('lsQuizProgressFill').style.width = `${pct}%`;
  $('lsLiveScore').textContent        = lsState.quizScore;
  $('lsQuizCategory').textContent     = _lsCapitalize(q.category);
  $('lsQuizQuestionText').textContent = q.question_text;
  $('lsQuizOptA').textContent         = q.option_a;
  $('lsQuizOptB').textContent         = q.option_b;
  $('lsQuizOptC').textContent         = q.option_c;

  // Reset option styles & enable
  ['A','B','C'].forEach(ch => {
    const btn = $(`lsQuizOpt${ch}`);
    btn.className = 'ls-option-btn';
    btn.disabled  = false;
  });

  $('lsQuizFeedback').classList.add('ls-hidden');
  $('lsQuizFeedback').className = 'ls-quiz-feedback ls-hidden';
}

async function submitQuizAnswer(choice) {
  const q = lsState.quizQuestions[lsState.quizIndex];

  // Disable all options immediately
  ['A','B','C'].forEach(ch => $(`lsQuizOpt${ch}`).disabled = true);
  $(`lsQuizOpt${choice}`).classList.add('selected');

  lsState.quizAnswers[q.question_id] = choice;

  // Get correct answer from backend
  try {
    const res = await _lsFetch('/quiz/check-answer', 'POST', {
      question_id: q.question_id,
      selected_answer: choice,
    });

    const correct = res.correct_answer;
    const isRight = choice === correct;

    if (isRight) {
      lsState.quizScore++;
      $(`lsQuizOpt${choice}`).classList.add('correct');
    } else {
      $(`lsQuizOpt${choice}`).classList.add('incorrect');
      $(`lsQuizOpt${correct}`).classList.add('correct');
    }

    $('lsLiveScore').textContent = lsState.quizScore;

    const fb = $('lsQuizFeedback');
    fb.textContent = isRight ? '✅ Correct! You know them well! 💕' : `❌ Oops! The answer was: ${correct}`;
    fb.className   = `ls-quiz-feedback ${isRight ? 'correct' : 'incorrect'}`;

    // Auto-advance after 1.5s
    setTimeout(() => {
      lsState.quizIndex++;
      if (lsState.quizIndex >= lsState.quizQuestions.length) {
        finishQuiz();
      } else {
        _lsRenderQuizQuestion();
      }
    }, 1500);
  } catch (err) {
    lsToast('Error checking answer. Please try again.', 'error');
    ['A','B','C'].forEach(ch => $(`lsQuizOpt${ch}`).disabled = false);
  }
}

async function finishQuiz() {
  try {
    const submittedAnswers = Object.entries(lsState.quizAnswers).map(([qid, ans]) => ({
      question_id: qid,
      selected_answer: ans,
    }));

    const res = await _lsFetch('/quiz/submit', 'POST', {
      score: lsState.quizScore,
      submitted_answers: submittedAnswers,
    });

    lsState.quizResult = { score: res.score ?? lsState.quizScore, total: 20 };
    _lsRenderResult(lsState.quizResult.score, 20);
  } catch (err) {
    // Fallback: render with local score
    lsState.quizResult = { score: lsState.quizScore, total: 20 };
    _lsRenderResult(lsState.quizScore, 20);
  }
}

/* ================================================================
   RESULT RENDERING
   ================================================================ */
function renderQuizResult(score, total) { _lsRenderResult(score, total); }

function _lsRenderResult(score, total) {
  _lsShowStep('lsResultStep');

  $('lsScoreNum').textContent = score;
  const card = $('lsResultStep');
  card.classList.remove('ls-perfect-glow');
  $('lsResultIcon').className = 'ls-result-icon';

  // Clear old confetti
  $('lsResultConfetti').innerHTML = '';

  const pct = (score / total) * 100;
  const meter = $('lsMeterFill');
  meter.className = 'ls-meter-fill';
  const badge = $('lsScoreBadge');
  badge.className = 'ls-score-badge';

  // Score trigger after a small delay for animation
  setTimeout(() => {
    meter.style.width = `${pct}%`;
  }, 200);

  if (score >= 17) {
    // Perfect / High
    meter.classList.add('green');
    badge.classList.add('green');
    $('lsResultIcon').textContent = '💕';
    $('lsResultTitle').textContent = score === 20 ? 'PERFECT SCORE! 🌟' : 'Amazing! 💕';
    $('lsResultMessage').textContent = score === 20
      ? 'Perfect! You know me completely! 💕 Every little thing about me matters to you and I love you so much for that!'
      : `Incredible! You scored ${score}/20. You truly know your partner's heart! 💕`;

    if (score === 20) {
      card.classList.add('ls-perfect-glow');
      _lsLaunchConfetti();
    } else {
      _lsLaunchConfetti(15);
    }

  } else if (score >= 11) {
    // Medium
    meter.classList.add('yellow');
    badge.classList.add('yellow');
    $('lsResultIcon').textContent = '💛';
    $('lsResultTitle').textContent = 'Not Bad! 😊';
    $('lsResultMessage').textContent = `You scored ${score}/20. You're someone special to me, but I guess there's still more to discover about each other! 😊`;
    _lsLaunchConfetti(8);

  } else {
    // Low
    meter.classList.add('red');
    badge.classList.add('red');
    $('lsResultIcon').innerHTML = '<span class="ls-tease-bounce">😏</span>';
    $('lsResultTitle').textContent = 'Really?! 😅';
    $('lsResultMessage').textContent = `Umm... you scored ${score}/20. Do you even know me? We might be strangers! 🤷 Better study up! 😂`;
  }
}

/* ── Confetti ── */
function _lsLaunchConfetti(count = 30) {
  const container = $('lsResultConfetti');
  const colors = ['#ff6eb4','#a855d4','#ffd700','#ff4d4d','#4caf93','#7b78d8'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'ls-confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      --drift: ${(Math.random() - 0.5) * 120}px;
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.8}s;
    `;
    container.appendChild(piece);
  }
}

/* ================================================================
   WHATSAPP MESSAGE
   ================================================================ */
function triggerWhatsAppMessage() {
  const score  = lsState.quizResult?.score ?? 0;
  const user   = lsState.currentUser?.username;
  const partner= user === 'mahmoud' ? 'rawan' : 'mahmoud';
  const phone  = LS_PHONES[partner];

  let message;
  if (score >= 17) {
    message = `Hey! ❤️ I just scored ${score}/20 on your Love Survey! I know everything about you because you mean the world to me. Every little detail about you matters to me. I love you so much! 💕✨`;
  } else if (score >= 11) {
    message = `Hi! I got ${score}/20 on your survey. You're someone special to me, but I guess I still have more to learn about you! 😊`;
  } else {
    message = `Umm... I scored ${score}/20. I barely know you apparently 😅 Who are you again? We might be strangers! 🤷`;
  }

  const encoded = encodeURIComponent(message);
  const url     = `https://wa.me/${phone}?text=${encoded}`;

  /*
   * WhatsApp Auto-Open Note:
   * true "auto-send" is NOT possible via browser due to WhatsApp security.
   * This opens the WhatsApp chat with the message pre-filled.
   * The user just needs to tap Send.
   * For real auto-send, use WhatsApp Business API (server-side).
   * See /backend/utils/whatsapp.js for the Business API integration layer.
   */
  window.open(url, '_blank');
  lsToast('WhatsApp opened with your message! 📱', 'success');
}

/* ================================================================
   CHANGE PASSWORD
   ================================================================ */
function openChangePasswordModal() {
  // Reset modal
  $('lsCpStep1').classList.remove('ls-hidden');
  $('lsCpStep2').classList.add('ls-hidden');
  $('lsCpSuccess').classList.add('ls-hidden');
  $('lsCpUsername').value = lsState.selectedUser || '';
  $('lsCpVerifyCode').value = '';
  $('lsCpNewPassword').value = '';
  $('lsCpConfirmPassword').value = '';
  $('lsPasswordModal').classList.remove('ls-hidden');
}

function _lsClosePasswordModal() {
  $('lsPasswordModal').classList.add('ls-hidden');
}

async function _lsCpVerify() {
  const username = $('lsCpUsername').value.trim().toLowerCase();
  const code     = $('lsCpVerifyCode').value.trim();

  if (!username || !code) { lsToast('Please fill in all fields', 'error'); return; }

  /* Verification code is fixed: 1212 */
  if (code !== '1212') {
    lsToast('Incorrect verification code ❌', 'error');
    return;
  }

  if (username !== 'mahmoud' && username !== 'rawan') {
    lsToast('Unknown username', 'error');
    return;
  }

  $('lsCpStep1').classList.add('ls-hidden');
  $('lsCpStep2').classList.remove('ls-hidden');
}

async function submitPasswordChange() {
  const username  = $('lsCpUsername').value.trim().toLowerCase();
  const newPass   = $('lsCpNewPassword').value;
  const confPass  = $('lsCpConfirmPassword').value;

  if (!newPass || !confPass) { lsToast('Please fill in all fields', 'error'); return; }
  if (newPass !== confPass) { lsToast('Passwords do not match ❌', 'error'); return; }
  if (newPass.length < 6)   { lsToast('Password must be at least 6 characters', 'error'); return; }

  const btn = $('lsCpSubmitBtn');
  _lsSetLoading(btn, true, 'Saving...');

  try {
    const res = await _lsFetch('/auth/change-password', 'POST', {
      username,
      new_password: newPass,
      verify_code: '1212',
    });

    if (res.success) {
      $('lsCpStep2').classList.add('ls-hidden');
      $('lsCpSuccess').classList.remove('ls-hidden');
    } else {
      lsToast(res.message || 'Error changing password', 'error');
    }
  } catch (err) {
    lsToast('Could not connect to server', 'error');
  } finally {
    _lsSetLoading(btn, false, 'Change Password 💕');
  }
}

/* ================================================================
   STEP VISIBILITY MANAGER
   ================================================================ */
const LS_STEPS = [
  'lsIntroCard',
  'lsAuthStep',
  'lsPreferenceStep',
  'lsPrefCompleteStep',
  'lsDailyLimitStep',
  'lsQuizStep',
  'lsResultStep',
];

function _lsShowStep(stepId) {
  LS_STEPS.forEach(id => {
    const el = $(id);
    if (el) el.classList.add('ls-hidden');
  });
  const target = $(stepId);
  if (target) target.classList.remove('ls-hidden');
}

/* ================================================================
   FETCH HELPER
   ================================================================ */
async function _lsFetch(endpoint, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (lsState.currentUser?.token) {
    opts.headers['Authorization'] = `Bearer ${lsState.currentUser.token}`;
  }

  if (body) opts.body = JSON.stringify(body);

  const response = await fetch(`${LS_API}${endpoint}`, opts);
  const data = await response.json();

  if (response.status === 401) {
    // Token expired — log out
    sessionStorage.removeItem('ls_session');
    lsState.currentUser = null;
    lsState.initialized = false;
    _lsShowStep('lsAuthStep');
    lsToast('Session expired. Please log in again.', 'info');
    return {};
  }

  return data;
}

/* ================================================================
   TOAST NOTIFICATION
   ================================================================ */
function lsToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease';
    toast.style.opacity    = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ================================================================
   UTILITY HELPERS
   ================================================================ */
function _lsCapitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function _lsSetLoading(btn, loading, label) {
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="ls-spinner"></span> ${label}`
    : label;
}

/* ================================================================
   PUBLIC EXPORTS (called from script.js or inline)
   ================================================================ */
// initLoveSurvey    — called by script.js nav switcher
// handleLogin       — bound to login button
// loadPreferenceQuestions
// savePreferenceAnswer
// resumeProgress
// startDailyQuiz
// submitQuizAnswer
// finishQuiz
// renderQuizResult
// startCooldownTimer
// startMidnightCountdown
// openChangePasswordModal
// submitPasswordChange
// triggerWhatsAppMessage
// lsToast
