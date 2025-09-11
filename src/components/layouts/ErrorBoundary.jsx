import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console; replace with reporting service if available.
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  renderFallback() {
    // If a custom fallback renderer was passed from the parent, use it.
    const { fallbackRender } = this.props;
    const isDev = Boolean(import.meta.env?.DEV);

    if (typeof fallbackRender === "function") {
      return fallbackRender({
        error: this.state.error,
        onReload: this.handleReload,
        isDev,
      });
    }

    // Default simple fallback (no shadcn components)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-md shadow-md p-6">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="text-sm text-gray-600">
              An unexpected error occurred. You can try reloading the page.
            </p>
          </div>
          {isDev && this.state.error?.message && (
            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-100 rounded-md p-4 overflow-auto">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={this.handleReload}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) return this.renderFallback();

    return this.props.children;
  }
}
