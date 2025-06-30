import { Todo } from '../services/todoService';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow rounded mb-2">
      <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
      <div className="flex gap-2">
        <button onClick={onToggle} className="text-green-600">✓</button>
        <button onClick={onDelete} className="text-red-600">✕</button>
      </div>
    </div>
  );
}
