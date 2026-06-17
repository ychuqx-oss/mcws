/**
 * 故事統計聚合工具
 * 按年月統計累計故事數，共同故事計入 Miko 與 Suisei
 */

import { MiCometStory } from '@/data/miCometTimeline';

export interface MonthlyCumulativeStats {
  yearMonth: string; // "2019-07"
  month: string; // "Jul 2019"
  year: number;
  month_num: number;
  miko_cumulative: number;
  suisei_cumulative: number;
  shared_cumulative: number;
  total_cumulative: number;
}

export interface AggregationResult {
  monthlyStats: MonthlyCumulativeStats[];
  yearlySummary: Record<number, { miko: number; suisei: number; shared: number; total: number }>;
}

/**
 * 將故事按年月分組
 */
function groupStoriesByMonth(stories: MiCometStory[]): Map<string, MiCometStory[]> {
  const grouped = new Map<string, MiCometStory[]>();

  stories.forEach((story) => {
    const [year, month] = story.date.split('-').slice(0, 2);
    const yearMonth = `${year}-${month}`;

    if (!grouped.has(yearMonth)) {
      grouped.set(yearMonth, []);
    }
    grouped.get(yearMonth)!.push(story);
  });

  return grouped;
}

/**
 * 生成月度統計（包括累計）
 */
export function generateMonthlyCumulativeStats(stories: MiCometStory[]): AggregationResult {
  // 按日期排序
  const sorted = [...stories].sort((a, b) => a.date.localeCompare(b.date));

  // 按月份分組
  const grouped = groupStoriesByMonth(sorted);

  // 所有月份有序列表
  const allMonths = Array.from(grouped.keys()).sort();

  const monthlyStats: MonthlyCumulativeStats[] = [];
  let mikoTotal = 0;
  let suiseiTotal = 0;
  let sharedTotal = 0;

  allMonths.forEach((yearMonth) => {
    const storiesInMonth = grouped.get(yearMonth) || [];
    const [yearStr, monthStr] = yearMonth.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // 統計這個月新增的故事
    let mikoCount = 0;
    let suiseiCount = 0;
    let sharedCount = 0;

    storiesInMonth.forEach((story) => {
      if (story.side === 'miko') {
        mikoCount++;
      } else if (story.side === 'suisei') {
        suiseiCount++;
      } else if (story.side === 'shared') {
        sharedCount++;
        // 共同故事計入両方
        mikoTotal++;
        suiseiTotal++;
      }
    });

    // 累計
    mikoTotal += mikoCount;
    suiseiTotal += suiseiCount;
    sharedTotal += sharedCount;

    const monthNames = [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthNames[month] || '';

    monthlyStats.push({
      yearMonth,
      month: `${monthName} ${year}`,
      year,
      month_num: month,
      miko_cumulative: mikoTotal,
      suisei_cumulative: suiseiTotal,
      shared_cumulative: sharedTotal,
      total_cumulative: mikoTotal + suiseiTotal - sharedTotal, // 避免重複計算
    });
  });

  // 年度摘要
  const yearlySummary: Record<
    number,
    { miko: number; suisei: number; shared: number; total: number }
  > = {};

  monthlyStats.forEach((stat) => {
    if (!yearlySummary[stat.year]) {
      yearlySummary[stat.year] = { miko: 0, suisei: 0, shared: 0, total: 0 };
    }
    // 只計算每年的最後月份（累計至該年年底）
  });

  // 填入年度數據
  monthlyStats.forEach((stat) => {
    yearlySummary[stat.year] = {
      miko: stat.miko_cumulative,
      suisei: stat.suisei_cumulative,
      shared: stat.shared_cumulative,
      total: stat.total_cumulative,
    };
  });

  return {
    monthlyStats,
    yearlySummary,
  };
}

/**
 * 獲取指定時間範圍的數據
 */
export function getStatsInRange(
  stats: MonthlyCumulativeStats[],
  startYear: number,
  endYear: number,
): MonthlyCumulativeStats[] {
  return stats.filter((stat) => stat.year >= startYear && stat.year <= endYear);
}
