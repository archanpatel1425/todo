/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation DeleteTodo($task_id: String!) {\n  deleteTodo(task_id: $task_id) {\n    task_id\n  }\n}": types.DeleteTodoDocument,
    "mutation CreateTodo($title: String!, $task_description: String!, $dueDate: String!, $userId: String!, $priority: String!) {\n  createTodo(\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    userId: $userId\n    priority: $priority\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}": types.CreateTodoDocument,
    "mutation createUser($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!) {\n  createUser(\n    first_name: $first_name\n    last_name: $last_name\n    username: $username\n    email: $email\n    password: $password\n  ) {\n    ...data\n    refreshToken\n    accessToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}": types.CreateUserDocument,
    "mutation loginUser($username: String!, $email: String!, $password: String!) {\n  loginUser(username: $username, email: $email, password: $password) {\n    ...data\n    accessToken\n    refreshToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}": types.LoginUserDocument,
    "mutation UpdateTask($task_id: String!, $title: String!, $task_description: String!, $dueDate: String!, $priority: String!, $status: String!) {\n  updateTask(\n    task_id: $task_id\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    priority: $priority\n    status: $status\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n    createdAt\n    updatedAt\n  }\n}": types.UpdateTaskDocument,
    "query GetTodos($userId: String!) {\n  getTodos(userId: $userId) {\n    task_id\n    userId\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}": types.GetTodosDocument,
    "query GetTodoById($task_id: String!) {\n  getTodoById(task_id: $task_id) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}": types.GetTodoByIdDocument,
    "query GetUser($user_id: String!) {\n  getUser(user_id: $user_id) {\n    user_id\n    first_name\n    last_name\n    email\n    username\n  }\n}": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTodo($task_id: String!) {\n  deleteTodo(task_id: $task_id) {\n    task_id\n  }\n}"): (typeof documents)["mutation DeleteTodo($task_id: String!) {\n  deleteTodo(task_id: $task_id) {\n    task_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTodo($title: String!, $task_description: String!, $dueDate: String!, $userId: String!, $priority: String!) {\n  createTodo(\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    userId: $userId\n    priority: $priority\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"): (typeof documents)["mutation CreateTodo($title: String!, $task_description: String!, $dueDate: String!, $userId: String!, $priority: String!) {\n  createTodo(\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    userId: $userId\n    priority: $priority\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createUser($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!) {\n  createUser(\n    first_name: $first_name\n    last_name: $last_name\n    username: $username\n    email: $email\n    password: $password\n  ) {\n    ...data\n    refreshToken\n    accessToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}"): (typeof documents)["mutation createUser($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!) {\n  createUser(\n    first_name: $first_name\n    last_name: $last_name\n    username: $username\n    email: $email\n    password: $password\n  ) {\n    ...data\n    refreshToken\n    accessToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation loginUser($username: String!, $email: String!, $password: String!) {\n  loginUser(username: $username, email: $email, password: $password) {\n    ...data\n    accessToken\n    refreshToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}"): (typeof documents)["mutation loginUser($username: String!, $email: String!, $password: String!) {\n  loginUser(username: $username, email: $email, password: $password) {\n    ...data\n    accessToken\n    refreshToken\n  }\n}\n\nfragment data on LoginResponse {\n  user_id\n  first_name\n  last_name\n  username\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTask($task_id: String!, $title: String!, $task_description: String!, $dueDate: String!, $priority: String!, $status: String!) {\n  updateTask(\n    task_id: $task_id\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    priority: $priority\n    status: $status\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateTask($task_id: String!, $title: String!, $task_description: String!, $dueDate: String!, $priority: String!, $status: String!) {\n  updateTask(\n    task_id: $task_id\n    title: $title\n    task_description: $task_description\n    dueDate: $dueDate\n    priority: $priority\n    status: $status\n  ) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTodos($userId: String!) {\n  getTodos(userId: $userId) {\n    task_id\n    userId\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"): (typeof documents)["query GetTodos($userId: String!) {\n  getTodos(userId: $userId) {\n    task_id\n    userId\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTodoById($task_id: String!) {\n  getTodoById(task_id: $task_id) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"): (typeof documents)["query GetTodoById($task_id: String!) {\n  getTodoById(task_id: $task_id) {\n    task_id\n    title\n    task_description\n    dueDate\n    status\n    priority\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUser($user_id: String!) {\n  getUser(user_id: $user_id) {\n    user_id\n    first_name\n    last_name\n    email\n    username\n  }\n}"): (typeof documents)["query GetUser($user_id: String!) {\n  getUser(user_id: $user_id) {\n    user_id\n    first_name\n    last_name\n    email\n    username\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;