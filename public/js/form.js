(() => {
  // <stdin>
  document.getElementById("vlcaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const submitButton = document.getElementById("formSubmitButton");
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Please, wait...";
    submitButton.classList.add("disabled");
    submitButton.disabled = true;
    document.getElementById("FName").innerHTML = document.querySelector('input[name="entry.1917969894"]').value;
    document.getElementById("COwner").innerHTML = document.querySelector('input[name="entry.1757697605"]').value;
    document.getElementById("FAddress").innerHTML = document.querySelector('input[name="entry.1821603962"]').value;
    document.getElementById("FWorkers").innerHTML = document.querySelector('input[name="entry.2041901163"]').value;
    document.getElementById("PName").innerHTML = document.querySelector('input[name="entry.132345334"]').value;
    document.getElementById("PPosition").innerHTML = document.querySelector('select[name="entry.1472976476"]').value;
    document.getElementById("PPhone").innerHTML = document.querySelector('input[name="entry.958304283"]').value;
    document.getElementById("PEmail").innerHTML = document.querySelector('input[name="entry.934457129"]').value;
    document.getElementById("ECyn").innerHTML = document.querySelector('input[name="entry.1886477039"]:checked').value;
    document.getElementById("MWyn").innerHTML = document.querySelector('input[name="entry.1666474331"]:checked').value;
    document.getElementById("WHyn").innerHTML = document.querySelector('input[name="entry.795624906"]:checked').value;
    document.getElementById("LHyn").innerHTML = document.querySelector('input[name="entry.1930996461"]:checked').value;
    const checkedBoxes = document.querySelectorAll('input[name="entry.1337884755"]:checked');
    if (checkedBoxes.length === 0) {
      alert("Oops! Please select at least one of Certificate or any you have.");
      return;
    }
    document.getElementById("CERTIy").innerHTML = Array.from(checkedBoxes).map((checkbox) => checkbox.value);
    document.getElementById("OSHr").innerHTML = document.querySelector('input[name="entry.350571800"]:checked').value;
    document.getElementById("CHILDyn").innerHTML = document.querySelector('input[name="entry.677934120"]:checked').value;
    document.getElementById("FORCEDyn").innerHTML = document.querySelector('input[name="entry.587878512"]:checked').value;
    document.getElementById("DISCRIyn").innerHTML = document.querySelector('input[name="entry.236185030"]:checked').value;
    document.getElementById("HARASSyn").innerHTML = document.querySelector('input[name="entry.1472844120"]:checked').value;
    document.getElementById("WCCyn").innerHTML = document.querySelector('input[name="entry.1445781650"]:checked').value;
    document.getElementById("FOAyn").innerHTML = document.querySelector('input[name="entry.2064883437"]:checked').value;
    document.getElementById("UNDERTy").innerHTML = document.querySelector('input[name="entry.1160853913"]').value;
    const sigKeyGot = document.querySelector('input[name="entry.71647187"]').value;
    if (String(sigKeyGot).trim() !== String(generatedSigKey).trim()) {
      alert("Oops! Your signature key does not match. Please generate it again and, copy and paste it correctly.");
      return;
    }
    document.getElementById("signedSigKey").innerHTML = sigKeyGot;
    document.getElementById("signedName").innerHTML = document.querySelector('input[name="entry.132345334"]').value;
    document.getElementById("signedPosition").innerHTML = document.querySelector('select[name="entry.1472976476"]').value;
    document.getElementById("TStamp").innerHTML = /* @__PURE__ */ new Date();
    fetch(event.target.action, {
      method: "POST",
      body: new FormData(event.target),
      mode: "no-cors"
    }).then(() => {
      document.getElementById("googleFormUpdated").style.display = "block";
    }).catch((error) => {
      alert("There was an error of updating Google Form.");
    });
    setTimeout(() => {
      document.getElementById("afterFormSubmit").style.display = "block";
      document.getElementById("formContainer").style.display = "none";
      window.scrollTo({ top: 0, left: 0 });
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    }, 1e3);
  });
  document.addEventListener("click", function(e) {
    const { id } = e.target;
    const actions = {
      generateSigKey,
      downloadPDF,
      printSaveAsPDF,
      windowPrint,
      goToPrevious
    };
    if (actions[id]) {
      actions[id]();
    }
  });
  var generatedSigKey = "";
  function generateSigKey() {
    const randomNum = Math.floor(Math.random() * 1e6).toString().padStart(6, 0);
    const now = /* @__PURE__ */ new Date();
    const Year = now.getFullYear();
    const Month = (now.getMonth() + 1).toString().padStart(2, 0);
    const Day = now.getDate().toString().padStart(2, 0);
    const Hour = now.getHours().toString().padStart(2, 0);
    const Minute = now.getMinutes().toString().padStart(2, 0);
    const Second = now.getSeconds().toString().padStart(2, 0);
    const TStamp = `${Year}${Month}${Day}${Hour}${Minute}${Second}`;
    generatedSigKey = `this-NUM:${randomNum}-may-represent-my-signature-on-TS:${TStamp}`;
    document.getElementById("genSigKey").innerHTML = generatedSigKey;
  }
  function downloadPDF() {
    const content = document.getElementById("downloadPrintArea");
    const originalWidth = content.style.width;
    if (window.innerWidth <= 750) {
      content.style.width = "900px";
    }
    const { jsPDF } = window.jspdf;
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("mgma-vlca-submission.pdf");
    });
    if (originalWidth) {
      content.style.width = originalWidth;
    } else {
      content.style.width = "";
    }
  }
  function printSaveAsPDF() {
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.getElementById("printHide").style.display = "none";
    document.getElementById("googleFormUpdated").style.display = "none";
    document.getElementById("printGoBackLine").style.display = "block";
    window.print();
  }
  function windowPrint() {
    window.print();
  }
  function goToPrevious() {
    document.getElementById("printGoBackLine").style.display = "none";
    document.getElementById("printHide").style.display = "block";
    document.querySelector("header").style.display = "block";
    document.querySelector("footer").style.display = "block";
  }
})();
