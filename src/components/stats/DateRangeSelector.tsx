import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type RangePreset = '7' | '30' | '90' | 'custom'

interface DateRangeSelectorProps {
  preset: RangePreset
  onPresetChange: (value: RangePreset) => void
  customFrom: string
  customTo: string
  onCustomFromChange: (value: string) => void
  onCustomToChange: (value: string) => void
}

export function DateRangeSelector({
  preset,
  onPresetChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: DateRangeSelectorProps) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <Select
        value={preset}
        onValueChange={(v) => onPresetChange(v as RangePreset)}
      >
        <SelectTrigger className="w-36" aria-label="Date range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="90">Last 90 days</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {preset === 'custom' && (
        <div className="flex items-end gap-2">
          <div className="grid gap-1">
            <Label htmlFor="range-from" className="text-xs">
              From
            </Label>
            <Input
              id="range-from"
              type="date"
              value={customFrom}
              max={customTo || undefined}
              onChange={(e) => onCustomFromChange(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="range-to" className="text-xs">
              To
            </Label>
            <Input
              id="range-to"
              type="date"
              value={customTo}
              min={customFrom || undefined}
              onChange={(e) => onCustomToChange(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
      )}
    </div>
  )
}
