import type { Schema } from '../../data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/test-fcn'; // replace with your function name

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: Schema['fcnCall2']['functionHandler'] = async ({arguments: {arg1, arg2}}) => {
    const q = arg1?.inner?.e1;
    return {

        todoCount: (await client.models.Todo.list()).data.length,
        x: JSON.stringify({arg1, arg2, q}),
    }
}