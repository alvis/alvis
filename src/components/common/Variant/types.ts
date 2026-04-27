/**
 * metadata describing one variant entry for selector UIs
 */
export interface VariantMeta<TId extends string> {
  readonly id: TId;
  readonly label: string;
  readonly badge: string | number;
}

/**
 * value exposed by a variant context: current id, setter, and hydration flag
 */
export interface VariantContextValue<TId extends string> {
  variant: TId;
  setVariant: (id: TId) => void;
  isHydrated: boolean;
}
