import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto text-center' : '',
        'max-w-2xl',
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}
