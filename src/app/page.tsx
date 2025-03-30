'use client'

import ListSelector from '@/components/ListSelector'
import TaskFilter from '@/components/TaskFilter'
import TaskInput from '@/components/TaskInput'
import TaskList from '@/components/TaskList'

export default function Home() {
	return (
		<div>
			<h1>Task Manager</h1>
			<TaskInput />
			<TaskFilter />
			<TaskList />
			<ListSelector />
		</div>
	)
}
