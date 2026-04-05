(function () {
  const meta = window.__REVIVE_MOMENT_DOCS_META__;

  const localeChoices = ['en', 'en-gb', 'fr', 'de', 'es', 'ja', 'zh-cn'];
  const durationUnits = ['minutes', 'hours', 'days', 'weeks', 'months'];
  const boundaryUnits = ['day', 'week', 'month', 'quarter', 'year'];

  const state = {
    selectedDemoId: 'iso-parse',
    baseDateTime: toLocalDateTime(new Date(Date.now() + 36e5)),
    comparisonDateTime: toLocalDateTime(new Date(Date.now() - 12 * 36e5)),
    locale: 'en',
    customInput: '21/11/2026 18:45',
    formatString: 'DD/MM/YYYY HH:mm',
    strictInput: '2026-02-30',
    strictFormat: 'YYYY-MM-DD',
    parseZoneText: '2026-04-05T14:30:00-05:00',
    durationAmount: 90,
    durationUnit: 'minutes',
    boundaryUnit: 'month'
  };

  const controls = {
    baseDateTime: { label: 'Base datetime', type: 'datetime-local' },
    comparisonDateTime: { label: 'Comparison datetime', type: 'datetime-local' },
    locale: { label: 'Locale', type: 'select', options: localeChoices },
    customInput: { label: 'Custom input', type: 'text' },
    formatString: { label: 'Format string', type: 'text' },
    strictInput: { label: 'Strict input', type: 'text' },
    strictFormat: { label: 'Strict format', type: 'text' },
    parseZoneText: { label: 'Offset-aware input', type: 'text' },
    durationAmount: { label: 'Duration amount', type: 'number', step: '1' },
    durationUnit: { label: 'Duration unit', type: 'select', options: durationUnits },
    boundaryUnit: { label: 'Boundary unit', type: 'select', options: boundaryUnits }
  };

  const demoGroups = [
    {
      title: 'Getting Started',
      demos: [
        {
          id: 'iso-parse',
          category: 'Getting Started',
          title: 'ISO parse and format',
          summary:
            'Use the classic local parser, then inspect long output, ISO serialization, and unix values in one pass.',
          controls: ['baseDateTime', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const value = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              "value.format('LLLL');\n" +
              "value.toISOString();\n" +
              "value.valueOf();"
            );
          },
          run() {
            const selected = moment(state.baseDateTime).locale(state.locale);
            return [
              toneResult('Validity', selected.isValid() ? 'Valid date' : 'Invalid date', selected.isValid() ? 'good' : 'warn'),
              { label: 'Localized format', value: selected.format('LLLL') },
              { label: 'ISO output', value: selected.toISOString() || 'Invalid ISO output' },
              { label: 'Unix milliseconds', value: String(selected.valueOf()) }
            ];
          }
        }
      ]
    },
    {
      title: 'Parsing',
      demos: [
        {
          id: 'custom-format',
          category: 'Parsing',
          title: 'Custom format parsing',
          summary:
            'Parse human-entered input by declaring a format string and inspect the normalized output.',
          controls: ['customInput', 'formatString', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const parsed = moment('${escapeSingle(state.customInput)}', '${escapeSingle(state.formatString)}');\n` +
              "parsed.isValid();\n" +
              "parsed.format('YYYY-MM-DD HH:mm');"
            );
          },
          run() {
            const parsed = moment(state.customInput, state.formatString).locale(state.locale);
            const flags = parsed.parsingFlags();
            return [
              toneResult('Validity', parsed.isValid() ? 'Valid parse' : 'Invalid parse', parsed.isValid() ? 'good' : 'warn'),
              { label: 'Normalized output', value: parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm') : 'No normalized output' },
              { label: 'Locale output', value: parsed.isValid() ? parsed.format('LLLL') : 'No locale output' },
              { label: 'Unused tokens', value: flags.unusedTokens && flags.unusedTokens.length ? flags.unusedTokens.join(', ') : 'None' }
            ];
          }
        },
        {
          id: 'strict-parse',
          category: 'Parsing',
          title: 'Strict parsing',
          summary:
            'Compare lenient and strict parsing so malformed dates are visible before they escape into production logic.',
          controls: ['strictInput', 'strictFormat'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const lenient = moment('${escapeSingle(state.strictInput)}', '${escapeSingle(state.strictFormat)}');\n` +
              `const strict = moment('${escapeSingle(state.strictInput)}', '${escapeSingle(state.strictFormat)}', true);\n` +
              'strict.isValid();'
            );
          },
          run() {
            const lenient = moment(state.strictInput, state.strictFormat);
            const strict = moment(state.strictInput, state.strictFormat, true);
            return [
              toneResult('Lenient parse', lenient.isValid() ? lenient.format('YYYY-MM-DD HH:mm') : 'Invalid', lenient.isValid() ? 'good' : 'warn'),
              toneResult('Strict parse', strict.isValid() ? strict.format('YYYY-MM-DD HH:mm') : 'Invalid', strict.isValid() ? 'good' : 'warn'),
              { label: 'Strict invalidAt()', value: strict.isValid() ? 'Not applicable' : String(strict.invalidAt()) },
              { label: 'Overflow flag', value: String(strict.parsingFlags().overflow) }
            ];
          }
        }
      ]
    },
    {
      title: 'Formatting',
      demos: [
        {
          id: 'locale-switching',
          category: 'Formatting',
          title: 'Locale switching',
          summary:
            'Swap locales live to compare long formats, calendar phrasing, and relative time output.',
          controls: ['baseDateTime', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n" +
              `import '@revivejs/moment/locale/${state.locale}';\n\n` +
              `moment.locale('${state.locale}');\n` +
              `moment('${state.baseDateTime.replace('T', ' ')}').format('LLLL');`
            );
          },
          run() {
            moment.locale(state.locale);
            const selected = moment(state.baseDateTime).locale(state.locale);
            return [
              { label: 'Locale code', value: selected.locale() },
              { label: 'Long format', value: selected.format('LLLL') },
              { label: 'Calendar output', value: selected.calendar() },
              { label: 'Relative output', value: selected.fromNow() }
            ];
          }
        },
        {
          id: 'calendar-time',
          category: 'Formatting',
          title: 'Calendar time output',
          summary:
            'Use calendar phrases for context-aware strings such as “Today”, “Tomorrow”, or exact weekdays.',
          controls: ['baseDateTime', 'comparisonDateTime', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const value = moment('${state.baseDateTime.replace('T', ' ')}').locale('${state.locale}');\n` +
              `value.calendar(moment('${state.comparisonDateTime.replace('T', ' ')}'));`
            );
          },
          run() {
            const selected = moment(state.baseDateTime).locale(state.locale);
            const comparison = moment(state.comparisonDateTime).locale(state.locale);
            return [
              { label: 'Calendar vs now', value: selected.calendar() },
              { label: 'Calendar vs comparison', value: selected.calendar(comparison) },
              { label: 'Weekday label', value: selected.format('dddd, MMMM Do YYYY') },
              { label: 'First day of week', value: String(selected.localeData().firstDayOfWeek()) }
            ];
          }
        }
      ]
    },
    {
      title: 'UTC & Zones',
      demos: [
        {
          id: 'utc-workflow',
          category: 'UTC & Zones',
          title: 'UTC workflow',
          summary:
            'Clone local values into UTC output without mutating the original instance.',
          controls: ['baseDateTime'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const localValue = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              "localValue.clone().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');"
            );
          },
          run() {
            const localValue = moment(state.baseDateTime);
            const utcValue = localValue.clone().utc();
            return [
              { label: 'Local format', value: localValue.format('YYYY-MM-DD HH:mm:ss Z') },
              { label: 'UTC format', value: utcValue.format('YYYY-MM-DD HH:mm:ss [UTC]') },
              { label: 'Local offset (minutes)', value: String(localValue.utcOffset()) },
              { label: 'UTC offset (minutes)', value: String(utcValue.utcOffset()) }
            ];
          }
        },
        {
          id: 'parse-zone',
          category: 'UTC & Zones',
          title: 'Parse zone',
          summary:
            'Preserve the original offset from an input string instead of normalizing immediately to local time.',
          controls: ['parseZoneText'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const zoned = moment.parseZone('${escapeSingle(state.parseZoneText)}');\n` +
              "zoned.format('YYYY-MM-DD HH:mm:ss Z');"
            );
          },
          run() {
            const zoned = moment.parseZone(state.parseZoneText);
            return [
              toneResult('Validity', zoned.isValid() ? 'Valid zone parse' : 'Invalid zone parse', zoned.isValid() ? 'good' : 'warn'),
              { label: 'Preserved offset output', value: zoned.isValid() ? zoned.format('YYYY-MM-DD HH:mm:ss Z') : 'Invalid output' },
              { label: 'Offset minutes', value: zoned.isValid() ? String(zoned.utcOffset()) : 'Invalid' },
              { label: 'UTC clone', value: zoned.isValid() ? zoned.clone().utc().format('YYYY-MM-DD HH:mm:ss [UTC]') : 'Invalid' }
            ];
          }
        }
      ]
    },
    {
      title: 'Durations & Math',
      demos: [
        {
          id: 'relative-time',
          category: 'Durations & Math',
          title: 'Relative time',
          summary:
            'Compare two moments or compare a value against “now” using the classic relative APIs.',
          controls: ['baseDateTime', 'comparisonDateTime', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const left = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              `const right = moment('${state.comparisonDateTime.replace('T', ' ')}');\n` +
              'left.from(right);'
            );
          },
          run() {
            const left = moment(state.baseDateTime).locale(state.locale);
            const right = moment(state.comparisonDateTime).locale(state.locale);
            return [
              { label: 'left.from(right)', value: left.from(right) },
              { label: 'left.to(right)', value: left.to(right) },
              { label: 'right.from(left)', value: right.from(left) },
              { label: 'left.fromNow()', value: left.fromNow() }
            ];
          }
        },
        {
          id: 'duration-humanize',
          category: 'Durations & Math',
          title: 'Duration humanize',
          summary:
            'Build durations from units, inspect ISO output, and compare humanized text with numeric conversions.',
          controls: ['durationAmount', 'durationUnit', 'locale'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const duration = moment.duration(${Number(state.durationAmount)}, '${state.durationUnit}');\n` +
              'duration.humanize();'
            );
          },
          run() {
            moment.locale(state.locale);
            const duration = moment.duration(Number(state.durationAmount), state.durationUnit);
            return [
              { label: 'ISO duration', value: duration.toISOString() },
              { label: 'Humanized', value: duration.humanize() },
              { label: 'As hours', value: duration.asHours().toFixed(2) },
              { label: 'As days', value: duration.asDays().toFixed(2) }
            ];
          }
        },
        {
          id: 'add-subtract',
          category: 'Durations & Math',
          title: 'Add and subtract',
          summary:
            'Keep immutable-style workflows by cloning before date math and inspecting both future and past output.',
          controls: ['baseDateTime', 'durationAmount', 'durationUnit'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const base = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              `base.clone().add(${Number(state.durationAmount)}, '${state.durationUnit}');\n` +
              `base.clone().subtract(${Number(state.durationAmount)}, '${state.durationUnit}');`
            );
          },
          run() {
            const base = moment(state.baseDateTime);
            const amount = Number(state.durationAmount);
            return [
              { label: 'Original', value: base.format('YYYY-MM-DD HH:mm:ss') },
              { label: 'Add', value: base.clone().add(amount, state.durationUnit).format('YYYY-MM-DD HH:mm:ss') },
              { label: 'Subtract', value: base.clone().subtract(amount, state.durationUnit).format('YYYY-MM-DD HH:mm:ss') },
              { label: 'Relative delta', value: `±${amount} ${state.durationUnit}` }
            ];
          }
        },
        {
          id: 'start-end-of',
          category: 'Durations & Math',
          title: 'Start and end of unit',
          summary:
            'Snap a moment to the start or end of a day, week, month, quarter, or year.',
          controls: ['baseDateTime', 'boundaryUnit'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const base = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              `base.clone().startOf('${state.boundaryUnit}');\n` +
              `base.clone().endOf('${state.boundaryUnit}');`
            );
          },
          run() {
            const base = moment(state.baseDateTime);
            return [
              { label: 'Original', value: base.format('YYYY-MM-DD HH:mm:ss') },
              { label: 'startOf()', value: base.clone().startOf(state.boundaryUnit).format('YYYY-MM-DD HH:mm:ss') },
              { label: 'endOf()', value: base.clone().endOf(state.boundaryUnit).format('YYYY-MM-DD HH:mm:ss') },
              { label: 'Unit', value: state.boundaryUnit }
            ];
          }
        }
      ]
    },
    {
      title: 'Comparison & Validation',
      demos: [
        {
          id: 'comparison-range',
          category: 'Comparison & Validation',
          title: 'Comparison and range checks',
          summary:
            'Use the classic comparison helpers to reason about ranges and chronological ordering.',
          controls: ['baseDateTime', 'comparisonDateTime'],
          code() {
            return (
              "import moment from '@revivejs/moment';\n\n" +
              `const left = moment('${state.baseDateTime.replace('T', ' ')}');\n` +
              `const right = moment('${state.comparisonDateTime.replace('T', ' ')}');\n` +
              'left.isBefore(right);'
            );
          },
          run() {
            const left = moment(state.baseDateTime);
            const right = moment(state.comparisonDateTime);
            const min = moment.min(left, right);
            const max = moment.max(left, right);
            const probe = moment().seconds(0).milliseconds(0);
            return [
              { label: 'left.isBefore(right)', value: String(left.isBefore(right)) },
              { label: 'left.isSameOrAfter(right)', value: String(left.isSameOrAfter(right)) },
              { label: 'Diff in hours', value: String(left.diff(right, 'hours', true).toFixed(2)) },
              { label: 'Now inside range', value: String(probe.isBetween(min, max, undefined, '[]')) }
            ];
          }
        }
      ]
    }
  ];

  const elements = {
    demoNav: document.querySelector('#demo-nav'),
    demoCategory: document.querySelector('#demo-category'),
    demoTitlePill: document.querySelector('#demo-title-pill'),
    demoTitle: document.querySelector('#demo-title'),
    demoSummary: document.querySelector('#demo-summary'),
    demoCode: document.querySelector('#demo-code'),
    controls: document.querySelector('#controls'),
    results: document.querySelector('#results'),
    logList: document.querySelector('#log-list'),
    clearLog: document.querySelector('#clear-log'),
    packageLine: document.querySelector('#package-line'),
    docsPath: document.querySelector('#docs-path'),
    runtimeTarget: document.querySelector('#runtime-target')
  };

  const logEntries = [];

  elements.packageLine.textContent = meta.packageVersion;
  elements.docsPath.textContent = `${meta.docsPath}/`;
  elements.runtimeTarget.textContent = meta.runtimeTarget;

  function flattenDemos() {
    return demoGroups.reduce((items, group) => items.concat(group.demos), []);
  }

  function getSelectedDemo() {
    return flattenDemos().find((demo) => demo.id === state.selectedDemoId) || flattenDemos()[0];
  }

  function renderNavigation() {
    elements.demoNav.innerHTML = demoGroups
      .map((group) => {
        const items = group.demos
          .map(
            (demo) =>
              `<button type="button" class="demo-link${demo.id === state.selectedDemoId ? ' active' : ''}" data-demo-id="${demo.id}">${escapeHtml(demo.title)}</button>`
          )
          .join('');

        return `<section class="demo-group"><h3>${escapeHtml(group.title)}</h3><div class="demo-list">${items}</div></section>`;
      })
      .join('');

    elements.demoNav.querySelectorAll('[data-demo-id]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedDemoId = button.getAttribute('data-demo-id');
        pushLog(`Opened demo: ${getSelectedDemo().category} / ${getSelectedDemo().title}.`);
        renderAll();
      });
    });
  }

  function renderControls() {
    const demo = getSelectedDemo();
    elements.controls.innerHTML = demo.controls
      .map((key) => {
        const control = controls[key];
        if (!control) {
          return '';
        }

        if (control.type === 'select') {
          const options = control.options
            .map((option) => {
              const selected = String(state[key]) === option ? ' selected' : '';
              return `<option value="${escapeAttribute(option)}"${selected}>${escapeHtml(option)}</option>`;
            })
            .join('');

          return `<div class="field"><label for="control-${key}">${escapeHtml(control.label)}</label><select id="control-${key}" data-control="${key}">${options}</select></div>`;
        }

        const step = control.step ? ` step="${control.step}"` : '';
        return `<div class="field"><label for="control-${key}">${escapeHtml(control.label)}</label><input id="control-${key}" data-control="${key}" type="${control.type}" value="${escapeAttribute(String(state[key]))}"${step} /></div>`;
      })
      .join('');

    elements.controls.querySelectorAll('[data-control]').forEach((input) => {
      input.addEventListener('input', handleControlChange);
      input.addEventListener('change', handleControlChange);
    });
  }

  function handleControlChange(event) {
    const key = event.target.getAttribute('data-control');
    const definition = controls[key];
    if (!definition) {
      return;
    }

    const nextValue = definition.type === 'number' ? Number(event.target.value) : event.target.value;
    state[key] = nextValue;
    pushLog(`${definition.label} updated to ${String(nextValue || 'empty')}.`);
    renderStage();
  }

  function renderResults() {
    const results = getSelectedDemo().run();
    elements.results.innerHTML = results
      .map(
        (result) =>
          `<div class="result-card${result.tone ? ` ${result.tone}` : ''}"><strong>${escapeHtml(result.label)}</strong><span>${escapeHtml(result.value)}</span></div>`
      )
      .join('');
  }

  function renderStage() {
    const demo = getSelectedDemo();
    elements.demoCategory.textContent = demo.category;
    elements.demoTitlePill.textContent = demo.title;
    elements.demoTitle.textContent = demo.title;
    elements.demoSummary.textContent = demo.summary;
    elements.demoCode.textContent = demo.code();
    renderControls();
    renderResults();
  }

  function renderLog() {
    elements.logList.innerHTML = logEntries
      .map((entry) => `<div class="log-entry">${escapeHtml(entry)}</div>`)
      .join('');
  }

  function pushLog(message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    logEntries.unshift(`${timestamp}  ${message}`);
    logEntries.splice(14);
    renderLog();
  }

  function renderAll() {
    renderNavigation();
    renderStage();
    renderLog();
  }

  elements.clearLog.addEventListener('click', () => {
    logEntries.splice(0, logEntries.length);
    renderLog();
  });

  renderAll();
  pushLog(`Loaded docs line ${meta.packageVersion}.`);
})();

function toLocalDateTime(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    'T',
    pad(date.getHours()),
    ':',
    pad(date.getMinutes())
  ].join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/\n/g, '&#10;');
}

function escapeSingle(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function toneResult(label, value, tone) {
  return { label, value, tone };
}
