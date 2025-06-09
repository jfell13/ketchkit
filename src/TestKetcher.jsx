import {useState} from "react"
import { Editor } from 'ketcher-react'
import { StandaloneStructServiceProvider } from 'ketcher-standalone'
import 'ketcher-react/dist/index.css'

const structServiceProvider = new StandaloneStructServiceProvider()

const KetcherEditor = () => {

    // this is what i would like to use
    const [structure, setStructure] = useState('')
    
    return(
        <Editor
            staticResourcesUrl=""
            structServiceProvider={structServiceProvider}
            errorHandler={message => console.error(message)}
        />
    )
}

export default KetcherEditor
