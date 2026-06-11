/**
 * 累計故事折線圖 - 分開展示
 * 展示 2019-2026 Miko、Suisei 和共同故事的累計趨勢（分開三個圖表）
 */

import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MICOMET_TIMELINE } from '@/data/miCometTimeline';
import { generateMonthlyCumulativeStats, getStatsInRange, MonthlyCumulativeStats } from '@/utils/storyAggregator';

export function CumulativeStoryChart() {
  const [timeRange, setTimeRange] = useState<'all' | '5y' | '3y' | '1y'>('all');

  // 生成數據
  const chartData = useMemo(() => {
    const result = generateMonthlyCumulativeStats(MICOMET_TIMELINE);
    const stats = result.monthlyStats;

    // 根據時間範圍篩選
    let filtered = stats;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (timeRange === '1y') {
      filtered = getStatsInRange(stats, currentYear - 1, currentYear);
    } else if (timeRange === '3y') {
      filtered = getStatsInRange(stats, currentYear - 3, currentYear);
    } else if (timeRange === '5y') {
      filtered = getStatsInRange(stats, currentYear - 5, currentYear);
    }

    return filtered;
  }, [timeRange]);

  // 統計摘要
  const summary = useMemo(() => {
    if (chartData.length === 0) return null;
    const latest = chartData[chartData.length - 1];
    return latest;
  }, [chartData]);

  return (
    <div className="w-full space-y-4">
      {/* 時間範圍選擇器 */}
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="選擇時間範圍" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部時間</SelectItem>
            <SelectItem value="5y">最近 5 年</SelectItem>
            <SelectItem value="3y">最近 3 年</SelectItem>
            <SelectItem value="1y">最近 1 年</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 摘要統計 */}
      {summary && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-pink-50 p-4">
            <p className="text-sm text-gray-600">Miko 累計</p>
            <p className="text-2xl font-bold text-pink-600">{summary.miko_cumulative}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-600">Suisei 累計</p>
            <p className="text-2xl font-bold text-blue-600">{summary.suisei_cumulative}</p>
          </div>
          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-sm text-gray-600">共同故事</p>
            <p className="text-2xl font-bold text-yellow-600">{summary.shared_cumulative}</p>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-gray-600">總計</p>
            <p className="text-2xl font-bold text-green-600">{summary.total_cumulative}</p>
          </div>
        </div>
      )}

      {/* Miko 累計故事折線圖 */}
      <Card>
        <CardHeader>
          <CardTitle>Miko 累計故事</CardTitle>
          <CardDescription>包含 Miko 個人故事 + 共同故事</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                  interval={Math.max(0, Math.floor(chartData.length / 12))}
                />
                <YAxis label={{ value: '累計數量', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return value.toFixed(0);
                    }
                    return value;
                  }}
                  labelFormatter={(label) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="miko_cumulative"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  name="Miko 累計"
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Suisei 累計故事折線圖 */}
      <Card>
        <CardHeader>
          <CardTitle>Suisei 累計故事</CardTitle>
          <CardDescription>包含 Suisei 個人故事 + 共同故事</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                  interval={Math.max(0, Math.floor(chartData.length / 12))}
                />
                <YAxis label={{ value: '累計數量', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return value.toFixed(0);
                    }
                    return value;
                  }}
                  labelFormatter={(label) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="suisei_cumulative"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={false}
                  name="Suisei 累計"
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 共同故事累計折線圖 */}
      <Card>
        <CardHeader>
          <CardTitle>共同故事累計</CardTitle>
          <CardDescription>同時屬於 Miko 與 Suisei 的故事</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                  interval={Math.max(0, Math.floor(chartData.length / 12))}
                />
                <YAxis label={{ value: '累計數量', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return value.toFixed(0);
                    }
                    return value;
                  }}
                  labelFormatter={(label) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="shared_cumulative"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={false}
                  name="共同故事累計"
                  isAnimationActive={true}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 數據表格預覽 */}
      <Card>
        <CardHeader>
          <CardTitle>數據詳細表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">月份</th>
                  <th className="px-4 py-2 text-right">Miko</th>
                  <th className="px-4 py-2 text-right">Suisei</th>
                  <th className="px-4 py-2 text-right">共同</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2 text-right font-semibold text-pink-600">{row.miko_cumulative}</td>
                    <td className="px-4 py-2 text-right font-semibold text-blue-600">{row.suisei_cumulative}</td>
                    <td className="px-4 py-2 text-right font-semibold text-yellow-600">{row.shared_cumulative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 說明文字 */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
            <p className="font-semibold">📊 說明：</p>
            <ul className="mt-2 list-inside space-y-1">
              <li>✨ <strong>Miko 累計</strong>：包含 Miko 個人故事 + 共同故事</li>
              <li>✨ <strong>Suisei 累計</strong>：包含 Suisei 個人故事 + 共同故事</li>
              <li>✨ <strong>共同故事累計</strong>：同時屬於兩人的故事</li>
              <li>✨ <strong>總計</strong>：不重複計算的總故事數</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
