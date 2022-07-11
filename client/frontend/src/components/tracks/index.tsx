import Track from '../track/index'
import {EndpointResponse} from '../../../../../types'

type Props = {
    results: EndpointResponse
}

const Tracks = (props: Props) => {
  return (
    <>
        {props.results?.map((data) => {
            return <Track key={data.id} artist={data.artist} title={data.title} id={data.id}/>
        })}
    </>
  )
}

export default Tracks