const qrForm = document.querySelector('#qr-form')
const qrOutput = document.querySelector("#qr-output")

qrForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(qrForm)
  const qrInput = formData.get('qr-input')
  const qrSize = +formData.get('qr-size')

  validateInput(qrInput)
  clearOutput()
  generateQrCode(qrInput, qrSize)
  setTimeout(() => {
    createDownloadButton(qrOutput.querySelector('img').src)
  }, 50)
})

function generateQrCode(text, size) {
  new QRCode(qrOutput, {
    text: text,
    width: size,
    height: size,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  })
}

function clearOutput() {
  qrOutput.innerHTML = ''
  document.querySelector('#qr-download-link').innerHTML = ''
}

function validateInput(input) {
  if (input == '') {
    alert('Please fill input field first!')
  }
}

function createDownloadButton(url) {
  const link = document.createElement('a')
  link.className = "w-64 py-2 bg-sky-500 rounded text-white text-center text-lg mt-4 mx-auto"
  link.innerText = "Download Qr Code"
  link.download = 'QrCode'
  link.href = url

  document.querySelector('#qr-download-link').append(link)
}