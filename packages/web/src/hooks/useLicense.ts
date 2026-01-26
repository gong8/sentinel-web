/**
 * License Hook
 *
 * Provides license tier information and feature gating helpers.
 * Used to proactively hide/disable UI features based on license.
 */

import { trpc } from '../lib/trpc';

type Tier = 'free' | 'standard' | 'enterprise';

const DEFAULT_UPGRADE_URL = 'https://sentinel.london/upgrade';
const DEFAULT_CUSTOMER_PORTAL_URL = 'https://billing.stripe.com/p/login/sentinel';

export function useLicense() {
  const { data, isLoading, error } = trpc.admin.license.getStatus.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false,
  });

  const tier = (data?.tier ?? 'free') as Tier;

  const isAtLeast = (requiredTier: Tier): boolean => {
    const tiers: Tier[] = ['free', 'standard', 'enterprise'];
    const currentIndex = tiers.indexOf(tier);
    const requiredIndex = tiers.indexOf(requiredTier);
    return currentIndex >= requiredIndex;
  };

  const hasFeature = (feature: string): boolean => {
    return data?.features.includes(feature) ?? false;
  };

  // Tier checks
  const isFree = tier === 'free';
  const isTeamPlus = isAtLeast('standard');
  const isEnterprise = tier === 'enterprise';

  return {
    isLoading,
    error,
    tier,
    features: data?.features ?? [],
    limits: data?.limits,
    settings: data?.settings,
    upgradeUrl: data?.upgradeUrl ?? DEFAULT_UPGRADE_URL,
    customerPortalUrl:
      (data as { customerPortalUrl?: string } | undefined)?.customerPortalUrl ??
      DEFAULT_CUSTOMER_PORTAL_URL,

    // Tier checks
    isAtLeast,
    hasFeature,
    isFree,
    isTeamPlus,
    isEnterprise,

    // Navigation feature availability
    canAccessPublishers: isTeamPlus,
    canAccessRequests: isTeamPlus,
    canAccessSessions: isTeamPlus,
    canAccessAgents: isTeamPlus,
    canAccessWebhooks: isTeamPlus,
    canAccessMcpConfirmations: isEnterprise && (data?.settings?.adminMcpEnabled ?? false),
    canAccessSentinelAgent: isEnterprise,
    canAccessAdminMcp: isEnterprise,
    canAccessGlobalVariables: isEnterprise,

    // Policy page features
    canTestPolicies: isTeamPlus,
    canViewConflicts: isTeamPlus,
    canViewAssertions: isTeamPlus,

    // Tools page features
    canViewToolFlags: isTeamPlus,

    // Limit checks
    canAddUser: () => (data?.limits?.currentUsers ?? 0) < (data?.limits?.seatCount ?? 0),
    canAddServer: () => (data?.limits?.currentServers ?? 0) < (data?.limits?.maxMcpServers ?? 0),
  };
}

export type UseLicenseReturn = ReturnType<typeof useLicense>;
