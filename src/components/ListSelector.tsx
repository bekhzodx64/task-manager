'use client'

import useTaskStore from '@/store/useTaskStore'
import { useState } from 'react'

export default function ListSelector() {
	const { lists, activeListId, addList, deleteList, setActiveList } =
		useTaskStore()
	const [listName, setListName] = useState('')

	const handleAddList = () => {
		if (listName.trim()) {
			addList(listName)
			setListName('')
		}
	}

	return (
		<div>
			<h2>Списки задач</h2>
			<ul>
				{lists.map((list) => (
					<li
						key={list.id}
						onClick={() => setActiveList(list.id)}
					>
						{list.name} {list.id === activeListId && '✅'}
						<button onClick={() => deleteList(list.id)}>❌</button>
					</li>
				))}
			</ul>
			<input
				type='text'
				value={listName}
				onChange={(e) => setListName(e.target.value)}
				placeholder='Новый список...'
			/>
			<button onClick={handleAddList}>➕</button>
		</div>
	)
}
