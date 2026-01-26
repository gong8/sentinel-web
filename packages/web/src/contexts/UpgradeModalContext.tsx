import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { UpgradeModal } from '../components/UpgradeModal';

export type UpgradeTriggerType = 'feature' | 'limit';

export interface UpgradeModalState {
  isOpen: boolean;
  triggerType: UpgradeTriggerType;
  feature: string;
  featureDisplayName: string;
  currentTier: string;
  upgradeUrl: string;
  // For limit triggers:
  resourceType?: string;
  currentUsage?: number;
  limit?: number;
}

export type ShowUpgradeModalOptions = Omit<UpgradeModalState, 'isOpen'>;

interface UpgradeModalContextValue {
  showUpgradeModal: (options: ShowUpgradeModalOptions) => void;
  hideUpgradeModal: () => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextValue | null>(null);

// Global ref for access from QueryClient error handlers
let globalShowUpgradeModal: ((options: ShowUpgradeModalOptions) => void) | null = null;

export function getGlobalShowUpgradeModal() {
  return globalShowUpgradeModal;
}

export function UpgradeModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UpgradeModalState | null>(null);

  const showUpgradeModal = useCallback((options: ShowUpgradeModalOptions) => {
    setState({ ...options, isOpen: true });
  }, []);

  const hideUpgradeModal = useCallback(() => {
    setState(null);
  }, []);

  useEffect(() => {
    globalShowUpgradeModal = showUpgradeModal;
    return () => {
      globalShowUpgradeModal = null;
    };
  }, [showUpgradeModal]);

  return (
    <UpgradeModalContext.Provider value={{ showUpgradeModal, hideUpgradeModal }}>
      {children}
      {state && <UpgradeModal state={state} onClose={hideUpgradeModal} />}
    </UpgradeModalContext.Provider>
  );
}

export function useUpgradeModal() {
  const context = useContext(UpgradeModalContext);
  if (!context) throw new Error('useUpgradeModal must be used within UpgradeModalProvider');
  return context;
}
