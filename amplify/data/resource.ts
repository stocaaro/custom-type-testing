import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { testFcn } from '../functions/test-fcn/resource';
import { testFcn2 } from '../functions/test-fcn2/resource';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Profile: a.customType({
    name: a.string()
  }),
  fcnCallasd: a.query()
    .arguments({
      arg: a.ref("Profile")
    }).returns(a.string()),
  fcnReturn: a.customType({
    todoCount: a.integer().required(),
    x: a.string().required()
  }),
  cType: a.customType({
    note: a.string()
  }),
  fcnArg: a.customType({
    filter: a.string().required(),
    link: a.ref('fcnArg'),
  }),
  fcnArg2: a.customType({
    inner: a.customType({
      filter: a.string().required(),
      e1: a.enum(['a', 'b', 'c'])
    })
  }),
  ERef: a.enum(['a1', 'b1']),
  Todo: a
    .model({
      content: a.string(),
      relatedTo: a.ref('cType'),
      x: a.ref('fcnArg')
    })
    .authorization((allow) => [allow.guest()]),
  fcnCall: a.query()
    .arguments({
      arg1: a.ref('fcnArg'), 
      arg2: a.customType({
        x: a.string().required(),
        e2: a.enum(['c', 'd'])
      }), 
      e3: a.ref('ERef')
    })
    .returns(a.ref('fcnReturn'))
    .handler(a.handler.function(testFcn))
    .authorization((allow) => [allow.guest()]),
  fcnCall2: a.query()
    .arguments({arg1: a.ref('fcnArg2'), arg2: a.customType({
      x: a.string().required(),
    })})
    .returns(a.customType({
      todoCount: a.integer().required(),
      x: a.string().required()
    }))
    .handler(a.handler.function(testFcn2))
    .authorization((allow) => [allow.guest()]),
}).authorization((a) => [a.resource(testFcn), a.resource(testFcn2)]);

console.log(schema.transform().schema); 

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
