// src/Components/ErrorBoundary/index.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          p={3}
        >
          <Card sx={{ maxWidth: 600, width: '100%' }}>
            <CardContent>
              <Alert severity="error" sx={{ mb: 3 }}>
                <AlertTitle>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ErrorIcon />
                    Something went wrong
                  </Box>
                </AlertTitle>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </Alert>

              <Box display="flex" gap={2} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReload}
                  color="primary"
                >
                  Reload Page
                </Button>
                <Button
                  variant="outlined"
                  onClick={this.handleReset}
                  color="secondary"
                >
                  Try Again
                </Button>
              </Box>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box mt={3} p={2} bgcolor="grey.100" borderRadius={1}>
                  <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
