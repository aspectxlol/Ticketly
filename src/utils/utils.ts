export const strign2bin: (string: string) => number[] = (string: string) => {
    let result: number[] = [];
    for(var i = 0; i < string.length; i++) {
        result.push(string.charCodeAt(i))
    }
    return result
}