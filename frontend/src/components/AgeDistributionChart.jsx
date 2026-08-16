import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { API_BASE } from '../lib/api'

// Ordinal ramp: one hue (wine), monotone lightness steps light→dark — per the
// dataviz skill, age brackets are *ordinal* (swapping their order would change the
// meaning), not nominal categories, so they get a single-hue ramp rather than
// distinct categorical hues. Validated with scripts/validate_palette.js
// (--ordinal, surface #FFFBF9): lightness monotone, adjacent steps >= 0.06 apart,
// light end clears the 2:1 contrast floor. Every step is wine (#8E4459) blended
// over the surface color — no new hex invented, per the palette lock in PLANNING.md.
const AGE_RAMP = ['#caa3aa', '#ba8994', '#ab7381', '#9d5c6e', '#8e4459']

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { bracket, count } = payload[0].payload
  return (
    <div className="rounded-md border border-wine/15 bg-surface px-3 py-2 text-sm shadow-sm">
      <p className="font-semibold text-ink">{bracket}</p>
      <p className="text-ink/70">{count} diagnosed cases</p>
    </div>
  )
}

export default function AgeDistributionChart() {
  const [state, setState] = useState({ status: 'loading', data: [] })

  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/api/stats/age-distribution`)
      .then((res) => {
        if (!res.ok) throw new Error(`request failed: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', data: [] })
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') {
    return <p className="text-sm text-ink/70">Loading chart…</p>
  }
  if (state.status === 'error') {
    return (
      <p className="text-sm text-ink/70">
        Couldn&rsquo;t load the age-distribution chart right now.
      </p>
    )
  }

  return (
    <div>
      <div
        role="img"
        aria-label="Bar chart of PCOS diagnosis counts by age bracket, ordered youngest to oldest"
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={state.data} barCategoryGap="24%">
            <CartesianGrid vertical={false} stroke="rgba(59,36,48,0.08)" />
            <XAxis
              dataKey="bracket"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3B2430', opacity: 0.6, fontSize: 13 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3B2430', opacity: 0.6, fontSize: 13 }}
              width={32}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(142,68,89,0.06)' }} />
            <Bar dataKey="count" barSize={24} radius={[4, 4, 0, 0]}>
              {state.data.map((entry, index) => (
                <Cell key={entry.bracket} fill={AGE_RAMP[index % AGE_RAMP.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distinct, lower-authority caption — deliberately separate in tone from the
          cited WHO/epidemiological stats used elsewhere on the site (see
          PLANNING.md's "content that must NOT be invented" list, item 1). This
          dataset is an open/synthetic practice dataset, not verified clinical
          records, and its percentages shouldn't read with the same weight. */}
      <p className="mt-3 text-xs italic text-ink/70">
        Based on an open PCOS dataset (synthetic/practice data, not verified patient
        records):{' '}
        <a
          href="https://www.kaggle.com/datasets/samikshadalvi/pcos-diagnosis-dataset"
          target="_blank"
          rel="noopener noreferrer"
          className="not-italic underline decoration-ink/20 underline-offset-2 hover:text-wine"
        >
          Kaggle: PCOS Diagnosis Dataset
        </a>
        . Shown for illustration, not as an epidemiological claim.
      </p>
    </div>
  )
}
