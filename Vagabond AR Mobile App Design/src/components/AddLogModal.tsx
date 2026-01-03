import React, { useState, useEffect } from 'react';
import { X, Upload, MapPin, Calendar } from 'lucide-react';
import { TravelLog } from '../App';

interface AddLogModalProps {
  initialData?: TravelLog;
  onClose: () => void;
  onSubmit: (log: Omit<TravelLog, 'id'>) => void;
}

export default function AddLogModal({ initialData, onClose, onSubmit }: AddLogModalProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState(initialData?.image || '');
  const [note, setNote] = useState(initialData?.note || '');

  // Suggested locations
  const suggestedLocations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Bali, Indonesia',
    'Rome, Italy',
    'Barcelona, Spain',
    'Santorini, Greece',
    'Dubai, UAE'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && location && date && note) {
      onSubmit({
        title,
        location,
        date,
        image: image || 'https://images.unsplash.com/photo-1759655160559-6613e51e1dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njc0MTE0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        note
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 rounded-t-3xl shadow-2xl animate-slide-up border-t border-x border-white/10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h3 className="text-white">
            {initialData ? 'Edit Log' : 'Add Travel Log'}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-slate-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Amazing Adventure"
              required
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          {/* Location Auto-suggest */}
          <div>
            <label className="block text-slate-300 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Type or select a location"
              required
              list="locations"
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            <datalist id="locations">
              {suggestedLocations.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2 mt-3">
              {suggestedLocations.slice(0, 4).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className="px-3 py-1 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-full text-slate-300 text-sm hover:border-cyan-400/30 hover:text-cyan-400 transition-all"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-slate-300 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-slate-300 mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Photo URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            {image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                <img src={image} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>

          {/* Note Textarea */}
          <div>
            <label className="block text-slate-300 mb-2">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe your experience..."
              required
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
          >
            {initialData ? 'Update Log' : 'Add to Diary'}
          </button>
        </form>
      </div>
    </div>
  );
}
