import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function SideLabelButton() {
  return (
    <div className="fixed top-25 right-0 z-50 hidden origin-bottom-right -rotate-90 md:block">
      <Button className="rounded-none rounded-t-xl px-4 py-2 text-white transition-all hover:px-4.5">
        Preview PDF
        <span>
          <FileText />
        </span>
      </Button>
    </div>
  );
}
