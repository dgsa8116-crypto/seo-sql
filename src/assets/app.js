(function () {
  const config = window.SiteConfig || {};
  const ctaUrl = config.registerRedirectUrl;

  if (ctaUrl) {
    document.querySelectorAll("[data-register-cta]").forEach((link) => {
      link.setAttribute("href", ctaUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "nofollow sponsored noopener noreferrer");
      link.addEventListener("click", () => {
        link.setAttribute("aria-busy", "true");
      });
    });
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear().toString();
})();
