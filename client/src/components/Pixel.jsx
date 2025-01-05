import React from "react"

export default function Pixel(props) {
    return (
        <div className={`${props.hoverColor} ${props.color} pixel`} onMouseDown={props.paintBox} onMouseEnter={props.hover} onMouseLeave={props.leave}></div>
    )
}