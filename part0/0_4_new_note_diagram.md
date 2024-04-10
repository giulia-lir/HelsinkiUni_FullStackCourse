## 0.4: New note diagram
```mermaid
  sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: writes new note "Hello"
    Note over browser: Browser displays "Hello" in text field
    user->>browser: presses "Save" button
    Note over browser: The Browser sends the user's new note to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: The note "Hello" is sent as body of the POST request
    server-->>browser: Responds status 302
    Note over browser: Browser is redirected to endpoint /notes
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Note right of browser: The raw data in JSON format is fetched according to JS code executed in browser

    server-->>browser: [{content: "Hello", date: "2024-04-10T18:19:03.874Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    browser->>user: List of notes is rendered and visible to user
```