"use strict";
(() => {
  const keys = ['firstSemester','secondSemester','thirdSemester','fourthSemester','fifthSemester','sixthSemester','seventhSemester','eightSemester'];
  const picker = document.getElementById('semesterPicker');
  if (!picker) return;
  const status = document.getElementById('semesterStatus');
  const theory = document.getElementById('theoryList');
  const lab = document.getElementById('labList');
  let records = null;

  function makeResource(subject, isLab) {
    const wrapper = document.createElement('article');
    wrapper.className = 'subject-item';
    const name = document.createElement('h4');
    name.textContent = subject.subjectName || 'Unnamed subject';
    wrapper.append(name);
    const actions = document.createElement('div');
    actions.className = 'subject-actions';
    const links = isLab ? [['link01', 'Lab notes']] : [['link01', 'Chapter QB'], ['link02', 'Previous QB'], ['link03', 'Notes']];
    links.forEach(([key, label]) => {
      const url = subject[key];
      // Never create dead "Null" links or script links from content data.
      if (typeof url !== 'string' || !/^https:\/\//i.test(url.trim())) return;
      const a = document.createElement('a');
      a.className = 'resource-link';
      a.href = url.trim();
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label + ' ↗';
      actions.append(a);
    });
    if (!actions.children.length) {
      const empty = document.createElement('span');
      empty.className = 'empty-resource';
      empty.textContent = 'Resource not yet available';
      actions.append(empty);
    }
    wrapper.append(actions);
    return wrapper;
  }
  function display(index) {
    if (!records) return;
    const groups = records[keys[index]] || [];
    const subjects = groups.flatMap(group => Array.isArray(group.theory) ? group.theory : []);
    const labs = groups.flatMap(group => Array.isArray(group.lab) ? group.lab : []);
    theory.replaceChildren(...subjects.map(item => makeResource(item, false)));
    lab.replaceChildren(...labs.map(item => makeResource(item, true)));
    if (!subjects.length) theory.textContent = 'No theory subjects listed.';
    if (!labs.length) lab.textContent = 'No lab subjects listed.';
    document.getElementById('semesterTitle').textContent = 'Semester ' + String(index + 1).padStart(2, '0');
    document.getElementById('subjectCount').textContent = (subjects.length + labs.length) + ' subjects';
    document.getElementById('theoryCount').textContent = String(subjects.length);
    document.getElementById('labCount').textContent = String(labs.length);
    picker.querySelectorAll('[data-semester]').forEach(btn => {
      const selected = Number(btn.dataset.semester) === index;
      btn.classList.toggle('active', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });
    status.textContent = '';
    history.replaceState(null, '', '#semester-' + (index + 1));
  }
  picker.addEventListener('click', e => {
    const target = e.target.closest('[data-semester]');
    if (target) display(Number(target.dataset.semester));
  });
  picker.addEventListener('keydown', e => {
    if (!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)) return;
    const current = e.target.closest('[data-semester]');
    if (!current) return;
    const index = Number(current.dataset.semester);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? 7 :
      (index + (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : -1) + 8) % 8;
    e.preventDefault();
    const target = picker.querySelector(`[data-semester="${next}"]`);
    target.focus();
    display(next);
  });
  window.addEventListener('hashchange', () => {
    const match = /^#semester-([1-8])$/.exec(location.hash);
    if (match) display(Number(match[1]) - 1);
  });
  const initial = /^#semester-([1-8])$/.exec(location.hash);
  fetch('json/subject.json')
    .then(response => {if (!response.ok) throw new Error('HTTP ' + response.status); return response.json();})
    .then(data => {records = data;display(initial ? Number(initial[1]) - 1 : 0);})
    .catch(() => {status.textContent = 'Unable to load subjects. Please run this website through a local web server and try again.';document.getElementById('subjectCount').textContent = 'Unavailable';});
})();
