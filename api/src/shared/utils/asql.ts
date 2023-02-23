export class Asql {

    constructor() {
        if (this instanceof Asql) {
            throw Error('A static class cannot be instantiated.');
        }
    }
    static innerJoin(source:{key:string;data:[{}]},join:{key:string;data:[{}]}){
        const joinMap = Asql.createMap(source.key,source.data);

        return source.data.reduce(
            (a:any, o:any) => (joinMap.has(o[source.key]) ? [...a, { ...o, ...joinMap.get(o[join.key]) }] : a),
            []
          )
    }
    static leftJoin(source:{key:string;data:[{}]},join:{key:string;data:[{}]}){
        const joinMap = Asql.createMap(source.key,source.data);

        return source.data.reduce(
            (a:any, o:any) => (joinMap.has(o[source.key]) ? [...a, { ...o, ...joinMap.get(o[join.key]) }] : [...a, o]),
            []
          )
    }
    private static createMap(key: string, data: [{}]) {
        return new Map(data.map(o => [o[key], o]))
    }

    static {
        console.log('Class static initialization block called');
    }
}