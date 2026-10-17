import React, { useEffect, useRef, useState } from 'react';
import MagicBento from './MagicBento';
import './portfolio-bento.css';

const groups = [
  {id:'backend', title:'Backend Engineering', metric:'7.5× faster reconciliation', detail:'Re-engineered a 10M-record workflow from 30 minutes to 4 minutes.', tech:['Java','Spring Boot','Spring Security','Spring Batch','Hibernate','REST APIs'], href:'#projects'},
  {id:'cloud', title:'Cloud & Security', metric:'Key lifecycle across 4 clouds', detail:'Delivered zero-downtime key rotation and secure secrets management.', tech:['AWS','OCI','Google Cloud','Azure','HashiCorp Vault','KMS'], href:'#architecture'},
  {id:'delivery', title:'Delivery & Operations', metric:'Production delivery ownership', detail:'Blue-green releases, banking migrations, monitoring, and incident response.', tech:['Jenkins','GitHub Actions','Git','Docker','Kubernetes','Maven'], href:'#devops'},
  {id:'data', title:'Databases & Persistence', metric:'Banking data workflows', detail:'Built persistence and reconciliation workflows for accounts, payments, and transactions.', tech:['Oracle','MySQL','SQL Server','Redis','SQL'], href:'#projects'},
  {id:'messaging', title:'Messaging & Resilience', metric:'Millions of banking events daily', detail:'Idempotent consumers, ordered delivery, retries, and dead-letter recovery.', tech:['RabbitMQ','AWS SQS','OCI Queue','Azure Service Bus','Resilience4j'], href:'#projects'},
  {id:'ai', title:'AI-Assisted Engineering', metric:'Engineering workflow automation', detail:'PR review, test generation, security checks, documentation, and RCA drafts.', tech:['Claude Code','GitHub Copilot','Codex','Custom Skills'], href:'#ai'}
];
const paths = {
  backend: <><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/></>,
  cloud: <path d="M20 16a4 4 0 0 0-1-7.9A7 7 0 0 0 5.3 7 5 5 0 0 0 6 17h14Z"/>,
  delivery: <><path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h4l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="10.5" cy="12" r="3"/></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
  messaging: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>,
  ai: <><path d="M12 3v18M12 5C8 0 4 5 6 8 1 9 3 15 5 15c-1 5 6 7 7 3M12 5c4-5 8 0 6 3 5 1 3 7 1 7 1 5-6 7-7 3"/><path d="m7 9 2 2-2 2m10-4-2 2 2 2"/></>
};
function Icon({type}) { return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>; }

export default function PortfolioBento() {
  const [quiet,setQuiet] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches);
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  const rootRef = useRef(null);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)');
    const wideMedia=window.matchMedia('(min-width: 1024px)');
    const updateWide=()=>setWide(wideMedia.matches);
    wideMedia.addEventListener('change',updateWide);
    const update=()=>setQuiet(media.matches);
    media.addEventListener('change',update);
    const root=rootRef.current;
    const observer=new IntersectionObserver(entries=>{root.dataset.inview=String(entries.some(e=>e.isIntersecting));});
    observer.observe(root);
    const onVisibility=()=>{root.dataset.documentVisible=String(!document.hidden);};
    document.addEventListener('visibilitychange',onVisibility); onVisibility();
    return ()=>{media.removeEventListener('change',update);wideMedia.removeEventListener('change',updateWide);observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);};
  },[]);
  const items=groups.map(group=>({
    id:group.id, title:group.title, href:group.href, colSpan:1,rowSpan:1,
    content:<div className="portfolio-bento__body">
      <div className="portfolio-bento__header"><span className="portfolio-bento__icon"><Icon type={group.id}/></span><h3>{group.title}</h3></div>
      <ul className="portfolio-bento__tech" aria-label={`${group.title} technologies`}>{group.tech.map(tech=><li key={tech}>{tech}</li>)}</ul>
      <div className="portfolio-bento__evidence"><strong>{group.metric}</strong><p>{group.detail}</p></div>
    </div>
  }));
  return <div ref={rootRef} className="portfolio-bento-wrap" data-quiet={quiet}>
    <MagicBento key={`${quiet?'quiet':'motion'}-${wide?'wide':'narrow'}`} items={items} columns={wide?3:2} rowHeight={278} gap={18} radius={18}
      glowColor="#5eead4" enableBorderGlow={!quiet} enableSpotlight={!quiet} spotlightRadius={320}
      enableTilt={!quiet} enableMagnetism={false} enableStars={!quiet} particleCount={10}
      clickEffect={!quiet} textAutoHide={false} intro={!quiet} disableAnimations={quiet}
      className="portfolio-bento"/>
  </div>;
}
