## Framer Live Reload for Overrides

Quick implementation for Overrides in Framer Web.

Inspired by this PR (https://github.com/framer/example-framer-esm-setup/pull/1)

## Start

```
yarn install && yarn serve
```

## Example

```jsx
import type { ComponentType } from "react"
import * as ImportedOverrides from "http://127.0.0.1:8000/Overrides.js"
import { useRealtimeOverride } from "http://127.0.0.1:8000/utils/live-reload/useRealtimeOverride.js"

export function box3(Component): ComponentType {
    return (props) => {
        const overrides = useRealtimeOverride(ImportedOverrides, "Overrides")
        return <Component {...props} {...overrides.box3()} />
    }
}
export function Button(Component): ComponentType {
    return (props) => {
        const overrides = useRealtimeOverride(ImportedOverrides, "Overrides")
        console.log("overrides.Button", overrides.Button)
        return <Component {...props} {...overrides.Button()} />
    }
}
```

**Framer Example Project (WIP)** - https://framer.com/projects/local-overrides-test--gur5LjMSjAQHTgc6z5iS-3h54W?node=veUllhJiQ
