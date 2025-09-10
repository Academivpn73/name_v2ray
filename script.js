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

function processFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert("فایلی انتخاب نشده!");

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n').map(l => l.trim()).filter(l => l);
    const updated = renameConfigs(lines);
    showOutput(updated);
    createDownload(updated);
  };
  reader.readAsText(file);
}

function processManual() {
  const input = document.getElementById('manualInput').value.trim();
  if (!input) return alert("هیچ کانفیگی وارد نشده!");
  const lines = input.split('\n').map(l => l.trim()).filter(l => l);
  if (lines.length > 10) return alert("حداکثر ۱۰ کانفیگ دستی مجاز است!");

  const updated = renameConfigs(lines);
  showOutput(updated);
  createDownload(updated);
}

function showOutput(lines) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerText = lines.join('\n');
}

function createDownload(lines) {
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.getElementById('downloadLink');
  link.href = url;
  link.download = 'updated_configs.txt';
  link.style.display = 'inline';
  link.textContent = '⬇️ دانلود فایل جدید';
}