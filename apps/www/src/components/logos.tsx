export function Logos() {
  const logos = [
    { name: 'Perplexity', width: 120 },
    { name: 'Supabase', width: 110 },
    { name: 'Vercel', width: 90 },
    { name: 'Sitecore', width: 100 },
    { name: 'Chatbase', width: 100 },
  ];

  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by builders at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-foreground font-semibold text-lg"
              style={{ width: logo.width }}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
