export function stringSlice(string, start, end) {
    return Array.from(string).slice(start, end).join('');
}