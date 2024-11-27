export function ReviewSubmit({ projectData }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review Your Project Details</h2>
      <div className="space-y-4">
        {Object.entries(projectData).map(([key, value]) => (
          <div key={key}>
            <h3 className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p className="text-muted-foreground">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Please review the information above. If everything looks correct, click "Submit" to send your project details to
        our team of civil engineers.
      </p>
    </div>
  )
}

