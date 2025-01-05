export default function Color(props) {
    return(
        <>
        <div className={`${props.color} colorNode`} onClick={props.changeColor}></div>
        </>
    )
}