import { TodoId, type Todo as TodoTyes } from '../types'

interface Props extends TodoTyes {
	onToggleCompleted: ({
		id,
		completed
	}: Pick<TodoTyes, 'id' | 'completed'>) => void
	onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({
	id,
	title,
	completed,
	onToggleCompleted,
	onRemoveTodo
}) => {
	return (
		<div className='view'>
			<input
				type='checkbox'
				className='toggle'
				checked={completed}
				onChange={(event) => {
					onToggleCompleted({ id, completed: event.target.checked })
				}}
			/>
			<label>{title}</label>
			<button
				className='destroy'
				onClick={() => {
					onRemoveTodo({ id })
				}}
			/>
		</div>
	)
}
