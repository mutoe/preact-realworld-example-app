// node-fetch's types cause issues normally
declare module 'node-fetch' {
    const fetch: GlobalFetch['fetch'];
    export default fetch;
}
