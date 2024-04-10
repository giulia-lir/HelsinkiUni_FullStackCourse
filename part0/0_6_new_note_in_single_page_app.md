## 0.6: New note in Single page app
```mermaid
  sequenceDiagram
    participant user
    participant browser
    participant server
    
    user->>browser: writes new note "Hello"
    Note over browser: Browser displays "Hello" in text field
    user->>browser: presses "Save" button
    Note over browser: The Browser sends the user's new note to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The note "Hello" is sent as body of the POST request as JSON
    server-->>browser: Responds status 201
    Note over browser: Browser is not reloaded, the JSON is saved and displayed in addition on OK response
    browser->>user: the list displays the new "Hello" note without reload/redirect

```