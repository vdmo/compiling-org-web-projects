import React, { Suspense } from "react";
import { Box } from "lucide-react";

interface DemoContainerProps {
  projectId: string;
  children: React.ReactNode;
}

const LoadingFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center">
        <Box className="h-12 w-12 text-white/50 mx-auto mb-4 animate-spin" />
        <p className="text-gray-400 text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Three.js Demo Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <Box className="h-12 w-12 text-red-500/50 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">
              Unable to load 3D demo
            </p>
            <p className="text-gray-600 text-xs mt-2">
              WebGL may not be available
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const DemoContainer: React.FC<DemoContainerProps> = ({
  projectId,
  children,
}) => {
  return (
    <div className="w-full h-full relative">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
