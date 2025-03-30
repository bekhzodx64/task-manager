'use client'

import useTaskStore from '@/store/useTaskStore'
import { Task } from '@/types/task'
import { useState } from 'react'

type Props = {
	task: Task
}

export default function TaskItem({ task }: Props) {
	const { toggleTask, deleteTask, editTask } = useTaskStore()
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(task.title)

	const handleEdit = () => {
		if (newTitle.trim()) {
			editTask(task.id, newTitle)
			setIsEditing(false)
		}
	}

	return (
		<li>
			{isEditing ? (
				<input
					type='text'
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					onBlur={handleEdit}
					onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
					autoFocus
				/>
			) : (
				<span onClick={() => toggleTask(task.id)}>
					{task.completed ? <s>{task.title}</s> : task.title}
				</span>
			)}
			<button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Сохранить' : '✏️'}
			</button>
			<button onClick={() => deleteTask(task.id)}>❌</button>
		</li>
	)
}
