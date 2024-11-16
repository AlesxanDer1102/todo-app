import { TodoId, type listOfTodos, type Todo as TodoType } from '../types'
import { Todo } from './Todo'
interface Props {
	todos: listOfTodos
	onToggleCompleted: ({
		id,
		completed
	}: Pick<TodoType, 'id' | 'completed'>) => void
	onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({
	todos,
	onToggleCompleted,
	onRemoveTodo
}) => {
	return (
		<ul className='todo-list'>
			{todos.map((todo) => (
				<li
					key={todo.id}
					className={`${todo.completed ? 'completed' : ''}`}
				>
					<Todo
						key={todo.id}
						id={todo.id}
						title={todo.title}
						completed={todo.completed}
						onToggleCompleted={onToggleCompleted}
						onRemoveTodo={onRemoveTodo}
					/>
				</li>
			))}
		</ul>
	)
}
