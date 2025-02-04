# npoint
NodeJS API for [npoint.io](https://npoint.io/)

> npoint.io is not giving out API keys to new users anymore. So if you don't own a legacy account then you cannot use this wrapper.

Includes reading/writing to documents.<br>
Creating/Deleting of documents is not supported yet.

## Example Usage
```js
let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
let id = '4021841bc3u38302131' // Document ID

let NPoint = require('npoint')

let np = new NPoint(key).Document(id)

await np.get()
// -> { profiles: [ { name: "John", age: 21 } ] }
await np.get('profiles/0/name')
// -> "John"
await np.put('profiles/0/name', 'Jenny')
// -> { profiles: [ { name: "John", age: 21 } ] }
await np.put('profiles/1', { name: 'Josh', age: 45 })
// -> { profiles: [ { name: "Jenny", age: 21 }, { name: "Josh", age: 45 } ] }
await np.delete('profiles/1')
// -> { profiles: [ { name: "Jenny", age: 21 } ] }
await np.delete()
// -> {}

```
