import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AVM Talks System Exception Captured:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-lg w-full p-8 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl text-center space-y-5 leather-stitch-outline relative">
            <div className="brass-screw absolute top-3 left-3" />
            <div className="brass-screw absolute top-3 right-3" />
            <div className="brass-screw absolute bottom-3 left-3" />
            <div className="brass-screw absolute bottom-3 right-3" />

            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold mx-auto">
              <AlertCircle className="w-7 h-7 text-luxury-gold" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-theme-primary">
              Intelligence Dossier Interrupted
            </h3>

            <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              An unexpected interface anomaly occurred while rendering this module. Our institutional desk has been alerted.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Dossier</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold/30 text-theme-primary hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
