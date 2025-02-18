//Check if it is number
export function isNumeric(str: string): boolean {
    const regex = /^\d+$/;
    return regex.test(str);
}
//Check if it is 
export function isOnlyWhitespaceTrim(str: string): boolean {
	return str.trim() === "";
}
//trimmed string
export function trimmedStr(str: string) {
	return str.trim()
}