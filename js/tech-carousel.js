// Compact technology selector for the portfolio's compiled React page.
(() => {
  'use strict';
  // Technologies and descriptions are grounded in ravi-singh-resume.pdf.
  // Git and Codex are also explicitly confirmed by the portfolio owner.
  const items = [
    ['Java', 'java', 'Java 7–17 for fintech services and core banking systems.', 'Backend'],
    ['Spring Boot', 'spring', 'Microservices, Spring Security, and Spring Batch workflows.', 'Backend'],
    ['Angular', 'angular', 'Angular 4/5 interfaces for core banking workflows.', 'Backend'],
    ['Hibernate', 'hibernate', 'Persistence for Spring-based core banking applications.', 'Backend'],
    ['TypeScript', 'typescript', 'Typed frontend development.', 'Backend'],
    ['JavaScript', 'javascript', 'Web development and interactive interfaces.', 'Backend'],
    ['AWS', 'aws', 'EKS, S3, SQS, Secrets Manager, and cloud key management.', 'Cloud'],
    ['OCI', 'oracle', 'OKE, OCI KMS, and OCI Queue for fintech platforms.', 'Cloud'],
    ['Google Cloud', 'gcp', 'GKE deployments and Cloud KMS key lifecycle operations.', 'Cloud'],
    ['Azure', 'azure', 'AKS, Key Vault, and Service Bus integrations.', 'Cloud'],
    ['Vault', 'vault', 'Dynamic secrets and encryption-as-a-service with HashiCorp Vault.', 'Cloud'],
    ['RabbitMQ', 'rabbitmq', 'Async event ingestion with ordered delivery, retries, and dead-letter recovery.', 'Messaging'],
    ['AWS SQS', 'queue', 'Multi-bank event ingestion with idempotent consumers and DLQ recovery.', 'Messaging'],
    ['OCI Queue', 'queue', 'Cloud queue integrations for asynchronous banking events.', 'Messaging'],
    ['Service Bus', 'azure', 'Azure Service Bus integrations for banking event pipelines.', 'Messaging'],
    ['Jenkins', 'jenkins', 'Build pipelines and blue-green deployments for fintech services.', 'Delivery'],
    ['Git', 'git', 'Version control and collaborative development workflows.', 'Delivery'],
    ['GitHub Actions', 'githubactions', 'Automated build and deployment workflows.', 'Delivery'],
    ['Docker', 'docker', 'Containerized services for repeatable delivery.', 'Delivery'],
    ['Kubernetes', 'kubernetes', 'Production deployments across OKE, EKS, GKE, and AKS.', 'Delivery'],
    ['Maven', 'maven', 'Java builds and dependency management.', 'Delivery'],
    ['Oracle DB', 'oracle', 'Database-backed reconciliation and payment platforms.', 'Data'],
    ['MySQL', 'mysql', 'Relational persistence for banking applications.', 'Data'],
    ['SQL Server', 'sqlserver', 'SQL Server in the database toolkit.', 'Data'],
    ['Redis', 'redis', 'Redis in the fintech platform stack.', 'Data'],
    ['JUnit 5', 'junit', 'Automated Java testing with JUnit and Mockito.', 'Quality'],
    ['SonarQube', 'sonarqube', 'Code quality and security checks.', 'Quality'],
    ['OpenTelemetry', 'opentelemetry', 'Distributed traces used to investigate performance and production incidents.', 'Quality'],
    ['Prometheus', 'prometheus', 'Monitoring production services.', 'Quality'],
    ['Grafana', 'grafana', 'Operational dashboards and observability.', 'Quality'],
    ['ELK', 'elasticsearch', 'Log analysis and production observability.', 'Quality'],
    ['Claude Code', 'claude', 'Agentic workflows for PR review, test generation, security checks, and RCA drafts.', 'AI tools'],
    ['GitHub Copilot', 'copilot', 'AI-assisted engineering workflows.', 'AI tools'],
    ['Codex', 'codex', 'AI-assisted coding, codebase investigation, and project iteration.', 'AI tools']
  ];
  const featured = ['Java', 'Spring Boot', 'AWS SQS', 'RabbitMQ', 'Jenkins', 'Git', 'Claude Code'];
  const categories = ['Featured', 'Backend', 'Cloud', 'Messaging', 'Delivery', 'Data', 'Quality', 'AI tools'];
  function mount() {
    const skills = document.querySelector('#skills > div');
    if (!skills || document.getElementById('tech-showcase')) return false;
    const section = document.createElement('div');
    section.id = 'tech-showcase';
    section.className = 'tech-showcase';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', 'Engineering toolkit');
    section.innerHTML = `<div class="tech-showcase__intro"><span>ENGINEERING TOOLKIT</span><span>Build. Ship. Iterate.</span></div><div class="tech-showcase__filters" role="group" aria-label="Filter technologies"></div><div class="tech-showcase__strip" role="group" aria-label="Choose a technology"></div><p class="tech-showcase__detail" aria-live="polite" aria-atomic="true"></p>`;
    const filters = section.querySelector('.tech-showcase__filters');
    let visibleIndices = [];
    const filterButtons = categories.map(category => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = category;
      button.addEventListener('click', () => filter(category));
      filters.appendChild(button);
      return button;
    });
    const strip = section.querySelector('.tech-showcase__strip');
    let active = 0;
    const cards = items.map(([name, image], index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'tech-showcase__card';
      card.innerHTML = `<img src="resource/tech/${image}.svg" alt="" width="30" height="30" class="tech-showcase__logo tech-showcase__logo--${image}"><span>${name}</span>`;
      card.setAttribute('aria-label', `Show ${name} experience`);
      card.addEventListener('click', () => select(index));
      strip.appendChild(card);
      return card;
    });
    function filter(category) {
      visibleIndices = [];
      cards.forEach((card, index) => {
        const visible = category === 'Featured' ? featured.includes(items[index][0]) : items[index][3] === category;
        card.hidden = !visible;
        if (visible) visibleIndices.push(index);
      });
      filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.textContent === category)));
      select(visibleIndices[0]);
      strip.scrollLeft = 0;
    }
    function select(index) {
      active = (index + items.length) % items.length;
      cards.forEach((card, i) => card.setAttribute('aria-pressed', String(i === active)));
      const detail = section.querySelector('.tech-showcase__detail');
      const name = document.createElement('strong');
      name.textContent = items[active][0];
      detail.replaceChildren(name, document.createTextNode(` — ${items[active][2]}`));
    }
    strip.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const position = visibleIndices.indexOf(active);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? visibleIndices.length - 1 : (position + (event.key === 'ArrowRight' ? 1 : -1) + visibleIndices.length) % visibleIndices.length;
      select(visibleIndices[next]);
      cards[active].focus({ preventScroll: true });
      cards[active].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    });
    skills.insertBefore(section, skills.children[1] || null);
    filter('Featured');
    return true;
  }
  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  }
})();
