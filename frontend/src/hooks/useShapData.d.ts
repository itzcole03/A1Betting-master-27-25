import { ShapValue } from '@/types/explainability.ts';
interface ShapDataHookResult {
    features: ShapValue[];
    loading: boolean;
    error: string | null;
}
interface ShapDataHookParams {
    eventId: string;
    modelType?: string;
}
export declare function useShapData({ eventId, modelType, }: ShapDataHookParams): ShapDataHookResult;
export {};
