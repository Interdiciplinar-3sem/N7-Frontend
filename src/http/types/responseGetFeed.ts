import type { ResponseGetSummaryType } from "./responseGetSummary";

export type ResponseGetFeedType = {
    data: ResponseGetSummaryType[],
    page: number,
    size: number,
    total: number,
}