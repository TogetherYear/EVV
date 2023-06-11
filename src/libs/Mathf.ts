class Mathf {
    static Clamp(min: number, max: number, value: number): number {
        if (value < min) {
            return min
        }
        else if (value > max) {
            return max
        }
        else {
            return value
        }
    }

    static Lerp(a: number, b: number, weight: number) {
        return a + (b - a) * weight
    }

}

export { Mathf }