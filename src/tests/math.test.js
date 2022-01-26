import { Math2 } from '../utils/math'

test('should add two numbers', () => {
    expect(Math2.sum(1,1)).toBe(2)
    expect(Math2.sum(2,1)).toBe(3)
})

test('should subtract two numbers', () => {
    expect(Math2.diff(1,1)).toBe(1-1)
    expect(Math2.diff(2,1)).toBe(2-1)
})

// TDD
test('should compute the pyth therom', () => {
    const a = 10, b = 12;
    const c = Math.sqrt((Math.pow(a, 2) + Math.pow(b, 2)))

    expect(Math2.pyth(a, b)).toBe(c)
})

test('should sort a list of numbers', () => {
    const numbers = [3,5,1,7,-1,2]

    expect(Math2.sort(numbers)).toEqual([-1,1,2,3,5,7])
})

test('should sort a list of numbers', () => {
    const numbers = [10, 13, 3,5,1,7,-1,2]

    expect(Math2.sort(numbers)).toEqual([-1,1,2,3,5,7,10,13])
})

test('should sort a list of numbers desc', () => {
    const numbers = [3,5,1,7,-1,2]

    expect(Math2.sort(numbers, -1)).toEqual([7,5,3,2,1,-1])
})


test('should abort sort if list is not all numbers', () => {
    const numbers = ["11",3,5,1,7,-1,2]

    expect(Math2.sort(numbers, -1)).toBeNull()
})