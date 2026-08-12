const tabs = document.querySelectorAll('.tab');
const forms = {
  echo: document.getElementById('echo-form'),
  'create-file': document.getElementById('create-file-form'),
  'read-file': document.getElementById('read-file-form')
};
const requestOutput = document.getElementById('request-output');
const responseOutput = document.getElementById('response-output');
const methodDisplay = document.getElementById('method-display');
const statusPill = document.getElementById('status-pill');
const sendButton = document.getElementById('send-button');

let activeAction = 'echo';

function updateActiveAction(action) {
  activeAction = action;

  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.action === action);
  });

  Object.entries(forms).forEach(([key, form]) => {
    form.classList.toggle('hidden', key !== action);
  });

  if (action === 'echo') {
    methodDisplay.textContent = 'GET';
  }
  if (action === 'create-file') {
    methodDisplay.textContent = 'POST';
  }
  if (action === 'read-file') {
    methodDisplay.textContent = 'GET';
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => updateActiveAction(tab.dataset.action));
});

function sanitizeFileName(name) {
  return String(name || '')
    .trim()
    .replace(/\\/g, '/')
    .split('/').pop()
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 64) || 'demo.txt';
}

function buildRequest(action) {
  const baseUrl = window.location.origin + window.location.pathname.replace(/index\.html$/, '');
  const host = window.location.host || 'localhost';

  if (action === 'echo') {
    const text = encodeURIComponent(document.getElementById('echo-text').value.trim() || 'hello');
    return {
      method: 'GET',
      url: `${baseUrl}echo/${text}`,
      requestLine: `GET /echo/${text} HTTP/1.1`,
      headers: [`Host: ${host}`, 'User-Agent: HTTP Playground'],
      requestBody: ''
    };
  }

  if (action === 'create-file') {
    const fileName = sanitizeFileName(document.getElementById('file-name').value);
    const content = document.getElementById('file-content').value;
    return {
      method: 'POST',
      url: `${baseUrl}files/${encodeURIComponent(fileName)}`,
      requestLine: `POST /files/${encodeURIComponent(fileName)} HTTP/1.1`,
      headers: [`Host: ${host}`, 'User-Agent: HTTP Playground', 'Content-Type: text/plain'],
      requestBody: content
    };
  }

  const fileName = sanitizeFileName(document.getElementById('read-file-name').value);
  return {
    method: 'GET',
    url: `${baseUrl}files/${encodeURIComponent(fileName)}`,
    requestLine: `GET /files/${encodeURIComponent(fileName)} HTTP/1.1`,
    headers: [`Host: ${host}`, 'User-Agent: HTTP Playground'],
    requestBody: ''
  };
}

async function sendRequest() {
  const { method, url, requestLine, headers, requestBody } = buildRequest(activeAction);
  const requestText = [requestLine, ...headers, '', requestBody].join('\n');
  requestOutput.textContent = requestText;

  statusPill.textContent = 'sending';
  statusPill.className = 'status-pill sending';
  sendButton.disabled = true;
  responseOutput.textContent = 'Waiting for response...';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      },
      body: method === 'POST' ? requestBody : undefined
    });

    const bodyText = await response.text();
    const responseText = [
      `HTTP/1.1 ${response.status} ${response.statusText}`,
      ...Object.entries({
        'Content-Type': response.headers.get('content-type') || 'text/plain',
        'Content-Length': String(bodyText.length)
      }).map(([key, value]) => `${key}: ${value}`),
      '',
      bodyText || ''
    ].join('\n');

    statusPill.textContent = `HTTP ${response.status}`;
    statusPill.className = `status-pill ${response.ok ? 'ok' : 'error'}`;
    responseOutput.textContent = responseText;
  } catch (error) {
    statusPill.textContent = 'error';
    statusPill.className = 'status-pill error';
    responseOutput.textContent = `HTTP/1.1 503 Service Unavailable\n\n${error.message}`;
  } finally {
    sendButton.disabled = false;
  }
}

sendButton.addEventListener('click', sendRequest);
updateActiveAction(activeAction);
