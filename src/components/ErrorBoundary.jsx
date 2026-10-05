import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught rendering error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-[#111111] border border-[#D4AF37]/30 rounded-[10px] p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-[10px] bg-[#8C5E00]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#FFE58F]">
              <AlertTriangle className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white font-sans">Unable to Load View</h2>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                An unexpected display error occurred. Please refresh or return home.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-black/60 border border-white/10 rounded-[10px] p-4 text-left overflow-x-auto max-h-40 text-xs font-mono text-amber-300">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-[10px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-[10px] bg-dark-gold-gloss text-slate-950 font-black text-xs uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Home className="w-4 h-4" /> Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
