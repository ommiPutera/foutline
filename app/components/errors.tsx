function ErrorPage({
  title,
  error,
  subtitle,
}: {
  title: string
  subtitle: string
  error?: Error
}) {
  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 30,
          }}
        >
          <h1 style={{fontSize: '2em'}}>{title}</h1>
          <p style={{fontSize: '1.5em'}}>{subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="relative">
        <h1 style={{fontSize: '1.4em', marginBottom: '6px'}}>{title}</h1>
        <p style={{fontSize: '0.8em'}}>{subtitle}</p>
      </main>
    </>
  )
}

export {ErrorPage}
