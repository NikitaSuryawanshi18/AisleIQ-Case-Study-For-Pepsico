import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { ALL_SKUS, TIERS, TIER_DEFINITIONS, PROFILE_DIMS, GAP_DATA, PACK_ACTIONS, computeProfileMatch, getMatchLabel, getMatchColor, getTierColor, healthColor } from './data';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeIndexedTierTrends() {
  const tierList = Object.values(TIERS);
  const quarters = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"];
  const raw = {};
  tierList.forEach(tier => {
    const skus = ALL_SKUS.filter(s => s.tier === tier);
    raw[tier] = quarters.map((_, qi) => skus.reduce((sum, s) => sum + s.quarterlyRevenue[qi], 0));
  });
  return quarters.map((q, qi) => {
    const point = { q };
    tierList.forEach(tier => {
      point[tier] = parseFloat(((raw[tier][qi] / raw[tier][0]) * 100).toFixed(1));
    });
    return point;
  });
}

function computeHeadline() {
  const declining = ALL_SKUS.filter(s => s.demandTrend === 'declining');
  const growing = ALL_SKUS.filter(s => s.demandTrend === 'growing');
  const actionsNeeded = ALL_SKUS.filter(s => s.packAction !== 'MAINTAIN');
  return {
    declining: declining.length,
    growing: growing.length,
    actionsNeeded: actionsNeeded.length,
    headline: `${declining.length} SKUs are losing consumer demand. ${growing.length} SKUs are growing. ${actionsNeeded.length} pack or price decisions are waiting to be made.`,
  };
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function TierBadge({ tier }) {
  const c = getTierColor(tier);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: c.color, background: c.bg, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
      {tier.toUpperCase()}
    </span>
  );
}

function HealthBar({ score, width = 60 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width, height: 6, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: healthColor(score), borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: healthColor(score), fontFamily: 'var(--font-display)' }}>{score}</span>
    </div>
  );
}

function TrendPill({ val }) {
  const map = {
    growing: ['Growing', 'var(--invest)', 'var(--invest-bg)', '↑'],
    stable: ['Stable', 'var(--maintain)', 'var(--maintain-bg)', '→'],
    declining: ['Declining', 'var(--divest)', 'var(--divest-bg)', '↓'],
  };
  const [label, color, bg, arrow] = map[val] || ['Unknown', 'var(--text-2)', 'var(--surface2)', ''];
  return <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, color, background: bg }}>{arrow} {label}</span>;
}

function MatchBadge({ score }) {
  const c = getMatchColor(score);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: c.color, background: c.bg, fontFamily: 'var(--font-display)' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
      {getMatchLabel(score)}
    </span>
  );
}

function ActionBadge({ actionKey }) {
  const action = PACK_ACTIONS[actionKey];
  if (!action) return null;
  return (
    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, color: action.color, background: action.bg, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
      {action.label}
    </span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '22px 24px', ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
      {children}
    </div>
  );
}

// ─── Floating Legend Button ───────────────────────────────────────────────────

function TierLegend() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: 28, right: 28, width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,50,112,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, transition: 'transform 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ color: '#fff', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1 }}>?</span>
      </button>
      {open && (
        <div style={{ position: 'fixed', bottom: 84, right: 28, width: 360, maxWidth: 'calc(100vw - 40px)', maxHeight: 'calc(100vh - 120px)', background: 'var(--surface)', borderRadius: 14, boxShadow: '0 8px 40px rgba(0,50,112,0.18)', border: '1px solid var(--border)', zIndex: 200, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.2s ease' }}>
          <div style={{ background: 'var(--blue)', padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>Tier Definitions</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>What each portfolio tier means</div>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', flex: 1 }}>
            {TIER_DEFINITIONS.map(t => (
              <div key={t.tier} style={{ display: 'flex', gap: 12 }}>
                <div style={{ paddingTop: 2 }}>
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700, color: t.color, background: t.bg, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>{t.tier.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>{t.definition}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(false)} style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── SKU Detail Panel ─────────────────────────────────────────────────────────

function SkuPanel({ sku, onClose, profile }) {
  if (!sku) return null;
  const matchScore = profile ? computeProfileMatch(sku, profile) : null;
  const quarters = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"];
  const chartData = sku.quarterlyRevenue.map((v, i) => ({ q: quarters[i], v }));
  const action = PACK_ACTIONS[sku.packAction];
  const radarData = [
    { metric: 'Health', value: sku.healthScore },
    { metric: 'Protein', value: Math.min(100, sku.proteinG * 10) },
    { metric: 'Fiber', value: Math.min(100, sku.fiberG * 14) },
    { metric: 'Low Sodium', value: Math.max(0, 100 - sku.sodium / 3) },
    { metric: 'Clean Label', value: sku.cleanLabel ? 90 : 20 },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }} onClick={onClose}>
      <div style={{ flex: 1, background: 'rgba(0,30,70,0.4)', backdropFilter: 'blur(4px)' }} />
      <div onClick={e => e.stopPropagation()} style={{ width: 520, background: 'var(--surface)', overflowY: 'auto', boxShadow: '-8px 0 40px rgba(0,50,112,0.15)', animation: 'fadeUp 0.25s ease' }}>
        <div style={{ padding: '24px 26px 18px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <TierBadge tier={sku.tier} />
                {matchScore !== null && <MatchBadge score={matchScore} />}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>{sku.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{sku.brand}</div>
              <div style={{ marginTop: 10 }}><HealthBar score={sku.healthScore} width={80} /></div>
            </div>
            <button onClick={onClose} style={{ background: 'var(--surface2)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 300 }}>x</button>
          </div>
        </div>

        <div style={{ padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ background: action.bg, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${action.color}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: action.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 6 }}>Pack and Price Recommendation: {action.label}</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.8 }}>{sku.packActionNote}</p>
          </div>

          <div>
            <SectionLabel>Nutritional Profile</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[{ label: 'Protein', value: `${sku.proteinG}g` }, { label: 'Fiber', value: `${sku.fiberG}g` }, { label: 'Sodium', value: `${sku.sodium}mg` }, { label: 'Clean Label', value: sku.cleanLabel ? 'Yes' : 'No' }].map(n => (
                <div key={n.label} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{n.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{n.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Health Attribute Radar</SectionLabel>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: 'var(--text-2)', fontFamily: 'var(--font-body)' }} />
                <Radar dataKey="value" stroke="var(--blue)" fill="var(--blue)" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <SectionLabel>Revenue Trend (USD M, simulated)</SectionLabel>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="q" tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke={sku.demandTrend === 'growing' ? 'var(--invest)' : sku.demandTrend === 'declining' ? 'var(--divest)' : 'var(--maintain)'} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <SectionLabel>Pack Formats: Current vs Recommended Price per oz</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sku.formats.map(f => {
                const curr = sku.currentPricePerOz[f];
                const rec = sku.recommendedPricePerOz[f];
                const diff = (rec - curr).toFixed(2);
                const isBest = sku.bestFormats.includes(f);
                return (
                  <div key={f} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: isBest ? 'var(--blue-soft)' : 'var(--surface2)', border: `1px solid ${isBest ? 'var(--blue-mid)' : 'var(--border)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{f}</span>
                      {isBest && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', fontFamily: 'var(--font-display)' }}>BEST FIT</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>CURRENT</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>${curr}/oz</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>RECOMMENDED</div>
                        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)', color: parseFloat(diff) < 0 ? 'var(--divest)' : parseFloat(diff) > 0 ? 'var(--invest)' : 'var(--text-2)' }}>
                          ${rec}/oz {parseFloat(diff) !== 0 && <span style={{ fontSize: 11 }}>({parseFloat(diff) > 0 ? '+' : ''}{diff})</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--blue-soft)', borderRadius: 10, padding: '16px 18px', borderLeft: '3px solid var(--blue)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 8 }}>Strategic Analysis</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.8 }}>{sku.insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 1: Overview ──────────────────────────────────────────────────────────

function Overview({ onSelectSku }) {
  const { declining, growing, actionsNeeded, headline } = computeHeadline();
  const indexedData = computeIndexedTierTrends();

  const tierLineColors = {
    [TIERS.CLASSIC]: '#E8001C',
    [TIERS.BETTER]: '#0d7a4e',
    [TIERS.FUNCTIONAL]: '#1a56a0',
  };

  const actionGroups = {
    EXPAND: ALL_SKUS.filter(s => s.packAction === 'EXPAND'),
    REPRICE: ALL_SKUS.filter(s => s.packAction === 'REPRICE'),
    REPOSITION: ALL_SKUS.filter(s => s.packAction === 'REPOSITION'),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: 'var(--blue)', borderRadius: 'var(--radius)', padding: '24px 28px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Portfolio Snapshot</div>
        <p style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1.5, color: '#fff', maxWidth: 700 }}>{headline}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'SKUs Losing Consumer Demand', value: declining, color: 'var(--red)', sub: 'Demand trend: declining' },
          { label: 'SKUs Gaining Consumer Demand', value: growing, color: 'var(--invest)', sub: 'Demand trend: growing' },
          { label: 'Pack or Price Decisions Pending', value: actionsNeeded, color: 'var(--blue)', sub: 'Expand, Reprice, or Reposition' },
        ].map((k, i) => (
          <div key={k.label} className={`fade-up fade-up-${i + 1}`} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '22px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 12 }}>{k.label}</div>
            <div style={{ fontSize: 48, fontWeight: 800, color: k.color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <Card>
        <SectionLabel>Where is Growth Coming From? (Indexed to 100 at Q1 2023)</SectionLabel>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
          {Object.values(TIERS).map(tier => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 3, borderRadius: 99, background: tierLineColors[tier] }} />
              <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{tier}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={indexedData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="q" tick={{ fontSize: 11, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} width={36} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
              formatter={(v, name) => [`${v}`, name]}
            />
            {Object.values(TIERS).map(tier => (
              <Line key={tier} type="monotone" dataKey={tier} stroke={tierLineColors[tier]} strokeWidth={2.5} dot={{ r: 3, fill: tierLineColors[tier] }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, fontStyle: 'italic' }}>Indexed to 100 at Q1 2023. Shows growth trajectory per tier, not absolute revenue size. Revenue figures are simulated for demonstration purposes.</p>
      </Card>

      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>What Needs to Happen Now</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {Object.entries(actionGroups).map(([key, skus]) => {
            const action = PACK_ACTIONS[key];
            return (
              <Card key={key} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: action.color, display: 'inline-block' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: action.color, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{action.label}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 'auto' }}>{skus.length} SKUs</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 14 }}>{action.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {skus.map(sku => (
                    <div key={sku.id} onClick={() => onSelectSku(sku)} style={{ padding: '8px 10px', borderRadius: 7, background: 'var(--surface2)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'opacity 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{sku.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sku.brand} · {sku.tier}</div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Consumer Gaps ─────────────────────────────────────────────────────

function ConsumerGaps({ onSelectSku }) {
  const [activeGap, setActiveGap] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: 'var(--blue-soft)', borderRadius: 10, padding: '14px 18px', borderLeft: '3px solid var(--blue)' }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
          Each bar shows how well PepsiCo's current snack portfolio covers a broad consumer need state. <strong>Critical gaps</strong> are segments where PepsiCo has no strong SKU answer today. Click any bar to see what PepsiCo should do about it.
        </p>
      </div>

      <Card>
        <SectionLabel>Consumer Need State Coverage</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GAP_DATA.map(g => (
            <div key={g.segment} onClick={() => setActiveGap(activeGap?.segment === g.segment ? null : g)}
              style={{ cursor: 'pointer', padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${activeGap?.segment === g.segment ? g.color : 'var(--border)'}`, background: activeGap?.segment === g.segment ? 'var(--surface2)' : 'var(--surface)', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{g.segment}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: g.color, padding: '2px 10px', borderRadius: 6, background: g.color === 'var(--invest)' ? 'var(--invest-bg)' : g.color === 'var(--maintain)' ? 'var(--maintain-bg)' : g.color === 'var(--watch)' ? 'var(--watch-bg)' : 'var(--divest-bg)', fontFamily: 'var(--font-display)' }}>{g.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{g.coverage}%</span>
                </div>
              </div>
              <div style={{ height: 12, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ width: `${g.coverage}%`, height: '100%', background: g.color, borderRadius: 99, transition: 'width 0.8s ease' }} />
              </div>
              {activeGap?.segment === g.segment && (
                <div style={{ marginTop: 12, padding: '12px 14px', borderRadius: 8, background: 'var(--surface)', border: `1px solid ${g.color}`, animation: 'fadeUp 0.2s ease' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: g.color, fontFamily: 'var(--font-display)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>So What?</div>
                  <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>{g.soWhat}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Closest Existing SKUs to the Critical Gaps</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14, lineHeight: 1.7 }}>PepsiCo's best current answers to the two critical white spaces. Each has a material gap in coverage. Click any row for the full strategic analysis.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ALL_SKUS.filter(s => ['F05', 'F01', 'F04', 'B04', 'C03'].includes(s.id)).map(sku => (
            <div key={sku.id} onClick={() => onSelectSku(sku)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', boxShadow: 'var(--shadow)', transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{sku.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{sku.brand} · {sku.tier}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <TierBadge tier={sku.tier} />
                <ActionBadge actionKey={sku.packAction} />
                <HealthBar score={sku.healthScore} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Innovation White Spaces</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14, lineHeight: 1.7 }}>Consumer segments where PepsiCo has no strong answer today and should consider new product development.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'GLP-1 / Functional Consumer', color: 'var(--divest)', bg: 'var(--divest-bg)', border: 'rgba(196,28,28,0.15)', desc: 'No PepsiCo SKU is purpose-built for the GLP-1 consumer — high protein, high fiber, small portions, satiety-focused. Siete and Doritos Protein are adjacent but not designed for this occasion. This is the single fastest-growing consumer segment in snacking.', action: 'Launch a new functional snack line targeting the GLP-1 occasion: small-serve, 12g+ protein, 5g+ fiber, clean label.' },
            { title: 'Clean Label + Value', color: 'var(--divest)', bg: 'var(--divest-bg)', border: 'rgba(196,28,28,0.15)', desc: "Budget-sensitive consumers who want clean ingredients have almost no PepsiCo option. Lay's Classic is the closest but lacks marketing for this positioning. Simply Doritos is clean label but premium-priced.", action: "Create a value-tier clean label snack with simple ingredients, accessible price point (under $0.40/oz family size), aggressively distributed in grocery." },
            { title: 'Single-Serve + Protein', color: 'var(--watch)', bg: 'var(--watch-bg)', border: 'rgba(180,83,9,0.15)', desc: 'Doritos Protein exists in single-serve but distribution is limited to select markets. The grab-and-go protein snack occasion is growing rapidly.', action: 'Expand Doritos Protein single-serve distribution to convenience stores nationally. Priority channel for 2025.' },
            { title: 'Budget + Healthy', color: 'var(--watch)', bg: 'var(--watch-bg)', border: 'rgba(180,83,9,0.15)', desc: 'SunChips and PopCorners serve the medium-budget health-conscious consumer well, but there is a gap below this price point for lower-budget shoppers who want healthier options.', action: 'Explore a budget-friendly SunChips mini-pack at a sub-$1.50 single-serve price point for convenience channels.' },
          ].map(o => (
            <div key={o.title} style={{ padding: '16px 18px', borderRadius: 10, background: o.bg, border: `1px solid ${o.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: o.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>{o.title}</div>
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 10 }}>{o.desc}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: o.color, lineHeight: 1.6 }}>Recommended action: {o.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Pack & Price ──────────────────────────────────────────────────────

function PackPrice({ onSelectSku }) {
  const [filter, setFilter] = useState('All');
  const tiers = ['All', ...Object.values(TIERS)];
  const filtered = filter === 'All' ? ALL_SKUS : ALL_SKUS.filter(s => s.tier === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ background: 'var(--blue-soft)', borderRadius: 10, padding: '14px 18px', borderLeft: '3px solid var(--blue)' }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
          Each row answers: <strong>what format is this SKU available in, what format should it prioritize, is it priced correctly, and what should PepsiCo do?</strong> The Action column tells you exactly what needs to change. Click any row for the full breakdown.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tiers.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ padding: '6px 16px', borderRadius: 99, border: '1.5px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-display)', transition: 'all 0.15s', borderColor: filter === t ? 'var(--blue)' : 'var(--border)', background: filter === t ? 'var(--blue)' : 'var(--surface)', color: filter === t ? '#fff' : 'var(--text-2)' }}>{t}</button>
        ))}
      </div>

      <div style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', minWidth: 1200 }}>
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['SKU', 'Tier', 'Health Score', 'Demand', 'Current Formats', 'Best-Fit Format', 'Current $/oz', 'Recommended $/oz', 'Consumer Shift Risk', 'Action'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(sku => {
              const bestFormat = sku.bestFormats[0];
              const currPrice = sku.currentPricePerOz[bestFormat];
              const recPrice = sku.recommendedPricePerOz[bestFormat];
              const priceDiff = (recPrice - currPrice).toFixed(2);
              return (
                <tr key={sku.id} onClick={() => onSelectSku(sku)} style={{ borderTop: '1px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{sku.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, fontFamily: 'var(--font-display)' }}>{sku.brand}</div>
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}><TierBadge tier={sku.tier} /></td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}><HealthBar score={sku.healthScore} width={50} /></td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}><TrendPill val={sku.demandTrend} /></td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {sku.formats.map(f => <span key={f} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--text-2)', fontFamily: 'var(--font-display)', fontWeight: 600, whiteSpace: 'nowrap' }}>{f}</span>)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {sku.bestFormats.map(f => <span key={f} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--blue-soft)', color: 'var(--blue)', fontFamily: 'var(--font-display)', fontWeight: 700, whiteSpace: 'nowrap' }}>{f}</span>)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>${currPrice}/oz</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', color: parseFloat(priceDiff) < 0 ? 'var(--divest)' : parseFloat(priceDiff) > 0 ? 'var(--invest)' : 'var(--text-2)' }}>
                      ${recPrice}/oz
                      {parseFloat(priceDiff) !== 0 && <span style={{ fontSize: 11, marginLeft: 4 }}>({parseFloat(priceDiff) > 0 ? '+' : ''}{priceDiff})</span>}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: sku.consumerShiftRisk === 'low' ? 'var(--invest)' : sku.consumerShiftRisk === 'medium' ? 'var(--watch)' : 'var(--divest)' }}>{sku.consumerShiftRisk}</span>
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}><ActionBadge actionKey={sku.packAction} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Consumer Gaps', 'Pack & Price'];

export default function App() {
  const [tab, setTab] = useState('Overview');
  const [selectedSku, setSelectedSku] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const tabMeta = {
    'Overview': { title: 'Portfolio Overview', sub: 'What is the state of PepsiCo\'s snack portfolio today?' },
    'Consumer Gaps': { title: 'Consumer Gaps', sub: 'Where does PepsiCo have no good snack answer for today\'s consumer?' },
    'Pack & Price': { title: 'Pack and Price Intelligence', sub: 'Is PepsiCo selling each snack in the right format at the right price?' },
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: 'var(--blue-dark)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(0,30,80,0.2)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 34, height: 34, background: 'var(--red)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)' }}>A</span>
            </div>
            <div>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>AisleIQ</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginLeft: 10, fontFamily: 'var(--font-display)' }}>PepsiCo Snack Portfolio Intelligence</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-display)' }}>Live · {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-display)', border: '1px solid rgba(255,255,255,0.15)' }}>{ALL_SKUS.length} SKUs</div>
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', width: '100%', display: 'flex', gap: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 22px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', background: tab === t ? 'rgba(255,255,255,0.1)' : 'transparent', transition: 'all 0.15s', color: tab === t ? '#fff' : 'rgba(255,255,255,0.5)', borderBottom: `2px solid ${tab === t ? '#fff' : 'transparent'}`, marginBottom: -1, whiteSpace: 'nowrap', borderRadius: tab === t ? '6px 6px 0 0' : 0 }}>{t}</button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 32px', width: '100%' }}>
        <div className="fade-up">
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{tabMeta[tab].title}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{tabMeta[tab].sub}</p>
          </div>
          {tab === 'Overview' && <Overview onSelectSku={sku => { setSelectedSku(sku); setSelectedProfile(null); }} />}
          {tab === 'Consumer Gaps' && <ConsumerGaps onSelectSku={(sku, profile) => { setSelectedSku(sku); setSelectedProfile(profile || null); }} />}
          {tab === 'Pack & Price' && <PackPrice onSelectSku={sku => { setSelectedSku(sku); setSelectedProfile(null); }} />}
        </div>
      </main>

      <SkuPanel sku={selectedSku} onClose={() => { setSelectedSku(null); setSelectedProfile(null); }} profile={selectedProfile} />
      <TierLegend />
    </div>
  );
}
