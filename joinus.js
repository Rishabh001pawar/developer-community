function nextStep(currentStep) {
  if (!validateStep(currentStep)) return;

  document.getElementById(`step${currentStep}`).classList.add("hidden");
  document.getElementById(`step${currentStep + 1}`).classList.remove("hidden");

  if (currentStep === 1)
    document.getElementById("progress2").classList.add("w-full");
  if (currentStep === 2)
    document.getElementById("progress3").classList.add("w-full");
}

function prevStep(currentStep) {
  document.getElementById(`step${currentStep}`).classList.add("hidden");
  document.getElementById(`step${currentStep - 1}`).classList.remove("hidden");

  if (currentStep === 2)
    document.getElementById("progress2").classList.remove("w-full");
  if (currentStep === 3)
    document.getElementById("progress3").classList.remove("w-full");
}

function validateStep(step) {
  const inputs = document
    .getElementById(`step${step}`)
    .querySelectorAll("input, textarea, select");
  for (let input of inputs) {
    if (input.required && !input.value) {
      alert(`Please fill out ${input.previousElementSibling.textContent}`);
      return false;
    }
  }
  return true;
}

function submitForm() {
  if (!validateStep(3)) return;

  const formData = {
    data: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      college: document.getElementById("college").value,
      year: document.getElementById("year").value,
      mobile: document.getElementById("mobile").value,
      motivation: document.getElementById("motivation").value,
      field: document.getElementById("field").value,
    },
  };

  const sheetDB_URL = "https://sheetdb.io/api/v1/50roovw08fzzc"; // Replace with your SheetDB API URL

  fetch(sheetDB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Submitted to SheetDB:", data);
      document.querySelector("body > div").classList.add("hidden");
      document.getElementById("thankYouScreen").classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      alert("❌ Submission failed");
      console.error("SheetDB Error:", error);
    });
}

document.getElementById("progress1").classList.add("w-full");
