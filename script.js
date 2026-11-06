// Find the parts of the page that JavaScript will update or validate.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const yearLabel = document.querySelector("#currentYear");
const navigationMenu = document.querySelector("#mainNavigation");

// Keep the copyright year current without editing the HTML each year.
yearLabel.textContent = new Date().getFullYear();

// Smoothly move to sections for same-page links; ignore external and email links.
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close the Bootstrap mobile menu after a visitor chooses a section.
    if (navigationMenu.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(navigationMenu).hide();
    }
  });
});

// Check every required field and show a success message without pretending to send email.
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fields = contactForm.querySelectorAll("input[required], textarea[required]");
  let formIsValid = true;

  fields.forEach(function (field) {
    const fieldIsValid = field.checkValidity();
    field.classList.toggle("is-invalid", !fieldIsValid);

    if (!fieldIsValid) {
      formIsValid = false;
    }
  });

  formStatus.classList.remove("is-success", "is-error");

  if (!formIsValid) {
    formStatus.textContent = "Please correct the highlighted fields and try again.";
    formStatus.classList.add("is-error");
    contactForm.querySelector(":invalid").focus();
    return;
  }

  formStatus.textContent = "Thanks! Your details passed the browser check. This demo does not send email; connect a backend or email service to receive submissions.";
  formStatus.classList.add("is-success");
  contactForm.reset();
  fields.forEach(function (field) {
    field.classList.remove("is-invalid");
  });
});

// Remove a field's error style as soon as the visitor starts correcting it.
contactForm.querySelectorAll("input, textarea").forEach(function (field) {
  field.addEventListener("input", function () {
    if (field.checkValidity()) {
      field.classList.remove("is-invalid");
    }
  });
});
