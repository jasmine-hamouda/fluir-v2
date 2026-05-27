// ============ CATEGORY COLOURS ============
const catStyles = {
  kids:     { border: 'rgba(100,180,140,0.4)', color: '#64B48C' },
  work:     { border: 'rgba(90,160,200,0.4)',  color: '#5AA0C8' },
  home:     { border: 'rgba(180,168,100,0.4)', color: '#B4A864' },
  health:   { border: 'rgba(170,130,200,0.4)', color: '#AA82C8' },
  personal: { border: 'rgba(200,144,106,0.4)', color: '#C8906A' },
};

function catTagHTML(cat) {
  const s = catStyles[cat] || catStyles.personal;
  return `<span class="cat-tag" style="border:1px solid ${s.border};color:${s.color};background:transparent;">${cat}</span>`;
}

function getCatColor(cat) {
  return catStyles[cat]?.color || catStyles.personal.color;
}

// ============ TASK DETAIL ============
let currentDetailTaskId = null;

function openTaskDetail(taskId, title, urgency, time, cat, color, date, steps, tip) {
  currentDetailTaskId = taskId;
  document.getElementById('detail-title').textContent = title;
  document.getElementById('detail-date').textContent = date;
  document.getElementById('detail-tip').textContent = tip;
  const s = catStyles[cat] || catStyles.personal;
  document.getElementById('detail-color-bar').style.background = s.color;

  document.getElementById('detail-chips').innerHTML = `
    <span class="urgency-chip ${urgency}">${urgency}</span>
    <span class="time-chip small"><img src="icons/clock.svg" class="chip-icon" alt="" /> ${time}</span>
    ${catTagHTML(cat)}
  `;

  document.getElementById('detail-steps').innerHTML = steps.map((step, i) => `
    <div class="detail-step">
      <span class="detail-step-num">${i+1}</span>
      <span>${step}</span>
    </div>
  `).join('');

  const card = document.getElementById(taskId);
  const isComplete = card && card.classList.contains('completed');
  const btn = document.getElementById('detail-complete-btn');
  btn.textContent = isComplete ? 'completed ✓' : 'mark complete';
  btn.style.opacity = isComplete ? '0.5' : '1';

  navigateTo('screen-task-detail');
}

function completeFromDetail() {
  if (!currentDetailTaskId) return;
  const card = document.getElementById(currentDetailTaskId);
  if (card) { card.classList.add('completed'); updateProgress(); checkAllComplete(); }
  const btn = document.getElementById('detail-complete-btn');
  btn.textContent = 'completed ✓';
  btn.style.opacity = '0.5';
  setTimeout(() => navigateTo('screen-tasks'), 800);
}

// ============ COMMUNITY TOGGLE ============
function toggleCommunity(btn) {
  btn.classList.toggle('active');
  const isOn = btn.classList.contains('active');
  document.querySelectorAll('.nav-btn:last-child').forEach(navBtn => {
    navBtn.style.display = isOn ? 'flex' : 'none';
  });
}

// ============ PERSONA SYSTEM ============
const personas = {
  parent: {
    greeting: 'school run done?',
    nudge: 'the mental load is real. one task at a time is enough.',
    checkinField3Label: 'one thing your kids did that made you smile today',
    checkinField3Placeholder: 'even something small...',
    insightText: 'your hardest moments this week were around 3pm — school pickup and the afternoon dip. your calmest window was Tuesday morning. you showed up every day. that is the whole point.',
    heroTask: 'call the school about Mia\'s appointment',
    tasks: [
      { id: 'task-1', name: 'call the school about Mia', urgency: 'urgent', time: '15 min', cat: 'kids', date: 'today', steps: ['find the school\'s number', 'write down what to say', 'make the call'], tip: 'you show up for your kids every day. this is just one more way you do that.' },
      { id: 'task-2', name: 'reply to Emma\'s message', urgency: 'high', time: '5 min', cat: 'work', date: 'Fri 16 May', steps: ['open the message', 'write a short reply', 'send it'], tip: 'a little movement before replying can help your brain shift gears. even just standing up and stretching first.' },
      { id: 'task-3', name: 'pick up groceries', urgency: 'medium', time: '30 min', cat: 'home', date: 'Sat 17 May', steps: ['check what you need', 'write a quick list', 'go when you\'re ready'], tip: 'click and collect exists for exactly this. same-day options at most supermarkets — your future self will thank you.' },
      { id: 'task-4', name: 'book GP appointment', urgency: 'low', time: '10 min', cat: 'health', date: 'Wed 21 May', steps: ['find your GP\'s number', 'check your availability', 'call and book a time'], tip: 'taking care of yourself makes everything else more possible. this one counts.' },
    ],
    diaryEntries: [
      { date: 'Thursday 15 May', moodColor: '#52A08E', moodLabel: 'okay', moodLabelColor: '#52A08E', well: 'I actually made the phone call I had been putting off for a week. it felt huge but once I did it took five minutes.', hard: 'the school pickup was chaotic and I lost my keys twice. by 6pm I had nothing left.' },
      { date: 'Wednesday 14 May', moodColor: '#84A89E', moodLabel: 'calm', moodLabelColor: '#84A89E', well: 'had a slow morning for once. made coffee before anyone needed anything from me.', hard: 'work email pile feels impossible. I keep opening it and closing it without replying.' },
      { date: 'Tuesday 13 May', moodColor: '#3D7A6A', moodLabel: 'overwhelmed', moodLabelColor: '#3D7A6A', well: 'I asked for help for the first time in a long time. my sister picked Mia up from school.', hard: 'everything felt loud and too much. I cried in the car. I needed that.' },
    ],
    diarySummary: '"a mix of hard and good. you made a phone call you had been avoiding for a week. you asked for help for the first time in a long time. you cried in the car and called it what it was. you kept going."',
  },
  solo: {
    greeting: 'you are doing this. all of it.',
    nudge: 'you cannot pour from an empty cup. one thing for you today.',
    checkinField3Label: 'what do you need that you haven\'t asked for?',
    checkinField3Placeholder: 'it is okay to need things...',
    insightText: 'you were never failing. you were doing the work of two people without the tools you needed.',
    heroTask: 'call the school about Mia\'s appointment',
    tasks: [
      { id: 'task-1', name: 'call the school about Mia', urgency: 'urgent', time: '15 min', cat: 'kids', date: 'today', steps: ['find the school\'s number', 'write down what to say', 'make the call'], tip: 'you show up for your kids every day — all on your own. this is just one more way you do that.' },
      { id: 'task-2', name: 'reply to Emma\'s message', urgency: 'high', time: '5 min', cat: 'work', date: 'Fri 16 May', steps: ['open the message', 'write a short reply', 'send it'], tip: 'a little movement before replying can help your brain shift gears. even just standing up and stretching first.' },
      { id: 'task-3', name: 'pick up groceries', urgency: 'medium', time: '30 min', cat: 'home', date: 'Sat 17 May', steps: ['check what you need', 'write a quick list', 'go when you\'re ready'], tip: 'click and collect exists for exactly this. same-day options at most supermarkets — your future self will thank you.' },
      { id: 'task-4', name: 'book GP appointment', urgency: 'low', time: '10 min', cat: 'health', date: 'Wed 21 May', steps: ['find your GP\'s number', 'check your availability', 'call and book a time'], tip: 'taking care of yourself is not optional. it is what makes everything else possible.' },
    ],
    diaryEntries: [
      { date: 'Thursday 15 May', moodColor: '#52A08E', moodLabel: 'okay', moodLabelColor: '#52A08E', well: 'I got through the whole day without asking anyone for help — and actually felt okay about it for once.', hard: 'bedtime on my own again. by the time Mia was asleep I had nothing left for myself.' },
      { date: 'Wednesday 14 May', moodColor: '#84A89E', moodLabel: 'calm', moodLabelColor: '#84A89E', well: 'woke up before Mia and had 20 minutes to myself. it made the whole morning different.', hard: 'the mental load of doing everything alone hit me hard today. nobody to hand things off to.' },
      { date: 'Tuesday 13 May', moodColor: '#3D7A6A', moodLabel: 'overwhelmed', moodLabelColor: '#3D7A6A', well: 'I asked my sister for help and she said yes. it took everything in me to ask.', hard: 'I keep thinking I should be able to handle this by now. I know that thought is not true but it still comes.' },
    ],
    diarySummary: '"a hard week with moments of real strength in it. you are carrying more than most people realise — and you are still here, still showing up. that is not nothing. that is everything."',
  },
  nochildren: {
    greeting: 'this time is yours.',
    nudge: 'your focus window is a superpower. protect it today.',
    checkinField3Label: null,
    checkinField3Placeholder: null,
    insightText: 'you have been figuring it out your whole life. imagine what you can do now that you have the right map.',
    heroTask: 'finish the project report',
    tasks: [
      { id: 'task-1', name: 'finish the project report', urgency: 'urgent', time: '2 hrs', cat: 'work', date: 'today', steps: ['open the document', 'write the conclusion section', 'do a final proofread'], tip: '20 minutes of focused writing is still writing. short sprints work beautifully for ADHD brains.' },
      { id: 'task-2', name: 'reply to Emma\'s message', urgency: 'high', time: '5 min', cat: 'personal', date: 'Fri 16 May', steps: ['open the message', 'write a short reply', 'send it'], tip: 'a little movement before replying can help your brain shift gears. even just standing up and stretching first.' },
      { id: 'task-3', name: 'pick up groceries', urgency: 'medium', time: '30 min', cat: 'home', date: 'Sat 17 May', steps: ['check what you need', 'write a quick list', 'go when you\'re ready'], tip: 'click and collect exists for exactly this. same-day options at most supermarkets — your future self will thank you.' },
      { id: 'task-4', name: 'book GP appointment', urgency: 'low', time: '10 min', cat: 'health', date: 'Wed 21 May', steps: ['find your GP\'s number', 'check your availability', 'call and book a time'], tip: 'taking care of yourself makes everything else more possible. this one counts.' },
    ],
    diaryEntries: [
      { date: 'Thursday 15 May', moodColor: '#52A08E', moodLabel: 'okay', moodLabelColor: '#52A08E', well: 'got into a flow state with work for almost two hours. remembered what it feels like when things click.', hard: 'crashed hard after the flow state ended. the contrast always catches me off guard.' },
      { date: 'Wednesday 14 May', moodColor: '#84A89E', moodLabel: 'calm', moodLabelColor: '#84A89E', well: 'worked from a café today. the change of environment helped more than I expected.', hard: 'the email inbox is a source of genuine dread. I need a system that actually works for my brain.' },
      { date: 'Tuesday 13 May', moodColor: '#3D7A6A', moodLabel: 'overwhelmed', moodLabelColor: '#3D7A6A', well: 'said no to something I did not want to do. it felt uncomfortable but right.', hard: 'everything piled up at once. work, admin, life admin. nowhere to put it all.' },
    ],
    diarySummary: '"a week of real contrasts — flow states and crashes, clarity and noise. your brain works in bursts and that is not a flaw. the key is learning to work with the rhythm, not against it."',
  },
};

function applyPersona() {
  const params = new URLSearchParams(window.location.search);
  const persona = params.get('persona') || 'parent';
  const config = personas[persona] || personas.parent;

  const greetingSub = document.getElementById('greeting-sub');
  if (greetingSub) greetingSub.textContent = config.greeting;

  const nudgeText = document.getElementById('nudge-text');
  if (nudgeText) nudgeText.textContent = config.nudge;

  const insightEl = document.getElementById('reflection-insight');
  if (insightEl) insightEl.textContent = config.insightText;

  const heroTask = document.querySelector('.hero-task');
  if (heroTask) heroTask.textContent = config.heroTask;

  const field3 = document.getElementById('checkin-field-3');
  const field3Label = document.getElementById('checkin-field-3-label');
  const field3Input = document.getElementById('checkin-field-3-input');
  if (field3) {
    if (config.checkinField3Label) {
      field3.style.display = 'flex';
      if (field3Label) field3Label.textContent = config.checkinField3Label;
      if (field3Input) field3Input.placeholder = config.checkinField3Placeholder;
    } else {
      field3.style.display = 'none';
    }
  }

  const taskList = document.getElementById('task-list');
  if (taskList && config.tasks) {
    taskList.innerHTML = config.tasks.map(t => `
      <div class="task-card" id="${t.id}" data-category="${t.cat}" data-urgency="${t.urgency}" style="--task-color:${getCatColor(t.cat)};" onclick="openTaskDetail('${t.id}','${t.name}','${t.urgency}','${t.time}','${t.cat}','${getCatColor(t.cat)}','${t.date}',${JSON.stringify(t.steps)},'${t.tip.replace(/'/g, "\\'")}')">
        <div class="task-color-bar"></div>
        <div class="task-body">
          <div class="task-top">
            <div class="task-left">
              <button class="task-check" onclick="event.stopPropagation();completeTask('${t.id}')" aria-label="complete task"><img src="icons/check-circle.svg" alt="" /></button>
              <div class="task-info">
                <p class="task-name">${t.name}</p>
                <div class="task-meta">
                  <span class="urgency-chip ${t.urgency}">${t.urgency}</span>
                  <span class="time-chip small"><img src="icons/clock.svg" class="chip-icon" alt="" /> ${t.time}</span>
                  ${catTagHTML(t.cat)}
                </div>
                <p class="task-date">${t.date}</p>
              </div>
            </div>
            <img src="icons/arrow-right.svg" class="task-chevron" alt="" />
          </div>
        </div>
      </div>`).join('');
  }

  const entriesList = document.querySelector('.mood-entries-list');
  if (entriesList && config.diaryEntries) {
    entriesList.innerHTML = config.diaryEntries.map(e => `
      <div class="mood-entry-card">
        <div class="mood-entry-header">
          <div class="mood-entry-date-row">
            <span class="mood-entry-date">${e.date}</span>
            <span class="mood-entry-dot" style="background:${e.moodColor};"></span>
          </div>
          <span class="mood-entry-label" style="color:${e.moodLabelColor};">${e.moodLabel}</span>
        </div>
        <div class="mood-entry-body">
          <div class="mood-entry-field">
            <p class="mood-entry-field-label">what went well</p>
            <p class="mood-entry-field-text">${e.well}</p>
          </div>
          <div class="mood-entry-field">
            <p class="mood-entry-field-label">what was hard</p>
            <p class="mood-entry-field-text">${e.hard}</p>
          </div>
        </div>
      </div>`).join('');
  }

  const diarySummary = document.querySelector('.diary-summary-text');
  if (diarySummary && config.diarySummary) diarySummary.textContent = config.diarySummary;

  const categoryFilter = document.querySelector('.category-filter');
  if (categoryFilter) {
    const showKids = persona === 'parent' || persona === 'solo';
    const kidsChip = categoryFilter.querySelector('[onclick*="kids"]');
    if (kidsChip) kidsChip.style.display = showKids ? '' : 'none';
  }
}

// ============ NAVIGATION ============
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    const scroll = target.querySelector('.screen-scroll');
    if (scroll) scroll.scrollTop = 0;
  }
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
}

// ============ CHIP SELECTION ============
function selectChip(chip, group) {
  chip.closest('.chip-group').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
}

function selectTopic(chip) {
  document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
}

// ============ MOOD EXPAND ============
function expandMood() {
  const trigger = document.getElementById('mood-trigger');
  const panel = document.getElementById('mood-expand');
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  } else {
    panel.classList.add('open');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
}

// ============ MOOD SELECTION ============
let currentMood = null;
let moodLog = [];

function selectMood(btn, mood) {
  const allBtns = btn.closest('.mood-row').querySelectorAll('.mood-btn');
  allBtns.forEach(m => { m.classList.remove('selected'); m.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('selected');
  btn.setAttribute('aria-pressed', 'true');
  currentMood = mood;
  const why = document.getElementById('mood-why');
  const saved = document.getElementById('mood-saved');
  if (why) why.classList.add('visible');
  if (saved) saved.classList.remove('visible');
  const label = document.getElementById('mood-trigger-label');
  const moodLabels = { calm: 'feeling calm', okay: 'feeling okay', overwhelmed: 'feeling overwhelmed' };
  if (label) label.textContent = moodLabels[mood] || 'how are you feeling?';
}

function saveMoodEntry() {
  const note = document.getElementById('mood-why-input')?.value || '';
  const now = new Date();
  moodLog.push({ mood: currentMood, note, time: now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }), date: now.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }), timestamp: now.getTime() });
  updateReflectionInsight();
  const why = document.getElementById('mood-why');
  const saved = document.getElementById('mood-saved');
  if (why) why.classList.remove('visible');
  if (saved) saved.classList.add('visible');

  // collapse panel and mark trigger as logged after short delay
  setTimeout(() => {
    if (saved) saved.classList.remove('visible');
    const input = document.getElementById('mood-why-input');
    if (input) input.value = '';
    const panel = document.getElementById('mood-expand');
    const trigger = document.getElementById('mood-trigger');
    if (panel) { panel.classList.remove('open'); }
    if (trigger) { trigger.classList.remove('open'); trigger.classList.add('logged'); }
  }, 1200);
}

function updateReflectionInsight() {
  const insightEl = document.getElementById('reflection-insight');
  if (!insightEl || moodLog.length === 0) return;
  const moods = moodLog.map(e => e.mood);
  const overwhelmedCount = moods.filter(m => m === 'overwhelmed').length;
  const calmCount = moods.filter(m => m === 'calm').length;
  const latestNote = moodLog[moodLog.length - 1].note;
  let insight = '';
  if (overwhelmedCount > calmCount) {
    insight = `this has been a heavy stretch. overwhelmed came up most often${latestNote ? ' — and you noted: "' + latestNote + '"' : ''}. you are still here. that matters.`;
  } else if (calmCount > 0) {
    insight = `your calm moments are real and worth noticing.${latestNote ? ' you wrote: "' + latestNote + '" — ' : ' '}your brain is finding its rhythm. keep going.`;
  } else {
    insight = `your hardest moments this week were around 3pm — school pickup and the afternoon dip. your calmest window was Tuesday morning. you showed up every day. that is the whole point.`;
  }
  insightEl.textContent = insight;
}

function switchMoodView(btn, view) {
  document.querySelectorAll('.mood-view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const weekly = document.getElementById('mood-chart-weekly');
  const daily = document.getElementById('mood-chart-daily');
  if (weekly) weekly.classList.toggle('hidden', view !== 'weekly');
  if (daily) daily.classList.toggle('hidden', view !== 'daily');
}

function selectCheckinMood(btn) {
  document.querySelectorAll('.checkin-mood-btn').forEach(m => m.classList.remove('selected'));
  btn.classList.add('selected');
}

// ============ TASK COMPLETION ============
function completeTask(taskId) {
  const card = document.getElementById(taskId);
  if (card) { card.classList.toggle('completed'); updateProgress(); checkAllComplete(); }
}

// V2 CHANGE: updateProgress now updates the unified progress bar instead of
// the old SVG ring and two separate progress elements.
function updateProgress() {
  const total = document.querySelectorAll('.task-card').length;
  const completed = document.querySelectorAll('.task-card.completed').length;

  // Update unified progress bar width
  const fill = document.getElementById('progress-bar-fill');
  if (fill && total > 0) {
    fill.style.width = Math.round((completed / total) * 100) + '%';
  }

  // Update the count label
  const countEl = document.getElementById('progress-count');
  if (countEl) {
    countEl.textContent = `${completed} of ${total} today · 12 this week`;
  }
}

function checkAllComplete() {
  const total = document.querySelectorAll('.task-card').length;
  const completed = document.querySelectorAll('.task-card.completed').length;
  const completeState = document.getElementById('task-complete-state');
  if (completeState) completeState.classList.toggle('visible', completed === total);
  if (completed === total && total > 0) showConfetti();
}

// ============ CONFETTI ============
function showConfetti() {
  const overlay = document.getElementById('confetti-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 4000);
}

// ============ TASK BREAKDOWN ============
function toggleBreakdown(taskId) {
  const steps = document.getElementById('breakdown-' + taskId);
  if (steps) steps.classList.toggle('open');
}

// ============ RESET TASKS ============
function resetTasks() {
  const confirmed = confirm("this will clear all your completed tasks. ready to start fresh?");
  if (!confirmed) return;
  document.querySelectorAll('.task-card').forEach(card => card.classList.remove('completed'));
  document.querySelectorAll('.breakdown-steps').forEach(steps => steps.classList.remove('open'));
  const completeState = document.getElementById('task-complete-state');
  if (completeState) completeState.classList.remove('visible');
  updateProgress();
}

// ============ CATEGORY FILTER ============
function filterCategory(chip, category) {
  document.querySelectorAll('.cat-filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  document.querySelectorAll('.task-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
  });
}

// ============ ADD TASK MODAL ============
function openAddTask() {
  const modal = document.getElementById('add-task-modal');
  if (modal) modal.classList.add('open');
  const dateInput = document.getElementById('task-date-input');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

function closeAddTask() {
  const modal = document.getElementById('add-task-modal');
  if (modal) modal.classList.remove('open');
  document.getElementById('breakdown-loading').classList.remove('visible');
  document.getElementById('breakdown-preview').classList.remove('visible');
  document.getElementById('custom-cat-form').classList.remove('open');
  const input = document.getElementById('task-title-input');
  if (input) input.value = '';
}

function selectCategory(btn) {
  document.querySelectorAll('.cat-option').forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
}

function addCustomCategory() {
  document.getElementById('custom-cat-form').classList.toggle('open');
}

// ============ TIP TEMPLATES ============
const tipTemplates = {
  call: "phone calls take more out of ADHD brains than most people realise. mid-morning is usually when your brain is warmest for this.",
  email: "a little movement before replying can help your brain shift gears. even just standing up and stretching first.",
  groceries: "click and collect exists for exactly this. same-day options at most supermarkets — your future self will thank you.",
  clean: "putting something on to listen to while you clean is a genuine strategy. your brain loves a soundtrack.",
  book: "once it is done it is done. starting is the hardest part — after that it takes care of itself.",
  write: "20 minutes of writing is still writing. short focused sprints work beautifully for ADHD brains.",
  kids: "you show up for your kids every day. this is just one more way you do that.",
  health: "taking care of yourself makes everything else more possible. this one counts.",
  work: "one focused hour does more than three scattered ones. find your window and protect it.",
  default: "you do not have to do this perfectly. you just have to start."
};

function getTip(title) {
  const t = title.toLowerCase();
  if (t.includes('call') || t.includes('phone') || t.includes('ring')) return tipTemplates.call;
  if (t.includes('email') || t.includes('reply') || t.includes('message')) return tipTemplates.email;
  if (t.includes('groceries') || t.includes('shop') || t.includes('buy') || t.includes('pick up')) return tipTemplates.groceries;
  if (t.includes('clean') || t.includes('tidy') || t.includes('wash')) return tipTemplates.clean;
  if (t.includes('book') || t.includes('appointment') || t.includes('schedule')) return tipTemplates.book;
  if (t.includes('write') || t.includes('report') || t.includes('draft') || t.includes('essay')) return tipTemplates.write;
  if (t.includes('kids') || t.includes('school') || t.includes('mia') || t.includes('pickup')) return tipTemplates.kids;
  if (t.includes('gp') || t.includes('doctor') || t.includes('health') || t.includes('medical')) return tipTemplates.health;
  if (t.includes('work') || t.includes('meeting') || t.includes('presentation')) return tipTemplates.work;
  return tipTemplates.default;
}

// ============ AI BREAKDOWN SIMULATION ============
const breakdownTemplates = {
  call: ['find the contact number', 'write down what you need to say', 'make the call'],
  email: ['open your email', 'write a short clear message', 'send it'],
  book: ['check your availability', 'find the contact details', 'make the booking'],
  buy: ['write a list of what you need', 'check if you have time today', 'go when you feel ready'],
  clean: ['pick one area to start with', 'set a 10 minute timer', 'do what you can in that time'],
  default: ['take a breath and start small', 'do the first step only', 'move to the next when ready']
};

function generateBreakdown() {
  const title = document.getElementById('task-title-input').value.toLowerCase();
  const loading = document.getElementById('breakdown-loading');
  const preview = document.getElementById('breakdown-preview');
  const stepsContainer = document.getElementById('breakdown-preview-steps');
  if (!title.trim()) { alert('add a task title first'); return; }
  loading.classList.add('visible');
  preview.classList.remove('visible');
  setTimeout(() => {
    loading.classList.remove('visible');
    let steps = breakdownTemplates.default;
    if (title.includes('call') || title.includes('phone')) steps = breakdownTemplates.call;
    else if (title.includes('email') || title.includes('reply') || title.includes('message')) steps = breakdownTemplates.email;
    else if (title.includes('book') || title.includes('appointment')) steps = breakdownTemplates.book;
    else if (title.includes('buy') || title.includes('shop') || title.includes('groceries')) steps = breakdownTemplates.buy;
    else if (title.includes('clean') || title.includes('tidy')) steps = breakdownTemplates.clean;
    stepsContainer.innerHTML = steps.map((step, i) => `<p class="step">${i + 1}. ${step}</p>`).join('');
    preview.classList.add('visible');
  }, 1800);
}

// ============ ADD TASK ============
let taskCounter = 5;

function calculateUrgency(dateStr, timeEstimate) {
  if (!dateStr) return 'medium';
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(dateStr + 'T00:00:00'); due.setHours(0,0,0,0);
  const daysUntil = Math.round((due - today) / (1000 * 60 * 60 * 24));
  const mins = parseInt(timeEstimate);
  if (daysUntil <= 0 && mins >= 30) return 'urgent';
  if (daysUntil <= 1 && mins >= 15) return 'urgent';
  if (daysUntil <= 2) return 'high';
  if (daysUntil <= 5) return 'medium';
  return 'low';
}

function addTask() {
  const title = document.getElementById('task-title-input').value.trim();
  if (!title) { alert('please add a task title'); return; }
  const dateVal = document.getElementById('task-date-input').value;
  const timeVal = document.getElementById('task-time-input').value;
  const selectedCat = document.querySelector('.cat-option.selected');
  const catName = selectedCat ? selectedCat.dataset.cat : 'personal';
  const urgency = calculateUrgency(dateVal, timeVal);
  const timeLabel = timeVal >= 120 ? '2+ hrs' : timeVal >= 60 ? '1 hr' : `${timeVal} min`;
  const taskId = `task-${taskCounter++}`;
  const stepsEl = document.getElementById('breakdown-preview-steps');
  const stepsHTML = stepsEl && stepsEl.innerHTML ? stepsEl.innerHTML : '<p class="step">1. take a breath and start</p><p class="step">2. do the first small thing</p><p class="step">3. keep going</p>';
  const tip = getTip(title);
  const catColor = getCatColor(catName);

  let dateDisplay = '';
  if (dateVal) {
    const d = new Date(dateVal + 'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    dateDisplay = d.getTime() === today.getTime() ? 'today' : d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  const taskHTML = `
    <div class="task-card" id="${taskId}" data-category="${catName}" data-urgency="${urgency}" style="--task-color:${catColor};">
      <div class="task-color-bar"></div>
      <div class="task-body">
        <div class="task-top">
          <div class="task-left">
            <button class="task-check" onclick="completeTask('${taskId}')" aria-label="complete task">
              <img src="icons/check-circle.svg" alt="" />
            </button>
            <div class="task-info">
              <p class="task-name">${title}</p>
              <div class="task-meta">
                <span class="urgency-chip ${urgency}">${urgency}</span>
                <span class="time-chip small"><img src="icons/clock.svg" class="chip-icon" alt="" /> ${timeLabel}</span>
                ${catTagHTML(catName)}
              </div>
              ${dateDisplay ? `<p class="task-date">${dateDisplay}</p>` : ''}
            </div>
          </div>
        </div>
        <button class="breakdown-btn" onclick="toggleBreakdown('${taskId}')">break it down</button>
        <div class="breakdown-steps" id="breakdown-${taskId}">${stepsHTML}</div>
        <div class="fluir-tip">
          <img src="icons/sun-dim.svg" class="tip-icon" alt="" />
          <p>${tip}</p>
        </div>
      </div>
    </div>`;

  const taskList = document.getElementById('task-list');
  if (taskList) {
    urgency === 'urgent' ? taskList.insertAdjacentHTML('afterbegin', taskHTML) : taskList.insertAdjacentHTML('beforeend', taskHTML);
  }
  closeAddTask();
  updateProgress();
}

// ============ BRAIN DUMP ============
function organiseBrainDump() {
  const text = document.getElementById('brain-dump-input').value.trim();
  if (!text) { alert('write something first — anything on your mind'); return; }
  const loading = document.getElementById('dump-loading');
  const results = document.getElementById('dump-results');
  loading.classList.add('visible');
  results.classList.remove('visible');

  setTimeout(() => {
    loading.classList.remove('visible');
    const triggerPrefixes = /^(i need to|need to|have to|got to|i have to|i got to|supposed to|i want to|want to|i should|should|still need to|i keep forgetting to|been meaning to)\s+/i;
    const rawParts = text.split(/[,.\n]|\band\b|\balso\b|\bplus\b|\bthen\b/gi).map(s => s.trim()).filter(s => s.length > 2);
    const foundTasks = rawParts.slice(0, 6).map((part, i) => {
      const title = part.replace(triggerPrefixes, '').trim();
      const cat = detectCategory(title);
      return { id: i, title, cat, color: getCatColor(cat) };
    }).filter(t => t.title.length > 2);

    const taskListEl = document.getElementById('dump-task-list');
    taskListEl.innerHTML = foundTasks.map(t => {
      const s = catStyles[t.cat] || catStyles.personal;
      return `
      <div class="dump-task-item" id="dump-item-${t.id}">
        <div class="dump-task-main">
          <div class="dump-task-dot" style="background:${t.color};"></div>
          <p class="dump-task-title">${t.title}</p>
          <span class="cat-tag dump-cat-tag" id="dump-cat-label-${t.id}" style="border:1px solid ${s.border};color:${s.color};background:transparent;">${t.cat}</span>
          <button class="dump-edit-btn" onclick="openDumpEditOverlay(${t.id}, '${t.title.replace(/'/g, "\\'")}', '${t.cat}', '${t.color}')">edit</button>
        </div>
      </div>`;
    }).join('');

    taskListEl.dataset.tasks = JSON.stringify(foundTasks);
    results.classList.add('visible');
  }, 2000);
}

function detectCategory(text) {
  const t = text.toLowerCase();
  if (/school|mia|kids|pickup|drop off|homework|teacher|uniform|excursion|permission/.test(t)) return 'kids';
  if (/work|email|meeting|boss|report|presentation|deadline|colleague|client/.test(t)) return 'work';
  if (/groceries|shop|supermarket|clean|tidy|wash|laundry|dishes|home|house|bin/.test(t)) return 'home';
  if (/gp|doctor|dentist|appointment|health|medical|prescription|pharmacy|exercise/.test(t)) return 'health';
  return 'personal';
}

function openDumpEditOverlay(id, title, cat, color) {
  const overlay = document.getElementById('dump-edit-overlay');
  overlay.dataset.taskId = id;
  document.getElementById('dump-overlay-title').value = title;
  overlay.querySelectorAll('.dump-inline-cat').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.cat === cat);
  });
  overlay.dataset.cat = cat;
  overlay.dataset.color = color;
  overlay.classList.add('active');
}

function closeDumpEditOverlay() {
  document.getElementById('dump-edit-overlay').classList.remove('active');
}

function pickDumpCat(id, btn, cat, color) {
  btn.closest('.dump-inline-cats').querySelectorAll('.dump-inline-cat').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const overlay = document.getElementById('dump-edit-overlay');
  overlay.dataset.cat = cat;
  overlay.dataset.color = getCatColor(cat);
}

function saveDumpOverlayEdit() {
  const overlay = document.getElementById('dump-edit-overlay');
  const id = parseInt(overlay.dataset.taskId);
  const newTitle = document.getElementById('dump-overlay-title').value.trim();
  const newCat = overlay.dataset.cat || 'personal';
  const newColor = getCatColor(newCat);
  if (!newTitle) return;
  const item = document.getElementById(`dump-item-${id}`);
  if (item) {
    item.querySelector('.dump-task-title').textContent = newTitle;
    item.querySelector('.dump-task-dot').style.background = newColor;
    const label = document.getElementById(`dump-cat-label-${id}`);
    const s = catStyles[newCat] || catStyles.personal;
    if (label) {
      label.textContent = newCat;
      label.style.border = `1px solid ${s.border}`;
      label.style.color = s.color;
      label.style.background = 'transparent';
    }
  }
  const taskListEl = document.getElementById('dump-task-list');
  const tasks = JSON.parse(taskListEl.dataset.tasks || '[]');
  const task = tasks.find(t => t.id === id);
  if (task) { task.title = newTitle; task.cat = newCat; task.color = newColor; }
  taskListEl.dataset.tasks = JSON.stringify(tasks);
  closeDumpEditOverlay();
}

function addDumpTasks() {
  const taskListEl = document.getElementById('dump-task-list');
  const tasks = JSON.parse(taskListEl.dataset.tasks || '[]');
  const taskList = document.getElementById('task-list');
  tasks.forEach(t => {
    const id = `task-${taskCounter++}`;
    const tip = getTip(t.title);
    const catColor = getCatColor(t.cat);
    taskList.insertAdjacentHTML('beforeend', `
      <div class="task-card" id="${id}" data-category="${t.cat}" data-urgency="medium" style="--task-color:${catColor};">
        <div class="task-color-bar"></div>
        <div class="task-body">
          <div class="task-top">
            <div class="task-left">
              <button class="task-check" onclick="completeTask('${id}')" aria-label="complete task">
                <img src="icons/check-circle.svg" alt="" />
              </button>
              <div class="task-info">
                <p class="task-name">${t.title}</p>
                <div class="task-meta">
                  <span class="urgency-chip medium">medium</span>
                  ${catTagHTML(t.cat)}
                </div>
              </div>
            </div>
          </div>
          <button class="breakdown-btn" onclick="toggleBreakdown('${id}')">break it down</button>
          <div class="breakdown-steps" id="breakdown-${id}">
            <p class="step">1. take a breath and start</p>
            <p class="step">2. do the first small thing</p>
            <p class="step">3. keep going</p>
          </div>
          <div class="fluir-tip">
            <img src="icons/sun-dim.svg" class="tip-icon" alt="" />
            <p>${tip}</p>
          </div>
        </div>
      </div>`);
  });
  navigateTo('screen-tasks');
  updateProgress();
}

function clearDump() {
  document.getElementById('brain-dump-input').value = '';
  document.getElementById('dump-results').classList.remove('visible');
}

// ============ HARD DAY MODE ============
function activateHardDay() { document.getElementById('hard-day-overlay').classList.add('active'); }
function deactivateHardDay() { document.getElementById('hard-day-overlay').classList.remove('active'); }

// ============ SENSORY TOOLKIT ============
function switchToolkit(tab, panel) {
  document.querySelectorAll('.toolkit-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.toolkit-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('toolkit-' + panel).classList.remove('hidden');
  if (panel === 'breathing') stopBreathing();
}

// ============ BOX BREATHING ============
let breathingActive = false;

function toggleBreathing() {
  breathingActive = !breathingActive;
  const btn = document.getElementById('breathing-btn');
  const player = document.querySelector('#toolkit-breathing dotlottie-player');
  if (breathingActive) {
    btn.textContent = 'stop';
    if (player) player.play();
  } else {
    btn.textContent = 'start';
    if (player) player.stop();
  }
}

function stopBreathing() {
  breathingActive = false;
  const btn = document.getElementById('breathing-btn');
  if (btn) btn.textContent = 'start';
  const player = document.querySelector('#toolkit-breathing dotlottie-player');
  if (player) player.stop();
}

// ============ 5-4-3-2-1 GROUNDING ============
const groundingSteps = [
  { number: 5, question: 'what can you see?' },
  { number: 4, question: 'what can you touch?' },
  { number: 3, question: 'what can you hear?' },
  { number: 2, question: 'what can you smell?' },
  { number: 1, question: 'what can you taste?' },
];
let groundingStep = 0;

function nextGrounding() {
  groundingStep++;
  if (groundingStep >= groundingSteps.length) {
    document.getElementById('grounding-card').style.display = 'none';
    document.getElementById('grounding-complete').classList.add('visible');
    return;
  }
  const step = groundingSteps[groundingStep];
  document.getElementById('grounding-number').textContent = step.number;
  document.getElementById('grounding-question').textContent = step.question;
  document.getElementById('grounding-input').value = '';
}

function resetGrounding() {
  groundingStep = 0;
  document.getElementById('grounding-card').style.display = 'flex';
  document.getElementById('grounding-complete').classList.remove('visible');
  document.getElementById('grounding-number').textContent = groundingSteps[0].number;
  document.getElementById('grounding-question').textContent = groundingSteps[0].question;
  document.getElementById('grounding-input').value = '';
}

// ============ CHECK-IN SUBMIT ============
function submitCheckin() {
  const confirmation = document.getElementById('checkin-confirmation');
  const form = document.querySelector('.checkin-form');
  const cta = document.querySelector('#screen-checkin .cta-btn');
  if (confirmation) {
    confirmation.classList.add('visible');
    if (form) form.style.display = 'none';
    if (cta) cta.style.display = 'none';
    setTimeout(() => showEndOfDayReward(), 1500);
  }
}

function editCheckin() {
  const confirmation = document.getElementById('checkin-confirmation');
  const form = document.querySelector('.checkin-form');
  const cta = document.querySelector('#screen-checkin .cta-btn');
  if (confirmation) {
    confirmation.classList.remove('visible');
    if (form) form.style.display = 'flex';
    if (cta) cta.style.display = 'block';
  }
}

function showEndOfDayReward() {
  const reward = document.getElementById('end-of-day-reward');
  if (reward) reward.classList.add('visible');
}

function closeReward() {
  const reward = document.getElementById('end-of-day-reward');
  if (reward) reward.classList.remove('visible');
  navigateTo('screen-dashboard');
}

// ============ WAITLIST ============
function joinWaitlist() {
  const confirmation = document.getElementById('waitlist-confirmation');
  const form = document.querySelector('.waitlist-form');
  if (confirmation && form) {
    form.style.display = 'none';
    confirmation.classList.add('visible');
  }
}

// ============ AUDIO TOAST ============
function showAudioToast() {
  const toast = document.getElementById('audio-toast');
  if (!toast) return;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ============ GREETING ============
function setGreeting() {
  const hour = new Date().getHours();
  const sub = document.getElementById('greeting-sub');
  if (!sub) return;
  if (hour < 12) sub.textContent = 'good morning,';
  else if (hour < 17) sub.textContent = 'good afternoon,';
  else sub.textContent = 'good evening,';
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('screen-onboarding');
  applyPersona();
  setGreeting();
});