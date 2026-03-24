module.exports = async (kernel) => {
  let port = await kernel.port()
  return {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "app/env",
          env: {
            "GRADIO_SERVER_PORT": port.toString()
          },
          message: [
            "python gradio_app.py"
          ],
          on: [{
            "event": "/http:\/\/\\S+/",
            "done": true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0]}}"
        }
      }
    ]
  }
}
