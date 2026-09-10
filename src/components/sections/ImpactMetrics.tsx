interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface ImpactMetricsProps {
  title?: string;
  subtitle?: string;
  metrics: Metric[];
}

export function ImpactMetrics({
  title = "Our Impact",
  subtitle,
  metrics,
}: ImpactMetricsProps) {
  return (
    <section
      className="py-16 sm:py-20 bg-background"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="impact-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center"
            >
              <dt className="text-base text-foreground-secondary">
                {metric.label}
              </dt>
              <dd className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                {metric.value}
              </dd>
              {metric.description && (
                <dd className="mt-2 text-sm text-foreground-secondary">
                  {metric.description}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
