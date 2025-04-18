const TOTAL_STEPS = 3;

// Load saved form data
function loadFormData() {
    document.querySelectorAll("input, textarea, select").forEach((input) => {
        input.value = localStorage.getItem(input.id) || "";
        input.addEventListener("input", () => localStorage.setItem(input.id, input.value));
    });
}

function nextStep(currentStep) {
    if (!validateStep(currentStep) || currentStep >= TOTAL_STEPS) return;
    toggleStepVisibility(currentStep, currentStep + 1);
    updateProgressBar(currentStep + 1, true);
}

function prevStep(currentStep) {
    if (currentStep <= 1) return;
    toggleStepVisibility(currentStep, currentStep - 1);
    updateProgressBar(currentStep, false);
}

function toggleStepVisibility(currentStep, targetStep) {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const targetStepEl = document.getElementById(`step${targetStep}`);
    if (currentStepEl && targetStepEl) {
        currentStepEl.classList.add("hidden");
        targetStepEl.classList.remove("hidden");
    }
}

function updateProgressBar(step, isNext) {
    const progressEl = document.getElementById(`progress${step}`);
    if (progressEl) {
        progressEl.classList.toggle("w-full", isNext);
    }
}

function validateStep(step) {
    const stepEl = document.getElementById(`step${step}`);
    if (!stepEl) return false;

    const inputs = stepEl.querySelectorAll("input[required], textarea[required], select[required]");
    let isValid = true;
    for (let input of inputs) {
        const errorEl = input.nextElementSibling;
        errorEl.style.display = "none";
        input.parentElement.classList.remove("error");

        if (!input.value.trim()) {
            showError(input, `Please fill out ${input.name}`);
            isValid = false;
        } else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
            showError(input, "Please enter a valid email");
            isValid = false;
        } else if (input.type === "tel" && !/^\+?\d{10,15}$/.test(input.value)) {
            showError(input, "Please enter a valid mobile number");
            isValid = false;
        }
    }
    return isValid;
}

function showError(input, message) {
    const errorEl = input.nextElementSibling;
    errorEl.textContent = message;
    errorEl.style.display = "block";
    input.parentElement.classList.add("error");
    input.focus();
}

function submitForm() {
    if (!validateStep(TOTAL_STEPS)) return;

    const formData = {
        data: {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            college: document.getElementById("college").value.trim(),
            year: document.getElementById("year").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            github: document.getElementById("github").value.trim(),
            motivation: document.getElementById("motivation").value.trim(),
            field: document.getElementById("field").value.trim(),
        },
    };

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch("https://sheetdb.io/api/v1/50roovw08fzzc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .then((data) => {
            console.log("Submitted to SheetDB:", data);
            document.querySelector(".form-container").classList.add("hidden");
            document.getElementById("thankYouScreen").classList.remove("hidden");
            localStorage.clear(); // Clear form data after submission
            setTimeout(() => {
                window.location.href = "index.html";
            }, 5000); // Increased for Discord link visibility
        })
        .catch((error) => {
            const stepEl = document.getElementById(`step${TOTAL_STEPS}`);
            showError(stepEl.querySelector("select"), "Submission failed. Please try again.");
            console.error("SheetDB Error:", error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Join Now";
        });
}

// Handle form submission via Enter key
document.getElementById("joinForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const currentStep = Array.from(document.querySelectorAll(".step:not(.hidden)"))[0]?.id.replace("step", "");
    if (currentStep < TOTAL_STEPS) {
        nextStep(parseInt(currentStep));
    } else {
        submitForm();
    }
});

// Initialize
document.getElementById("progress1").classList.add("w-full");
loadFormData();