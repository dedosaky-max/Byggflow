import React from "react";
import { logEvent } from "../logging/logService";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, info) {
    logEvent("UI_ERROR", {
      message: error?.message,
      stack: error?.stack,
      componentStack: info?.componentStack,
    });
  }

  handleReload = () => {
    this.setState({ hasError: false, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-xl mx-auto">
          <h1 className="text-xl font-semibold mb-2">
            Qualcosa è andato storto.
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            L’interfaccia ha incontrato un errore inatteso. L’evento è stato
            registrato nei log.
          </p>
          <button
            onClick={this.handleReload}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Ricarica applicazione
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
