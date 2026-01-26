import { AlertTriangle, ChevronDown, Mail, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { UpgradeModalState } from '../contexts/UpgradeModalContext';
import { cn } from '../lib/utils';
import { TierComparisonTable } from './TierComparisonTable';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const FALLBACK_UPGRADE_URL = 'https://sentinel.london/upgrade';
const CONTACT_SALES_EMAIL = 'hello@sentinel.dev';

interface UpgradeModalProps {
  state: UpgradeModalState;
  onClose: () => void;
}

function getUpgradeUrl(url: string | undefined): string {
  if (!url) return FALLBACK_UPGRADE_URL;
  try {
    new URL(url);
    return url;
  } catch {
    return FALLBACK_UPGRADE_URL;
  }
}

function ProgressBar({ current, max }: { current: number; max: number }) {
  const percentage = Math.min((current / max) * 100, 100);
  const isAtLimit = current >= max;

  return (
    <div className="mt-3 space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {current} / {max} used
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            isAtLimit ? 'bg-destructive' : 'bg-primary',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function UpgradeModal({ state, onClose }: UpgradeModalProps) {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const upgradeUrl = getUpgradeUrl(state.upgradeUrl);
  const isLimitTrigger = state.triggerType === 'limit';
  const isAtLimit =
    isLimitTrigger &&
    state.currentUsage !== undefined &&
    state.limit !== undefined &&
    state.currentUsage >= state.limit;

  const handleUpgrade = useCallback(() => {
    window.open(upgradeUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }, [upgradeUrl, onClose]);

  const handleContactSales = useCallback(() => {
    const subject = encodeURIComponent(`Enterprise inquiry - ${state.featureDisplayName}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in learning more about Sentinel Enterprise features, specifically ${state.featureDisplayName}.\n\nCurrent plan: ${state.currentTier}\n\nPlease contact me with more information.\n\nThank you`,
    );
    window.open(`mailto:${CONTACT_SALES_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  }, [state.featureDisplayName, state.currentTier]);

  useEffect(() => {
    if (!state.isOpen) return;

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUpgrade();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, handleUpgrade]);

  const titleText = isLimitTrigger ? 'Limit Reached' : 'Upgrade Required';
  const Icon = isLimitTrigger ? AlertTriangle : Sparkles;

  return (
    <Dialog open={state.isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div
            className={cn(
              'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full',
              isLimitTrigger ? 'bg-destructive/10' : 'bg-primary/10',
            )}
          >
            <Icon
              className={cn('h-6 w-6', isLimitTrigger ? 'text-destructive' : 'text-primary')}
            />
          </div>
          <DialogTitle className="text-center">{titleText}</DialogTitle>
          <DialogDescription className="text-center">
            {isLimitTrigger && state.resourceType ? (
              <>
                You've reached your{' '}
                <span className="font-medium">{state.resourceType}</span> limit on the{' '}
                <span className="font-medium capitalize">{state.currentTier}</span> plan.
              </>
            ) : (
              <>
                <span className="font-medium">{state.featureDisplayName}</span> is not available on
                your <span className="font-medium capitalize">{state.currentTier}</span> plan.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {isLimitTrigger && state.currentUsage !== undefined && state.limit !== undefined && (
          <ProgressBar current={state.currentUsage} max={state.limit} />
        )}

        <div className="py-2">
          <p className="text-center text-sm text-muted-foreground">
            {isAtLimit
              ? 'Upgrade your plan to add more resources.'
              : 'Upgrade your plan to unlock this feature and more.'}
          </p>
        </div>

        <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="mx-auto flex w-full items-center justify-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isComparisonOpen && 'rotate-180',
                )}
              />
              {isComparisonOpen ? 'Hide plan comparison' : 'Compare plans'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <TierComparisonTable currentTier={state.currentTier} highlightTier="standard" />
          </CollapsibleContent>
        </Collapsible>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleUpgrade} className="w-full">
            View Upgrade Options
          </Button>
          <Button
            variant="outline"
            onClick={handleContactSales}
            className="w-full gap-2"
          >
            <Mail className="h-4 w-4" />
            Contact Sales
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
