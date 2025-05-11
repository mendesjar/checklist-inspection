import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

export function SideLabelButton({ className }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'fixed top-25 right-0 z-50 hidden origin-bottom-right -rotate-90 md:block',
        className,
      )}
    >
      <Button className="cursor-pointer rounded-none rounded-t-xl px-4 py-2 text-white transition-all hover:px-4.5">
        Preview PDF
        <span>
          <FileText className="stroke-3" />
        </span>
      </Button>
    </div>
  );
}
