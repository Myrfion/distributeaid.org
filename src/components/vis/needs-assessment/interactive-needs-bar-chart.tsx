import { FC, useState } from 'react'
import Select from 'react-select'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { NeedsBarChart } from './needs-bar-chart'

type Props = {
  needs: Need[]
}

const getCategories = (needs: Need[]): string[] => {
  const categories: Set<string> = new Set()

  for (const need of needs) {
    categories.add(need.product.category)
  }

  return Array.from(categories).sort()
}

const getRegions = (needs: Need[]): string[] => {
  const regions: Set<string> = new Set()

  for (const need of needs) {
    regions.add(need.place.region?.name || 'Other')
  }

  return Array.from(regions).sort()
}

const buildSelectOptions = (values: string[]) => {
  return values.map((value) => {
    return {
      value: value,
      label: value,
    }
  })
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const regionOptions = buildSelectOptions(getRegions(needs))
  const [region, setRegion] = useState<string | null>(null)

  const categoryOptions = buildSelectOptions(getCategories(needs))
  const [category, setCategory] = useState<string | null>(null)

  return (
    <div>
      <form
        className="w-min flex"
        style={{
          marginLeft: `${nivoProps.bar.horizontal.margin.left}px`,
        }}
      >
        <div className="flex items-center pr-5">
          <label className="pr-2">Region:</label>
          <Select
            className="w-64"
            options={regionOptions}
            defaultValue={null}
            onChange={(option, actionMeta) => {
              setRegion(option?.value || null)
            }}
            isClearable={true}
          />
        </div>
        <div className="flex items-center pr-5">
          <label className="pr-2">Category:</label>
          <Select
            className="w-64"
            options={categoryOptions}
            defaultValue={null}
            onChange={(option, actionMeta) => {
              setCategory(option?.value || null)
            }}
            isClearable={true}
          />
        </div>
      </form>

      <NeedsBarChart
        needs={needs}
        options={{
          filters: {
            region: region || undefined,
            category: category || undefined,
          },
        }}
      />
    </div>
  )
}

export default InteractiveNeedsBarChart
