document.getElementById('vlcaForm').addEventListener('submit', async (event) => {

    event.preventDefault();

    const submitButton = document.getElementById('formSubmitButton');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Please, wait...";
    submitButton.classList.add('disabled');
    submitButton.disabled = true;

    const form = event.target;
    const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    });
    if (!res.ok) {
        console.log("Error updating VLCA Submission Form");
        return;
    }

    // Form entry.xxxxxxxx variables
    const FName = "entry.2076762657";
    const COwner = "entry.1697925443";
    const FAddress = "entry.1552062929";
    const FWorkers = "entry.1825697066";
    const PName = "entry.1333245888";
    const PPosition = "entry.560421184";
    const PPhone = "entry.1541179750";
    const PEmail = "entry.175687228";
    const EC = "entry.764286574";
    const MW = "entry.789162835";
    const WH = "entry.2029275035";
    const LH = "entry.1389889941";
    const CERTI = "entry.423307856";
    const OSH = "entry.2136747177";
    const CHILD = "entry.1148858665";
    const FORCED = "entry.698850235";
    const DISCRI = "entry.1698407190";
    const HARASS = "entry.190602197";
    const WCC = "entry.1551500658";
    const FOA = "entry.307147203";
    const UNDERT = "entry.58505407";
    const SIG = "entry.1116771921";

    function getInputText(name) {
        return document.querySelector(`input[name="${name}"]`)?.value || null;
    }
    function getSelectOption(name) {
        return document.querySelector(`select[name="${name}"]`)?.value || null;
    }
    function getInputRadio(name) {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || null;
    }
    function getInputCheckboxes(name) {
        return document.querySelectorAll(`input[name="${name}"]:checked`);
    }

    // getting factory information
    document.getElementById('FName').innerHTML = getInputText(FName);
    document.getElementById('COwner').innerHTML = getInputText(COwner);
    document.getElementById('FAddress').innerHTML = getInputText(FAddress);
    document.getElementById('FWorkers').innerHTML = getInputText(FWorkers);
    // getting person information
    document.getElementById('PName').innerHTML = getInputText(PName);
    document.getElementById('PPosition').innerHTML = getSelectOption(PPosition);
    document.getElementById('PPhone').innerHTML = getInputText(PPhone);
    document.getElementById('PEmail').innerHTML = getInputText(PEmail);
    // getting labour compliance
    document.getElementById('ECyn').innerHTML = getInputRadio(EC);
    document.getElementById('MWyn').innerHTML = getInputRadio(MW);
    document.getElementById('WHyn').innerHTML = getInputRadio(WH);
    document.getElementById('LHyn').innerHTML = getInputRadio(LH);
    const checkedBoxes = getInputCheckboxes(CERTI);
    if (checkedBoxes.length === 0) {
        alert("Oops! Please select at least one of Certificate or any you have.");
        return;
    }
    document.getElementById('CERTIy').innerHTML = Array.from(checkedBoxes).map(checkbox => checkbox.value);
    document.getElementById('OSHr').innerHTML = getInputRadio(OSH);
    document.getElementById('CHILDyn').innerHTML = getInputRadio(CHILD);
    document.getElementById('FORCEDyn').innerHTML = getInputRadio(FORCED);
    document.getElementById('DISCRIyn').innerHTML = getInputRadio(DISCRI);
    document.getElementById('HARASSyn').innerHTML = getInputRadio(HARASS);
    document.getElementById('WCCyn').innerHTML = getInputRadio(WCC);
    document.getElementById('FOAyn').innerHTML = getInputRadio(FOA);
    // undertaking
    document.getElementById('UNDERTy').innerHTML = getInputText(UNDERT);
    // signing
    const sigKeyGot = getInputText(SIG);
    // String().trim is required for ensuring both are string
    if (String(sigKeyGot).toLowerCase().trim() !== String(generatedSigKey).toLowerCase().trim()) {
        alert("Oops! Your signature key does not match. Please generate it again and, copy and paste it correctly.");
        return;
    }
    document.getElementById('signedSigKey').innerHTML = sigKeyGot;
    document.getElementById('signedName').innerHTML = getInputText(PName);
    document.getElementById('signedPosition').innerHTML = getSelectOption(PPosition);
    document.getElementById('TStamp').innerHTML = new Date();

    document.getElementById('googleFormUpdated').style.display = 'block';
    // Setting Timeout before block views change
    setTimeout(() => {
        // show #afterFormSubmit, scroll to Top and hide #formContainer
        document.getElementById('afterFormSubmit').style.display = 'block';
        document.getElementById('formContainer').style.display = 'none';
        window.scrollTo({top: 0, left: 0});
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }, 500);
});

document.addEventListener("click", function (e) {
    const { id } = e.target; // Destructuring for cleaner code
    const actions = {
        generateSigKey: generateSigKey,
        downloadPDF: downloadPDF,
        printSaveAsPDF: printSaveAsPDF,
        windowPrint: windowPrint,
        goToPrevious: goToPrevious,
    };
    if (actions[id]) {
        actions[id]();
    }
});

let generatedSigKey = ""; // setting global variable and change it later in generatedSigKey() function
function generateSigKey() {
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, 0);
    const now = new Date();
    const Year = now.getFullYear();
    const Month = (now.getMonth() + 1).toString().padStart(2, 0);
    const Day = now.getDate().toString().padStart(2, 0);
    const Hour = now.getHours().toString().padStart(2, 0);
    const Minute = now.getMinutes().toString().padStart(2, 0);
    const Second = now.getSeconds().toString().padStart(2, 0);
    const TStamp = `${Year}${Month}${Day}${Hour}${Minute}${Second}`;
    generatedSigKey = `this-NUM:${randomNum}-may-represent-my-signature-on-TS:${TStamp}`;
    document.getElementById('genSigKey').innerHTML = generatedSigKey;
}
function downloadPDF() {
    // getting the content first
    const content = document.getElementById('downloadPrintArea');
    // handle screen width first for mobile phones
    const originalWidth = content.style.width; // store the original width
    if (window.innerWidth <= 750) {
        content.style.width = '900px';
    }
    // jsPDF - simple and fast but only on desktop
    const { jsPDF } = window.jspdf; // required
    html2canvas(content, { scale: 2}).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("mgma-vlca-submission.pdf");
    });
    // handle to restore screen width
    if (originalWidth) {
        content.style.width = originalWidth;
    } else {
        content.style.width = '';
    }
}
function printSaveAsPDF() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.getElementById('printHide').style.display = 'none';
    document.getElementById('googleFormUpdated').style.display = 'none';
    document.getElementById('printGoBackLine').style.display = 'block';
    window.print();
}
function windowPrint() {
    window.print();
}
function goToPrevious() {
    document.getElementById('printGoBackLine').style.display = 'none';
    document.getElementById('printHide').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
}