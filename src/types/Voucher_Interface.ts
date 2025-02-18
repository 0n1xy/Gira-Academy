export interface IVoucher {
  code: string;
  discount: number;
  type: "global" | "product" | "category";
  productIds?: string[];
  categoryIds?: string[];
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
  recipientGroup:
    | "new_users"
    | "loyal_customers"
    | "high_spenders"
    | "potential";
}
