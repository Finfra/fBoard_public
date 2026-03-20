# fBoard Control Workflow

When asked to manage the fBoard app, follow these steps:

1. **Interpret Request**: Determine what the user wants to do with the fBoard app (change color, manage presets, control window).
2. **Invoke fboard Skill**: If not already using the `fboard` skill instructions, load them to know the API endpoints.
3. **Check Server Availability**:
   - Check if the fBoard REST API server is running (`http://localhost:3012`).
   - Use: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3012/`
   - If not `200`, inform the user to launch fBoard app and enable the REST API. Stop the workflow and wait for them.
4. **Execute REST Call**: Use the `run_shell_command` with `curl` to execute the necessary POST, GET, or DELETE operation against `http://localhost:3012/api/...`
5. **Verify and Report**: Briefly confirm the outcome to the user. Keep output concise.
