import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MICOMET_TIMELINE, type MiCometStory } from '@/data/miCometTimelineAll';

type Side = 'miko' | 'suisei' | 'shared' | 'others';
type ChartMode = 'year' | 'month';
