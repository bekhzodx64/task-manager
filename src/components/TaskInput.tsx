'use client'

import useTaskStore from '@/store/useTaskStore'
import { useState } from 'react'

export default function TaskInput() {
	const [newTask, setNewTask] = useState<string>('')
	const { addTask } = useTaskStore()

	const handleAddTask = () => {
		if (newTask.trim()) {
			addTask(newTask)
			setNewTask('')
		}
	}

	return (
		<div>
			<input
				type='text'
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder='Новая задача'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleAddTask()
					}
				}}
			/>
			<button
				type='button'
				onClick={handleAddTask}
			>
				Добавить
			</button>
		</div>
	)
}
