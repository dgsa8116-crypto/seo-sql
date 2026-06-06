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

  document.querySelectorAll("[data-lotto-calculator]").forEach((calculator) => {
    const input = calculator.querySelector("[data-lotto-input]");
    const runButton = calculator.querySelector("[data-lotto-run]");
    const exampleButton = calculator.querySelector("[data-lotto-example]");
    const result = calculator.querySelector("[data-lotto-result]");
    const draws = parseDraws(calculator.getAttribute("data-draws"));

    if (!input || !runButton || !result || !draws.length) return;

    const run = () => {
      const parsed = parseNumbers(input.value);
      if (parsed.error) {
        renderResult(result, `<strong>請重新檢查號碼</strong><p>${escapeHtml(parsed.error)}</p>`);
        return;
      }
      renderCollisionResult(result, parsed.numbers, draws);
    };

    runButton.addEventListener("click", run);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") run();
    });

    if (exampleButton) {
      exampleButton.addEventListener("click", () => {
        input.value = "02 08 13 27 38";
        run();
      });
    }
  });

  function parseDraws(value) {
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function parseNumbers(value) {
    const numbers = String(value)
      .split(/[\s,，、/|]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map(Number);

    if (numbers.length !== 5) return { error: "請輸入剛好 5 個號碼。" };
    if (numbers.some((number) => !Number.isInteger(number) || number < 1 || number > 39)) {
      return { error: "號碼必須是 01 到 39 之間的整數。" };
    }
    if (new Set(numbers).size !== numbers.length) return { error: "號碼不能重複。" };

    return { numbers: [...numbers].sort((a, b) => a - b) };
  }

  function renderCollisionResult(container, selected, draws) {
    const comparisons = draws.map((draw) => {
      const matches = selected.filter((number) => draw.numbers.includes(number));
      return {
        date: draw.date,
        weekday: draw.weekday || "",
        numbers: draw.numbers,
        matches,
        hitCount: matches.length
      };
    });
    const maxHit = Math.max(...comparisons.map((item) => item.hitCount));
    const distribution = [0, 1, 2, 3, 4, 5].map((hit) => ({
      hit,
      count: comparisons.filter((item) => item.hitCount === hit).length
    }));
    const topRows = comparisons.slice(0, 10);

    renderResult(
      container,
      `<strong>最高碰 ${maxHit}，已比對最近 ${comparisons.length} 期</strong>
      <p>你的號碼：${selected.map(formatNumber).join("、")}。此結果只做歷史比對，不代表未來結果。</p>
      <div class="result-summary">
        ${distribution
          .map((item) => `<span class="result-pill">碰 ${item.hit}: ${item.count} 期</span>`)
          .join("")}
      </div>
      <div class="match-list">
        ${topRows
          .map(
            (row) => `<div class="match-row">
          <span>${formatDate(row.date)}${row.weekday ? `（${escapeHtml(row.weekday)}）` : ""}</span>
          <span>開獎 ${row.numbers.map(formatNumber).join("、")}</span>
          <strong>碰 ${row.hitCount}${row.matches.length ? `: ${row.matches.map(formatNumber).join("、")}` : ""}</strong>
        </div>`
          )
          .join("")}
      </div>`
    );
  }

  function renderResult(container, html) {
    container.innerHTML = html;
  }

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function formatDate(date) {
    return String(date).replace(/-/g, "/");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
