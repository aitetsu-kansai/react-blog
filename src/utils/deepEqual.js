export const deepEqual = (objOne, objTwo) => {
	if (objOne === objTwo) return true
	if (
		typeof objOne !== 'object' ||
		typeof objTwo !== 'object' ||
		objOne === null ||
		objTwo === null
	)
		return false

	const keysOne = Object.keys(objOne)
	const keysTwo = Object.keys(objTwo)

	if (keysOne.length !== keysTwo.length) return false

	for (let key of keysOne) {
		if (!keysTwo.includes(key) || !deepEqual(objOne[key], objTwo[key])) {
			return false
		}
	}
	return true
}
