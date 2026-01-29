import React, { Component } from 'react';

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and prevent the entire app from crashing.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return (
                this.props.fallback || (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        color: '#666'
                    }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '14px' }}>
                                {this.props.message || 'Something went wrong loading this section.'}
                            </p>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
