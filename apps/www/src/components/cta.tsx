import { Button } from '@ai-toolkit/design-system';
import { ArrowRight, Github } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 md:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl">
            Start building in seconds
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Kickstart your next project with templates built by us and our community.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-11 px-8">
              View all examples
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-8" asChild>
              <a
                href="https://github.com/khulnasoft/ai-toolkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Official GitHub library
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
