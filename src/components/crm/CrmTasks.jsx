import React, { useState } from 'react';
import { 
  CheckSquare, Square, Calendar, User, Plus, Trash2, Clock, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';
import { AGENTS_DATA } from '../../data/agents';

export const CrmTasks = () => {
  const { tasks, addTask, toggleTask, deleteTask, leads } = useCRM();
  const { isHindi } = useLanguage();
  const [filter, setFilter] = useState('pending'); // 'all' | 'pending' | 'completed'
  const [showAdd, setShowAdd] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    leadId: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high',
    assignedTo: AGENTS_DATA[0].name,
  });

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const linkedLead = leads.find((l) => l.id === newTask.leadId);
    addTask({
      ...newTask,
      leadName: linkedLead ? linkedLead.name : 'General Task',
    });
    setNewTask({
      title: '',
      leadId: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      assignedTo: AGENTS_DATA[0].name,
    });
    setShowAdd(false);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-theme-primary">
            {isHindi ? 'दैनिक सलाहकार कार्य एवं फॉलो-अप्स' : 'Advisory Action Items & Follow-up Checklist'}
          </h2>
          <p className="text-xs text-theme-secondary font-light">
            {isHindi
              ? 'राजस्व रिकॉर्ड सत्यापन, टोकन अनुबंध और साइट विजिट समन्वय की दैनिक सूची।'
              : 'Daily operational tasks spanning title verification, token agreements, and client consultations.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-theme-card border dark:border-white/10 border-slate-200 text-xs">
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {isHindi ? 'लंबित' : 'Pending'}
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'completed'
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {isHindi ? 'पूर्ण' : 'Completed'}
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {isHindi ? 'सभी' : 'All'}
            </button>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{isHindi ? 'नया कार्य' : 'Add Task'}</span>
          </button>
        </div>
      </div>

      {/* Add Task Modal / Card */}
      {showAdd && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-theme-card border-2 border-luxury-gold shadow-lg space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
            {isHindi ? 'नया सलाहकार कार्य जोड़ें' : 'Create Follow-up Action Item'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'कार्य का विवरण *' : 'Task Description *'}
              </label>
              <input
                type="text"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g. Verify 30-year Jamabandi copy with Sub-Registrar Sanganer"
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'संबंधित लीड' : 'Linked Lead'}
              </label>
              <select
                value={newTask.leadId}
                onChange={(e) => setNewTask({ ...newTask, leadId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                <option value="">-- {isHindi ? 'कोई लीड नहीं' : 'General / Unlinked'} --</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'अंतिम तिथि' : 'Due Date'}
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'प्राथमिकता' : 'Priority'}
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                <option value="urgent">{isHindi ? 'अति आवश्यक (Urgent)' : 'Urgent'}</option>
                <option value="high">{isHindi ? 'उच्च (High)' : 'High'}</option>
                <option value="medium">{isHindi ? 'सामान्य (Medium)' : 'Medium'}</option>
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'जिम्मेदार समन्वयक' : 'Assigned Coordinator'}
              </label>
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                {AGENTS_DATA.slice(0, 15).map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs text-theme-secondary"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider"
            >
              {isHindi ? 'कार्य सहेजें' : 'Save Task'}
            </button>
          </div>
        </form>
      )}

      {/* Task Items List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 text-theme-muted text-xs">
            {isHindi ? 'कोई कार्य शेष नहीं है।' : 'No tasks match this filter.'}
          </div>
        ) : (
          filteredTasks.map((task) => {
            const badgeClass = getPriorityBadge(task.priority);
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl bg-theme-card border transition-all flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'opacity-60 dark:border-white/5 border-slate-100 bg-slate-50/50 dark:bg-white/[0.01]'
                    : 'dark:border-white/10 border-slate-200 hover:border-luxury-gold shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-luxury-gold hover:scale-110 transition-transform"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 hover:text-luxury-gold" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <p className={`text-xs font-semibold ${task.completed ? 'line-through text-theme-muted' : 'text-theme-primary'}`}>
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-theme-muted">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-luxury-gold" />
                        <span>Due: {task.dueDate}</span>
                      </span>
                      {task.leadName && task.leadName !== 'General Task' && (
                        <>
                          <span>•</span>
                          <span className="text-theme-secondary font-medium">Lead: {task.leadName}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-cyan-400">{task.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border ${badgeClass}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
