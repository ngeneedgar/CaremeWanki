'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { DollarSign, Calendar, Home, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface MarketMetric {
  id: string;
  label: string;
  icon: typeof DollarSign;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  note: string;
}

const MARKET_METRICS: MarketMetric[] = [
  {
    id: 'median-price',
    label: 'MEDIAN SALE PRICE',
    icon: DollarSign,
    value: '$625K',
    trend: '+4.2%',
    trendDirection: 'up',
    note: 'vs last year',
  },
  {
    id: 'days-on-market',
    label: 'AVG DAYS ON MARKET',
    icon: Calendar,
    value: '18 days',
    trend: '-12%',
    trendDirection: 'down',
    note: 'vs last year',
  },
  {
    id: 'homes-sold',
    label: 'HOMES SOLD THIS MONTH',
    icon: Home,
    value: '1,240',
    trend: '+8.5%',
    trendDirection: 'up',
    note: 'vs last year',
  },
  {
    id: 'yoy-growth',
    label: 'YEAR-OVER-YEAR GROWTH',
    icon: TrendingUp,
    value: '+4.2%',
    trend: '+1.1%',
    trendDirection: 'up',
    note: 'vs last year',
  },
];

export default function MarketInsights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#18181A] text-soft-white w-full">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header Block matching Screenshot: MARKET PULSE / DMV */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-3">
            MARKET PULSE
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl text-soft-white font-normal tracking-tight mb-3">
            DMV
          </h2>
          <p className="text-sm sm:text-base text-stone-gray max-w-xl mx-auto leading-relaxed">
            Real-time market insights to help you make confident decisions.
          </p>
        </div>

        {/* 4 Metrics Grid matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MARKET_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const isPositive = metric.trendDirection === 'up';
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-7 bg-[#242426] border border-[#2E2E30] rounded-[2px] hover:border-[#F3DFA2]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Label + Icon */}
                  <div className="flex items-center gap-2 mb-4 text-[#8A8A8E]">
                    <Icon className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.75} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                      {metric.label}
                    </span>
                  </div>

                  {/* Main Value */}
                  <div className="font-serif text-3xl sm:text-4xl text-[#EDEDED] mb-4 tracking-tight">
                    {metric.value}
                  </div>
                </div>

                {/* Trend Note with green / rose accents matching screenshot */}
                <div className="pt-4 border-t border-[#2E2E30]/70 flex items-center justify-between text-xs">
                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {metric.trend}
                  </span>
                  <span className="text-[11px] text-[#8A8A8E]">
                    {metric.note}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Block matching Screenshot */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F3DFA2] text-[#1C1C1E] font-semibold text-xs uppercase tracking-wider rounded-[2px] hover:bg-[#E4C878] transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(243,223,162,0.25)]"
          >
            <span>SEE WHAT YOUR HOME IS WORTH</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-[#8A8A8E]">
            Data reflects current Northern Virginia market trends
          </span>
        </div>
      </div>
    </section>
  );
}
