/** Learn more: https://www.mc4wp.com/kb/javascript-form-events/ */

try {
  // fired if form is used to subscribe
  mc4wp.forms.on("subscribed", function handleSubscribed(form) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mailchimp_subscribed",
      form_name: form.name,
      form_id: form.id
    });
  });
  // fired once user starts filling in a form
  mc4wp.forms.on("started", function handleStarted(form) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mailchimp_started",
      form_name: form.name,
      form_id: form.id
    });
  });
  // fired if form is submitted successfully
  mc4wp.forms.on("success", function handleSuccess(form) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mailchimp_success",
      form_name: form.name,
      form_id: form.id
    });
  });
  // fired if a form is submitted with errors
  mc4wp.forms.on("error", function handleError(form) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mailchimp_error",
      form_name: form.name,
      form_id: form.id
    });
  });
  // fired once user submits form
  mc4wp.forms.on("submitted", function handleSubmit(form) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mailchimp_submitted",
      form_name: form.name,
      form_id: form.id
    });
  });
} catch (error) {
  console.warn("Error setting up mc4wp listeners");
}
