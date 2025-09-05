interface PromptInput {
  ingredients: string[];
  usePantry?: boolean;
  allowExtras: boolean;
  pantry?: string[]
}

export type {PromptInput}