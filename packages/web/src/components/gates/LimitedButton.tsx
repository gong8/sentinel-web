/**
 * LimitedButton Component
 *
 * Button that checks license limits before enabling.
 * Shows upgrade modal with progress bar when limits are reached and user clicks.
 */

import * as React from 'react';

import { useUpgradeModal } from '../../contexts/UpgradeModalContext';
import { useLicense } from '../../hooks/useLicense';
import { Button, type ButtonProps } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface LimitedButtonProps extends ButtonProps {
  /** Type of limit to check */
  limitType: 'users' | 'servers';
}

const LIMIT_DISPLAY_NAMES: Record<string, string> = {
  users: 'Users',
  servers: 'MCP Servers',
};

const LIMIT_RESOURCE_TYPES: Record<string, string> = {
  users: 'team member',
  servers: 'MCP server',
};

export const LimitedButton = React.forwardRef<HTMLButtonElement, LimitedButtonProps>(
  ({ limitType, children, disabled, onClick, ...props }, ref) => {
    const { canAddUser, canAddServer, limits, tier, upgradeUrl } = useLicense();
    const { showUpgradeModal } = useUpgradeModal();

    const canAdd = limitType === 'users' ? canAddUser() : canAddServer();
    const current = limitType === 'users' ? limits?.currentUsers : limits?.currentServers;
    const max = limitType === 'users' ? limits?.seatCount : limits?.maxMcpServers;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!canAdd) {
        e.preventDefault();
        showUpgradeModal({
          triggerType: 'limit',
          feature: limitType,
          featureDisplayName: LIMIT_DISPLAY_NAMES[limitType] ?? limitType,
          currentTier: tier,
          upgradeUrl,
          resourceType: LIMIT_RESOURCE_TYPES[limitType],
          currentUsage: current,
          limit: max,
        });
        return;
      }
      onClick?.(e);
    };

    if (!canAdd) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button ref={ref} {...props} variant="outline" onClick={handleClick}>
                {children}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {LIMIT_RESOURCE_TYPES[limitType]?.charAt(0).toUpperCase()}
                {LIMIT_RESOURCE_TYPES[limitType]?.slice(1)} limit reached ({current}/{max}). Click
                to upgrade.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button ref={ref} disabled={disabled} onClick={onClick} {...props}>
        {children}
      </Button>
    );
  },
);

LimitedButton.displayName = 'LimitedButton';
