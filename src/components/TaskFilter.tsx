'use client'

import useTaskStore, { FilterType } from '@/store/useTaskStore'

const filterOptions: { label: string; value: FilterType }[] = [
	{ label: 'Все', value: 'all' },
	{ label: 'Активные', value: 'active' },
	{ label: 'Завершённые', value: 'completed' },
]

export default function TaskFilter() {
	const { lists, activeListId, setFilter } = useTaskStore()

	const activeList = lists.find((list) => list.id === activeListId)
	if (!activeList) return null

	return (
		<div>
			{filterOptions.map((option) => (
				<button
					key={option.value}
					onClick={() => setFilter(option.value)}
					style={{
						fontWeight: activeList.filter === option.value ? 'bold' : 'normal',
					}}
				>
					{option.label}
				</button>
			))}
		</div>
	)
}
