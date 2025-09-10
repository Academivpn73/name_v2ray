function getCustomName() {
  const nameInput = document.getElementById('customName').value.trim();
  return nameInput === "" ? "Telegram:@Academi_vpn" : nameInput;
}

function renameConfigs(lines) {
  const newName = getCustomName();
  let counter = 1;
  return lines.map(line => {
    if (line.includes("://")) {
      const parts = line.split("#");
      const renamed = parts[0] + "#" + newName + "_" + counter;
      counter++;
      return renamed;
    }
    return line;
  });
}

function showLoading(show) {
  document.getElementById('loader').style.display = show ? 'block' : 'none';
}

function showDownloadSection(show) {
  document.getElementById('downloadSection').style.display = show ? 'block' : 'none';
}

function processFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert("فایلی انتخاب نشده!");

  showLoading(true);

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n').map(l => l.trim()).filter(l => l);
    const updated = renameConfigs(lines);
    showOutput(updated);
    prepareDownload(updated);
    showLoading(false);
    showDownloadSection(true);
  };
  reader.readAsText(file);
}

function processManual() {
  const input = document.getElementById('manualInput').value.trim();
  if (!input) return alert("هیچ کانفیگی وارد نشده!");
  const lines = input.split('\n').map(l => l.trim()).filter(l => l);
  if (lines.length > 10) return alert("حداکثر ۱۰ کانفیگ دستی مجاز است!");

  showLoading(true);
  const updated = renameConfigs(lines);
  showOutput(updated);
  prepareDownload(updated);
  showLoading(false);
  showDownloadSection(true);
}

let downloadBlob = null;

function prepareDownload(lines) {
  downloadBlob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.onclick = function() {
    const url = URL.createObjectURL(downloadBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated_configs.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

function showOutput(lines) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerText = lines.join('\n');
}

function copyOutput() {
  const outputText = document.getElementById('output').innerText;
  navigator.clipboard.writeText(outputText).then(() => {
    alert("✅ همه کانفیگ‌ها کپی شد!");
  });
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    toggleBtn.textContent = '🌙 حالت شب';
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    toggleBtn.textContent = '☀️ حالت روز';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('dark');
});