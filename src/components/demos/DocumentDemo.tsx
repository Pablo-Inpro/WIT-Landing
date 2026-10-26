"use client";

import { documentDemo } from "@/config/demos";

type DocumentDemoProps = {
  className?: string;
};

export function DocumentDemo({ className = "" }: DocumentDemoProps) {
  return (
    <div
      className={`grid gap-4 md:grid-cols-2 md:gap-6 ${className}`}
      data-demo="document"
    >
      <div className="demo-panel p-4 md:p-5" data-doc-agenda>
        <p className="text-label text-stone">Orden del día</p>
        <p className="mt-1 text-sm text-muted">{documentDemo.meetingType}</p>
        <ol className="mt-4 space-y-3">
          {documentDemo.agenda.map((item, index) => (
            <li
              key={item}
              data-agenda-item
              className="flex gap-3 border-b border-border/40 pb-3 text-sm text-ivory last:border-0"
            >
              <span className="font-mono text-xs text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="demo-panel relative overflow-hidden p-4 md:p-5"
        data-doc-draft
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-label text-gold">Acta · borrador</p>
            <h3 className="mt-2 font-display text-xl text-ivory md:text-2xl">
              {documentDemo.meetingType}
            </h3>
          </div>
          <span className="rounded-md border border-gold/30 px-2 py-1 text-[10px] uppercase tracking-wider text-gold">
            {documentDemo.draftStatus}
          </span>
        </div>

        <div className="mt-6 space-y-4" data-doc-agreements>
          {documentDemo.decisions.map((decision) => (
            <div
              key={decision.topic}
              data-agreement
              className="rounded-md border border-border/50 bg-deep/50 p-3"
            >
              <p className="text-sm font-medium text-ivory">{decision.topic}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {decision.agreement}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-stone">
          El administrador revisa y valida antes de cualquier aprobación.
        </p>
      </div>
    </div>
  );
}
