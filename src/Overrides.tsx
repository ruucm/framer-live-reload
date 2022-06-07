import { Override, useAnimation } from "framer"

var box3Control: any
export function box3(): Override {
    box3Control = useAnimation()
    return { animate: box3Control }
}

export function Button(props: any): Override {
    console.log("props", props)
    return {
        onTap: () => {
            box3Control.start({
                scale: 2,
                background: "green",
                transition: {
                    duration: 1,
                },
            })
        },
    }
}
