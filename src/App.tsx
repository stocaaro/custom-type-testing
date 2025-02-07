import './App.css'
import { Amplify } from 'aws-amplify'
import config from '../amplify_outputs.json'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../amplify/data/resource';
Amplify.configure(config);

const client = generateClient<Schema>()

function App() {

  return (
    <>
      <div>
        <button onClick={() => client.models.Todo.create({ content: "Test Content"})} >Create Todo</button>
        <button onClick={async () => console.log(await client.queries.fcnCall({
          arg1: {filter: "Test"},
          arg2: {x: 'asd2'}
        }))} >Get Count</button>
        <button onClick={async () => console.log(await client.queries.fcnCall2({
          arg1: {inner: {filter: "Test", e1: 'a'}},
          arg2: {x: 'asd1'}
        }))} >Get Count2</button>
      </div>
    </>
  )
}

export default App
