import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Circle,
  Flame,
  Home,
  LayoutList,
  Plus,
  Sparkles,
  UserRound,
} from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Review project brief', meta: 'Work  ·  25 min', done: true, color: 'coral' },
  { id: 2, title: 'Morning walk', meta: 'Wellness  ·  20 min', done: false, color: 'yellow' },
  { id: 3, title: 'Read 10 pages', meta: 'Personal  ·  15 min', done: false, color: 'mint' },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [activeTab, setActiveTab] = useState('Today')

  const completedCount = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )))
  }

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    setTasks((current) => [...current, {
      id: Date.now(),
      title,
      meta: 'Personal  ·  New task',
      done: false,
      color: 'blue',
    }])
    setNewTask('')
  }

  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /></div>
          <span className="brand-name">daylight</span>
          <button className="avatar-button" aria-label="Open profile"><UserRound size={18} /></button>
        </header>

        <section className="intro">
          <p className="eyebrow">Thursday, July 31</p>
          <h1>Make today<br /><em>count.</em></h1>
          <p className="intro-copy">A little progress is still progress.<br />Keep your rhythm going.</p>
        </section>

        <section className="progress-card" aria-label={`${progress}% daily progress`}>
          <div className="progress-copy">
            <span className="progress-label">TODAY'S PROGRESS</span>
            <strong>{completedCount} <small>of {tasks.length} complete</small></strong>
          </div>
          <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
            <span>{progress}%</span>
          </div>
        </section>

        <div className="section-heading">
          <h2>Today's focus</h2>
          <span>{tasks.length} tasks</span>
        </div>

        <section className="task-list">
          {tasks.map((task) => (
            <button className={`task-card ${task.done ? 'is-done' : ''}`} key={task.id} onClick={() => toggleTask(task.id)}>
              <span className={`task-icon ${task.color}`}>
                {task.done ? <Check size={17} strokeWidth={3} /> : <Circle size={17} />}
              </span>
              <span className="task-info">
                <strong>{task.title}</strong>
                <small>{task.meta}</small>
              </span>
              <ArrowUpRight className="task-arrow" size={19} />
            </button>
          ))}
        </section>

        <form className="quick-add" onSubmit={addTask}>
          <Plus size={19} />
          <input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a new focus" aria-label="New focus" />
          <button type="submit" aria-label="Add task">Add</button>
        </form>

        <aside className="streak-card">
          <div className="streak-icon"><Flame size={20} fill="currentColor" /></div>
          <div><strong>3 day streak</strong><span>You're building something good.</span></div>
          <span className="streak-dots">•••</span>
        </aside>

        <nav className="bottom-nav" aria-label="Main navigation">
          {[
            ['Today', Home],
            ['Plans', LayoutList],
            ['Profile', UserRound],
          ].map(([label, Icon]) => (
            <button className={activeTab === label ? 'active' : ''} key={label} onClick={() => setActiveTab(label)}>
              <Icon size={19} strokeWidth={activeTab === label ? 2.5 : 1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}

export default App
