import * as React from "react"
import { initLiveReload } from "./bootstrap"

let lastUpdatedCount = 0

export function useRealtimeOverride(
    originalOverride: any,
    componentName: string,
) {
    const [, setForceRerender] = React.useState(0)
    const updateCount = React.useRef(lastUpdatedCount)
    const updatedInstance = React.useRef(null)

    React.useLayoutEffect(() => {
        const onRebuild = async (event: any) => {
            console.log(
                `[framer-live-esm] Build complete, refreshing ${componentName}`
            )

            const response = await import(
                `http://127.0.0.1:8000/${componentName}.js?${updateCount.current}`
            )
            updateCount.current++
            updatedInstance.current = response
            setForceRerender(updateCount.current)
        }

        const setupHandler = (retryCount = 0) => {
            // @ts-ignore
            if (!window.framerRealtimeSocket) {
                setTimeout(
                    () => setupHandler(retryCount + 1),
                    retryCount + 1 * 500
                )
                return
            }

            // @ts-ignore
            window.framerRealtimeSocket.on("build", onRebuild)
        }

        setupHandler()

        return () => {
            // @ts-ignore
            if (window.framerRealtimeSocket) {
                // @ts-ignore
                window.framerRealtimeSocket.off("build", onRebuild)
                lastUpdatedCount = updateCount.current + 1
            }
        }
    }, [componentName])

    React.useEffect(() => {
        initLiveReload()
    }, [])

    return updatedInstance.current || originalOverride
}
