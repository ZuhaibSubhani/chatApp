
interface PropsType{
    message:string
}
function Message(props:PropsType) {
  return ( 
    <div className="bg-white inline-block py-1 px-1 m-4  rounded-md justify-center items-center">
      {props.message}
    </div>
  )
}

export default Message
