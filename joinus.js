const TOTAL_STEPS = 3;
const FORM_FIELDS = ["name", "email", "college", "year", "mobile", "github", "motivation", "field"];

// Cache DOM elements for performance
const elements = {
    form: document.getElementById("joinForm"),
    steps: Array.from({ length: TOTAL_STEPS }, (_, i) => document.getElementById(`step${i + 1}`)),
    progress: Array.from({ length: TOTAL_STEPS }, (_, i) => document.getElementById(`progress${i + 1}`)),
    submitButton: document.querySelector('button[type="submit"]'),
    thankYouScreen: document.getElementById("thankYouScreen"),
    formContainer: document.querySelector(".form-container"),
};

// Load saved form data with error handling
function loadFormData() {
    try {
        document.querySelectorAll("input, textarea, select").forEach((input) => {
            input.value = localStorage.getItem(input.id) || "";
            input.addEventListener("input", debounce(() => {
                localStorage.setItem(input.id, input.value);
            }, 300));
        });
    } catch (error) {
        console.warn("LocalStorage unavailable:", error);
    }
}

// Debounce utility to reduce event listener overhead
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
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
    const currentStepEl = elements.steps[currentStep - 1];
    const targetStepEl = elements.steps[targetStep - 1];
    if (currentStepEl && targetStepEl) {
        currentStepEl.classList.add("hidden");
        targetStepEl.classList.remove("hidden");
    }
}

function updateProgressBar(step, isNext) {
    const progressEl = elements.progress[step - 1];
    if (progressEl) {
        progressEl.classList.toggle("w-full", isNext);
        progressEl.setAttribute("aria-valuenow", isNext ? 100 : 0);
    }
}

function validateStep(step) {
    const stepEl = elements.steps[step - 1];
    if (!stepEl) return false;

    const inputs = stepEl.querySelectorAll("input[required], textarea[required], select[required]");
    let isValid = true;
    clearErrors(stepEl);

    for (let input of inputs) {
        const errorEl = input.nextElementSibling;
        if (!input.value.trim()) {
            showError(input, `Please fill out ${input.name}`);
            isValid = false;
        } else if (input.type === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)) {
            showError(input, "Please enter a valid email");
            isValid = false;
        } else if (input.type === "tel" && !/^\+?[\d\s-]{10,15}$/.test(input.value)) {
            showError(input, "Please enter a valid mobile number (10-15 digits)");
            isValid = false;
        } else if (input.id === "github" && !/^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/.test(input.value)) {
            showError(input, "Please enter a valid GitHub profile URL");
            isValid = false;
        }
    }
    return isValid;
}

function clearErrors(stepEl) {
    stepEl.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none";
        el.parentElement.classList.remove("error");
    });
}

function showError(input, message) {
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
        input.parentElement.classList.add("error");
        input.focus();
    }
}

function submitForm() {
    if (!validateStep(TOTAL_STEPS)) return;

    const formData = {
        data: Object.fromEntries(
            FORM_FIELDS.map((id) => [id, document.getElementById(id)?.value.trim() || ""])
        ),
    };

    const { submitButton } = elements;
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch("https://sheetdb.io/api/v1/50roovw08fzzc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log("Submitted to SheetDB:", data);
            elements.formContainer.classList.add("hidden");
            elements.thankYouScreen.classList.remove("hidden");
            try {
                localStorage.clear();
            } catch (error) {
                console.warn("Failed to clear localStorage:", error);
            }
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000); // Reduced to 3 seconds for faster redirect
        })
        .catch((error) => {
            showError(elements.steps[TOTAL_STEPS - 1].querySelector("input, select, textarea"), 
                "Submission failed. Please try again or contact support.");
            console.error("SheetDB Error:", error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Join Now";
        });
}

// Prevent Enter key from submitting prematurely
elements.form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        const currentStep = parseInt(elements.steps.findIndex((step) => !step.classList.contains("hidden")) + 1);
        if (currentStep < TOTAL_STEPS) {
            nextStep(currentStep);
        } else {
            submitForm();
        }
    }
});

// Handle form submission
elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentStep = parseInt(elements.steps.findIndex((step) => !step.classList.contains("hidden")) + 1);
    if (currentStep < TOTAL_STEPS) {
        nextStep(currentStep);
    } else {
        submitForm();
    }
});

// Initialize
elements.progress[0]?.classList.add("w-full");
loadFormData();