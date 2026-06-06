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

  document.querySelectorAll("[data-refresh-panel]").forEach((panel) => {
    const url = panel.getAttribute("data-refresh-url");
    const seconds = Math.max(Number(panel.getAttribute("data-refresh-seconds")) || 75, 15);
    const state = panel.querySelector("[data-refresh-state]");
    const time = panel.querySelector("[data-refresh-time]");
    const countdown = panel.querySelector("[data-refresh-countdown]");
    let remaining = seconds;

    const tick = () => {
      remaining -= 1;
      if (countdown) countdown.textContent = String(Math.max(remaining, 0));
      if (remaining <= 0) refreshTrackingData();
    };

    async function refreshTrackingData() {
      remaining = seconds;
      if (state) state.textContent = "更新中";
      try {
        const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
          cache: "no-store"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (time && data.updatedAt) time.textContent = formatDateTime(data.updatedAt);
        if (state) state.textContent = "已更新";
        if (Array.isArray(data.upcomingEvents)) updateUpcomingMatches(data.upcomingEvents);
        if (Array.isArray(data.games)) updateSportsCards(data.games);
      } catch {
        if (state) state.textContent = "保留現有資料";
      }
      if (countdown) countdown.textContent = String(seconds);
    }

    if (url) window.setInterval(tick, 1000);
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

  function updateUpcomingMatches(events) {
    const list = document.querySelector("[data-upcoming-match-list]");
    if (!list) return;
    list.innerHTML = renderUpcomingMatchCards(events);
  }

  function renderUpcomingMatchCards(events) {
    if (!Array.isArray(events) || !events.length) {
      return `<article class="upcoming-match-card is-empty">
        <strong>目前沒有可確認的即將開賽資料</strong>
        <p>保留追蹤欄位，待公開賽程、人員與場地資料更新後再顯示。</p>
      </article>`;
    }

    return events.map(renderUpcomingMatchCard).join("");
  }

  function renderUpcomingMatchCard(event) {
    const probability = event.estimatedProbability || {};
    const awayWin = clampPercent(probability.awayWin);
    const homeWin = clampPercent(probability.homeWin);
    const awayName = event.awayTeam || "客隊";
    const homeName = event.homeTeam || "主隊";
    const keyFactors = Array.isArray(event.keyFactors) ? event.keyFactors : [];

    return `<article class="upcoming-match-card" data-upcoming-match-id="${escapeHtml(event.id || event.matchup || "")}">
      <div class="match-card-top">
        <span>${escapeHtml(event.league || "賽事")}</span>
        <strong>${escapeHtml(event.status || "追蹤中")}</strong>
      </div>
      <h3>${escapeHtml(event.matchup || `${awayName} vs ${homeName}`)}</h3>
      <div class="match-meta">
        <span>${escapeHtml(event.time || "")}</span>
        <span>${escapeHtml(event.venue || "")}</span>
      </div>
      <div class="match-probability" aria-label="研究模型估計勝率">
        ${renderProbabilityBar(`客隊 ${awayName}`, awayWin)}
        ${renderProbabilityBar(`主隊 ${homeName}`, homeWin)}
      </div>
      <div class="match-confidence">
        <span>信心等級</span>
        <strong>${escapeHtml(probability.confidence || "待確認")}</strong>
      </div>
      <p class="match-basis">${escapeHtml(probability.basis || "待賽前資料更新後重新估算。")}</p>
      <div class="match-edge-grid">
        ${renderMatchEdge(`客隊 ${awayName}`, event.away)}
        ${renderMatchEdge(`主隊 ${homeName}`, event.home)}
      </div>
      ${
        keyFactors.length
          ? `<div class="match-factor-row">${keyFactors.map((factor) => `<span>${escapeHtml(factor)}</span>`).join("")}</div>`
          : ""
      }
      <p class="match-live-check"><b>賽前檢查</b>${escapeHtml(event.liveCheck || "確認公開賽程、名單與場地狀態。")}</p>
      <p class="match-note">${escapeHtml(event.sourceNote || "資料依公開賽程整理。")} 估計勝率只供研究，不保證結果。</p>
    </article>`;
  }

  function renderProbabilityBar(label, value) {
    return `<div class="probability-row" style="--prob: ${value}%">
      <div>
        <span>${escapeHtml(label)}</span>
        <strong>${value}%</strong>
      </div>
      <i aria-hidden="true"></i>
    </div>`;
  }

  function renderMatchEdge(label, edge = {}) {
    return `<section class="match-edge-card">
      <h4>${escapeHtml(label)}</h4>
      <p><b>優勢</b>${escapeHtml(edge.strength || "待賽前資料更新。")}</p>
      <p><b>劣勢</b>${escapeHtml(edge.weakness || "待賽前資料更新。")}</p>
    </section>`;
  }

  function clampPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 50;
    return Math.max(0, Math.min(100, Math.round(number)));
  }

  function updateSportsCards(games) {
    games.forEach((game) => {
      const card = document.querySelector(`[data-track-key="${cssEscape(game.name)}"]`);
      if (!card) return;
      const match = card.querySelector("[data-track-match]");
      const summary = card.querySelector("[data-track-summary]");
      const events = card.querySelector("[data-track-events]");
      if (match && game.match) match.textContent = game.match;
      if (summary && game.sourceNote) summary.textContent = game.sourceNote;
      if (events && Array.isArray(game.events)) events.innerHTML = renderSportsEvents(game.events);
      const values = card.querySelectorAll("dd");
      const nextValues = [
        game.scope,
        game.time,
        game.venue,
        game.personnel,
        game.injuries,
        game.season,
        game.live
      ];
      values.forEach((item, index) => {
        if (nextValues[index]) item.textContent = nextValues[index];
      });
    });
  }

  function renderSportsEvents(events) {
    if (!Array.isArray(events) || !events.length) {
      return `<article class="track-event is-empty">
        <strong>目前沒有可確認賽事</strong>
        <p>保留追蹤欄位，待公開賽程與名單更新後再顯示。</p>
      </article>`;
    }

    return events
      .map(
        (event) => `<article class="track-event">
          <div class="track-event-main">
            <strong>${escapeHtml(event.matchup || "")}</strong>
            <span>${escapeHtml(event.time || "")}</span>
          </div>
          <p>${escapeHtml(event.venue || "")}</p>
          <ul>
            <li><b>人員</b>${escapeHtml(event.personnel || "")}</li>
            <li><b>傷兵</b>${escapeHtml(event.injuries || "")}</li>
            <li><b>整季</b>${escapeHtml(event.season || "")}</li>
            <li><b>臨場</b>${escapeHtml(event.live || "")}</li>
          </ul>
        </article>`
      )
      .join("");
  }

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function formatDate(date) {
    return String(date).replace(/-/g, "/");
  }

  function formatDateTime(value) {
    try {
      return new Intl.DateTimeFormat("zh-Hant-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date(value));
    } catch {
      return String(value);
    }
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
    return String(value).replace(/["\\]/g, "\\$&");
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
