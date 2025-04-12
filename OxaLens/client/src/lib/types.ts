export type OxalateLevel = 'low' | 'medium' | 'high';

export interface Food {
  id: number;
  name: string;
  category: string;
  oxalateContent: number;
  oxalateLevel: OxalateLevel;
  servingSize: string;
  alternativeTip: string;
  description: string;
}

export type FilterOption = 'all' | OxalateLevel;
