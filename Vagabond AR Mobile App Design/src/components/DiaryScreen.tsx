import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { TravelLog } from '../App';
import AddLogModal from './AddLogModal';
import Masonry from 'react-responsive-masonry';

interface DiaryScreenProps {
  logs: TravelLog[];
  onDeleteLog: (id: string) => void;
  onEditLog: (log: TravelLog) => void;
  onAddLog: (log: Omit<TravelLog, 'id'>) => void;
}

export default function DiaryScreen({ logs, onDeleteLog, onEditLog, onAddLog }: DiaryScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<TravelLog | null>(null);

  const handleEdit = (log: TravelLog) => {
    setEditingLog(log);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingLog(null);
  };

  const handleSubmit = (log: Omit<TravelLog, 'id'>) => {
    if (editingLog) {
      onEditLog({ ...log, id: editingLog.id });
    } else {
      onAddLog(log);
    }
    handleModalClose();
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 px-6 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white">Travel Diary</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        <p className="text-slate-400 mt-2">{logs.length} adventures captured</p>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 pt-6">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-500 text-center">No travel logs yet</p>
            <p className="text-slate-600 text-center text-sm mt-2">Start capturing your adventures</p>
          </div>
        ) : (
          <Masonry columnsCount={2} gutter="16px">
            {logs.map((log) => (
              <div
                key={log.id}
                className="group bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={log.image}
                    alt={log.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white mb-2">{log.title}</h3>

                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{log.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {log.note}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(log)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/20 hover:scale-105 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm hover:bg-red-500/20 hover:scale-105 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddLogModal
          initialData={editingLog || undefined}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
