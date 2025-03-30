'use client'

import useTaskStore from '@/store/useTaskStore'
import TaskItem from './TaskItem'

export default function TaskList() {
	const { lists, activeListId } = useTaskStore()

	const activeList = lists.find((list) => list.id === activeListId)
	if (!activeList) return <p>Выберите список задач</p>

	const filteredTasks = activeList.tasks.filter((task) => {
		if (activeList.filter === 'active') return !task.completed
		if (activeList.filter === 'completed') return task.completed
		return true
	})

	return (
		<div>
			<h2>{activeList.name}</h2>
			{filteredTasks.length > 0 ? (
				<ul>
					{filteredTasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
						/>
					))}
				</ul>
			) : (
				<p>Нет задач</p>
			)}
		</div>
	)
}
