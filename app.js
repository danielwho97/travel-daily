const reports = Array.isArray(window.TRAVEL_DAILY_REPORTS)
  ? window.TRAVEL_DAILY_REPORTS
  : [];

const picker = document.querySelector("#report-picker");
const reportDate = document.querySelector("#report-date");
const reportCount = document.querySelector("#report-count");
const reportUpdated = document.querySelector("#report-updated");
const heroSummary = document.querySelector("#hero-summary");
const briefText = document.querySelector("#brief-text");
const metrics = document.querySelector("#metrics");
const newsList = document.querySelector("#news-list");
const trendText = document.querySelector("#trend-text");
const shareButton = document.querySelector("#share-button");

function text(value) {
  return value || "";
}

function renderMetric(metric) {
  return `
    <div class="metric">
      <strong>${text(metric.value)}</strong>
      <span>${text(metric.label)}</span>
    </div>
  `;
}

function renderNewsItem(item, index) {
  return `
    <article class="news-card">
      <div class="rank">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3>${text(item.title)}</h3>
        <div class="meta-line">
          <span>${text(item.source)}</span>
          <span>${text(item.publishedAt)}</span>
          <span>${text(item.category)}</span>
        </div>
        <p class="summary">${text(item.summary)}</p>
        <p class="impact">${text(item.impact)}</p>
        <a class="read-link" href="${text(item.url)}" target="_blank" rel="noreferrer">阅读原文</a>
      </div>
    </article>
  `;
}

function renderReport(report) {
  if (!report) {
    heroSummary.textContent = "暂无日报数据。";
    return;
  }

  document.title = `${report.title}｜文旅行业日报`;
  reportDate.textContent = report.dateLabel;
  reportCount.textContent = `${report.items.length} 条重点新闻`;
  reportUpdated.textContent = report.updatedAt ? `更新于 ${report.updatedAt}` : "每日更新";
  heroSummary.textContent = report.heroSummary;
  briefText.textContent = report.brief;
  metrics.innerHTML = report.metrics.map(renderMetric).join("");
  newsList.innerHTML = report.items.map(renderNewsItem).join("");
  trendText.textContent = report.trend;
}

function initPicker() {
  picker.innerHTML = reports
    .map((report, index) => `<option value="${index}">${report.dateLabel}</option>`)
    .join("");

  picker.addEventListener("change", (event) => {
    renderReport(reports[Number(event.target.value)]);
  });
}

initPicker();
renderReport(reports[0]);

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "文旅行业日报：每日追踪政策、消费、景区、酒店、科技与投融资动态。",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    shareButton.textContent = "已复制链接";
  } catch {
    shareButton.textContent = "请复制地址栏链接";
  } finally {
    window.setTimeout(() => {
      shareButton.innerHTML = '<span aria-hidden="true">↗</span> 分享';
    }, 1800);
  }
});
