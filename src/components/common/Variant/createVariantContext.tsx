'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { FC, ReactNode } from 'react';

import type { VariantContextValue } from './types';

/**
 * configuration accepted by `createVariantContext`
 */
interface CreateVariantContextConfig<TId extends string> {
  storageKey: string;
  defaultId: TId;
  validIds: readonly TId[];
  displayName?: string;
}

/**
 * factory result: a provider component plus a typed consumer hook
 */
type CreateVariantContextResult<TId extends string> = Readonly<Record<'Provider', FC<{ children: ReactNode }>>> & {
  readonly useVariant: () => VariantContextValue<TId>;
};

/**
 * dev-only registry of registered storage keys to catch duplicate registrations
 */
const REGISTERED_STORAGE_KEYS = new Set<string>();

/**
 * narrow an unknown string to the variant union when it is present in `validIds`
 * @param value candidate value from storage
 * @param validIds tuple of accepted ids
 * @returns true when `value` is a member of `validIds`
 */
function isValidId<TId extends string>(
  value: string | null,
  validIds: readonly TId[],
): value is TId {
  return value !== null && (validIds as readonly string[]).includes(value);
}

/**
 * create a typed React context + provider + hook trio for a string-id variant
 * @param config provider configuration
 * @param config.storageKey localStorage key used to persist the active variant
 * @param config.defaultId variant id used during ssr and the first client render
 * @param config.validIds tuple of all accepted variant ids
 * @param config.displayName optional context display name for devtools
 * @returns provider component and consumer hook bound to the same context
 */
export function createVariantContext<TId extends string>(
  config: CreateVariantContextConfig<TId>,
): CreateVariantContextResult<TId> {
  const { storageKey, defaultId, validIds, displayName } = config;

  if (process.env.NODE_ENV !== 'production') {
    if (REGISTERED_STORAGE_KEYS.has(storageKey)) {
      throw new Error(
        `createVariantContext: storage key "${storageKey}" was registered twice. Each variant context must use a unique storage key.`,
      );
    }
    REGISTERED_STORAGE_KEYS.add(storageKey);
  }

  const VariantContext = createContext<VariantContextValue<TId> | null>(null);

  if (displayName !== undefined) {
    VariantContext.displayName = displayName;
  }

  /**
   * provider that hydrates from localStorage on mount and persists future writes
   * @param props provider props
   * @param props.children child react tree
   * @returns context provider element
   */
  const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [variant, setVariantState] = useState<TId>(defaultId);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (isValidId(stored, validIds)) {
          setVariantState(stored);
        }
      } catch {
        // ignore private-mode or disabled storage
      }
      setIsHydrated(true);
    }, []);

    const setVariant = useCallback((id: TId) => {
      setVariantState(id);
      try {
        window.localStorage.setItem(storageKey, id);
      } catch {
        // ignore QuotaExceededError / private-mode / disabled storage
      }
    }, []);

    const value = useMemo<VariantContextValue<TId>>(
      () => ({ variant, setVariant, isHydrated }),
      [variant, setVariant, isHydrated],
    );

    return (
      <VariantContext.Provider value={value}>
        {children}
      </VariantContext.Provider>
    );
  };

  /**
   * consume the variant context; throws if used outside its matching provider
   * @returns current variant value, setter, and hydration flag
   */
  function useVariant(): VariantContextValue<TId> {
    const ctx = useContext(VariantContext);
    if (!ctx) {
      const providerName = displayName ?? `VariantContext("${storageKey}")`;
      throw new Error(
        `useVariant for ${providerName} must be used within its matching Provider.`,
      );
    }

    return ctx;
  }

  return { Provider, useVariant };
}
