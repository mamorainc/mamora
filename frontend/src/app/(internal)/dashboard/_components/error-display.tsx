interface ErrorDisplayProps {
  error: Error | unknown;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="p-6 text-center">
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        <p>
          Error: {error instanceof Error ? error.message : 'Failed to load dashboard data'}
        </p>
      </div>
    </div>
  );
}
