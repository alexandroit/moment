const version = "2.30.2";
const dateInput = document.querySelector('#date-input');
const localeSelect = document.querySelector('#locale-select');
const outputNow = document.querySelector('#output-now');
const outputLong = document.querySelector('#output-long');
const outputRelative = document.querySelector('#output-relative');
const outputUtc = document.querySelector('#output-utc');
const exampleCode = document.querySelector('#example-code');

const localeChoices = ['en', 'en-gb', 'fr', 'de', 'es', 'ja', 'zh-cn'];

function populateLocales() {
  localeChoices.forEach((locale) => {
    const option = document.createElement('option');
    option.value = locale;
    option.textContent = locale;
    localeSelect.appendChild(option);
  });
}

function render() {
  const locale = localeSelect.value;
  const value = dateInput.value || new Date().toISOString().slice(0, 16);
  const selected = moment(value);

  moment.locale(locale);

  outputNow.textContent = moment().format('YYYY-MM-DD HH:mm:ss');
  outputLong.textContent = selected.format('LLLL');
  outputRelative.textContent = selected.fromNow();
  outputUtc.textContent = selected.clone().utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
  exampleCode.textContent =
`import moment from '@revivejs/moment';
import '@revivejs/moment/locale/${locale}';

moment.locale('${locale}');

const input = moment('${value}');
input.format('LLLL');
input.fromNow();
input.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');`;
}

populateLocales();
dateInput.value = new Date(Date.now() + 36e5).toISOString().slice(0, 16);
localeSelect.value = 'en';
dateInput.addEventListener('input', render);
localeSelect.addEventListener('change', render);
render();

document.querySelector('#version').textContent = version;
