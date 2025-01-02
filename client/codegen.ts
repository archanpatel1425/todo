import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5000/graphql', 
    documents: ['./GraphQL/**/*.graphql'],
    generates: {
        './GraphQL/generated/': {
            preset: 'client',
       }
    }
};

export default config;