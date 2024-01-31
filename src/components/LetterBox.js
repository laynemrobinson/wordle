// Display individual letters of the gueses
// value: letter to display
// showMatches: true/false - used to determine if we want to highlight matched letters
function LetterBox({ value, className }) {
    return <div className={`letterbox ${className}`}>{value}</div>
}

export default LetterBox;