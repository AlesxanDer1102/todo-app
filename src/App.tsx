import { useState } from 'react'
import { Todos } from './components/Todos'
import {
	FilterValue,
	TodoTitle,
	type TodoId,
	type Todo as TodoType
} from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
	{
		id: '1',
		title: 'Repasar programacion',
		completed: true
	},
	{
		id: '2',
		title: 'Codear Smart contracts',
		completed: false
	},
	{
		id: '3',
		title: 'Jugar AOE',
		completed: false
	}
]

const App = (): JSX.Element => {
	const [todos, setTodos] = useState(mockTodos)
	const [filterSelected, setFilterSelected] = useState<FilterValue>(
		TODO_FILTERS.ALL
	)

	const handleRemove = ({ id }: TodoId): void => {
		const newTodos = todos.filter((todo) => todo.id !== id)
		setTodos(newTodos)
	}

	const handleCompleted = ({
		id,
		completed
	}: Pick<TodoType, 'id' | 'completed'>): void => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed
				}
			}
			return todo
		})
		setTodos(newTodos)
	}
	const handleFilterChange = (filter: FilterValue): void => {
		setFilterSelected(filter)
	}
	const handleRemoveAllCompleted = (): void => {
		const newTodos = todos.filter((todo) => !todo.completed)
		setTodos(newTodos)
	}
	const handleAddTodo = ({ title }: TodoTitle): void => {
		const newTodo = {
			title,
			id: crypto.randomUUID(),
			completed: false
		}
		const newTodos = [...todos, newTodo]
		setTodos(newTodos)
	}

	const activeCount = todos.filter((todo) => !todo.completed).length
	const completedCount = todos.length - activeCount
	const filteredTodos = todos.filter((todo) => {
		if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
		if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
		return todo
	})

	return (
		<div className='todoapp'>
			<Header onAddTodo={handleAddTodo} />
			<Todos
				onToggleCompleted={handleCompleted}
				onRemoveTodo={handleRemove}
				todos={filteredTodos}
			/>
			<Footer
				activeCount={activeCount}
				completedCount={completedCount}
				filterSelected={filterSelected}
				onClearCompleted={handleRemoveAllCompleted}
				handleFilterChange={handleFilterChange}
			/>
		</div>
	)
}

export default App
