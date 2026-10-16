import { useCallback, useEffect, useRef, useState } from 'react';

import { IconCalendar, IconDroplet, IconEye, IconHeart, IconInfo, IconMeal, IconPill, LogoMark } from '../components/Icons';
import { loadReport, logAccess, tokenFromHash, type LoadResult, type SharedReport } from './firestoreRest';
import { chartPoints, fmtDateTime, fmtDay, fmtDayShort, fmtNum, fmtWeekday, pct, plural, rangeMark } from './format';

/** Mesmo texto do relatório em PDF do app (REPORT_DISCLAIMER em src/report/buildReport.ts da V2). */
export const REPORT_DISCLAIMER =
  'Relatório organizado a partir de dados registrados no aplicativo DiabetesIA. Não contém diagnóstico, prescrição ou orientação de tratamento e não substitui a avaliação de um profissional de saúde.';

type ViewState = { status: 'loading' } | LoadResult;

const svg = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
const IconClock = () => (
  <svg {...svg}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5M9.5 2.5h5" />
  </svg>
);
const IconLinkOff = () => (
  <svg {...svg}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 4 8M8 12h4M3 3l18 18" />
  </svg>
);
const IconHelp = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.2a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2.2-2.4 3.6M12 17h.01" />
  </svg>
);
const IconWifiOff = () => (
  <svg {...svg}>
    <path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M14.5 10.5A10 10 0 0 1 19 13M2 9.5a15 15 0 0 1 4.5-2.8M10.5 5.1A15 15 0 0 1 22 9.5M12 20h.01" />
  </svg>
);

function StateBox({ icon, title, text, children }: { icon: JSX.Element; title: string; text: string; children?: JSX.Element }) {
  return (
    <main className="rv-state">
      <div className="rv-state-box">
        <div className="rv-state-icon">{icon}</div>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </main>
  );
}

function Skeleton() {
  return (
    <main className="rv-skel" role="status" aria-live="polite">
      <span className="rv-sr">Carregando o relatório</span>
      <i className="h" />
      <i style={{ width: '80%' }} />
      <i style={{ width: '55%' }} />
      <i className="blk" />
      <i className="blk" />
      <i className="blk" />
      <p>Carregando o relatório…</p>
    </main>
  );
}

function Value({ v }: { v: number }) {
  const mark = rangeMark(v);
  if (mark === 'low') return <span className="rv-low">↓ {fmtNum(v)}</span>;
  if (mark === 'high') return <span className="rv-high">↑ {fmtNum(v)}</span>;
  return <>{fmtNum(v)}</>;
}

function GlucoseChart({ rows }: { rows: { day: string; mean: number }[] }) {
  if (rows.length === 0) return null;
  const { band, points } = chartPoints(rows);
  const label = `Média diária de glicemia de ${fmtDayShort(rows[0].day)} a ${fmtDayShort(rows[rows.length - 1].day)}: ${rows.map((r) => fmtNum(r.mean)).join(', ')} mg/dL`;
  return (
    <div className="rv-chart">
      <svg viewBox="0 0 320 110" role="img" aria-label={label}>
        <rect x="28" y={band.y180} width="288" height={band.y70 - band.y180} className="rv-band" />
        <line x1="28" y1={band.y180} x2="316" y2={band.y180} className="rv-bandline" />
        <line x1="28" y1={band.y70} x2="316" y2={band.y70} className="rv-bandline" />
        <text x="24" y={band.y180 + 3} className="rv-axis" textAnchor="end">
          180
        </text>
        <text x="24" y={band.y70 + 3} className="rv-axis" textAnchor="end">
          70
        </text>
        {points.length > 1 && <polyline className="rv-line" points={points.map((p) => `${p.x},${p.y}`).join(' ')} />}
        {points.map((p) => (
          <circle key={p.day} cx={p.x} cy={p.y} r={points.length > 15 ? 2.2 : 3.5} className="rv-dot" />
        ))}
        {points
          .filter((p) => p.label)
          .map((p) => (
            <text key={`l${p.day}`} x={p.x} y="104" className="rv-axis" textAnchor="middle">
              {fmtDayShort(p.day)}
            </text>
          ))}
      </svg>
      <p className="rv-cap">Média diária em mg/dL. Faixa verde: 70 a 180 mg/dL.</p>
    </div>
  );
}

function Report({ report }: { report: SharedReport }) {
  const { summary: s } = report;
  const g = s.glucose;
  const bp = s.bloodPressure;
  const daysText = `em ${plural(s.days, 'dia', 'dias')}`;
  const low = pct(g.below70, g.count);
  const inR = pct(g.inRange, g.count);
  const high = pct(g.above180, g.count);

  return (
    <main className="rv-doc">
      <div className="rv-inner">
        <div className="rv-brand">
          <span className="rv-logo">
            <LogoMark />
          </span>
          DiabetesIA
        </div>
        <div>
          <h1>Relatório de acompanhamento</h1>
          <div className="rv-meta">
            <span>
              <IconCalendar />
              Período: {fmtDay(report.from)} a {fmtDay(report.to)}
            </span>
            <span>
              <IconClock />
              Gerado em {fmtDateTime(report.createdAt)}
            </span>
          </div>
        </div>

        <div className="rv-banner">
          <span>
            <IconEye />
            <b>Somente leitura</b>
          </span>
          <span>
            <IconInfo />
            Resumo dos registros no momento em que o link foi criado
          </span>
          <span className="rv-exp">
            <IconClock />
            Este link expira em {fmtDateTime(report.expiresAt)}
          </span>
        </div>

        <div className="rv-kpis">
          <div className="rv-kpi">
            <span className="k">Média de glicemia</span>
            <span className="v">
              {g.average === null ? '—' : fmtNum(g.average)} {g.average !== null && <small>mg/dL</small>}
            </span>
            <span className="s">{g.average === null && g.count > 0 ? 'poucas medições para a média' : plural(g.count, 'medição', 'medições')}</span>
          </div>
          <div className="rv-kpi">
            <span className="k">Entre 70 e 180 mg/dL</span>
            <span className="v">{g.count > 0 ? `${inR}%` : '—'}</span>
            <span className="s">
              {g.inRange} de {plural(g.count, 'medição', 'medições')}
            </span>
          </div>
          <div className="rv-kpi">
            <span className="k">Mínimo / máximo</span>
            <span className="v">
              {g.min !== null && g.max !== null ? (
                <>
                  {fmtNum(g.min)} / {fmtNum(g.max)} <small>mg/dL</small>
                </>
              ) : (
                '—'
              )}
            </span>
            <span className="s">{daysText}</span>
          </div>
          <div className="rv-kpi">
            <span className="k">Dias com registro</span>
            <span className="v">
              {s.daysWithAnyRecord} <small>de {s.days}</small>
            </span>
            <span className="s">algum registro no dia</span>
          </div>
        </div>

        <section className="rv-sec">
          <h2>
            <span className="rv-ico g">
              <IconDroplet />
            </span>
            Glicemia
          </h2>
          {g.count === 0 ? (
            <p className="rv-note">Nenhuma medição de glicemia no período.</p>
          ) : (
            <>
              <div className="rv-grid2">
                <dl className="rv-kv">
                  <dt>Medições</dt>
                  <dd>
                    {g.count} {daysText}
                  </dd>
                  <dt>Média</dt>
                  <dd>{g.average === null ? 'não calculada' : `${fmtNum(g.average)} mg/dL`}</dd>
                  <dt>Mínimo</dt>
                  <dd>{g.min === null ? '—' : `${fmtNum(g.min)} mg/dL`}</dd>
                  <dt>Máximo</dt>
                  <dd>{g.max === null ? '—' : `${fmtNum(g.max)} mg/dL`}</dd>
                  <dt>Entre 70 e 180 mg/dL</dt>
                  <dd>{inR}%</dd>
                </dl>
                <div className="rv-dist">
                  <div
                    className="rv-dbar"
                    role="img"
                    aria-label={`Distribuição: abaixo de 70, ${g.below70} medições (${low}%); entre 70 e 180, ${g.inRange} (${inR}%); acima de 180, ${g.above180} (${high}%)`}
                  >
                    {g.below70 > 0 && <i className="sw-low" style={{ flex: g.below70 }} />}
                    {g.inRange > 0 && <i className="sw-in-bar" style={{ flex: g.inRange }} />}
                    {g.above180 > 0 && <i className="sw-high-bar" style={{ flex: g.above180 }} />}
                  </div>
                  <div className="rv-legend">
                    <span>
                      <i className="sw-low" />
                      Abaixo de 70: {g.below70} ({low}%)
                    </span>
                    <span>
                      <i className="sw-in" />
                      70 a 180: {g.inRange} ({inR}%)
                    </span>
                    <span>
                      <i className="sw-high" />
                      Acima de 180: {g.above180} ({high}%)
                    </span>
                  </div>
                  <GlucoseChart rows={g.daily} />
                </div>
              </div>
              <div className="rv-tablewrap">
                <table className="rv-days">
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Medições</th>
                      <th>Média</th>
                      <th>Mínimo</th>
                      <th>Máximo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.daily.map((r) => (
                      <tr key={r.day}>
                        <td>{fmtWeekday(r.day)}</td>
                        <td>{r.count}</td>
                        <td>{fmtNum(r.mean)}</td>
                        <td>
                          <Value v={r.min} />
                        </td>
                        <td>
                          <Value v={r.max} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="rv-note">Valores em mg/dL. ↓ abaixo de 70, ↑ acima de 180. Faixa geral usada no app; a meta pessoal pode ser outra.</p>
            </>
          )}
        </section>

        <div className="rv-grid2">
          {bp && (
            <section className="rv-sec">
              <h2>
                <span className="rv-ico p">
                  <IconHeart />
                </span>
                Pressão arterial
              </h2>
              <dl className="rv-kv">
                <dt>Medições</dt>
                <dd>
                  {bp.count} em {plural(bp.days, 'dia', 'dias')}
                </dd>
                {bp.average && (
                  <>
                    <dt>Média</dt>
                    <dd>
                      {fmtNum(bp.average.systolic)} / {fmtNum(bp.average.diastolic)} mmHg
                    </dd>
                  </>
                )}
                {bp.highest && (
                  <>
                    <dt>Maior</dt>
                    <dd>
                      {fmtNum(bp.highest.systolic)} / {fmtNum(bp.highest.diastolic)} mmHg
                    </dd>
                  </>
                )}
                {bp.lowest && (
                  <>
                    <dt>Menor</dt>
                    <dd>
                      {fmtNum(bp.lowest.systolic)} / {fmtNum(bp.lowest.diastolic)} mmHg
                    </dd>
                  </>
                )}
              </dl>
            </section>
          )}
          <section className="rv-sec">
            <h2>
              <span className="rv-ico m">
                <IconPill />
              </span>
              Medicação
            </h2>
            <dl className="rv-kv">
              <dt>Dias com registro</dt>
              <dd>
                {s.medication.daysWithRecord} de {s.days}
              </dd>
              <dt>Registros no período</dt>
              <dd>{s.medication.records}</dd>
            </dl>
            <p className="rv-note">Mostra se houve registro, não confirma o uso.</p>
          </section>
          <section className="rv-sec">
            <h2>
              <span className="rv-ico f">
                <IconMeal />
              </span>
              Refeições
            </h2>
            <dl className="rv-kv">
              <dt>Refeições registradas</dt>
              <dd>{s.meals.count}</dd>
              <dt>Dias com refeição registrada</dt>
              <dd>
                {s.meals.daysWithRecord} de {s.days}
              </dd>
            </dl>
          </section>
        </div>

        <p className="rv-disclaimer">
          <IconInfo />
          <span>{REPORT_DISCLAIMER}</span>
        </p>
        <p className="rv-foot">Este relatório não tem fotos, textos da inteligência artificial nem anotações pessoais.</p>
      </div>
    </main>
  );
}

let accessLogged = false;

/** Dev only: #demo, #demo-indisponivel, #demo-invalido, #demo-erro, #demo-carregando (nunca no build de produção). */
async function loadDemo(hash: string): Promise<LoadResult | null> {
  if (!import.meta.env.DEV || !hash.startsWith('#demo')) return null;
  const { demoResult } = await import('./demoReport');
  return demoResult(hash.slice(1));
}

export function ReportViewer() {
  const [state, setState] = useState<ViewState>({ status: 'loading' });
  const tokenRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const hash = window.location.hash;
    if (import.meta.env.DEV) {
      const demo = await loadDemo(hash);
      if (demo) return setState(demo);
      if (hash === '#demo-carregando') return;
    }
    const token = tokenFromHash(hash);
    tokenRef.current = token;
    const result = await loadReport(token);
    setState(result);
    if (result.status === 'ok' && token && !accessLogged) {
      accessLogged = true;
      void logAccess(token);
    }
  }, []);

  useEffect(() => {
    void load();
    const onHash = () => {
      accessLogged = false;
      void load();
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [load]);

  useEffect(() => {
    document.title = state.status === 'ok' ? 'Relatório de acompanhamento | DiabetesIA' : 'Relatório | DiabetesIA';
  }, [state.status]);

  switch (state.status) {
    case 'loading':
      return <Skeleton />;
    case 'ok':
      return <Report report={state.report} />;
    case 'unavailable':
      return (
        <StateBox
          icon={<IconLinkOff />}
          title="Este link não está mais disponível"
          text="O link expirou ou foi encerrado por quem compartilhou. Se precisar ver o relatório, peça um novo link ao paciente."
        />
      );
    case 'invalid':
      return (
        <StateBox
          icon={<IconHelp />}
          title="Link inválido"
          text="Não encontramos um relatório neste endereço. Confira se o link foi copiado inteiro ou peça um novo link ao paciente."
        />
      );
    case 'error':
      return (
        <StateBox icon={<IconWifiOff />} title="Não foi possível carregar o relatório" text="Verifique a conexão e tente novamente.">
          <button type="button" className="rv-btn" onClick={() => void load()}>
            Tentar novamente
          </button>
        </StateBox>
      );
  }
}
