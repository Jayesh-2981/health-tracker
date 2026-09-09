function PageHeader({ title, description, children }) {
  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h1 className="h2 mb-1">{title}</h1>

          {description && <p className="text-muted mb-0">{description}</p>}
        </div>

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
