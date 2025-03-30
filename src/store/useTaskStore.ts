'use client'

import toast from 'react-hot-toast'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Task = {
	id: number
	title: string
	completed: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TaskList = {
	id: number
	name: string
	tasks: Task[]
	filter: FilterType // Теперь фильтр хранится внутри списка
}

type TaskStore = {
	lists: TaskList[]
	activeListId: number | null
	addList: (name: string) => void
	deleteList: (id: number) => void
	setActiveList: (id: number) => void
	addTask: (title: string) => void
	toggleTask: (id: number) => void
	deleteTask: (id: number) => void
	editTask: (id: number, newTitle: string) => void
	setFilter: (filter: FilterType) => void
}

const useTaskStore = create<TaskStore>()(
	persist(
		(set, get) => ({
			lists: [],
			activeListId: null,

			addList: (name) =>
				set((state) => {
					const newList: TaskList = {
						id: Date.now(),
						name,
						tasks: [],
						filter: 'all',
					}
					toast.success(`Список "${name}" создан 📂`)
					return { lists: [...state.lists, newList], activeListId: newList.id }
				}),

			deleteList: (id) =>
				set((state) => {
					toast.error('Список удалён ❌')
					const updatedLists = state.lists.filter((list) => list.id !== id)
					return {
						lists: updatedLists,
						activeListId: updatedLists.length > 0 ? updatedLists[0].id : null,
					}
				}),

			setActiveList: (id) => set({ activeListId: id }),

			addTask: (title) =>
				set((state) => {
					if (!state.activeListId) return state
					return {
						lists: state.lists.map((list) =>
							list.id === state.activeListId
								? {
										...list,
										tasks: [
											...list.tasks,
											{ id: Date.now(), title, completed: false },
										],
								  }
								: list
						),
					}
				}),

			toggleTask: (id) =>
				set((state) => ({
					lists: state.lists.map((list) =>
						list.id === state.activeListId
							? {
									...list,
									tasks: list.tasks.map((task) =>
										task.id === id
											? { ...task, completed: !task.completed }
											: task
									),
							  }
							: list
					),
				})),

			deleteTask: (id) =>
				set((state) => ({
					lists: state.lists.map((list) =>
						list.id === state.activeListId
							? { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
							: list
					),
				})),

			editTask: (id, newTitle) =>
				set((state) => ({
					lists: state.lists.map((list) =>
						list.id === state.activeListId
							? {
									...list,
									tasks: list.tasks.map((task) =>
										task.id === id ? { ...task, title: newTitle } : task
									),
							  }
							: list
					),
				})),

			setFilter: (filter) =>
				set((state) => ({
					lists: state.lists.map((list) =>
						list.id === state.activeListId ? { ...list, filter } : list
					),
				})),
		}),
		{
			name: 'task-lists-storage',
		}
	)
)

export default useTaskStore
