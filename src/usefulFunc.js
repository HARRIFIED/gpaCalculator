export function getPoints(points) {
    switch (points) {
        case "A":
            return 5.0;
        case "a":
            return 5.0;

        case "B":
            return 4.0;
        case "b":
            return 4.0;

        case "C":
            return 3.0;
        case "c":
            return 3.0;

        case "D":
            return 2.0;
        case "d":
            return 2.0;

        case "E":
            return 1.0;
        case "e":
            return 1.0;

        case "F":
            return 0.0;
        case "f":
            return 0.0;

        default:
            return 0.0;
    }
}

export function getTotalCredit(field) {
    const totalCredits = field.reduce(
        (total, data) => total + parseInt(data.CREDIT),
        0
    );
    return totalCredits;
}

export function get_All_GRADE_X_CREDIT(field) {
    const cal = field.reduce(
        (total, data) => total + getPoints(data.GRADE) * parseInt(data.CREDIT),
        0
    );
    return cal;
}