import { IconRocket, IconBooks, IconCertificate, IconChevronDown } from "@tabler/icons-react";

// Order matches the learningJourney data shape: getStarted (pre-enrollment),
// learnAndPractice (during the course), completeAndProgress (post-sessions).
const PHASES = [
  { key: "getStarted", label: "Get Started", Icon: IconRocket },
  { key: "learnAndPractice", label: "Learn & Practice", Icon: IconBooks },
  { key: "completeAndProgress", label: "Complete & Progress", Icon: IconCertificate },
];

function PhaseSteps({ steps, themeColor }) {
  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px" style={{ backgroundColor: `${themeColor}33` }} />
      <div className="flex flex-col gap-7">
        {steps.map((step) => (
          <div key={step.step} className="relative flex gap-4">
            <span
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: themeColor }}
            >
              {step.step}
            </span>
            <div className="pt-1">
              <p className="font-heading font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-sm text-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Desktop renders all three phases as columns side by side; mobile collapses
// them into a stacked accordion. Both read from the same `journey` data —
// native <details>/<summary> gives "collapsed by default" and the open/close
// interaction with zero client-side JS.
export default function JourneyTimeline({ journey, themeColor }) {
  return (
    <>
      <div className="hidden gap-10 md:grid md:grid-cols-3">
        {PHASES.map(({ key, label, Icon }) => (
          <div key={key}>
            <div className="mb-6 flex items-center gap-2">
              <Icon size={20} stroke={1.75} style={{ color: themeColor }} />
              <h3 className="font-heading font-semibold text-foreground">{label}</h3>
            </div>
            <PhaseSteps steps={journey[key]} themeColor={themeColor} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {PHASES.map(({ key, label, Icon }) => (
          <details key={key} className="group rounded-lg border border-border bg-background p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon size={20} stroke={1.75} style={{ color: themeColor }} />
                <span className="font-heading font-semibold text-foreground">{label}</span>
              </span>
              <IconChevronDown size={18} className="text-secondary transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-5 pl-1">
              <PhaseSteps steps={journey[key]} themeColor={themeColor} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
